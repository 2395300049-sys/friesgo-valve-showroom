import * as T from 'three';
import {OrbitControls} from '../assets/OrbitControls.js';
import {PHOTO_PRODUCTS,buildPhotoProduct} from './photo-products.js?v=20261101-photo-final3';

const $=id=>document.getElementById(id);
const host=$('product-stage'),canvas=$('product-canvas');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ids=['exterior-view','section-view','auto-rotate','reset-product','save-view','toggle-parts'];
ids.forEach(id=>$(id).disabled=true);
let renderer,scene,camera,controls,manifest,mode='exterior',selected=null,motion=null,rig,groundShadow,cutMotion=null,cutAmount=0;
let frame={top:150,bottom:120,height:400};
let lastNarrow,lastLandscape;
let flowPromise=null,flowReady=false,selectionVersion=0;
let productId='flow';const photoModels={};
const FLOW_PRODUCT={name:'自力式流量控制阀',english:'Self-acting flow control valve.',photo:'photo-flow.jpg'};
const productInfo=()=>productId==='flow'?FLOW_PRODUCT:PHOTO_PRODUCTS[productId];
const activeMaterials=()=>productId==='flow'?materials:photoModels[productId].materials;
const activeNotes=()=>productId==='flow'?partNotes:photoModels[productId].notes;
const announceState=()=>document.dispatchEvent(new CustomEvent('friesgo:state',{detail:{product:productId,view:mode,part:selected}}));
const cutPlane=new T.Plane(new T.Vector3(0,0,-1),1.6);
const Y_AXIS=new T.Vector3(0,1,0);
const roots={},markers=[],ray=new T.Raycaster(),pointer=new T.Vector2();
const recordById=new Map(),materials=new Map();
const partNotes={
  0:['阀体','连接两侧管道，形成阀门的主体外壳和内部通道。切换剖面可查看壁厚、内腔与连接部位。'],
  1:['下部壳体','包围下部内部组件。剖面中可以看到它与弹簧区域的相对位置。'],
  4:['内部筒形组件','位于阀体内，与其他内件共同构成内部组件。具体零件名称和控制关系，需要对应型号的剖面图或明细表确认。'],
  11:['螺旋弹簧','原文件包含的真实螺旋结构。弹簧可提供机械弹力；本页仅显示原始静态位置，未推算预紧力或设定流量。'],
  15:['上部调节组件','位于阀体上方的调节端外形。此页可查看它与杆件及连接部位的位置，不将旋转角度换算为流量。'],
  18:['上部杆件','沿调节组件中心布置。中心剖面显示它与内部组件的相对位置，未模拟实际行程。']
};
const markerDefs={exterior:[{id:0,p:[-.74,.35,1.05],n:'01'},{id:15,p:[.02,2.02,.57],n:'02'},{id:1,p:[.02,-2.08,1.04],n:'03'}],section:[{id:0,p:[-1.22,.09,.025],n:'01'},{id:4,p:[.42,-.46,.025],n:'02'},{id:11,p:[.31,-2.19,.025],n:'03'},{id:18,p:[.05,1.34,.025],n:'04'}]};

function materialFor(id,cap,sheet){
 const key=id+':'+cap;
 if(materials.has(key))return materials.get(key);
 let color,metalness,roughness;
 if(cap){color=id===0?0xd2ad76:id===1?0x939ea9:[0xa8b4c1,0x8babbf,0xc09e70][id%3];metalness=.18;roughness=.65;}
 else if([0,1,2,19].includes(id)){color=0x064cc8;metalness=.14;roughness=.3;}
 else if([5,9,10,17].includes(id)||sheet){color=0x484b50;metalness=.18;roughness=.62;}
 else {color=0xbfc7ce;metalness=.94;roughness=.2;}
 const painted=[0,1,2,19].includes(id)&&!cap;
 const m=new T.MeshPhysicalMaterial({color,metalness,roughness,clearcoat:painted?.8:cap?0:.2,clearcoatRoughness:painted?.18:.25,envMapIntensity:cap?.65:1.25,side:T.DoubleSide,clippingPlanes:[cutPlane],polygonOffset:sheet,polygonOffsetFactor:sheet?-1:0});
 if(cap){
  m.onBeforeCompile=shader=>{
   shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec2 vCutUV;').replace('#include <begin_vertex>','#include <begin_vertex>\nvCutUV=position.xy;');
   shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec2 vCutUV;').replace('#include <color_fragment>',`#include <color_fragment>
    float hatchCoord=(vCutUV.x+vCutUV.y)*14.0;
    float hatchWidth=max(fwidth(hatchCoord),0.04);
    float hatch=1.0-smoothstep(0.07,0.07+hatchWidth,abs(fract(hatchCoord)-0.5));
    diffuseColor.rgb*=1.0-hatch*0.24;`);
  };
  m.customProgramCacheKey=()=> 'cad-cut-hatch-v1';
 }
 materials.set(key,m);return m;
}

function studioEnvironment(){
 const studio=new T.Scene();studio.background=new T.Color(0x111723);
 for(const [x,y,z,w,h,intensity] of [[-5,4,4,4,9,3.0],[4,3,3,1.5,7,5.5],[0,7,0,7,4,3.8],[0,-2,5,7,1,1.5],[2,1,-6,3,7,2.2]]){
  const light=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color().setScalar(intensity),side:T.DoubleSide}));
  light.position.set(x,y,z);light.lookAt(0,0,0);studio.add(light);
 }
 const pmrem=new T.PMREMGenerator(renderer),target=pmrem.fromScene(studio,0);
 scene.environment=target.texture;pmrem.dispose();
 studio.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});
}

function home(nextMode=mode,animate=true){
 const target=new T.Vector3(0,0,0);
 const aspect=host.clientWidth/host.clientHeight;
 const narrow=host.clientWidth<700;
 let distance=productId==='flow'?(nextMode==='section'?12.6:narrow?12.6:8.3):12.8;
 const direction=productId==='dp'?new T.Vector3(-1.35,.26,1):productId==='balance'?new T.Vector3(-.75,.28,1.18):nextMode==='section'?new T.Vector3(.08,.05,1):new T.Vector3(.38,.25,1);
 if(productId!=='flow'){
  // Fit actual exterior vertices to the usable viewport; the forward handwheel
  // needs additional perspective clearance on narrow phone screens.
  const d=direction.clone().normalize(),right=new T.Vector3().crossVectors(Y_AXIS,d).normalize(),up=new T.Vector3().crossVectors(d,right).normalize(),p=new T.Vector3(),tan=Math.tan(T.MathUtils.degToRad(camera.fov/2)),margin=.90;
  const model=photoModels[productId].root;model.updateWorldMatrix(true,true);distance=controls.minDistance;
  model.traverse(o=>{if(!o.isMesh)return;const a=o.geometry.attributes.position;for(let i=0;i<a.count;i++){p.fromBufferAttribute(a,i).applyMatrix4(o.matrixWorld);distance=Math.max(distance,p.dot(d)+Math.max(Math.abs(p.dot(right))/(tan*camera.aspect*margin),Math.abs(p.dot(up))/(tan*margin)));}});
  distance+=.15;
 }
 controls.maxDistance=Math.max(24,distance*1.8);
 const dest=direction.normalize().multiplyScalar(distance).add(target);
 if(!animate||reduced){camera.position.copy(dest);controls.target.copy(target);controls.update();motion=null;return;}
 motion={start:performance.now(),duration:1300,from:camera.position.clone(),to:dest,oldTarget:controls.target.clone(),target};
}
function resize(){
 const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;
 const landscape=matchMedia('(orientation: landscape) and (max-height: 520px) and (max-width: 1100px)').matches,copy=document.querySelector('.hero-copy'),copyBottom=copy.offsetTop+copy.offsetHeight;frame.top=landscape?12:Math.max(w<700?140:h<760?155:180,copyBottom+18);frame.bottom=landscape?110:w<700?118:130;frame.height=Math.max(landscape?80:110,h-frame.top-frame.bottom);
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(w,h,false);camera.aspect=w/frame.height;camera.updateProjectionMatrix();
 const narrow=w<700;if(lastNarrow!==undefined&&(lastNarrow!==narrow||lastLandscape!==landscape))home(mode,false);lastNarrow=narrow;lastLandscape=landscape;
}
function clearSelection(){selected=null;$('part-detail').hidden=true;for(const marker of markers)marker.el.setAttribute('aria-pressed','false');for(const map of[materials,...Object.values(photoModels).map(p=>p.materials)])for(const m of map.values())m.emissive?.setHex(0);}
function selectPart(id){
 document.body.dataset.annotations='true';$('toggle-parts').setAttribute('aria-pressed','true');$('toggle-parts').setAttribute('aria-label','隐藏部位标注');
 clearSelection();selected=id;
 const record=recordById.get(id),note=activeNotes()[id]||[record?.name||'内部组件','这是用户提供的 STP 中保留的原始几何。原文件未附零件明细表，具体名称和功能待厂家资料确认。'];
 $('part-number').textContent=(productId==='flow'?'CAD COMPONENT':'PHOTO EXTERIOR')+' · '+String(id+1).padStart(2,'0');$('part-name').textContent=note[0];$('part-copy').textContent=note[1];
 $('part-note').textContent=productId==='flow'?'部位按几何识别；展示配色不代表实际材质。':'照片外观重建 · 尺寸比例推定 · 不含内部结构';$('part-detail').hidden=false;
 for(const marker of markers)marker.el.setAttribute('aria-pressed',String(marker.id===id));
 for(const [key,m] of activeMaterials())if(Number(key.split(':')[0])===id)m.emissive?.setHex(0x15263b);
 controls.autoRotate=false;$('auto-rotate').setAttribute('aria-pressed','false');announceState();
}
function createMarkers(){
 $('part-markers').replaceChildren();markers.length=0;
 for(const def of(productId==='flow'?markerDefs[mode]:photoModels[productId].markers)){
  const name=activeNotes()[def.id][0],el=document.createElement('button');el.className='marker';el.dataset.partId=String(def.id);el.setAttribute('aria-label','查看'+name);el.setAttribute('aria-pressed','false');
  const n=document.createElement('b');n.textContent=def.n;const text=document.createElement('span');text.textContent=name;el.append(n,text);el.onclick=()=>selectPart(def.id);$('part-markers').append(el);
  markers.push({...def,position:new T.Vector3(...def.p),el});
 }
}
function setMode(next){
 if(productId!=='flow')return;
 mode=next;clearSelection();
 cutMotion={from:cutAmount,to:mode==='section'?1:0,start:performance.now(),duration:reduced?0:1500};
 document.body.dataset.transition='true';
 $('save-view').disabled=true;
 $('exterior-view').setAttribute('aria-pressed',String(mode==='exterior'));$('section-view').setAttribute('aria-pressed',String(mode==='section'));
 $('mode-label').textContent=mode==='exterior'?'01 / 完整外观':'02 / 中心剖面';$('cut-label').hidden=mode!=='section';
 $('view-summary').textContent=mode==='exterior'?'完整外观 · 自由旋转，近看细节。':'中心剖面 A–A · 以原模型观察内腔与组件。';
 document.body.dataset.productView=mode;controls.autoRotate=false;$('auto-rotate').setAttribute('aria-pressed','false');createMarkers();home();announceState();
}
function setProduct(next,animate=true){
 if(next!=='flow'&&!photoModels[next])return;
 clearSelection();productId=next;mode='exterior';cutAmount=0;cutMotion=null;motion=null;
 controls.autoRotate=false;$('auto-rotate').setAttribute('aria-pressed','false');
 document.body.dataset.product=next;document.body.dataset.productSource=next==='flow'?'cad':'photos';document.body.dataset.productView='exterior';document.body.dataset.annotations='false';document.body.dataset.transition='false';
 $('toggle-parts').setAttribute('aria-pressed','false');$('toggle-parts').setAttribute('aria-label','显示部位标注');$('save-view').disabled=false;
 for(const [id,p]of Object.entries(photoModels))p.root.visible=id===next;
 for(const b of document.querySelectorAll('[data-product]'))if(b.tagName==='BUTTON')b.setAttribute('aria-pressed',String(b.dataset.product===next));
 const info=productInfo();$('product-header-label').textContent=info.name;$('product-title').textContent=info.name;$('product-subtitle').textContent=info.english;
 document.title='FriesGo · '+info.name+' · 3D 产品展示';document.querySelector('.product-hero').setAttribute('aria-label',info.name+'三维产品展示');
 $('exterior-view').setAttribute('aria-pressed','true');$('section-view').setAttribute('aria-pressed','false');$('cut-label').hidden=true;
 $('section-download').hidden=next!=='flow';$('flow-basis').hidden=next!=='flow';$('photo-basis').hidden=next==='flow';$('export-model').hidden=next==='flow';
 $('mode-label').textContent=next==='flow'?'01 / 完整外观':'照片重建 · 外观比例示意';
 $('view-summary').textContent=next==='flow'?'完整外观 · 自由旋转，近看细节。':info.name+' · 照片外观重建';
 $('photo-dialog-title').textContent=info.name+' · 实物参考';$('product-photo').dataset.src='assets/'+info.photo;$('product-photo').alt=info.name+'用户提供的多视角照片';
 $('photo-dialog-note').textContent=next==='flow'?'此前提供的同类型产品照片，型号与此 CAD 的对应关系尚未核定。':'本模型依据这组用户提供的照片重建外观，照片铭牌型号为 '+info.model+'。';
 $('photo-source-note').textContent=next==='flow'?'':info.name+' · 照片铭牌 '+info.model+'；未收到对应的 STP 或尺寸图。';
 createMarkers();updateCut(performance.now());home(mode,animate);
 const url=new URL(location.href);url.searchParams.set('product',next);history.replaceState(null,'',url);announceState();
}
function updateCut(now){
 if(productId!=='flow'){roots.exterior.visible=roots.section.visible=roots.caps.visible=false;rig.rotation.z=-.12;if(groundShadow)groundShadow.position.y=-3.6;return;}
 if(cutMotion){const t=cutMotion.duration?Math.min(1,(now-cutMotion.start)/cutMotion.duration):1,e=t*t*(3-2*t);cutAmount=T.MathUtils.lerp(cutMotion.from,cutMotion.to,e);if(t===1){cutMotion=null;document.body.dataset.transition='false';$('save-view').disabled=false;}}
 cutPlane.constant=1.6*(1-cutAmount)+.000001;
 rig.rotation.z=(host.clientWidth<700?-.18:-1.17)*(1-cutAmount);
 if(groundShadow)groundShadow.position.y=host.clientWidth<700?-3.5:T.MathUtils.lerp(-2.8,-3.5,cutAmount);
 const settled=cutAmount>=.999999;
 roots.exterior.visible=!settled;roots.section.visible=settled;roots.caps.visible=!settled&&cutAmount>.72;
 const opacity=T.MathUtils.smoothstep(cutAmount,.72,1);
 for(const [key,material]of materials)if(key.endsWith(':true')){material.transparent=opacity<1;material.opacity=opacity;material.depthWrite=opacity>=1;}
}
function tick(now){
 if(motion){const t=Math.min(1,(now-motion.start)/motion.duration),e=t*t*(3-2*t);camera.position.lerpVectors(motion.from,motion.to,e);controls.target.lerpVectors(motion.oldTarget,motion.target,e);if(t===1)motion=null;}
 updateCut(now);rig.updateMatrixWorld(true);
 controls.update();
 const w=host.clientWidth,h=host.clientHeight,eye=camera.position.clone().sub(controls.target).normalize();
 for(const m of markers){const p=m.position.clone().applyMatrix4(rig.matrixWorld).project(camera);m.el.hidden=p.z<-1||p.z>1||Math.abs(p.x)>.92||Math.abs(p.y)>.92||(mode==='section'&&eye.z<.2);m.el.style.left=(p.x*.5+.5)*w+'px';m.el.style.top=(frame.top+(-p.y*.5+.5)*frame.height)+'px';}
 renderView();
}
function renderView(){renderer.setViewport(0,0,host.clientWidth,host.clientHeight);renderer.clear();renderer.setViewport(0,frame.bottom,host.clientWidth,frame.height);renderer.render(scene,camera);}
async function ensureFlowModel(){
 if(flowReady)return;
 if(!flowPromise)flowPromise=(async()=>{
  const res=await fetch('assets/flow-cad/model.json');if(!res.ok)throw Error('CAD manifest HTTP '+res.status);manifest=await res.json();
  let binary;
  if(typeof DecompressionStream==='function'){
   try{const zipped=await fetch('assets/flow-cad/'+manifest.binary+'.gz');if(!zipped.ok)throw Error('Compressed mesh unavailable');const bytes=await zipped.arrayBuffer();const signature=new Uint8Array(bytes,0,Math.min(2,bytes.byteLength));binary=signature[0]===31&&signature[1]===139?await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer():bytes;}catch(_){binary=null;}
  }
  if(!binary){const meshRes=await fetch('assets/flow-cad/'+manifest.binary);if(!meshRes.ok)throw Error('CAD mesh HTTP '+meshRes.status);binary=await meshRes.arrayBuffer();}
  const expected=Math.max(...manifest.entries.map(e=>e.normalOffset!==undefined?e.normalOffset+e.vertices*6:e.offset+e.vertices*12));if(binary.byteLength!==expected)throw Error('CAD mesh length mismatch');
  for(const entry of manifest.entries){
   const pos=new Float32Array(binary,entry.offset,entry.vertices*3),g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));if(entry.normalOffset!==undefined)g.setAttribute('normal',new T.BufferAttribute(new Int16Array(binary,entry.normalOffset,entry.vertices*3),3,true));else g.computeVertexNormals();
   const base=materialFor(entry.part,false,entry.sheet),cap=materialFor(entry.part,true,entry.sheet);
   for(const group of entry.groups){const index=group.cap?1:0,prev=g.groups[g.groups.length-1];if(prev&&prev.materialIndex===index&&prev.start+prev.count===group.start)prev.count+=group.count;else g.addGroup(group.start,group.count,index);}
   const mesh=new T.Mesh(g,[base,cap]);mesh.userData.part=entry.part;mesh.castShadow=!entry.sheet;mesh.receiveShadow=!entry.sheet;roots[entry.mode].add(mesh);recordById.set(entry.part,entry);
   if(entry.mode==='section'&&entry.groups.some(group=>group.cap)){const capGeometry=new T.BufferGeometry();capGeometry.setAttribute('position',g.attributes.position);capGeometry.setAttribute('normal',g.attributes.normal);for(const group of entry.groups.filter(group=>group.cap))capGeometry.addGroup(group.start,group.count,0);roots.caps.add(new T.Mesh(capGeometry,cap));}
  }

  flowReady=true;
 })().catch(error=>{flowPromise=null;throw error;});
 return flowPromise;
}
async function selectProduct(next,animate=true){
 if(!['flow','dp','balance'].includes(next))next='flow';const ticket=++selectionVersion;
 if(next==='flow'&&!flowReady){$('loading').hidden=false;$('loading').querySelector('p').textContent=document.documentElement.lang==='en'?'Loading 3D structure…':'正在载入三维结构…';try{await ensureFlowModel();}catch(error){if(ticket===selectionVersion){$('loading').hidden=true;$('render-error').hidden=false;}console.error('Flow geometry:',error);return false;}}
 if(ticket!==selectionVersion)return false;
 $('render-error').hidden=true;setProduct(next,animate);$('loading').hidden=true;document.body.dataset.cadReady='true';return true;
}

async function init(){
 try{
  renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,preserveDrawingBuffer:true,powerPreference:'high-performance'});
  renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.04;renderer.localClippingEnabled=true;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.autoClear=false;renderer.setClearColor(0xf5f5f7);
  scene=new T.Scene();scene.background=new T.Color(0xf5f5f7);
  camera=new T.PerspectiveCamera(32,1,.05,150);controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.dampingFactor=.06;controls.enablePan=false;controls.minDistance=6.5;controls.maxDistance=24;controls.maxPolarAngle=Math.PI*.85;controls.autoRotateSpeed=.55;
  controls.addEventListener('start',()=>{motion=null;controls.autoRotate=false;$('auto-rotate').setAttribute('aria-pressed','false');document.body.dataset.interacted='true';});
  scene.add(new T.HemisphereLight(0xeef3ff,0x8392a6,.42));
  const key=new T.DirectionalLight(0xfffaf2,2.8);key.position.set(-3,6,8);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-5,right:5,top:5,bottom:-5,near:.1,far:30});key.shadow.bias=-.00005;key.shadow.normalBias=.006;key.shadow.radius=3;scene.add(key);
  const fill=new T.DirectionalLight(0xc9dcff,.8);fill.position.set(5,1,-4);scene.add(fill);
  studioEnvironment();
  rig=new T.Group();scene.add(rig);roots.exterior=new T.Group();roots.section=new T.Group();roots.caps=new T.Group();rig.add(roots.exterior,roots.section,roots.caps);
  await Promise.all(Object.keys(PHOTO_PRODUCTS).map(async id=>{const model=await buildPhotoProduct(id);photoModels[id]=model;model.root.visible=false;rig.add(model.root);}));
  // Soft contact shadow, generated locally; no product geometry is synthesized.
  const shadowCanvas=document.createElement('canvas');shadowCanvas.width=shadowCanvas.height=128;const ctx=shadowCanvas.getContext('2d');const grad=ctx.createRadialGradient(64,64,2,64,64,64);grad.addColorStop(0,'rgba(29,43,61,.18)');grad.addColorStop(.45,'rgba(29,43,61,.07)');grad.addColorStop(1,'rgba(29,43,61,0)');ctx.fillStyle=grad;ctx.fillRect(0,0,128,128);
  groundShadow=new T.Mesh(new T.PlaneGeometry(7.6,4.8),new T.MeshBasicMaterial({map:new T.CanvasTexture(shadowCanvas),transparent:true,depthWrite:false}));groundShadow.rotation.x=-Math.PI/2;scene.add(groundShadow);
  resize();home('exterior',false);setMode('exterior');cutMotion=null;updateCut(performance.now());document.body.dataset.transition='false';document.body.dataset.annotations='false';motion=null;home('exterior',false);
  const observer=new ResizeObserver(resize);observer.observe(host);observer.observe(document.querySelector('.hero-copy'));ids.forEach(id=>$(id).disabled=false);$('loading').hidden=true;
  for(const b of document.querySelectorAll('.product-family [data-product]'))b.onclick=()=>selectProduct(b.dataset.product);
  await selectProduct(new URLSearchParams(location.search).get('product')||'flow',false);
  $('exterior-view').onclick=()=>setMode('exterior');$('section-view').onclick=()=>setMode('section');
  $('toggle-parts').onclick=()=>{const shown=document.body.dataset.annotations!=='true';document.body.dataset.annotations=String(shown);$('toggle-parts').setAttribute('aria-pressed',String(shown));$('toggle-parts').setAttribute('aria-label',shown?'隐藏部位标注':'显示部位标注');if(!shown)clearSelection();announceState();};
  $('auto-rotate').onclick=()=>{controls.autoRotate=!controls.autoRotate;$('auto-rotate').setAttribute('aria-pressed',String(controls.autoRotate));};
  $('reset-product').onclick=()=>{clearSelection();controls.autoRotate=false;$('auto-rotate').setAttribute('aria-pressed','false');home();};
  $('part-detail').onpointerdown=e=>e.stopPropagation();$('detail-close').onclick=clearSelection;
  let down;canvas.addEventListener('pointerdown',e=>down={x:e.clientX,y:e.clientY});
  canvas.addEventListener('pointerup',e=>{if(cutMotion||!down||Math.hypot(e.clientX-down.x,e.clientY-down.y)>5)return;const rect=canvas.getBoundingClientRect(),y=e.clientY-rect.top-frame.top;if(y<0||y>frame.height)return;pointer.set((e.clientX-rect.left)/rect.width*2-1,-y/frame.height*2+1);ray.setFromCamera(pointer,camera);const pickRoot=productId==='flow'?roots[mode]:photoModels[productId].root,hit=ray.intersectObjects(pickRoot.children,true)[0];if(hit)selectPart(hit.object.userData.part);else clearSelection();});
  canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Home','Escape'].includes(e.key))return;e.preventDefault();motion=null;if(e.key==='Escape')clearSelection();else if(e.key==='Home')home();else{const offset=camera.position.clone().sub(controls.target),spherical=new T.Spherical().setFromVector3(offset);if(e.key==='ArrowLeft')spherical.theta-=.13;if(e.key==='ArrowRight')spherical.theta+=.13;if(e.key==='ArrowUp')spherical.phi=Math.max(.1,spherical.phi-.1);if(e.key==='ArrowDown')spherical.phi=Math.min(controls.maxPolarAngle,spherical.phi+.1);if(['+','='].includes(e.key))spherical.radius=Math.max(controls.minDistance,spherical.radius*.9);if(e.key==='-')spherical.radius=Math.min(controls.maxDistance,spherical.radius*1.1);camera.position.copy(controls.target).add(new T.Vector3().setFromSpherical(spherical));controls.update();}});
  $('save-view').onclick=()=>{
   const previousRatio=renderer.getPixelRatio();renderer.setPixelRatio(Math.max(2,previousRatio));renderView();
   const image=document.createElement('canvas');image.width=canvas.width;image.height=canvas.height+130;const c=image.getContext('2d'),padding=Math.max(20,Math.min(40,image.width*.035)),titleSize=Math.max(14,Math.min(28,Math.floor(image.width/26)));c.fillStyle='#f5f5f7';c.fillRect(0,0,image.width,image.height);c.drawImage(canvas,0,0);c.fillStyle='#1d1d1f';c.font=titleSize+'px sans-serif';c.fillText(productInfo().name+' · '+(mode==='section'?'中心剖面 A–A':'完整外观'),padding,canvas.height+44);c.fillStyle='#6e6e73';c.font=Math.max(12,Math.floor(titleSize*.6))+'px sans-serif';c.fillText(productId==='flow'?'依据用户提供的 STP 几何 · 展示配色 · 非制造图':'依据用户照片重建外观 · 尺寸比例推定 · 非制造图',padding,canvas.height+77);
   renderer.setPixelRatio(previousRatio);renderView();
   image.toBlob(blob=>{if(!blob)return;const a=document.createElement('a'),url=URL.createObjectURL(blob);a.href=url;a.download='FriesGo_'+productInfo().name+'_'+mode+'.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);},'image/png');
  };
  $('export-model').onclick=async()=>{if(productId==='flow')return;const id=productId,button=$('export-model');button.disabled=true;button.textContent='正在导出…';clearSelection();try{const {GLTFExporter}=await import('../assets/GLTFExporter.js');const copy=photoModels[id].root.clone(true);copy.updateMatrixWorld(true);const result=await new GLTFExporter().parseAsync(copy,{binary:true,onlyVisible:true,maxTextureSize:1024});const url=URL.createObjectURL(new Blob([result],{type:'model/gltf-binary'})),a=document.createElement('a');a.href=url;a.download=PHOTO_PRODUCTS[id].file;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);button.textContent='下载三维模型 ↗';}catch(error){console.error('Photo model export:',error);button.textContent='导出失败，点此重试';}finally{button.disabled=false;}};
  renderer.setAnimationLoop(tick);
  document.addEventListener('visibilitychange',()=>renderer.setAnimationLoop(document.hidden?null:tick));
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();renderer.setAnimationLoop(null);$('render-error').hidden=false;});
 }catch(e){productId=['flow','dp','balance'].includes(new URLSearchParams(location.search).get('product'))?new URLSearchParams(location.search).get('product'):'flow';announceState();console.error('CAD product viewer:',e);$('loading').hidden=true;$('render-error').hidden=false;document.body.dataset.cadReady='error';}
}
$('photo-open').onclick=()=>{const info=productInfo();$('product-photo').src='assets/'+info.photo;$('product-photo').alt=info.name+'实物照片';$('photo-dialog').showModal();announceState();};$('photo-close').onclick=()=>$('photo-dialog').close();$('retry-model').onclick=()=>location.reload();
init();
