import * as T from '../assets/three.r160.min.js';
import {OrbitControls} from '../assets/OrbitControls.js?v=release-6c26aae12b2f';
import {createRenderLoop} from './render-loop.js?v=release-6c26aae12b2f';
(()=>{
const DATA=(()=>{

const PRODUCTS={
 dp:{name:'自力式压差控制阀',photo:'photo-dp.jpg',photoModel:'ZTY47-16',drawingModel:'ZTY47-16',short:'压差阀',description:'侧置圆形控制腔与阀体相连；控制盖上有铜制接头，铜导压管从这里引出。背面为蓝色端盖，两端为四孔法兰。',features:[['body','铸造阀体','按照片的鼓形主体、法兰颈与蓝色涂层重建。'],['flanges','通道与法兰','保留中间通孔、四个螺栓孔和法兰凸台，可从端口方向观察。'],['head','侧置控制端','圆形控制盖与主流道垂直，带周向螺栓和铜接头。'],['cap','背面端盖','与控制端相对的蓝色封盖，中央有六角形封头。'],['copper','铜导压管','单阀视图显示照片中的盘绕铜管；系统视图按图纸取压点连接。'],['plate','铭牌','以照片型号标识外形参考，未复制出厂日期或检验标志。']],note:'照片可确认型号 ZTY47-16、样品口径 DN50。当前三维按照片比例重建，没有将照片比例换算成制造尺寸。'},
 flow:{name:'自力式流量控制阀',photo:'photo-flow.jpg',photoModel:'ZL47-25',drawingModel:'ZL4M',short:'流量阀',description:'一侧为蓝色圆形端盖，另一侧为伸出的同轴调节机构，末端带银色刻度调节环和细调节杆；没有外接盘绕导压铜管。',features:[['body','铸造阀体','鼓形阀体与上下法兰颈，蓝色涂层外观。'],['flanges','通道与法兰','保留通孔、四孔法兰及连接凸台。'],['head','银色调节端','侧向伸出的调节机构，包含分层轴肩、银色刻度环和末端调节杆。'],['cap','蓝色端盖','与调节端相对的圆形封盖及周向螺栓。'],['plate','铭牌','照片铭牌为 ZL47-25，图纸文字为 ZL4M；页面分别保留。']],note:'图纸标注 ZL4M，照片铭牌为 ZL47-25；只用照片校正外形，不将两者认定为同一规格。照片阀体铸字与铭牌压力标识亦不完全一致，本版不据此宣称压力等级。'},
 balance:{name:'数字锁定平衡阀',photo:'photo-balance.jpg',photoModel:'SP45-16',drawingModel:'SP45F',short:'平衡阀',description:'阀杆斜置，蓝色斜向阀盖上接银色刻度机构，末端为红色三辐手轮。主通道沿两端法兰贯通。',features:[['body','斜置阀体','保留主管外形及斜向阀盖连接，不再画成普通直立截止阀。'],['flanges','通道与法兰','四孔法兰、密封凸台与中间开口。'],['head','刻度与阀杆','斜置的银色刻度环、黄铜轴套及中轴。'],['wheel','红色三辐手轮','红色圆环、三个辐条及中央锁紧件。'],['cap','背面堵头','阀体背面的六角堵头与加强筋位置。'],['plate','铭牌','照片型号为 SP45-16，原图文字为 SP45F，分别呈现。']],note:'图纸标注 SP45F，照片铭牌为 SP45-16。采用照片校正三辐手轮和斜置阀杆外观，不据此替换图纸的选型。'}
};
const PARTS={
 dp:{name:'自力式压差控制阀',model:'图纸 ZTY47-16',product:'dp',copy:'按原图布置在回水侧或集水器支路，通过导压连接观察对应管段压差。原图说明为减小回路或单元之间的调节干扰。'},
 flow:{name:'自力式流量控制阀',model:'图纸 ZL4M · 照片 ZL47-25',product:'flow',copy:'原图布置在锅炉或热源支路，文字说明为消除干扰、平衡流量。本版用实拍流量阀校正侧向调节端外观。'},
 balance:{name:'数字锁定平衡阀',model:'图纸 SP45F · 照片 SP45-16',product:'balance',copy:'原图位于分水器支线，用于支线流量粗调。红色手轮和银色刻度机构按照片重建；未赋予开度与流量的数值关系。'},
 ball:{name:'全焊接球阀',model:'原图图例 1',copy:'用于关断所在管段。此型号未提供实拍照片，银灰色阀体和手柄采用通用外形示意。'},
 filter:{name:'全焊接过滤一体球阀',model:'原图图例 2',copy:'兼具过滤及关断功能。按原图位置布置，外形为通用示意，未提供对应型号的照片或尺寸。'},
 check:{name:'限流止回阀',model:'原图 LH45 / LH45-16',copy:'布置在原图水泵或源侧支路。保留与泵及关断阀的串联顺序；外形采用通用示意。'},
 selfdp:{name:'自力式自身压差控制阀',model:'图纸 ZTY47-16C / ZTY(C)47',copy:'按原图布置于集水器与分水器之间的旁通，图注为保护机组、热源。没有实拍照片，外形示意不能等同于照片中的 ZTY47-16。'},
 butterfly:{name:'支路关断阀',model:'原图支路关断符号 · 通用外形',copy:'按原图设备支路的关断位置布置。空调机组详图使用斜板符号；本版采用薄型阀体和扳柄示意，具体阀型以原图或选型资料确认为准。'},
 motor:{name:'电动调节阀',model:'原图 M 标识',copy:'原图机组支路的电动调节阀，与空气侧测点间的虚线为控制信号。本版将控制信号与水管、铜导压管分别显示。'},
 pump:{name:'水泵',model:'原图泵符号',copy:'依据原图泵符号数量和连接关系重建。机壳、底座、电机为通用外形，不代表已确认的厂家型号。'},
 boiler:{name:'锅炉',model:'原图源侧设备',copy:'原图中的热源设备，以通用机柜外形呈现；不设定容量、燃料、压力和运行状态。'},
 chiller:{name:'制冷机',model:'原图冷源设备',copy:'按原图四台制冷机布置，配套五条冷冻泵支路，其中一条为与相邻泵支路汇接的备用路径。设备外形为通用示意。'},
 collector:{name:'集水器',model:'回水侧汇集',copy:'原图集水器汇集末端回水，支路按原图配置压差控制阀及关断阀。'},
 distributor:{name:'分水器',model:'供水侧分配',copy:'原图分水器向末端支线分配，三个出口支路设置数字锁定平衡阀及关断阀。'},
 fau:{name:'新风机组',model:'原图末端设备',copy:'展示水侧盘管、机组机箱及送风方向位置，空气侧测点与电动阀之间为控制信号。'},
 ahu:{name:'空气处理机组',model:'原图空调箱',copy:'按图纸保留盘管、风机和供回水接口的相对位置；机箱可透视，风机仅作设备识别。'},
 fcu:{name:'风机盘管',model:'原图末端设备',copy:'按图纸中四台风机盘管的支路关系布置。回水支路保留压差调节与电动阀的相对位置。'},
 household:{name:'用户侧末端',model:'原图 1 / 2 / 3 号用户',copy:'原图每层有三个用户末端，共两层六个。各用户有供、回水关断位置，整层入口配置过滤球阀和压差控制组合。'},
 riser:{name:'供回水立管',model:'原图单元入口',copy:'按原图右侧两根立管与用户侧入口相连。供回水着色用于识别，实际流向未由计算验证。'},
 sensor:{name:'空气侧测点',model:'原图虚线控制连接',copy:'原图空气侧圆圈测点与 M 执行器之间为控制信号，不是水管或导压管。'}
};
const SCHEMES={
 hvac:{number:'01',title:'空调水系统总方案',drawing:'drawing-hvac.png',location:'原图左上',summary:'三个末端回路、集分水器、冷冻泵与制冷机、热水泵与锅炉，在同一套三维场景中展开。',facts:['14 个末端：5 新风 + 5 空调箱 + 4 风机盘管','冷源：4 台制冷机 · 5 条冷冻泵支路','热源：2 台锅炉 · 3 条热水泵支路'],zones:[['all','全部系统'],['terminals','末端回路'],['headers','集分水器'],['cold','冷源机房'],['hot','热源机房']],steps:[['末端回路','上、中、下三个回路分别连接新风、空调箱及风机盘管。','terminals'],['支线调节','回水支线设置压差控制，供水支线设置数字锁定平衡阀。','headers'],['冷源连接','五条冷冻泵支路连接四台制冷机，保留备用泵汇接。','cold'],['热源连接','三条热水泵支路连接两台锅炉，保留流量阀与止回阀位置。','hot']],note:'按左上图框全部设备分组重建。空间位置为方便讲解展开，不作为机房布置尺寸。'},
 heating:{number:'02',title:'供暖水系统总方案',drawing:'drawing-heating.png',location:'原图右上',summary:'两层六个用户、单元入口压差组合、集分水器及双锅炉热源，逐段查看连接关系。',facts:['2 层 × 3 户，共 6 个用户末端','3 对集分水器支路，含一对预留接口','2 台锅炉 · 2 条水泵支路'],zones:[['all','全部系统'],['homes','两层六户'],['entry','单元入口阀组'],['headers','集分水器'],['hot','锅炉与水泵']],steps:[['分户末端','保留两层、每层三个用户及各户关断位置。','homes'],['单元入口','每层公共入口均有过滤一体球阀、回水球阀和压差控制阀。','entry'],['集分水器','三对出口保留关断阀、压差阀、平衡阀与导压连接。','headers'],['热源支路','两条泵支路经限流止回阀、流量阀与两台锅炉相连。','hot']],note:'按右上图框重建六个用户、两组单元入口、三对集分水器支路与双锅炉热源。预留口按原图保留。'},
 ahu:{number:'03',title:'空调机组入口方案',drawing:'drawing-ahu.png',location:'原图左下',summary:'放大单台新风机组的水侧阀件，区分关断、压差调节、电动阀及空气侧控制信号。',facts:['1 台新风机组与空气侧测点','机组供、回水支路各一处关断阀','支路调节反馈与空气控制信号分别显示'],zones:[['all','全部入口'],['branch','机组阀组'],['main','干管阀组'],['unit','盘管与空气测点']],steps:[['干管阀组','查看干管的关断位置与压差控制组合。','main'],['供水支路','供水经机组入口关断阀进入盘管。','branch'],['回水调节','机组回水经电动阀、压差调节阀和关断阀返回干管。','branch'],['控制连接','铜色线表示调节反馈；黄色虚线表示 M 执行器至空气侧测点的信号。','unit']],note:'图中支路斜板符号按关断阀示意；带半圆控制头符号按图例 3 识别为压差调节类。照片只用于相应阀门的外形校正。'},
 entry:{number:'04',title:'供暖单元入口方案',drawing:'drawing-entry.png',location:'原图右下',summary:'保留左侧用户、供回水关断位置、供水过滤一体球阀、回水压差控制阀及右侧立管。',facts:['1 个用户侧末端及两处用户关断','供水过滤一体球阀 × 1','回水球阀 × 2 · 压差控制阀 × 1'],zones:[['all','全部入口'],['valves','入口阀组'],['home','用户侧'],['riser','供回水立管']],steps:[['用户侧连接','左侧保留用户末端及供、回水两处关断。','home'],['供水过滤','供水侧过滤一体球阀兼顾过滤及关断。','valves'],['回水压差阀','压差阀位于回水管，球阀位于其两侧。','valves'],['导压与立管','导压连接延伸至供水侧取压点，右侧立管保留顶部阀件。','riser']],note:'包含用户侧、入口阀组与供回水立管。导压连接依据原图，控制端外形依据实拍。'}
};

return {PRODUCTS,PARTS,SCHEMES};})();
const SCENARIO_DATA=(()=>{const SCENARIOS={"hvac": {"title": "酒店 · 空调水系统", "names": ["会议区新风", "宴会空调箱", "餐饮空调箱", "餐饮新风", "客房组 A · 30 间", "客房组 B · 30 间", "客房新风", "客房组 C · 30 间", "客房组 D · 30 间", "大堂新风", "康体新风", "大堂空调箱", "康体空调箱", "后勤空调箱"], "contexts": ["会议与餐饮层", "客房代表层", "大堂与公共区"]}, "heating": {"title": "小区楼栋 · 供暖水系统", "names": ["1 单元近端组 · 12 户", "1 单元中间组 · 12 户", "1 单元远端组 · 12 户", "2 单元近端组 · 12 户", "2 单元中间组 · 12 户", "2 单元远端组 · 12 户"], "contexts": ["1 单元代表层", "2 单元代表层"]}, "ahu": {"title": "医院 · 新风机组入口", "names": ["新风机组水侧盘管"], "contexts": ["病房新风服务区", "门诊候诊服务区", "公共走廊", "后勤服务区"]}, "entry": {"title": "小区单元 · 热力入口", "names": ["低区近端组 · 4 户", "低区远端组 · 4 户", "中区近端组 · 4 户", "中区远端组 · 4 户", "高区近端组 · 4 户", "高区远端组 · 4 户"], "contexts": ["低区代表层", "中区代表层", "高区代表层"]}};return {SCENARIOS};})();
const GEOMETRY=(()=>{


const V=a=>new T.Vector3(...a),Y=new T.Vector3(0,1,0),Z=new T.Vector3(0,0,1);
let seed=17;function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
const noiseCanvas=document.createElement('canvas');noiseCanvas.width=noiseCanvas.height=256;const noiseCtx=noiseCanvas.getContext('2d'),noiseImage=noiseCtx.createImageData(256,256);for(let i=0;i<noiseImage.data.length;i+=4){let v=100+Math.floor(rnd()*65);noiseImage.data.set([v,v,v,255],i);}noiseCtx.putImageData(noiseImage,0,0);const cast=new T.CanvasTexture(noiseCanvas);cast.wrapS=cast.wrapT=T.RepeatWrapping;cast.repeat.set(3,3);
const std=(color,metalness=.35,roughness=.32,extra={})=>new T.MeshStandardMaterial({color,metalness,roughness,...extra});
const M={blue:std(0x0956ce,.32,.27,{bumpMap:cast,bumpScale:.010}),blueSmooth:std(0x064cbd,.48,.22),blueDark:std(0x023275,.35,.4),red:std(0xd41622,.30,.22),steel:std(0xb3c1cb,.8,.24),brass:std(0xc89a41,.72,.25),copper:std(0xb96e38,.78,.27),dark:std(0x263442,.55,.36),black:std(0x0a1525,.1,.62),supply:std(0xbd6351,.4,.42),return:std(0x539caf,.45,.4),body:std(0x8297a6,.55,.38),coil:std(0x4b6477,.7,.32),yellow:std(0xd4b165,.5,.32),glass:std(0xa6d4e6,.18,.15,{transparent:true,opacity:.2,depthWrite:false})};
function mesh(g,geo,mat,p){const o=new T.Mesh(geo,typeof mat==='string'?M[mat]:mat);if(p)o.position.copy(V(p));o.castShadow=o.receiveShadow=true;g.add(o);return o;}
function cyl(g,a,b,r,mat,r2=r,n=24,open=false){const d=V(b).sub(V(a));if(d.length()<1e-6)return;const o=mesh(g,new T.CylinderGeometry(r2,r,d.length(),n,1,open),mat);o.position.copy(V(a).add(V(b)).multiplyScalar(.5));o.quaternion.setFromUnitVectors(Y,d.normalize());return o;}
function sphere(g,p,s,mat){const o=mesh(g,new T.SphereGeometry(1,16,12),mat,p);o.scale.set(...s);return o;}
function box(g,p,s,mat){return mesh(g,new T.BoxGeometry(...s),mat,p);}
function path(g,points,r,mat){const pts=points.map(V),curve=new T.CatmullRomCurve3(pts,false,'centripetal');return mesh(g,new T.TubeGeometry(curve,Math.min(192,Math.max(20,points.length*2)),r,8,false),mat);}
function tube(g,a,b,r,mat){const d=V(b).sub(V(a)),o=mesh(g,new T.CylinderGeometry(r,r,d.length(),24,1,true),mat);o.position.copy(V(a).add(V(b)).multiplyScalar(.5));o.quaternion.setFromUnitVectors(Y,d.normalize());return o;}
function torus(g,c,r,t,mat,axis=[0,0,1]){const o=mesh(g,new T.TorusGeometry(r,t,10,56),mat,c);o.quaternion.setFromUnitVectors(Z,V(axis).normalize());return o;}
function hex(g,c,r,depth,mat,axis=[0,0,1]){const a=V(c).addScaledVector(V(axis),-depth/2),b=V(c).addScaledVector(V(axis),depth/2);return cyl(g,a.toArray(),b.toArray(),r,mat,r,6);}
function boltRing(g,r,z,count=6,mat='blueSmooth',offset=Math.PI/6){for(let i=0;i<count;i++){const a=i/count*Math.PI*2+offset;hex(g,[Math.cos(a)*r,Math.sin(a)*r,z],.065,.065,mat);}}
function flange(g,y,lod=false){const shape=new T.Shape();shape.absarc(0,0,.53,0,Math.PI*2,false);const bore=new T.Path();bore.absarc(0,0,.205,0,Math.PI*2,true);shape.holes.push(bore);for(let i=0;i<4;i++){const a=(i+.5)/4*2*Math.PI,p=new T.Path();p.absarc(.399*Math.cos(a),.399*Math.sin(a),.060,0,Math.PI*2,true);shape.holes.push(p);}const o=mesh(g,new T.ExtrudeGeometry(shape,{depth:.11,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.009,bevelThickness:.009,curveSegments:lod?10:24}),'blueSmooth');o.rotation.x=-Math.PI/2;o.position.y=y-.055;const profile=[[.205,y-.09],[.285,y-.09],[.285,y+.09],[.205,y+.09]].map(p=>new T.Vector2(...p));mesh(g,new T.LatheGeometry(profile,lod?24:48),'blueSmooth');}
function plateTexture(title,model){
 const c=document.createElement('canvas');c.width=768;c.height=256;const x=c.getContext('2d');const tex=new T.CanvasTexture(c);tex.center.set(.5,.5);tex.rotation=Math.PI/2;tex.colorSpace=T.SRGBColorSpace;
 function draw(){const locale=window.FriesGoLocale;x.fillStyle='#d5dadd';x.fillRect(0,0,768,256);x.strokeStyle='#4b5358';x.lineWidth=5;x.strokeRect(10,10,748,236);x.fillStyle='#25313a';x.font='bold 42px "PingFang SC",sans-serif';x.textAlign='center';x.fillText(locale?locale.text(title):title,384,76,700);x.font='37px sans-serif';x.fillText(model,384,133);x.font='25px "PingFang SC",sans-serif';x.fillText(locale?.language==='en'?'FriesGo  ·  Photo reference':'FriesGo  ·  实拍外形参考',384,193);tex.needsUpdate=true;}
 draw();document.addEventListener('friesgo:language',draw);return new T.MeshStandardMaterial({map:tex,metalness:.35,roughness:.42});
}
const plateMaterials={dp:plateTexture('自力式压差控制阀','ZTY47-16'),flow:plateTexture('自力式流量控制阀','ZL47-25'),balance:plateTexture('数字锁定平衡阀','SP45-16')};
function scaleDisc(g,c,axis,style='silver'){const m=style==='silver'?'steel':'brass';cyl(g,V(c).addScaledVector(V(axis),-.06).toArray(),V(c).addScaledVector(V(axis),.06).toArray(),.255,m);const face=new T.Group();face.position.copy(V(c).addScaledVector(V(axis),.065));face.quaternion.setFromUnitVectors(Z,V(axis).normalize());g.add(face);for(let i=0;i<24;i++){const a=i/24*Math.PI*2,r=.223;const line=box(face,[r*Math.cos(a),r*Math.sin(a),.002],[i%3===0?.038:.022,.007,.004],'dark');line.rotation.z=a;}torus(g,V(c).addScaledVector(V(axis),.06).toArray(),.25,.018,'steel',axis);}
function mergeGroup(g){g.updateMatrixWorld(true);const inverse=g.matrixWorld.clone().invert(),sets=new Map();g.traverse(o=>{if(!o.isMesh||Array.isArray(o.material))return;const key=o.material.uuid;if(!sets.has(key))sets.set(key,{mat:o.material,pos:[],normal:[],uv:[]});const b=sets.get(key),geo=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone(),matrix=inverse.clone().multiply(o.matrixWorld);geo.applyMatrix4(matrix);const p=geo.getAttribute('position'),n=geo.getAttribute('normal'),uv=geo.getAttribute('uv');b.pos.push(...p.array);b.normal.push(...n.array);if(uv)b.uv.push(...uv.array);else b.uv.push(...Array(p.count*2).fill(0));geo.dispose();});const result=new T.Group();for(const b of sets.values()){const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(b.pos,3));geo.setAttribute('normal',new T.Float32BufferAttribute(b.normal,3));geo.setAttribute('uv',new T.Float32BufferAttribute(b.uv,2));const o=mesh(result,geo,b.mat);o.castShadow=o.receiveShadow=true;}return result;}
const caches={};
function productModel(type,{coil=true,detail=false,lod=false}={}){
 const root=new T.Group(),components={};function comp(key,label){const g=new T.Group();g.name=label;g.userData={component:key,base:new T.Vector3(),explode:new T.Vector3()};root.add(g);components[key]=g;return g;}
 const body=comp('body','铸造阀体');const profile=[[.205,-.77],[.275,-.77],[.275,-.59],[.30,-.52],[.405,-.35],[.43,0],[.40,.34],[.29,.52],[.275,.59],[.275,.77],[.205,.77]].map(p=>new T.Vector2(...p));mesh(body,new T.LatheGeometry(profile,lod?24:56),'blue');
 const flanges=comp('flanges','法兰与通孔');for(const side of[-1,1]){const fg=new T.Group();fg.userData.flangeSide=side;flanges.add(fg);flange(fg,side*.78,lod);}tube(body,[0,-.8,0],[0,.8,0],.204,'blueDark');
 const cap=comp('cap','背面端盖');if(type==='dp'){cyl(cap,[0,0,-.23],[0,0,-.405],.245,'blue');hex(cap,[0,0,-.435],.255,.11,'blueSmooth');cyl(cap,[0,0,-.49],[0,0,-.86],.20,'blue');torus(cap,[0,0,-.84],.195,.007,'blueSmooth');hex(cap,[0,0,-.879],.063,.037,'blueSmooth');cap.userData.referenceFeature='long-cylinder-stepped-root-small-end-plug';}else{cyl(cap,[0,0,-.25],[0,0,-.60],.295,'blue');cyl(cap,[0,0,-.56],[0,0,-.68],.39,'blueSmooth');boltRing(cap,.31,-.717,6);hex(cap,[0,0,-.75],.125,.085,'blueSmooth');}cap.userData.explode.set(0,0,-.55);
 const head=comp('head','调节控制端');
 if(type==='dp'){
  cyl(head,[0,0,.23],[0,0,.57],.30,'blue');cyl(head,[0,0,.50],[0,0,.65],.495,'blueSmooth');cyl(head,[0,0,.65],[0,0,.76],.475,'blue');boltRing(head,.39,.803,6,'blueSmooth',0);cyl(head,[0,0,.76],[0,0,.85],.15,'brass');hex(head,[0,0,.87],.12,.055,'brass');box(head,[0,0,.903],[.028,.12,.008],'dark');hex(head,[0,.35,.82],.065,.08,'brass');cyl(head,[0,.35,.86],[0,.35,.94],.035,'brass');hex(head,[0,-.35,.80],.065,.06,'brass');cyl(head,[0,-.35,.83],[0,-.35,.86],.05,'brass');box(head,[0,-.35,.864],[.011,.063,.005],'dark');head.userData.explode.set(0,0,.55);
  const copper=comp('copper','铜导压管');if(coil){const pts=[[0,.35,.94],[0,.49,1.01]];for(let i=0;i<=80;i++){const t=i/80,a=Math.PI-5*Math.PI*t;pts.push([-.075+.15*t,1.13+.50*Math.cos(a),.98+.50*Math.sin(a)]);}pts.push([.075,1.64,.72],[.075,1.48,.42],[.075,1.30,.12]);path(copper,pts,.014,'copper');hex(copper,[.075,1.27,.06],.055,.10,'brass',[0,-.45,-1]);cyl(copper,[.075,1.24,0],[.075,1.22,-.04],.035,'brass');copper.userData.coilPlane='YZ';}copper.userData.explode.set(0,.12,.55);
 }else if(type==='flow'){
  cyl(head,[0,0,.23],[0,0,.61],.29,'blue');cyl(head,[0,0,.56],[0,0,.67],.31,'blueSmooth');cyl(head,[0,0,.66],[0,0,.90],.18,'blueSmooth');torus(head,[0,0,.83],.19,.035,'blueSmooth');scaleDisc(head,[0,0,1.01],[0,0,1]);for(let i=0;i<40;i++){const a=i/40*Math.PI*2;cyl(head,[.247*Math.cos(a),.247*Math.sin(a),.93],[.247*Math.cos(a),.247*Math.sin(a),1.065],.010,'steel',.010,5);}cyl(head,[0,0,1.065],[0,0,1.23],.065,'steel');hex(head,[0,0,1.15],.09,.075,'steel');cyl(head,[0,0,1.22],[0,0,1.34],.041,'steel');head.userData.explode.set(0,0,.55);
 }else{
  cap.clear();cyl(cap,[0,0,-.24],[0,0,-.4],.13,'blue');hex(cap,[0,0,-.46],.10,.09,'blueSmooth');box(cap,[0,0,-.37],[.10,.72,.08],'blue');const start=[0,-.28,.13],end=[0,.42,.90],axis=V(end).sub(V(start)).normalize();cyl(body,start,end,.25,'blue',.23);cyl(head,[0,.32,.78],[0,.51,.99],.30,'blueSmooth');const c=[0,.58,1.07];scaleDisc(head,c,axis.toArray());cyl(head,V(c).toArray(),V(c).addScaledVector(axis,.22).toArray(),.105,'brass');
  const wheel=comp('wheel','红色三辐手轮'),center=V(c).addScaledVector(axis,.34),wg=new T.Group();wg.position.copy(center);wg.quaternion.setFromUnitVectors(Z,axis);wheel.add(wg);torus(wg,[0,0,0],.54,.057,'red');for(let i=0;i<3;i++){const a=(i/3+.25)*2*Math.PI;cyl(wg,[0,0,0],[.51*Math.cos(a),.51*Math.sin(a),0],.037,'red');}cyl(wg,[0,0,-.06],[0,0,.05],.125,'red');hex(wg,[0,0,.086],.09,.045,'dark');cyl(wg,[0,0,.1],[0,0,.115],.033,'black');head.userData.explode.copy(axis).multiplyScalar(.35);wheel.userData.explode.copy(axis).multiplyScalar(.75);
 }
 const plate=comp('plate','铭牌');const pm=plateMaterials[type];const tag=box(plate,[-.46,.0,.12],[.018,.47,.155],pm);tag.rotation.y=0;for(const y of[-.18,.18])hex(plate,[-.48,y,.12],.022,.027,'steel',[-1,0,0]);plate.userData.explode.set(-.3,0,0);
 flanges.userData.explode.set(0,.0,0);body.userData.explode.set(0,0,0);
 if(!detail){for(const [k,g] of Object.entries(components)){const merged=mergeGroup(g);g.clear();g.add(merged);}}
 if(detail)root.userData.components=components;root.userData.type=type;return root;
}
function simpleValve(type){const g=new T.Group();tube(g,[0,-.62,0],[0,.62,0],.22,'steel');for(const y of[-.58,.58]){torus(g,[0,y,0],.25,.06,'steel',[0,1,0]);}
 if(type==='ball'||type==='filter'){sphere(g,[0,0,0],[.32,.36,.32],'steel');cyl(g,[0,0,.22],[0,0,.55],.08,'steel');const handle=new T.Group();handle.name='shutoff-handle';handle.userData={component:'generic-shutoff-handle',openAxis:'local-y'};g.add(handle);box(handle,[0,.23,.60],[.09,.56,.065],'dark');box(handle,[0,.43,.60],[.11,.18,.085],'red');if(type==='filter'){cyl(g,[0,-.08,-.16],[0,-.40,-.46],.18,'steel');hex(g,[0,-.46,-.52],.20,.10,'dark',[0,.7,.7]);}}
 else if(type==='butterfly'){cyl(g,[0,-.10,0],[0,.10,0],.36,'dark');cyl(g,[0,0,0],[0,0,.49],.06,'steel');box(g,[.22,0,.53],[.55,.07,.065],'dark');}
 else if(type==='motor'){sphere(g,[0,0,0],[.30,.32,.29],'blue');cyl(g,[0,0,.18],[0,0,.57],.09,'steel');box(g,[0,0,.72],[.55,.45,.35],'dark');box(g,[0,-.235,.76],[.31,.025,.11],'yellow');}
 else if(type==='check'){sphere(g,[0,0,0],[.32,.36,.32],'blueDark');cyl(g,[0,0,.20],[0,0,.35],.27,'blueSmooth');boltRing(g,.21,.39,6,'steel');}
 else{sphere(g,[0,0,0],[.34,.37,.32],'blueDark');cyl(g,[0,0,.20],[0,0,.53],.34,'blueSmooth');boltRing(g,.26,.57,6,'steel');}
 const handle=g.getObjectByName('shutoff-handle');if(handle){g.remove(handle);const result=mergeGroup(g);result.add(handle);return result;}return mergeGroup(g);}
function valve(type,scale=.36,coil=false){const lod=scale<.5&&!coil,key=type+coil+lod;let cached=caches[key];if(!cached){const source=['dp','flow','balance'].includes(type)?productModel(type,{coil,lod}):simpleValve(type),handle=source.getObjectByName('shutoff-handle');if(handle)handle.removeFromParent();cached=mergeGroup(source);cached.userData={...source.userData};if(handle)cached.add(handle);caches[key]=cached;}const g=cached.clone(true);g.scale.setScalar(scale);return g;}
function apparatus(type){const g=new T.Group();
 if(type==='collector'||type==='distributor'){cyl(g,[-2.3,0,0],[2.3,0,0],.55,type==='collector'?'return':'supply');sphere(g,[-2.3,0,0],[.36,.55,.55],type==='collector'?'return':'supply');sphere(g,[2.3,0,0],[.36,.55,.55],type==='collector'?'return':'supply');for(const x of[-1.7,1.7]){box(g,[x,-.67,0],[.15,1.1,.5],'steel');box(g,[x,-1.2,0],[.7,.12,1.0],'dark');}for(const x of[-.85,0,.85])cyl(g,[x,.0,0],[x,.85,0],.13,'steel');}
 else if(type==='pump'){cyl(g,[0,-.35,0],[0,.35,0],.3,'blue');sphere(g,[0,0,0],[.38,.43,.37],'blue');cyl(g,[0,0,.14],[0,0,.80],.23,'dark');for(let i=0;i<8;i++)torus(g,[0,0,.3+i*.055],.24,.016,'steel');box(g,[0,-.45,.3],[.75,.11,.9],'steel');}
 else if(type==='household'){box(g,[0,0,0],[1.4,1.3,.7],'body');for(let i=0;i<9;i++)box(g,[-.58+i*.145,0,.38],[.045,1.05,.05],'steel');box(g,[0,.70,0],[1.6,.10,.85],'steel');}
 else if(type==='chiller'){box(g,[0,0,0],[1.5,.85,1.0],'body');for(const y of[-.25,.25])cyl(g,[-.70,y,.58],[.70,y,.58],.18,'steel');box(g,[-.48,.15,-.52],[.36,.35,.06],'dark');}
 else if(type==='boiler'){box(g,[0,0,0],[1.2,1.35,.95],'body');cyl(g,[0,0,.47],[0,0,.63],.31,'dark');cyl(g,[0,.65,-.2],[0,1.05,-.2],.16,'steel');box(g,[0,.40,.50],[.4,.14,.03],'blueDark');}
 else if(['fau','ahu','fcu'].includes(type)){const w=type==='ahu'?2.2:type==='fcu'?1.7:1.2,h=type==='fcu'?.7:1.6,d=type==='fcu'?.7:1.1;box(g,[0,0,0],[w,h,d],'body');box(g,[-w*.32,0,d/2+.015],[w*.29,h*.9,.025],'dark');for(let i=0;i<12;i++)box(g,[-w*.32,-h*.4+i*h*.8/11,d/2+.045],[w*.27,.018,.035],'steel');if(type==='ahu'){const fan=torus(g,[w*.18,0,d/2+.04],h*.28,.045,'dark');for(let i=0;i<5;i++){const a=i/5*Math.PI*2,b=box(g,[w*.18+Math.cos(a)*h*.12,Math.sin(a)*h*.12,d/2+.045],[h*.20,h*.085,.03],'dark');b.rotation.z=a;} }else if(type==='fau'){for(let i=0;i<6;i++)box(g,[w*.15,-h*.30+i*h*.12,d/2+.025],[w*.35,.035,.025],'steel');}}
 else if(type==='sensor'){sphere(g,[0,0,0],[.11,.11,.11],'yellow');cyl(g,[0,-.35,0],[0,0,0],.018,'steel');}
 return mergeGroup(g);}

return {M,mesh,cyl,sphere,box,path,tube,mergeGroup,productModel,simpleValve,valve,apparatus};})();
const MODEL=(()=>{
const {valve,apparatus,cyl,sphere,box,path,tube,M,mergeGroup} = GEOMETRY;
const {SCHEMES,PARTS} = DATA;



const V=a=>new T.Vector3(...a),Y=new T.Vector3(0,1,0);
function buildScheme(id){
 const root=new T.Group(),parts=[],lines=[],signals=[],zones={},labels=[],occurrence={},counts={},issues=[];const cfg=SCHEMES[id];for(const [k] of cfg.zones){if(k==='all')continue;const g=new T.Group();g.name=k;root.add(g);zones[k]=g;}
 const group=z=>zones[z]||root;
 function add(type,p,z,name,scale=1,axis=[0,1,0]){const kind=PARTS[type]?type:'ball';let o;if(['dp','flow','balance','ball','filter','check','selfdp','motor','butterfly'].includes(kind)){o=valve(kind,scale);o.quaternion.setFromUnitVectors(Y,V(axis).normalize());}else{o=apparatus(kind);o.scale.setScalar(scale);if(kind==='pump')o.quaternion.setFromUnitVectors(Y,new T.Vector3(1,0,0));}o.position.copy(V(p));group(z).add(o);occurrence[kind]=(occurrence[kind]||0)+1;const partId=`${id}-${kind}-${occurrence[kind]}`;o.userData={...o.userData,id:partId,type:kind,zone:z,name:name||`${PARTS[kind].name} ${occurrence[kind]}`,base:V(p),scaleValue:scale,axis:V(axis).normalize()};parts.push(o);counts[kind]=(counts[kind]||0)+1;return o;}
 function segment(a,b,color,z,r=.095){if(V(a).distanceTo(V(b))<1e-5)return;const m=color==='supply'?'supply':color==='return'?'return':'steel',g=group(z);tube(g,a,b,r,m);lines.push({a,b,color,zone:z});}
 function route(points,color,z,r=.095){for(let i=1;i<points.length;i++)segment(points[i-1],points[i],color,z,r);for(const p of points.slice(1,-1))sphere(group(z),p,[r,r,r],color==='supply'?'supply':color==='return'?'return':'steel');}
 function run(a,b,color,z,list=[],r=.095){const av=V(a),bv=V(b),dir=bv.clone().sub(av).normalize(),length=av.distanceTo(bv);let prev=av.clone();const result=[];for(const item of list.sort((x,y)=>x.at-y.at)){const c=av.clone().addScaledVector(dir,item.at),s=item.scale||.38,gap=(['ball','filter','motor','butterfly','check','selfdp'].includes(item.type)?.62:.83)*s;if(item.at-gap<prev.clone().sub(av).dot(dir)-1e-6||item.at+gap>length+1e-6)issues.push({type:'valve-run-placement',name:item.name,at:item.at,gap,length});const before=c.clone().addScaledVector(dir,-gap),after=c.clone().addScaledVector(dir,gap);segment(prev.toArray(),before.toArray(),color,z,r);const part=add(item.type,c.toArray(),z,item.name,s,dir.toArray());result.push(part);prev=after;}segment(prev.toArray(),b,color,z,r);return result;}
 function copper(points,z,owner){const o=path(group(z),points,.018,'copper');o.userData={signal:'pressure',owner};signals.push(o);return o;}
 function control(points,z){const verts=[];for(let i=1;i<points.length;i++){verts.push(...points[i-1],...points[i]);}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(verts,3));const line=new T.LineSegments(geo,new T.LineDashedMaterial({color:0xdcc074,dashSize:.13,gapSize:.09,transparent:true,opacity:.85}));line.computeLineDistances();line.userData.signal='control';group(z).add(line);signals.push(line);}
 function tag(text,p,z){labels.push({text,position:V(p),zone:z});}
 function unit(kind,x,y,z,name,scale=.75){const u=add(kind,[x,y,0],z,name,scale);const edge=x-(kind==='ahu'?1.1:kind==='fcu'?.85:.6)*scale,sy=y+.43*scale,ry=y-.43*scale,left=edge-2.45,ret=left+.25,base=y-2.5;route([[left,base+.55,-.18],[left,sy,-.18],[left+.12,sy,0]],'supply',z,.07);run([left+.12,sy,0],[edge,sy,0],'supply',z,[{at:.85,type:'butterfly',scale:.30,name:`${name}·供水关断`}],.07);
 const out=run([edge,ry,0],[ret,ry,0],'return',z,[{at:.43,type:'motor',scale:.29,name:`${name}·电动调节阀`},{at:1.12,type:'dp',scale:.29,name:`${name}·回水压差阀`},{at:1.91,type:'butterfly',scale:.28,name:`${name}·回水关断`}],.07);route([[ret,ry,0],[ret,ry,.38],[ret,base-.55,.38],[ret,base-.55,0]],'return',z,.07);
 const dp=out.find(o=>o.userData.type==='dp');copper([[dp.position.x-.10,ry,.27],[dp.position.x-.10,ry+.43,.33],[edge-.12,ry+.43,.33],[edge-.12,ry,0]],z,dp.userData.id);const sensor=add('sensor',[x+.3,y+.9,0],z,`${name}·空气测点`,.8);control([[edge-.43,ry,.36],[edge-.43,y+1.1,.40],[x+.3,y+1.1,.40],[x+.3,y+.9,0]],z);return{left,ret,base,sy,ry,u};}
 function headers(z,heating=false){const cy=1.5,left=-9,right=-1;add('collector',[left,cy,0],z,'集水器');add('distributor',[right,cy,0],z,'分水器');const ports=[];for(let i=0;i<3;i++){const a=left-1.4+i*1.4,b=right-1.4+i*1.4;const ret=run([a,cy+.35,0],[a,cy+3.3,0],'return',z,[{at:1.0,type:'dp',scale:.52,name:`集水器·第 ${i+1} 路压差阀`},{at:2.25,type:'ball',scale:.40,name:`集水器·第 ${i+1} 路关断`}],.13);run([b,cy+.35,0],[b,cy+3.3,0],'supply',z,[{at:1,type:'balance',scale:.52,name:`分水器·第 ${i+1} 路平衡阀`},{at:2.25,type:'ball',scale:.40,name:`分水器·第 ${i+1} 路关断`}],.13);copper([[a,.0+cy+1,.48],[a,cy+.62,.7],[b,cy+.62,.7],[b,cy+.66,.12]],z,ret[0].userData.id);ports.push({return:[a,cy+3.3,0],supply:[b,cy+3.3,0]});}
 run([left+2.65,cy,0],[right-2.65,cy,0],'supply',z,[{at:1.35,type:'selfdp',scale:.45,name:'集分水器间·自身压差旁通阀'}],.10);tag('集水器',[left,cy-.1,.8],z);tag('分水器',[right,cy-.1,.8],z);return{ports,left,right,cy};}
 function hotPlant(z,pumps=2,ox=8,oy=-2){const ys=Array.from({length:pumps},(_,i)=>oy-i*2),inX=ox-3,outX=ox+2.2,by=[oy-.1,oy-(pumps===3?4.1:2.1)];route([[inX,ys[0],0],[inX,ys.at(-1),0]],'return',z,.12);route([[outX,ys[0],0],[outX,ys.at(-1),0]],'return',z,.12);
 for(let i=0;i<pumps;i++){const y=ys[i];run([inX,y,0],[outX,y,0],'return',z,[{at:.45,type:'butterfly',scale:.28,name:`热水泵 ${i+1}·进口关断`},{at:2.4,type:'butterfly',scale:.28,name:`热水泵 ${i+1}·出口关断`},{at:3.5,type:'check',scale:.36,name:`热水泵 ${i+1}·限流止回阀`}]);const p=add('pump',[ox-1.4,y,0],z,`热水泵 ${i+1}`,.75,[1,0,0]);}
 const bIn=ox+3.3,bOut=ox+10.4;route([[outX,ys[0],0],[bIn,ys[0],0],[bIn,by.at(-1),0]],'return',z,.12);route([[bOut,by[0],0],[bOut,by.at(-1),0]],'supply',z,.12);
 for(let i=0;i<2;i++){const y=by[i];run([bIn,y,0],[bOut,y,0],'supply',z,[{at:.7,type:'flow',scale:.45,name:`锅炉 ${i+1}·自力式流量控制阀`},{at:2.0,type:'butterfly',scale:.31,name:`锅炉 ${i+1}·进口关断`},{at:6.45,type:'butterfly',scale:.31,name:`锅炉 ${i+1}·出口关断`}]);const b=add('boiler',[ox+7,y,0],z,`锅炉 ${i+1}`,.9);tag(`锅炉 ${i+1}`,[ox+7,y+.9,.3],z);}
 tag(`${pumps} 条热水泵支路`,[ox-1.4,ys.at(-1)-1,.1],z);return{input:[inX,ys.at(-1),0],output:[bOut,by[0],0]};}
 if(id==='entry'){
  const z='valves';run([6,3.3,0],[-5.5,3.3,0],'supply',z,[{at:6.2,type:'filter',scale:.75,name:'单元供水·过滤一体球阀'}],.16);const rr=run([-5.5,1.6,0],[4.9,1.6,0],'return',z,[{at:5.3,type:'ball',scale:.70,name:'压差阀前·回水球阀'},{at:7.1,type:'dp',scale:.78,name:'单元回水·ZTY47-16 压差阀'},{at:8.9,type:'ball',scale:.70,name:'压差阀后·回水球阀'}],.16);
  copper([[1.6+.35*.78,1.6,.94*.78],[1.9,2.6,.9],[5.9,2.6,.9],[5.9,3.3,0]],z,rr[1].userData.id);
  add('household',[-6.7,4.2,0],'home','用户 1',1.15);route([[-6,4.6,0],[-4.7,4.6,0],[-4.7,3.3,0]],'supply','home',.12);run([-6,4.6,0],[-4.7,4.6,0],'supply','home',[{at:.60,type:'ball',scale:.42,name:'用户 1·供水关断'}],.12);route([[-6,3.8,0],[-4.3,3.8,0],[-4.3,3.8,.45],[-4.3,1.6,.45],[-4.3,1.6,0]],'return','home',.12);run([-6,3.8,0],[-4.3,3.8,0],'return','home',[{at:.60,type:'ball',scale:.42,name:'用户 1·回水关断'}],.12);
  for(const [x,color] of [[6,'supply'],[4.9,'return']]){const depth=color==='return'?.50:0;run([x,-.1,depth],[x,6.9,depth],color,'riser',[{at:6.3,type:'ball',scale:.40,name:`${color==='supply'?'供水':'回水'}立管顶部阀件`}],.16);if(depth)route([[x,1.6,0],[x,1.6,depth]],'return','riser',.16);}tag('用户 1',[-6.7,5.35,.1],'home');tag('供水立管',[6,6.1,.2],'riser');tag('回水立管',[4.9,5.35,.2],'riser');tag('ZTY47-16 压差阀',[1.6,2.2,1.2],z);tag('过滤一体球阀',[-.2,4.0,.8],z);
 }else if(id==='ahu'){
  run([-6,.9,0],[7,.9,0],'supply','main',[{at:1.4,type:'ball',scale:.55,name:'干管供水·关断阀'}],.12);const ds=run([7,-.25,0],[-6,-.25,0],'return','main',[{at:10.2,type:'dp',scale:.57,name:'干管回水·压差控制阀'},{at:11.6,type:'ball',scale:.50,name:'干管回水·关断阀'}],.12);copper([[-3.2,-.25,.53],[-3.2,.25,.75],[-1.8,.25,.75],[-1.8,.9,0]],'main',ds[0].userData.id);
  const uy=4.4,x=5;add('fau',[x,uy,0],'unit','新风机组',1.25);const edge=x-.75;route([[-1.3,.9,-.20],[-1.3,5.0,-.20],[-1.1,5,0]],'supply','branch',.11);run([-1.1,5,0],[edge,5,0],'supply','branch',[{at:1.3,type:'butterfly',scale:.55,name:'机组供水·斜板关断阀'}],.11);
  const a=run([edge,3.8,0],[-.7,3.8,0],'return','branch',[{at:.85,type:'motor',scale:.57,name:'机组回水·电动调节阀'},{at:2.35,type:'dp',scale:.57,name:'机组回水·自力式压差调节阀'},{at:3.95,type:'butterfly',scale:.52,name:'机组回水·斜板关断阀'}],.11);route([[-.7,3.8,0],[-.7,3.8,.45],[-.7,-.25,.45],[-.7,-.25,0]],'return','branch',.11);const d=a.find(o=>o.userData.type==='dp');copper([[d.position.x-.2,3.8,.54],[d.position.x-.2,4.65,.6],[edge-.12,4.65,.6],[edge-.12,3.8,0]],'branch',d.userData.id);add('sensor',[6.7,4.5,0],'unit','空气侧温度测点');control([[3.4,3.8,.65],[3.4,6.15,.6],[6.7,6.15,.6],[6.7,4.5,0]],'unit');tag('新风机组',[5,5.65,.5],'unit');tag('电动阀 M',[3.4,4.5,.8],'branch');tag('空气侧控制信号',[5.3,6.2,.6],'unit');tag('干管压差组合',[-3.3,.25,.8],'main');
 }else if(id==='heating'){
  const h=headers('headers',true);const supplyX=4.0,returnX=2.9;const rowYs=[13.5,8.3];route([[supplyX,4,0],[supplyX,16,0]],'supply','entry',.14);route([[returnX,16,.60],[returnX,4,.60]],'return','entry',.14);
  for(let row=0;row<2;row++){const y=rowYs[row],s=y+.5,r=y-.6;run([supplyX,s,0],[-12.3,s,0],'supply','entry',[{at:1.8,type:'filter',scale:.47,name:`第 ${row+1} 层·供水过滤一体球阀`}],.11);const vals=run([-12.3,r,0],[returnX,r,0],'return','entry',[{at:12.5,type:'ball',scale:.39,name:`第 ${row+1} 层·压差阀前球阀`},{at:13.65,type:'dp',scale:.48,name:`第 ${row+1} 层·单元入口压差阀`},{at:14.8,type:'ball',scale:.39,name:`第 ${row+1} 层·压差阀后球阀`}],.11);route([[returnX,r,0],[returnX,r,.60]],'return','entry',.11);copper([[1.35+.16,r,.45],[1.55,r+.58,.75],[3.8,r+.58,.75],[3.8,s,0]],'entry',vals[1].userData.id);
   for(let i=0;i<3;i++){const x=-2.8-i*4.4,number=i+1;add('household',[x,y+2.15,0],'homes',`第 ${row+1} 层·${number} 号用户`,.9);const edge=x+.63;run([edge,y+2.5,0],[x+1.6,y+2.5,0],'supply','homes',[{at:.42,type:'ball',scale:.25,name:`${row+1}层${number}户·供水关断`}],.065);route([[x+1.6,y+2.5,0],[x+1.6,s,0]],'supply','homes',.065);run([edge,y+1.8,0],[x+1.9,y+1.8,0],'return','homes',[{at:.42,type:'ball',scale:.25,name:`${row+1}层${number}户·回水关断`}],.065);route([[x+1.9,y+1.8,0],[x+1.9,y+1.8,.38],[x+1.9,r,.38],[x+1.9,r,0]],'return','homes',.065);tag(`${row+1}层 · ${number}号`,[x,y+2.95,.2],'homes');}
  }
  route([h.ports[1].supply,[4,5.2,-.5],[supplyX,5.2,0],[supplyX,8.8,0]],'supply','headers',.13);route([h.ports[1].return,[-7.7,5.2,.4],[returnX,5.2,.4],[returnX,7.7,.60]],'return','headers',.13);
  // Both floors connect to the same unit risers. Port pair 1 is spare; pair 3 serves the source.
  for(const p of[h.ports[0].supply,h.ports[0].return]){box(group('headers'),[p[0],p[1]+.06,p[2]],[.34,.12,.34],'steel');}tag('原图预留口',[-9.5,5.4,.6],'headers');
  const hot=hotPlant('hot',2,10,5);route([h.ports[2].return,[-5.7,6,.6],[7,6,.6],hot.input],'return','hot',.14);route([hot.output,[22,8.2,-1.2],[22,-.4,-1.2],[2,-.4,-1.2],[2,4.8,-.6],h.ports[2].supply],'supply','hot',.14);tag('两层六户',[-6.5,17.5,0],'homes');
 }else{
  const h=headers('headers');const ys=[24,17,10],types=[['fau','ahu','ahu','fau'],['fcu','fcu','fau','fcu','fcu'],['fau','fau','ahu','ahu','ahu']];
  for(let row=0;row<3;row++){const y=ys[row],s=y+.55,r=y-.55,port=h.ports[row],sx=-15.4+row*.4,rx=-17+row*.4;route([port.supply,[port.supply[0],5+row*.28,-.6],[sx,5+row*.28,-.6],[sx,s,-.6],[sx,s,0]],'supply','terminals',.13);route([[rx,r,0],[rx,r,.55],[rx,5.2+row*.28,.55],[port.return[0],5.2+row*.28,.55],port.return],'return','terminals',.13);
   run([sx,s,0],[24,s,0],'supply','terminals',[{at:1.2,type:'ball',scale:.40,name:`第 ${row+1} 回路·供水关断`}],.10);const ret=run([24,r,0],[rx,r,0],'return','terminals',[{at:24-rx-2.5,type:'dp',scale:.42,name:`第 ${row+1} 回路·压差控制阀`},{at:24-rx-1.2,type:'filter',scale:.38,name:`第 ${row+1} 回路·过滤关断阀`}],.10);copper([[rx+2.5+.15,r,.40],[rx+2.5,r+.65,.55],[rx+3.4,r+.65,.55],[rx+3.4,s,0]],'terminals',ret[0]?.userData.id);
   const n=types[row].length;for(let i=0;i<n;i++){const x=-9+i*(29/(n-1)),kind=types[row][i],name=`第 ${row+1} 回路·${kind==='fau'?'新风机组':kind==='ahu'?'空调箱':'风机盘管'} ${i+1}`;const u=unit(kind,x,y+2.5,'terminals',name,kind==='fcu'?.72:.8);tag(`${kind==='fau'?'新风':kind==='ahu'?'空调箱':'盘管'} ${row+1}-${i+1}`,[x,y+3.6,.3],'terminals');}tag(`第 ${row+1} 末端回路`,[rx+3,y+1.4,.6],'terminals');
  }
  const zin='cold',ysCold=[-1.5,-3.6,-5.7,-7.8,-9.9];route([[-14,ysCold[0],0],[-14,ysCold.at(-1),0]],'return',zin,.13);route([[1,ysCold[0],0],[1,ysCold[3],0]],'supply',zin,.13);
  for(let i=0;i<5;i++){const y=ysCold[i];run([-14,y,0],[-7.8,y,0],'return',zin,[{at:.8,type:'butterfly',scale:.32,name:`冷冻泵 ${i+1}·进口关断`},{at:4.4,type:'butterfly',scale:.32,name:`冷冻泵 ${i+1}·出口关断`}],.10);add('pump',[-11.1,y,0],zin,`冷冻泵 ${i+1}${i===4?'（备用汇接）':''}`,.85);if(i<4){run([-7.8,y,0],[1,y,0],'supply',zin,[{at:1,type:'butterfly',scale:.32,name:`制冷机 ${i+1}·进口关断`},{at:5.7,type:'butterfly',scale:.32,name:`制冷机 ${i+1}·出口关断`},{at:7,type:'dp',scale:.45,name:`制冷机 ${i+1}·压差控制阀`}],.10);add('chiller',[-4.0,y,0],zin,`制冷机 ${i+1}`,1.1);tag(`制冷机 ${i+1}`,[-4,y+.7,.7],zin);}else route([[-7.8,y,0],[-7.1,y,0],[-7.1,ysCold[3],0]],'return',zin,.1);}
  route([[h.left-2.65,h.cy,0],[-14,h.cy,0],[-14,ysCold[0],0]],'return',zin,.14);route([[1,ysCold[0],0],[1,h.cy,-.6],[h.right+2.65,h.cy,0]],'supply',zin,.14);tag('5 条冷冻泵支路',[-11.1,-11,.5],zin);
  const hot=hotPlant('hot',3,10,-1.5);route([[h.left-2.65,h.cy,0],[-14,1.5,-.6],[-14,-12,-.6],[7,-12,-.6],hot.input],'return','hot',.14);route([hot.output,[22.7,1,-1.2],[2,1,-1.2],[h.right+2.65,h.cy,0]],'supply','hot',.14);
 }
 // Zone bounds are computed from actual geometry; all labels are display-only anchors.
 root.updateMatrixWorld(true);return{root,parts,lines,signals,zones,labels,counts,issues,scheme:id};
}

return {buildScheme};})();
const CONTEXT=(()=>{
const {valve,apparatus,cyl,box,sphere,path,M,mergeGroup} = GEOMETRY;
const {SCENARIOS} = SCENARIO_DATA;



const V=a=>new T.Vector3(...a),Y=new T.Vector3(0,1,0);
function buildContext(id){const root=new T.Group(),rooms=[],picks=[],valves=[],labels=[],segments=[],zones={};const c=SCENARIOS[id];const mat=(color,opacity=1)=>new T.MeshStandardMaterial({color,roughness:.65,metalness:.10,transparent:opacity<1,opacity,depthWrite:opacity===1});const wall=mat(0x9aa9b6,.36),slab=mat(0x546a7d),wood=mat(0x9d815f),linen=mat(0xdde4e7),green=mat(0x438e78),glass=mat(0x7fb0cc,.16),air=mat(0x9caeb9);
 function group(key){if(!zones[key]){zones[key]=new T.Group();root.add(zones[key]);}return zones[key];}
 function pipe(pts,color='supply',z='mains',r=.085){const g=group(z);for(let i=1;i<pts.length;i++)if(V(pts[i-1]).distanceTo(V(pts[i]))>1e-6){cyl(g,pts[i-1],pts[i],r,color);segments.push({a:V(pts[i-1]),b:V(pts[i]),zone:z,color,r});}for(const p of pts.slice(1,-1))sphere(g,p,[r,r,r],color);}
 function item(type,p,z='plant',scale=.7,name=type){const g=mergeGroup(apparatus(type));g.scale.setScalar(scale);g.position.copy(V(p));if(type==='pump')g.quaternion.setFromUnitVectors(Y,V([1,0,0]));group(z).add(g);g.userData={partType:type,name};picks.push(g);return g;}
 function val(type,p,z='valves',branch=-1,scale=.5,axis=[1,0,0]){const g=valve(type,scale,false);g.position.copy(V(p));g.quaternion.setFromUnitVectors(Y,V(axis));g.userData={partType:type,branchIndex:branch,name:type};group(z).add(g);picks.push(g);valves.push(g);return g;}
 function tag(text,p,z='all'){labels.push({text,point:V(p),zone:z});}
 function room(x,y,w,d,kind,label,index,z='building'){const g=new T.Group();group(z).add(g);const height=3.5,back=-d;
  box(g,[x,y-.10,back/2],[w,.20,d],slab);box(g,[x,y+height/2,back],[w,height,.10],wall);box(g,[x-w/2,y+height/2,back/2],[.09,height,d],wall);box(g,[x+w/2,y+height/2,back/2],[.09,height,d],wall);box(g,[x,y+height-.06,back],[w,.16,.22],slab);box(g,[x,y+2.2,back+.06],[w*.66,1.3,.035],glass);
  if(kind==='guest'||kind==='home'||kind==='ward'){for(const dx of[-w*.21,w*.19]){box(g,[x+dx,y+.34,back*.57],[w*.29,.44,2.0],wood);box(g,[x+dx,y+.61,back*.57],[w*.29,.15,1.94],linen);box(g,[x+dx,y+.72,back*.73],[w*.24,.13,.42],linen);if(kind==='ward'){box(g,[x+dx,y+.85,back*.36],[w*.25,.1,.12],green);cyl(g,[x+dx+.55,y+.1,back*.5],[x+dx+.55,y+2.1,back*.5],.022,'steel');}}box(g,[x+w*.34,y+.7,back*.85],[w*.18,1.4,.55],wood);}
  else{box(g,[x,y+.85,back*.55],[w*.55,.12,d*.38],wood);for(const dx of[-.25,.25])for(const dz of[-.30,.30]){box(g,[x+dx*w,y+.46,back*.55+dz*d],[.48,.85,.48],kind==='medical'?green:slab);}}
  const tint=mat(0x4a9fbd,.12);const panel=box(g,[x,y+.035,back/2],[w-.18,.04,d-.18],tint);panel.userData={branchIndex:index,room:true,name:label};picks.push(panel);const anchor=V([x,y+3.65,.45]);rooms.push({g,panel,material:tint,index,label,anchor,baseOpacity:.12});tag(label,anchor.toArray(),'building');return g;
 }
 function terminal(i,x,y,type,zone='terminals'){
  const g=item(type,[x+.8,y+1.5,.40],zone,.72,c.names[i]||'机组');
  pipe([[x-.8,y+2.55,1],[x-.8,y+1.8,1],[x-1.7,y+1.8,.4],[x+.38,y+1.8,.4]],'supply',zone,.065);
  pipe([[x+.38,y+1.20,.4],[x-1.7,y+1.20,.4],[x-1.7,y+2.05,1.45],[x-.8,y+2.05,1.45]],'return',zone,.065);
  const household=type==='household';val(household?'ball':'butterfly',[x-1.1,y+1.8,.4],zone,i,.22);
  if(household)val('ball',[x-.8,y+1.2,.4],zone,i,.22);
  else{val('motor',[x+.04,y+1.20,.4],zone,i,.22);val('dp',[x-.58,y+1.20,.4],zone,i,.23);val('butterfly',[x-1.3,y+1.20,.4],zone,i,.21);path(group(zone),[[x-.58,y+1.27,.63],[x-.58,y+1.65,.70],[x+.25,y+1.65,.70],[x+.25,y+1.20,.4]],.012,'copper');}
  return g;
 }
 function plant(kind='cold',ox=0,oz=0,count=4){
  const z=kind==='cold'?'cold':'hot',g=group(z),pc=kind==='cold'?5:id==='hvac'?3:2;
  box(g,[ox,0,oz+.6],[16,.20,10],slab);box(g,[ox,2,oz-3.8],[16,4,.12],wall);tag(kind==='cold'?'酒店冷源机房':'锅炉与循环泵机房',[ox,4.3,oz],z);
  pipe([[ox-7,.85,oz+4.5],[ox+7,.85,oz+4.5]],'return',z);
  if(kind==='hot')pipe([[ox-7,.85,oz+2.4],[ox+7,.85,oz+2.4]],'return',z);
  pipe([[ox-7,.85,oz+1.5],[ox+7,.85,oz+1.5]],'supply',z);
  const mx=i=>ox-5.8+i*3.7,px=i=>kind==='cold'?(i<4?mx(i):ox+6.2):ox-6+i*2.4;
  for(let i=0;i<pc;i++){
   const valveStart=valves.length;const x=px(i),pump=item('pump',[x,.85,oz+3.45],z,.72,`循环泵 ${i+1}`);pump.quaternion.setFromUnitVectors(Y,V([0,0,1]));
   pipe([[x,.85,oz+4.5],[x,.85,oz+2.4]],'return',z);val('butterfly',[x,.85,oz+4.08],z,-1,.22,[0,0,1]);val('butterfly',[x,.85,oz+2.75],z,-1,.22,[0,0,1]);
   if(kind==='hot')val('check',[x,.85,oz+2.45],z,-1,.23,[0,0,1]);for(const o of valves.slice(valveStart)){o.userData.role='pump';o.userData.unitIndex=i;};
  }
  for(let i=0;i<count;i++){
   const valveStart=valves.length;const x=mx(i);item(kind==='cold'?'chiller':'boiler',[x,.85,oz-1.3],z,1.1,`${kind==='cold'?'制冷机':'锅炉'} ${i+1}`);
   pipe([[kind==='cold'?px(i):x-1,.85,oz+2.4],[x-1,.85,oz+2.4],[x-1,.85,oz-1.3],[x,.85,oz-1.3]],'return',z);pipe([[x,.85,oz-1.3],[x+1,.85,oz-1.3],[x+1,.85,oz+1.5]],'supply',z);
   val('butterfly',[x-1,.85,oz+.1],z,-1,.24,[0,0,1]);val('butterfly',[x+1,.85,oz-.1],z,-1,.24,[0,0,1]);
   val(kind==='cold'?'dp':'flow',[kind==='cold'?x+1:x-1,.85,oz+.8],z,-1,.36,[0,0,1]);for(const o of valves.slice(valveStart)){o.userData.role='source';o.userData.unitIndex=i;};
  }
  if(kind==='cold'){pipe([[px(4),.85,oz+2.4],[px(4),.85,oz+2.05],[px(3),.85,oz+2.05],[px(3),.85,oz+2.4]],'return',z);tag('第5泵支路汇入第4机组入口',[ox+4.5,1.9,oz+3.8],z);}
  return{input:[ox-7,.85,oz+4.5],output:[ox+7,.85,oz+1.5]};
 }
 function headers(x,z=2){item('collector',[x-3,1.1,z],'headers',.80,'集水器');item('distributor',[x+3,1.1,z],'headers',.80,'分水器');for(let i=0;i<3;i++){const xx=x-3+(i-1)*.68;pipe([[xx,1.1,z],[xx,3.0,z]],'return','headers');val('dp',[xx,2.0,z],'headers',-1,.33,[0,1,0]);val('ball',[xx,2.65,z],'headers',-1,.25,[0,1,0]);const sx=x+3+(i-1)*.68;pipe([[sx,1.1,z],[sx,3.0,z]],'supply','headers');val('balance',[sx,2.0,z],'headers',-1,.33,[0,1,0]);val('ball',[sx,2.65,z],'headers',-1,.25,[0,1,0]);path(group('headers'),[[xx,2.0,z+.3],[xx,1.6,z+.6],[sx,1.6,z+.6],[sx,1.6,z]],.014,'copper');}pipe([[x-1.16,1.1,z],[x+1.16,1.1,z]],'supply','headers');val('selfdp',[x,1.1,z],'headers',-1,.42);tag('集分水器与支线调节',[x,3.4,z+1.2],'headers');return{ports:[0,1,2].map(i=>({return:[x-3+(i-1)*.68,3,z],supply:[x+3+(i-1)*.68,3,z]}))};}
 if(id==='hvac'){
  const types=[['fau','ahu','ahu','fau'],['fcu','fcu','fau','fcu','fcu'],['fau','fau','ahu','ahu','ahu']];let k=0;for(let f=0;f<3;f++){const y=5+f*4.8,n=types[f].length;for(let j=0;j<n;j++){const x=-12+j*24/(n-1);room(x,y,n===4?7.3:5.8,6,types[f][j]==='fcu'?'guest':'meeting',c.names[k],k);terminal(k,x,y,types[f][j]);k++;}const sx=-17-f*.4,rx=-18.4-f*.4;pipe([[sx,y+2.55,1],[16,y+2.55,1]],'supply','terminals');pipe([[rx,y+2.05,1.45],[16,y+2.05,1.45]],'return','terminals');val('ball',[sx+1.2,y+2.55,1],'terminals',-1,.30);val('filter',[rx+1.2,y+2.05,1.45],'terminals',-1,.29);val('dp',[rx+2.5,y+2.05,1.45],'terminals',-1,.33);path(group('terminals'),[[rx+2.5,y+2.15,1.8],[rx+2.5,y+3,2],[sx+3.4,y+3,2],[sx+3.4,y+2.55,1]],.016,'copper');pipe([[2.32+f*.68,3,3],[sx,3,3+f*.4],[sx,y+2.55,1]],'supply','terminals');pipe([[rx,y+2.05,1.45],[rx,3,3.6+f*.4],[-3.68+f*.68,3,3]],'return','terminals');tag(c.contexts[f],[-18,y+2,-2],'building');}
  plant('cold',-8,10,4);plant('hot',10,10,2);headers(0,3);pipe([[-1,.85,11.5],[5,.85,11.5],[5,1.1,3],[4.84,1.1,3]],'supply','cold');pipe([[-4.84,1.1,3],[-15,1.1,3],[-15,.85,14.5]],'return','cold');pipe([[17,.85,11.5],[18,.85,11.5],[18,1.1,3],[4.84,1.1,3]],'supply','hot');pipe([[-4.84,1.1,3],[-4.84,1.1,6],[3,1.1,6],[3,.85,14.5]],'return','hot');val('ball',[15,1.1,3],'hot',-1,.5).rotateY(Math.PI/2);val('ball',[0,1.1,6],'hot',-1,.5).rotateY(Math.PI/2);tag('夏季冷源运行 · 热源隔离备用',[10,4.6,13],'hot');tag('酒店应用剖面 · 三个代表层',[0,19.8,-3],'building');
 }else if(id==='heating'){
  for(let i=0;i<6;i++){const f=Math.floor(i/3),x=-8+(i%3)*7,y=4.5+f*5;room(x,y,6.8,5.5,'home',c.names[i],i);terminal(i,x,y,'household','homes');}for(const y of[4.5,9.5]){pipe([[-13,y+2.55,1],[10,y+2.55,1]],'supply','entry');pipe([[-12,y+2.05,1.45],[10,y+2.05,1.45]],'return','entry');val('filter',[-10,y+2.55,1],'entry',-1,.47);val('ball',[-10,y+2.05,1.45],'entry',-1,.29);val('dp',[-9,y+2.05,1.45],'entry',-1,.43);val('ball',[-8,y+2.05,1.45],'entry',-1,.29);path(group('entry'),[[-9,y+2.15,1.8],[-9,y+3.1,2],[-11,y+3.1,2],[-11,y+2.55,1]],.016,'copper');}
  pipe([[-13,1,1],[-13,12.05,1]],'supply');pipe([[-12,1,1.45],[-12,11.55,1.45]],'return');val('ball',[-13,11.6,1],'entry',-1,.25,[0,1,0]).userData.role='riser';val('ball',[-12,11.25,1.45],'entry',-1,.25,[0,1,0]).userData.role='riser';const h=headers(-3,5),hot=plant('hot',17,2,2);pipe([h.ports[1].supply,[-13,3,5],[-13,3,1]],'supply','headers');pipe([[-12,3,1.45],[-12,3,6],h.ports[1].return],'return','headers');pipe([h.ports[2].return,[8,3,7],hot.input],'return','hot');pipe([hot.output,[25,.85,3.5],[25,3,8],h.ports[2].supply],'supply','hot');for(const port of[h.ports[0].supply,h.ports[0].return])box(group('headers'),[port[0],3.04,port[2]],[.2,.08,.2],air);tag('第一对预留 · 第二对用户 · 第三对源侧',[-2,4,6],'headers');tag('72 户虚拟楼栋 · 六个等效组',[-1,14.1,-2],'building');
 }else if(id==='ahu'){
  const labels=['病房连续服务区','门诊候诊区','公共走廊','后勤区'];for(let i=0;i<4;i++){const x=-6+(i%2)*6,y=1+Math.floor(i/2)*4.8;room(x,y,5.8,5,i===0?'ward':'medical',labels[i],0,'unit');}
  item('fau',[9,1.35,-1.2],'unit',1.8,'医院新风机组');box(group('unit'),[8.3,3.1,-1.2],[1.2,.5,1.0],air);box(group('unit'),[1,3.1,-1.2],[14.4,.5,1.0],air);for(const x of[-6,0]){box(group('unit'),[x,5.95,-2.8],[.7,5.7,.7],air);box(group('unit'),[x,3.1,-2.0],[.7,.5,2.3],air);}
  pipe([[13,1.8,4],[2,1.8,4]],'supply','main',.10);pipe([[2,.55,4.7],[13,.55,4.7]],'return','main',.10);
  val('ball',[11,1.8,4],'main',-1,.38);val('dp',[9,.55,4.7],'main',-1,.45);val('ball',[11,.55,4.7],'main',-1,.36);
  path(group('main'),[[9,.65,5.1],[9,2.5,5.1],[7,2.5,5.1],[7,1.8,4]],.018,'copper');
  pipe([[3.5,1.8,4],[3.5,2.4,1],[8,2.4,1],[8,1.8,-1.2]],'supply','branch',.10);
  pipe([[8,1,-1.2],[8,1,1.5],[3,1,1.5],[3,.55,4.7]],'return','branch',.10);
  val('butterfly',[6.5,2.4,1],'branch',0,.44);val('motor',[7.1,1,1.5],'branch',0,.40);val('dp',[5.7,1,1.5],'branch',0,.48);val('butterfly',[4.3,1,1.5],'branch',0,.42);
  path(group('branch'),[[5.7,1.12,1.95],[5.7,2.9,2],[7.8,2.9,2],[7.8,1,1.5]],.022,'copper');tag('单一水侧盘管 → 四个空气服务区',[4,8.9,-1],'unit');tag('空气送风管 · 示意',[1,3.7,-1.2],'unit');item('sensor',[8.6,3.65,-1.2],'unit',1,'空气侧测点');const signalGeo=new T.BufferGeometry().setFromPoints([[7.1,1,1.9],[7.1,4.1,1.9],[8.6,4.1,-1.2],[8.6,3.65,-1.2]].map(V));const signal=new T.Line(signalGeo,new T.LineDashedMaterial({color:0xd5b96c,dashSize:.14,gapSize:.10}));signal.computeLineDistances();group('unit').add(signal);tag('机组入口压差与电动调节',[9,3.8,1.7],'branch');
 }else{
  for(let i=0;i<6;i++){const f=Math.floor(i/2),x=-5+(i%2)*6.4,y=3+f*4.5;room(x,y,6.2,5.5,'home',c.names[i],i,'home');terminal(i,x,y,'household','home');}
  pipe([[13,1.6,2],[-10,1.6,2],[-10,14.55,1]],'supply','riser',.12);pipe([[-10,14.55,1],[-10,16,1]],'supply','riser',.12);pipe([[-9,14.05,1.5],[-9,16,1.5]],'return','riser',.12);val('ball',[-10,15.4,1],'riser',-1,.3,[0,1,0]);val('ball',[-9,15.4,1.5],'riser',-1,.3,[0,1,0]);pipe([[-9,14.05,1.5],[-9,.75,2.6],[13,.75,2.6]],'return','riser',.12);for(const y of[3,7.5,12]){pipe([[-10,y+2.55,1],[6,y+2.55,1]],'supply','home');pipe([[-9,y+2.05,1.5],[6,y+2.05,1.5]],'return','home');}
  val('filter',[7,1.6,2],'valves',-1,.62);val('ball',[3.5,.75,2.6],'valves',-1,.58);val('dp',[5.4,.75,2.6],'valves',-1,.69);val('ball',[7.3,.75,2.6],'valves',-1,.58);path(group('valves'),[[5.65,.9,3.24],[5.6,2.5,3.3],[9,2.5,3.1],[9,1.6,2]],.022,'copper');box(group('valves'),[5.6,.08,1.6],[6.3,.18,4.4],slab);box(group('valves'),[5.6,.55,-.4],[6.3,1.1,.12],wall);tag('单元入口阀组 · 可检修空间',[5.6,3.3,3.3],'valves');tag('上游循环泵等效计量边界',[13,2.6,2.4],'riser');tag('24 户单元 · 三个代表层',[-2,16.8,-2],'home');
 }
 // Repeated whole-building valves share GPU draw calls. Invisible source
 // meshes retain exact ray picking, bounds and valve identity; service uses
 // its own independent animated valve assembly.
 root.updateMatrixWorld(true);const instances=new Map();
 for(const valveRoot of valves){const zone=valveRoot.parent,inverse=zone.matrixWorld.clone().invert();valveRoot.traverse(o=>{if(!o.isMesh||Array.isArray(o.material))return;const key=zone.uuid+o.geometry.uuid+o.material.uuid;if(!instances.has(key))instances.set(key,{zone,geometry:o.geometry,material:o.material,items:[]});instances.get(key).items.push({mesh:o,matrix:inverse.clone().multiply(o.matrixWorld)});});}
 for(const batch of instances.values()){if(batch.items.length<2)continue;const object=new T.InstancedMesh(batch.geometry,batch.material,batch.items.length);object.name='Repeated valve surfaces';for(let i=0;i<batch.items.length;i++){object.setMatrixAt(i,batch.items[i].matrix);batch.items[i].mesh.visible=false;}object.computeBoundingBox();object.computeBoundingSphere();batch.zone.add(object);}
 // Batch static decoration by region/material; keep each interactive object independent.
 root.updateMatrixWorld(true);const interactive=new Set(picks);
 for(const zone of Object.values(zones)){
  const inverse=zone.matrixWorld.clone().invert(),objects=[];
  zone.traverse(o=>{if(!o.isMesh||o.isInstancedMesh)return;let parent=o,excluded=false;while(parent&&parent!==zone){if(interactive.has(parent)){excluded=true;break;}parent=parent.parent;}if(!excluded)objects.push(o);});
  const staging=new T.Group();
  for(const o of objects){const copy=o.clone(false),matrix=inverse.clone().multiply(o.matrixWorld);matrix.decompose(copy.position,copy.quaternion,copy.scale);staging.add(copy);o.removeFromParent();}
  if(objects.length)zone.add(mergeGroup(staging));
 }
 // Ground, paths and landscape make the installation context legible without claiming site dimensions.
 box(root,[0,-.28,4],[70,.25,38],mat(0x263d4b));box(root,[0,-.10,-7],[45,.1,3],mat(0x36584e));for(const x of[-23,23]){cyl(root,[x,-.1,-7],[x,1.7,-7],.12,wood);sphere(root,[x,2.2,-7],[1.1,1.4,1.1],green);}root.updateMatrixWorld(true);
 function region(key){if(key==='all'){const all=new T.Box3();for(const g of Object.values(zones))all.union(new T.Box3().setFromObject(g));return all.expandByScalar(.8);}const aliases=id==='hvac'?{terminals:['building','terminals'],headers:['headers'],cold:['cold'],hot:['hot']}:id==='heating'?{homes:['building','homes'],entry:['entry'],headers:['headers'],hot:['hot']}:id==='ahu'?{branch:['branch','unit'],main:['main'],unit:['unit','branch']}:{home:['home'],valves:['valves'],riser:['riser']};const b=new T.Box3();for(const k of aliases[key]||[]){if(zones[k])b.union(new T.Box3().setFromObject(zones[k]));}return b.isEmpty()?new T.Box3().setFromObject(root):b;}
 function update(result,selected=0){for(const r of rooms){const data=result.rows[r.index];if(!data)continue;const color=data.status==='closed'?0x54616b:data.status==='low'?0xd26356:data.status==='high'?0xd39b4c:0x438db2;r.material.color.setHex(color);r.material.opacity=r.index===selected?.40:.16;r.panel.material.emissive?.setHex(r.index===selected?0x154663:0x000000);r.panel.material.emissiveIntensity=.35;} }
 return{root,rooms,picks,valves,labels,segments,zones,region,update,setShell:value=>{wall.opacity=value?.08:.36;},scenario:id};
}

return {buildContext};})();
const CARE_DATA=(()=>{

// Readable circuit sequences follow the supplied four schematic drawings.
// Counts describe one representative branch / branch pair, never a project purchasing BOM.
const VALVE_TYPES={
 top:{name:'顶部阀件（类型待确认）',short:'顶部阀件',modelType:'ball',purpose:'保留原图立管顶部附件位置，具体功能由工程详图核定。',position:'供、回水立管顶部。',different:'不能仅凭小图符号就认定为球阀、排气阀或泄水阀；本项明确保留待确认状态。',model:'原图顶部阀件位置 · 类型待确认',photo:null,color:'#8b9297'},
 ball:{name:'全焊接球阀',short:'球阀',purpose:'检修时关断这一段水路。',position:'按原图设于干管、入口或用户供回水的关断位置。',different:'它负责开关隔离，不承担本图中压差阀或流量阀的自动控制任务。',model:'图例 1 · 全焊接球阀',photo:null,color:'#6b8595'},
 filter:{name:'过滤一体球阀',short:'过滤一体球阀',purpose:'一个阀件兼顾过滤杂质和关断隔离。',position:'按原图布置在用户入口供水侧，或末端回路入口的指定位置。',different:'它不是压差控制阀；清洗维护与安装方向须按产品说明确认。',model:'图例 2 · 一体式全焊接球阀过滤器',photo:null,color:'#647d8b'},
 dp:{name:'自力式压差控制阀',short:'压差控制阀',purpose:'稳定对应回路或单元的压差，减小相邻支路调节干扰。',position:'本图用于回水侧、集水器支路及制冷机支路；导压点随具体环节变化。',different:'它稳的是压差；分水器平衡阀用于流量预调，不能只因阀体相似就互换。',model:'图纸 ZTY47-16 · 照片 ZTY47-16',photo:'dp',color:'#276dba'},
 balance:{name:'数字锁定平衡阀',short:'数字锁定平衡阀',purpose:'对供水支线流量作预调、锁定，建立初始配水。',position:'本图位于分水器的各支线，按支线设计流量整定。',different:'原图标为“支线流量粗调”；不将手动预调阀当作自力式恒流或恒压差阀。',model:'图纸 SP45F · 照片 SP45-16（外形参考）',photo:'balance',color:'#bd4942'},
 flow:{name:'自力式流量控制阀',short:'流量控制阀',purpose:'控制锅炉支路流量，减小并联源侧支路之间的流量干扰。',position:'原图布置在锅炉入口支路，不是所有末端都增设一只。',different:'它控流量；压差阀控压差。实际最小工作压差、流量设定范围须查对应产品资料。',model:'图纸 ZL4M · 照片 ZL47-25（外形参考）',photo:'flow',color:'#328f94'},
 check:{name:'限流止回阀',short:'限流止回阀',purpose:'在原图热水泵出口支路承担限流、止回功能，防止倒流。',position:'本图热水泵出口侧，与关断阀配合。',different:'原图冷冻泵支路没有同样的 LH45 标注，不能机械地给所有泵套用。',model:'图纸 LH45 / LH45-16',photo:null,color:'#7b70a7'},
 selfdp:{name:'自力式自身压差控制阀',short:'自身压差旁通阀',purpose:'控制集分水器之间旁通的开启条件，原图用途为保护机组和热源。',position:'横跨集水器与分水器的旁通管上。',different:'它是旁通用途的自身压差阀，不等同于用户照片中的 ZTY47-16 支路压差阀。',model:'原图自身压差阀标注 · 以厂家资料确认为准',photo:null,color:'#a17c39'},
 motor:{name:'电动调节阀',short:'电动调节阀',purpose:'接受空气侧温度控制信号，调节盘管水量。',position:'机组回水侧，盘管与压差调节阀之间。',different:'它跟随控制指令调水量；自力式压差阀为水侧稳定条件，两者在本图中配合。',model:'原图 M 标识 · 型号未给出',photo:null,color:'#6d7586'},
 butterfly:{name:'支路关断阀',short:'支路关断阀',purpose:'隔离机组或泵支路，便于检修。',position:'按原图设备支路的关断符号位置布置。',different:'此处只确认关断用途。薄型三维外观不构成“已确定为蝶阀”的选型结论。',model:'原图支路关断符号 · 具体阀型待确认',photo:null,color:'#7b909d'}
};
const row=(label,start,types,end,note='')=>({label,start,types,end,note});
const header={id:'headers',group:'输配与平衡',title:'集分水器支路',sub:'供水调流量，回水稳压差',zone:'headers',key:'dp',rows:[row('供水','分水器',['balance','ball'],'末端支线'),row('回水','末端支线',['ball','dp'],'集水器')],why:'同一对支路：供水侧用平衡阀作初始流量预调，回水侧用压差阀降低支路间的调节干扰。',count:'每对支路：1 只平衡阀 + 1 只压差阀 + 2 只球阀。',pressure:'集水器支路压差阀的导压连到对应供水支线，按原图逐路配对。'};
const bypass={id:'bypass',group:'输配与平衡',title:'集分水器旁通',sub:'这里用自身压差旁通阀',zone:'headers',key:'selfdp',rows:[row('旁通','分水器',['selfdp'],'集水器')],why:'这是源侧保护旁通，不能与向用户供水的支路混成一条线路。',count:'本图集分水器之间：1 只自身压差旁通阀。',pressure:'旁通开启条件、最小流量保护关系和整定范围需结合实际产品及设备确认。'};
const pump={id:'pump',group:'热源支路',title:'热水循环泵',sub:'关断隔离 + 出口限流止回',zone:'hot',key:'check',rows:[row('回水','集水器',['butterfly','@pump','butterfly','check'],'锅炉入口总管')],why:'泵两侧关断便于检修，出口侧的限流止回阀按原图保留，防止并联泵路倒流。',count:'每条泵支路：2 处关断 + 1 只限流止回阀；泵为设备。',pressure:'此处按原图热水泵支路表达，限流止回阀型号标注 LH45 / LH45-16。'};
const boiler={id:'boiler',group:'热源支路',title:'锅炉并联支路',sub:'流量阀放在锅炉入口支路',zone:'hot',key:'flow',rows:[row('源侧','泵出口总管',['flow','butterfly','@boiler','butterfly'],'供水总管')],why:'两台锅炉并联时，原图在各锅炉入口设自力式流量控制阀，配合两侧关断。',count:'每台锅炉支路：1 只流量阀 + 2 处关断。',pressure:'实拍 ZL47-25 仅校正外形；不能据此将图纸 ZL4M 当作同一规格。'};
const unitEntry={id:'entry',group:'入口与用户',title:'楼栋 / 单元入口',sub:'供水过滤，回水稳压差',zone:'entry',key:'dp',rows:[row('供水','上游供水',['filter'],'用户供水'),row('回水','用户回水',['ball','dp','ball'],'上游回水')],why:'供水侧过滤并可关断；回水侧压差阀两侧设球阀，既稳定该组用户压差，也方便隔离检修。',count:'每组入口：1 只过滤一体球阀 + 1 只压差阀 + 2 只球阀。',pressure:'入口压差阀导压连接到对应供水侧取压点，不接空气侧控制信号。'};
const user={id:'users',group:'入口与用户',title:'用户 / 住户支路',sub:'本图这里只需要供回水关断',zone:'homes',key:'ball',rows:[row('供水','公共供水',['ball'],'用户末端'),row('回水','用户末端',['ball'],'公共回水')],why:'原图用户符号处保留供回水关断；压差控制由公共入口阀组承担。',count:'每个原图用户符号：供水、回水各 1 处关断。',pressure:'建筑内六个等效组不是六只新增压差阀；不照搬机组电动阀组合。'};
const coil={id:'coil',group:'末端设备',title:'盘管 / 新风机组',sub:'电动调水量，压差阀稳水侧',zone:'terminals',key:'motor',rows:[row('供水','回路供水',['butterfly'],'盘管入口'),row('回水','盘管出口',['motor','dp','butterfly'],'回路回水')],why:'空气侧测点的控制指令作用于电动阀；压差调节阀抑制水侧干扰，供回水关断用于检修。',count:'每台典型机组：1 只电动阀 + 1 只压差阀 + 供回水各 1 处关断。',pressure:'盘管侧回水取压与空气测点至 M 的控制信号分别表达。黄色虚线不是导压管。'};
const VALVE_ROUTES={
 hvac:{title:'酒店空调：各环节用什么阀',default:'headers',note:'冷源与热源为季节替代路径，不是冷机之后再串接锅炉。',stations:[
 {id:'cold-pump',group:'冷源支路',title:'冷冻水泵',sub:'泵两侧关断',zone:'cold',key:'butterfly',rows:[row('回水','集水器',['butterfly','@pump','butterfly'],'制冷机入口')],why:'按原图隔离水泵，保留 5 条泵路与 4 台制冷机的汇接关系。',count:'每条冷冻泵支路：2 处关断；第 5 路汇入第 4 机组入口。',pressure:'原图此处未标 LH45，不套用热水泵限流止回组合。'},
 {id:'chiller',group:'冷源支路',title:'制冷机支路',sub:'设备关断 + 出口压差控制',zone:'cold',key:'dp',rows:[row('冷源','冷冻泵出口',['butterfly','@chiller','butterfly','dp'],'分水器')],why:'原图四条制冷机支路分别保留进口关断、出口关断与压差控制位置。',count:'每台制冷机支路：2 处关断 + 1 只压差控制阀。',pressure:'该支路的取压 / 调节连接按源侧设备资料核定，不照抄用户入口跨供回取压。'},
 pump,boiler,header,bypass,
 {id:'loop',group:'末端设备',title:'末端公共回路入口',sub:'回路一级压差控制',zone:'terminals',key:'dp',rows:[row('供水','分水器支线',['ball'],'机组供水干线'),row('回水','机组回水干线',['dp','filter'],'集水器支线')],why:'这是公共回路入口的控制，和每台机组的回水调节是两个层级。',count:'每个末端回路入口：供水球阀 + 回水压差阀 + 回水过滤关断。',pressure:'原图回水侧压差阀导压至该回路供水侧，减小回路间调节干扰。'},coil]},
 heating:{title:'楼栋供暖：各环节用什么阀',default:'entry',note:'先看公共入口稳压差，再看用户关断；原图第一对集分水器接口是预留。',stations:[pump,boiler,
 {...header,pair:2,title:'集分水器 · 用户接口',sub:'第二对：通向用户的供回水',why:'这里明确表示原图第二对用户接口。第一对预留、第三对源侧接口在另外两个环节单独读，方向不照搬。',count:'第二对用户接口：1 只平衡阀 + 1 只压差阀 + 2 只球阀。'},
 {id:'source-headers',pair:3,group:'输配与平衡',title:'集分水器 · 热源接口',sub:'第三对：接水泵与锅炉',zone:'headers',key:'dp',rows:[row('源侧供水','锅炉出口',['ball','balance'],'分水器'),row('源侧回水','集水器',['dp','ball'],'热水泵入口')],why:'源侧供水是锅炉送入分水器，源侧回水是集水器送往热水泵；与用户接口的方向不同。',count:'第三对源侧接口：1 只平衡阀 + 1 只压差阀 + 2 只球阀。',pressure:'源侧接口按原图第三对端口配对；不得把用户接口的供回水阅读方向直接套过来。'},
 {id:'spare-headers',pair:1,group:'输配与平衡',title:'集分水器 · 预留接口',sub:'第一对：封闭预留，不通水',zone:'headers',key:'balance',rows:[{...row('预留供水','分水器',['balance','ball'],'封闭预留口','此行按器体到封口看安装先后，不表示有运行水流。'),installation:true},{...row('预留回水','集水器',['dp','ball'],'封闭预留口','此行按器体到封口看安装先后，不表示有运行水流。'),installation:true}],why:'原图第一对接口保持预留；能识别预装阀型，但不把预留口当作正在运行的用户支路。',count:'第一对预留接口按图保留阀件；预留状态不计运行支路或负荷。',pressure:'预留状态的封闭和将来启用条件按工程详图核定，不能照搬运行支路的调试指令。'},
 bypass,unitEntry,user]},
 ahu:{title:'医院新风机组：各环节用什么阀',default:'coil',note:'空气侧控制服务区可以有多个，水侧仍是一条盘管支路。',stations:[
 {id:'main',group:'干管与机组',title:'上游干管',sub:'干管关断 + 干管压差控制',zone:'main',key:'dp',rows:[row('供水','上游供水',['ball'],'机组供水取支点'),row('回水','机组回水汇入点',['dp','ball'],'上游回水')],why:'原图干管有自己的关断、压差控制组合，不能因机组已装压差阀就省略。',count:'该干管组合：1 只压差阀 + 供回水各 1 只球阀。',pressure:'干管压差控制导压至干管供水侧，控制范围与机组支路分别看待。'},
 {...coil,zone:'branch',group:'干管与机组'},
 {id:'signal',zones:['unit','branch'],group:'信号与测点',title:'空气侧控制',sub:'空气测点 → 控制信号 → 电动阀',zone:'unit',key:'motor',rows:[row('信号','空气侧测点',['motor'],'盘管水量调节','这里只表示测点与执行器之间的控制关系，不是水流路径；控制器细节原图未展开。')],why:'空气侧测点经相应控制系统驱动 M 电动调节阀；铜色导压管属于另一条水侧反馈关系。',count:'1 处 M 电动调节；空气侧四个展示区不等于新增四只水阀。',pressure:'本图不据此确定医院通风量、医疗工艺要求或完整自控联锁。'}]},
 entry:{title:'供暖单元入口：各环节用什么阀',default:'entry',note:'公共入口一只压差阀服务整个单元，用户内部只保留原图关断。',stations:[{...unitEntry,title:'单元入口阀组',zone:'valves'},{...user,zone:'home'},
 {id:'riser',group:'入口与用户',title:'供回水立管顶部',sub:'两根立管顶部保留阀件',zone:'riser',key:'top',rows:[row('供水','供水立管',['top'],'顶部阀件位置'),row('回水','回水立管',['top'],'顶部阀件位置')],why:'原图两根立管顶部有附件位置，保留为待确认附件，不从外形判断具体类型或用途。',count:'供、回水立管顶部各 1 处阀件。',pressure:'顶部附件类型、排气、泄水及检修条件仍须结合工程详图确认；不从图形猜测完整附件选型。'}]}
};
const ROUTE_EQUIPMENT={pump:'循环水泵',boiler:'锅炉',chiller:'制冷机'};

// Plain-language explanations describe design intent, never measured failure or guaranteed savings.
const PLAIN_VALVES={
 filter:{label:'拦住杂物',problem:'水里可能有铁锈、焊渣。这些杂物跑到后面，可能卡住阀门或堵住末端。',action:'用过滤网先把杂物拦下来；它还兼有球阀的关断功能。',without:'后面的水路少一道过滤，杂物更容易继续进入设备。'},
 dp:{label:'减少干扰',problem:'其他水路开关或调节时，这一段的压力条件也可能跟着变。',action:'它按设定自动调节，减少这段水路的压力差波动，让其他支路的变化少影响这里。',without:'这一段更容易受水侧压力变化影响，调节时可能互相干扰。'},
 ball:{label:'留检修条件',problem:'管路会有检修的时候，需要预留能够隔断水路的位置。',action:'在图纸规定的位置设置球阀，为隔离这一段管路提供条件。',without:'局部隔离不方便，检修时可能需要处理更大的范围。'},
 balance:{label:'先分好水量',problem:'水更愿意走阻力小的路。几条支路并排连接时，可能有的分得多、有的分得少。',action:'调试时预先调好这条支路的过水量，再锁定设置，帮助建立初始配水。',without:'初始配水更难调整，可能出现不同支路分水不合适。'},
 flow:{label:'分好锅炉的水',problem:'几台锅炉并联时，水不一定按需要分到每一条支路。',action:'按设计需要设定这条锅炉支路的流量，在产品工作范围内自动调节过水量。',without:'锅炉支路之间的分水更难控制，可能有的偏多、有的偏少。'},
 check:{label:'停泵防倒流',problem:'并联的水泵停了一台，其他泵仍在运行时，水可能倒着经过停泵支路。',action:'在本图热水泵出口，用限流止回阀抑制倒流，并承担图纸所列的限流作用。',without:'停泵支路少了相应的自动止回环节，可能出现倒流。'},
 selfdp:{label:'管住旁通近路',problem:'末端用水减少时，供回水间的压力条件会改变；这条近路需要受控，不能随意一直开着。',action:'达到设定的压差条件时，调节经过旁通的水，承担本图安排的机组、热源保护用途。',without:'本图这条旁通少了按压差调节的环节；实际保护条件仍要结合设备核定。'},
 motor:{label:'跟着需要调水',problem:'送风需要的冷热量会变化，盘管里的过水量也需要跟着调节。',action:'接到控制系统的指令后调节盘管水量，配合送风温度控制。',without:'盘管水量不能按这条控制信号自动调节。'},
 butterfly:{label:'留检修条件',problem:'机组或水泵要检修时，需要有能够隔断设备水路的位置。',action:'按原图留出关断位置，为隔离这条设备水路提供条件。具体阀型还要确认。',without:'设备支路缺少相应关断位置，局部检修隔离就不方便。'},
 top:{label:'用途待确认',problem:'图纸标出了顶部附件的位置，但现有信息不足以确认具体附件。',action:'先认清位置并保留待确认状态，不把它说成已经选好的排气阀或泄水阀。',without:'具体功能还未确认，不能据此编造去掉后的影响。'}
};
function getStageStory(caseId,station){
 const stories={
  entry:caseId==='entry'?'这是一个单元的暖气进门口。热水从主管进来，经过各户暖气，再从回水管回去。':'这是这一组住户的暖气入口。热水从主管进来，经过这组暖气，再从回水管回去。',
  headers:'供水在这里分成几路，回水再在这里汇到一起。各条路需要分好水，也要减少互相干扰。',
  'source-headers':'这对接口接热源：锅炉出水送进分水器，集水器的回水送往热水泵。',
  'spare-headers':'这对管口留给将来使用，现在封闭、不通水。这里看的是预留条件。',
  bypass:'这是供水和回水之间的一条近路，不是通向住户的那条路。它按设定条件承担保护用途。',
  pump:'水泵把水推着循环。泵旁边的阀，还要考虑停泵时倒流和检修时隔离。',
  'cold-pump':'水泵把冷冻水推着循环。原图在泵两侧留出关断位置，便于检修隔离。',
  boiler:'两台锅炉并联，水可以走两条路。每台锅炉支路都需要合适的过水量。',
  chiller:'制冷机在这里把循环水冷却，旁边的阀负责水侧调节和设备检修隔离。',
  loop:'这一入口带着一组新风、空调箱或风机盘管。先管住这一整组，再看每台机组。',
  coil:'水流过空调盘管，风吹过盘管再送进房间。水量要能调节，设备也要能隔离检修。',
  main:'这里是机组支路上游的公共水路。公共水路和单台机组有各自需要处理的问题。',
  users:'这里分到某个用户或住户组。公共入口已有组一级控制，用户处还要留出关断位置。',
  signal:'空气侧测点反映温度情况，控制系统再指挥电动阀调整水量。这条线表示信号，不是水管。',
  riser:'原图在立管顶部画了附件位置；具体附件类型和用途，还要看工程详图。',
  auxiliary:'这是场景中的附属阀件位置，用于逐只识别，不据此增加原图选型或采购数量。'
 };
 return stories[station.id]||'先看这段水路会遇到什么事，再看这只阀能解决哪一件事。';
}
function getValveLesson(caseId,station,type){
 const base=PLAIN_VALVES[type]||PLAIN_VALVES.top;let extra={};const id=station.id;
 if(id==='entry'){
  const who=caseId==='entry'?'这个单元':'这一组住户';
  if(type==='filter')extra={problem:'热水可能带着铁锈、焊渣进来，这些杂物容易卡住后面的阀门或堵住末端。',action:'在进水口先拦住杂物；需要隔离进水时，这只阀还可以关断供水。',without:'杂物更容易进入后面的水路，增加堵塞机会。'};
  if(type==='dp')extra={label:'少受别家影响',problem:`别的单元开关暖气，主管的压力条件可能跟着变，${who}的水量也可能受影响。`,action:`它自动调节，稳定${who}进水与回水之间的压力差，也就是推动水循环的“推力”。`,without:'这里的水量更容易跟着主管压力波动；压差阀的任务是减少这种干扰。'};
  if(type==='ball')extra={problem:'压差阀前后都连着有水的管道，检修时需要把这一小段的两头隔开。',action:'前后各放一只球阀，为隔离压差阀所在的这一段管路留出条件。',without:'只隔断一头，另一头仍然连通，隔离条件就不完整。'};
 }
 if(id==='headers'&&type==='dp')extra={problem:'一条支路调节用水时，其他支路的压力条件也可能跟着变化。',action:'按图纸对应的取压范围调节压差，减少支路之间的相互干扰。',without:'支路调节更容易互相影响。它不等于把每条支路的水量锁成一样。'};
 if(id==='source-headers'){
  if(type==='balance')extra={problem:'这条热源连接水路的初始流量，需要按设计要求调好。',action:'为源侧连接预先调整过水量，再锁定设置；水流方向按这一对接口单独看。',without:'这条源侧连接的初始流量不容易整定。'};
  if(type==='dp')extra={problem:'泵和其他支路工况变化时，这段热源连接的压力条件也可能变化。',action:'按原图第三对接口的取压关系，调节这条连接水路的压力差。',without:'源侧这一段少了原图安排的压差调节环节。'};
 }
 if(id==='spare-headers')extra={label:'留好以后条件',problem:'这对口现在封闭，将来接入新水路时，仍要具备相应的调节和隔离条件。',action:`按原图保留${VALVE_TYPES[type].short}的位置。现在没有运行水流，启用后再按实际设计调试。`,without:'将来启用时可能缺少原图预留的功能；现在不能把预留口当作运行支路。'};
 if(['pump','cold-pump'].includes(id)&&type==='butterfly')extra={problem:'水泵会有检修、更换的时候，泵两头的水路都要有隔离位置。',action:'在泵两侧按图留出关断条件，方便隔离这一条泵支路。',without:'隔离这条泵支路不方便，检修处理范围可能扩大。'};
 if(['boiler','chiller'].includes(id)&&type==='butterfly')extra={problem:'设备需要检修时，进、出口水路都需要有隔离位置。',action:'按图纸在设备两侧留出关断条件，为局部隔离检修提供方便。',without:'设备水路缺少相应关断位置，局部隔离不方便。'};
 if(id==='chiller'&&type==='dp')extra={problem:'并联冷源支路可能受到其他支路和泵工况变化的影响。',action:'按原图在该机组支路控制压差，对应取压和整定方式需结合设备资料确认。',without:'这条机组水路少了原图安排的压差调节环节。'};
 if(id==='loop'){
  if(type==='filter')extra={problem:'一组末端回来的水可能带回杂物，继续进入后面的汇集、源侧水路。',action:'本图在回水的指定位置过滤，同时保留关断功能。它不是放在这一组的进水口。',without:'这组回水少一道过滤和关断位置。'};
  if(type==='dp')extra={problem:'这一整组末端在调节时，其他末端组的水侧压力条件也可能变化。',action:'在公共回路入口按图控制这组水路的压差，减少组与组之间的干扰。',without:'各组调节更容易互相影响；机组自身的阀与组入口的阀并不是同一个层级。'};
  if(type==='ball')extra={problem:'这一组末端检修时，供水侧需要有专门的关断位置。',action:'与回水侧能关断的过滤阀配合，为隔离这一组末端留出条件。',without:'这一组供水侧缺少相应的关断位置。'};
 }
 if(id==='coil'&&type==='dp')extra={problem:'电动阀调水量时，水侧压力条件也可能变化，影响调节。',action:'按图纸对应的取压范围调节压差，让电动阀少受水侧压力变化的干扰。',without:'机组调水量时，更容易受到水侧条件变化的影响。'};
 if(id==='users'&&type==='ball')extra={problem:'某个用户或住户组要检修，需要有单独隔离这条水路的位置。',action:'在用户的供水、回水上各留关断条件。公共入口的压差控制另有对应阀组。',without:'该用户支路的局部隔离不方便。'};
 if(id==='signal'&&type==='motor')extra={label:'听指令调水量',problem:'送风温度需要调节，控制系统需要有能执行指令的水阀。',action:'电动阀接到指令后改变盘管过水量，配合空气侧温度控制。',without:'这条控制信号没有相应的水阀执行调节。这里讲的是信号关系，不是新增水路。'};
 return{...base,...extra};
}
function getLessonTypes(station){
 const types=[...new Set((station.rows||[]).flatMap(r=>r.types).filter(t=>!t.startsWith('@')))];if(!types.length)return[station.key];
 const priority=station.id==='entry'?['filter','dp','ball']:['balance','flow','motor','dp','selfdp','check','filter','ball','butterfly','top'];
 return[...types].sort((a,b)=>priority.indexOf(a)-priority.indexOf(b));
}

// General engineering workflow; product-specific curves and maintenance instructions remain required.
const CARE_GUIDES={
 dp:{selection:[['先定控制范围','明确这只阀控制哪段水路、取压点接在哪里，再计算所需压差。'],['核对工作范围','同时核对设定范围、阀门最小工作压差和最大允许压差；系统承压与温度另外核定。'],['再选规格','结合设计流量与厂家流量／压差曲线核定 DN、连接和检修空间，不能照照片 DN50 套用。']],commission:[['先查水路与导压','清洗、排气后，核对流向、导压取点、导压管通畅及接头。'],['按设计值测调','用对应型号的调节说明整定受控段压差，记录实测压差和流量。'],['再查部分负荷','改变允许退出支路的状态，复测剩余支路与最不利环路；不把压差设定当恒定流量。']],maintenance:[['压差不稳','先查供用压差、气堵、脏堵、导压管及阀位，再判断阀体故障。'],['出现渗漏','确认泄漏位置；导压接头、密封或控制组件按该型号说明处理，不推定可带压拆修。'],['恢复运行','按厂家充水、均压和启闭要求复运，再核对原整定值、压差与流量。']]},
 flow:{selection:[['先有支路设计流量','每台锅炉分别核对额定及最小允许流量，不能平均分配后直接选阀。'],['核对自动控制条件','设计流量须落在可设定范围内，现场可用压差须满足该型号的工作范围。'],['再确认具体型号','按流量、压差、介质温度和承压选规格；图纸 ZL4M 与实拍 ZL47-25 分别核实。']],commission:[['先核对源侧要求','核对锅炉与泵的启用状态、流向及保护条件，避免以演示工况替代厂家最小流量要求。'],['逐台设定与测量','按该型号资料设定目标流量，同一工况逐支路测量并留记录。'],['复核并联切换','在许可工况下变更并联设备状态，核查其余支路流量和工作压差。']],maintenance:[['实际流量偏小','先查供用压差、过滤条件、气堵、关断阀位置与目标设定。'],['调节机构异常','记录设定及故障现象，按型号说明检修；不照其他产品的旋转方向或圈数操作。'],['恢复原设定','维护后复测该锅炉支路流量，并核对相邻支路及设备保护条件。']]},
 balance:{selection:[['先有支路目标流量','按本支路设计流量与允许阀门压降选择调节能力。'],['需要对应曲线','用厂家 Kv／开度曲线或配套测量方法确认预设与可测范围。'],['预留测量和操作位置','核对测压口、手轮操作及锁定空间，同时核对连接、承压与温度。']],commission:[['保持可比工况','完成清洗排气，确认待平衡支路的阀位和设计流量。'],['测量后逐路预调','按本型号测量方法调整支路流量，兼顾最不利环路，不以手轮刻度直接当流量。'],['锁定并复测','达到目标后记录开度、压差与流量，锁定，再复测相邻支路。']],maintenance:[['流量变化','先查系统工况和阻塞，检查锁定位置是否被改变。'],['测量不可信','核对仪表、测压接头及测点通畅，采用该阀对应的测量曲线。'],['拆修后再平衡','记录原开度，复运后重新测量并锁定，不能只复原刻度就认定流量已恢复。']]},
 ball:{selection:[['先看隔离哪一段','明确需要关断的边界，压差阀检修段应有两端隔离条件。'],['核对工况与连接','核定介质、温度、系统承压、口径和焊接／法兰等实际连接形式。'],['留操作与检修条件','确认手柄能操作、隔离边界可验证；关断球阀不作为本图的自动平衡阀。']],commission:[['按图核对位置','确认供回水隔离边界与实际阀型，按产品要求完成安装检查。'],['核对开关状态','开关和充水按该型号要求进行，记录运行阀位，检查外漏。'],['不要代替调节阀','需要稳压差、调流量时，核对对应控制阀，而非随意半关球阀。']],maintenance:[['关不严或难操作','先核对操作机构、阀位及隔离状态，不能用加长手柄强行扳动。'],['维护方式看结构','全焊接阀体不默认可现场拆开；按厂家要求确定密封、执行机构或整阀处理。'],['复运核对','按规定重新充水、排气和检漏，恢复运行阀位并核对相邻设备。']]},
 filter:{selection:[['兼顾过滤和关断','核对实际介质杂质、允许阻力及下游设备要求，确认一体阀功能。'],['过滤精度要有依据','滤网孔径、通流能力及清洁压降须查产品资料，不能凭外形推定。'],['留出清理位置','核对排污／滤网取出空间、安装方向、连接和温压范围。']],commission:[['先清洗系统','按方案冲洗并检查过滤状态，不能把施工残渣长期留在过滤件里。'],['核对水路方向','按该产品流向及安装说明核对，确认关断边界。'],['建立维护基线','有相应测点时记录过滤件前后压差、流量及清理状态，便于以后比较。']],maintenance:[['水量变小','结合前后压差和相同工况，排查滤网堵塞，而非直接提高泵压。'],['清理按说明','隔离、冷却和泄压后，按该一体阀结构清理；不假定所有滤网都能在线拆出。'],['复装与检漏','核对滤网、密封和方向，按要求复运，复测压差与流量。']]},
 check:{selection:[['确认防倒流场合','本图用在热水泵出口；先核对并联泵的运行与停泵组合。'],['校核流动与关闭','核定设计流量、允许压降、开启条件、安装方向及关闭特性。'],['核对限流功能','若产品兼有限流，须核对具体范围与设定方法；不能仅凭止回外形判定。']],commission:[['先检查箭头与阀位','核对流向、泵侧关断及实际安装方向，按设备方案准备运行。'],['正常运行时测量','记录泵支路流量、压差，观察异常噪声或振动。'],['在许可条件下核查切换','按现场方案核对停泵支路有无倒流迹象；不以软件动画代替止回性能测试。']],maintenance:[['停泵有回流迹象','先核对其他泵状态、阀门方向及关闭情况，再按产品说明查卡阻、磨损。'],['异响或振动','结合流量、压差及关闭过程排查，避免只凭声音认定某个内部零件损坏。'],['复运再核查','维护后记录运行和停泵切换情况，并检查接口外漏。']]},
 selfdp:{selection:[['先核定保护对象','确认旁通服务的机组／热源、允许压差和最小循环流量需求。'],['再定开启条件','结合系统设计核定开启压差、旁通能力及产品调节范围。'],['不能套用支路阀','核对自身压差旁通型号、安装方向和连接，不用照片 ZTY47-16 直接替代。']],commission:[['识别旁通近路','核对取压与跨接位置，确认旁通没有误接到用户支路。'],['按方案整定','按实际型号及设备保护要求设置开启条件，记录压差与旁通流量。'],['复核低负荷','在许可工况下核查最小循环流量、末端供水和源侧温差，避免长期无效旁通。']],maintenance:[['旁通一直有流','先核对真实压差、设定及阀位，再查是否有卡阻或密封问题。'],['保护条件不足','核查设备最小流量与系统工况，不能仅凭调大旁通作结论。'],['复运记录','维护后重新验证开启条件、旁通流量及设备保护要求。']]},
 motor:{selection:[['先定调节任务','按盘管设计流量、可用压差和阀权度校核阀门能力，不能只按管径配。'],['阀体与执行器匹配','核对连接、温压范围、行程、关闭压差及执行器驱动力。'],['核对控制接口','确认供电、控制／反馈信号和故障位置；医院空气侧及联锁要求单独核定。']],commission:[['先核对接线和行程','由相应人员确认供电、信号、阀体方向及执行器匹配。'],['逐级给定信号','按现场自控方案核对命令、反馈、阀位及盘管水量变化。'],['水侧和空气侧分别复核','同时观察受控段压差和空气侧响应，按项目要求完成联锁测试。']],maintenance:[['有指令但不动作','先查供电、接线、信号和执行器状态，再区分阀杆卡阻。'],['有动作但流量异常','查水侧压差、关断状态、气堵脏堵及阀体，不只更换执行器。'],['复运再验证','检修前按要求隔离电源和水路，复运后核对全行程、反馈、流量与联锁。']]},
 butterfly:{selection:[['先确认具体阀型','原图只确认这里需要支路关断，薄型模型外观不等于已经选定蝶阀。'],['按隔离工况选','根据介质、温压、口径、连接、允许泄漏及安装空间确定实际产品。'],['核对检修边界','确认泵或机组两侧关断能形成预期隔离，预留可验证的泄压条件。']],commission:[['核对实际产品','先把型号、安装方向、连接和操作机构与图纸要求对应。'],['核对运行状态','按设备启用／隔离方案检查阀位，记录操作及外漏情况。'],['联动检查','泵或机组切换时核对相关关断状态，按项目方案复核。']],maintenance:[['隔离不可靠','先确认实际阀型、阀位和系统边界，不把阀门关闭等同于已无压。'],['处理操作或密封故障','按实际产品的维护说明处理；未确定阀型前不提供内部拆修步骤。'],['复运确认','恢复后检查外漏、运行阀位及机组水路，更新检修记录。']]},
 top:{selection:[['先查工程详图','确认顶部附件究竟承担关断、排气或其他功能，不从小图形状猜测。'],['再定型号与工况','功能确认后再核对口径、温压、连接及安装要求。'],['当前不出具体选型','保留顶部位置，不给出未确认附件的采购型号。']],commission:[['先确认用途','拿到详图和产品说明，核对供回水顶部的实际附件。'],['不套用其他阀步骤','未确认附件类型时，不给出转动方向、开度、设定或排放操作。'],['补全记录后实施','把型号、功能、测点和操作要求确认后，纳入现场调试方案。']],maintenance:[['先识别附件','查清名称、型号和用途，再判断故障与维护范围。'],['按真实产品检修','未确认类型时，不编造排气、排污或内部拆修步骤。'],['更新资料','核对现场更换后的真实阀件，补全图纸和维修记录。']]}
};
const CARE_SOURCES=[
 {title:'ASHRAE：阀门选型与水侧 Kv',url:'https://handbook.ashrae.org/handbooks/S20/SI/S20_Ch46/S20_ch46_si.aspx'},
 {title:'Danfoss：压差阀安装与启动方法参考',url:'https://assets.danfoss.com/documents/latest/65460/AQ14688647959902-010201.pdf'},
 {title:'Danfoss：调试与泵压差复核',url:'https://assets.danfoss.com/documents/latest/96018/AD155086478574en-010201.pdf'},
 {title:'Caleffi：手动平衡阀的选用与测量',url:'https://www.caleffi.com/en-us/blog/3-manual-balancing-valves'},
 {title:'Caleffi：平衡阀的保护与维护',url:'https://www.caleffi.com/en-us/blog/6-protection-maintenance-balancing-valves'}
];

VALVE_ROUTES.hvac.stations.push({id:'hot-isolation',title:'热源季节隔离',zone:'hot',key:'ball',rows:[{label:'隔离',start:'热源供回水',types:['ball'],end:'公共水路'}],why:'冷源与热源按季节切换；这里的关断用于热源回路隔离，不把冷热源串成一条运行路径。'});
VALVE_ROUTES.heating.stations.push({id:'riser',title:'供回水立管顶部',zone:'entry',key:'top',rows:[{label:'顶部附件',start:'立管',types:['top'],end:'附件位置'}],why:'仅保留原图顶部附件位置，具体类型、功能和选型仍需工程详图确认。'});

CARE_SOURCES.unshift({title:'Caleffi：测压与检修条件参考',url:'https://www.caleffi.com/sites/default/files/media/external-file/18159.pdf'});return {VALVE_TYPES,VALVE_ROUTES,ROUTE_EQUIPMENT,CARE_GUIDES,CARE_SOURCES};})();
const WORKSHOP_STORY=(()=>{

// Visual learning steps. No site readings, valve-turn presets or savings estimates.
function makeWorkshopStory({type,targetCode,gateCodes={},pending=''}) {
  const step=(title,copy,why,focus,extra={})=>({title,copy,why,focus,closed:[],flow:1,measure:0,before:'保持运行示意',after:'本步只展示操作意图',...extra});
  const left=gateCodes.left,right=gateCodes.right;
  const closed=[left,right].filter(Boolean);
  if(pending)return {commission:[
    step('先认清这个位置','图纸保留了附件或预留口的位置。','型号或用途尚未确认，不演示启闭。','target',{flow:0,before:'位置已保留',after:'功能待资料确认'}),
    step('核对工程详图','查明附件用途、连接和隔离边界。','不能把封闭预留口当作运行水路。','route',{flow:0,before:'现有资料不足',after:'补齐详图与型号'}),
    step('资料齐全后再制定程序','先确认真实产品，再确定调试和检修方法。','这里不编造未确认附件的操作。','target',{flow:0,before:'不演示操作',after:'按实际资料实施'})
  ],maintenance:null};
  const maintenance=[
    step('认准 '+targetCode,'金色标记就是这次要检查的阀。','先认准对象，再找它两侧的隔离位置。','target',{before:'水路连通示意',after:'目标阀已标出'}),
    left?step('关断演示：'+left,'只看红色高亮的这只关断阀。','示意关闭后，流动光点停止；水和压力仍可能留在管内。','left',{closed:[left],flow:0,before:left+' 运行示意',after:left+' 关断示意'}):step('先核定上游隔离','图中没有确认目标阀这一侧的隔离位置。','不能拿被检修的阀门代替它自身的外部隔离。','target',{before:'边界尚未确认',after:'先查工程详图'}),
    right?step('关断演示：'+right,'现在看另一侧红色高亮的关断阀。','这是图示位置演示，现场启闭先后须按实际型号核定。','right',{closed,flow:0,before:right+' 运行示意',after:right+' 关断示意'}):step('另一侧也要核定','仅关一侧，不代表已经具备完整检修隔离。','还要核对连接到此处的其他管路。','target',{closed,flow:closed.length?0:1,before:'另一侧边界待核定',after:'不据此拆修'}),
    step('关阀后，仍可能有压','橙色锁标记提醒：现在不能直接拆开。','关断不会自动冷却、排空或泄压；差压为零也不代表静压为零。','target',{closed,flow:0,lock:true,before:'关断位置已演示',after:'残压状态仍未知'}),
    step('确认条件，再安排检修','核对隔离边界、冷却、泄压和无压确认。','具体拆修按实际型号资料执行，本页不演示带压拆装。','target',{closed,flow:0,lock:true,before:'不能直接拆开',after:'条件须现场核实'}),
    step('复运后重新检查','模型恢复到运行示意，流动光点重新出现。','实际充水、均压、启闭和复测按厂家及项目程序执行。','route',{before:'维护结束后',after:'按程序复运并复查'})
  ];
  const regulated=['dp','selfdp','balance','flow'].includes(type);
  const goal={dp:'稳住这段水路的压差',selfdp:'核对旁通的开启条件',balance:'预调并锁定支路水量',flow:'按设计需要控制支路流量'}[type];
  const commission=regulated?[
    step('认准 '+targetCode,'金色标记对应当前选择的阀。','先核对流向、产品型号和这只阀服务的水路。','target',{before:'先认准对象',after:'阀与水路对应'}),
    step('找到红色 P1','红色接管逐步连到 P1 位置。','P1 是图示取压位置，实际测口须结合产品和工程资料确认。','p1',{measure:1,before:'一根管尚不能测差压',after:'已示意连接 P1'}),
    step('再接蓝色 P2','蓝色接管接到 P2，与 P1 配合测量。','仪表看的是 P1 与 P2 的差，不是一个点的静压。','measure',{measure:2,before:'只有 P1',after:'P1 与 P2 成对测量'}),
    step(goal,'观察金色高亮的调节部位。',type==='balance'?'需要对应型号的测量曲线，才能从差压判断流量。':type==='flow'?'先核对工作压差与流量设定范围，不用差压直接冒充流量读数。':'设定范围和调节方法以对应型号资料为准。','target',{measure:2,adjust:true,before:'整定依据待核对',after:'按设计目标与型号资料整定'}),
    step('调好以后，要复测','在相同工况下记录调试前、后的真实测量值。','没有现场数据，就不显示假设的改善数字。','measure',{measure:2,before:'调试前：记录实测',after:'调试后：同工况复测'}),
    step('工况变化后再检查','在允许的运行状态变化后，重新核对这条水路。','查看实际流量、压差和运行稳定性，不能只看模型动画。','route',{measure:2,before:'当前工况复测',after:'允许的变工况下再核对'})
  ]:type==='motor'?[
    step('认准 '+targetCode,'先看带执行器的电动调节阀。','它接收控制指令，配合盘管水量调节。','target',{before:'确认执行对象',after:'阀与控制任务对应'}),
    step('核对控制接口','高亮处表示执行器和控制端的位置。','供电、命令、反馈和故障位置须按真实产品核定。','target',{adjust:true,before:'接口资料待核对',after:'按实际接线与控制资料确认'}),
    step('观察指令与响应','这里只用高亮表示调节动作的意图。','不把示意动画当作实际行程、开度或流量反馈。','target',{adjust:true,before:'发出控制指令',after:'现场核对动作和反馈'}),
    step('水侧与空气侧分别复核','运行后核对盘管水侧与空气侧的实际响应。','联锁和通风要求按项目方案单独确认。','route',{before:'控制端核对',after:'按项目要求复测'})
  ]:[
    step('认准 '+targetCode,'当前高亮的是这一环节要核对的阀。','先核对实际阀型，外观示意不代替产品选型。','target',{before:'确认对象',after:'阀与安装位置对应'}),
    step('沿箭头看流向','光点与箭头只用来说明水路方向。','核对实物箭头与安装方向，不把光点当作流速。','route',{before:'识别进出方向',after:'结合实物核对方向'}),
    step(type==='filter'?'核对过滤与关断条件':type==='check'?'核对止回与限流条件':'核对运行与关断位置','看清这只阀与相邻设备、管路的关系。','具体操作和测试条件按对应产品资料执行。','target',{before:'位置已认清',after:'核对实际功能与运行条件'}),
    step('运行后记录检查结果','观察接口与操作机构，记录实际检查情况。','需要维护时，再进入维修演示识别隔离位置。','route',{before:'完成安装核对',after:'运行检查并留记录'})
  ];
  return {commission,maintenance};
}

return {makeWorkshopStory};})();
const WORKSHOP_VISUAL=(()=>{
const {valve,apparatus}=GEOMETRY;


const V=a=>new T.Vector3(...a),Y=new T.Vector3(0,1,0);
function createWorkshopVisual(api){
 const root=new T.Group();root.name='Local circuit workbench';api.scene.add(root);
 const overlay=document.createElement('div');overlay.id='workshop-labels';document.getElementById('viewport').append(overlay);const leaders=document.createElementNS('http://www.w3.org/2000/svg','svg');leaders.classList.add('workbench-leaders');leaders.setAttribute('aria-hidden','true');overlay.append(leaders);
 let input=null,motion=null,labels=[],objects=[],pipes=[],particles=[],meter=null,hoses=[],pickables=[],fullBox=null,flowClock=0,lastTime=0,cue=null;
 const poses=new Map(),ownedTextures=[];
 function clear(){for(const t of ownedTextures)t.dispose();ownedTextures.length=0;root.traverse(o=>{o.geometry?.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());});root.clear();overlay.replaceChildren();leaders.replaceChildren();overlay.append(leaders);labels=[];objects=[];pipes=[];particles=[];hoses=[];pickables=[];meter=null;motion=null;input=null;cue=null;poses.clear();overlay.hidden=true;}
 function material(color,extra={}){return new T.MeshStandardMaterial({color,metalness:.32,roughness:.35,...extra});}
 function cyl(a,b,r,color,extra={}){const d=V(b).sub(V(a));const m=new T.Mesh(new T.CylinderGeometry(r,r,d.length(),20),material(color,extra));m.position.copy(V(a).add(V(b)).multiplyScalar(.5));m.quaternion.setFromUnitVectors(Y,d.normalize());m.castShadow=m.receiveShadow=true;root.add(m);return m;}
 function ball(p,r,color){const m=new T.Mesh(new T.SphereGeometry(r,16,12),material(color));m.position.copy(p);root.add(m);return m;}
 function owned(object){object.traverse(o=>{if(o.geometry)o.geometry=o.geometry.clone();if(o.material)o.material=Array.isArray(o.material)?o.material.map(m=>m.clone()):o.material.clone();});return object;}
 function label(text,point,kind='muted',code=null,anchor=null){const el=document.createElement(code?'button':'div');el.className='workshop-label '+kind;el.textContent=text;if(code){el.type='button';el.setAttribute('aria-label',code);el.onclick=()=>api.choose?.(code);}overlay.append(el);let leader=null;if(anchor){leader=document.createElementNS('http://www.w3.org/2000/svg','line');leader.setAttribute('stroke',kind==='p1'?'#efaa86':kind==='p2'?'#86cfe5':'#d8b17d');leader.setAttribute('stroke-width','1.3');leader.setAttribute('stroke-dasharray','3 3');leaders.append(leader);}labels.push({el,point:point.clone(),kind,anchor:anchor?.clone(),leader});return el;}
 function outline(object,color){const b=new T.Box3().setFromObject(object).expandByScalar(.12),h=new T.Box3Helper(b,color);h.material.depthTest=false;h.material.transparent=true;h.material.opacity=.9;h.renderOrder=8;root.add(h);return b;}
 function makeHose(a,b,color){const mid=a.clone().lerp(b,.5).add(new T.Vector3(0,.65,.7)),curve=new T.QuadraticBezierCurve3(a,mid,b),pts=curve.getPoints(48),line=new T.Line(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color,toneMapped:false,depthTest:false}));line.renderOrder=9;root.add(line);return {line,count:pts.length};}
 function show(next){
  const old=input,oldMotion=motion,oldPose={};for(const [code,p]of poses)oldPose[code]=p.value;
  const same=old&&old.station.id===next.station.id&&old.type===next.type&&old.slot===next.slot&&old.phase===next.phase;
  clear();input=next;poses.clear();overlay.hidden=false;
  const phaseSteps=next.story[next.phase]||next.story.commission,action=phaseSteps[next.step],previous=phaseSteps[Math.max(0,next.step-1)],layout=next.layout,rowCount=next.station.rows.length;
  const columns=next.station.rows.map(r=>r.types.length),max=Math.max(3,...columns),length=Math.max(7.8,(max-1)*2.5+2.8),rowGap=2.45;
  let n=0;const nodes=new Map(),rowInfo=[];
  next.station.rows.forEach((row,ri)=>{
   const yy=(rowCount-1)/2*rowGap-ri*rowGap,count=row.types.length,spread=2.5,start=-length/2,end=length/2,isReturn=/回水/.test(row.label),color=isReturn?0x4e9fbd:0xc8785d;
   const pipe=cyl([start,yy,0],[end,yy,0],.13,color);pipes.push(pipe);rowInfo.push({y:yy,start,end,color,row});
   const pts=row.types.map((_,i)=>(i-(count-1)/2)*spread);
   row.types.forEach((type,i)=>{
    const equipment=type.startsWith('@'),t=equipment?type.slice(1):type,code=equipment?null:'V'+(++n),object=owned(equipment?apparatus(t):valve(t,.83,false));
    if(equipment)object.scale.setScalar(.75);object.position.set(pts[i],yy,0);object.quaternion.setFromUnitVectors(Y,new T.Vector3(1,0,0));root.add(object);object.updateMatrixWorld(true);
    if(code){object.userData.workbenchCode=code;nodes.set(code,{object,type:t,x:pts[i],y:yy,row:ri,code});pickables.push(object);}objects.push(object);
   });
   const arrow=new T.Group();arrow.position.set(end-.2,yy,.02);const shaft=new T.Mesh(new T.ConeGeometry(.22,.48,16),new T.MeshBasicMaterial({color,toneMapped:false}));shaft.rotation.z=-Math.PI/2;arrow.add(shaft);arrow.visible=!next.pending&&!row.installation;root.add(arrow);if(row.installation)cyl([end-.03,yy,0],[end+.12,yy,0],.18,0x879aaa);
   for(let k=0;k<9;k++){const dot=ball(new T.Vector3(start+(end-start)*k/9,yy,.17),.055,isReturn?0xa8e8ff:0xffd0a6);particles.push({dot,start,end,y:yy,offset:k/9});}
  });
  const target=nodes.get(next.slot)||nodes.values().next().value;
  const focus=action.focus==='left'?nodes.get(next.gateCodes.left):action.focus==='right'?nodes.get(next.gateCodes.right):target;
  for(const [code,node]of nodes){const active=action.focus==='route'||node===focus;node.object.traverse(o=>{if(!o.isMesh)return;for(const mat of Array.isArray(o.material)?o.material:[o.material]){mat.transparent=!active;mat.opacity=active?1:.22;mat.depthWrite=active;if(active&&mat.emissive){mat.emissive.setHex(['left','right'].includes(action.focus)?0xa83326:0x98652b);mat.emissiveIntensity=['left','right'].includes(action.focus)?.23:.10;}}});if(active&&action.focus==='route')label(code,new T.Vector3(node.x,node.y+.75,.55),'valve',code);}
  const selected=focus||target;let actorBox=outline(selected.object,action.lock?0xebaa65:action.focus==='left'||action.focus==='right'?0xf08b73:0xe4bc7c);
  if(action.focus!=='route'&&(!action.measure||action.adjust))label(selected.code,new T.Vector3(selected.x,selected.y+.85,.65),['left','right'].includes(action.focus)?'isolate':'actor',selected.code,new T.Vector3(selected.x,selected.y,.65));
  for(const [code,node]of nodes){const handle=node.object.getObjectByName('shutoff-handle');if(!handle)continue;const isClosed=action.closed.includes(code),previousPose=next.replay?(previous.closed.includes(code)?1:0):same?(oldPose[code]||0):0;poses.set(code,{handle,base:handle.rotation.z,from:previousPose,to:isClosed?1:0,value:previousPose});}
  const row=rowInfo[target.row],supply=rowInfo.find(r=>/供水/.test(r.row.label));let p1=new T.Vector3(target.x-.94,target.y,0),p2=new T.Vector3(target.x+.94,target.y,0);
  const crossSupply=next.type==='dp'&&supply&&['entry','headers','main','loop','source-headers'].includes(next.station.id);
  if(crossSupply){p1.set(supply.end-.55,supply.y,0);p2.set(target.x-.94,target.y,0);}
  if(next.type==='dp'&&next.station.id==='coil'){p1.set(row.start+.55,row.y,0);p2.set(target.x-.94,target.y,0);}
  if(action.measure&&!action.adjust){
   const center=p1.clone().lerp(p2,.5).add(new T.Vector3(0,1.4,1.15)),g=new T.Group();g.position.copy(center);root.add(g);
   const gaugeCanvas=document.createElement('canvas');gaugeCanvas.width=gaugeCanvas.height=256;const gx=gaugeCanvas.getContext('2d');gx.fillStyle='#e4ebee';gx.fillRect(0,0,256,256);gx.fillStyle='#30485b';gx.textAlign='center';gx.font='600 54px sans-serif';gx.fillText('Δp',128,115);gx.font='48px sans-serif';gx.fillText('—',128,177);const gaugeTexture=new T.CanvasTexture(gaugeCanvas);gaugeTexture.colorSpace=T.SRGBColorSpace;ownedTextures.push(gaugeTexture);const face=new T.Mesh(new T.CircleGeometry(.40,40),new T.MeshBasicMaterial({map:gaugeTexture,side:T.DoubleSide,toneMapped:false}));g.add(face);g.add(new T.Mesh(new T.TorusGeometry(.41,.035,8,40),material(0x849eac)));
   meter={group:g,label:label(action.measure===1?'接好 P2 再测':'Δp = P1 − P2',center.clone().add(new T.Vector3(0,.7,0)),'meter')};
   ball(p1,.16,0xe89b78);label('P1',p1.clone().add(new T.Vector3(0,.55,.35)),'p1',null,p1);hoses.push({...makeHose(p1,center,0xed9977),which:1});
   if(action.measure>=2){ball(p2,.16,0x77c7df);label('P2',p2.clone().add(new T.Vector3(0,.55,.35)),'p2',null,p2);hoses.push({...makeHose(p2,center,0x72c7df),which:2});}
  }
  if(action.adjust){const center=new T.Vector3(target.x+(next.type==='balance'?.48:0),target.y,.95);cue=new T.Mesh(new T.TorusGeometry(.53,.018,8,48),new T.MeshBasicMaterial({color:0xf0bd72,transparent:true,depthTest:false}));cue.position.copy(center);cue.renderOrder=10;root.add(cue);label(next.type==='motor'?'控制信号':'调节部位示意',center.clone().add(new T.Vector3(0,.9,0)),'meter');}
  if(action.lock){label('残压未知 · 不可直接拆开',new T.Vector3(target.x,target.y+1.45,.65),'lock');}
  if(action.focus==='route')for(const r of rowInfo){label(r.row.start,new T.Vector3(r.start,r.y+.5,.25),'endpoint');label(r.row.end,new T.Vector3(r.end,r.y+.5,.25),'endpoint');}
  root.updateMatrixWorld(true);fullBox=new T.Box3().setFromObject(root).expandByScalar(.4);
  let bounds;if(action.focus==='route')bounds=fullBox.clone();else if(action.focus==='measure'||action.focus==='p1')bounds=new T.Box3().setFromPoints([p1,p2,p1.clone().lerp(p2,.5).add(new T.Vector3(0,2,1.2))]).expandByScalar(.4);else bounds=actorBox.clone().expandByScalar(.45);
  const oldFlow=next.replay?previous.flow:same?(oldMotion?.flow??1):1;
  motion={start:performance.now(),duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:1500,action,flow:oldFlow,fromFlow:oldFlow,toFlow:next.pending?0:action.flow};lastTime=0;
  return bounds;
 }
 function tick(camera,host,now=performance.now()){
  if(!motion)return {progress:1};const t=motion.duration?Math.min(1,(now-motion.start)/motion.duration):1,e=t*t*(3-2*t),dt=lastTime?Math.min(.1,(now-lastTime)/1000):0;lastTime=now;
  for(const p of poses.values()){p.value=p.from+(p.to-p.from)*e;p.handle.rotation.z=p.base+p.value*Math.PI/2;}
  motion.flow=motion.fromFlow+(motion.toFlow-motion.fromFlow)*e;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!reduced)flowClock+=dt*motion.flow;
  for(const p of particles){p.dot.position.x=p.start+((p.offset+flowClock*.13)%1)*(p.end-p.start);p.dot.material.transparent=true;p.dot.material.opacity=motion.flow>.05?.95:.18;}
  for(const h of hoses){const grow=h.which===1&&motion.action.measure===1||h.which===2&&motion.action.measure===2;h.line.geometry.setDrawRange(0,h.count*(grow?e:1));}
  if(meter)meter.group.lookAt(camera.position);if(cue){cue.lookAt(camera.position);cue.material.opacity=reduced?.9:.55+.4*Math.sin(now*.005);const scale=reduced?1:1+.06*Math.sin(now*.005);cue.scale.setScalar(scale);}
  const w=host.clientWidth,h=host.clientHeight,used=[];
  for(const l of labels){const p=l.point.clone().project(camera),x=(p.x*.5+.5)*w,y=(-p.y*.5+.5)*h;const width=l.kind==='endpoint'?160:l.kind==='meter'?190:l.kind==='lock'?240:44;
   l.el.hidden=p.z< -1||p.z>1||x<0||x>w||y<0||y>h;if(l.leader)l.leader.style.display=l.el.hidden?'none':'';if(l.el.hidden)continue;let xx=Math.max(width/2+8,Math.min(w-width/2-8,x)),yy=Math.max(30,Math.min(h-22,y));
   for(let k=0;k<5&&used.some(q=>Math.abs(q.x-xx)<(width+q.width)/2&&Math.abs(q.y-yy)<34);k++)yy=Math.max(24,yy-37);
   used.push({x:xx,y:yy,width});l.el.style.left=xx+'px';l.el.style.top=yy+'px';if(l.leader){const a=l.anchor.clone().project(camera);l.leader.setAttribute('x1',(a.x*.5+.5)*w);l.leader.setAttribute('y1',(-a.y*.5+.5)*h);l.leader.setAttribute('x2',xx);l.leader.setAttribute('y2',yy);}
  }
  return {progress:t};
 }
 function pick(ray){const hits=ray.intersectObjects(pickables,true);if(!hits.length)return null;let o=hits[0].object;while(o&&!o.userData.workbenchCode)o=o.parent;return o?.userData.workbenchCode;}
 return {show,clear,tick,pick,isActive:()=>!!motion,fullBounds:()=>fullBox?.clone()};
}

return {createWorkshopVisual};})();
const CARE_UI=(()=>{
const {VALVE_TYPES,VALVE_ROUTES,ROUTE_EQUIPMENT,CARE_GUIDES,CARE_SOURCES}=CARE_DATA;

const $=id=>document.getElementById(id);
function createCareUI(api){
 let id='hvac',stationId='headers',type='dp',slot=null,phase='commission',step=0,page='scene',overviewView=null,demo=null;
 const navigation=document.createElement('nav');navigation.id='work-pages';navigation.setAttribute('aria-label','展示界面');navigation.innerHTML='<button id="page-scene" aria-pressed="true">建筑总览</button><button id="page-care" aria-pressed="false">调试与维修</button><a class="product-showcase-link" href="index.html?product=dp">产品 3D ↗</a>';document.querySelector('header .local-badge').before(navigation);
 const controls=document.createElement('div');controls.id='workshop-controls';controls.hidden=true;controls.innerHTML='<label><span>使用环节</span><select id="care-station"></select></label><label><span>目标阀门</span><select id="care-valve"></select></label>';document.querySelector('.stage').append(controls);
 const panel=document.createElement('section');panel.id='workshop-panel';panel.hidden=true;panel.setAttribute('aria-label','三维调试维修步骤');
 panel.innerHTML=`<div class="workbench-head"><div class="care-tabs" role="tablist" aria-label="三维演示内容"><button data-care-phase="commission" role="tab" aria-selected="true">调试</button><button data-care-phase="maintenance" role="tab" aria-selected="false">维修</button></div><div class="workbench-progress"><span id="workshop-step-count"></span><i id="workshop-progress" role="progressbar" aria-label="本步演示进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><b id="workshop-motion-fill"></b></i><button id="workshop-replay" aria-label="重播本步" title="重播本步">↻</button></div></div><div id="workshop-scroll"><h2 id="workshop-step-title" aria-live="polite" aria-atomic="true"></h2><p id="workshop-step-copy"></p><p id="workshop-step-why"></p><div class="workbench-result"><div><small>操作前</small><p id="workbench-before"></p></div><div><small>本步之后</small><p id="workbench-after"></p></div></div><details id="workshop-selection"><summary>阀门、安装顺序与实拍</summary><h3 id="care-valve-name"></h3><p id="care-model"></p><div id="care-route"></div><p id="care-context"></p><ol id="care-selection-list"></ol><button id="care-photo">查看实物照片 ↗</button></details><details class="workshop-basis"><summary>演示说明与依据</summary><p>工作台按图纸安装顺序展开，位置与尺寸仅作示意。测点须结合真实产品与详图确认。阀位、动作和光点不是现场状态或流速。没有真实测量数据，不显示流量或差压数值。关断不等于泄压；具体启闭先后、无压确认和复运按厂家及项目程序实施。</p><p>参考手册来自其他厂家，仅用于说明方法边界；不代替本阀门的型号资料。</p><div id="care-sources"></div></details></div><div class="workshop-pager"><button id="workshop-prev">上一步</button><button id="workshop-next">下一步</button></div>`;
 document.querySelector('.stage').append(panel);$('workshop-scroll').after(panel.querySelector('.workbench-result'));
 const caption=document.createElement('p');caption.id='workbench-caption';caption.textContent='位置与动作示意 · 实际启闭按型号核定';caption.hidden=true;document.querySelector('.stage').append(caption);
 for(const source of CARE_SOURCES){const a=document.createElement('a');a.href=source.url;a.target='_blank';a.rel='noopener';a.textContent=source.title;$('care-sources').append(a);}
 function current(){return VALVE_ROUTES[id].stations.find(s=>s.id===stationId)||VALVE_ROUTES[id].stations[0];}
 function choices(s){let index=0;return s.rows.flatMap((r,ri)=>r.types.filter(t=>!t.startsWith('@')).map((t,ci)=>({id:'V'+(++index),type:t,row:ri,col:ci})));}
 function options(el,entries,value){el.replaceChildren();for(const [v,label]of entries){const o=document.createElement('option');o.value=v;o.textContent=label;el.append(o);}el.value=value;}
 function render(reframe=true,replay=false){
  const s=current(),entries=choices(s);let chosen=entries.find(x=>x.id===slot&&x.type===type)||entries.find(x=>x.type===type)||entries.find(x=>x.type===s.key)||entries[0];type=chosen.type;slot=chosen.id;
  options($('care-station'),VALVE_ROUTES[id].stations.map(x=>[x.id,x.title]),s.id);options($('care-valve'),entries.map(x=>[x.id,x.id+' · '+VALVE_TYPES[x.type].name]),slot);
  const pending=type==='top'?'附件类型待确认':s.id==='spare-headers'?'封闭预留接口':'';
  demo=api.prepare(s,type,phase,pending,null,slot);const steps=demo.story[phase]||demo.story.commission;if(!demo.story.maintenance&&phase==='maintenance')phase='commission';demo.phase=phase;step=Math.min(step,steps.length-1);const action=steps[step];
  panel.dataset.phase=phase;panel.dataset.step=String(step);panel.dataset.target=slot;
  $('workshop-scroll').scrollTop=0;$('workshop-step-count').textContent=(step+1)+' / '+steps.length;$('workshop-step-title').textContent=action.title;$('workshop-step-copy').textContent=action.copy;$('workshop-step-why').textContent=action.why;$('workbench-before').textContent=action.before;$('workbench-after').textContent=action.after;
  $('workshop-prev').disabled=step===0;$('workshop-next').textContent=step===steps.length-1?'重新演示':'下一步';
  for(const tab of panel.querySelectorAll('[data-care-phase]')){tab.setAttribute('aria-selected',String(tab.dataset.carePhase===phase));tab.disabled=tab.dataset.carePhase==='maintenance'&&!demo.story.maintenance;}
  $('care-valve-name').textContent=slot+' · '+VALVE_TYPES[type].name;$('care-model').textContent=VALVE_TYPES[type].model;$('care-context').textContent=s.why;
  $('care-route').replaceChildren();let code=0;for(const row of s.rows){const p=document.createElement('p');p.textContent=[row.start,...row.types.map(t=>t.startsWith('@')?ROUTE_EQUIPMENT[t.slice(1)]:('V'+(++code)+' '+VALVE_TYPES[t].name)),row.end].join(' → ');$('care-route').append(p);}
  $('care-selection-list').replaceChildren();for(const [title,body]of CARE_GUIDES[type].selection){const li=document.createElement('li');li.textContent=title+'：'+body;$('care-selection-list').append(li);}
  const photo=VALVE_TYPES[type].photo;$('care-photo').hidden=!photo;$('care-photo').onclick=()=>photo&&api.openPhoto(photo);
  if(page==='workshop')api.play(demo,step,reframe,replay);
 }
 function motion(frame){if(!frame)return;const p=Math.max(0,Math.min(1,frame.progress??1));panel.dataset.animationState=p<1?'playing':'complete';$('workshop-progress').setAttribute('aria-valuenow',String(Math.round(p*100)));$('workshop-motion-fill').style.width=Math.round(p*100)+'%';}
 function show(next){if(next===page)return;if(page==='scene')overviewView=api.captureView();if(page==='workshop')api.clearInspection();page=next;document.body.dataset.page=next;controls.hidden=panel.hidden=caption.hidden=next!=='workshop';$('page-scene').setAttribute('aria-pressed',String(next==='scene'));$('page-care').setAttribute('aria-pressed',String(next==='workshop'));if(next==='scene')api.restoreView(overviewView);else render();}
 function selectCode(code){const entry=choices(current()).find(x=>x.id===code);if(!entry)return;slot=code;type=entry.type;step=0;render();}
 $('page-scene').onclick=()=>show('scene');$('page-care').onclick=()=>show('workshop');$('care-station').onchange=e=>{stationId=e.target.value;type=current().key;slot=null;step=0;render();};$('care-valve').onchange=e=>selectCode(e.target.value);
 for(const b of panel.querySelectorAll('[data-care-phase]'))b.onclick=()=>{phase=b.dataset.carePhase;step=0;render();};$('workshop-prev').onclick=()=>{step=Math.max(0,step-1);render(true,true);};$('workshop-next').onclick=()=>{const steps=demo.story[phase]||demo.story.commission;step=(step+1)%steps.length;render();};$('workshop-replay').onclick=()=>render(true,true);
 document.body.dataset.page='scene';
 return {onScenarioLoaded:next=>{id=next;stationId=VALVE_ROUTES[id].default;slot=null;type=current().key;step=0;overviewView=api.captureView();if(page==='workshop')render();},motion,open:(station,t)=>{stationId=station;type=t;slot=null;step=0;if(page==='workshop')render();else show('workshop');},choose:selectCode,isVisible:()=>page==='workshop',isWorkshop:()=>page==='workshop'};
}

return {createCareUI};})();
const PROFESSIONAL=(()=>{
const {SCENARIOS} = SCENARIO_DATA;
const {PRODUCTS,PARTS,SCHEMES} = DATA;
const {buildContext} = CONTEXT;
const {VALVE_TYPES} = CARE_DATA;
const {createCareUI} = CARE_UI;
const {createWorkshopVisual} = WORKSHOP_VISUAL;
const {makeWorkshopStory} = WORKSHOP_STORY;








const $=id=>document.getElementById(id);

// Each pointer is bound to one actual valve, while the building stays intact.
function createProfessionalUI(api){
 let lastCamera;
 let id='hvac',context=null,selected=null,markers=[],area='all',active=true;
 const legacy=document.querySelector('main>aside');legacy.id='legacy-aside';legacy.hidden=true;
 const card=document.createElement('aside');card.id='building-card';card.hidden=true;card.setAttribute('aria-label','当前阀门说明');
 card.innerHTML='<button id="building-close" aria-label="关闭阀门说明">×</button><p id="building-location"></p><h2 id="building-name"></h2><p id="building-reason"></p><button id="building-photo" aria-label="放大实物照片"><span></span><small>实物照片 · 点此放大 ↗</small></button><p id="building-photo-note"></p><button id="building-care-link">三维调试·维修 ↗</button>';
 document.querySelector('.stage').append(card);
 const overlay=document.createElement('div');overlay.id='building-markers';$('viewport').append(overlay);
 const hover=document.createElement('div');hover.id='building-hover';hover.hidden=true;$('viewport').append(hover);
 const toolbar=document.createElement('div');toolbar.id='building-toolbar';toolbar.innerHTML='<label for="building-area">查看位置</label><select id="building-area" aria-label="查看建筑位置"></select><button id="building-home">整栋全景</button><select id="building-valve" aria-label="按名称查找阀门"></select>';document.querySelector('.stage').append(toolbar);
 const drawing=document.createElement('button');drawing.id='building-drawing';drawing.textContent='原图';drawing.onclick=api.openDrawing;document.querySelector('header').append(drawing);
 const box=new T.Box3Helper(new T.Box3(),0xe9b36f);box.visible=false;box.renderOrder=8;api.scene.add(box);box.material.depthTest=false;box.material.transparent=true;box.material.opacity=.9;
 const zoneNames={cold:'冷源机房',hot:'热源机房',headers:'集分水器',terminals:'楼层空调水路',entry:'楼栋入口',homes:'住户水路',home:'住户水路',valves:'单元入口',riser:'立管',branch:'新风机组入口',main:'公共水路'};
 function typeOf(o){return o.userData.presentationType||o.userData.partType;}
 function reason(o){const t=typeOf(o),z=o.parent.userData.presentationZone;
  if(id==='heating'&&z==='headers'&&((o.position.x< -6.4)||(o.position.x> -1&&o.position.x< -.4)))return '这一对是预留接口，当前没有接入运行支路；阀件为以后接管、调试和隔离预留条件。';
  if(t==='top')return '先保留原图顶部阀件的位置，具体类型和用途还需要工程详图确认。';
  if(t==='dp')return z==='branch'?'电动阀开小、其他支路变化时，这只阀帮助稳定受控段压差，让盘管调节少受干扰。':z==='valves'||z==='entry'?'别的单元开关暖气会影响主管压力；这只阀稳定本单元的供回水压差，减少相互干扰。':z==='cold'?'几台制冷机并联运行时，用它稳定对应支路压差，减小其他机组启停带来的干扰。':'其他支路开关时，用它稳定这条水路的压差，减少各支路之间的相互干扰。';
  if(t==='flow')return '几台锅炉并联，水可能分得不均；按设计需要设定支路流量，在阀门工作范围内调节过水量。';
  if(t==='balance')return '靠近水泵的支路容易多分水；调试时用它预调支路流量并锁定，帮助各支路按需分水。';
  if(t==='filter')return id==='hvac'?'循环水可能带着铁锈等杂物；在原图指定的回水位置拦截杂物，并兼顾这一段的关断。':'水里可能有铁锈和施工杂物；入口先用它拦住杂物，需要隔离进水时也能关断。';
  if(t==='ball')return z==='valves'||z==='entry'?'压差阀前后各留一只球阀，检修时才能隔开这一小段水路的两头。':'这段管路需要检修时，用它关断水路，给局部隔离留出条件。';
  if(t==='butterfly')return '机组或水泵需要检修时，用这里的关断阀隔离支路，减少对其他回路的影响。';
  if(t==='motor')return '房间或空气侧的需求会变化；电动阀接收控制信号，调节进入盘管的水量。';
  if(t==='check')return '一台水泵停下而其他泵仍运行时，水可能倒着流；这里设置限流止回阀，抑制倒流。';
  if(t==='selfdp')return '供回水之间压差变化时，旁通阀按设定条件调节旁通，为机组和热源保留循环保护条件。';
  return PARTS[t]?.copy||'按原图保留此处阀件，具体选型需核对工程资料。';
 }
 function describe(o){const t=typeOf(o),z=o.parent.userData.presentationZone,product=PARTS[t]?.product;
  const branch=o.userData.branchIndex>=0?SCENARIOS[id].names[o.userData.branchIndex]:null;
  $('building-location').textContent=[zoneNames[z]||'建筑水系统',branch].filter(Boolean).join(' · ');$('building-name').textContent=VALVE_TYPES[t].name;$('building-valve').value=t;$('building-reason').textContent=reason(o);
  const photo=$('building-photo');photo.hidden=!product;if(product){photo.querySelector('span').style.backgroundImage=`url("assets/${PRODUCTS[product].photo}")`;photo.onclick=()=>showPhoto(product);}
  $('building-photo-note').textContent=product?(PRODUCTS[product].photoModel===PRODUCTS[product].drawingModel?`实拍型号 ${PRODUCTS[product].photoModel}`:`实拍 ${PRODUCTS[product].photoModel} · 图纸 ${PRODUCTS[product].drawingModel}，仅作外形参考。`):'这类阀还没有提供实物照片，三维外形为示意。';
  card.hidden=false;card.scrollTop=0;document.body.dataset.buildingSelection=t;
 }
 function showPhoto(product){api.openPhoto(product);}
 function clearSelection(){selected=null;box.visible=false;card.hidden=true;delete document.body.dataset.buildingSelection;$('building-valve').value='';hover.hidden=true;markers.forEach(m=>m.el.setAttribute('aria-pressed','false'));}
 function select(o){selected=o;box.box.setFromObject(o);box.visible=true;describe(o);markers.forEach(m=>m.el.setAttribute('aria-pressed',String(m.object===o)));}
 function stationFor(o){const z=o.parent.userData.presentationZone,t=typeOf(o);
  if(t==='top')return 'riser';if(z==='headers'){if(t==='selfdp')return 'bypass';if(id==='heating'){const pair=o.position.x< -3?Math.round((o.position.x+6)/.68)+2:Math.round(o.position.x/.68)+2;return pair===1?'spare-headers':pair===3?'source-headers':'headers';}return 'headers';}
  if(z==='cold')return o.userData.role==='pump'?'cold-pump':'chiller';if(z==='hot')return o.userData.role==='pump'?'pump':t==='ball'&&!o.userData.role?'hot-isolation':'boiler';
  if(z==='terminals')return o.userData.branchIndex>=0?'coil':'loop';if(z==='home'||z==='homes')return 'users';if(z==='main')return 'main';if(z==='branch')return 'coil';return 'entry';
 }
 function members(){if(area==='all')return context.valves;const aliases={terminals:['terminals'],homes:['homes'],home:['home'],valves:['valves'],riser:['riser'],headers:['headers'],cold:['cold'],hot:['hot'],entry:['entry'],branch:['branch'],main:['main'],unit:['unit','branch']};return context.valves.filter(o=>(aliases[area]||[area]).includes(o.parent.userData.presentationZone));}
 function representative(type,pool=members()){return pool.find(o=>typeOf(o)===type&&!(id==='heating'&&type==='balance'&&stationFor(o)==='spare-headers')&&(type!=='dp'||area!=='all'||o.parent.userData.presentationZone===({hvac:'headers',heating:'entry',ahu:'branch',entry:'valves'}[id])))||pool.find(o=>typeOf(o)===type);}
 function candidates(){const pool=members();if(area!=='all')return pool;return ['dp','balance','flow','filter','ball','motor','check','selfdp','butterfly','top'].map(t=>representative(t,pool)).filter(Boolean);}
 function updateNames(){const sel=$('building-valve');sel.replaceChildren();const pool=members(),types=Object.keys(VALVE_TYPES).filter(t=>pool.some(o=>typeOf(o)===t));const empty=document.createElement('option');empty.value='';empty.textContent='找阀门 · '+types.length+' 类';sel.append(empty);for(const t of types){const o=document.createElement('option');o.value=t;o.textContent=VALVE_TYPES[t].name;sel.append(o);}if(selected)sel.value=typeOf(selected);}
 function resolve(s,t,preferred){if(preferred&&context.valves.includes(preferred)&&typeOf(preferred)===t)return preferred;const key=s.id==='signal'?'coil':s.id;return context.valves.find(o=>typeOf(o)===t&&stationFor(o)===key)||context.valves.find(o=>typeOf(o)===t&&o.parent.userData.presentationZone===s.zone);}
 const inspector=createWorkshopVisual({...api,choose:code=>care.choose(code)});
 let cameraMotion=null;
 function clipSegment(a,b,box){let low=0,high=1;const d=b.clone().sub(a);for(const k of ['x','y','z']){if(Math.abs(d[k])<1e-9){if(a[k]<box.min[k]||a[k]>box.max[k])return null;}else{let x=(box.min[k]-a[k])/d[k],y=(box.max[k]-a[k])/d[k];if(x>y)[x,y]=[y,x];low=Math.max(low,x);high=Math.min(high,y);if(low>high)return null;}}return{a:a.clone().addScaledVector(d,low),b:a.clone().addScaledVector(d,high)};}
function prepare(s,t,phase,pending,preferred,slot){
 const shortName={dp:'压差控制阀',flow:'流量控制阀',balance:'手动平衡阀',selfdp:'旁通压差阀',ball:'球阀',filter:'过滤球阀',butterfly:'关断阀',motor:'电动调节阀',check:'限流止回阀',top:'顶部附件'};
 let code=0;const layout=[];
 s.rows.forEach((row,ri)=>row.types.forEach((kind,ci)=>{if(!kind.startsWith('@'))layout.push({code:'V'+(++code),type:kind,row:ri,col:ci});}));
 const target=layout.find(x=>x.code===slot&&x.type===t)||layout.find(x=>x.type===t)||layout[0];
 const shutoff=x=>x.code!==target.code&&['ball','butterfly','filter'].includes(x.type)&&x.row===target.row;
 const before=layout.filter(shutoff).filter(x=>x.col<target.col),left=before[before.length-1],right=layout.filter(shutoff).find(x=>x.col>target.col);
 const gateCodes={left:left?.code,right:right?.code};
 const story=makeWorkshopStory({type:t,targetCode:target.code,gateCodes,pending});
 for(const list of Object.values(story))if(list?.length){list[0].why=VALVE_TYPES[t].purpose;list[0].title=target.code+' · '+shortName[t];}
 for(const item of story.maintenance||[])if(['left','right'].includes(item.focus)){const gate=layout.find(x=>x.code===gateCodes[item.focus]);if(gate)item.title='关断 '+gate.code+' · '+shortName[gate.type];}
 if(story.maintenance&&(!left||!right)){Object.assign(story.maintenance[3],{title:'隔离尚未确认',copy:'当前图示还不能确认完整检修边界。',why:'不要据此认为已断水或无压。',flow:(left||right)?0:1,before:'隔离条件尚未确认',after:'不演示直接拆修'});story.maintenance[4].flow=(left||right)?0:1;}
 return {station:s,type:t,phase,slot:target.code,layout,gateCodes,story,pending};
}

 function focusAnimated(bounds){const from=api.captureView();api.frame(bounds,'iso',1.12);const to=api.captureView();api.restoreView(from);cameraMotion={from,to,start:performance.now(),duration:typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches?0:1000};}
 function playDemo(demo,index,focus,replay=false){box.visible=false;context.root.visible=false;const wasActive=inspector.isActive();const bounds=inspector.show({...demo,step:index,replay});if(focus&&bounds){if(wasActive)focusAnimated(bounds);else api.frame(bounds,'iso',1.03);}}
 function advanceCamera(){if(!cameraMotion)return;const m=cameraMotion,t=m.duration?Math.min(1,(performance.now()-m.start)/m.duration):1,e=t*t*(3-2*t);api.restoreView({...m.to,position:m.from.position.clone().lerp(m.to.position,e),target:m.from.target.clone().lerp(m.to.target,e),up:m.from.up.clone().lerp(m.to.up,e).normalize(),near:Math.min(m.from.near,m.to.near),far:Math.max(m.from.far,m.to.far)});if(t===1){api.restoreView(m.to);cameraMotion=null;}}
 const care=createCareUI({openPhoto:api.openPhoto,captureView:api.captureView,restoreView:api.restoreView,prepare,play:playDemo,clearInspection:()=>{cameraMotion=null;inspector.clear();if(context)context.root.visible=true;box.visible=!!selected;}});

 function makeMarkers(){updateNames();overlay.replaceChildren();markers=[];for(const o of candidates()){
  const t=typeOf(o),el=document.createElement('button');el.type='button';el.className='building-dot';el.setAttribute('aria-label',(zoneNames[o.parent.userData.presentationZone]||'水路')+' · '+VALVE_TYPES[t].name);el.setAttribute('aria-pressed',String(selected===o));el.title=VALVE_TYPES[t].name;
  const name=document.createElement('span');name.textContent=VALVE_TYPES[t].name;el.append(name);el.onclick=()=>select(o);overlay.append(el);markers.push({object:o,el});
 }}
 function disposeContext(){cameraMotion=null;inspector.clear();if(!context)return;api.scene.remove(context.root);const geometries=new Set(),materials=new Set();context.root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}
 function onSchemeLoaded(next,source){active=true;id=next;clearSelection();disposeContext();context=buildContext(id);source.root.visible=false;api.scene.add(context.root);api.floor.visible=false;api.grid.visible=false;
  for(const [key,g] of Object.entries(context.zones))g.userData.presentationZone=key;
  for(const o of context.valves){const z=o.parent.userData.presentationZone;if((id==='entry'&&z==='riser')||(id==='heating'&&o.userData.role==='riser'))o.userData.presentationType='top';}
  for(const r of context.rooms){r.material.opacity=.12;r.material.color.setHex(0x4a9fbd);}context.setShell($('shell-toggle').getAttribute('aria-pressed')==='true');
  for(const b of document.querySelectorAll('[data-scheme]'))b.querySelector('strong').textContent=SCENARIOS[b.dataset.scheme].title;
  $('stage-title').textContent=SCENARIOS[id].title;$('stage-subtitle').textContent={hvac:'从楼层到机房，看清同一套水系统。',heating:'从热源到各单元，看清供暖水路。',ahu:'从公共水路到新风机组，看清水侧调节。',entry:'从单元入口到住户，看清供回水连接。'}[id];
  $('guide').hidden=true;$('labels').hidden=true;legacy.hidden=true;area='all';const sel=$('building-area');sel.replaceChildren();for(const [key,label] of SCHEMES[id].zones){const option=document.createElement('option');option.value=key;option.textContent=key==='all'?'整栋全景':label;sel.append(option);}sel.value='all';makeMarkers();api.frame(context.region('all'),'iso',1.03);document.body.dataset.buildingView='all';care.onScenarioLoaded(id);
 }
 function onZoneChanged(key){if(!active||!context||context.scenario!==api.scheme())return;clearSelection();area=key;context.root.visible=true;$('labels').hidden=true;$('building-area').value=key;makeMarkers();api.frame(context.region(key),'iso',1.08);document.body.dataset.buildingView=key;}
 function handlePick(ray){if(!active||!context)return false;if(care.isWorkshop()){const code=inspector.pick(ray);if(code)care.choose(code);return true;}const hits=ray.intersectObjects(context.valves,true);if(hits.length){let o=hits[0].object;while(o&&!context.valves.includes(o))o=o.parent;if(o){if(care.isWorkshop())care.open(stationFor(o),typeOf(o),false,o);else select(o);}}else if(!care.isWorkshop())clearSelection();return true;}

 function tick(camera,host){if(!active||!context)return;$('labels').hidden=true;lastCamera=camera;if(care.isWorkshop()){advanceCamera();care.motion(inspector.tick(camera,host));return;}const w=host.clientWidth,h=host.clientHeight,used=[];for(const m of markers){const p=m.object.getWorldPosition(new T.Vector3()).project(camera),x=(p.x*.5+.5)*w,y=(-p.y*.5+.5)*h,overlap=used.some(q=>Math.hypot(x-q.x,y-q.y)<25);m.el.hidden=p.z< -1||p.z>1||x<18||x>w-18||y<(w<801?132:118)||y>h-70||overlap;if(!m.el.hidden){used.push({x,y});m.el.style.left=x+'px';m.el.style.top=y+'px';}}}
 $('building-care-link').onclick=()=>{if(selected)care.open(stationFor(selected),typeOf(selected));};
 $('building-valve').onchange=e=>{const o=representative(e.target.value);if(!o)return;const z=o.parent.userData.presentationZone,target=SCHEMES[id].zones.some(([k])=>k===z)?z:area;api.focusZone(target);select(o);};
 let hoverTime=0;const hoverRay=new T.Raycaster();$('scene').addEventListener('pointermove',e=>{if(!lastCamera||!context||e.buttons||e.pointerType==='touch'||care.isVisible()){hover.hidden=true;return;}if(performance.now()-hoverTime<80)return;hoverTime=performance.now();const rect=$('scene').getBoundingClientRect();hoverRay.setFromCamera(new T.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),lastCamera);const hit=hoverRay.intersectObjects(context?.valves||[],true)[0];if(!hit){hover.hidden=true;return;}let o=hit.object;while(o&&!context.valves.includes(o))o=o.parent;if(!o)return;hover.textContent=VALVE_TYPES[typeOf(o)].name;hover.hidden=false;hover.style.left=Math.max(110,Math.min(rect.width-110,e.clientX-rect.left))+'px';hover.style.top=Math.max(24,e.clientY-rect.top-24)+'px';});$('scene').addEventListener('pointerleave',()=>hover.hidden=true);
 $('building-close').onclick=clearSelection;$('building-home').onclick=()=>api.focusZone('all');$('building-area').onchange=e=>api.focusZone(e.target.value);
 return{onSchemeLoaded,onProductLoaded:()=>{active=false;clearSelection();overlay.hidden=true;},onZoneChanged,handlePick,tick,onShellChanged:v=>context?.setShell(v),isContext:()=>active,isWorkshop:()=>care.isWorkshop(),onInteraction:()=>{cameraMotion=null;},resetWorkbench:()=>{cameraMotion=null;const b=inspector.fullBounds();if(b)api.frame(b,'iso',1.03);},shouldRender:()=>true};
}

return {createProfessionalUI};})();
(()=>{
const {PRODUCTS,PARTS,SCHEMES} = DATA;
const {productModel,box} = GEOMETRY;
const {buildScheme} = MODEL;
const {createProfessionalUI} = PROFESSIONAL;






const $=id=>document.getElementById(id),list=s=>[...document.querySelectorAll(s)],V=a=>new T.Vector3(...a);
let v3UI;
let mode='schemes',schemeId='hvac',productId='dp',model,selectedPart=null,feature=null,zone='all',view='iso',shell=false,showLabels=true,playing=false,step=0,playClock=0,explode=0,imageScale=1;
const canvas=$('scene'),host=$('viewport'),scene=new T.Scene();let renderer,camera,orbit,renderLoop;
try{renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<801?1.25:1.5));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;renderer.shadowMap.enabled=false;renderer.shadowMap.type=T.PCFSoftShadowMap;camera=new T.PerspectiveCamera(40,1,.02,500);orbit=new OrbitControls(camera,canvas);orbit.enableDamping=true;orbit.dampingFactor=.09;orbit.minDistance=.6;orbit.maxDistance=250;orbit.maxPolarAngle=Math.PI*.96;}catch(e){$('scene-error').hidden=false;document.body.dataset.ready='error';throw e;}
// A locally generated light environment provides readable metal and enamel highlights.
const ec=document.createElement('canvas');ec.width=1024;ec.height=512;const ex=ec.getContext('2d'),gradient=ex.createLinearGradient(0,0,0,512);gradient.addColorStop(0,'#e1e7ed');gradient.addColorStop(.50,'#5b6b79');gradient.addColorStop(1,'#202b37');ex.fillStyle=gradient;ex.fillRect(0,0,1024,512);ex.fillStyle='#e5e8e7';ex.fillRect(60,30,150,250);ex.fillStyle='#a9c8e8';ex.fillRect(650,70,55,290);const envTex=new T.CanvasTexture(ec);envTex.mapping=T.EquirectangularReflectionMapping;envTex.colorSpace=T.SRGBColorSpace;const pmrem=new T.PMREMGenerator(renderer);scene.environment=pmrem.fromEquirectangular(envTex).texture;envTex.dispose();pmrem.dispose();
scene.add(new T.HemisphereLight(0xe9f1ff,0x334459,2.2));const keyLight=new T.DirectionalLight(0xffeddc,4.0);keyLight.position.set(-5,10,12);keyLight.castShadow=true;keyLight.shadow.mapSize.set(2048,2048);keyLight.shadow.bias=-.0006;scene.add(keyLight);const rim=new T.DirectionalLight(0x9acaff,3.0);rim.position.set(7,5,-7);scene.add(rim);const front=new T.DirectionalLight(0xe4f3ff,1.4);front.position.set(0,2,12);scene.add(front);
const floor=new T.Mesh(new T.PlaneGeometry(400,400),new T.ShadowMaterial({color:0x030b14,opacity:.24}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;scene.add(floor);const grid=new T.GridHelper(160,160,0x496175,0x344d64);grid.material.transparent=true;grid.material.opacity=.23;scene.add(grid);
const selectBox=new T.Box3Helper(new T.Box3(),0xe0ad70);selectBox.visible=false;scene.add(selectBox);let labelNodes=[],flowPoints,flowTracks=[];const clock=new T.Clock();let time=0,framingBox,previousCompact;
const focusRegions={hvac:{headers:[[-13,-.2,-2],[3.5,6,2.5]],cold:[[-15,-11.5,-2],[2,.2,2.2]],hot:[[6,-7.4,-2],[23,.1,2.5]],terminals:[[-18,8,-1],[24,28,2.3]]},heating:{headers:[[-13,-.2,-2],[3.4,6.2,2.5]],hot:[[6,1.5,-2],[22,7.6,2.5]],homes:[[-13,9.2,-1],[-.4,17.4,2.0]],entry:[[.0,6.6,-.5],[5.2,16,1.6]]},ahu:{branch:[[-1.8,2.6,-.5],[4.7,5.7,1.6]],main:[[-6,-1.2,-1],[2,1.8,1.3]],unit:[[3.4,3.0,-1.3],[7,6.5,1.4]]},entry:{valves:[[-1.3,.6,-.5],[4.5,4.3,1.5]],home:[[-7.8,2.7,-.8],[-3.8,5.7,1.4]],riser:[[4.0,-.2,-.5],[6.7,7.3,1.3]]}};
function bounds(object){object.updateMatrixWorld(true);return new T.Box3().setFromObject(object);}
function setFraming(b,orientation=view,margin=1.22){framingBox=b.clone();view=orientation;const size=b.getSize(new T.Vector3()),center=b.getCenter(new T.Vector3()),aspect=(host.clientWidth||window.innerWidth)/(host.clientHeight||Math.max(430,window.innerHeight-(window.innerWidth<801?153:134)));const mobile=(host.clientWidth||window.innerWidth)<801,usable=v3UI?.isWorkshop()?(mobile?.82:.8):(mobile?.50:.68);const vf=T.MathUtils.degToRad(camera.fov),hf=2*Math.atan(Math.tan(vf/2)*aspect);let h=size.y,w=size.x;if(view==='top'){h=size.z;w=size.x;}else if(view==='side'){h=size.y;w=size.z;}if(view==='iso'){if(v3UI?.isWorkshop()){w=size.x+size.z*.15;h=size.y+size.z*.1;}else{w=Math.sqrt(size.x*size.x+size.z*size.z)*.94;h=size.y*.92+size.z*.35;}}
 let dist=Math.max(h/(2*Math.tan(vf/2)*usable),w/(2*Math.tan(hf/2)*.85),Math.max(size.x,size.y,size.z)*.70)*margin;const dir=view==='front'?V([0,.001,1]):view==='back'?V([0,.001,-1]):view==='top'?V([0,1,.001]):view==='side'?V([-1,.03,0]):mode==='products'?V([.85,.42,1.4]):v3UI?.isWorkshop()?V([.28,.15,1.8]):v3UI?.isContext()?V([.75,.42,1.35]):V([.38,.24,1.5]);orbit.target.copy(center);camera.position.copy(center).add(dir.normalize().multiplyScalar(dist));camera.up.set(0,1,0);camera.near=Math.max(.01,dist/1500);camera.far=Math.max(150,dist*12);camera.updateProjectionMatrix();orbit.update();list('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));}
function fitZone(key){zone=key;if(mode==='schemes')overview();Object.entries(model.zones).forEach(([k,g])=>g.visible=key==='all'||!$('isolate-zone').checked||key===k||(schemeId==='ahu'&&['branch','unit'].includes(key)&&['branch','unit'].includes(k)));selectedPart=null;feature=null;selectBox.visible=false;let b;if(key==='all')b=bounds(model.root);else if(focusRegions[schemeId]?.[key])b=new T.Box3(...focusRegions[schemeId][key].map(V));else b=bounds(model.zones[key]);setFraming(b,'iso',key==='all'?1.12:1.08);list('[data-zone]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.zone===zone)));labelsForScheme();$('selection-status').textContent=key==='all'?'代表性建筑场景 · 展示比例':`放大区域：${SCHEMES[schemeId].zones.find(z=>z[0]===key)?.[1]||key}`;v3UI?.onZoneChanged(key);}
function clearScene(){playing=false;updatePlay();if(model){scene.remove(model.root);model.root.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());}});}if(flowPoints){scene.remove(flowPoints);flowPoints.geometry.dispose();flowPoints.material.dispose();flowPoints=null;}selectBox.visible=false;labelNodes=[];$('labels').replaceChildren();}
function prepMaterials(root){root.traverse(o=>{if(o.isMesh){o.material=Array.isArray(o.material)?o.material.map(m=>m.clone()):o.material.clone();o.userData.originalOpacity=Array.isArray(o.material)?1:o.material.opacity;}});}
function addLabel(text,point,scope='all',component=null){const el=document.createElement('div');el.className='label';el.textContent=text;$('labels').append(el);labelNodes.push({text,point,scope,component,el});}
function labelsForScheme(){$('labels').replaceChildren();labelNodes=[];let items=model.labels.filter(l=>zone==='all'||l.zone===zone);if(zone==='all'&&['hvac','heating'].includes(schemeId)){items=items.filter(l=>l.text.includes('回路')||l.text.includes('集水器')||l.text.includes('分水器')||l.text.includes('支路')||l.text.includes('两层'));}items.forEach(l=>addLabel(l.text,l.position.clone(),l.zone));}
function showPartDetail(type){const d=PARTS[type];$('detail-kicker').textContent='COMPONENT · CONNECTION';$('detail-title').textContent=d.name;$('detail-copy').textContent=d.copy;$('model-reference').textContent=d.model;$('inspect-product').hidden=!d.product;$('photo-card').hidden=!d.product;if(d.product){$('photo-thumb').src=`assets/${PRODUCTS[d.product].photo}`;}}
function selectType(type,focus=false){const opts=model.parts.filter(p=>p.userData.type===type);if(!opts.length)return;list('[data-part]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.part===type)));$('instance-area').hidden=false;$('instances').replaceChildren();opts.forEach(o=>{const op=document.createElement('option');op.value=o.userData.id;op.textContent=o.userData.name;$('instances').append(op);});showPartDetail(type);selectInstance(opts[0].userData.id,focus);}
function selectInstance(id,focus=false){const o=model.parts.find(p=>p.userData.id===id);if(!o)return;selectedPart=o;selectBox.box.copy(bounds(o));selectBox.visible=true;$('instances').value=id;$('selection-status').textContent=o.userData.name;$('model-reference').textContent=`${PARTS[o.userData.type].model} · ${o.userData.name}`;if(focus){zone=o.userData.zone;Object.entries(model.zones).forEach(([k,g])=>g.visible=!$('isolate-zone').checked||k===zone||(schemeId==='ahu'&&['branch','unit'].includes(zone)&&['branch','unit'].includes(k)));list('[data-zone]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.zone===zone)));labelsForScheme();setFraming(bounds(o),'iso',1.6);}}
function overview(){selectedPart=null;feature=null;selectBox.visible=false;list('[data-part]').forEach(b=>b.setAttribute('aria-pressed','false'));$('instance-area').hidden=true;$('photo-card').hidden=true;$('inspect-product').hidden=true;$('detail-kicker').textContent='DRAWING · SYSTEM TOPOLOGY';$('detail-title').textContent='按图分区，看清完整连接';$('detail-copy').textContent=SCHEMES[schemeId].summary;$('model-reference').textContent=`${SCHEMES[schemeId].location} · 本图框的设备及连接关系`;}
function loadScheme(id){clearScene();mode='schemes';schemeId=id;zone='all';feature=null;selectedPart=null;explode=0;model=buildScheme(id);prepMaterials(model.root);scene.add(model.root);const s=SCHEMES[id];list('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));$('scheme-nav').hidden=false;$('product-nav').hidden=true;$('legend').hidden=false;$('zones').hidden=false;$('guide').hidden=false;$('explode-control').hidden=true;$('display-controls').hidden=false;$('stage-kicker').textContent=`DRAWING ${s.number} · ${s.location}`;$('stage-title').textContent=s.title;$('stage-subtitle').textContent=s.summary;$('aside-kicker').textContent='SOLUTION DETAILS';$('item-counter').textContent=`${s.number} / 04`;$('aside-title').textContent=s.title;$('aside-description').textContent=s.summary;$('facts').replaceChildren();s.facts.forEach(t=>{const li=document.createElement('li');li.textContent=t;$('facts').append(li);});$('list-title').textContent='场景部件清单';$('part-list').classList.remove('features');$('part-list').replaceChildren();Object.entries(model.counts).forEach(([type,n])=>{const b=document.createElement('button');b.type='button';b.dataset.part=type;b.setAttribute('aria-pressed','false');b.append(document.createTextNode(PARTS[type].name));const c=document.createElement('span');c.textContent=`×${n}`;b.append(c);b.onclick=()=>selectType(type,true);$('part-list').append(b);});$('zones').replaceChildren();s.zones.forEach(([k,t])=>{const b=document.createElement('button');b.type='button';b.dataset.zone=k;b.textContent=t;b.setAttribute('aria-pressed',String(k==='all'));b.onclick=()=>{playing=false;updatePlay();fitZone(k);};$('zones').append(b);});list('[data-scheme]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scheme===id)));$('accuracy-note').textContent=s.note+' 三种蓝色阀按实拍外形重建；其余设备为通用示意。';$('drawing-open').textContent='查看当前原图 ↗';overview();setupGuide();fitZone('all');setupFlow();applyDisplay();floor.position.y=bounds(model.root).min.y-.35;grid.position.y=floor.position.y+.01;grid.visible=true;setShadowBounds();document.body.dataset.mode=mode;document.body.dataset.scheme=id;document.body.dataset.ready='true';v3UI?.onSchemeLoaded(id,model);}
function loadProduct(id){clearScene();mode='products';productId=id;selectedPart=null;feature=null;explode=0;$('explode').value=0;$('explode-value').textContent='0%';const p=PRODUCTS[id],root=productModel(id,{coil:true,detail:true});model={root,components:root.userData.components,parts:[],labels:[]};prepMaterials(root);scene.add(root);list('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));list('[data-product]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.product===id)));$('scheme-nav').hidden=true;$('product-nav').hidden=false;$('zones').hidden=true;$('guide').hidden=true;$('display-controls').hidden=true;$('legend').hidden=true;$('instance-area').hidden=true;$('explode-control').hidden=false;$('stage-kicker').textContent='PHOTO RECONSTRUCTION · EXTERIOR DETAILS';$('stage-title').textContent=p.name;$('stage-subtitle').textContent=`照片 ${p.photoModel} · 旋转观察控制端、端盖、法兰和通道`;$('aside-kicker').textContent='PRODUCT DETAILS';$('item-counter').textContent=`0${Object.keys(PRODUCTS).indexOf(id)+1} / 03`;$('aside-title').textContent=p.name;$('aside-description').textContent=p.description;$('facts').replaceChildren();[`照片铭牌：${p.photoModel}`,`图纸标注：${p.drawingModel}`,'外形依据实拍 · 尺寸按比例示意'].forEach(t=>{const li=document.createElement('li');li.textContent=t;$('facts').append(li);});$('list-title').textContent='外观细节';$('part-list').classList.add('features');$('part-list').replaceChildren();p.features.forEach(([k,name,desc],i)=>{const b=document.createElement('button');b.type='button';b.dataset.feature=k;b.textContent=`0${i+1}  ${name}`;b.setAttribute('aria-pressed','false');b.onclick=()=>selectFeature(k,true);$('part-list').append(b);});$('photo-thumb').src=`assets/${p.photo}`;$('photo-card').hidden=false;$('inspect-product').hidden=true;$('detail-kicker').textContent='EXTERIOR · PHOTO REFERENCE';$('detail-title').textContent='逐项核对实拍外观';$('detail-copy').textContent=p.description;$('model-reference').textContent=`照片 ${p.photoModel} / 图纸 ${p.drawingModel}`;$('accuracy-note').textContent=p.note+' 外部组件展开不代表完整内部装配。';$('drawing-open').textContent='查看实拍六视图 ↗';productLabels();setFraming(bounds(root),'iso',1.03);floor.position.y=bounds(root).min.y-.14;grid.position.y=floor.position.y+.01;grid.visible=false;applyDisplay();setShadowBounds();$('selection-status').textContent='真实照片校正外形 · 无制造尺寸';document.body.dataset.mode=mode;document.body.dataset.product=id;document.body.dataset.ready='true';v3UI?.onProductLoaded();}
function productLabels(){$('labels').replaceChildren();labelNodes=[];const anchors={body:[-.33,0,.1],flanges:[.1,.83,.05],head:productId==='balance'?[0,.58,1.08]:[.22,.12,productId==='dp'?.82:1.14],cap:[-.25,0,-.71],copper:[.1,1.78,1.04],wheel:[.26,.93,1.40],plate:[-.48,.04,.15]};for(const [k,label] of PRODUCTS[productId].features){if(feature&&k!==feature)continue;if(['plate','cap'].includes(k)&&!feature)continue;const local=V(anchors[k]||[0,0,0]);addLabel(label,local,'product',k);}}
function selectFeature(key,focus=false){feature=key;const item=PRODUCTS[productId].features.find(f=>f[0]===key),g=model.components[key];if(!item||!g)return;list('[data-feature]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.feature===key)));$('detail-title').textContent=item[1];$('detail-copy').textContent=item[2];$('model-reference').textContent=`实拍外形要点 · ${PRODUCTS[productId].photoModel}`;selectBox.box.copy(bounds(g));selectBox.visible=true;productLabels();if(focus)setFraming(bounds(g),key==='cap'?'back':key==='plate'?'side':key==='flanges'?'top':'iso',1.35);applyDisplay();$('selection-status').textContent=item[1];document.body.dataset.feature=key;}
function applyDisplay(){if(!model)return;model.root.traverse(o=>{if(!o.isMesh)return;const mats=Array.isArray(o.material)?o.material:[o.material];let cg=o;while(cg.parent&&cg.parent!==model.root&&!cg.userData.component)cg=cg.parent;const use=shell&&(mode==='schemes'?['fau','ahu','fcu','household','boiler','chiller'].includes(findPart(o)?.userData.type):cg.userData.component==='body'||cg.userData.component==='cap');for(const m of mats){if(m.transparent&&o.userData.originalOpacity<1&&!use)continue;m.transparent=use;m.opacity=use?.20:1;m.depthWrite=!use;} });if(mode==='schemes')model.signals.forEach(o=>o.visible=o.userData.signal==='control'?$('control-lines').checked:$('pressure-lines').checked);$('shell-toggle').setAttribute('aria-pressed',String(shell));$('labels').hidden=!showLabels;}
function findPart(o){while(o&&!o.userData.id)o=o.parent;return o;}
function setShadowBounds(){const b=bounds(model.root),c=b.getCenter(new T.Vector3()),s=b.getSize(new T.Vector3()),r=Math.max(s.x,s.y,s.z,3);keyLight.position.copy(c).add(V([-r*.5,r,r]));keyLight.target.position.copy(c);scene.add(keyLight.target);Object.assign(keyLight.shadow.camera,{left:-r,right:r,top:r,bottom:-r,near:.1,far:r*5});keyLight.shadow.camera.updateProjectionMatrix();}
function setupFlow(){if(!model.lines.length)return;flowTracks=[];for(const line of model.lines){if(!['supply','return'].includes(line.color))continue;const a=V(line.a),b=V(line.b),len=a.distanceTo(b);const count=Math.min(9,Math.max(1,Math.floor(len*.65)));for(let i=0;i<count;i++)flowTracks.push({a,b,len,offset:i/count,color:line.color});}const pos=new Float32Array(flowTracks.length*3),col=new Float32Array(pos.length);flowTracks.forEach((t,i)=>new T.Color(t.color==='supply'?0xffd5a1:0xa8e7ff).toArray(col,i*3));const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(pos,3));geo.setAttribute('color',new T.BufferAttribute(col,3));flowPoints=new T.Points(geo,new T.PointsMaterial({size:.065,vertexColors:true,sizeAttenuation:true,transparent:true,opacity:.9,depthWrite:false}));flowPoints.frustumCulled=false;scene.add(flowPoints);}
function setupGuide(){$('steps').replaceChildren();SCHEMES[schemeId].steps.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.innerHTML=`<b>0${i+1}</b>${s[0]}`;b.onclick=()=>{playing=false;updatePlay();setStep(i,true);};$('steps').append(b);});setStep(0,false);}
function setStep(i,focus=true){step=i;const d=SCHEMES[schemeId].steps[i];$('step-title').textContent=d[0];$('step-copy').textContent=d[1];[...$('steps').children].forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));if(focus)fitZone(d[2]);document.body.dataset.step=String(i);}
function updatePlay(){$('play').textContent=playing?'Ⅱ 暂停讲解':'▶ 播放连接讲解';$('play').setAttribute('aria-pressed',String(playing));}
function setProductExplode(value){explode=value/100;$('explode-value').textContent=`${value}%`;for(const [key,g] of Object.entries(model.components)){if(g.userData.explode)g.position.copy(g.userData.explode).multiplyScalar(explode);if(key==='flanges')g.children.forEach(c=>{if(c.userData.flangeSide)c.position.y=c.userData.flangeSide*explode*.32;});}if(feature){selectBox.box.copy(bounds(model.components[feature]));}model.root.updateMatrixWorld(true);}
function openReference(kind,photoId=null){const product=kind==='photo'||mode==='products';const p=photoId||(mode==='products'?productId:selectedPart&&PARTS[selectedPart.userData.type].product);imageScale=1;$('reference-image').style.width='100%';$('dialog-title').textContent=product?`${PRODUCTS[p||productId].name} · 六视图`:`${SCHEMES[schemeId].title} · 二维原图`;$('dialog-kicker').textContent=product?'USER PHOTO · EXTERIOR REFERENCE':'DRAWING · ORIGINAL DIAGRAM';$('reference-image').src=`assets/${product?PRODUCTS[p||productId].photo:SCHEMES[schemeId].drawing}`;$('dialog-caption').textContent=product?PRODUCTS[p||productId].note:`${SCHEMES[schemeId].location}。可放大核对设备数量、阀件顺序与导压连接。三维空间按展示需要展开，未从示意图推定施工尺寸。`;$('reference-dialog').showModal();}
$('drawing-open').onclick=()=>openReference(mode==='products'?'photo':'drawing');$('photo-card').onclick=()=>openReference('photo');$('dialog-close').onclick=()=>$('reference-dialog').close();$('image-larger').onclick=()=>{imageScale=Math.min(4,imageScale+.5);$('reference-image').style.width=`${imageScale*100}%`;};$('image-smaller').onclick=()=>{imageScale=Math.max(1,imageScale-.5);$('reference-image').style.width=`${imageScale*100}%`;};$('image-reset').onclick=()=>{imageScale=1;$('reference-image').style.width='100%';};
$('instances').onchange=e=>selectInstance(e.target.value,true);$('focus-selected').onclick=()=>{if(selectedPart)selectInstance(selectedPart.userData.id,true);};$('inspect-product').onclick=()=>{if(selectedPart&&PARTS[selectedPart.userData.type].product)loadProduct(PARTS[selectedPart.userData.type].product);};
$('overview').onclick=()=>{if(mode==='products'){feature=null;selectBox.visible=false;list('[data-feature]').forEach(b=>b.setAttribute('aria-pressed','false'));productLabels();setFraming(bounds(model.root),'iso',1.03);$('detail-title').textContent='逐项核对实拍外观';$('detail-copy').textContent=PRODUCTS[productId].description;}else{overview();fitZone('all');}};
$('reset').onclick=()=>{if(v3UI?.isWorkshop()){v3UI.resetWorkbench();return;}if(mode==='schemes')fitZone(zone);else{feature=null;selectBox.visible=false;list('[data-feature]').forEach(b=>b.setAttribute('aria-pressed','false'));productLabels();setFraming(bounds(model.root),'iso',1.03);}};
function zoom(f){camera.position.sub(orbit.target).multiplyScalar(f).add(orbit.target);orbit.update();}$('zoom-in').onclick=()=>zoom(.80);$('zoom-out').onclick=()=>zoom(1.25);$('label-toggle').onclick=()=>{showLabels=!showLabels;$('label-toggle').setAttribute('aria-pressed',String(showLabels));$('labels').hidden=!showLabels;};$('shell-toggle').onclick=()=>{shell=!shell;applyDisplay();v3UI?.onShellChanged(shell);};$('isolate-zone').onchange=()=>Object.entries(model.zones).forEach(([k,g])=>g.visible=zone==='all'||!$('isolate-zone').checked||k===zone||(schemeId==='ahu'&&['branch','unit'].includes(zone)&&['branch','unit'].includes(k)));$('pressure-lines').onchange=applyDisplay;$('control-lines').onchange=applyDisplay;$('explode').oninput=e=>setProductExplode(Number(e.target.value));$('explode').onchange=()=>{if(mode==='products'&&!feature)setFraming(bounds(model.root),view,1.03);};$('play').onclick=()=>{playing=!playing;playClock=0;if(playing)setStep(step===3?0:step,true);updatePlay();};
for(const [id,s] of Object.entries(SCHEMES)){const b=document.createElement('button');b.type='button';b.dataset.scheme=id;b.setAttribute('aria-pressed',String(id===schemeId));const ix=document.createElement('small');ix.textContent=s.number;const name=document.createElement('strong');name.style.fontWeight='400';name.textContent=s.title;const loc=document.createElement('span');loc.textContent=s.location;b.append(ix,name,loc);b.onclick=()=>loadScheme(id);$('scheme-nav').append(b);}
for(const [id,p] of Object.entries(PRODUCTS)){const b=document.createElement('button');b.type='button';b.dataset.product=id;b.setAttribute('aria-pressed',String(id===productId));const modelCode=document.createElement('small');modelCode.textContent=p.photoModel;b.append(document.createTextNode(p.short),modelCode);b.onclick=()=>loadProduct(id);$('product-nav').append(b);}
list('[data-mode]').forEach(b=>b.onclick=()=>b.dataset.mode==='products'?loadProduct(productId):loadScheme(schemeId));list('[data-view]').forEach(b=>b.onclick=()=>setFraming(framingBox||bounds(model.root),b.dataset.view,1.03));
let pointerDown;canvas.addEventListener('pointerdown',e=>pointerDown=[e.clientX,e.clientY]);canvas.addEventListener('pointerup',e=>{if(!pointerDown||Math.hypot(e.clientX-pointerDown[0],e.clientY-pointerDown[1])>6)return;const r=canvas.getBoundingClientRect(),ray=new T.Raycaster();ray.setFromCamera(new T.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);if(mode==='schemes'&&v3UI?.handlePick(ray))return;const objects=mode==='products'?[model.root]:model.parts,hits=ray.intersectObjects(objects,true);if(!hits.length)return;if(mode==='schemes'){const p=findPart(hits[0].object);if(p){selectType(p.userData.type);selectInstance(p.userData.id);}}else{let o=hits[0].object;while(o&&!o.userData.component)o=o.parent;if(o)selectFeature(o.userData.component,false);}});
canvas.addEventListener('keydown',e=>{v3UI?.onInteraction();if(['+','=','-'].includes(e.key)){zoom(e.key==='-'?1.12:.89);e.preventDefault();}else if(e.key==='Home'){$('reset').click();e.preventDefault();}else if(e.key.startsWith('Arrow')){const sph=new T.Spherical().setFromVector3(camera.position.clone().sub(orbit.target));sph.theta+=(e.key==='ArrowLeft'?.12:e.key==='ArrowRight'?-.12:0);sph.phi=T.MathUtils.clamp(sph.phi+(e.key==='ArrowUp'?-.1:e.key==='ArrowDown'?.1:0),.03,Math.PI-.03);camera.position.copy(orbit.target).add(new T.Vector3().setFromSpherical(sph));orbit.update();e.preventDefault();}});
function resize(){const w=host.clientWidth,h=host.clientHeight,compact=w<801;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.clearViewOffset();camera.updateProjectionMatrix();if(model&&(previousCompact!==compact||v3UI?.isWorkshop())){if(v3UI?.isWorkshop())v3UI.onInteraction();setFraming(framingBox||bounds(model.root),view,1.03);}previousCompact=compact;}v3UI=createProfessionalUI({scene,floor,grid,scheme:()=>schemeId,frame:setFraming,focusZone:fitZone,loadProduct,openDrawing:()=>openReference('drawing'),openPhoto:p=>openReference('photo',p),captureView:()=>({position:camera.position.clone(),target:orbit.target.clone(),up:camera.up.clone(),near:camera.near,far:camera.far,view,box:framingBox?.clone()}),restoreView:s=>{if(!s)return;camera.position.copy(s.position);orbit.target.copy(s.target);camera.up.copy(s.up);camera.near=s.near;camera.far=s.far;view=s.view;framingBox=s.box?.clone();camera.updateProjectionMatrix();orbit.update();}});orbit.addEventListener('start',()=>v3UI?.onInteraction());orbit.addEventListener('change',()=>renderLoop?.request(300));new ResizeObserver(resize).observe(host);resize();loadScheme('hvac');
function animate(now){const dt=Math.min(clock.getDelta(),.12);time+=dt;orbit.update();if(playing&&mode==='schemes'){playClock+=dt;if(playClock>6){playClock=0;if(step===3){playing=false;updatePlay();}else setStep(step+1,true);}}
 if(flowPoints){flowPoints.visible=mode==='schemes'&&!v3UI?.isContext()&&$('flow').checked;const a=flowPoints.geometry.attributes.position.array;if(flowPoints.visible)for(let i=0;i<flowTracks.length;i++){const t=flowTracks[i],f=(time*.6/Math.max(.1,t.len)+t.offset)%1;a[i*3]=T.MathUtils.lerp(t.a.x,t.b.x,f);a[i*3+1]=T.MathUtils.lerp(t.a.y,t.b.y,f);a[i*3+2]=T.MathUtils.lerp(t.a.z,t.b.z,f);}flowPoints.geometry.attributes.position.needsUpdate=true;}
 model.root.updateMatrixWorld(true);const used=[],w=host.clientWidth,h=host.clientHeight,minY=w<801?255:192,maxY=h-135;for(const label of labelNodes){let point=label.point.clone();if(mode==='products'&&label.component){const c=model.components[label.component];point.add(c.position);}const p=point.project(camera);let x=(p.x*.5+.5)*w,y=(-p.y*.5+.5)*h;const el=label.el;el.hidden=p.z>1||p.z< -1||x<45||x>w-45||y<minY-30||y>maxY+25;if(el.hidden)continue;const ew=el.offsetWidth||100;let best=null;for(const off of[0,-33,33,-66,66,-99,99]){const cy=T.MathUtils.clamp(y+off,minY,maxY);if(!used.some(u=>Math.abs(u.x-x)<(u.w+ew)/2+7&&Math.abs(u.y-cy)<31)){best=cy;break;}}if(best===null){el.hidden=true;continue;}used.push({x,y:best,w:ew});el.style.left=`${T.MathUtils.clamp(x,ew/2+9,w-ew/2-9)}px`;el.style.top=`${best}px`;}
 v3UI?.tick(camera,host);if(v3UI?.shouldRender?.()!==false){renderer.render(scene,camera);canvas.dataset.renderCalls=String(renderer.info.render.calls);canvas.dataset.triangles=String(renderer.info.render.triangles);canvas.dataset.frames=String((Number(canvas.dataset.frames)||0)+1);}
}renderLoop=createRenderLoop(animate,{fps:30,continuous:()=>document.body.dataset.page==='workshop'||playing||!!(flowPoints?.visible)});

})();
})();
