import * as T from 'three';

// Exterior-only reconstructions. All coordinates are relative presentation
// proportions inferred from the supplied photographs, never CAD dimensions.
export const PHOTO_PRODUCTS={
 dp:{name:'自力式压差控制阀',english:'Self-acting differential pressure control valve.',model:'ZTY47-16',photo:'photo-dp.jpg',file:'压差控制阀_照片外观.glb'},
 balance:{name:'数字锁定平衡阀',english:'Manual balancing valve with mechanical setting indicator.',model:'SP45-16',photo:'photo-balance.jpg',file:'数字锁定平衡阀_照片外观.glb'}
};
const v=a=>new T.Vector3(...a),Y=new T.Vector3(0,1,0),Z=new T.Vector3(0,0,1);
const texturePromises=new Map();
function plateTexture(id){if(!texturePromises.has(id))texturePromises.set(id,new T.TextureLoader().loadAsync('assets/plate-'+id+'.png?v=20261101-plate3').then(t=>{t.colorSpace=T.SRGBColorSpace;return t;}));return texturePromises.get(id);}
function roundedRect(w,h,r){const s=new T.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;}
function plateGrid(w,h,r){
 const positions=[],uvs=[],indices=[],nx=64,ny=16;
 for(let i=0;i<=nx;i++){const x=-w/2+w*i/nx,dx=Math.max(0,Math.abs(x)-(w/2-r)),bound=h/2-r+Math.sqrt(Math.max(0,r*r-dx*dx));for(let j=0;j<=ny;j++){const y=-bound+2*bound*j/ny;positions.push(x,y,0);uvs.push((x+w/2)/w,(y+h/2)/h);}}
 for(let i=0;i<nx;i++)for(let j=0;j<ny;j++){const a=i*(ny+1)+j,b=a+ny+1;indices.push(a,b,b+1,a,b+1,a+1);}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();return g;
}
function stampTexture(){const c=document.createElement('canvas');c.width=256;c.height=384;const x=c.getContext('2d');x.clearRect(0,0,256,384);x.textAlign='center';x.font='bold 80px sans-serif';x.fillStyle='#063477';x.shadowColor='#62a5ff';x.shadowOffsetX=2;x.shadowOffsetY=2;x.shadowBlur=1;x.fillText('DN50',128,145);x.font='bold 73px sans-serif';x.fillText('16',128,250);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;}

export async function buildPhotoProduct(id){
 if(!PHOTO_PRODUCTS[id])throw Error('Unknown photo product: '+id);
 const plateMap=await plateTexture(id),root=new T.Group(),parts=new Map(),notes={},markers=[],materialMap=new Map();let counter=0;
 root.name=PHOTO_PRODUCTS[id].name+' · 照片外观模型';
 root.userData={source:'user-supplied multi-view photographs',geometryStatus:'exterior visual reconstruction',dimensions:'inferred relative proportions, not measured millimetres',internalStructure:'not modelled',photoModel:PHOTO_PRODUCTS[id].model};
 const base={
  blue:new T.MeshPhysicalMaterial({color:0x0752c5,metalness:.13,roughness:.31,clearcoat:.7,clearcoatRoughness:.2,envMapIntensity:1.25}),
  edge:new T.MeshPhysicalMaterial({color:0x094db8,metalness:.18,roughness:.26,clearcoat:.78,clearcoatRoughness:.18,envMapIntensity:1.2}),
  darkBlue:new T.MeshStandardMaterial({color:0x072d64,metalness:.12,roughness:.65}),
  steel:new T.MeshPhysicalMaterial({color:0xc8cdd3,metalness:.95,roughness:.22,clearcoat:.15,envMapIntensity:1.35}),
  brass:new T.MeshPhysicalMaterial({color:0xc99a46,metalness:.82,roughness:.3,clearcoat:.12,envMapIntensity:1.1}),
  copper:new T.MeshPhysicalMaterial({color:0xb96b37,metalness:.88,roughness:.24,clearcoat:.1,envMapIntensity:1.15}),
  red:new T.MeshPhysicalMaterial({color:0xc7081b,metalness:.12,roughness:.24,clearcoat:.85,clearcoatRoughness:.17,envMapIntensity:1.25}),
  black:new T.MeshStandardMaterial({color:0x14191e,metalness:.25,roughness:.6}),
  plate:new T.MeshStandardMaterial({map:plateMap,metalness:.3,roughness:.45,side:T.DoubleSide})
 };
 function component(name,copy,p){const g=new T.Group(),n=counter++;g.name=name;g.userData.part=n;g.userData.source='photo exterior';root.add(g);parts.set(n,g);notes[n]=[name,copy];if(p)markers.push({id:n,p,n:String(markers.length+1).padStart(2,'0')});return g;}
 function owner(g){while(g.userData.part===undefined&&g.parent)g=g.parent;return g.userData.part;}
 function mat(g,key){const n=owner(g),cache=n+':'+key;if(!materialMap.has(cache)){const m=base[key].clone();m.name=nameFor(key)+' · 展示配色';materialMap.set(cache,m);}return materialMap.get(cache);}
 function nameFor(key){return{blue:'蓝色铸造阀体',edge:'蓝色连接面',darkBlue:'端口内壁',steel:'金属外观',brass:'黄铜外观',copper:'铜管外观',red:'红色手轮',black:'深色细节',plate:'原照片铭牌'}[key];}
 function mesh(g,geo,key,p){const o=new T.Mesh(geo,mat(g,key));if(p)o.position.copy(v(p));o.castShadow=o.receiveShadow=key!=='plate';o.userData.part=owner(g);g.add(o);return o;}
 function cylinder(g,a,b,r,key,r2=r,n=64){const axis=v(b).sub(v(a)),o=mesh(g,new T.CylinderGeometry(r2,r,axis.length(),n,1,false),key);o.position.copy(v(a).add(v(b)).multiplyScalar(.5));o.quaternion.setFromUnitVectors(Y,axis.normalize());return o;}
 function turned(g,profile,key,axis=[0,1,0],p=[0,0,0]){const o=mesh(g,new T.LatheGeometry(profile.map(a=>new T.Vector2(...a)),96),key,p);o.quaternion.setFromUnitVectors(Y,v(axis).normalize());return o;}
 function torus(g,p,r,t,key,axis=[0,0,1]){const o=mesh(g,new T.TorusGeometry(r,t,16,112),key,p);o.quaternion.setFromUnitVectors(Z,v(axis).normalize());return o;}
 function hex(g,p,r,depth,key,axis=[0,0,1]){const shape=new T.Shape();for(let i=0;i<6;i++){const a=i*Math.PI/3,x=Math.cos(a)*r,y=Math.sin(a)*r;if(i===0)shape.moveTo(x,y);else shape.lineTo(x,y);}shape.closePath();const bevel=Math.min(.012,depth*.12,r*.12),geo=new T.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelSize:bevel,bevelThickness:bevel,bevelSegments:2,curveSegments:1});geo.translate(0,0,-depth/2);const o=mesh(g,geo,key,p);o.quaternion.setFromUnitVectors(Z,v(axis).normalize());return o;}
 function pipe(g,pts,r,key,steps=80){return mesh(g,new T.TubeGeometry(new T.CatmullRomCurve3(pts.map(v),false,'centripetal'),steps,r,12,false),key);}
 function flange(g,y){
  const s=new T.Shape();s.absarc(0,0,.8,0,Math.PI*2,false);const bore=new T.Path();bore.absarc(0,0,.27,0,Math.PI*2,true);s.holes.push(bore);
  for(let i=0;i<4;i++){const a=(i+.5)*Math.PI/2,h=new T.Path();h.absarc(.61*Math.cos(a),.61*Math.sin(a),.09,0,Math.PI*2,true);s.holes.push(h);}
  const o=mesh(g,new T.ExtrudeGeometry(s,{depth:.14,bevelEnabled:true,bevelThickness:.012,bevelSize:.012,bevelSegments:3,curveSegments:48,steps:1}),'edge');o.rotation.x=-Math.PI/2;o.position.y=y-.07;
  // Annular seating land, preserving the real through bore and bolt holes.
  turned(g,[[.27,y-.083],[.36,y-.083],[.36,y+.083],[.27,y+.083]],'edge');
 }
 function nameplate(g,p,normal=[-1,0,0],vertical=true,wrapRadius=0,tangent=null,wrapAxis='x'){
  const plate=new T.Group();plate.position.copy(v(p));const localX=tangent?v(tangent).normalize():vertical?new T.Vector3(0,1,0):new T.Vector3(1,0,0),n=v(normal).normalize(),localY=new T.Vector3().crossVectors(n,localX).normalize();plate.quaternion.setFromRotationMatrix(new T.Matrix4().makeBasis(localX,localY,n));g.add(plate);
  const warp=geo=>{if(!wrapRadius)return;const pos=geo.attributes.position;for(let i=0;i<pos.count;i++){const u=wrapAxis==='x'?pos.getX(i):pos.getY(i);pos.setZ(i,pos.getZ(i)+Math.sqrt(wrapRadius**2-u*u)-wrapRadius);}pos.needsUpdate=true;geo.computeVertexNormals();};
  // Interior grid vertices keep the plate on the curved casting instead of
  // letting large boundary-only triangles sink through its centre.
  const backGeo=plateGrid(.70,.29,.13);warp(backGeo);mesh(plate,backGeo,'steel',[0,0,.009]);
  const geo=plateGrid(.68,.27,.12);warp(geo);mesh(plate,geo,'plate',[0,0,.019]);
  for(const x of[-.27,.27]){const z=wrapRadius&&wrapAxis==='x'?Math.sqrt(wrapRadius**2-x*x)-wrapRadius:0;cylinder(plate,[x,0,z+.012],[x,0,z+.03],.025,'steel',.025,24);mesh(plate,new T.BoxGeometry(.026,.004,.002),'black',[x,0,z+.031]);}
 }
 const body=component('铸造阀体','按实拍轮廓重建蓝色阀体与上下连接颈。照片只能确定外观，内部控制机构未推测建模。',[.0,.04,-.48]);
 turned(body,id==='dp'?[[.27,-.94],[.35,-.94],[.35,-.73],[.42,-.53],[.55,-.27],[.59,.0],[.55,.31],[.43,.52],[.35,.72],[.35,.94],[.27,.94]]:[[.27,-.94],[.34,-.94],[.34,-.73],[.38,-.53],[.44,-.27],[.44,.0],[.38,.31],[.33,.52],[.33,.72],[.33,.94],[.27,.94]],'blue');
 // Only the short, visible port walls are modelled. There is no invented bore
 // through the control chamber, and no fictional section of this model.
 for(const sign of[-1,1]){turned(body,[[.27,sign*.66],[.27,sign*1.06]],'darkBlue');cylinder(body,[0,sign*.64,0],[0,sign*.65,0],.268,'black');}
 const flanges=component('上下法兰与螺栓孔','两端各四个通孔、中心端口及连接凸台按照片表现。孔径、孔距和端面距离仅为外观比例，不能据此配管加工。',[.56,1.04,.16]);flange(flanges,-1.01);flange(flanges,1.01);
 const back=component('背面端盖','端盖、中央六角凸起和紧固点按照片中可见的外形保留。',[0,0,-.8]);
 if(id==='dp'){
  turned(back,[[0,0],[.28,0],[.39,.13],[.50,.16],[.50,.25],[.45,.29],[0,.29]],'blue',[0,0,-1],[0,0,-.28]);
  hex(back,[0,0,-.61],.49,.17,'edge',[0,0,-1]);hex(back,[0,0,-.74],.13,.095,'edge',[0,0,-1]);
  notes[back.userData.part]=['大六角端盖与中央堵头','背面照片显示大六角端盖与中央小堵头，侧面可观察端盖与阀体的连接。'];back.name=notes[back.userData.part][0];
  const head=component('圆形控制盖','大圆控制盖、分体接缝与六只蓝色紧固螺栓按控制端正面照片重建。这里没有生成不可见的膜片或阀芯。',[.46,.24,.99]);
  turned(head,[[0,.23],[.32,.23],[.46,.43],[.68,.59],[.77,.64],[.78,.78],[.755,.79],[.75,.94],[.71,.99],[0,.99]],'blue',[0,0,1]);torus(head,[0,0,.79],.763,.012,'darkBlue');
  for(let i=0;i<6;i++){const a=(i+.5)*Math.PI/3,p=[.61*Math.cos(a),.61*Math.sin(a),1.025];hex(head,p,.076,.067,'edge');hex(head,[p[0],p[1],1.06],.031,.003,'darkBlue');}
  const ports=component('黄铜接口与调节端','控制盖正面的黄铜接口、中央调节端和下部接口依据实拍布置；不把模型位置当作现场接管或调节依据。',[0,0,1.14]);
  cylinder(ports,[0,0,.99],[0,0,1.08],.17,'brass');hex(ports,[0,0,1.105],.12,.055,'brass');cylinder(ports,[0,0,1.13],[0,0,1.147],.087,'brass');mesh(ports,new T.BoxGeometry(.017,.12,.004),'black',[0,0,1.15]);
  for(const y of[-.54,.55]){hex(ports,[0,y,1.04],.08,.13,'brass');cylinder(ports,[0,y,1.10],[0,y,1.16],.044,'brass');}
  const copper=component('铜导压管与接头','铜管绕成盘管，方向按多视图校正：控制端正面看是窄边，侧面才看到圆环。自由端保留黄铜接头，未虚构它接入某一管道。',[0,1.53,2.08]);
  const coil=[];for(let i=0;i<=240;i++){const t=i/240,a=Math.PI-5*Math.PI*t;coil.push([-.11+.22*t,1.48+.72*Math.cos(a),1.4+.72*Math.sin(a)]);}
  pipe(copper,[[0,.55,1.16],[0,.64,1.26],coil[0]],.018,'copper',44);pipe(copper,coil,.018,'copper',440);
  const end=coil[coil.length-1],tip=[end[0],1.75,.10];pipe(copper,[end,[end[0],2.2,.99],[end[0],2.04,.57],tip],.018,'copper',100);
  const axis=v([0,-.45,-1]).normalize();hex(copper,v(tip).addScaledVector(axis,.055).toArray(),.077,.14,'brass',axis.toArray());cylinder(copper,v(tip).addScaledVector(axis,.12).toArray(),v(tip).addScaledVector(axis,.18).toArray(),.055,'brass');cylinder(copper,v(tip).addScaledVector(axis,.182).toArray(),v(tip).addScaledVector(axis,.185).toArray(),.021,'black');
  const tag=component('原厂铭牌','直接使用这组照片中的铭牌裁片，保留原厂名称与型号。铭牌对应照片样品，不作为模型已核定尺寸的证明。',[-.80,0,.80]);nameplate(tag,[-.80,0,.79],[-1,0,0],true,.8);
 }else{
  // The Y-shaped bonnet joins the body at the actual oblique direction.
  mesh(back,new T.BoxGeometry(.10,.98,.12),'blue',[0,0,-.43]);
  for(const y of[-.51,.51]){cylinder(back,[0,y,-.30],[0,y,-.49],.125,'blue');hex(back,[0,y,-.53],.10,.09,'edge',[0,0,-1]);}
  notes[back.userData.part]=['背部加强筋与两个紧固点','按背视图保留纵向加强筋与上、下两个蓝色紧固点。'];back.name=notes[back.userData.part][0];
  const axis=v([0,.63,.78]).normalize(),start=v([0,-.27,.19]);
  const bonnet=component('斜置阀盖与连接螺栓','阀体的斜置支管、分体阀盖与紧固点按正侧面照片重建，保留其斜向安装的轮廓。',[.24,.28,.66]);
  cylinder(bonnet,start.toArray(),start.clone().addScaledVector(axis,.87).toArray(),.30,'blue',.28);const capCenter=start.clone().addScaledVector(axis,.90);
  turned(bonnet,[[.0,-.10],[.35,-.10],[.36,-.04],[.36,.08],[.32,.13],[.20,.17],[0,.17]],'blue',axis.toArray(),capCenter.toArray());
  const basisX=new T.Vector3(1,0,0),basisY=new T.Vector3().crossVectors(axis,basisX).normalize();
  for(let i=0;i<6;i++){const a=(i+.5)*Math.PI/3,p=capCenter.clone().addScaledVector(basisX,Math.cos(a)*.30).addScaledVector(basisY,Math.sin(a)*.30).addScaledVector(axis,.12);hex(bonnet,p.toArray(),.055,.065,'edge',axis.toArray());}
  const dial=component('机械开度刻度与锁定端','实拍中的银色套筒、黄铜开度盘和锁定端。数字锁定是机械刻度与锁定结构，本模型不模拟读数、锁定动作或刻度对应流量。',[0,.57,1.03]);
  const center=capCenter.clone().addScaledVector(axis,.30);turned(dial,[[0,-.16],[.23,-.16],[.29,-.11],[.29,.11],[.25,.15],[.13,.15],[0,.15]],'steel',axis.toArray(),center.toArray());
  torus(dial,center.clone().addScaledVector(axis,.12).toArray(),.267,.018,'steel',axis.toArray());
  cylinder(dial,center.clone().addScaledVector(axis,.12).toArray(),center.clone().addScaledVector(axis,.23).toArray(),.20,'brass');
  const ticks=new T.Group();ticks.position.copy(center.clone().addScaledVector(axis,.237));ticks.quaternion.setFromUnitVectors(Z,axis);dial.add(ticks);
  for(let i=0;i<32;i++){const a=i/32*Math.PI*2,r=.173,bar=mesh(ticks,new T.BoxGeometry(i%4===0?.027:.016,.003,.002),'black',[r*Math.cos(a),r*Math.sin(a),0]);bar.rotation.z=a;}
  const wheel=component('红色三辐手轮','红色圆环、三根轮辐与中央六角紧固件按手轮正面照片重建。仅显示实拍外观，不推算调节圈数。',[.46,.95,1.26]);
  const wc=center.clone().addScaledVector(axis,.34),wg=new T.Group();wg.position.copy(wc);wg.quaternion.setFromUnitVectors(Z,axis);wheel.add(wg);
  torus(wg,[0,0,0],.66,.064,'red');
  for(let i=0;i<3;i++){const a=(i/3+.25)*Math.PI*2;pipe(wg,[[.05*Math.cos(a),.05*Math.sin(a),0],[.29*Math.cos(a+.045),.29*Math.sin(a+.045),.01],[.63*Math.cos(a),.63*Math.sin(a),0]],.044,'red',44);}
  cylinder(wg,[0,0,-.055],[0,0,.05],.14,'red');hex(wg,[0,0,.074],.105,.055,'black');cylinder(wg,[0,0,.10],[0,0,.106],.044,'steel');cylinder(wg,[0,0,.107],[0,0,.11],.022,'black');
  const tag=component('原厂铭牌','使用这组照片中的原厂铭牌，保留 SP45-16、DN50 等可见信息；未替换成供应商品牌制造标识。',[-.31,.10,.54]);
  // The plate follows the side of the oblique bonnet, rather than the body.
  const tagCenter=capCenter.clone().addScaledVector(axis,-.12).add(new T.Vector3(-.375,0,0));nameplate(tag,tagCenter.toArray(),[-1,0,0],true,.375,axis.toArray(),'y');
 }
 const stamp=component('阀体铸字','DN50 与 16 为照片中可见的铸字，外观按比例表达，不是尺寸测量或压力等级的独立核验证明。');
 const st=mesh(stamp,new T.PlaneGeometry(.33,.50),'blue',[id==='dp'?-.592:-.445,.0,0]);st.rotation.y=-Math.PI/2;st.material=base.blue.clone();st.material.map=stampTexture();st.material.transparent=true;st.material.depthWrite=false;st.material.polygonOffset=true;st.material.polygonOffsetFactor=-1;materialMap.set(owner(stamp)+':cast-mark',st.material);
 root.updateMatrixWorld(true);const box=new T.Box3().setFromObject(root,true),center=box.getCenter(new T.Vector3()),factor=5.9/box.getSize(new T.Vector3()).y;
 // Bake the same rigid centering and uniform display scale into the mesh nodes
 // and marker coordinates; no conversion to supposed real-world millimetres.
 root.position.copy(center).multiplyScalar(-factor);root.scale.setScalar(factor);root.updateMatrixWorld(true);
 const wrapper=new T.Group();wrapper.name=root.name;wrapper.userData={...root.userData};wrapper.add(root);
 for(const marker of markers)marker.p=v(marker.p).sub(center).multiplyScalar(factor).toArray();
 wrapper.userData.partCount=parts.size;
 return{root:wrapper,parts,notes,markers,materials:materialMap,catalog:PHOTO_PRODUCTS[id],bounds:new T.Box3().setFromObject(wrapper,true)};
}
