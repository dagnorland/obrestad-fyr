(function(){
const {useState,useEffect,useRef,useMemo,useCallback}=React;
const html=htm.bind(React.createElement);
const KIOSK=new URLSearchParams(location.search).has('kiosk');
const REDUCED=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- tekster ---------- */
const T={
nb:{loc:'nb-NO',chapter:'Kapittel 1: Ute på havet',tabs:['Om bord','Kartet','Hvor langt?'],
 intro:'Du står på dekk utenfor Jæren en mørk høstkveld. Se mot land: Obrestad fyr lyser fast, og hvert 30. sekund kommer et kraftig blink.',
 kennLbl:'Fyrets kjennetegn',kenn:'Fast lys med blink hvert 30. sekund',curve:'Lyset de siste 60 sekundene',
 tap:'Jeg så et blink!',tap1:'Bra! Trykk igjen ved neste blink.',tapRes:'Du målte {s} sekunder. Fyrlista sier 30.',tapGood:'Skarpt øye. Slik kjente sjøfolk igjen fyret.',
 weather:'Vær',w:{clear:'Klart',rain:'Regn',fog:'Tåke'},
 fog:'I tett tåke forsvinner lyset. Da var det tåkesignalet som varslet sjøfolkene.',
 soundOn:'Slå på lyd',soundOff:'Slå av lyd',
 game:'Hvilket fyr er det?',gameIntro:'Et fyr lyser inne på land. Se på rytmen og velg riktig fra fyrlista. Noen fyr må du vente litt på.',
 list:'Fyrliste (forenklet øvelse)',pat:{obrestad:'Obrestad: fast lys, blink hvert 30. s',fl5:'Fyr B: blink hvert 5. s',fl2:'Fyr C: to blink hvert 10. s',fixed:'Fyr D: bare fast lys'},
 right:'Riktig! Slik visste skipperen hvor han var.',wrong:'Ikke helt. Se en gang til på rytmen.',next:'Nytt fyr',back:'Tilbake til Obrestad',
 mapH:'Hvorfor her?',mapIntro:'Langs Jæren ligger den lange, steinete Varhaugstranda, fryktet av sjøfolk. Fyret ble tent i 1873 for å vise vei forbi den farlige kysten, i en tid da sjøen var en av de viktigste transportveiene.',
 dusk:'Fra skumring til natt',day:'dag',night:'natt',drag:'Dra båten rundt på kartet og se om du kan se fyret.',
 vis:'Du ser fyret. Avstand: {d} nautiske mil.',far:'For langt unna. Lyset er under horisonten eller for svakt.',dark:'Du er i den mørke sektoren. Mot land lyser ikke fyret.',
 legSector:'Lyst område',legRange:'Rekkevidde i dette været',legDark:'Mørk sektor',
 mapNote:'Forenklet kart. Sektor og rekkevidde er omtrentlige og bygger på dagens fyr.',sea:'Nordsjøen',
 rH:'Hvor langt ser du lyset?',rLead:'Jorden krummer seg. Står lyset høyt, og står du høyt, ser du det lenger.',
 lightH:'Lyshøyde',eyeH:'Øyehøyde',today:'Dagens fyr: 39 m',pre:{row:'Robåt',fish:'Fiskeskøyte',mast:'I masta'},
 res:'Lyset kan sees inntil',nm:'nautiske mil',km:'km',formula:'Formelen sjøfolk bruker',
 rNote:'Lysstyrken setter også en grense. I klart vær rekker dagens fyr omtrent 18 nautiske mil. I regn og tåke blir det kortere.',
 horizon:'Horisonten',boat:'Båten',light:'Fyret',beyond:'Lenger ut enn dette forsvinner lyset bak horisonten.',
 dist:'Fyret er omtrent 10 nautiske mil (18 km) unna.',
 fixLbl:'Fast lys',flLbl:'Blink',cd:'candela',stronger:'nesten 12 ganger sterkere',statsNote:'Lysstyrke for dagens fyr',
 seeShort:'Du ser fyret',farShort:'For langt unna',darkShort:'Mørk sektor',fromLight:'fra fyret',
 segL:'Fyr → horisont',segE:'Horisont → båt',exag:'Høydene er forstørret. I virkeligheten er jorden mye flatere enn på tegningen.',
 kiosk:'Utforsk selv på mobilen: skann QR-koden ved skjermen.'},
de:{loc:'de-DE',chapter:'Kapitel 1: Draußen auf dem Meer',tabs:['An Bord','Die Karte','Wie weit?'],
 intro:'Du stehst an Deck vor der Küste von Jæren, an einem dunklen Herbstabend. Schau zum Land: Der Leuchtturm Obrestad leuchtet fest, und alle 30 Sekunden kommt ein kräftiger Blitz.',
 kennLbl:'Kennung des Leuchtturms',kenn:'Festfeuer mit Blitz alle 30 Sekunden',curve:'Das Licht in den letzten 60 Sekunden',
 tap:'Ich sehe einen Blitz!',tap1:'Gut! Tippe beim nächsten Blitz noch einmal.',tapRes:'Du hast {s} Sekunden gemessen. Im Leuchtfeuerverzeichnis stehen 30.',tapGood:'Scharfes Auge. So erkannten Seeleute den Leuchtturm.',
 weather:'Wetter',w:{clear:'Klar',rain:'Regen',fog:'Nebel'},
 fog:'Im dichten Nebel verschwindet das Licht. Dann warnte das Nebelsignal die Seeleute.',
 soundOn:'Ton an',soundOff:'Ton aus',
 game:'Welcher Leuchtturm ist das?',gameIntro:'An Land leuchtet ein Leuchtturm. Achte auf den Rhythmus und wähle den richtigen aus der Liste. Bei manchen musst du etwas warten.',
 list:'Leuchtfeuerverzeichnis (vereinfachte Übung)',pat:{obrestad:'Obrestad: Festfeuer, Blitz alle 30 s',fl5:'Turm B: Blitz alle 5 s',fl2:'Turm C: zwei Blitze alle 10 s',fixed:'Turm D: nur Festfeuer'},
 right:'Richtig! So wusste der Schiffer, wo er war.',wrong:'Nicht ganz. Schau dir den Rhythmus noch einmal an.',next:'Neuer Leuchtturm',back:'Zurück nach Obrestad',
 mapH:'Warum hier?',mapIntro:'Entlang Jæren liegt der lange, steinige Strand Varhaugstranda, von Seeleuten gefürchtet. Der Leuchtturm wurde 1873 entzündet, um den Weg an der gefährlichen Küste vorbei zu weisen, in einer Zeit, in der das Meer einer der wichtigsten Verkehrswege war.',
 dusk:'Von der Dämmerung zur Nacht',day:'Tag',night:'Nacht',drag:'Zieh das Boot über die Karte und finde heraus, ob du den Leuchtturm siehst.',
 vis:'Du siehst den Leuchtturm. Entfernung: {d} Seemeilen.',far:'Zu weit weg. Das Licht liegt unter dem Horizont oder ist zu schwach.',dark:'Du bist im dunklen Sektor. Zum Land hin leuchtet der Turm nicht.',
 legSector:'Beleuchteter Bereich',legRange:'Reichweite bei diesem Wetter',legDark:'Dunkler Sektor',
 mapNote:'Vereinfachte Karte. Sektor und Reichweite sind ungefähr und beruhen auf dem heutigen Leuchtturm.',sea:'Nordsee',
 rH:'Wie weit siehst du das Licht?',rLead:'Die Erde ist gekrümmt. Steht das Licht hoch, und stehst du hoch, siehst du es weiter.',
 lightH:'Feuerhöhe',eyeH:'Augenhöhe',today:'Heutiger Leuchtturm: 39 m',pre:{row:'Ruderboot',fish:'Fischkutter',mast:'Im Mast'},
 res:'Das Licht ist sichtbar bis zu',nm:'Seemeilen',km:'km',formula:'Die Formel der Seeleute',
 rNote:'Auch die Lichtstärke setzt eine Grenze. Bei klarem Wetter reicht der heutige Leuchtturm etwa 18 Seemeilen. Bei Regen und Nebel weniger.',
 horizon:'Horizont',boat:'Boot',light:'Leuchtturm',beyond:'Weiter draußen verschwindet das Licht hinter dem Horizont.',
 dist:'Der Leuchtturm ist etwa 10 Seemeilen (18 km) entfernt.',
 fixLbl:'Festfeuer',flLbl:'Blitz',cd:'Candela',stronger:'fast 12-mal so stark',statsNote:'Lichtstärke des heutigen Leuchtturms',
 seeShort:'Du siehst den Leuchtturm',farShort:'Zu weit weg',darkShort:'Dunkler Sektor',fromLight:'vom Leuchtturm',
 segL:'Turm → Horizont',segE:'Horizont → Boot',exag:'Die Höhen sind vergrößert. In Wirklichkeit ist die Erde viel flacher als in der Zeichnung.',
 kiosk:'Selbst entdecken auf dem Handy: Scanne den QR-Code neben dem Bildschirm.'},
en:{loc:'en-GB',chapter:'Chapter 1: Out at sea',tabs:['On board','The map','How far?'],
 intro:'You’re on deck off the coast of Jæren on a dark autumn evening. Look towards land: Obrestad lighthouse shows a steady light, and every 30 seconds comes a strong flash.',
 kennLbl:'The lighthouse’s signature',kenn:'Fixed light with a flash every 30 seconds',curve:'The light over the last 60 seconds',
 tap:'I saw a flash!',tap1:'Good! Tap again at the next flash.',tapRes:'You measured {s} seconds. The light list says 30.',tapGood:'Sharp eyes. That’s how sailors recognised the lighthouse.',
 weather:'Weather',w:{clear:'Clear',rain:'Rain',fog:'Fog'},
 fog:'In thick fog the light disappears. Then the fog signal warned the sailors.',
 soundOn:'Sound on',soundOff:'Sound off',
 game:'Which lighthouse is it?',gameIntro:'A lighthouse shines on the shore. Watch the rhythm and pick the right one from the light list. Some take a while.',
 list:'Light list (simplified exercise)',pat:{obrestad:'Obrestad: fixed, flash every 30 s',fl5:'Light B: flash every 5 s',fl2:'Light C: two flashes every 10 s',fixed:'Light D: fixed light only'},
 right:'Correct! That’s how the skipper knew where he was.',wrong:'Not quite. Watch the rhythm once more.',next:'New lighthouse',back:'Back to Obrestad',
 mapH:'Why here?',mapIntro:'Along Jæren lies the long, stony Varhaug beach, feared by sailors. The lighthouse was lit in 1873 to guide ships past this dangerous coast, at a time when the sea was one of the most important transport routes.',
 dusk:'From dusk to night',day:'day',night:'night',drag:'Drag the boat around the map and see whether you can see the lighthouse.',
 vis:'You can see the lighthouse. Distance: {d} nautical miles.',far:'Too far away. The light is below the horizon or too weak.',dark:'You’re in the dark sector. The lighthouse doesn’t shine towards land.',
 legSector:'Lit area',legRange:'Range in this weather',legDark:'Dark sector',
 mapNote:'Simplified map. Sector and range are approximate and based on today’s lighthouse.',sea:'North Sea',
 rH:'How far can you see the light?',rLead:'The Earth is curved. The higher the light, and the higher you stand, the further you see it.',
 lightH:'Light height',eyeH:'Eye height',today:'Today’s lighthouse: 39 m',pre:{row:'Rowing boat',fish:'Fishing boat',mast:'Up the mast'},
 res:'The light can be seen up to',nm:'nautical miles',km:'km',formula:'The formula sailors use',
 rNote:'The strength of the light also sets a limit. In clear weather today’s lighthouse reaches about 18 nautical miles. Less in rain and fog.',
 horizon:'Horizon',boat:'Boat',light:'Lighthouse',beyond:'Further out than this, the light sinks below the horizon.',
 dist:'The lighthouse is about 10 nautical miles (18 km) away.',
 fixLbl:'Fixed light',flLbl:'Flash',cd:'candela',stronger:'almost 12 times stronger',statsNote:'Light intensity of today’s lighthouse',
 seeShort:'You can see the lighthouse',farShort:'Too far away',darkShort:'Dark sector',fromLight:'from the lighthouse',
 segL:'Light → horizon',segE:'Horizon → boat',exag:'Heights are enlarged. In reality the Earth is much flatter than in the drawing.',
 kiosk:'Explore on your phone: scan the QR code next to the screen.'}
};
const fmt=(n,loc,d=1)=>n.toLocaleString(loc,{minimumFractionDigits:d,maximumFractionDigits:d});
const LUM={clear:18,rain:9,fog:1};
const CD_FIX=129900,CD_FL=1526000; // dagens fyr, candela
const geoRange=(h,e)=>2.08*(Math.sqrt(h)+Math.sqrt(e));

/* ---------- lysmønstre ---------- */
function gauss(d,s){return Math.exp(-d*d/(2*s*s))}
function lightAt(p,t){
  if(p==='obrestad'){const ph=((t%30)+30)%30;const d=Math.min(ph,30-ph);return 0.3+0.7*gauss(d,0.55)}
  if(p==='fl5'){const ph=((t%5)+5)%5;const d=Math.min(ph,5-ph);return gauss(d,0.17)}
  if(p==='fl2'){const ph=((t%10)+10)%10;const d=Math.min(Math.abs(ph-0.6),Math.abs(ph-2.2),Math.abs(ph-10.6));return gauss(d,0.17)}
  return 0.75;
}
const clock={start:performance.now()/1000,offset:24};
const now=()=>performance.now()/1000-clock.start+clock.offset;

/* ---------- lyd ---------- */
const Sound={ctx:null,on:false,master:null,next:0,
  enable(){
    if(!this.ctx){
      const C=window.AudioContext||window.webkitAudioContext; if(!C) return;
      const ctx=this.ctx=new C(); const m=this.master=ctx.createGain(); m.gain.value=0.9; m.connect(ctx.destination);
      const len=ctx.sampleRate*3,buf=ctx.createBuffer(1,len,ctx.sampleRate),d=buf.getChannelData(0); let last=0;
      for(let i=0;i<len;i++){const w=Math.random()*2-1;last=(last+0.02*w)/1.02;d[i]=last*3.2}
      const src=ctx.createBufferSource();src.buffer=buf;src.loop=true;
      const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=650;
      const g=ctx.createGain();g.gain.value=0.35;
      const lfo=ctx.createOscillator();lfo.frequency.value=0.12;const lg=ctx.createGain();lg.gain.value=0.22;lfo.connect(lg);lg.connect(g.gain);
      src.connect(lp);lp.connect(g);g.connect(m);src.start();lfo.start();
    }
    this.ctx.resume(); this.master.gain.value=0.9; this.on=true;
  },
  disable(){ if(this.master) this.master.gain.value=0; this.on=false; },
  horn(){
    if(!this.on||!this.ctx) return; const ctx=this.ctx,t=ctx.currentTime;
    const g=ctx.createGain(); g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.32,t+0.35); g.gain.setValueAtTime(0.32,t+2.0); g.gain.linearRampToValueAtTime(0,t+2.8);
    const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=520;
    [82,123,164].forEach((f,i)=>{const o=ctx.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(f*1.04,t);o.frequency.linearRampToValueAtTime(f,t+0.5);const og=ctx.createGain();og.gain.value=[0.6,0.3,0.15][i];o.connect(og);og.connect(lp);o.start(t);o.stop(t+3)});
    lp.connect(g); g.connect(this.master);
  }
};

/* ---------- 3D-scenen ---------- */
function glowTexture(){
  const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');
  const r=g.createRadialGradient(64,64,0,64,64,64);
  r.addColorStop(0,'rgba(255,250,230,1)');r.addColorStop(0.12,'rgba(255,222,140,.95)');r.addColorStop(0.35,'rgba(255,190,90,.35)');r.addColorStop(1,'rgba(255,170,60,0)');
  g.fillStyle=r;g.fillRect(0,0,128,128);return new THREE.CanvasTexture(c);
}
function streakTexture(){
  const c=document.createElement('canvas');c.width=256;c.height=16;const g=c.getContext('2d');
  const r=g.createLinearGradient(0,0,256,0);r.addColorStop(0,'rgba(255,210,120,0)');r.addColorStop(.5,'rgba(255,235,190,1)');r.addColorStop(1,'rgba(255,210,120,0)');
  g.fillStyle=r;g.fillRect(0,0,256,16);
  const v=g.createLinearGradient(0,0,0,16);v.addColorStop(0,'rgba(0,0,0,1)');v.addColorStop(.5,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,1)');
  g.globalCompositeOperation='destination-out';g.fillStyle=v;g.fillRect(0,0,256,16);return new THREE.CanvasTexture(c);
}
function beamTexture(){
  const c=document.createElement('canvas');c.width=64;c.height=256;const g=c.getContext('2d');
  const r=g.createLinearGradient(0,0,0,256);r.addColorStop(0,'rgba(255,220,150,.9)');r.addColorStop(.25,'rgba(255,215,140,.35)');r.addColorStop(1,'rgba(255,210,130,0)');
  g.fillStyle=r;g.fillRect(0,0,64,256);
  const h=g.createLinearGradient(0,0,64,0);h.addColorStop(0,'rgba(0,0,0,1)');h.addColorStop(.5,'rgba(0,0,0,0)');h.addColorStop(1,'rgba(0,0,0,1)');
  g.globalCompositeOperation='destination-out';g.fillStyle=h;g.fillRect(0,0,64,256);return new THREE.CanvasTexture(c);
}

function createScene(host,state){
  const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  host.appendChild(renderer.domElement);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(55,1,0.1,3000);
  const W={clear:{fog:0.0011,hor:new THREE.Color('#1d3a4c'),top:new THREE.Color('#03070d'),wave:1.7,stars:1},
           rain:{fog:0.0042,hor:new THREE.Color('#16242d'),top:new THREE.Color('#070b0f'),wave:2.6,stars:0},
           fog:{fog:0.016,hor:new THREE.Color('#3c4a52'),top:new THREE.Color('#2a353b'),wave:1.3,stars:0}};
  const cur={fog:W.clear.fog,hor:W.clear.hor.clone(),top:W.clear.top.clone(),wave:1.7,stars:1};
  scene.fog=new THREE.FogExp2(cur.hor.clone(),cur.fog);

  // himmel
  const skyMat=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,
    uniforms:{top:{value:cur.top.clone()},hor:{value:cur.hor.clone()}},
    vertexShader:'varying vec3 vP;void main(){vP=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform vec3 top;uniform vec3 hor;varying vec3 vP;void main(){float h=clamp(vP.y*2.2,0.,1.);gl_FragColor=vec4(mix(hor,top,pow(h,.6)),1.);}'});
  const sky=new THREE.Mesh(new THREE.SphereGeometry(1400,32,16),skyMat);scene.add(sky);
  // stjerner
  const sg=new THREE.BufferGeometry(),sp=[];
  for(let i=0;i<1400;i++){const a=Math.random()*Math.PI*2,e=0.06+Math.random()*1.4;const r=1300;sp.push(r*Math.cos(e)*Math.cos(a),r*Math.sin(e),r*Math.cos(e)*Math.sin(a))}
  sg.setAttribute('position',new THREE.Float32BufferAttribute(sp,3));
  const starMat=new THREE.PointsMaterial({color:0xdfe8ff,size:1.6,sizeAttenuation:false,fog:false,transparent:true,opacity:0.9});
  const stars=new THREE.Points(sg,starMat);scene.add(stars);

  // lys
  const amb=new THREE.AmbientLight(0x23384a,0.55);scene.add(amb);
  const moon=new THREE.DirectionalLight(0xa9c4e0,0.75);moon.position.set(-520,170,-900);scene.add(moon);
  const moonS=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTexture(),color:0xcfe0ff,fog:false,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
  moonS.position.set(-520,170,-900).normalize().multiplyScalar(1250);moonS.scale.set(70,70,1);scene.add(moonS);
  const LH=new THREE.Vector3(0,28,-420);
  const lhLight=new THREE.PointLight(0xffc77a,1,0,1);lhLight.position.copy(LH);scene.add(lhLight);

  // hav
  const seg=REDUCED?80:120;
  const sea=new THREE.PlaneGeometry(900,900,seg,seg);sea.rotateX(-Math.PI/2);
  const base=sea.attributes.position.array.slice();
  const seaMat=new THREE.MeshPhongMaterial({color:0x123a50,specular:0xb8cfe0,shininess:45,flatShading:true});
  const seaMesh=new THREE.Mesh(sea,seaMat);seaMesh.position.z=-200;scene.add(seaMesh);
  const far=new THREE.Mesh(new THREE.PlaneGeometry(6000,6000),new THREE.MeshPhongMaterial({color:0x0b2433,specular:0x223344,shininess:20}));
  far.rotation.x=-Math.PI/2;far.position.y=-0.6;scene.add(far);
  const waveH=(x,z,t,a)=>a*(0.7*Math.sin(0.018*z+0.012*x+0.75*t)+0.55*Math.sin(0.045*x+1.1*t)+0.35*Math.sin(0.07*z-0.9*t+0.6*Math.sin(0.01*x))+0.22*Math.sin(0.13*(x+z)+1.9*t)+0.12*Math.sin(0.27*x-0.21*z+2.6*t));

  // land
  const shape=new THREE.Shape();shape.moveTo(-1600,-2);
  for(let x=-1600;x<=1600;x+=40){const y=4+3*Math.sin(x*0.004)+2*Math.sin(x*0.013+1)+ (Math.abs(x)<60?1.5:0)+ (x>300?3*Math.sin(x*0.002):0);shape.lineTo(x,Math.max(1.5,y))}
  shape.lineTo(1600,-2);shape.lineTo(-1600,-2);
  const land=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:60,bevelEnabled:false}),new THREE.MeshLambertMaterial({color:0x0a1216}));
  land.position.z=-470;scene.add(land);
  // tårn: det originale fra 1873, lavt steintårn inntil gavlen på boligen (mål anslått fra fotografiene, forstørret 1,8×)
  const tower=new THREE.Group();tower.position.set(LH.x,6,LH.z);tower.scale.setScalar(1.8);scene.add(tower);
  const add=(geo,mat,x,y,z)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);tower.add(m);return m};
  const wall=new THREE.MeshLambertMaterial({color:0x9aa2a6,emissive:0x15191b});
  const iron=new THREE.MeshLambertMaterial({color:0x2a3236,emissive:0x0a0c0e});
  const dark=new THREE.MeshLambertMaterial({color:0x1c2226});
  add(new THREE.CylinderGeometry(2.6,2.7,9,20),wall,0,4.5,0);
  add(new THREE.CylinderGeometry(2.5,2.6,2,20),iron,0,10,0);
  add(new THREE.CylinderGeometry(3.4,2.5,0.8,20),iron,0,10.8,0);
  add(new THREE.CylinderGeometry(3.4,3.4,0.25,20),iron,0,11.3,0);
  const rail=add(new THREE.TorusGeometry(3.3,0.05,4,28),iron,0,12.4,0);rail.rotation.x=Math.PI/2;
  for(let k=0;k<10;k++){const a=k/10*Math.PI*2;add(new THREE.CylinderGeometry(0.05,0.05,1,4),iron,3.3*Math.cos(a),11.9,3.3*Math.sin(a))}
  // avrundet glassparti med sprosser
  const lanternMat=new THREE.MeshBasicMaterial({color:0xffd88a});
  const prof=[];for(let i=0;i<=8;i++){const v=i/8;prof.push(new THREE.Vector2(1.7+0.25*Math.sin(v*Math.PI),11.4+v*2.6))}
  add(new THREE.LatheGeometry(prof,20),lanternMat,0,0,0);
  for(let k=0;k<8;k++){const a=k/8*Math.PI*2;const b=add(new THREE.CylinderGeometry(0.06,0.06,2.6,4),iron,1.97*Math.cos(a),12.7,1.97*Math.sin(a));b.rotation.y=-a}
  const mid=add(new THREE.TorusGeometry(1.96,0.06,4,24),iron,0,12.7,0);mid.rotation.x=Math.PI/2;
  // kuppel og høy pipe med kule og lynavleder
  add(new THREE.CylinderGeometry(2.15,2.15,0.2,20),iron,0,14.05,0);
  const dome=add(new THREE.SphereGeometry(2.1,20,8,0,Math.PI*2,0,Math.PI/2),iron,0,14.1,0);dome.scale.y=0.55;
  add(new THREE.CylinderGeometry(0.33,0.38,3.4,10),iron,0,16.8,0);
  add(new THREE.SphereGeometry(0.55,12,8),iron,0,18.8,0);
  add(new THREE.CylinderGeometry(0.03,0.03,2.4,4),iron,0,20.5,0);
  // fyrvokterboligen med saltak, gavlen mot tårnet
  const hMat=new THREE.MeshLambertMaterial({color:0x2a3034,emissive:0x0c0f11});
  add(new THREE.BoxGeometry(14,5,8),hMat,8.5,2.5,-1.5);
  const gable=new THREE.Shape();gable.moveTo(-4.4,0);gable.lineTo(0,4.2);gable.lineTo(4.4,0);gable.lineTo(-4.4,0);
  const roofG=new THREE.ExtrudeGeometry(gable,{depth:14.6,bevelEnabled:false});roofG.rotateY(Math.PI/2);
  add(roofG,new THREE.MeshLambertMaterial({color:0x14181b}),1.2,5,-1.5);
  add(new THREE.BoxGeometry(0.9,1.6,0.9),dark,5.5,9.4,-1.5);add(new THREE.BoxGeometry(1.2,1.6,1.2),dark,10.5,9.4,-1.5);
  const winMat=new THREE.MeshBasicMaterial({color:0xffb75a});
  for(const x of [9,12.5])add(new THREE.PlaneGeometry(1,1.5),winMat,x,2.8,2.52)
  add(new THREE.CylinderGeometry(0.06,0.08,15,4),dark,17.5,7.5,3);
  const lightPos=new THREE.Vector3(LH.x,6+1.8*12.7,LH.z);
  // glød
  const gTex=glowTexture();
  const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:gTex,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,fog:true}));
  glow.position.copy(lightPos);scene.add(glow);
  const halo=new THREE.Sprite(new THREE.SpriteMaterial({map:gTex,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,fog:false,opacity:0}));
  halo.position.copy(lightPos);scene.add(halo);
  const streak=new THREE.Sprite(new THREE.SpriteMaterial({map:streakTexture(),blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,fog:true}));
  streak.position.copy(lightPos);scene.add(streak);
  // stråler (roterende blinkpaneler)
  const bTex=beamTexture();const beams=new THREE.Group();beams.position.copy(lightPos);scene.add(beams);
  const beamMat=new THREE.MeshBasicMaterial({map:bTex,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false,opacity:0.12});
  for(let k=0;k<4;k++){
    const arm=new THREE.Group();arm.rotation.y=k*Math.PI/2;
    const g1=new THREE.PlaneGeometry(26,800);g1.rotateX(-Math.PI/2);g1.translate(0,0,400);
    const g2=g1.clone();g2.rotateZ(Math.PI/2);
    arm.add(new THREE.Mesh(g1,beamMat));arm.add(new THREE.Mesh(g2,beamMat));beams.add(arm);
  }
  // reflekser på sjøen
  const refl=new THREE.Mesh(new THREE.PlaneGeometry(14,380),new THREE.MeshBasicMaterial({map:gTex,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:0.0,fog:true}));
  refl.rotation.x=-Math.PI/2;refl.position.set(0,0.4,-230);scene.add(refl);

  // båten
  const rig=new THREE.Group();scene.add(rig);rig.add(camera);
  const wood=new THREE.MeshLambertMaterial({color:0x3b2a1d,emissive:0x0c0805});
  const wood2=new THREE.MeshLambertMaterial({color:0x5a4029,emissive:0x120c07});
  const deckShape=new THREE.Shape();deckShape.moveTo(-3.2,-6);deckShape.lineTo(-3.0,2);deckShape.quadraticCurveTo(-2.4,8,0,11.5);deckShape.quadraticCurveTo(2.4,8,3.0,2);deckShape.lineTo(3.2,-6);deckShape.lineTo(-3.2,-6);
  const deck=new THREE.Mesh(new THREE.ShapeGeometry(deckShape),wood2);deck.rotation.x=-Math.PI/2;deck.position.y=-2.4;
  const boat=new THREE.Group();rig.add(boat);boat.add(deck);
  for(let x=-2.7;x<=2.71;x+=0.6){const zf=-11.2+Math.abs(x)*2.6,len=6-zf;const pl=new THREE.Mesh(new THREE.BoxGeometry(0.035,0.02,len),new THREE.MeshBasicMaterial({color:0x2a1c10}));pl.position.set(x,-2.38,(6+zf)/2);boat.add(pl)}
  const railPts=[[-3.2,6],[-3.0,-2],[-2.6,-5.5],[-1.6,-8.6],[0,-11.5]];
  const capMat=new THREE.MeshLambertMaterial({color:0x9a7a52,emissive:0x2a1d10});
  const addRail=(sgn)=>{for(let i=0;i<railPts.length-1;i++){const a=railPts[i],b=railPts[i+1];const ax=a[0]*sgn,bx=b[0]*sgn;const len=Math.hypot(bx-ax,b[1]-a[1]);
    const ry=Math.atan2(bx-ax,b[1]-a[1]);const r=new THREE.Mesh(new THREE.BoxGeometry(0.22,1.5,len+0.3),wood);r.position.set((ax+bx)/2,-1.7,(a[1]+b[1])/2);r.rotation.y=ry;boat.add(r);
    const cap=new THREE.Mesh(new THREE.BoxGeometry(0.42,0.14,len+0.4),capMat);cap.position.set((ax+bx)/2,-0.92,(a[1]+b[1])/2);cap.rotation.y=ry;boat.add(cap)}};
  addRail(1);addRail(-1);
  const stem=new THREE.Mesh(new THREE.BoxGeometry(0.4,2.0,0.6),capMat);stem.position.set(0,-1.5,-11.4);stem.rotation.x=-0.25;boat.add(stem);
  const lantH=new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.26,0.5,8),new THREE.MeshBasicMaterial({color:0xffb85a}));lantH.position.set(1.6,-1.95,-3.2);boat.add(lantH);
  const deckLight=new THREE.PointLight(0xffb060,1.1,16,2);deckLight.position.set(1.6,-1.3,-3.2);boat.add(deckLight);
  const bow=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.12,7,6),wood);bow.rotation.x=Math.PI/2-0.18;bow.position.set(0,-1.0,-14.4);boat.add(bow);
  const mast=new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.28,30,8),wood);mast.position.set(-0.4,12,2.5);boat.add(mast);
  const stayGeo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.4,24,2.5),new THREE.Vector3(0,-0.6,-17.6)]);
  boat.add(new THREE.Line(stayGeo,new THREE.LineBasicMaterial({color:0x2a2a2a})));
  const coil=new THREE.Mesh(new THREE.TorusGeometry(0.7,0.18,6,18),new THREE.MeshLambertMaterial({color:0x6b5a3a}));coil.rotation.x=Math.PI/2;coil.position.set(1.4,-2.2,-4.5);boat.add(coil);
  const lampB=new THREE.Mesh(new THREE.SphereGeometry(0.18,8,8),new THREE.MeshBasicMaterial({color:0xff4a3a}));lampB.position.set(-2.95,-1.3,-2);boat.add(lampB);

  // regn
  const RN=REDUCED?500:1400;const rg=new THREE.BufferGeometry();const rp=new Float32Array(RN*6);
  for(let i=0;i<RN;i++){const x=(Math.random()-0.5)*80,y=Math.random()*50-5,z=-Math.random()*70+10;rp.set([x,y,z,x+0.15,y+1.4,z],i*6)}
  rg.setAttribute('position',new THREE.BufferAttribute(rp,3));
  const rain=new THREE.LineSegments(rg,new THREE.LineBasicMaterial({color:0x9fb6c8,transparent:true,opacity:0.35,fog:false}));rain.visible=false;rig.add(rain);

  function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;
    camera.fov=w/h<0.8?72:(w/h<1.2?62:52);camera.updateProjectionMatrix()}
  resize();const ro=new ResizeObserver(resize);ro.observe(host);

  let raf=0,lastT=now(),hornT=0,dead=false;
  const hist=[];
  function frame(){
    if(dead)return;raf=requestAnimationFrame(frame);
    if(!state.active){return}
    const t=now(),dt=Math.min(0.1,t-lastT);lastT=t;
    const w=W[state.weather]||W.clear;const k=1-Math.pow(0.02,dt);
    cur.fog+=(w.fog-cur.fog)*k;cur.hor.lerp(w.hor,k);cur.top.lerp(w.top,k);cur.wave+=(w.wave-cur.wave)*k;cur.stars+=(w.stars-cur.stars)*k;
    scene.fog.density=cur.fog;scene.fog.color.copy(cur.hor);skyMat.uniforms.hor.value.copy(cur.hor);skyMat.uniforms.top.value.copy(cur.top);
    starMat.opacity=0.9*cur.stars;stars.visible=cur.stars>0.02;moonS.material.opacity=cur.stars;moon.intensity=0.2+0.55*cur.stars;
    rain.visible=state.weather==='rain';

    // bølger
    const p=sea.attributes.position.array,amp=cur.wave*(REDUCED?0.5:1);
    for(let i=0;i<p.length;i+=3){p[i+1]=waveH(base[i],base[i+2]-200,t,amp)}
    sea.attributes.position.needsUpdate=true;

    // båtens bevegelse
    const a=REDUCED?0.25:1;
    const heave=waveH(0,-6,t,amp)*0.6;
    const pitch=(waveH(0,-10,t,amp)-waveH(0,0,t,amp))*0.05*a;
    const roll=(waveH(3,-4,t,amp)-waveH(-3,-4,t,amp))*0.06*a;
    rig.position.set(0,5.2+heave,0);rig.rotation.set(0,0.13,0);rig.rotateX(pitch+0.015);rig.rotateZ(roll);

    // fyrlyset
    const pat=state.pattern;const I=lightAt(pat,t);
    const fogged=state.weather==='fog';
    const flash=Math.max(0,(I-(pat==='obrestad'?0.3:0))/(pat==='obrestad'?0.7:1));
    const vis=fogged?0:1;
    glow.material.opacity=vis*Math.min(1,0.35+I);
    const gs=pat==='fixed'?22:16+56*flash;glow.scale.set(gs,gs,1);
    streak.material.opacity=vis*flash*0.9;streak.scale.set(30+200*flash,5+8*flash,1);
    halo.material.opacity=fogged?0.10+0.25*flash:0;halo.scale.set(260,260,1);
    lanternMat.color.setRGB(1,0.85,0.55).multiplyScalar(0.6+0.4*I);
    lhLight.intensity=fogged?0.05:(0.35+2.4*flash+(pat==='fixed'?0.4:0));
    refl.material.opacity=vis*(0.10+0.55*flash)*(state.weather==='rain'?0.6:1);
    beams.visible=pat==='obrestad'&&!fogged;
    beams.rotation.y=(t/120)*Math.PI*2;
    beamMat.opacity=state.weather==='rain'?0.22:0.11;

    // tåkesignal
    if(fogged&&t-hornT>20){hornT=t;Sound.horn()}

    // regn
    if(rain.visible){const r=rg.attributes.position.array;for(let i=0;i<r.length;i+=6){r[i+1]-=dt*38;r[i+4]-=dt*38;r[i]+=dt*4;r[i+3]+=dt*4;if(r[i+1]<-6){const y=44+Math.random()*6;r[i+1]=y;r[i+4]=y+1.4;const x=(Math.random()-0.5)*80;r[i]=x;r[i+3]=x+0.15}}rg.attributes.position.needsUpdate=true}

    renderer.render(scene,camera);

    // lyskurve
    hist.push([t,fogged?0:I]);while(hist.length&&hist[0][0]<t-60)hist.shift();
    const cv=state.curve;if(cv){const dpr=Math.min(2,window.devicePixelRatio||1);const cw=cv.clientWidth*dpr,ch=cv.clientHeight*dpr;
      if(cv.width!==cw||cv.height!==ch){cv.width=cw;cv.height=ch}
      const g=cv.getContext('2d');g.clearRect(0,0,cw,ch);
      g.strokeStyle='rgba(159,182,193,.25)';g.lineWidth=1;
      for(let s=0;s<=60;s+=10){const x=cw-(t%10+60-s)/60*cw;if(x>=0){g.beginPath();g.moveTo(x,0);g.lineTo(x,ch);g.stroke()}}
      g.beginPath();g.lineWidth=2*dpr;g.strokeStyle='#ffc35a';g.shadowColor='rgba(255,195,90,.8)';g.shadowBlur=6*dpr;
      hist.forEach(([tt,v],i)=>{const x=cw-(t-tt)/60*cw,y=ch-4*dpr-(ch-8*dpr)*v;i?g.lineTo(x,y):g.moveTo(x,y)});g.stroke();g.shadowBlur=0}
  }
  raf=requestAnimationFrame(frame);
  return {dispose(){dead=true;cancelAnimationFrame(raf);ro.disconnect();renderer.dispose();host.innerHTML=''}};
}

/* ---------- Om bord ---------- */
const PATS=['obrestad','fl5','fl2','fixed'];
function BoatView({t,active,weather,setWeather,sound,toggleSound}){
  const host=useRef(null),curve=useRef(null);
  const st=useRef({active,weather,pattern:'obrestad',curve:null});
  const [taps,setTaps]=useState([]);
  const [game,setGame]=useState(null); // {pat, pick}
  st.current.active=active;st.current.weather=weather;st.current.pattern=game?game.pat:'obrestad';
  useEffect(()=>{st.current.curve=curve.current});
  useEffect(()=>{const s=createScene(host.current,st.current);return()=>s.dispose()},[]);
  const tap=()=>{const n=now();setTaps(a=>[...a.slice(-1),n])};
  let fb=null,fbClass='';
  if(taps.length===1)fb=t.tap1;
  if(taps.length===2){const d=taps[1]-taps[0];fb=t.tapRes.replace('{s}',fmt(d,t.loc));if(Math.abs(d-30)<1.5){fb+=' '+t.tapGood;fbClass='good'}}
  const startGame=(prev)=>{let p;do{p=PATS[Math.floor(Math.random()*PATS.length)]}while(p===prev);
    if(p==='obrestad'){clock.offset+=(30-(((now())%30)+30)%30)-6} setGame({pat:p,pick:null})};
  return html`<div className="view" style=${{visibility:active?'visible':'hidden'}} aria-hidden=${!active}>
    <div className="scene" ref=${host}></div>
    ${!game&&html`<div className="intro"><p>${t.intro}</p><p className="dist">${t.dist}</p></div>`}
    ${weather==='fog'&&html`<div className="fognote" role="status">${t.fog}</div>`}
    <div className="dock"><div className="panel">
      ${!game?html`
        <div className="prow">
          <div className="kenn"><small>${t.kennLbl}</small><b>${t.kenn}</b></div>
          <div className="stats" title=${t.statsNote}>
            <div><small>${t.fixLbl}</small><b>${CD_FIX.toLocaleString(t.loc)}</b> <span>${t.cd}</span></div>
            <div className="fl"><small>${t.flLbl}</small><b>${CD_FL.toLocaleString(t.loc)}</b> <span>${t.cd}</span><em>${t.stronger}</em></div>
            <small className="snote">${t.statsNote}</small>
          </div>
          <div className="curve"><small>${t.curve}</small><canvas ref=${curve} aria-hidden="true"></canvas></div>
        </div>
        <div className="prow">
          <button className="btn" onClick=${tap}>${t.tap}</button>
          <span className="lbl">${t.weather}</span>
          <div className="seg" role="group" aria-label=${t.weather}>
            ${['clear','rain','fog'].map(w=>html`<button key=${w} aria-pressed=${weather===w} onClick=${()=>setWeather(w)}>${t.w[w]}</button>`)}
          </div>
          <span className="spacer"></span>
          <button className="btn ghost" onClick=${toggleSound}>${sound?t.soundOff:t.soundOn}</button>
          <button className="btn" onClick=${()=>{setWeather('clear');startGame()}}>${t.game}</button>
        </div>
        ${fb&&html`<p className=${'feedback '+fbClass} aria-live="polite" style=${{marginTop:10}}>${fb}</p>`}`
      :html`
        <div className="prow"><p className="note" style=${{flex:1}}>${t.gameIntro}</p>
          <div className="curve" style=${{maxWidth:260}}><small>${t.curve}</small><canvas ref=${curve} aria-hidden="true"></canvas></div></div>
        <div className="prow"><div style=${{width:'100%'}}>
          <small className="note" style=${{display:'block',marginBottom:6}}>${t.list}</small>
          <div className="choices">
            ${PATS.map(p=>{let c='';if(game.pick){if(p===game.pat)c='right';else if(p===game.pick)c='wrongc'}
              return html`<button key=${p} className=${c} disabled=${!!game.pick&&game.pick===game.pat} onClick=${()=>setGame(g=>({...g,pick:p}))}>${t.pat[p]}</button>`})}
          </div></div></div>
        <div className="prow">
          <p className=${'feedback '+(game.pick?(game.pick===game.pat?'good':'bad'):'')} aria-live="polite" style=${{flex:1}}>
            ${game.pick?(game.pick===game.pat?t.right:t.wrong):''}</p>
          <button className="btn ghost" onClick=${()=>setGame(null)}>${t.back}</button>
          <button className="btn" onClick=${()=>startGame(game.pat)}>${t.next}</button>
        </div>`}
    </div></div>
  </div>`;
}

/* ---------- Kartet ---------- */
const LAT0=59.06,LAT1=58.35,LON0=4.70,LON1=6.25,CL=Math.cos(58.7*Math.PI/180);
const P=(lat,lon)=>[(lon-LON0)*CL*60,(LAT0-lat)*60]; // nautiske mil
const MW=(LON1-LON0)*CL*60,MH=(LAT0-LAT1)*60;
const COAST=[[59.08,5.62],[59.03,5.57],[59.0,5.55],[58.96,5.58],[58.93,5.56],[58.89,5.55],[58.85,5.55],[58.8,5.53],[58.76,5.5],[58.73,5.49],[58.7,5.52],[58.66,5.55],[58.62,5.59],[58.58,5.64],[58.55,5.67],[58.53,5.73],[58.52,5.79],[58.49,5.82],[58.46,5.86],[58.43,5.88],[58.4,5.9],[58.33,5.96]];
const LANDPATH=(()=>{const pts=COAST.map(([a,b])=>P(a,b));pts.push(P(58.33,6.4),P(59.08,6.4));return 'M'+pts.map(p=>p.map(v=>v.toFixed(2)).join(' ')).join('L')+'Z'})();
const OB=P(58.658,5.554);
const SEC0=162,SEC1=378; // lys sektor, grader fra nord med klokka
const pol=(r,b)=>[OB[0]+r*Math.sin(b*Math.PI/180),OB[1]-r*Math.cos(b*Math.PI/180)];
const arcPath=(r,a0,a1)=>{const s=pol(r,a0),e=pol(r,a1),large=(a1-a0)>180?1:0;return `M${OB[0]} ${OB[1]}L${s[0]} ${s[1]}A${r} ${r} 0 ${large} 1 ${e[0]} ${e[1]}Z`};
const arcLine=(r,a0,a1)=>{const s=pol(r,a0),e=pol(r,a1),large=(a1-a0)>180?1:0;return `M${s[0]} ${s[1]}A${r} ${r} 0 ${large} 1 ${e[0]} ${e[1]}`};
const mix=(a,b,k)=>{const pa=a.match(/\w\w/g).map(h=>parseInt(h,16)),pb=b.match(/\w\w/g).map(h=>parseInt(h,16));return 'rgb('+pa.map((v,i)=>Math.round(v+(pb[i]-v)*k)).join(',')+')'};

function MapView({t,active,weather,setWeather}){
  const [dusk,setDusk]=useState(KIOSK?0.2:0.85);
  const [boat,setBoat]=useState([OB[0]-11,OB[1]+3]);
  const svg=useRef(null),sector=useRef(null),dot=useRef(null),drag=useRef(false);
  const range=Math.min(geoRange(39,3),LUM[weather]);
  useEffect(()=>{if(!active)return;let r;const loop=()=>{r=requestAnimationFrame(loop);const I=weather==='fog'?0.15:lightAt('obrestad',now());
      if(sector.current)sector.current.style.opacity=(0.15+0.85*dusk)*(0.35+0.65*I);
      if(dot.current){dot.current.setAttribute('r',0.5+1.4*I);dot.current.style.opacity=0.4+0.6*Math.max(dusk,0.3)}};loop();return()=>cancelAnimationFrame(r)},[active,dusk,weather]);
  // kiosk-animasjon
  useEffect(()=>{if(!KIOSK||!active)return;let r,s=performance.now();const loop=()=>{r=requestAnimationFrame(loop);const k=(performance.now()-s)/1000;
      setDusk(Math.min(0.95,0.2+k/10));const ang=200+60*Math.sin(k/5);const rr=8+10*(0.5+0.5*Math.sin(k/3.3));setBoat(pol(rr,ang))};loop();return()=>cancelAnimationFrame(r)},[active]);
  const toLocal=(e)=>{const s=svg.current;const pt=s.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;const p=pt.matrixTransform(s.getScreenCTM().inverse());
    return [Math.max(0.5,Math.min(MW-0.5,p.x)),Math.max(0.5,Math.min(MH-0.5,p.y))]};
  const onDown=e=>{drag.current=true;e.currentTarget.setPointerCapture&&e.currentTarget.setPointerCapture(e.pointerId);setBoat(toLocal(e))};
  const onMove=e=>{if(drag.current)setBoat(toLocal(e))};
  const onUp=()=>{drag.current=false};
  const onKey=e=>{const m={ArrowLeft:[-0.6,0],ArrowRight:[0.6,0],ArrowUp:[0,-0.6],ArrowDown:[0,0.6]}[e.key];if(m){e.preventDefault();setBoat(b=>[b[0]+m[0],b[1]+m[1]])}};
  const dx=boat[0]-OB[0],dy=boat[1]-OB[1],dist=Math.hypot(dx,dy);
  let bear=Math.atan2(dx,-dy)*180/Math.PI;if(bear<0)bear+=360;
  const lit=bear>=SEC0||bear<=SEC1-360;
  const status=!lit?['no',t.dark,t.darkShort]:dist>range?['no',t.far,t.farShort]:['ok',t.vis.replace('{d}',fmt(dist,t.loc)),t.seeShort];
  const seaC=mix('9cc0cc','081822',dusk),landC=mix('d8cfb3','10181b',dusk),lineC=mix('6d8c96','2c4652',dusk),txtC=dusk>0.5?'#9fb6c1':'#2f4a56';
  return html`<div className="view mapwrap">
    <div className="mapbox" style=${{background:seaC}}>
      <div className=${'mapinfo '+status[0]} aria-hidden="true">
        <b>${status[2]}</b>
        <div><span className="num">${fmt(dist,t.loc)}</span> <span>${t.nm} ${t.fromLight}</span></div>
      </div>
      <svg ref=${svg} viewBox=${`0 0 ${MW} ${MH}`} preserveAspectRatio="xMidYMid meet" onPointerMove=${onMove} onPointerUp=${onUp} onPointerLeave=${onUp} role="img" aria-label="Kart">
        <defs>
          <radialGradient id="sg" cx=${OB[0]} cy=${OB[1]} r=${range} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffe39a" stopOpacity="0.85"/><stop offset="0.5" stopColor="#ffc35a" stopOpacity="0.35"/><stop offset="1" stopColor="#ffb340" stopOpacity="0.05"/>
          </radialGradient>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M5 0H0V5" fill="none" stroke=${lineC} strokeWidth="0.06" opacity="0.6"/></pattern>
        </defs>
        <rect width=${MW} height=${MH} fill=${seaC}/>
        <rect width=${MW} height=${MH} fill="url(#grid)"/>
        <path ref=${sector} d=${arcPath(range,SEC0,SEC1)} fill="url(#sg)"/>
        <path d=${arcLine(range,SEC0,SEC1)} fill="none" stroke="#ffc35a" strokeWidth="0.18" strokeDasharray="0.8 0.6" opacity="0.9"/>
        <path d=${LANDPATH} fill=${landC} stroke=${lineC} strokeWidth="0.15"/>
        ${[[58.97,5.73,'Stavanger'],[58.45,6.0,'Egersund']].map(([a,b,n])=>{const p=P(a,b);return html`<g key=${n}><circle cx=${p[0]} cy=${p[1]} r="0.35" fill=${txtC}/><text x=${p[0]+0.7} y=${p[1]+0.4} fontSize="1.25" fill=${txtC} fontFamily="Barlow,sans-serif">${n}</text></g>`})}
        <text x=${P(58.6,5.66)[0]+0.4} y=${P(58.6,5.66)[1]} fontSize="1.05" fill=${txtC} fontFamily="IM Fell English,Georgia,serif" fontStyle="italic">Varhaugstranda</text>
        <text x=${MW*0.12} y=${MH*0.5} fontSize="2.4" fill=${txtC} opacity="0.55" fontFamily="IM Fell English,Georgia,serif" fontStyle="italic" letterSpacing="0.3">${t.sea}</text>
        <g>
          <circle ref=${dot} cx=${OB[0]} cy=${OB[1]} r="1" fill="#fff3c8"/>
          <circle cx=${OB[0]} cy=${OB[1]} r="0.45" fill="#ffc35a" stroke="#3a1a10" strokeWidth="0.1"/>
          <text x=${OB[0]+1.1} y=${OB[1]-0.9} fontSize="1.35" fontWeight="700" fill=${dusk>0.5?'#ffe6a8':'#3a2a10'} fontFamily="Barlow,sans-serif">Obrestad fyr</text>
        </g>
        <g className="boat-handle" tabIndex="0" role="slider" aria-label=${t.boat} aria-valuetext=${status[1]} onKeyDown=${onKey} onPointerDown=${onDown} transform=${`translate(${boat[0]} ${boat[1]})`}>
          <circle r="2.2" fill="transparent"/>
          <circle className="focusring" r="2" fill="none" stroke="#7cc4ff" strokeWidth="0.18"/>
          <path d="M-1.2 0.1 L1.2 0.1 L0.85 0.75 L-0.85 0.75Z" fill=${status[0]==='ok'?'#8fe0ae':'#e6eef0'} stroke="#081822" strokeWidth="0.1"/>
          <path d="M0 -1.6 L0 0.1 M0.1 -1.5 L1.0 -0.05 L0.1 -0.05Z" fill=${status[0]==='ok'?'#8fe0ae':'#e6eef0'} stroke="#081822" strokeWidth="0.08"/>
          ${status[0]==='ok'&&html`<line x1="0" y1="0" x2=${OB[0]-boat[0]} y2=${OB[1]-boat[1]} stroke="#ffc35a" strokeWidth="0.1" strokeDasharray="0.4 0.4" opacity="0.8"/>`}
          <text className="boatnm" y=${boat[1]>MH-3?-2.2:2.3} textAnchor="middle" fontSize="1.3" fontWeight="700" fontFamily="Barlow,sans-serif">${fmt(dist,t.loc)} nm</text>
        </g>
      </svg>
    </div>
    <div className="side">
      <h2>${t.mapH}</h2>
      <p className="serif">${t.mapIntro}</p>
      <div className="slider"><label htmlFor="dusk">${t.dusk}<span>${dusk<0.5?t.day:t.night}</span></label>
        <input id="dusk" type="range" min="0" max="1" step="0.01" value=${dusk} onInput=${e=>setDusk(+e.target.value)} onChange=${e=>setDusk(+e.target.value)}/></div>
      <div className="seg" role="group" aria-label=${t.weather} style=${{marginBottom:14,width:'fit-content'}}>
        ${['clear','rain','fog'].map(w=>html`<button key=${w} aria-pressed=${weather===w} onClick=${()=>setWeather(w)}>${t.w[w]}</button>`)}
      </div>
      <p className="note" style=${{marginBottom:8}}>${t.drag}</p>
      <p className=${'status '+status[0]} aria-live="polite">${status[1]}</p>
      <div className="legend"><span><i style=${{background:'#ffc35a'}}></i>${t.legSector}</span><span><i style=${{border:'1.5px dashed #ffc35a'}}></i>${t.legRange}: ${fmt(range,t.loc)} nm</span></div>
      <p className="note" style=${{fontSize:13}}>${t.mapNote}</p>
    </div>
  </div>`;
}

/* ---------- Hvor langt? ---------- */
function RangeView({t,active}){
  const [h,setH]=useState(39),[e,setE]=useState(3);
  useEffect(()=>{if(!KIOSK||!active)return;let r,s=performance.now();const loop=()=>{r=requestAnimationFrame(loop);const k=(performance.now()-s)/1000;
    setE(Math.round((1.5+13.5*(0.5-0.5*Math.cos(k/2.4)))*2)/2)};loop();return()=>cancelAnimationFrame(r)},[active]);
  const dl=2.08*Math.sqrt(h),de=2.08*Math.sqrt(e),d=dl+de;
  // sy: piksler per meter høyde. Lav verdi gir flat jord, men høydene må da forstørres mindre.
  const VW=680,VH=250,x0=56,k=560/30,Y0=104,sy=1.1,a=sy/Math.pow(2.08*k,2),AX=VH-22;
  const xh=x0+dl*k,xb=x0+d*k;
  const s=x=>Y0+a*Math.pow(x-xh,2);
  let seaP='M0 '+VH;for(let x=0;x<=VW;x+=8)seaP+=` L${x} ${Math.min(VH+5,s(x)).toFixed(1)}`;seaP+=` L${VW} ${VH}Z`;
  let crest='';for(let x=0;x<=VW;x+=8)crest+=(x?' L':'M')+`${x} ${Math.min(VH+5,s(x)).toFixed(1)}`;
  const baseL=s(x0),baseB=s(xb);
  const presets=[['row',1.5],['fish',3],['mast',20]];
  return html`<div className="view rangewrap"><div className="rangein">
    <h2>${t.rH}</h2><p className="lead">${t.rLead}</p>
    <div className="diagram"><svg viewBox=${`0 0 ${VW} ${VH}`} role="img" aria-label=${t.rH}>
      <defs><linearGradient id="nsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#040b12"/><stop offset="1" stopColor="#173244"/></linearGradient>
        <linearGradient id="nsea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#12384c"/><stop offset="1" stopColor="#071a24"/></linearGradient></defs>
      <rect width=${VW} height=${VH} fill="url(#nsky)"/>
      ${[[90,30],[200,55],[330,22],[470,48],[610,30],[540,80],[150,90]].map(([x,y],i)=>html`<circle key=${i} cx=${x} cy=${y} r="1.1" fill="#dfe8ff" opacity="0.7"/>`)}
      <polygon points=${`${x0} ${Y0} ${VW} ${Y0-26} ${VW} ${Y0+26}`} fill="#ffc35a" opacity="0.09"/>
      <path d=${seaP} fill="url(#nsea)"/>
      <path d=${crest} fill="none" stroke="#5e8a9a" strokeWidth="1.2"/>
      <line x1=${x0} y1=${Y0} x2=${Math.min(VW,xb+60)} y2=${Y0} stroke="#ffc35a" strokeWidth="2" strokeDasharray="6 5" opacity="0.9"/>
      <g fontFamily="Barlow,sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
        <text x=${(x0+xh)/2} y=${Y0-8} fill="#ffd27a">${fmt(dl,t.loc)} nm</text>
        <text x=${(xh+xb)/2} y=${Y0-8} fill="#e6eef0">${fmt(de,t.loc)} nm</text>
      </g>
      <g fontFamily="Barlow,sans-serif" fontSize="11" fill="#9fb6c1">
        <line x1=${x0} y1=${AX} x2=${x0+30*k} y2=${AX} stroke="#5e8a9a"/>
        ${[0,5,10,15,20,25,30].map(n=>html`<g key=${n}><line x1=${x0+n*k} y1=${AX-4} x2=${x0+n*k} y2=${AX+4} stroke="#5e8a9a"/>
          <text x=${x0+n*k} y=${AX+16} textAnchor="middle">${n}${n===30?' nm':''}</text></g>`)}
      </g>
      <g>
        <rect x=${x0-5} y=${Y0+4} width="10" height=${Math.max(0,baseL-Y0-4)} fill="#d7dcdf"/>
        <rect x=${x0-5} y=${Y0+4+(baseL-Y0-4)*0.35} width="10" height=${(baseL-Y0-4)*0.12} fill="#b2382f"/>
        <rect x=${x0-6} y=${Y0-6} width="12" height="10" rx="2" fill="#ffd27a"/>
        <circle cx=${x0} cy=${Y0} r="14" fill="#ffc35a" opacity="0.25"/>
        <text x=${x0} y=${Math.min(AX-10,baseL+16)} textAnchor="middle" fontSize="12" fill="#e6eef0" fontFamily="Barlow,sans-serif">${t.light}</text>
      </g>
      <g>
        <line x1=${xh} y1=${Y0-10} x2=${xh} y2=${Y0+10} stroke="#9fb6c1" strokeWidth="1"/>
        <text x=${xh} y=${Y0-28} textAnchor="middle" fontSize="12" fill="#9fb6c1" fontFamily="Barlow,sans-serif">${t.horizon}</text>
      </g>
      <g>
        <path d=${`M${xb-16} ${baseB-2} L${xb+16} ${baseB-2} L${xb+11} ${baseB+6} L${xb-11} ${baseB+6}Z`} fill="#c7a46a"/>
        <line x1=${xb} y1=${baseB-2} x2=${xb} y2=${Y0} stroke="#c7a46a" strokeWidth="2"/>
        <circle cx=${xb} cy=${Y0} r="4" fill="#e6eef0"/>
        <text x=${xb} y=${Math.min(AX-10,baseB+22)} textAnchor="middle" fontSize="12" fill="#e6eef0" fontFamily="Barlow,sans-serif">${t.boat}</text>
      </g>
    </svg></div>
    <div className="rgrid">
      <div className="slider" style=${{margin:0}}>
        <label htmlFor="lh">${t.lightH}<span>${h} m</span></label>
        <input id="lh" type="range" min="5" max="60" step="1" value=${h} onInput=${ev=>setH(+ev.target.value)} onChange=${ev=>setH(+ev.target.value)}/>
        <p className="note" style=${{fontSize:13}}>${t.today}</p>
      </div>
      <div className="slider" style=${{margin:0}}>
        <label htmlFor="eh">${t.eyeH}<span>${fmt(e,t.loc,1)} m</span></label>
        <input id="eh" type="range" min="1" max="30" step="0.5" value=${e} onInput=${ev=>setE(+ev.target.value)} onChange=${ev=>setE(+ev.target.value)}/>
        <div className="presets">${presets.map(([key,v])=>html`<button key=${key} aria-pressed=${e===v} onClick=${()=>setE(v)}>${t.pre[key]} (${fmt(v,t.loc,v%1?1:0)} m)</button>`)}</div>
      </div>
      <div className="result" aria-live="polite">
        <small>${t.res}</small>
        <div><span className="num">${fmt(d,t.loc)}</span> <span className="unit">${t.nm}</span></div>
        <div className="km">≈ ${fmt(d*1.852,t.loc,0)} ${t.km}</div>
      </div>
    </div>
    <p className="note" style=${{marginTop:8,fontSize:13}}>${t.exag}</p>
    <div className="segs">
      <span><i style=${{background:'#ffd27a'}}></i>${t.segL}: <b>${fmt(dl,t.loc)} ${t.nm}</b></span>
      <span>+</span>
      <span><i style=${{background:'#e6eef0'}}></i>${t.segE}: <b>${fmt(de,t.loc)} ${t.nm}</b></span>
      <span>=</span>
      <span><b>${fmt(d,t.loc)} ${t.nm}</b></span>
    </div>
    <p className="note" style=${{marginTop:14}}>${t.beyond}</p>
    <div className="formula">${t.formula}<code>d ≈ 2,08 × (√${t.lightH.toLowerCase()} + √${t.eyeH.toLowerCase()})</code></div>
    <p className="note" style=${{marginTop:12,maxWidth:'70ch'}}>${t.rNote}</p>
  </div></div>`;
}

/* ---------- appen ---------- */
function App({lang,kiosk,onDone}){
  const [view,setView]=useState(0);
  const [weather,setWeather]=useState('clear');const [sound,setSound]=useState(false);
  const t=T[lang];
  useEffect(()=>{if(!kiosk)return;const order=[[0,60],[1,30],[2,25]];let i=0,to;
    const step=()=>{const [v,s]=order[i];setView(v);if(v===0)setWeather('clear');to=setTimeout(()=>{i++;if(i>=order.length){onDone&&onDone();return}step()},s*1000)};step();return()=>clearTimeout(to)},[]);
  useEffect(()=>()=>{if(Sound.on)Sound.disable()},[]);
  const toggleSound=()=>{if(Sound.on){Sound.disable();setSound(false)}else{Sound.enable();setSound(true)}};
  return html`<div className=${'app'+(kiosk?' kiosk':'')}>
    <header className="top">
      <nav className="tabs" aria-label=${t.chapter}>${t.tabs.map((n,i)=>html`<button key=${i} aria-pressed=${view===i} onClick=${()=>setView(i)}>${n}</button>`)}</nav>
    </header>
    <main className="stage">
      <${BoatView} t=${t} active=${view===0} weather=${weather} setWeather=${setWeather} sound=${sound} toggleSound=${toggleSound}/>
      ${view===1&&html`<${MapView} t=${t} active=${true} weather=${weather} setWeather=${setWeather}/>`}
      ${view===2&&html`<${RangeView} t=${t} active=${true}/>`}
    </main>
  </div>`;
}
window.OF_M1=App;
})();
