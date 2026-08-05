import * as THREE from './three.module.min.js';

/* =========================================================================
   EMPAYAR SAMBAL BILIS  —  idle-arcade 3D pengurusan dapur
   Bahasa Melayu. Mobile-first. Satu kawalan, banyak hasil.
   ========================================================================= */
const $ = (id) => document.getElementById(id);
const canvas = $('scene');
const SAVE_KEY = 'empayar-sambal-bilis:deepseek-v4-flash-high:v1';
const IS_TOUCH = matchMedia('(pointer: coarse)').matches;

const COLORS = {
  ink:0x071b18, cream:0xfff7e0, red:0xd9362b, redDark:0x9d1f22, orange:0xf49a25,
  yellow:0xffd447, green:0x2d8551, greenL:0x4fae6d, teal:0x1d5c46, blue:0x3f7fb7,
  wood:0x9b612e, woodD:0x6f4420, steel:0xb8c5c0, grass:0x79b86f, zink:0x9aa5a3
};

/* ----------------------------- ITEMS ----------------------------- */
const ITEMS = {
  chili:  { name:'Cili segar',  color:0xe63a2d, price:0, tag:'mentah' },
  bilis:  { name:'Ikan bilis',  color:0xc7d3cb, price:0, tag:'mentah' },
  petai:  { name:'Petai',       color:0x5db34f, price:0, tag:'mentah' },
  bawang: { name:'Bawang',      color:0xd9a95e, price:0, tag:'mentah' },
  dry:    { name:'Cili kering', color:0xa91e1f, price:0, tag:'mentah' },
  paste:  { name:'Pes cili',    color:0xbe2026, price:0, tag:'proses' },
  jarClassic:{ name:'Sambal Bilis Klasik', color:0xd43b27, price:5, tag:'produk' },
  jarPetai:{ name:'Sambal Bilis Petai',   color:0x6c9b3f, price:9, tag:'produk' },
  packGaring:{ name:'Sambal Bilis Garing', color:0xe09235, price:12, tag:'produk' },
  box:    { name:'Kotak Borong', color:0xa56a2d, price:0, tag:'borong' }
};

/* ----------------------------- STATE ----------------------------- */
const defaultState = () => ({
  v:1, money:0, rep:0, totalEarned:0, sales:0, happy:0, unhappy:0, produced:0,
  capacity:3, capacityLevel:0, speedLevel:0, machineSpeedLevel:0, machineBatchLevel:0,
  workerSpeedLevel:0, shelfLevel:0,
  inventory:null,
  workersHired:{ gardener:false, producer:false, cashier:false },
  workerLevels:{ gardener:0, producer:0, cashier:0 },
  areaMax:0,
  tutorialDone:false,
  boxes:0, nationalProgress:0, nationalTarget:25, endingSeen:false,
  event:null, eventTime:0,
  music:true, sfx:true, quality:true,
  totalBoxes:0, lastSave:0
});

let state = defaultState();
let saved = null;
try { saved = JSON.parse(localStorage.getItem(SAVE_KEY)); } catch(_){}
if (saved && saved.v === 1) $('btn-continue').classList.remove('is-hidden');

/* ----------------------------- 3D SETUP ----------------------------- */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa7d6bd);
scene.fog = new THREE.Fog(0xa7d6bd, 34, 82);
const camera = new THREE.PerspectiveCamera(IS_TOUCH ? 46 : 40, 1, .1, 200);
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, powerPreference:'high-performance', alpha:false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
scene.add(new THREE.HemisphereLight(0xfff1d2, 0x2f5a44, 1.9));
const sun = new THREE.DirectionalLight(0xfff4d0, 2.1);
sun.position.set(18, 30, 12); sun.castShadow = true;
sun.shadow.mapSize.set(1024,1024);
sun.shadow.camera.left=-28; sun.shadow.camera.right=28; sun.shadow.camera.top=28; sun.shadow.camera.bottom=-28;
scene.add(sun);

const ground = new THREE.Mesh(new THREE.PlaneGeometry(150,150), new THREE.MeshLambertMaterial({ color: COLORS.grass }));
ground.rotation.x=-Math.PI/2; ground.receiveShadow=true; scene.add(ground);

const boxGeo = new THREE.BoxGeometry(1,1,1);
const sphGeo = new THREE.SphereGeometry(.5,12,10);
function addMesh(geo,mat,px,py,pz){ const m=new THREE.Mesh(geo,mat); m.position.set(px,py,pz); m.castShadow=true; scene.add(m); return m; }
function makeMat(c){ return new THREE.MeshLambertMaterial({ color:c }); }

/* ----------------------------- STATION LAYOUT ----------------------------- */
const AREAS = [
  { name:'Dapur Rumah', color:0x79b86f },
  { name:'Gerai Pasar Malam', color:0x6fae5f },
  { name:'Bengkel Pengeluaran', color:0x8a7a4a },
  { name:'Kilang Sambal', color:0x6b7b86 }
];
const STATIONS = [];
function defStation(s){
  s.rad=s.rad||1.5;
  if(s.area==null) s.area=0;
  if(s.type==='gate') s.unlocked=true;
  else if(s.area===0) s.unlocked=true; else s.unlocked=false;
  if(s.type==='machine') s._obj={ id:s.id, state:'idle', progress:0, input:{}, output:0 };
  else if(s.type==='shelf') s._obj={ id:s.id, stock:0 };
  else if(s.type==='source') s._obj={ id:s.id, stock:s.cap };
  else if(s.type==='counter') s._obj={ id:s.id, money:0 };
  else s._obj={ id:s.id };
  STATIONS.push(s); return s;
}

/* A — Dapur Rumah */
defStation({ id:'srcChili', type:'source', item:'chili', cap:9,  x:0,  z:4.2 });
defStation({ id:'srcBilis', type:'source', item:'bilis', cap:9,  x:-3.2, z:4.2 });
defStation({ id:'blender',  type:'machine', inputs:['chili'], output:'paste', time:2.2, inCap:24, outCap:30, x:1.6, z:0.6 });
defStation({ id:'wok',      type:'machine', inputs:['paste','bilis'], output:'jarClassic', time:2.8, inCap:20, outCap:30, x:-2.2, z:-0.6 });
defStation({ id:'shelfClassic', type:'shelf', item:'jarClassic', baseCap:6, x:3.2, z:-3 });
defStation({ id:'counter',  type:'counter', x:0.4, z:-4.6 });
defStation({ id:'gateB',    type:'gate', area:1, cost:120, repReq:0, x:9, z:2 });
/* B — Gerai Pasar Malam */
defStation({ id:'srcPetai', type:'source', item:'petai', cap:9, x:13, z:4 }, );
defStation({ id:'srcBawang',type:'source', item:'bawang',cap:9, x:16, z:4 });
defStation({ id:'wokPetai', type:'machine', inputs:['jarClassic','petai'], output:'jarPetai', time:4.2, inCap:16, outCap:24, x:14, z:0 });
defStation({ id:'shelfPremium', type:'shelf', item:'jarPetai', baseCap:6, x:16, z:-3 });
defStation({ id:'gateC',    type:'gate', area:2, cost:520, repReq:5, x:23, z:2 });
/* C — Bengkel */
defStation({ id:'srcDry',   type:'source', item:'dry', cap:9, x:28, z:4 });
defStation({ id:'fryer',    type:'machine', inputs:['dry','bawang'], output:'packGaring', time:5, inCap:16, outCap:24, x:29, z:0 });
defStation({ id:'shelfSnek',type:'shelf', item:'packGaring', baseCap:6, x:31, z:-3 });
defStation({ id:'order',    type:'order', x:27, z:-5 });
defStation({ id:'gateD',    type:'gate', area:3, cost:1500, repReq:12, x:37, z:2 });
/* D — Kilang */
defStation({ id:'national', type:'national', x:42, z:0 });
defStation({ id:'nationalShelf', type:'shelf', item:'box', baseCap:4, x:42, z:-4, area:3 });

const machineDefs={}; STATIONS.filter(s=>s.type==='machine').forEach(s=>machineDefs[s.id]=s);

/* ----------------------------- BUILD STATIONS ----------------------------- */
function basePad(s,color,h=0){
  const g=new THREE.Mesh(new THREE.CircleGeometry(s.rad+0.3,24),makeMat(color));
  g.rotation.x=-Math.PI/2; g.position.set(s.x,0.03+h,s.z); g.receiveShadow=true; scene.add(g);
  const ring=new THREE.Mesh(new THREE.RingGeometry(s.rad+0.3,s.rad+0.5,24),
    new THREE.MeshBasicMaterial({ color:0xffffff, transparent:true, opacity:0.16, side:THREE.DoubleSide }));
  ring.rotation.x=-Math.PI/2; ring.position.set(s.x,0.06+h,s.z); scene.add(ring);
}
function sign(s,text,col){
  const post=addMesh(boxGeo,makeMat(COLORS.woodD),s.x,s.rad+0.6,s.z); post.scale.set(0.35,2.2,0.35); post.position.y=s.rad+1.5;
  const pl=addMesh(boxGeo,makeMat(col),s.x,s.rad*2+2.0,s.z); pl.scale.set(1.8,0.5,0.14); pl.position.y=s.rad*2+2.1;
}
function buildSourceBox(s){
  basePad(s,0x4c6b57);
  const body=addMesh(boxGeo,makeMat(COLORS.wood),s.x,0.55,s.z); body.scale.set(1.3,0.9,1.3);
  const col=ITEMS[s.item].color;
  for(let i=0;i<3;i++) for(let j=0;j<2;j++){
    const m=addMesh(sphGeo,makeMat(col),s.x+(i-1)*0.42,1.1+j*0.3,s.z+(Math.random()-0.5)*0.2);
    m.scale.set(0.32,0.32,0.32);
  }
}
function buildMachine(s){
  basePad(s,0x6b7b86);
  if(s.id==='wok'||s.id==='wokPetai'){
    const wok=addMesh(new THREE.SphereGeometry(.85,16,12,0,Math.PI*2,0,Math.PI/2),makeMat(COLORS.ink),s.x,0.72,s.z); wok.scale.y=0.5;
    const rim=addMesh(new THREE.TorusGeometry(.85,0.07,10,20),makeMat(0x555555),s.x,0.78,s.z); rim.rotation.x=-Math.PI/2;
  } else if(s.id==='fryer'){
    const top=addMesh(boxGeo,makeMat(0x333333),s.x,0.95,s.z); top.scale.set(1.1,0.14,0.8);
    const leg=addMesh(boxGeo,makeMat(COLORS.steel),s.x,0.5,s.z); leg.scale.set(1.2,0.5,0.7);
  } else {
    const cup=addMesh(new THREE.CylinderGeometry(.5,.34,1.1,14),makeMat(0x3f7fb7),s.x,1.0,s.z);
  }
  const tags={ blender:'Pengisar', wok:'Kuali', wokPetai:'Kuali Petai', fryer:'Penggoreng' };
  sign(s, tags[s.id]||'Mesin', COLORS.orange);
}
function buildShelf(s){
  basePad(s,0x6d4c2f);
  sign(s, ITEMS[s.item].name+' · RM'+ITEMS[s.item].price, COLORS.wood);
  buildShelfBox(s,shelfCap(s),s._obj.stock);
}
function buildShelfBox(s,cap,count){
  if(s._group){ scene.remove(s._group); s._group=null; }
  const g=new THREE.Group();
  for(let i=0;i<3;i++){ const c=addMesh(boxGeo,makeMat(COLORS.woodD), (i-1)*0.75,0.55,0); c.scale.set(0.12,1.0,0.12); g.add(c); }
  const board=addMesh(boxGeo,makeMat(COLORS.wood),0,1.05,0); board.scale.set(1.5,0.07,0.55); g.add(board);
  const shown=Math.min(count,cap);
  for(let i=0;i<shown;i++){
    const slot=((i%3)-1)*0.48, row=Math.floor(i/3);
    const b=addMesh(new THREE.BoxGeometry(.34,.5,.34),makeMat(ITEMS[s.item].color),slot,1.3+row*0.55,0); g.add(b);
  }
  g.position.set(s.x,0,s.z); scene.add(g); s._group=g;
}
function buildCounter(s){
  basePad(s,0x7a4c22);
  const top=addMesh(boxGeo,makeMat(COLORS.wood),s.x,0.78,s.z); top.scale.set(2.2,0.2,0.8);
  const front=addMesh(boxGeo,makeMat(COLORS.woodD),s.x,0.42,s.z); front.scale.set(2.2,0.7,0.7);
  sign(s,'Kaunter · Bayar RM',COLORS.greenL);
}
function buildOrder(s){
  basePad(s,0x8a6a3a);
  const box=addMesh(boxGeo,makeMat(COLORS.wood),s.x,1.1,s.z); box.scale.set(1.0,0.8,0.8);
  const lid=addMesh(boxGeo,makeMat(COLORS.redDark),s.x,1.65,s.z); lid.scale.set(1.2,0.1,1.0);
  sign(s, s.type==='national'?'Penghantaran Nasional':'Pesanan Borong', COLORS.redDark);
}
function buildGate(s){
  basePad(s,COLORS.yellow);
  const p1=addMesh(boxGeo,makeMat(COLORS.woodD),s.x-0.9,0.85,s.z); p1.scale.set(0.14,1.7,0.14);
  const p2=addMesh(boxGeo,makeMat(COLORS.woodD),s.x+0.9,0.85,s.z); p2.scale.set(0.14,1.7,0.14);
  const b=addMesh(boxGeo,makeMat(COLORS.orange),s.x,1.4,s.z); b.scale.set(2.0,0.5,0.1);
  sign(s,'BUKA · RM'+s.cost+' · ★'+s.repReq,COLORS.yellow);
}
function buildAllStations(){
  STATIONS.forEach(s=>{
    if(s.type==='gate') buildGate(s);
    else if(s.type==='machine') buildMachine(s);
    else if(s.type==='source') buildSourceBox(s);
    else if(s.type==='shelf') buildShelf(s);
    else if(s.type==='counter') buildCounter(s);
    else if(s.type==='order'||s.type==='national') buildOrder(s);
  });
}
function rebuildShelves(){ STATIONS.filter(s=>s.type==='shelf').forEach(s=>buildShelfBox(s,shelfCap(s),s._obj.stock)); }

/* ----------------------------- CHARACTER FACTORY ----------------------------- */
function makeCharacter(color){
  const g=new THREE.Group();
  const body=addMesh(new THREE.CylinderGeometry(0.4,0.52,0.85,12),makeMat(color),0,0.55,0); g.add(body);
  const head=addMesh(sphGeo,makeMat(color),0,1.35,0); head.scale.set(0.8,0.9,0.8); g.add(head);
  const face=addMesh(sphGeo,makeMat(0xecc8a2),0,1.35,0.14); face.scale.set(0.55,0.55,0.5); g.add(face);
  const hat=addMesh(new THREE.CylinderGeometry(0.4,0.45,0.16,12),makeMat(COLORS.red),0,1.62,0); g.add(hat);
  return g;
}

/* ----------------------------- PLAYER ----------------------------- */
const player = makeCharacter(COLORS.orange);
scene.add(player);
player.position.set(2.4,0,5);
const carryGroup=new THREE.Group(); carryGroup.position.set(0,1.4,0); player.add(carryGroup);
function updateCarryVisual(){
  while(carryGroup.children.length) carryGroup.remove(carryGroup.children[0]);
  const inv=state.inventory;
  if(!inv||inv.count<=0){ carryGroup.visible=false; return; }
  carryGroup.visible=true;
  const col=ITEMS[inv.type].color;
  const n=Math.min(inv.count,Math.min(state.capacity,6));
  const per=Math.min(n,3);
  for(let i=0;i<per;i++) for(let j=0;j<Math.min(Math.ceil(n/per),2);j++){
    const m=addMesh(new THREE.BoxGeometry(.32,.4,.32),makeMat(col),0,0,0); m.position.set((i%2-0.5)*0.3,j*0.4,(Math.floor(i/2)-0.5)*0.28); carryGroup.add(m);
  }
}

/* ----------------------------- CONTROLS ----------------------------- */
const input={x:0,y:0};
let joyDrag=false, joyBase=null;
const joyKnob=$('joy-knob'), joyRing=$('joystick');
if(IS_TOUCH) joyRing.classList.add('show');
function joyMove(cx,cy,base){
  let dx=cx-base.x,dy=cy-base.y; const len=Math.hypot(dx,dy),max=46;
  if(len>max){dx=dx/len*max;dy=dy/len*max;}
  joyKnob.style.transform=`translate(${dx}px,${dy}px)`;
  input.x=dx/max; input.y=-dy/max;
}
function joyEnd(){ joyDrag=false; input.x=0; input.y=0; joyKnob.style.transform='translate(0px,0px)'; }
if(IS_TOUCH){
  canvas.addEventListener('pointerdown',e=>{ const r=canvas.getBoundingClientRect(); joyBase={x:e.clientX-r.left,y:e.clientY-r.top}; joyDrag=true; joyMove(e.clientX-r.left,e.clientY-r.top,joyBase); canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove',e=>{ if(joyDrag&&joyBase){const r=canvas.getBoundingClientRect();joyMove(e.clientX-r.left,e.clientY-r.top,joyBase);} });
  ['pointerup','pointercancel'].forEach(ev=>canvas.addEventListener(ev,joyEnd));
} else {
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){togglePause();return;}
    if(['ArrowUp','KeyW'].includes(e.key)){input.y=1;e.preventDefault();}
    if(['ArrowDown','KeyS'].includes(e.key)){input.y=-1;e.preventDefault();}
    if(['ArrowLeft','KeyA'].includes(e.key)){input.x=-1;e.preventDefault();}
    if(['ArrowRight','KeyD'].includes(e.key)){input.x=1;e.preventDefault();}
  });
  document.addEventListener('keyup',e=>{
    if(['ArrowUp','KeyW'].includes(e.key)){if(input.y===1)input.y=0;}
    if(['ArrowDown','KeyS'].includes(e.key)){if(input.y===-1)input.y=0;}
    if(['ArrowLeft','KeyA'].includes(e.key)){if(input.x===-1)input.x=0;}
    if(['ArrowRight','KeyD'].includes(e.key)){if(input.x===1)input.x=0;}
  });
  let md=false;
  canvas.addEventListener('pointerdown',e=>{md=true;canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{ if(md){ const r=canvas.getBoundingClientRect(); const cx=e.clientX-r.left,cy=e.clientY-r.top; input.x=THREE.MathUtils.clamp((cx-camera.clientWidth?0:0)/1,0,0); /* kawalan melalui key */ } });
  ['pointerup','pointercancel'].forEach(ev=>canvas.addEventListener(ev,()=>{md=false;}));
}
const WALK={}; const P_SPEED=()=> 3.4*(1+state.speedLevel*0.18);

/* ----------------------------- CAMERA ----------------------------- */
const camDir=new THREE.Vector3(1,0,-0.9).normalize();
const camHeight=16, camDist=14;
function updateCamera(dt){
  const ahead=camDir.clone().multiplyScalar(4);
  const lx=player.position.x+ahead.x, lz=player.position.z+ahead.z;
  const tx=lx-camDir.x*camDist, tz=lz-camDir.z*camDist;
  const sm=1-Math.exp(-dt*3.2);
  camera.position.x+=(tx-camera.position.x)*sm; camera.position.z+=(tz-camera.position.z)*sm;
  camera.position.y=(camHeight-camera.position.y)*sm+camera.position.y;
  camera.lookAt(lx,0.5,lz);
}

function movePlayer(dt){
  const ix=input.x, iy=input.y;
  if(Math.hypot(ix,iy)<0.05) return;
  const v=new THREE.Vector3(ix,0,iy).normalize();
  player.position.x+=v.x*P_SPEED()*dt; player.position.z+=v.z*P_SPEED()*dt;
  player.position.x=THREE.MathUtils.clamp(player.position.x,-9,46);
  player.position.z=THREE.MathUtils.clamp(player.position.z,-11,10);
  const ta=Math.atan2(v.x,v.z); player.rotation.y+=(ta-player.rotation.y)*0.12;
  if(!tutMoved && Math.hypot(v.x,v.z)>0){ tutMoved=true; }
}

/* ----------------------------- SAVE ----------------------------- */
function collectStations(){
  return {
    machines:STATIONS.filter(s=>s.type==='machine').map(s=>({id:s.id,state:s._obj.state,progress:s._obj.progress,input:Object.assign({},s._obj.input),output:s._obj.output})),
    shelves:STATIONS.filter(s=>s.type==='shelf').map(s=>({id:s.id,stock:s._obj.stock})),
    sources:STATIONS.filter(s=>s.type==='source').map(s=>({id:s.id,stock:s._obj.stock}))
  };
}
function applyStations(data){
  if(!data) return;
  data.machines.forEach(m=>{const s=STATIONS.find(x=>x.id===m.id); if(s){s._obj.state=m.state;s._obj.progress=m.progress||0;s._obj.input=m.input||{};s._obj.output=m.output||0;}});
  data.shelves.forEach(k=>{const s=STATIONS.find(x=>x.id===k.id); if(s)s._obj.stock=k.stock||0;});
  data.sources.forEach(k=>{const s=STATIONS.find(x=>x.id===k.id); if(s)s._obj.stock=k.stock!=null?k.stock:s.cap;});
}
function save(){
  if(!state) return; state.lastSave=Date.now();
  const data=Object.assign({},state); data.st=collectStations();
  try{localStorage.setItem(SAVE_KEY,JSON.stringify(data));}catch(_){}
}
let saveTimer=0;
function autosave(dt){ saveTimer+=dt; if(saveTimer>5){saveTimer=0;save();} }
function loadSaved(){
  if(!saved||saved.v!==1) return;
  state=Object.assign(defaultState(),saved,{inventory:saved.inventory||null});
  state.st=null;
  applyStations(saved.st);
  STATIONS.forEach(s=>{ s.unlocked = (s.area<=state.areaMax); });
  rebuildShelves(); updateCarryVisual();
}
function resetAll(){ setTimeout(()=>{localStorage.removeItem(SAVE_KEY);location.reload();},60); }

/* ----------------------------- NUMBERS ----------------------------- */
function shelfCap(s){ return s.baseCap+state.shelfLevel; }
function machineBatch(){ return 1+state.machineBatchLevel; }
function machineTime(s){ return Math.max(1.2, s.time*Math.pow(0.9,state.machineSpeedLevel)); }
function outCap(s){ return machineDefs[s.id].outCap; }
function workerSpeed(){ return 2.6*(1+state.workerSpeedLevel*0.2); }
function workerCap(role){ return 2+state.workerLevels[role]; }

const COSTS={
  capacity:[40,90,180,340,620],
  speed:[35,80,170,330,580],
  machineSpeed:[50,120,260,480],
  machineBatch:[130,280,560],
  workerSpeed:[70,150,320],
  shelf:[35,80,170]
};
function costOf(kind){ const lvl=state[kind+'Level']||0; return COSTS[kind][lvl]==null?null:COSTS[kind][lvl]; }

function addMoney(n){ state.money+=n; state.totalEarned+=n; }
function spend(n){ state.money-=n; }

/* ----------------------------- FX ----------------------------- */
function floatFx(v3,text,color){
  const p=v3.clone().project(camera);
  const r=canvas.getBoundingClientRect();
  const x=(p.x+1)/2*r.width, y=(-p.y+1)/2*r.height;
  const el=document.createElement('div');
  el.textContent=text; el.style.cssText=`position:fixed;left:${x}px;top:${y}px;z-index:25;font-weight:800;color:${color||'#fff'};font-size:14px;transform:translate(-50%,-50%);pointer-events:none;text-shadow:0 1px 3px rgba(0,0,0,.6)`;
  el.classList.add('fxfloat'); document.body.appendChild(el);
  el.animate([{opacity:1,transform:'translate(-50%,-70%)'},{opacity:0,transform:'translate(-50%,-180%)'}],{duration:900,easing:'ease-out'}).onfinish=()=>el.remove();
}
function toast(msg,bad){
  const box=$('toasts'); const el=document.createElement('div'); el.className='toast'+(bad?' bad':''); el.innerHTML=msg; box.appendChild(el);
  setTimeout(()=>{el.style.transition='opacity .3s,transform .3s';el.style.opacity='0';el.style.transform='translateY(-6px)';setTimeout(()=>el.remove(),300);},2200);
  while(box.children.length>3) box.firstChild.remove();
}

/* ----------------------------- AUDIO ----------------------------- */
let actx=null, musicTimer=null, musicOn=false;
function audio(){ if(!actx){ try{actx=new (window.AudioContext||window.webkitAudioContext)();}catch(e){actx=null;} } if(actx&&actx.state==='suspended')actx.resume(); return actx; }
function tone(freq,dur,type='sine',vol=0.15,when=0){
  if(!state||!state.sfx) return; const ac=audio(); if(!ac) return;
  const o=ac.createOscillator(),g=ac.createGain(); o.type=type;o.frequency.value=freq;
  o.connect(g);g.connect(ac.destination);
  const t=ac.currentTime+when; g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+0.01); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.start(t); o.stop(t+dur+0.02);
}
const sfxMap={
  pop:()=>{tone(520,0.08,'sine',0.12);tone(780,0.05,'sine',0.08,0.03);},
  drop:()=>tone(220,0.1,'triangle',0.12),
  take:()=>tone(330,0.07,'triangle',0.12),
  place:()=>tone(420,0.08,'triangle',0.13),
  coin:()=>{tone(880,0.09,'square',0.07);tone(1320,0.16,'square',0.07,0.06);},
  cook:()=>tone(300,0.3,'sawtooth',0.05),
  build:()=>{tone(523,0.1,'triangle',0.13);tone(659,0.1,'triangle',0.13,0.08);tone(784,0.16,'triangle',0.13,0.16);},
  box:()=>{tone(392,0.08,'square',0.09);tone(523,0.12,'square',0.09,0.07);tone(659,0.2,'square',0.09,0.15);},
  buy:()=>{tone(659,0.07,'triangle',0.12);tone(880,0.09,'triangle',0.12,0.07);},
  event:()=>{tone(740,0.2,'square',0.08);tone(740,0.2,'square',0.08,0.12);}
};
function sfx(n){ if(sfxMap[n])sfxMap[n](); }
function musicStart(){ if(!state.music||musicOn)return; if(!audio())return; musicOn=true; const seq=[440,523,659,523,440,587,440,0,392,440,523,440,392,330,0,330]; let i=0;
  musicTimer=setInterval(()=>{const n=seq[i%seq.length]; if(n){tone(n,0.22,'sine',0.04);tone(n*2,0.14,'sine',0.018,0.02);} i++;},240); }
function musicStop(){ if(musicTimer){clearInterval(musicTimer);musicTimer=null;} musicOn=false; }

/* ----------------------------- PRODUCTION ----------------------------- */
function updateMachines(dt){
  STATIONS.filter(s=>s.type==='machine'&&s.unlocked).forEach(s=>{
    const m=s._obj;
    if(m.state==='working'){ m.progress+=dt/machineTime(s); if(m.progress>=1){ m.state='done'; m.progress=1; onProduce(s,m); } }
  });
}
function canStart(s){
  const def=machineDefs[s.id],m=s._obj;
  if(m.output>=outCap(s)) return false;
  return def.inputs.every(t=>(m.input[t]||0)>=1);
}
function startMachine(s){
  const def=machineDefs[s.id],m=s._obj,batch=machineBatch();
  if(m.output+batch>outCap(s)) return false;
  if(!canStart(s)) return false;
  def.inputs.forEach(t=>{m.input[t]=(m.input[t]||0)-1;});
  m.state='working';m.progress=0; sfx('drop'); return true;
}
function massageMachines(){ STATIONS.filter(s=>s.type==='machine'&&s.unlocked).forEach(s=>{ const m=s._obj; if(m.state==='idle'||m.state==='done') startMachine(s); }); }
function onProduce(s,m){
  const batch=machineBatch(); m.output+=batch; m.state='idle'; state.produced+=batch;
  if(s.id==='wok') levelFlags.wokProduced=true;
  sparkle(s); sfx('cook');
}
function sparkle(s){}

/* ----------------------------- INTERACTION ----------------------------- */
const INTERACT_R=1.7;
let currentStation=null;
function nearestStation(){
  let best=null,bd=1e9;
  STATIONS.forEach(s=>{ if(!s.unlocked)return; const d=Math.hypot(player.position.x-s.x,player.position.z-s.z); if(d<bd){bd=d;best=s;} });
  return bd<INTERACT_R*1.25?best:null;
}
function playerInteract(dt){
  const st=nearestStation();
  if(!st){ clearPrompt(); currentStation=null; return; }
  currentStation=st;
  const inv=state.inventory;
  if(st.type==='source'){
    const col=ITEMS[st.item].color;
    if(st._obj.stock<=0){ setPrompt('Bekalan habis','Tunggu ia penuh semula','⏳',0); return; }
    if(!inv){ state.inventory={type:st.item,count:1}; st._obj.stock--; sfx('pop'); updateCarryVisual(); levelFlags.picked[st.item]=true; setPrompt('+1 '+ITEMS[st.item].name,'Kutip lagi untuk bertindan','🌶',null); }
    else if(inv.type===st.item && inv.count<state.capacity && st._obj.stock>0){ inv.count++; st._obj.stock--; sfx('pop'); updateCarryVisual(); }
    else { setPrompt('Tangan penuh','Tinggalkan di mesin/rak dahulu','✋',null); }
    return;
  }
  if(st.type==='machine'){
    const def=machineDefs[st.id],m=st._obj;
    if(inv && ITEMS[inv.type].tag==='produk' && def.inputs.includes(inv.type) && m.output<outCap(st)){
      m.input[inv.type]=(m.input[inv.type]||0)+1; inv.count--; sfx('drop');
      if(inv.count<=0)state.inventory=null; updateCarryVisual();
    } else if(inv && ITEMS[inv.type].tag==='produk'){
      setPrompt('Hantar ke rak','Produk siap — isi rak berdekatan','→',null); return;
    }
    if(m.output>0 && (!inv)){ m.output--; state.inventory={type:def.output,count:1}; sfx('take'); updateCarryVisual(); }
    else if(m.output>0 && inv && inv.type===def.output && inv.count<state.capacity){ m.output--; inv.count++; sfx('take'); updateCarryVisual(); }
    else if(inv && inv.type===def.output && inv.count>=state.capacity){ setPrompt('Tangan penuh','Hantar ke rak dahulu','✋',null); }
    else if(m.state==='working'){ setPrompt('Memproses…',(st.id==='wok'||st.id==='wokPetai')?'Tumis sambal':'Kisar & proses','⏳',m.progress); }
    else if(m.state==='done'){ setPrompt('Hasil siap!','Berdiri untuk ambil','✅',null); }
    else { setPrompt(def.inputs.map(t=>ITEMS[t].name).join(' + '),'Bawa bahan, tuang ke sini','🍳',null); }
    return;
  }
  if(st.type==='shelf'){
    if(inv && inv.type===st.item && st._obj.stock<shelfCap(st)){ st._obj.stock++; inv.count--; sfx('place'); rebuildShelves(); if(inv.count<=0)state.inventory=null; updateCarryVisual(); levelFlags.shelfFilled[st.item]=true; }
    else if(inv && inv.type!==st.item){ setPrompt('Rak '+ITEMS[st.item].name,'Kosongkan tangan atau bawa produk yang sama','✋',null); }
    else if(inv) { setPrompt('Rak penuh','Produk lain atau tunggu pelanggan','📦',null); }
    else { setPrompt('Rak '+ITEMS[st.item].name,'Stok '+st._obj.stock+'/'+shelfCap(st),'📦',null); }
    return;
  }
  if(st.type==='counter'){ setPrompt('Kaunter aktif','Pelanggan bayar di sini','RM',null); return; }
  if(st.type==='order'||st.type==='national'){ orderInteract(st); return; }
  if(st.type==='gate'){ gateInteract(st); return; }
}
function orderInteract(st){
  const inv=state.inventory, acc=['jarClassic','jarPetai','packGaring'];
  if(inv&&acc.includes(inv.type)&&inv.count>=6){
    inv.count-=6; if(inv.count<=0)state.inventory=null; updateCarryVisual();
    const type=st.type==='national'?'box':'jarClassic';
    const product = inv?inv.type: (st.type==='national'?'jarClassic':'jarClassic');
    // kita guna inv.type sebelum nol
    makeBox(st,(st.type==='national'? (st.__lastEach||'jarClassic') : 'jarClassic'));
    if(st.type==='national'){ state.nationalProgress++; checkEnding(); }
  } else if(inv&&acc.includes(inv.type)){
    setPrompt('+'+(inv.count)+'/6 unit','Bawa 6 balang sejenis','📦',null);
  } else {
    setPrompt(st.type==='national'?'Penghantaran nasional':'Pesanan borong','Bawa 6 balang untuk bungkus kotak','📦',null);
  }
}
function makeBox(st, productType){
  const pay=Math.round(ITEMS[productType].price*1.2*6);
  addMoney(pay); state.boxes++; state.totalBoxes++; addRepSilently(1);
  toast('<b>Kotak borong!</b> +RM'+pay); sfx('box'); floatFx(player.position.clone().setY(2.2),'+RM'+pay,'#ffd15c');
}
function gateInteract(st){
  setPrompt('BUKA KAWASAN',AREAS[st.area].name+' — RM'+st.cost+(st.repReq?' · ★'+st.repReq:''),'🔓',null);
  if(state.money>=st.cost && state.rep>=st.repReq && st.area>state.areaMax){ spend(st.cost); openArea(st.area); }
}
function openArea(idx){
  state.areaMax=Math.max(state.areaMax,idx);
  STATIONS.forEach(s=>{ s.unlocked=(s.area<=state.areaMax); });
  STATIONS.forEach(s=>{ if(s.type==='source'&&s.area===idx) s._obj.stock=s.cap; });
  rebuildShelves();
  const zone=$('zone-chip'); zone.textContent=AREAS[idx].name+' dibuka!'; zone.classList.remove('new'); void zone.offsetWidth; zone.classList.add('new');
  toast('✅ <b>'+AREAS[idx].name+'</b> dibuka!'); sfx('build'); confetti();
  levelFlags.areaOpened=Math.max(levelFlags.areaOpened||0,idx);
  updateOrderUI(); snapHud(); save();
}

/* =========================== TUTORIAL (flag-based) =========================== */
const TUTORIAL=[
  {t:'Gerakkan diri anda',c:'Seret kayu bedik atau tekan WASD.',icon:'◎'},
  {t:'Kutip cili segar',c:'Berdiri di petak hijau cili.',icon:'🌶'},
  {t:'Kutip ikan bilis',c:'Berdiri di bekas kelabu bilis.',icon:'≋'},
  {t:'Masak sambal',c:'Tuang pes & bilis ke kuali, tunggu, ambil hasil.',icon:'🍳'},
  {t:'Isi rak jualan',c:'Bawa sambal siap ke rak untuk dijual.',icon:'🫙'},
  {t:'Layan pelanggan',c:'Berdiri di kaunter hijau untuk terima bayaran.',icon:'RM'},
  {t:'Automasi',c:'Buka Kedai › Pekerja dan upah pembantu.',icon:'👷'},
  {t:'Buka kawasan',c:'Berdiri di pagar kuning untuk membuka kawasan baharu.',icon:'🔓'}
];
const levelFlags={ picked:{}, shelfFilled:{}, wokProduced:false, sellFirst:false, workerHired:false, areaOpened:0, boxesMade:false };
let tutMoved=false;
function evalTutorial(){
  if(state.tutorialDone) return;
  const t=state.tutorial, done=(n)=>{ if(state.tutorial===n){ state.tutorial++; missionInfo(); stepFlash(); } };
  if(t===0&&tutMoved) done(0);
  else if(t===1&&Object.values(levelFlags.picked).some(x=>x)&&state.inventory) done(1);
  else if(t===2&&levelFlags.picked.bilis) done(2);
  else if(t===3&&levelFlags.wokProduced) done(3);
  else if(t===4&&levelFlags.shelfFilled.jarClassic) done(4);
  else if(t===5&&levelFlags.sellFirst) done(5);
  else if(t===6&&levelFlags.workerHired) done(6,7);
  else if(t===7&&(levelFlags.areaOpened>=1||levelFlags.boxesMade)) { state.tutorialDone=true; $('mission').style.display='none'; toast('Tutorial lengkap! 🌟'); }
  if(state.tutorial>=TUTORIAL.length){ state.tutorialDone=true; $('mission').style.display='none'; }
}
function missionInfo(){
  const t=Math.min(state.tutorial,TUTORIAL.length-1),d=TUTORIAL[t];
  $('mission-kicker').textContent=state.tutorialDone?'MISI':'TUTORIAL '+(state.tutorial+1)+'/'+TUTORIAL.length;
  $('mission-title').textContent=d.t; $('mission-copy').textContent=d.c; $('mission-icon').textContent=d.icon;
  $('mission-fill').style.width=(state.tutorialDone?100:((state.tutorial)/(TUTORIAL.length-1))*100)+'%';
}
function stepFlash(){ $('mission').animate([{transform:'scale(1)'},{transform:'scale(1.04)'},{transform:'scale(1)'}],{duration:350}); }

/* =========================== CUSTOMERS =========================== */
const custColors=[0xd13a3a,0x3a7bd1,0x4bb04b,0xc99a3a,0x9b59d0,0xe0658f,0x2aa7a7];
const customers=[];
let custSpawnT=0;
const MAX_CUST=[4,6,9,11];
function desiredProducts(){ return ['jarClassic','jarPetai','packGaring'].filter(p=>STATIONS.find(s=>s.type==='shelf'&&s.item===p).unlocked); }
function counterObj(){ return STATIONS.find(s=>s.id==='counter'); }
function counterPos(){ return new THREE.Vector3(counterObj().x,0,counterObj().z); }
function spawnCustomer(){
  const max=MAX_CUST[Math.min(state.areaMax,3)];
  const inFlow=customers.filter(c=>c.state!=='leaving').length;
  if(inFlow>=max) return;
  const prods=desiredProducts(); if(prods.length===0) return;
  const pick=prods[Math.floor(Math.random()*prods.length)];
  const shelf=STATIONS.find(s=>s.type==='shelf'&&s.item===pick);
  const c={ mesh:makeCharacter(custColors[Math.floor(Math.random()*custColors.length)]), product:pick, shelf,
    state:'toShelf', carry:null, queueSlot:null, patience:9, waitT:0, happy:true, dead:false };
  c.mesh.position.set(shelf.x+(Math.random()<0.5?-4:4),0,shelf.z+5.5);
  c.mesh.rotation.y=Math.atan2(2,1);
  scene.add(c.mesh); customers.push(c);
}
function shelfStand(s){ return new THREE.Vector3(s.x,0,s.z); }
function queueSlotPos(slot){ if(!slot||slot===1) return new THREE.Vector3(counterPos().x-0.2,0,counterPos().z); const d=(slot-1)*1.0; return new THREE.Vector3(counterPos().x-d,0,counterPos().z); }
function moveAgent(mesh,target,speed,dt){ const d=target.clone().sub(mesh.position); const len=d.length(); if(len<0.02)return; const step=Math.min(speed*dt,len); d.normalize(); mesh.position.add(d.multiplyScalar(step)); mesh.rotation.y=Math.atan2(d.x,d.z); }
function close(a,b,eps){ return a.distanceTo(b)<eps; }
function updateCustomers(dt){
  customers.forEach(c=>{
    if(c.dead) return;
    switch(c.state){
      case 'toShelf':{ moveAgent(c.mesh,shelfStand(c.shelf),2.1,dt); if(close(c.mesh.position,shelfStand(c.shelf),0.3)) c.state='atShelf'; break; }
      case 'atShelf':{
        if(c.shelf._obj.stock>0){ c.shelf._obj.stock--; rebuildShelves(); c.carry=c.product; c.state='toQueue'; levelFlags.custGot=true; }
        else { c.waitT+=dt; if(c.waitT>c.patience){ c.happy=false; state.unhappy++; c.state='leaving'; moodBubble(c,'😞'); } }
        break;
      }
      case 'toQueue':{ const p=queueSlotPos(c.queueSlot); moveAgent(c.mesh,p,2.2,dt); if(close(c.mesh.position,p,0.35)) c.state='queuing'; break; }
      case 'queuing':{ const p=queueSlotPos(c.queueSlot); moveAgent(c.mesh,p,2.2,dt); break; }
      case 'leaving':{ const target=new THREE.Vector3(c.mesh.position.x+(c.mesh.position.x>16?-1:1)*7,0,c.mesh.position.z+7); moveAgent(c.mesh,target,2.3,dt); if(c.mesh.position.z>9){ c.dead=true; scene.remove(c.mesh); } break; }
    }
  });
  customers=customers.filter(c=>!c.dead);
}
let qRefresh=0;
function serveQueues(dt){
  qRefresh-=dt;
  const inQueue=customers.filter(c=>c.carry&&c.state==='toQueue'||c.state==='queuing');
  inQueue.sort((a,b)=>(a._qin||0)-(b._qin||0));
  inQueue.forEach((c,i)=>{ if(c.queueSlot==null){ c._qin=Date.now(); c.queueSlot=i+1; } });
  inQueue.forEach((c,i)=>{ if(c.queueSlot!==i+1) c.queueSlot=i+1; });
  if(inQueue.length===0) return;
  const front=inQueue[0];
  const active=playerNearCounter()||cashierHired();
  if(!active){ showNeedCounter(); return; }
  if(!close(front.mesh.position,queueSlotPos(1),0.5)) return;
  const evN = 1;
  if(qRefresh<=0){ qRefresh=0.75; payCustomer(front); }
}
function payCustomer(c){
  const p=ITEMS[c.product].price;
  const viral=(state.event===c.product);
  const amt=viral?p*2:p;
  state.money+=amt; state.totalEarned+=amt; state.sales++; state.happy++; state.rep+=1;
  floatFx(c.mesh.position.clone().setY(2),'+RM'+amt,'#7fe8a8'); sfx('coin');
  if(!levelFlags.sellFirst) levelFlags.sellFirst=true;
  c.state='leaving'; c.carry=null; c.queueSlot=null; c.happy=true;
}
function playerNearCounter(){ return Math.hypot(player.position.x-counterPos().x,player.position.z-counterPos().z)<2.0; }
function cashierHired(){ return state.workersHired.cashier; }
function showNeedCounter(){ setPrompt('Pergi ke kaunter!','Berdiri dekat kaunter hijau untuk layan pelanggan','👋',null); }

/* =========================== WORKERS =========================== */
const WORKERS=[];
function workerRoleName(r){ return r==='gardener'?'Pekebun':r==='producer'?'Pembantu Dapur':'Juruwang'; }
function hireWorker(role){
  if(state.workersHired[role]) return;
  state.workersHired[role]=true;
  const w={ role, carry:{type:null,count:0}, state:'idle', target:null };
  const mesh=makeCharacter(role==='gardener'?0x3f7fb7:role==='producer'?0x9b59d0:0x2aa7a7);
  mesh.position.set(player.position.x+1.5,0,player.position.z+1.5); scene.add(mesh); w.mesh=mesh;
  WORKERS.push(w); toast('✅ '+workerRoleName(role)+' mula bekerja!'); sfx('build'); levelFlags.workerHired=true; save();
}
function updateWorkers(dt){
  WORKERS.forEach(w=>{
    if(w.state==='idle') pickWorkerTask(w);
    else if(w.state==='walk'){ if(!w.target){w.state='idle';return;} moveAgent(w.mesh,w.target.p,workerSpeed(),dt); if(close(w.mesh.position,w.target.p,0.35)) w.state='at'; }
    else if(w.state==='at'){ atWorkerTarget(w); }
  });
}
function pickWorkerTask(w){
  const g=findNeeded(w);
  if(g){ w.target={p:new THREE.Vector3(g.st.x,0,g.st.z),st:g.st,action:g.action,item:g.item}; w.state='walk'; }
  else w.target=null;
}
function findNeeded(w){
  if(w.role==='gardener'){
    if(!w.carry.type){
      const wanted=STATIONS.filter(s=>s.type==='machine'&&s.unlocked).flatMap(m=>machineDefs[m.id].inputs.filter(t=>!(m._obj.input[t]&&m._obj.input[t]>=1)));
      const srcs=STATIONS.filter(s=>s.type==='source'&&s.unlocked);
      const pick=srcs.filter(s=>wanted.includes(s.item)&&s._obj.stock>0)[0]||srcs.find(s=>s._obj.stock>0);
      if(pick) return {st:pick,action:'pick',item:pick.item};
      return null;
    } else {
      const t=STATIONS.find(s=>s.type==='machine'&&s.unlocked&&machineDefs[s.id].inputs.includes(w.carry.type)&&!(s._obj.input[w.carry.type]>=1)&&s._obj.output<outCap(s));
      if(t) return {st:t,action:'drop',item:w.carry.type};
      return null;
    }
  }
  if(w.role==='producer'){
    if(!w.carry.type){
      const out=STATIONS.find(s=>s.type==='machine'&&s.unlocked&&s._obj.output>0);
      if(out) return {st:out,action:'take',item:out};
      return null;
    } else {
      const shelf=STATIONS.find(s=>s.type==='shelf'&&s.unlocked&&s.item===w.carry.type&&s._obj.stock<shelfCap(s));
      if(shelf) return {st:shelf,action:'place',item:w.carry.type};
      return null;
    }
  }
  // juruwang
  const cs=STATIONS.find(x=>x.id==='counter');
  return {st:cs,action:'cashier',item:null};
}
function atWorkerTarget(w){
  const t=w.target; if(!t){w.state='idle';return;}
  if(w.role==='gardener'){
    if(t.action==='pick'){ const src=t.st; if(src._obj.stock>0){ const take=Math.min(src._obj.stock,workerCap('gardener')); src._obj.stock-=take; w.carry={type:t.st.item,count:take}; } }
    else if(t.action==='drop'){ const m=t.st._obj; if(!m.input[t.item]){ m.input[t.item]=(m.input[t.item]||0)+1; w.carry.count--; if(w.carry.count<=0)w.carry={type:null,count:0}; } }
  }
  else if(w.role==='producer'){
    if(t.action==='take'){ const m=t.st._obj; if(m.output>0){ m.output--; w.carry={type:machineDefs[t.st.id].output,count:1}; } }
    else if(t.action==='place'){ const shelf=t.st; if(shelf._obj.stock<shelfCap(shelf)){ shelf._obj.stock++; rebuildShelves(); w.carry.count--; if(w.carry.count<=0)w.carry={type:null,count:0}; } }
  }
  if(w.role==='cashier'){ /* juruwang kekal di kaunter */ }
  w.target=null; w.state='idle';
}

/* =========================== EVENTS / ORDERS =========================== */
function updateEvents(dt){
  if(state.event){ state.eventTime-=dt; if(state.eventTime<=0){ state.event=null; $('event-strip').hidden=true; } }
  else if(state.sales>4&&Math.random()<0.0012){
    const prods=desiredProducts(); if(prods.length){ state.event=prods[Math.floor(Math.random()*prods.length)]; state.eventTime=30; sfx('event');
      $('event-title').textContent='Permintaan viral: '+ITEMS[state.event].name+' ×2'; $('event-strip').hidden=false; }
  }
  if(state.event&&state.eventTime>0) $('event-timer').textContent=Math.ceil(state.eventTime)+'s';
}
function updateOrderUI(){
  if(state.areaMax>=3){ $('order-kicker').textContent='PENGHANTARAN NASIONAL'; $('order-title').textContent='Lori: '+state.nationalProgress+'/'+state.nationalTarget; $('order-count').textContent=''; $('order-strip').hidden=false; }
  else if(STATIONS.find(s=>s.id==='order').unlocked){ $('order-kicker').textContent='BORONG'; $('order-title').textContent='Kotak dibuat: '+state.boxes; $('order-count').textContent=''; $('order-strip').hidden=false; }
  else $('order-strip').hidden=true;
}
function checkEnding(){ if(state.nationalProgress>=state.nationalTarget&&!state.endingSeen){ state.endingSeen=true; save(); showEnding(); } }

/* =========================== PROMPT =========================== */
const promptObj={title:'',copy:'',icon:'◆',meter:-1};
function setPrompt(t,c,ic,m){ promptObj.title=t;promptObj.copy=c;promptObj.icon=ic;promptObj.meter=m==null?-1:m; }
function clearPrompt(){ promptObj.show=false; }
function renderPrompt(){ const p=$('prompt'); if(promptObj.show||currentStation){ p.hidden=false; $('prompt-title').textContent=promptObj.title; $('prompt-copy').textContent=promptObj.copy; $('prompt-icon').textContent=promptObj.icon; $('prompt-fill').style.width=Math.max(0,(promptObj.meter*100))+'%'; } else p.hidden=true; }

/* =========================== ANIMATION HELPERS =========================== */
function moodBubble(c,ic){ const el=document.createElement('div'); el.textContent=ic; el.className='toast'; el.style.position='fixed'; const p=c.mesh.position.clone().project(camera); const r=canvas.getBoundingClientRect(); el.style.left=((p.x+1)/2*r.width)+'px'; el.style.top=((-p.y+1)/2*r.height)+'px'; el.style.transform='translate(-50%,-140%)'; document.body.appendChild(el); el.animate([{opacity:1,transform:'translate(-50%,-140%)'},{opacity:0,transform:'translate(-50%,-220%)'}],{duration:1400}).onfinish=()=>el.remove(); }

/* =========================== UI / SHOP / MAP =========================== */
let shopTab='up';
function buildUpgradeList(){
  const el=$('list-upgrades'); el.innerHTML='';
  const items=[
    {k:'capacity',icon:'🎒',name:'Kapasiti Beg',desc:'Bawa lebih banyak barang sekali',lvl:state.capacityLevel},
    {k:'speed',icon:'👟',name:'Kelajuan Gerak',desc:'Bergerak lebih pantas',lvl:state.speedLevel},
    {k:'machineSpeed',icon:'⚡',name:'Mesin Laju',desc:'Kuali & mesin memproses lebih cepat',lvl:state.machineSpeedLevel},
    {k:'machineBatch',icon:'📦',name:'Muatan Besar',desc:'Mesin hasilkan banyak produk sekaligus',lvl:state.machineBatchLevel},
    {k:'workerSpeed',icon:'👷',name:'Pekerja Cekap',desc:'Pekerja bergerak & kerja lebih laju',lvl:state.workerSpeedLevel},
    {k:'shelf',icon:'🗄️',name:'Rak Luas',desc:'Semua rak muat lebih banyak stok',lvl:state.shelfLevel}
  ];
  items.forEach(it=>{
    const cost=costOf(it.k); const max=COSTS[it.k].length; const card=document.createElement('button'); card.className='upgrade-card';
    if(cost==null){ card.classList.add('maxed'); card.innerHTML=`<div class="uc-icon" style="background:#1d5c46">✔</div><div class="uc-body"><strong>${it.name}</strong><span>${it.desc}</span></div><div class="uc-lvl">MAKS</div>`; card.disabled=true; }
    else { const can=state.money>=cost;
      card.innerHTML=`<div class="uc-icon" style="background:${can?'#2d8551':'#3a3f3a'}">${it.icon}</div><div class="uc-body"><strong>${it.name}</strong><span>${it.desc}</span><div class="uc-sub"><div class="tier-dots">${Array(max).fill().map((_,i)=>`<i class="${i<it.lvl?'on':''}"></i>`).join('')}</div></div></div><div class="uc-cost">RM${cost}</div>`;
      if(!can) card.classList.add('dim');
      card.onclick=()=>{ if(state.money>=cost){ spend(cost); state[it.k+'Level']++; if(it.k==='capacity')state.capacity=3+state.capacityLevel; sfx('buy'); buildUpgradeList(); buildStaffList(); updateCarryVisual(); rebuildShelves(); save(); } };
    }
    el.appendChild(card);
  });
  $('shop-money').textContent=formatMoney(state.money);
}
function buildStaffList(){
  const el=$('list-staff'); el.innerHTML='';
  const roles=[['gardener','Pekebun','Kutip cili/bilis & hantar ke mesin','🌱',90],['producer','Pembantu Dapur','Ambil produk siap & isi rak','🍳',150],['cashier','Juruwang','Teruskan pelanggan bayar di kaunter','💵',70]];
  roles.forEach(([r,name,desc,icon,cost])=>{
    const hired=state.workersHired[r]; const card=document.createElement('button'); card.className='upgrade-card'+(hired?' maxed':'');
    card.innerHTML=`<div class="uc-icon" style="background:${hired?'#1d5c46':'#2d8551'}">${icon}</div><div class="uc-body"><strong>${name}</strong><span>${desc}</span><div class="uc-sub"><div class="tier-dots">${Array(3).fill().map((_,i)=>`<i class="${i<state.workerLevels[r]?'on':''}"></i>`).join('')}</div></div></div>${hired?'<div class="uc-lvl">AKTI</div>':'<div class="uc-cost">RM'+cost+'</div>'}`;
    if(!hired){ card.onclick=()=>{ if(state.money>=cost){ spend(cost); hireWorker(r); buildStaffList(); $('shop-money').textContent=formatMoney(state.money); } }; }
    el.appendChild(card);
  });
}
function buildMap(){
  const areas=$('list-areas'); areas.innerHTML='';
  AREAS.forEach((a,i)=>{ const g=STATIONS.find(s=>s.type==='gate'&&s.area===i); const un=i<=state.areaMax;
    const d=document.createElement('div'); d.className='area-item'+(un?'':' locked');
    d.innerHTML=`<div class="ai-icon" style="background:${a.color}">${un?'✓':'🔒'}</div><div class="ai-body"><strong>${a.name}</strong><span>${un?'Sudah dibuka':(g?'Kos RM'+g.cost+' · ★'+g.repReq:'Terkunci')}</span></div>${un?'<div class="ai-unlock">BUKA</div>':''}`; areas.appendChild(d); });
  const prods=$('list-products'); prods.innerHTML='';
  desiredProducts().forEach(p=>{ const s=STATIONS.find(x=>x.type==='shelf'&&x.item===p); if(!s)return; const d=document.createElement('div'); d.className='prod-item'; d.innerHTML=`<div class="pi-icon" style="background:${ITEMS[p].color}">·</div><div class="ai-body"><strong>${ITEMS[p].name}</strong><span>RM${ITEMS[p].price} · rak ${s._obj.stock}/${shelfCap(s)}</span></div>`; prods.appendChild(d); });
  $('empire-name').textContent=AREAS[state.areaMax].name;
  const prog=calcEmpire(); $('empire-fill').style.width=prog+'%'; $('empire-pct').textContent=prog+'%';
  $('s-sales').textContent='RM'+formatMoney(state.totalEarned); $('s-happy').textContent=state.happy; $('s-made').textContent=state.produced;
  $('s-staff').textContent=Object.values(state.workersHired).filter(Boolean).length;
}
function calcEmpire(){ const scores=[0,20,45,75]; let b=scores[Math.min(state.areaMax,3)]; b+=Math.min(25,Math.floor(state.totalBoxes/2)); return Math.min(100,b); }
function snapHud(){
  $('money').textContent=formatMoney(state.money); $('rep').textContent=state.rep;
  $('carry-count').textContent=state.inventory?state.inventory.count:0; $('carry-max').textContent=state.capacity;
  missionInfo(); $('zone-chip').textContent=AREAS[state.areaMax].name;
  if($('shop').classList.contains('is-hidden')===false) $('shop-money').textContent=formatMoney(state.money);
}
function formatMoney(n){ return n.toLocaleString('ms-MY'); }

function addRepSilently(n){ state.rep+=n; }

/* =========================== OVERLAYS =========================== */
function showSheet(id){ ['start','pause','how','shop','map','confirm','ending','offline'].forEach(x=>$(x).classList.add('is-hidden')); $(id).classList.remove('is-hidden'); }
function hideSheet(id){ $(id).classList.add('is-hidden'); }
let paused=false;
function togglePause(){
  if(!started&&!running) return; paused=!paused;
  if(paused){ $('p-money').textContent='RM'+formatMoney(state.money); $('p-sales').textContent='RM'+formatMoney(state.totalEarned); $('p-staff').textContent=Object.values(state.workersHired).filter(Boolean).length; showSheet('pause'); musicStop(); }
  else { hideSheet('pause'); if(state.music)musicStart(); }
}

function bindUI(){
  $('btn-start').onclick=startGame; $('btn-continue').onclick=startGame;
  $('btn-how').onclick=()=>{showSheet('how');}; $('how-close').onclick=()=>hideSheet('how'); $('how-scrim').onclick=()=>hideSheet('how'); $('how-ok').onclick=()=>hideSheet('how');
  $('btn-shop').onclick=()=>{ showSheet('shop'); buildUpgradeList(); buildStaffList(); };
  $('shop-close').onclick=()=>hideSheet('shop'); $('shop-scrim').onclick=()=>hideSheet('shop');
  $('tab-up').onclick=()=>{shopTab='up';$('tab-up').classList.add('is-on');$('tab-staff').classList.remove('is-on');$('list-upgrades').classList.remove('is-hidden');$('list-staff').classList.add('is-hidden');};
  $('tab-staff').onclick=()=>{shopTab='staff';$('tab-staff').classList.add('is-on');$('tab-up').classList.remove('is-on');$('list-staff').classList.remove('is-hidden');$('list-upgrades').classList.add('is-hidden');};
  $('btn-map').onclick=()=>{ showSheet('map'); buildMap(); }; $('map-close').onclick=()=>hideSheet('map'); $('map-scrim').onclick=()=>hideSheet('map');
  $('btn-pause').onclick=togglePause; $('btn-resume').onclick=togglePause;
  $('tg-music').onclick=e=>{ state.music=!state.music; $(e.currentTarget).classList.toggle('is-on'); state.music?musicStart():musicStop(); };
  $('tg-sfx').onclick=e=>{ state.sfx=!state.sfx; $(e.currentTarget).classList.toggle('is-on'); };
  $('tg-quality').onclick=e=>{ state.quality=!state.quality; $(e.currentTarget).classList.toggle('is-on'); renderer.setPixelRatio(state.quality?Math.min(devicePixelRatio,1.6):1); };
  $('btn-reset').onclick=()=>showSheet('confirm'); $('confirm-yes').onclick=resetAll; $('confirm-no').onclick=()=>hideSheet('confirm');
  $('end-close').onclick=()=>hideSheet('ending'); $('offline-ok').onclick=()=>hideSheet('offline');
  $('btn-pause').style.display='';
}

/* =========================== ENDING / OFFLINE =========================== */
function showEnding(){
  $('e-sales').textContent='RM'+formatMoney(state.totalEarned); $('e-happy').textContent=state.happy; $('e-rep').textContent=state.rep;
  $('ending').classList.remove('is-hidden'); confetti();
}
function computeOffline(){
  if(saved&&saved.lastSave){ const away=Math.min(12,(Date.now()-saved.lastSave)/60000); const hasW=Object.values(state.workersHired).some(Boolean);
    if(away>1&&hasW){ const earn=Math.floor(away*3*(state.areaMax+1)); if(earn>0){ $('offline-amount').textContent=formatMoney(earn); showSheet('offline'); state.money+=earn; state.totalEarned+=earn; snapHud(); } } }
}

/* =========================== START =========================== */
let running=false, started=false;
function startGame(){
  if(running) return; running=true;
  audio(); sfx('build');
  if(!started){ started=true;
    $('loading').classList.add('is-hidden'); $('start').classList.add('is-hidden');
    if(saved&&saved.v===1){ loadSaved(); } else { state=defaultState(); state.money=30; STATIONS.forEach(s=>{ s.unlocked=(s.area<=0); }); }
    rebuildShelves(); updateCarryVisual();
    camera.position.set(player.position.x-camDir.x*camDist,camHeight,player.position.z-camDir.z*camDist); camera.lookAt(player.position.x,0.5,player.position.z);
    bindUI(); computeOffline(); if(state.music)musicStart(); snapHud(); updateOrderUI();
  } else { $('start').classList.add('is-hidden'); }
  // tutup semua overlay yang tinggal
  ['how','shop','map','pause','confirm','ending','offline'].forEach(x=>$(x).classList.add('is-hidden'));
}

/* =========================== CONFETTI =========================== */
function confetti(){ for(let i=0;i<26;i++){ const el=document.createElement('div'); el.style.cssText='position:fixed;left:50%;top:40%;width:10px;height:10px;z-index:45;border-radius:2px;pointer-events:none;background:'+['#d9362b','#ffd447','#f49a25','#4fae6d','#ffd15c'][i%5]; document.body.appendChild(el); const ang=Math.random()*Math.PI*2,sp=60+Math.random()*80; el.animate([{transform:'translate(-50%,-50%)',opacity:1},{transform:`translate(${Math.cos(ang)*sp-50}px,${120+Math.sin(ang)*sp}px) rotate(360deg)`,opacity:0}],{duration:1100,easing:'ease-out'}).onfinish=()=>el.remove(); } }

/* =========================== LOOP =========================== */
const clock=new THREE.Clock();
let loadFlash=0;
function animate(){
  requestAnimationFrame(animate);
  const dt=Math.min(clock.getDelta(),0.05);
  if(loadFlash<1){ loadFlash+=dt*0.5; $('load-fill').style.width=(loadFlash*100)+'%'; }
  if(!running||paused){ renderer.render(scene,camera); return; }
  movePlayer(dt);
  if(!state.tutorialDone) evalTutorial();
  updateMachines(dt); massageMachines();
  playerInteract(dt);
  updateCustomers(dt); serveQueues(dt);
  updateWorkers(dt);
  updateEvents(dt);
  custSpawnT-=dt; if(custSpawnT<=0){ custSpawnT=2.2; spawnCustomer(); }
  updateCamera(dt);
  autosave(dt);
  snapHud(); renderPrompt();
  renderer.render(scene,camera);
}

/* =========================== INIT =========================== */
function onResize(){ const w=window.innerWidth,h=window.innerHeight; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); }
function init(){
  buildAllStations(); rebuildShelves();
  camera.position.set(player.position.x-camDir.x*camDist-2,camHeight+1,player.position.z-camDir.z*camDist); camera.lookAt(player.position.x,0.5,player.position.z);
  window.addEventListener('resize',onResize); onResize();
  const rot=['Menumbuk cili kering','Panaskan minyak','Potong bawang','Petik cili segar','Kisar pes cili']; let ri=0;
  setInterval(()=>{ if(!running){ $('load-copy').textContent=rot[++ri%rot.length]; } },900);
  animate();
}
init();