import * as THREE from './three.module.min.js';

const $ = (id) => document.getElementById(id);
const canvas = $('game');
const SAVE_KEY = 'empayar-sambal-bilis:v3';
const IS_TOUCH = matchMedia('(pointer: coarse)').matches;
const COLORS = { ink:0x071b18, cream:0xfff7df, red:0xd9362b, darkRed:0x86151b, orange:0xf49a25, yellow:0xffd447, green:0x2d8551, grass:0x83bd78, wood:0x9b612e, steel:0xb8c5c0, blue:0x4f92a6 };
const ITEMS = {
  chili:{name:'Cili segar',icon:'◆',color:0xe63a2d,shape:'chili'}, bilis:{name:'Ikan bilis',icon:'≋',color:0xc7d3cb,shape:'bilis'},
  paste:{name:'Pes cili',icon:'●',color:0xb51c24,shape:'bowl'}, sambal:{name:'Sambal klasik',icon:'●',color:0xa91e1f,shape:'pot'},
  jarClassic:{name:'Balang klasik',icon:'▥',color:0xd43b27,shape:'jar',price:5}, petai:{name:'Petai',icon:'●',color:0x57a844,shape:'petai'},
  sambalPetai:{name:'Sambal petai',icon:'●',color:0x6c8f2f,shape:'pot'}, jarPetai:{name:'Balang petai',icon:'▥',color:0x6c9b3f,shape:'jar',price:9},
  dryChili:{name:'Cili kering',icon:'⌁',color:0xa91e1f,shape:'chili'}, onion:{name:'Bawang',icon:'●',color:0xd9a95e,shape:'onion'},
  garing:{name:'Sambal garing',icon:'✦',color:0xb76622,shape:'bowl'}, packGaring:{name:'Pek garing',icon:'▰',color:0xe09235,shape:'pack',price:12}, box:{name:'Kotak borong',icon:'▣',color:0xa56a2d,shape:'box'}
};

const defaultState = () => ({
  version:3,money:0,rep:0,totalEarned:0,area:0,capacity:3,speedLevel:0,machineLevel:0,shelfLevel:0,workerLevel:0,
  inventory:{type:null,count:0},workers:[],tutorial:0,sales:0,happy:0,unhappy:0,produced:0,streak:0,
  counts:{},wholesale:{active:false,progress:0,target:6,done:false},national:{active:false,progress:0,target:12,done:false},
  event:null,eventTime:0,lastSave:0,music:true,sfx:true,endingSeen:false
});
let state = defaultState();
let savedSnapshot = null;
try { savedSnapshot = JSON.parse(localStorage.getItem(SAVE_KEY)); } catch (_) {}
if (savedSnapshot?.version === 3) $('continue-btn').classList.remove('hidden');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa7d6bc);
scene.fog = new THREE.Fog(0xa7d6bc,26,58);
const camera = new THREE.PerspectiveCamera(IS_TOUCH ? 43 : 38,1,.1,120);
const renderer = new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance',alpha:false});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.55));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

scene.add(new THREE.HemisphereLight(0xfff1d2,0x315d49,2.05));
const sun = new THREE.DirectionalLight(0xfff1cf,3.2); sun.position.set(-12,24,12); sun.castShadow=true; sun.shadow.mapSize.set(1024,1024); sun.shadow.camera.left=-20;sun.shadow.camera.right=20;sun.shadow.camera.top=20;sun.shadow.camera.bottom=-20; scene.add(sun);
const ambientWarm = new THREE.PointLight(0xffb141,0,18); ambientWarm.position.set(10,5,0); scene.add(ambientWarm);

const mats = {};
function mat(color, rough=.82, metal=0){ const key=`${color}-${rough}-${metal}`; return mats[key] ||= new THREE.MeshStandardMaterial({color,roughness:rough,metalness:metal}); }
function mesh(geo,material,x=0,y=0,z=0,cast=true){ const m=new THREE.Mesh(geo,material);m.position.set(x,y,z);m.castShadow=cast;m.receiveShadow=true;return m; }
function box(w,h,d,color,x=0,y=h/2,z=0,bevel=false){ if(!bevel) return mesh(new THREE.BoxGeometry(w,h,d),mat(color),x,y,z); const g=new THREE.BoxGeometry(w,h,d,2,2,2); return mesh(g,mat(color),x,y,z); }
function cyl(r,h,color,x=0,y=h/2,z=0,segments=12){ return mesh(new THREE.CylinderGeometry(r,r,h,segments),mat(color),x,y,z); }
function labelSprite(title,sub='',accent='#d9362b',scale=1){
  const c=document.createElement('canvas');c.width=384;c.height=128;const g=c.getContext('2d');g.clearRect(0,0,c.width,c.height);
  g.fillStyle='rgba(7,27,24,.88)';roundRect(g,6,6,372,112,24);g.fill();g.fillStyle=accent;roundRect(g,6,6,13,112,7);g.fill();
  g.textAlign='left';g.fillStyle='#fff9e9';g.font='800 35px DM Sans, sans-serif';g.fillText(title,38,57);g.fillStyle='#ffd46a';g.font='700 21px DM Sans, sans-serif';g.fillText(sub,38,92);
  const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false}));s.scale.set(3.6*scale,1.2*scale,1);s.userData.canvas=c;s.userData.ctx=g;s.userData.title=title;s.userData.accent=accent;return s;
}
function updateLabel(s,sub){ const c=s.userData.canvas,g=s.userData.ctx;g.clearRect(0,0,c.width,c.height);g.fillStyle='rgba(7,27,24,.88)';roundRect(g,6,6,372,112,24);g.fill();g.fillStyle=s.userData.accent;roundRect(g,6,6,13,112,7);g.fill();g.fillStyle='#fff9e9';g.font='800 35px DM Sans, sans-serif';g.fillText(s.userData.title,38,57);g.fillStyle='#ffd46a';g.font='700 21px DM Sans, sans-serif';g.fillText(sub,38,92);s.material.map.needsUpdate=true; }
function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r)}
function textFloat(text,pos,color='#fff7d5'){ const s=labelSprite(text,'',color,.58);s.position.copy(pos).add(new THREE.Vector3(0,2,0));scene.add(s);floaters.push({obj:s,life:1.15}); }

const zones=[],stations=[],workers=[],customers=[],particles=[],floaters=[]; let player,tutorialArrow,clock=new THREE.Clock(),running=false,paused=false,focus=null,spawnTimer=3,saveTimer=0,eventCooldown=42,endingTimer=0;
const stationById = (id) => stations.find(s=>s.id===id);

function createItem(type,small=false){
  const d=ITEMS[type],g=new THREE.Group(),s=small?.7:1;
  if(d.shape==='jar'){ const body=cyl(.23*s,.48*s,d.color,0,.24*s,0,10); body.material=mat(d.color,.35);g.add(body,cyl(.25*s,.09*s,0xf3c14b,0,.52*s,0,10)); const lab=cyl(.237*s,.16*s,0xfff0c9,0,.27*s,0,10);g.add(lab); }
  else if(d.shape==='chili'){const m=mesh(new THREE.CapsuleGeometry(.1*s,.42*s,3,7),mat(d.color),0,.18*s,0);m.rotation.z=1.05;g.add(m);const stem=box(.06*s,.16*s,.06*s,0x2e7d42,.25*s,.2*s,0);stem.rotation.z=.8;g.add(stem)}
  else if(d.shape==='bilis'){for(let i=0;i<3;i++){const f=mesh(new THREE.ConeGeometry(.09*s,.36*s,5),mat(d.color,.35,.25),(i-1)*.13*s,.12*s,(i%2)*.07*s);f.rotation.z=Math.PI/2;g.add(f)}}
  else if(d.shape==='petai'){for(let i=0;i<3;i++)g.add(cyl(.11*s,.08*s,d.color,(i-1)*.17*s,.05*s,0,8))}
  else if(d.shape==='onion'){g.add(mesh(new THREE.SphereGeometry(.24*s,9,7),mat(d.color),0,.23*s,0));g.add(mesh(new THREE.ConeGeometry(.08*s,.18*s,6),mat(0x6a9844),0,.52*s,0))}
  else if(d.shape==='pack'){const p=box(.46*s,.55*s,.13*s,d.color,0,.28*s,0);p.rotation.z=.04;g.add(p);g.add(box(.3*s,.18*s,.14*s,0xffe2a4,0,.29*s,.005*s))}
  else if(d.shape==='box'){g.add(box(.55*s,.42*s,.48*s,d.color,0,.21*s,0));g.add(box(.06*s,.43*s,.49*s,0xe6bb65,0,.43*s,0))}
  else {g.add(cyl(.3*s,.18*s,d.color,0,.09*s,0,10));const top=mesh(new THREE.SphereGeometry(.22*s,8,5),mat(d.color),0,.19*s,0);top.scale.y=.35;g.add(top)}
  g.userData.type=type;return g;
}

function makeGround(){
  const ocean=mesh(new THREE.PlaneGeometry(110,80),mat(0x78bfa5),15,-.1,0,false);ocean.rotation.x=-Math.PI/2;scene.add(ocean);
  const zoneDefs=[
    {name:'Dapur Rumah',x:-4.5,w:18,color:0xe9c88f},{name:'Gerai Pasar Malam',x:10,w:11,color:0x537a50},
    {name:'Bengkel Pengeluaran',x:21.5,w:12,color:0x9e9b83},{name:'Kilang Sambal',x:36,w:17,color:0x8b908c}
  ];
  zoneDefs.forEach((z,i)=>{const group=new THREE.Group();group.name=z.name;const floor=mesh(new THREE.BoxGeometry(z.w,.32,15),mat(z.color),z.x,0,0);floor.receiveShadow=true;group.add(floor);zones.push(group);scene.add(group);if(i>0)group.visible=false});
  // Dapur rumah, atap zink, kebun dan sentuhan kampung.
  const home=zones[0]; home.add(box(7,.18,6,0xe6d5ae,-2,.28,0),box(.25,3.3,.25,0x724525,-5,1.8,-2.6),box(.25,3.3,.25,0x724525,1,1.8,-2.6));
  const roof=box(7.5,.22,4.2,0x7f9d9a,-2,3.45,-1.1);roof.rotation.z=-.06;home.add(roof);
  home.add(box(6,.12,.14,0xb64a32,-2,3.61,-1.1));
  for(let z=-4;z<=4;z+=1.5)home.add(box(2.2,.32,1,0x7a4c28,-7.2,.32,z));
  for(let i=0;i<10;i++){const b=new THREE.Group();b.add(cyl(.05,.65,0x2d7340,0,.32,0,7));for(let j=0;j<3;j++){const fruit=createItem('chili',true);fruit.scale.setScalar(.42);fruit.position.set((j-1)*.15,.45+j*.08,0);b.add(fruit)}b.position.set(-7.2+(i%2-.5)*.7,.55,-4+Math.floor(i/2)*1.5);home.add(b)}
  // Pasar malam.
  const market=zones[1];for(const x of [6.2,13.5])for(const z of [-4.8,4.8])market.add(box(.15,3.3,.15,0x614229,x,1.7,z));
  const tent=box(8.4,.18,10.5,0xef4a38,10,3.45,0);tent.rotation.z=.03;market.add(tent);for(let i=0;i<6;i++)market.add(box(1.05,.21,10.55,i%2?0xffd05b:0xe84534,7.35+i*1.05,3.58,0));
  for(let i=0;i<9;i++){const bulb=cyl(.07,.11,i%2?0xffd447:0xff775d,6.2+i*.9,3.08,-4.7,7);market.add(bulb)}
  // Bengkel.
  const workshop=zones[2];workshop.add(box(10,.18,13,0x687a78,21.5,3.7,0));for(const x of [17,26])for(const z of [-5.5,5.5])workshop.add(box(.25,3.6,.25,0x3e4b49,x,1.85,z));
  workshop.add(box(9,.12,.15,0xe9a228,21.5,3.86,0));
  // Kilang.
  const factory=zones[3];factory.add(box(15,.25,14,0x546766,36,4.1,0));for(const x of [29.5,42.5])for(const z of [-6,6])factory.add(box(.32,4,.32,0x344745,x,2.05,z));
  for(let i=0;i<3;i++){factory.add(cyl(.72,2.6,0xb9c5bd,33+i*3,1.5,-3.8,14));factory.add(cyl(.76,.25,0xd64636,33+i*3,2.9,-3.8,14))}
  // Pokok tropika di pinggir.
  for(let x=-12;x<46;x+=5.8){const z=(Math.sin(x)*.5+.5)>0.5?8.5:-8.5;const tree=new THREE.Group();tree.add(cyl(.18,2,0x73502c,0,1,0,8));for(let i=0;i<5;i++){const leaf=mesh(new THREE.SphereGeometry(.58,7,5),mat(0x317b4e),Math.cos(i*1.25)*.55,2+Math.sin(i)*.14,Math.sin(i*1.25)*.55);leaf.scale.set(1.3,.5,.7);tree.add(leaf)}tree.position.set(x,0,z);scene.add(tree)}
}

class Station {
  constructor(o){Object.assign(this,o);this.inputs={};this.output=0;this.progress=0;this.processing=false;this.outputCap=o.outputCap||3;this.stock=o.stock||0;this.group=new THREE.Group();this.group.position.set(o.x,0,o.z);this.group.userData.station=this;this.ring=mesh(new THREE.RingGeometry(o.radius||1.05,(o.radius||1.05)+.09,32),new THREE.MeshBasicMaterial({color:o.color||COLORS.yellow,transparent:true,opacity:.62,side:THREE.DoubleSide}),0,.035,0,false);this.ring.rotation.x=-Math.PI/2;this.group.add(this.ring);this.build();this.label=labelSprite(o.name,o.sub||'',o.accent||'#e49b25',.78);this.label.position.set(0,2.35,0);this.group.add(this.label);scene.add(this.group);stations.push(this)}
  build(){
    const c=this.color||COLORS.orange;
    if(this.kind==='source'){this.group.add(cyl(.78,.62,0x8e5b30,0,.31,0,12));for(let i=0;i<5;i++){const it=createItem(this.type,true);it.position.set(Math.cos(i*1.7)*.38,.64+Math.floor(i/3)*.2,Math.sin(i*1.7)*.32);it.rotation.y=i;this.group.add(it)}}
    else if(this.kind==='shelf'){this.group.add(box(1.7,.15,.72,0x7b4b29,0,.35,0),box(1.7,.15,.72,0x7b4b29,0,1.05,0),box(.14,1.25,.75,0x53341e,-.78,.65,0),box(.14,1.25,.75,0x53341e,.78,.65,0));this.stockGroup=new THREE.Group();this.group.add(this.stockGroup)}
    else if(this.kind==='counter'){this.group.add(box(1.9,1,.8,0x754526,0,.5,0),box(2.05,.12,.92,0xf0c16a,0,1.05,0));this.coinGroup=new THREE.Group();this.group.add(this.coinGroup)}
    else if(this.kind==='storage'){this.group.add(box(1.8,.9,1.15,0xb47737,0,.45,0),box(1.9,.12,1.2,0xe7bd6d,0,.94,0));this.storage={}}
    else if(this.kind==='trash'){this.group.add(cyl(.58,.9,0x477367,0,.45,0,10));this.group.add(cyl(.64,.12,0xe8bf55,0,.96,0,10))}
    else if(this.kind==='unlock'){this.group.add(cyl(1,.14,0xffd447,0,.1,0,24));this.group.add(mesh(new THREE.TorusGeometry(.74,.1,8,28),mat(0xe33d2f),0,.24,0));this.group.children.at(-1).rotation.x=Math.PI/2}
    else if(this.kind==='wholesale'){this.group.add(box(1.5,.55,1.1,0x9b632f,0,.3,0));this.group.add(box(.18,.58,1.12,0xeac56c,0,.59,0));const sign=box(1.8,.8,.12,0x315c4f,0,1.5,-.45);this.group.add(sign)}
    else if(this.kind==='factory'){this.group.add(box(2.7,.55,1.3,0x4e6966,0,.3,0));for(let i=-1;i<=1;i++)this.group.add(cyl(.28,.42,i===0?0xd43b2d:0xe2aa3e,i*.72,.78,0,12));this.type='jarClassic';this.factoryTimer=1}
    else { // Mesin low-poly.
      this.group.add(box(1.45,.7,1.15,0x4e615d,0,.38,0));this.group.add(cyl(.53,.68,c,0,1.02,0,12));this.group.add(cyl(.58,.12,0x243b37,0,1.4,0,12));if(this.kind==='wok'||this.kind==='fryer'){const bowl=mesh(new THREE.SphereGeometry(.72,14,7,0,Math.PI*2,0,Math.PI/2),mat(0x303b39,.3,.5),0,1.1,0);bowl.rotation.x=Math.PI;this.group.add(bowl)}
      this.progressBar=box(1.15,.12,.11,0x6e817b,0,1.85,0);this.fillBar=box(1.1,.08,.13,0xffd447,-.55,1.85,-.02);this.fillBar.geometry.translate(.55,0,0);this.fillBar.scale.x=0;this.group.add(this.progressBar,this.fillBar);
    }
  }
  isVisible(){return this.area<=state.area}
  recipe(){if(!this.recipes)return null;return this.recipes.find(r=>Object.entries(r.inputs).every(([t,n])=>(this.inputs[t]||0)>=n) && (!this.outputType||this.output===0||this.outputType===r.output))}
  canAccept(type){if(this.kind==='shelf')return type===this.type && this.stock<this.capacity();if(this.kind==='storage')return true;if(this.kind==='trash')return true;if(this.kind==='wholesale')return this.accepts.includes(type) && this.progressTarget()<this.target;if(!this.recipes)return false;if(this.output>=this.outputCap)return false;return this.recipes.some(r=>r.inputs[type] && (this.inputs[type]||0)<r.inputs[type]*3 && (!this.outputType||this.output===0||this.outputType===r.output))}
  accept(type,qty=1){if(!this.canAccept(type))return 0;if(this.kind==='shelf'){const n=Math.min(qty,this.capacity()-this.stock);this.stock+=n;this.renderStock();audio.play('place');return n}if(this.kind==='storage'){this.storage[type]=(this.storage[type]||0)+qty;audio.play('place');return qty}if(this.kind==='trash'){state.money+=Math.max(1,Math.floor(qty/2));toast(`Lebihan dikitar semula +RM${Math.max(1,Math.floor(qty/2))}`);return qty}if(this.kind==='wholesale'){const n=Math.min(qty,this.target-this.progressTarget());if(this.id==='nationalVan')state.national.progress+=n;else state.wholesale.progress+=n;this.refresh();audio.play('place');if(this.id==='wholesale'&&state.wholesale.progress>=state.wholesale.target)completeWholesale();if(this.id==='nationalVan'&&state.national.progress>=state.national.target)completeNational();return n}this.inputs[type]=(this.inputs[type]||0)+qty;audio.play('place');this.refresh();return qty}
  takeOutput(max=1){if(this.kind==='shelf'){const n=Math.min(max,this.stock);this.stock-=n;this.renderStock();return n}if(this.kind==='storage'){const t=Object.keys(this.storage).find(k=>this.storage[k]>0);if(!t)return {type:null,count:0};const n=Math.min(max,this.storage[t]);this.storage[t]-=n;return {type:t,count:n}}if(this.kind==='factory'){if(this.output<1)return 0;const n=Math.min(max,this.output);this.output-=n;return n}if(this.output<1)return 0;const n=Math.min(max,this.output);this.output-=n;this.refresh();return n}
  capacity(){return (this.cap||4)+state.shelfLevel*2}
  progressTarget(){return this.id==='nationalVan'?state.national.progress:state.wholesale.progress}
  update(dt){if(!this.isVisible())return;if(this.kind==='factory'){this.factoryTimer-=dt;if(this.factoryTimer<=0&&this.output<this.outputCap){const opts=['jarClassic','jarPetai','packGaring'];this.type=opts[Math.floor(Math.random()*opts.length)];this.output++;this.factoryTimer=Math.max(1.1,3.2-state.machineLevel*.35);this.refresh()}return}if(!this.recipes)return;const recipe=this.recipe();if(recipe&&this.output<this.outputCap){this.processing=true;this.progress+=dt*(1+state.machineLevel*.18);const dur=recipe.duration;if(this.fillBar)this.fillBar.scale.x=Math.min(1,this.progress/dur);if((this.kind==='wok'||this.kind==='fryer')&&Math.random()<dt*7)particle(this.group.position.clone().add(new THREE.Vector3((Math.random()-.5)*.5,1.35,(Math.random()-.5)*.5)),0xf1d0a0,'smoke');if(this.progress>=dur){Object.entries(recipe.inputs).forEach(([t,n])=>this.inputs[t]-=n);this.outputType=recipe.output;this.output++;this.progress=0;state.produced++;state.counts[recipe.output]=(state.counts[recipe.output]||0)+1;audio.play(this.kind==='packer'?'pack':'cook');burst(this.group.position.clone().add(new THREE.Vector3(0,1.2,0)),ITEMS[recipe.output].color,6);this.refresh()}}else{this.processing=false;this.progress=0;if(this.fillBar)this.fillBar.scale.x=0}}
  renderStock(){if(!this.stockGroup)return;this.stockGroup.clear();for(let i=0;i<this.stock;i++){const it=createItem(this.type,true);it.scale.setScalar(.76);it.position.set((i%4-1.5)*.34,.48+Math.floor(i/4)*.68,(i%2-.5)*.22);this.stockGroup.add(it)}this.refresh()}
  refresh(){let sub=this.sub||'';if(this.kind==='source')sub='Bekalan tanpa had';else if(this.kind==='shelf')sub=`Stok ${this.stock}/${this.capacity()}`;else if(this.kind==='counter')sub=`Wang menunggu RM${Math.floor(pendingCash)}`;else if(this.kind==='storage')sub=`Simpan / ambil bahan`;else if(this.kind==='wholesale')sub=`${this.progressTarget()}/${this.target} • ${this.reward||'Penamat'}`;else if(this.kind==='factory')sub=`Produk siap ${this.output}/${this.outputCap}`;else if(this.recipes){const inputCount=Object.values(this.inputs).reduce((a,b)=>a+b,0);sub=this.output?`Siap ${this.output}/${this.outputCap}`:this.processing?`Memproses ${Math.floor(this.progress/this.recipe()?.duration*100)||0}%`:`Bahan ${inputCount}`};updateLabel(this.label,sub)}
}

function addStation(o){const s=new Station(o);s.group.visible=o.area<=state.area;return s}
function buildStations(){
  addStation({id:'chili',name:'KEBUN CILI',kind:'source',type:'chili',x:-7,z:-2.8,area:0,color:COLORS.red,sub:'Petik cili'});
  addStation({id:'bilis',name:'BEKAS BILIS',kind:'source',type:'bilis',x:-7,z:3.3,area:0,color:0xbec9c5,sub:'Kutip bilis'});
  addStation({id:'grinder',name:'PENGISAR',kind:'machine',x:-3.7,z:-3.2,area:0,color:0xd84a35,recipes:[{inputs:{chili:1},output:'paste',duration:2.2}],outputCap:3});
  addStation({id:'wok',name:'KUALI WARISAN',kind:'wok',x:-3.1,z:2.4,area:0,color:0xef9429,recipes:[{inputs:{paste:1,bilis:1},output:'sambal',duration:3}],outputCap:3});
  addStation({id:'packer',name:'MEJA BALANG',kind:'packer',x:.2,z:-1,area:0,color:0xf1bc3e,recipes:[{inputs:{sambal:1},output:'jarClassic',duration:1.8},{inputs:{sambalPetai:1},output:'jarPetai',duration:2.2},{inputs:{garing:1},output:'packGaring',duration:2}],outputCap:5});
  addStation({id:'shelfClassic',name:'RAK KLASIK',kind:'shelf',type:'jarClassic',x:1,z:3.3,area:0,color:COLORS.red,cap:4});
  addStation({id:'counter',name:'KAUNTER',kind:'counter',x:3.2,z:4.1,area:0,color:COLORS.yellow,sub:'Kutip wang'});
  addStation({id:'storage',name:'MEJA SIMPANAN',kind:'storage',x:.4,z:-5.2,area:0,color:COLORS.wood});
  addStation({id:'trash',name:'KITAR SEMULA',kind:'trash',x:3,z:-5.1,area:0,color:COLORS.green,sub:'Kosongkan timbunan'});
  addStation({id:'unlockB',name:'BUKA GERAI',kind:'unlock',x:4.3,z:0,area:0,color:COLORS.yellow,sub:'RM30 • 6 ★',cost:30,rep:6,unlock:1});
  addStation({id:'petai',name:'BAKUL PETAI',kind:'source',type:'petai',x:7,z:-3.4,area:1,color:0x64a84b});
  addStation({id:'petaiWok',name:'KUALI PETAI',kind:'wok',x:10,z:-2.2,area:1,color:0x7b9d40,recipes:[{inputs:{sambal:1,petai:1},output:'sambalPetai',duration:5}],outputCap:3});
  addStation({id:'shelfPetai',name:'RAK PREMIUM',kind:'shelf',type:'jarPetai',x:12.5,z:3.2,area:1,color:0x6a9a3e,cap:4});
  addStation({id:'unlockC',name:'BUKA BENGKEL',kind:'unlock',x:15.2,z:0,area:1,color:COLORS.yellow,sub:'RM110 • 18 ★',cost:110,rep:18,unlock:2});
  addStation({id:'dryChili',name:'CILI KERING',kind:'source',type:'dryChili',x:18,z:-4.2,area:2,color:COLORS.darkRed});
  addStation({id:'onion',name:'BAKUL BAWANG',kind:'source',type:'onion',x:18,z:.2,area:2,color:0xd8a75a});
  addStation({id:'fryer',name:'PENGGORENG',kind:'fryer',x:21.3,z:-2,area:2,color:0xd77b27,recipes:[{inputs:{bilis:1,dryChili:1,onion:1},output:'garing',duration:6}],outputCap:4});
  addStation({id:'shelfGaring',name:'RAK SNEK',kind:'shelf',type:'packGaring',x:23.2,z:3.2,area:2,color:0xe09034,cap:5});
  addStation({id:'wholesale',name:'VAN BORONG',kind:'wholesale',accepts:['jarClassic'],x:26,z:-3.5,area:2,color:COLORS.wood,target:6,reward:'RM42'});
  addStation({id:'unlockD',name:'BINA KILANG',kind:'unlock',x:28.2,z:0,area:2,color:COLORS.yellow,sub:'RM260 • 38 ★',cost:260,rep:38,unlock:3});
  addStation({id:'factoryLine',name:'BARISAN AUTO',kind:'factory',x:33.5,z:0,area:3,color:COLORS.green,outputCap:6});
  addStation({id:'nationalVan',name:'PESANAN MALAYSIA',kind:'wholesale',accepts:['jarClassic','jarPetai','packGaring'],x:40,z:0,area:3,color:COLORS.red,target:12,reward:'Penamat'});
}

function createCharacter(color=0x277b55,shirt=0xffd447){
  const g=new THREE.Group();const body=mesh(new THREE.CapsuleGeometry(.34,.65,4,8),mat(shirt),0,.92,0);body.castShadow=true;g.add(body);const head=mesh(new THREE.SphereGeometry(.3,10,8),mat(color),0,1.62,0);g.add(head);const hair=mesh(new THREE.SphereGeometry(.31,9,5,0,Math.PI*2,0,Math.PI/2),mat(0x18241f),0,1.7,0);g.add(hair);for(const x of [-.2,.2])g.add(cyl(.09,.42,0x273b34,x,.28,0,7));const shadow=mesh(new THREE.CircleGeometry(.48,20),new THREE.MeshBasicMaterial({color:0x17372d,transparent:true,opacity:.23}),0,.015,0,false);shadow.rotation.x=-Math.PI/2;g.add(shadow);g.userData.stack=new THREE.Group();g.userData.stack.position.set(0,1.82,0);g.add(g.userData.stack);return g;
}
function buildPlayer(){player=createCharacter(0xb87950,0xe63a2d);player.position.set(-5.2,0,.4);scene.add(player)}
function renderCarry(actor,type,count){const stack=actor.userData.stack;stack.clear();if(!type)return;for(let i=0;i<count;i++){const it=createItem(type,true);it.scale.setScalar(.8);it.position.set((i%2-.5)*.18,i*.4,0);it.rotation.y=i*.8;stack.add(it)}}

class Worker {
  constructor(role){this.role=role;this.state='Cari Tugas';this.task=null;this.speed=2.15;this.carry=null;this.count=0;const cfg={gardener:[0x6d9d49,'PEKEBUN'],cook:[0xe58434,'PEMBANTU'],stocker:[0x4f89a3,'PENGISI RAK'],cashier:[0xb85c8d,'JURUWANG']}[role];this.group=createCharacter(0xa96f49,cfg[0]);this.group.position.copy(player.position).add(new THREE.Vector3((Math.random()-.5)*1.5,0,(Math.random()-.5)*1.5));const tag=labelSprite(cfg[1],'Cari Tugas','#ffd447',.48);tag.position.set(0,2.2,0);this.group.add(tag);this.tag=tag;scene.add(this.group);workers.push(this)}
  setState(v){if(this.state!==v){this.state=v;updateLabel(this.tag,v)}}
  chooseTask(){
    if(this.role==='cashier'){this.setState('Menjaga kaunter');this.task={idle:true};return}
    let options=[];
    if(this.role==='gardener')options=[['chili','grinder','chili'],['bilis','wok','bilis'],['petai','petaiWok','petai'],['dryChili','fryer','dryChili'],['onion','fryer','onion']];
    if(this.role==='cook')options=[['grinder','wok','paste'],['wok','petaiWok','sambal'],['wok','packer','sambal'],['petaiWok','packer','sambalPetai'],['fryer','packer','garing']];
    if(this.role==='stocker')options=[['packer','shelfClassic','jarClassic'],['packer','shelfPetai','jarPetai'],['packer','shelfGaring','packGaring']];
    options=options.filter(([a,b,t])=>{const from=stationById(a),to=stationById(b);if(!from||!to||!from.isVisible()||!to.isVisible()||!to.canAccept(t))return false;if(from.kind==='source')return true;if(from.kind==='shelf')return from.stock>0;return from.output>0&&from.outputType===t});
    options.sort((a,b)=>{const A=stationById(a[1]),B=stationById(b[1]);const pa=A.kind==='shelf'?(A.stock/A.capacity()):0,pb=B.kind==='shelf'?(B.stock/B.capacity()):0;return pa-pb});
    const choice=options.find(o=>!workers.some(w=>w!==this&&w.task?.key===o.join(':')))||options[0];if(!choice){this.setState('Tunggu');return}
    this.task={from:stationById(choice[0]),to:stationById(choice[1]),type:choice[2],phase:'pickup',key:choice.join(':')};this.setState('Bergerak → Kutip');
  }
  update(dt){if(this.role==='cashier'){const c=stationById('counter');if(c)this.moveTo(c.group.position,dt);return}if(!this.task){this.chooseTask();return}const target=this.task.phase==='pickup'?this.task.from:this.task.to;if(!target?.isVisible()){this.task=null;return}if(this.moveTo(target.group.position,dt)){
      if(this.task.phase==='pickup'){let got=0;if(target.kind==='source')got=1;else got=target.takeOutput(1);if(!got){this.task=null;this.setState('Cari Tugas');return}this.carry=this.task.type;this.count=got;renderCarry(this.group,this.carry,this.count);this.task.phase='deliver';this.setState('Hantar');audio.play('pickup')}
      else {const given=target.accept(this.carry,this.count);if(given){this.count-=given;if(!this.count){this.carry=null;renderCarry(this.group,null,0);this.task=null;this.setState('Cari Tugas')}}else{this.task=null;this.setState('Tunggu')}}
    }}
  moveTo(pos,dt){const v=new THREE.Vector3().subVectors(pos,this.group.position);v.y=0;const d=v.length();if(d<.65)return true;v.normalize();const step=Math.min(d,v.length()*this.speed*(1+state.workerLevel*.13)*dt);this.group.position.addScaledVector(v,step);this.group.rotation.y=Math.atan2(v.x,v.z);this.group.position.y=Math.abs(Math.sin(performance.now()*.009))*0.025;return false}
}

class Customer {
  constructor(type){this.type=type;this.state='enter';this.wait=0;this.queueId=0;this.group=createCharacter([0x8b593e,0xc4855d,0x5d382e,0xd3a077][Math.floor(Math.random()*4)],[0x4f8ba5,0x9e4c8b,0xe5a636,0x477e59,0xd55a45][Math.floor(Math.random()*5)]);this.group.scale.setScalar(.9);this.group.position.set(Math.max(3,state.area*10+3),0,7.7);this.shelf=stationById(type==='jarClassic'?'shelfClassic':type==='jarPetai'?'shelfPetai':'shelfGaring');this.bubble=labelSprite(ITEMS[type].name,'MAHU 1','#ffcf4b',.4);this.bubble.position.set(0,2.55,0);this.group.add(this.bubble);scene.add(this.group);customers.push(this)}
  update(dt){this.wait+=dt;if(this.state==='enter'){if(this.move(this.shelf.group.position,dt)){this.state='shelf';this.wait=0}}
    else if(this.state==='shelf'){if(this.shelf.stock>0){this.shelf.stock--;this.shelf.renderStock();this.group.remove(this.bubble);const carry=createItem(this.type,true);carry.position.set(0,1.9,0);this.group.add(carry);this.productMesh=carry;this.state='queue';this.queueId=++queueSerial;this.wait=0;audio.play('pickup')}else if(this.wait>12){this.leave(false)}}
    else if(this.state==='queue'){const q=customers.filter(c=>c.state==='queue').sort((a,b)=>a.queueId-b.queueId);const ix=q.indexOf(this);const counter=stationById('counter');const pos=counter.group.position.clone().add(new THREE.Vector3(0,0,1.4+ix*.82));if(this.move(pos,dt)&&ix===0){this.checkout=(this.checkout||0)+dt;if(this.checkout>checkoutDuration()){this.pay()}}}
    else if(this.state==='exit'){const out=new THREE.Vector3(Math.max(4,state.area*10+4),0,8.8);if(this.move(out,dt))this.destroy()}}
  move(pos,dt){const v=new THREE.Vector3().subVectors(pos,this.group.position);v.y=0;const d=v.length();if(d<.28)return true;v.normalize();this.group.position.addScaledVector(v,Math.min(d,1.75*dt));this.group.rotation.y=Math.atan2(v.x,v.z);return false}
  pay(){const base=ITEMS[this.type].price,multi=state.event?.type===this.type?1.5:1,amount=Math.round(base*multi);pendingCash+=amount;state.totalEarned+=amount;state.sales++;state.happy++;state.rep++;state.streak++;if(state.streak%5===0){pendingCash+=5;textFloat('Rentetan +RM5',this.group.position,'#ffd447')}stationById('counter').refresh();audio.play('coin');coinBurst(this.group.position.clone().add(new THREE.Vector3(0,1.3,0)));this.leave(true)}
  leave(happy){this.state='exit';if(!happy){state.unhappy++;state.streak=0;audio.play('sad');textFloat('Stok habis',this.group.position,'#ffb4a8')}else textFloat('Sedap!',this.group.position,'#c9ffba')}
  destroy(){scene.remove(this.group);const i=customers.indexOf(this);if(i>=0)customers.splice(i,1)}
}

let queueSerial=0,pendingCash=0;
function checkoutDuration(){return state.workers.includes('cashier')?1.05:2.25}
function customerDemand(){const types=['jarClassic'];if(state.area>=1)types.push('jarPetai');if(state.area>=2)types.push('packGaring');if(state.event?.type&&Math.random()<.58)return state.event.type;return types[Math.floor(Math.random()*types.length)]}
function spawnCustomer(){const cap=state.event?.kind==='rush'?9:6;if(customers.length>=cap)return;new Customer(customerDemand())}

function interact(s,dt){
  if(s.kind==='unlock'){if(state.area>=s.unlock)return;showInteraction(`Buka ${s.name.toLowerCase()}`,(state.money>=s.cost&&state.rep>=s.rep));attemptUnlock(s);return}
  if(s.kind==='counter'){if(pendingCash>=1){interactionCooldown-=dt;if(interactionCooldown<=0){const n=Math.min(Math.ceil(2+state.speedLevel),Math.ceil(pendingCash));pendingCash-=n;state.money+=n;stationById('counter').refresh();audio.play('coin');textFloat(`+RM${n}`,player.position,'#ffd447');popResource('money');interactionCooldown=.16}}showInteraction(pendingCash?`Kutip RM${Math.ceil(pendingCash)}`:'Kaunter kosong');return}
  const inv=state.inventory;
  if(s.kind==='source'){if(inv.type&&inv.type!==s.type){showInteraction(`Tangan penuh: ${ITEMS[inv.type].name}`);return}if(inv.count>=state.capacity){showInteraction('Timbunan penuh');return}showInteraction(`Mengutip ${ITEMS[s.type].name}`);interactionCooldown-=dt;if(interactionCooldown<=0){inv.type=s.type;inv.count++;state.counts[`pick_${s.type}`]=(state.counts[`pick_${s.type}`]||0)+1;renderPlayerCarry();audio.play('pickup');particle(s.group.position.clone().add(new THREE.Vector3(0,1,0)),ITEMS[s.type].color);interactionCooldown=.38/(1+state.speedLevel*.08)}return}
  if(s.kind==='storage'&&!inv.type){showInteraction('Ambil bahan tersimpan');interactionCooldown-=dt;if(interactionCooldown<=0){const got=s.takeOutput(state.capacity);if(got.type){inv.type=got.type;inv.count=got.count;renderPlayerCarry();audio.play('pickup')}interactionCooldown=.4}return}
  if((s.recipes||s.kind==='shelf'||s.kind==='storage'||s.kind==='trash'||s.kind==='wholesale')&&inv.type&&s.canAccept(inv.type)){showInteraction(`Letak ${ITEMS[inv.type].name}`);interactionCooldown-=dt;if(interactionCooldown<=0){const given=s.accept(inv.type,1);inv.count-=given;if(!inv.count)inv.type=null;renderPlayerCarry();interactionCooldown=.23;burst(player.position.clone().add(new THREE.Vector3(0,1,0)),ITEMS[s.kind==='shelf'?s.type:Object.keys(s.inputs||{})[0]]?.color||COLORS.yellow,3)}return}
  if((s.recipes||s.kind==='factory')&&!inv.type&&s.output>0){showInteraction(`Kutip ${ITEMS[s.outputType||s.type].name}`);interactionCooldown-=dt;if(interactionCooldown<=0){const type=s.outputType||s.type,n=s.takeOutput(Math.min(state.capacity,2));inv.type=type;inv.count=n;renderPlayerCarry();audio.play('pickup');interactionCooldown=.3}return}
  if(s.kind==='shelf'&&!inv.type&&s.stock>0){showInteraction(`Ambil ${ITEMS[s.type].name}`);interactionCooldown-=dt;if(interactionCooldown<=0){const n=s.takeOutput(Math.min(state.capacity,2));inv.type=s.type;inv.count=n;renderPlayerCarry();audio.play('pickup');interactionCooldown=.3}return}
  if(s.kind==='shelf'){showInteraction(s.stock?`Stok ${s.stock}/${s.capacity()}`:'Rak kosong');return}
  if(inv.type)showInteraction('Bahan tidak sesuai');else showInteraction(s.processing?'Sedang diproses…':'Perlukan bahan');
}
function attemptUnlock(s){if(state.money<s.cost||state.rep<s.rep||unlockHold)return;unlockHold=true;setTimeout(()=>unlockHold=false,1300);state.money-=s.cost;state.area=s.unlock;if(state.area===2){state.wholesale.active=true}if(state.area===3){state.national.active=true}zones[state.area].visible=true;stations.forEach(st=>st.group.visible=st.area<=state.area);s.group.visible=false;audio.play('unlock');confetti(s.group.position);focus={pos:new THREE.Vector3(s.group.position.x+5,0,0),time:2.8};ambientWarm.intensity=state.area>=1?8:0;toast(`${zones[state.area].name} dibuka!`,'gold');updatePanels();saveGame();}
let interactionCooldown=0,unlockHold=false;

function playerUpdate(dt){let x=keys.ArrowRight||keys.d?1:0;x-=keys.ArrowLeft||keys.a?1:0;let z=keys.ArrowDown||keys.s?1:0;z-=keys.ArrowUp||keys.w?1:0;x+=joy.x;z+=joy.y;const v=new THREE.Vector3(x,0,z);if(v.lengthSq()>.01){v.normalize();const speed=3.45*(1+state.speedLevel*.1);player.position.addScaledVector(v,speed*dt);player.rotation.y=Math.atan2(v.x,v.z);player.position.y=Math.abs(Math.sin(performance.now()*.011))*0.045;player.userData.stack.rotation.z=Math.sin(performance.now()*.013)*.05*Math.min(1,state.inventory.count/3)}const maxX=[3.9,14.7,27.7,43.5][state.area];player.position.x=THREE.MathUtils.clamp(player.position.x,-10.8,maxX);player.position.z=THREE.MathUtils.clamp(player.position.z,-6.8,6.8);
  let nearest=null,dist=99;for(const s of stations){if(!s.group.visible)continue;const d=player.position.distanceTo(s.group.position);if(d<(s.radius||1.35)&&d<dist){nearest=s;dist=d}}if(nearest){nearest.ring.material.opacity=.95;nearest.ring.scale.setScalar(1+Math.sin(performance.now()*.006)*.04);interact(nearest,dt)}else hideInteraction();stations.forEach(s=>{if(s!==nearest){s.ring.material.opacity=.42;s.ring.scale.setScalar(1)}})
}
function renderPlayerCarry(){renderCarry(player,state.inventory.type,state.inventory.count);const inv=state.inventory;const pill=$('inventory');pill.classList.toggle('empty',!inv.type);$('inventory-icon').textContent=inv.type?ITEMS[inv.type].icon:'◇';$('inventory-name').textContent=inv.type?ITEMS[inv.type].name:'Kosong';$('inventory-count').textContent=`${inv.count}/${state.capacity}`}
function showInteraction(text,good=true){$('interaction').classList.remove('hidden');$('interaction-text').textContent=text;$('interaction').style.opacity=good?'1':'.72'}function hideInteraction(){$('interaction').classList.add('hidden')}

const objectives=[
  ['Petik cili di kebun',()=>state.counts.pick_chili||0,1],['Kisar cili menjadi pes',()=>state.counts.paste||0,1],['Campurkan pes dan bilis di kuali',()=>state.counts.sambal||0,1],
  ['Bungkus sambal ke dalam balang',()=>state.counts.jarClassic||0,1],['Susun balang di Rak Klasik',()=>stationById('shelfClassic')?.stock||state.sales,1],['Layani pelanggan & kutip wang',()=>state.money,5],
  ['Kumpul RM30 dan 6 reputasi',()=>Math.min(state.money/30,state.rep/6),1],['Berdiri di tapak kuning untuk buka gerai',()=>state.area,1],['Ambil Pekebun untuk automasi pertama',()=>state.workers.includes('gardener')?1:0,1],
  ['Hasilkan Balang Sambal Petai',()=>state.counts.jarPetai||0,1],['Buka Bengkel Pengeluaran',()=>state.area>=2?1:Math.min(state.money/110,state.rep/18),1],['Lengkapkan pesanan borong',()=>state.wholesale.progress,6],
  ['Ambil 3 pekerja autonomi',()=>state.workers.filter(w=>w!=='cashier').length,3],['Hasilkan Pek Sambal Garing',()=>state.counts.packGaring||0,1],['Bina Kilang Sambal',()=>state.area>=3?1:Math.min(state.money/260,state.rep/38),1],['Hantar pesanan ke seluruh Malaysia',()=>state.national.progress,12]
];
const objectiveTargets=['chili','grinder','wok','packer','shelfClassic','counter','unlockB','unlockB',null,'petaiWok','unlockC','wholesale',null,'fryer','unlockD','nationalVan'];
function updateObjective(){while(state.tutorial<objectives.length){const [,,max]=objectives[state.tutorial],v=objectives[state.tutorial][1]();if(v<max)break;state.tutorial++;audio.play('complete');if(state.tutorial<objectives.length)toast('Matlamat baharu');updatePanels();saveGame()}const obj=objectives[Math.min(state.tutorial,objectives.length-1)];$('objective-text').textContent=state.tutorial>=objectives.length?'Empayar terus berkembang!':obj[0];const v=Math.min(obj[1](),obj[2]);$('objective-count').textContent=obj[2]>1?`${Math.floor(v)}/${obj[2]}`:'';$('objective-bar').style.width=`${Math.min(100,v/obj[2]*100)}%`;$('chapter').textContent=['DAPUR RUMAH','PASAR MALAM','BENGKEL','KILANG SAMBAL'][state.area];const target=stationById(objectiveTargets[state.tutorial]);tutorialArrow.visible=!!target?.group.visible;if(target){tutorialArrow.position.copy(target.group.position);tutorialArrow.position.y=3.25}}

function completeWholesale(){if(state.wholesale.done)return;state.wholesale.done=true;state.wholesale.active=false;state.money+=42;state.totalEarned+=42;state.rep+=5;audio.play('unlock');confetti(stationById('wholesale').group.position);toast('Pesanan borong selesai • +RM42 +5★','gold');$('order-card').classList.add('hidden');popResource('money')}
function completeNational(){if(state.national.done)return;state.national.done=true;state.rep+=10;audio.play('unlock');confetti(stationById('nationalVan').group.position);endingTimer=2}

function startEvent(){if(state.area<1)return;const types=['jarClassic'];if(state.area>=1)types.push('jarPetai');if(state.area>=2)types.push('packGaring');if(Math.random()<.5){state.event={kind:'viral',type:types[Math.floor(Math.random()*types.length)]};state.eventTime=40;$('event-label').textContent='PESANAN VIRAL';$('event-text').textContent=`${ITEMS[state.event.type].name} ×1.5`}else{state.event={kind:'rush',type:null};state.eventTime=32;$('event-label').textContent='WAKTU MAKAN';$('event-text').textContent='Pelanggan datang ramai'}$('event-banner').classList.remove('hidden');audio.play('event');toast('Permintaan meningkat!','gold')}
function updateEvent(dt){if(state.event){state.eventTime-=dt;$('event-timer').textContent=`${Math.ceil(state.eventTime)}s`;if(state.eventTime<=0){state.event=null;$('event-banner').classList.add('hidden');eventCooldown=50+Math.random()*30}}else{eventCooldown-=dt;if(eventCooldown<=0)startEvent()}}

function particle(pos,color,type='pop'){if(particles.length>80)return;const m=type==='smoke'?mesh(new THREE.SphereGeometry(.1,6,4),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.55}),pos.x,pos.y,pos.z,false):mesh(new THREE.IcosahedronGeometry(.07,0),mat(color),pos.x,pos.y,pos.z,false);scene.add(m);particles.push({obj:m,vel:new THREE.Vector3((Math.random()-.5)*1.1,type==='smoke'?.5:1+Math.random(),(Math.random()-.5)*1.1),life:type==='smoke'?1.2:.65,type})}
function burst(pos,color,n=5){for(let i=0;i<n;i++)particle(pos,color)}function coinBurst(pos){for(let i=0;i<6;i++){const m=cyl(.09,.035,0xffcf3e,pos.x,pos.y,pos.z,8);m.rotation.x=Math.PI/2;scene.add(m);particles.push({obj:m,vel:new THREE.Vector3((Math.random()-.5)*1.8,1.3+Math.random(),(Math.random()-.5)*1.8),life:.85,type:'coin'})}}
function confetti(pos){for(let i=0;i<50;i++)particle(pos.clone().add(new THREE.Vector3((Math.random()-.5)*3,2+Math.random()*2,(Math.random()-.5)*3)),[0xe63a2d,0xffd447,0x3e985a,0x4d91aa][i%4])}
function updateEffects(dt){if(tutorialArrow?.visible){tutorialArrow.position.y+=Math.sin(performance.now()*.006)*.002;tutorialArrow.rotation.y+=dt*1.2}for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.life-=dt;p.obj.position.addScaledVector(p.vel,dt);p.vel.y-=p.type==='smoke'?.05:2.4*dt;p.obj.rotation.x+=dt*4;p.obj.rotation.z+=dt*3;if(p.obj.material?.transparent)p.obj.material.opacity=Math.max(0,p.life);if(p.life<=0){scene.remove(p.obj);particles.splice(i,1)}}for(let i=floaters.length-1;i>=0;i--){const f=floaters[i];f.life-=dt;f.obj.position.y+=dt*.8;f.obj.material.opacity=Math.min(1,f.life*2);if(f.life<=0){scene.remove(f.obj);floaters.splice(i,1)}}}

class AudioManager{
  constructor(){this.ctx=null;this.timer=null;this.step=0}
  init(){if(this.ctx)return;this.ctx=new (window.AudioContext||window.webkitAudioContext)();this.master=this.ctx.createGain();this.master.gain.value=.18;this.master.connect(this.ctx.destination);this.music=this.ctx.createGain();this.music.gain.value=state.music?.18:0;this.music.connect(this.master);this.fx=this.ctx.createGain();this.fx.gain.value=state.sfx?.55:0;this.fx.connect(this.master);this.timer=setInterval(()=>this.note(),720)}
  tone(freq,dur=.08,type='sine',gain=.12,dest=this.fx,when=0){if(!this.ctx)return;const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(0,this.ctx.currentTime+when);g.gain.linearRampToValueAtTime(gain,this.ctx.currentTime+when+.01);g.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+when+dur);o.connect(g).connect(dest);o.start(this.ctx.currentTime+when);o.stop(this.ctx.currentTime+when+dur+.03)}
  note(){if(!running||paused||!state.music||!this.ctx)return;const notes=[261.6,329.6,392,493.9,392,329.6,293.7,392];this.tone(notes[this.step++%notes.length],.7,'sine',.07,this.music);if(this.step%4===1)this.tone(130.8,.22,'triangle',.055,this.music,.03)}
  play(k){if(!state.sfx||!this.ctx)return;const map={pickup:[660,.07,'sine'],place:[390,.08,'triangle'],cook:[180,.25,'sawtooth'],pack:[520,.09,'square'],coin:[900,.12,'sine'],complete:[660,.25,'sine'],unlock:[440,.5,'triangle'],event:[520,.28,'square'],sad:[170,.25,'sine']},a=map[k]||map.place;this.tone(...a);if(k==='coin'||k==='complete'||k==='unlock')this.tone(a[0]*1.5,a[1],a[2],.1,this.fx,.08)}
  sync(){if(!this.ctx)return;this.music.gain.setTargetAtTime(state.music?.18:0,this.ctx.currentTime,.05);this.fx.gain.setTargetAtTime(state.sfx?.55:0,this.ctx.currentTime,.05)}
}
const audio=new AudioManager();

function hire(role,cost){if(state.money<cost||state.workers.includes(role))return;state.money-=cost;state.workers.push(role);new Worker(role);audio.play('unlock');toast(`${{gardener:'Pekebun',cook:'Pembantu dapur',stocker:'Pengisi rak',cashier:'Juruwang'}[role]} mula bekerja!`,'good');updatePanels();saveGame()}
const upgradeDefs=[
  {key:'capacity',icon:'▥',title:'Kapasiti pemain',desc:()=>`${state.capacity} → ${Math.min(8,state.capacity+1)} unit`,cost:()=>22+(state.capacity-3)*28,max:()=>state.capacity>=8,buy:()=>state.capacity++},
  {key:'speedLevel',icon:'↯',title:'Kelajuan pemain',desc:()=>`Tahap ${state.speedLevel+1}`,cost:()=>28+state.speedLevel*38,max:()=>state.speedLevel>=4,buy:()=>state.speedLevel++},
  {key:'machineLevel',icon:'⚙',title:'Semua mesin',desc:()=>`+${18*(state.machineLevel+1)}% lebih laju`,cost:()=>38+state.machineLevel*55,max:()=>state.machineLevel>=4,buy:()=>state.machineLevel++},
  {key:'shelfLevel',icon:'▤',title:'Kapasiti rak',desc:()=>`+${2*(state.shelfLevel+1)} stok`,cost:()=>34+state.shelfLevel*48,max:()=>state.shelfLevel>=3,buy:()=>{state.shelfLevel++;stations.filter(s=>s.kind==='shelf').forEach(s=>s.renderStock())}},
  {key:'workerLevel',icon:'◎',title:'Latihan pekerja',desc:()=>`+${13*(state.workerLevel+1)}% kelajuan`,cost:()=>55+state.workerLevel*65,max:()=>state.workerLevel>=3,buy:()=>state.workerLevel++}
];
const hires=[{role:'gardener',name:'Pekebun',icon:'♧',cost:30,area:1,desc:'Bekalkan bahan mentah'},{role:'cook',name:'Pembantu dapur',icon:'♨',cost:45,area:1,desc:'Pindah hasil antara mesin'},{role:'stocker',name:'Pengisi rak',icon:'▤',cost:65,area:2,desc:'Bungkus & isi semua rak'},{role:'cashier',name:'Juruwang',icon:'RM',cost:85,area:2,desc:'Barisan bergerak 2× pantas'}];
function buyUpgrade(key){const u=upgradeDefs.find(x=>x.key===key),cost=u.cost();if(u.max()||state.money<cost)return;state.money-=cost;u.buy();audio.play('unlock');toast(`${u.title} dinaik taraf`,'good');renderPlayerCarry();updatePanels();saveGame()}
function updatePanels(){
  updateHud();$('stat-sales').textContent=`RM${state.totalEarned}`;$('stat-happy').textContent=state.happy;$('stat-produced').textContent=state.produced;
  const list=$('upgrade-list');list.innerHTML='';upgradeDefs.forEach(u=>{const max=u.max(),cost=u.cost(),b=document.createElement('button');b.className='upgrade-item';b.disabled=max||state.money<cost;b.innerHTML=`<span class="upgrade-icon">${u.icon}</span><span><small>NAIK TARAF</small><b>${u.title}</b><em>${max?'MAKSIMUM':`RM${cost} • ${u.desc()}`}</em></span><span class="upgrade-level"><i style="width:${Math.min(100,({capacity:state.capacity-3,speedLevel:state.speedLevel,machineLevel:state.machineLevel,shelfLevel:state.shelfLevel,workerLevel:state.workerLevel}[u.key]||0)/4*100)}%"></i></span>`;b.onclick=()=>buyUpgrade(u.key);list.appendChild(b)});
  hires.filter(h=>state.area>=h.area).forEach(h=>{const owned=state.workers.includes(h.role),b=document.createElement('button');b.className='upgrade-item';b.disabled=owned||state.money<h.cost;b.innerHTML=`<span class="upgrade-icon">${h.icon}</span><span><small>PEKERJA</small><b>${h.name}</b><em>${owned?'SUDAH DIAMBIL':`RM${h.cost} • ${h.desc}`}</em></span><span class="upgrade-level"><i style="width:${owned?100:0}%"></i></span>`;b.onclick=()=>hire(h.role,h.cost);list.appendChild(b)});
  $('upgrade-dot').classList.toggle('show',upgradeDefs.some(u=>!u.max()&&state.money>=u.cost())||hires.some(h=>state.area>=h.area&&!state.workers.includes(h.role)&&state.money>=h.cost));
  const names=['Dapur Rumah','Gerai Pasar Malam','Bengkel Pengeluaran','Kilang Sambal'],milestones=$('milestone-list');milestones.innerHTML='';names.forEach((n,i)=>{const d=document.createElement('div');d.className=`milestone ${i<state.area?'done':i===state.area?'active':''}`;d.innerHTML=`<span>${i<state.area?'✓':i+1}</span><div><small>${i===0?'SATU KUALI':i===1?'AUTOMASI BERMULA':i===2?'PESANAN BORONG':'SELURUH MALAYSIA'}</small><b>${n}</b></div>`;milestones.appendChild(d)});
  if(state.wholesale.active&&!state.wholesale.done){$('order-card').classList.remove('hidden');$('order-text').textContent='6 × Balang klasik';$('order-progress').textContent=`${state.wholesale.progress} / ${state.wholesale.target}`;$('order-reward').textContent='RM42'}else if(state.national.active&&!state.national.done){$('order-card').classList.remove('hidden');$('order-text').textContent='12 × Pesanan Malaysia';$('order-progress').textContent=`${state.national.progress} / ${state.national.target}`;$('order-reward').textContent='AKHIR'}else $('order-card').classList.add('hidden');
  stations.forEach(s=>s.refresh());
}
function updateHud(){$('money').textContent=Math.floor(state.money).toLocaleString('ms-MY');$('reputation').textContent=state.rep}

function saveGame(){if(!running)return;state.stationData={};stations.forEach(s=>{state.stationData[s.id]={inputs:s.inputs,output:s.output,outputType:s.outputType,stock:s.stock,storage:s.storage,type:s.kind==='factory'?s.type:undefined}});state.pendingCash=pendingCash;state.player={x:player.position.x,z:player.position.z};state.lastSave=Date.now();localStorage.setItem(SAVE_KEY,JSON.stringify(state))}
function loadGame(){state=Object.assign(defaultState(),savedSnapshot||{});pendingCash=state.pendingCash||0;if(state.player)player.position.set(state.player.x,0,state.player.z);zones.forEach((z,i)=>z.visible=i<=state.area);stations.forEach(s=>{s.group.visible=s.area<=state.area;if(s.kind==='unlock'&&state.area>=s.unlock)s.group.visible=false;const d=state.stationData?.[s.id];if(d){s.inputs=d.inputs||{};s.output=d.output||0;s.outputType=d.outputType;s.stock=d.stock||0;s.storage=d.storage||{};if(d.type&&s.kind==='factory')s.type=d.type}s.renderStock?.();s.refresh()});state.workers.forEach(r=>new Worker(r));renderPlayerCarry();updatePanels();updateObjective();toast('Kemajuan disambung','good')}
function resetGame(){localStorage.removeItem(SAVE_KEY);location.reload()}

function toast(msg,kind=''){const t=document.createElement('div');t.className=`toast ${kind}`;t.textContent=msg;$('toast-stack').appendChild(t);setTimeout(()=>t.remove(),2600)}function popResource(id){const el=$(id).closest('.resource');el.classList.remove('pop');void el.offsetWidth;el.classList.add('pop')}

const keys={},joy={x:0,y:0};let joyPointer=null;
addEventListener('keydown',e=>{keys[e.key]=true;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();if(e.key==='Escape'&&running)togglePause()});addEventListener('keyup',e=>keys[e.key]=false);
const joystick=$('joystick'),knob=$('joystick-knob');function joyMove(e){if(e.pointerId!==joyPointer)return;const r=joystick.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),len=Math.hypot(dx,dy),max=35,k=Math.min(max,len)/(len||1);joy.x=dx*k/max;joy.y=dy*k/max;knob.style.transform=`translate(${dx*k}px,${dy*k}px)`}joystick.addEventListener('pointerdown',e=>{joyPointer=e.pointerId;joystick.setPointerCapture(e.pointerId);joyMove(e)});joystick.addEventListener('pointermove',joyMove);function joyEnd(e){if(e.pointerId!==joyPointer)return;joyPointer=null;joy.x=joy.y=0;knob.style.transform=''}joystick.addEventListener('pointerup',joyEnd);joystick.addEventListener('pointercancel',joyEnd);

function togglePause(force){paused=force??!paused;$('pause-menu').classList.toggle('hidden',!paused);if(!paused)clock.getDelta()}
function modal(id,show=true){$(id).classList.toggle('hidden',!show);paused=show;if(!show)clock.getDelta()}
$('pause-btn').onclick=()=>togglePause(true);$('resume-btn').onclick=()=>togglePause(false);$('upgrades-btn').onclick=()=>{updatePanels();modal('upgrades-panel')};$('goals-btn').onclick=()=>{updatePanels();modal('map-panel')};document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>modal(b.dataset.close,false));
$('music-toggle').onclick=()=>{state.music=!state.music;$('music-toggle').classList.toggle('on',state.music);audio.sync();saveGame()};$('sfx-toggle').onclick=()=>{state.sfx=!state.sfx;$('sfx-toggle').classList.toggle('on',state.sfx);audio.sync();saveGame()};$('restart-btn').onclick=()=>{if(confirm('Padam semua kemajuan dan mula semula?'))resetGame()};$('keep-playing-btn').onclick=()=>{$('ending-screen').classList.add('hidden');paused=false;state.endingSeen=true;saveGame()};

function begin(useSave){audio.init();$('start-screen').classList.add('hidden');running=true;if(useSave&&savedSnapshot)loadGame();else{renderPlayerCarry();updatePanels();updateObjective()}clock.start();requestAnimationFrame(loop)}
$('start-btn').onclick=()=>begin(false);$('continue-btn').onclick=()=>begin(true);

function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w<h?47:38;camera.updateProjectionMatrix()}addEventListener('resize',resize);resize();
function cameraUpdate(dt){let target;if(focus){target=focus.pos;focus.time-=dt;if(focus.time<=0)focus=null}else target=player.position;const desired=target.clone().add(new THREE.Vector3(IS_TOUCH&&innerWidth<innerHeight?10:9,IS_TOUCH&&innerWidth<innerHeight?16:14,IS_TOUCH&&innerWidth<innerHeight?15:12));camera.position.lerp(desired,1-Math.pow(.001,dt));const look=target.clone().add(new THREE.Vector3(0,0,.3));camera.lookAt(look)}
function zoneUpdate(){const z=player.position.x<4?'Dapur Rumah':player.position.x<16?'Gerai Pasar Malam':player.position.x<29?'Bengkel Pengeluaran':'Kilang Sambal';if($('zone-chip').textContent!==z){$('zone-chip').textContent=z;$('zone-chip').classList.add('show');clearTimeout(zoneUpdate.t);zoneUpdate.t=setTimeout(()=>$('zone-chip').classList.remove('show'),1700)}}
function loop(){if(!running)return;requestAnimationFrame(loop);const dt=Math.min(.05,clock.getDelta());if(!paused){playerUpdate(dt);stations.forEach(s=>s.update(dt));workers.forEach(w=>w.update(dt));customers.slice().forEach(c=>c.update(dt));spawnTimer-=dt;if(spawnTimer<=0){spawnCustomer();spawnTimer=(state.event?.kind==='rush'?1.1:3.7)-Math.min(1.2,state.area*.28)}updateEvent(dt);updateEffects(dt);updateObjective();updateHud();zoneUpdate();saveTimer+=dt;if(saveTimer>5){saveTimer=0;saveGame()}if(endingTimer>0){endingTimer-=dt;if(endingTimer<=0&&!state.endingSeen){paused=true;$('end-sales').textContent=`RM${state.totalEarned}`;$('end-customers').textContent=state.happy;$('ending-screen').classList.remove('hidden')}}}cameraUpdate(dt);renderer.render(scene,camera)}


makeGround();buildStations();buildPlayer();tutorialArrow=new THREE.Group();const arrowHead=mesh(new THREE.ConeGeometry(.27,.55,8),mat(COLORS.yellow),0,0,0);arrowHead.rotation.z=Math.PI;arrowHead.rotation.x=Math.PI;tutorialArrow.add(arrowHead);const arrowRing=mesh(new THREE.TorusGeometry(.42,.055,7,24),mat(COLORS.red),0,-.2,0);arrowRing.rotation.x=Math.PI/2;tutorialArrow.add(arrowRing);scene.add(tutorialArrow);stations.forEach(s=>s.refresh());updateObjective();camera.position.set(5,14,12);camera.lookAt(player.position);renderer.render(scene,camera);
addEventListener('beforeunload',saveGame);document.addEventListener('visibilitychange',()=>{if(document.hidden)saveGame()});
