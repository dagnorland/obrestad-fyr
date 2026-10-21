(function(){
const {useState,useEffect,useRef,useMemo}=React;
const html=htm.bind(React.createElement);
const KIOSK=new URLSearchParams(location.search).has('kiosk');
const REDUCED=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const D=Math.PI/180;
const fmt=(n,loc,d=1)=>n.toLocaleString(loc,{minimumFractionDigits:d,maximumFractionDigits:d});
const gauss=(d,s)=>Math.exp(-d*d/(2*s*s));

/* ---------------- tekster ---------------- */
const T={
nb:{loc:'nb-NO',chapter:'Kapittel 2: Optikeren og urmakeren',tabs:['Folkene','Lyset','Urverket'],
 heroH:'Optikeren og urmakeren',
 heroLead:'Et fyrlys trenger to slags presisjon. Optikeren gjorde lyset sterkt og samlet. Urmakeren gjorde blinket nøyaktig. Fyret på Obrestad er resultatet av at to håndverk fra Paris fant hverandre.',
 laneO:'Optikken',laneC:'Urverket',
 o:[['1819','Augustin Fresnel','Fysiker og ingeniør, hentet inn i Frankrikes fyrkommisjon. Han regnet ut formen på hver glassring og hvert prisme, og fant ut at linsen kunne bygges av mange deler. Da kunne den bli stor.'],
    ['1820–1823','François Soleil','Optiker i Paris. Han laget operakikkerter, prismer og mikroskoper, med linser som sjelden var større enn 10 cm. Fresnel ba om glassringer på opptil 90 cm. Soleil utviklet støping i jernformer og store poleringsbenker for å klare det.'],
    ['1823','Cordouan-fyret','Den første Fresnel-linsen i et fyr tennes 25. juli 1823 ved Gironde-elvas munning. Lyset ses helt ut til horisonten.']],
 c:[['1740-tallet','Lepaute-familien','Urmakere i Paris som laget ur for konge og keiser, tårnur og ur til observatorier. Kunnskapen om presise tannhjul gikk i arv i familien.'],
    ['1823','Problemet','Den første roterende Fresnel-linsen ble drevet av et urverk med ankergang. Det gikk i rykk, og rykkene slet på det tunge glasset.'],
    ['1825','Augustin-Michel Henry','Urmakeren møter Fresnel i Dunkerque i 1824. Noen måneder senere har han laget et urverk med sentrifugalregulator, den «flyvende pendelen». Rotasjonen blir jevn og kontinuerlig. Maskinen testes for fyrkommisjonen 25. mars 1825.']],
 meetYr:'1838–1873',meetH:'Under samme tak',
 meetP:'I 1838 åpner Henry en linsefabrikk vegg i vegg med urverkstedet. Optikk og urverk lages nå av samme firma, Henry-Lepaute. På 1860-tallet tar sønnene over: Léon leder optikken og Paul urverkene. I 1873 leverer de apparatet til Obrestad.',
 beforeH:'Hva var det før?',
 before:[['Vippefyr','Åpen ild av ved eller kull. Svakt lys som flakket i vinden, og ingen rytme å kjenne igjen.'],
         ['Lamper med speil','Oljelamper med blanke metallspeil. Bedre, men speilene slukte en del av lyset og måtte poleres hele tiden.'],
         ['Linse og regulert urverk','Glasset samlet langt mer av lyset, og urverket ga hvert fyr sin egen, nøyaktige rytme. Det ble Obrestads løsning.']],
 lightH:'Optikerens presisjon',lightLead:'En flamme lyser til alle kanter. Optikerens jobb var å samle lyset til en flat stråle mot horisonten. Prøv selv.',
 modeOld:'Eldre fyr: lampe og speil',modeNew:'Fresnel-linse',prisms:'Prismer over og under',refl:'Reflektor mot land',
 flame:'Flytt flammen',fromFocus:'{mm} mm fra brennpunktet',meter:'Lys som går ut mot horisonten',model:'Forenklet modell. Tallene viser prinsippet.',
 inFocus:'Flammen står i brennpunktet. Strålene går parallelt ut mot havet.',nearFocus:'Litt utenfor brennpunktet. Strålen begynner å spre seg.',offFocus:'For langt fra brennpunktet. Lyset spres, og fyret ses kortere.',
 ex:[['Hver ring sin vinkel','Fresnel regnet ut vinkelen for hver eneste glassring, slik at alle pekte mot samme punkt: brennpunktet.'],
     ['Slipt på millimeteren','Optikeren måtte slipe glasset så nøyaktig at ringene virket som én linse. Noen millimeter feil, og strålen sprer seg.'],
     ['Flammen sto stille','Lampen hadde konstant oljenivå, så flammen ikke sank i løpet av natten. Reflektoren mot land står i fakturaen som «panneau de réflecteur catadioptrique».']],
 clockH:'Urmakerens presisjon',clockLead:'Lyset alene var ikke nok. Hvert fyr trengte sin egen rytme, og den måtte være lik hele natten. Det var urmakerens jobb.',
 regLbl:'Regulator',reg:{none:'Ingen',escape:'Ankergang (1823)',fly:'Flyvende pendel (1825)'},
 teeth:'Tenner på drivhjulet',panels:'Blinkpaneler',speed:'Fart',wind:'Vind opp loddet',
 calc:'Beregnet: blink hvert {s} sekund',measured:'Målt mellom blinkene',weight:'Loddet',jerk:'Rykk i glasset',
 challenge:'Utfordring: få blinket til å komme hvert 30. sekund. Det finnes to løsninger.',
 success:'Du har gjort urmakerens jobb: 30 sekunder, blink etter blink.',
 noneMsg:'Uten regulator drar loddet maskinen fortere og fortere. Blinkene kommer tettere, og ingen sjømann ville kjent igjen fyret.',
 escMsg:'Ankergangen holder takten, men linsen går i rykk. Hvert rykk sliter på et glassapparat som veier flere hundre kilo.',
 flyMsg:'Den flyvende pendelen: jo fortere den snurrer, jo mer bremser den. Farten finner en fast verdi, og linsen glir jevnt rundt.',
 empty:'Loddet har nådd bunnen. Fyrvokteren må vinde opp.',
 topCap:'Ovenfra: linsebordet med blinkpanelene',machCap:'Maskinen: lodd, tannhjul og regulator',
 cx:[['Loddet','Tyngdekraften er lik hele tiden. Loddet gir en jevn kraft hele natten, uten fjær som slakker av.'],
     ['Tannhjulene','Utvekslingen bestemmer hvor fort linsen går. Tenner telles, ikke måles, så forholdet er helt eksakt.'],
     ['Regulatoren','Den flyvende pendelen bremser mer jo fortere den går. Slik holdes farten jevn, og glasset slipper rykk.']],
 kiosk:'Utforsk selv på mobilen: skann QR-koden ved skjermen.'},
de:{loc:'de-DE',chapter:'Kapitel 2: Der Optiker und der Uhrmacher',tabs:['Die Menschen','Das Licht','Das Uhrwerk'],
 heroH:'Der Optiker und der Uhrmacher',
 heroLead:'Ein Leuchtfeuer braucht zwei Arten von Präzision. Der Optiker machte das Licht stark und gebündelt. Der Uhrmacher machte den Blitz pünktlich. Der Leuchtturm Obrestad entstand, weil zwei Handwerke aus Paris zueinanderfanden.',
 laneO:'Die Optik',laneC:'Das Uhrwerk',
 o:[['1819','Augustin Fresnel','Physiker und Ingenieur, in die französische Leuchtturmkommission geholt. Er berechnete die Form jedes Glasrings und jedes Prismas und erkannte, dass die Linse aus vielen Teilen gebaut werden konnte. So konnte sie groß werden.'],
    ['1820–1823','François Soleil','Optiker in Paris. Er baute Operngläser, Prismen und Mikroskope, mit Linsen, die selten größer als 10 cm waren. Fresnel verlangte Glasringe bis zu 90 cm. Soleil entwickelte das Gießen in Eisenformen und große Polierbänke, um das zu schaffen.'],
    ['1823','Leuchtturm Cordouan','Die erste Fresnel-Linse in einem Leuchtturm wird am 25. Juli 1823 an der Gironde-Mündung entzündet. Das Licht ist bis zum Horizont zu sehen.']],
 c:[['1740er','Die Familie Lepaute','Uhrmacher in Paris, die Uhren für König und Kaiser, Turmuhren und Uhren für Sternwarten bauten. Das Wissen um präzise Zahnräder wurde in der Familie weitergegeben.'],
    ['1823','Das Problem','Die erste drehende Fresnel-Linse wurde von einem Uhrwerk mit Ankerhemmung angetrieben. Es lief ruckartig, und die Rucke belasteten das schwere Glas.'],
    ['1825','Augustin-Michel Henry','Der Uhrmacher trifft Fresnel 1824 in Dünkirchen. Wenige Monate später baut er ein Uhrwerk mit Fliehkraftregler, dem „fliegenden Pendel“. Die Drehung wird gleichmäßig und stetig. Die Maschine wird am 25. März 1825 der Kommission vorgeführt.']],
 meetYr:'1838–1873',meetH:'Unter einem Dach',
 meetP:'1838 eröffnet Henry eine Linsenfabrik direkt neben der Uhrwerkstatt. Optik und Uhrwerk kommen nun aus einer Firma, Henry-Lepaute. In den 1860er-Jahren übernehmen die Söhne: Léon leitet die Optik, Paul die Uhrwerke. 1873 liefern sie den Apparat nach Obrestad.',
 beforeH:'Was gab es vorher?',
 before:[['Wippfeuer','Offenes Feuer aus Holz oder Kohle. Schwaches, flackerndes Licht und kein Rhythmus zum Wiedererkennen.'],
         ['Lampen mit Spiegeln','Öllampen mit blanken Metallspiegeln. Besser, aber die Spiegel schluckten einen Teil des Lichts und mussten ständig poliert werden.'],
         ['Linse und geregeltes Uhrwerk','Das Glas sammelte weit mehr Licht, und das Uhrwerk gab jedem Leuchtturm seinen eigenen, genauen Rhythmus. Das war die Lösung für Obrestad.']],
 lightH:'Die Präzision des Optikers',lightLead:'Eine Flamme leuchtet in alle Richtungen. Der Optiker musste das Licht zu einem flachen Strahl zum Horizont bündeln. Probier es aus.',
 modeOld:'Älterer Turm: Lampe und Spiegel',modeNew:'Fresnel-Linse',prisms:'Prismen oben und unten',refl:'Reflektor zur Landseite',
 flame:'Flamme verschieben',fromFocus:'{mm} mm vom Brennpunkt',meter:'Licht, das zum Horizont geht',model:'Vereinfachtes Modell. Die Zahlen zeigen das Prinzip.',
 inFocus:'Die Flamme steht im Brennpunkt. Die Strahlen gehen parallel aufs Meer.',nearFocus:'Etwas neben dem Brennpunkt. Der Strahl beginnt sich zu weiten.',offFocus:'Zu weit vom Brennpunkt. Das Licht streut, und der Turm ist weniger weit zu sehen.',
 ex:[['Jeder Ring sein Winkel','Fresnel berechnete den Winkel jedes einzelnen Glasrings, damit alle auf denselben Punkt zielten: den Brennpunkt.'],
     ['Auf den Millimeter geschliffen','Das Glas musste so genau geschliffen sein, dass die Ringe wie eine Linse wirkten. Ein paar Millimeter daneben, und der Strahl streut.'],
     ['Die Flamme stand still','Die Lampe hatte einen konstanten Ölstand, damit die Flamme in der Nacht nicht sank. Der Reflektor zur Landseite steht in der Rechnung als „panneau de réflecteur catadioptrique“.']],
 clockH:'Die Präzision des Uhrmachers',clockLead:'Licht allein genügte nicht. Jeder Leuchtturm brauchte seinen eigenen Rhythmus, und der musste die ganze Nacht gleich bleiben. Das war die Aufgabe des Uhrmachers.',
 regLbl:'Regler',reg:{none:'Keiner',escape:'Ankerhemmung (1823)',fly:'Fliegendes Pendel (1825)'},
 teeth:'Zähne am Antriebsrad',panels:'Blitzpaneele',speed:'Tempo',wind:'Gewicht aufziehen',
 calc:'Berechnet: Blitz alle {s} Sekunden',measured:'Gemessen zwischen den Blitzen',weight:'Gewicht',jerk:'Rucke im Glas',
 challenge:'Aufgabe: Lass den Blitz alle 30 Sekunden kommen. Es gibt zwei Lösungen.',
 success:'Du hast die Arbeit des Uhrmachers gemacht: 30 Sekunden, Blitz für Blitz.',
 noneMsg:'Ohne Regler zieht das Gewicht die Maschine immer schneller. Die Blitze kommen dichter, und kein Seemann würde den Leuchtturm erkennen.',
 escMsg:'Die Ankerhemmung hält den Takt, aber die Linse bewegt sich ruckartig. Jeder Ruck belastet einen Glasapparat von mehreren hundert Kilo.',
 flyMsg:'Das fliegende Pendel: Je schneller es dreht, desto stärker bremst es. Das Tempo findet einen festen Wert, und die Linse gleitet gleichmäßig.',
 empty:'Das Gewicht ist unten angekommen. Der Wärter muss aufziehen.',
 topCap:'Von oben: der Linsentisch mit den Blitzpaneelen',machCap:'Die Maschine: Gewicht, Zahnräder und Regler',
 cx:[['Das Gewicht','Die Schwerkraft ist immer gleich. Das Gewicht liefert die ganze Nacht eine gleichmäßige Kraft, ohne Feder, die nachlässt.'],
     ['Die Zahnräder','Die Übersetzung bestimmt, wie schnell die Linse läuft. Zähne werden gezählt, nicht gemessen, daher ist das Verhältnis ganz exakt.'],
     ['Der Regler','Das fliegende Pendel bremst umso mehr, je schneller es läuft. So bleibt das Tempo gleich, und das Glas wird nicht geruckt.']],
 kiosk:'Selbst entdecken auf dem Handy: Scanne den QR-Code neben dem Bildschirm.'},
en:{loc:'en-GB',chapter:'Chapter 2: The optician and the clockmaker',tabs:['The people','The light','The clockwork'],
 heroH:'The optician and the clockmaker',
 heroLead:'A lighthouse needs two kinds of precision. The optician made the light strong and concentrated. The clockmaker made the flash exact. Obrestad lighthouse exists because two crafts from Paris found each other.',
 laneO:'The optics',laneC:'The clockwork',
 o:[['1819','Augustin Fresnel','Physicist and engineer, brought onto France’s lighthouse commission. He calculated the shape of every glass ring and prism, and realised the lens could be built from many pieces. That meant it could be large.'],
    ['1820–1823','François Soleil','An optician in Paris. He made opera glasses, prisms and microscopes, with lenses rarely larger than 10 cm. Fresnel asked for glass rings up to 90 cm. Soleil developed casting in iron moulds and large polishing lathes to manage it.'],
    ['1823','Cordouan lighthouse','The first Fresnel lens in a lighthouse is lit on 25 July 1823 at the mouth of the Gironde. The light is visible all the way to the horizon.']],
 c:[['1740s','The Lepaute family','Paris clockmakers who built clocks for king and emperor, tower clocks and clocks for observatories. Knowledge of precise gears passed down through the family.'],
    ['1823','The problem','The first rotating Fresnel lens was driven by a clockwork with an anchor escapement. It moved in jerks, and the jerks strained the heavy glass.'],
    ['1825','Augustin-Michel Henry','The clockmaker meets Fresnel in Dunkirk in 1824. A few months later he has built a clockwork with a centrifugal regulator, the “flying pendulum”. The rotation becomes smooth and continuous. The machine is tested for the commission on 25 March 1825.']],
 meetYr:'1838–1873',meetH:'Under one roof',
 meetP:'In 1838 Henry opens a lens factory next door to the clock workshop. Optics and clockwork now come from one firm, Henry-Lepaute. In the 1860s his sons take over: Léon runs the optics and Paul the clockworks. In 1873 they deliver the apparatus for Obrestad.',
 beforeH:'What came before?',
 before:[['Coal-fire beacons','An open fire of wood or coal. Weak light flickering in the wind, and no rhythm to recognise.'],
         ['Lamps with mirrors','Oil lamps with polished metal mirrors. Better, but the mirrors swallowed part of the light and constantly needed polishing.'],
         ['Lens and regulated clockwork','The glass gathered far more of the light, and the clockwork gave each lighthouse its own exact rhythm. That was Obrestad’s solution.']],
 lightH:'The optician’s precision',lightLead:'A flame shines in every direction. The optician’s job was to gather the light into a flat beam towards the horizon. Try it yourself.',
 modeOld:'Older light: lamp and mirror',modeNew:'Fresnel lens',prisms:'Prisms above and below',refl:'Reflector on the land side',
 flame:'Move the flame',fromFocus:'{mm} mm from the focal point',meter:'Light heading for the horizon',model:'Simplified model. The numbers show the principle.',
 inFocus:'The flame is at the focal point. The rays travel out to sea in parallel.',nearFocus:'Slightly off the focal point. The beam starts to spread.',offFocus:'Too far from the focal point. The light scatters, and the lighthouse is seen less far.',
 ex:[['Each ring its angle','Fresnel calculated the angle of every single glass ring so that all of them aimed at the same point: the focal point.'],
     ['Ground to the millimetre','The glass had to be ground so precisely that the rings acted as one lens. A few millimetres off, and the beam spreads.'],
     ['The flame stood still','The lamp kept a constant oil level so the flame wouldn’t sink during the night. The land-side reflector appears on the invoice as “panneau de réflecteur catadioptrique”.']],
 clockH:'The clockmaker’s precision',clockLead:'Light alone wasn’t enough. Each lighthouse needed its own rhythm, and it had to stay the same all night. That was the clockmaker’s job.',
 regLbl:'Regulator',reg:{none:'None',escape:'Anchor escapement (1823)',fly:'Flying pendulum (1825)'},
 teeth:'Teeth on the drive wheel',panels:'Flash panels',speed:'Speed',wind:'Wind up the weight',
 calc:'Calculated: a flash every {s} seconds',measured:'Measured between flashes',weight:'Weight',jerk:'Jolts in the glass',
 challenge:'Challenge: make the flash come every 30 seconds. There are two solutions.',
 success:'You’ve done the clockmaker’s job: 30 seconds, flash after flash.',
 noneMsg:'Without a regulator the weight drives the machine faster and faster. The flashes come closer together, and no sailor would recognise the lighthouse.',
 escMsg:'The escapement keeps time, but the lens moves in jerks. Every jolt strains a glass apparatus weighing several hundred kilos.',
 flyMsg:'The flying pendulum: the faster it spins, the harder it brakes. The speed settles at a fixed value, and the lens glides round smoothly.',
 empty:'The weight has reached the bottom. The keeper must wind it up.',
 topCap:'From above: the lens table with the flash panels',machCap:'The machine: weight, gears and regulator',
 cx:[['The weight','Gravity never changes. The weight gives an even force all night, with no spring to slacken.'],
     ['The gears','The gear ratio decides how fast the lens turns. Teeth are counted, not measured, so the ratio is exact.'],
     ['The regulator','The flying pendulum brakes harder the faster it turns. That keeps the speed even and spares the glass from jolts.']],
 kiosk:'Explore on your phone: scan the QR code next to the screen.'}
};

/* ---------------- hjelpere ---------------- */
function gearPath(r,n,depth){
  let d='';const td=depth||Math.max(3,r*0.12);
  for(let i=0;i<n*4;i++){const a=i*2*Math.PI/(n*4);const rr=(i%4<2)?r:r-td;const x=rr*Math.cos(a),y=rr*Math.sin(a);d+=(i?'L':'M')+x.toFixed(2)+' '+y.toFixed(2)}
  return d+'Z';
}
const clockStart=performance.now()/1000;
const tnow=()=>performance.now()/1000-clockStart+24;
const obrestad=t=>{const ph=((t%30)+30)%30;const d=Math.min(ph,30-ph);return gauss(d,0.55)};

/* ---------------- Folkene ---------------- */
function Hero({t}){
  const balls=useRef([]),arms=useRef([]),gear=useRef(null),glow=useRef(null),beam=useRef(null);
  useEffect(()=>{let r;const loop=()=>{r=requestAnimationFrame(loop);const k=tnow();
    const f=obrestad(k);
    if(glow.current){glow.current.setAttribute('r',18+40*f);glow.current.style.opacity=0.35+0.65*f}
    if(beam.current)beam.current.style.opacity=0.08+0.5*f;
    const psi=REDUCED?0.6:k*2.4;
    [0,1].forEach(i=>{const s=i?-1:1;const x=430+s*58*Math.cos(psi),depth=Math.sin(psi)*s;const y=120;
      if(balls.current[i]){balls.current[i].setAttribute('cx',x);balls.current[i].setAttribute('cy',y);balls.current[i].setAttribute('r',13+3*depth)}
      if(arms.current[i]){arms.current[i].setAttribute('x2',x);arms.current[i].setAttribute('y2',y)}});
    if(gear.current)gear.current.setAttribute('transform',`translate(430 236) rotate(${(REDUCED?0:k*18)%360})`)};loop();return()=>cancelAnimationFrame(r)},[]);
  const rings=[18,34,50,66,82,98,112];
  return html`<svg viewBox="0 0 600 320" role="img" aria-label=${t.heroH}>
    <defs><radialGradient id="hg"><stop offset="0" stopColor="#fff6d8"/><stop offset=".35" stopColor="#ffd27a" stopOpacity=".8"/><stop offset="1" stopColor="#ffb340" stopOpacity="0"/></radialGradient>
      <linearGradient id="hb" x1="0" x2="1"><stop offset="0" stopColor="#ffc35a" stopOpacity=".9"/><stop offset="1" stopColor="#ffc35a" stopOpacity="0"/></linearGradient></defs>
    <rect width="600" height="320" fill="#081822"/>
    <path ref=${beam} d="M170 150 L600 92 L600 208 Z" fill="url(#hb)" opacity=".2"/>
    <g>${rings.map((r,i)=>html`<circle key=${i} cx="170" cy="150" r=${r} fill="none" stroke="#7fcbe4" strokeOpacity=${0.25+0.07*i} strokeWidth=${i===6?3:1.6}/>`)}
      ${[0,45,90,135].map(a=>html`<line key=${a} x1=${170-118*Math.cos(a*D)} y1=${150-118*Math.sin(a*D)} x2=${170+118*Math.cos(a*D)} y2=${150+118*Math.sin(a*D)} stroke="#7fcbe4" strokeOpacity=".18"/>`)}
      <circle ref=${glow} cx="170" cy="150" r="20" fill="url(#hg)"/>
      <circle cx="170" cy="150" r="5" fill="#fff6d8"/></g>
    <g stroke="#e0b04a" strokeWidth="3" strokeLinecap="round">
      <line x1="430" y1="60" x2="430" y2="236"/>
      <line ref=${el=>arms.current[0]=el} x1="430" y1="70" x2="488" y2="120"/>
      <line ref=${el=>arms.current[1]=el} x1="430" y1="70" x2="372" y2="120"/>
    </g>
    <circle cx="430" cy="66" r="6" fill="#e0b04a"/>
    <circle ref=${el=>balls.current[0]=el} cx="488" cy="120" r="14" fill="#e0b04a"/>
    <circle ref=${el=>balls.current[1]=el} cx="372" cy="120" r="14" fill="#c99a33"/>
    <path ref=${gear} d=${gearPath(54,24,7)} fill="#c99a33" fillOpacity=".25" stroke="#e0b04a" strokeWidth="2"/>
    <circle cx="430" cy="236" r="6" fill="#e0b04a"/>
    <text x="170" y="300" textAnchor="middle" fill="#7fcbe4" fontFamily="IM Fell English,Georgia,serif" fontStyle="italic" fontSize="18">${t.laneO}</text>
    <text x="430" y="300" textAnchor="middle" fill="#e0b04a" fontFamily="IM Fell English,Georgia,serif" fontStyle="italic" fontSize="18">${t.laneC}</text>
  </svg>`;
}
function PeopleView({t}){
  const lane=(cls,head,icon,list)=>html`<div className=${'lane '+cls}>
    <div className=${'lanehead '+cls}>${icon}<b>${head}</b></div>
    ${list.map(([y,n,p],i)=>html`<div className="ev" key=${i}><div className="yr">${y}</div><h3>${n}</h3><p>${p}</p></div>`)}
  </div>`;
  const lensIcon=html`<svg width="30" height="30" viewBox="-15 -15 30 30" aria-hidden="true"><circle r="13" fill="none" stroke="var(--optic)" strokeWidth="2"/><circle r="8" fill="none" stroke="var(--optic)" strokeWidth="1.6"/><circle r="3" fill="var(--optic)"/></svg>`;
  const gearIcon=html`<svg width="30" height="30" viewBox="-15 -15 30 30" aria-hidden="true"><path d=${gearPath(13,10,3)} fill="none" stroke="var(--clock)" strokeWidth="1.8"/><circle r="3.5" fill="var(--clock)"/></svg>`;
  return html`<div className="scroll"><div className="wrap">
    <section className="hero">
      <div><h2>${t.heroH}</h2><p className="lead">${t.heroLead}</p></div>
      <${Hero} t=${t}/>
    </section>
    <section className="lanes">
      ${lane('o',t.laneO,lensIcon,t.o)}
      ${lane('c',t.laneC,gearIcon,t.c)}
    </section>
    <section className="meet"><div className="yr">${t.meetYr}</div><h3>${t.meetH}</h3><p>${t.meetP}</p></section>
    <section><h2>${t.beforeH}</h2>
      <div className="before">${t.before.map(([h,p],i)=>html`<div key=${i}><h3>${h}</h3><p>${p}</p></div>`)}</div>
    </section>
  </div></div>`;
}

/* ---------------- Lyset ---------------- */
const FX=250,CY=230,F=150,LX=FX+F,HL=F*Math.tan(48*D),RP=1.5*F,RR=110,FM=60,XE=820,MMPX=3.3;
function trace(mode,prisms,refl,dx){
  const lamp=[FX+dx,CY];const rays=[];let good=0;const N=120,tol=Math.tan(2.5*D);
  const fwd=(px,py,th,I,pts)=>{const tn=Math.tan(th);const yl=py+(LX-px)*tn-CY;
    if(Math.abs(yl)<=HL){pts.push([LX,CY+yl]);return [tn-yl/F,I,true,'lens']}
    const a=Math.abs(th)/D;
    if(prisms&&a>=48&&a<=80){const hx=FX+RP*Math.cos(th),hy=CY+RP*Math.sin(th);pts.push([hx,hy]);return [-dx*Math.sin(th)/RP*1.4,I,true,'prism']}
    return [tn,I,false]};
  for(let i=0;i<N;i++){
    let th=(-178.5+i*3)*D;const a=Math.abs(th)/D;const pts=[lamp];let res=null,I=1;
    if(mode==='new'){
      if(a<90){res=fwd(lamp[0],lamp[1],th,1,pts)}
      else if(refl&&a>=100){pts.push([FX+RR*Math.cos(th),CY+RR*Math.sin(th)]);pts.push(lamp);let th2=th+Math.PI;if(th2>Math.PI)th2-=2*Math.PI;res=fwd(lamp[0],lamp[1],th2,0.85,pts)}
      else res=[Math.tan(th),1,false];
    }else{
      if(a>=80){const r=2*FM/(1-Math.cos(th));const P=[FX+r*Math.cos(th),CY+r*Math.sin(th)];pts.push(P);res=[(P[1]-CY)*dx/(FM*FM)*0.2,0.6,true,'mirror']}
      else res=[Math.tan(th),1,false];
    }
    const [s,II,caught]=res;let end;
    if(caught){const l=pts[pts.length-1];end=[XE,l[1]+s*(XE-l[0])];I=II}
    else{const dir=pts.length>1?th+Math.PI:th;const tt=(pts.length>1)?dir:th;end=[pts[pts.length-1][0]+700*Math.cos(tt),pts[pts.length-1][1]+700*Math.sin(tt)]}
    const ok=caught?Math.abs(s)<tol:(Math.abs(Math.tan(th))<tol&&Math.cos(th)>0);
    if(ok)good+=caught?II:1;
    rays.push({d:'M'+pts.concat([end]).map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join('L'),ok,caught,I:caught?II:1});
  }
  return {rays,pct:good/N*100};
}
function LightView({t}){
  const [mode,setMode]=useState('new');const [prisms,setPrisms]=useState(true);const [refl,setRefl]=useState(true);const [dx,setDx]=useState(0);
  useEffect(()=>{if(!KIOSK)return;let r,s=performance.now();const loop=()=>{r=requestAnimationFrame(loop);const k=(performance.now()-s)/1000;
    setDx(Math.round(28*Math.sin(k/2.5)));const st=Math.floor(k/7)%4;setMode(st===0?'old':'new');setPrisms(st>=2);setRefl(st>=3)};loop();return()=>cancelAnimationFrame(r)},[]);
  const {rays,pct}=useMemo(()=>trace(mode,prisms,refl,dx),[mode,prisms,refl,dx]);
  const mm=Math.round(dx*MMPX);const amm=Math.abs(mm);
  const msg=amm<=7?['good',t.inFocus]:amm<=26?['',t.nearFocus]:['bad',t.offFocus];
  let lens='M'+(LX+8)+' '+(CY-HL)+' L'+(LX+8)+' '+(CY+HL);
  for(let y=HL;y>=-HL;y-=18){const dep=4+10*(1-Math.abs(y)/HL);lens+=` L${LX-dep} ${CY+y} L${LX+2} ${CY+y-14}`}
  lens+='Z';
  const prismTris=[];if(prisms&&mode==='new')for(let a=50;a<=80;a+=6)[-1,1].forEach(sg=>{const th=sg*a*D;const x=FX+RP*Math.cos(th),y=CY+RP*Math.sin(th);
    prismTris.push(html`<path key=${a+'_'+sg} d=${`M${x-9} ${y} L${x+7} ${y-7*sg} L${x+7} ${y+9*sg}Z`} fill="#bfe6f2" fillOpacity=".55" stroke="#7fcbe4" strokeWidth="1"/>`)});
  let par='';for(let a=80;a<=280;a+=4){const th=a*D;const r=2*FM/(1-Math.cos(th));par+=(a===80?'M':'L')+(FX+r*Math.cos(th)).toFixed(1)+' '+(CY+r*Math.sin(th)).toFixed(1)}
  return html`<div className="scroll"><div className="wrap">
    <h2>${t.lightH}</h2><p className="lead">${t.lightLead}</p>
    <div className="lab2">
      <div className="figure"><svg viewBox="0 0 820 460" role="img" aria-label=${t.lightH}>
        <rect width="820" height="460" fill="#081822"/>
        <line x1="0" y1=${CY} x2="820" y2=${CY} stroke="#2c4652" strokeDasharray="4 6"/>
        ${rays.map((r,i)=>html`<path key=${i} d=${r.d} fill="none" stroke=${r.ok?'#ffc35a':'#ffb340'} strokeOpacity=${r.ok?0.75*r.I:0.16} strokeWidth=${r.ok?1.6:1}/>`)}
        ${mode==='new'?html`<g>
          <path d=${lens} fill="#bfe6f2" fillOpacity=".35" stroke="#7fcbe4" strokeWidth="1.4"/>
          ${prismTris}
          ${refl&&html`<path d=${`M${FX+RR*Math.cos(100*D)} ${CY+RR*Math.sin(100*D)} A${RR} ${RR} 0 0 1 ${FX+RR*Math.cos(260*D)} ${CY+RR*Math.sin(260*D)}`} fill="none" stroke="#cfd8dc" strokeWidth="5" strokeOpacity=".8"/>`}
        </g>`:html`<path d=${par} fill="none" stroke="#cfd8dc" strokeWidth="5" strokeOpacity=".85"/>`}
        <circle cx=${FX} cy=${CY} r="4" fill="none" stroke="#9fb6c1" strokeDasharray="2 2"/>
        <circle cx=${FX+dx} cy=${CY} r="18" fill="#ffc35a" opacity=".25"/>
        <path d=${`M${FX+dx-6} ${CY+6} C${FX+dx-8} ${CY-4},${FX+dx} ${CY-8},${FX+dx} ${CY-16} C${FX+dx} ${CY-8},${FX+dx+8} ${CY-4},${FX+dx+6} ${CY+6}Z`} fill="#ffd27a"/>
        <text x="808" y="448" textAnchor="end" fill="#9fb6c1" fontSize="14" fontFamily="Barlow,sans-serif">→ ${t.meter.toLowerCase()}</text>
      </svg></div>
      <div>
        <div className="ctl"><div className="seg" role="group">
          <button aria-pressed=${mode==='old'} onClick=${()=>setMode('old')}>${t.modeOld}</button>
          <button aria-pressed=${mode==='new'} onClick=${()=>setMode('new')}>${t.modeNew}</button></div></div>
        ${mode==='new'&&html`<div className="ctl">
          <label className="toggle"><input type="checkbox" checked=${prisms} onChange=${e=>setPrisms(e.target.checked)}/>${t.prisms}</label>
          <label className="toggle"><input type="checkbox" checked=${refl} onChange=${e=>setRefl(e.target.checked)}/>${t.refl}</label></div>`}
        <div className="ctl"><label htmlFor="fl">${t.flame}<span>${t.fromFocus.replace('{mm}',(mm>0?'+':'')+mm)}</span></label>
          <input id="fl" type="range" min="-40" max="40" step="1" value=${dx} onInput=${e=>setDx(+e.target.value)} onChange=${e=>setDx(+e.target.value)}/></div>
        <div className="meter" aria-live="polite"><div className="lab" style=${{fontWeight:600,fontSize:14}}>${t.meter}</div>
          <div><span className="num">${Math.round(pct)}</span> <b>%</b></div>
          <div className="bar"><i style=${{width:Math.min(100,pct)+'%'}}></i></div></div>
        <p className=${'msg '+msg[0]}>${msg[1]}</p>
        <p className="note" style=${{fontSize:13}}>${t.model}</p>
      </div>
    </div>
    <div className="explain">${t.ex.map(([h,p],i)=>html`<div key=${i}><h3>${h}</h3><p>${p}</p></div>`)}</div>
  </div></div>`;
}

/* ---------------- Urverket ---------------- */
function ClockView({t}){
  const [teeth,setTeeth]=useState(16),[panels,setPanels]=useState(4),[reg,setReg]=useState('fly'),[speed,setSpeed]=useState(1);
  const [ivals,setIvals]=useState([]),[empty,setEmpty]=useState(false);
  const R=useRef({phi:0,omega:0,h:1,tSim:0,last:null,count:0,esc:0,wind:false,jerk:0});
  const top=useRef(null),drumG=useRef(null),pinG=useRef(null),wt=useRef(null),cable=useRef(null),ship=useRef(null),gov=useRef([]),wbar=useRef(null),jbar=useRef(null),anchor=useRef(null);
  const Trot=120*12/teeth,interval=Trot/panels,w0=2*Math.PI/Trot;
  const cfg=useRef({});cfg.current={w0,panels,reg,speed,teeth};
  useEffect(()=>{setIvals([]);R.current.last=null},[teeth,panels,reg]);
  useEffect(()=>{if(KIOSK){setTeeth(12);setPanels(4);setReg('fly');setSpeed(2)}},[]);
  useEffect(()=>{let raf,lt=performance.now();
    const loop=()=>{raf=requestAnimationFrame(loop);const n=performance.now();let dt=Math.min(0.05,(n-lt)/1000)*cfg.current.speed;lt=n;
      const s=R.current,c=cfg.current;
      if(s.wind){s.h=Math.min(1,s.h+dt*0.6);if(s.h>=1)s.wind=false;s.omega=0}
      else if(s.h<=0){s.omega=0}
      else if(c.reg==='fly'){s.omega+=(c.w0-s.omega)*Math.min(1,dt*1.2)}
      else if(c.reg==='none'){s.omega=Math.min(c.w0*8,s.omega+c.w0/10*dt)}
      else {s.esc+=dt;const p=s.esc%1;s.omega=p<0.18?c.w0/0.18:0}
      const dphi=s.omega*dt;s.phi+=dphi;s.tSim+=dt;
      if(!s.wind&&s.h>0)s.h=Math.max(0,s.h-dphi/(c.w0*180));
      s.jerk+=((c.reg==='escape'&&s.h>0&&!s.wind?1:0)-s.jerk)*Math.min(1,dt*2);
      const step=2*Math.PI/c.panels;const cnt=Math.floor(s.phi/step);
      if(cnt!==s.count){s.count=cnt;if(s.last!==null){const iv=s.tSim-s.last;setIvals(a=>[...a.slice(-5),iv])}s.last=s.tSim}
      setEmpty(s.h<=0&&!s.wind);
      // tegn
      const m=((s.phi%step)+step)%step;const dd=Math.min(m,step-m);const fl=s.h>0||s.omega>0?gauss(dd,0.05):0;
      if(top.current)top.current.setAttribute('transform',`translate(150 150) rotate(${(s.phi/D)%360})`);
      if(ship.current)ship.current.style.opacity=0.12+0.88*fl;
      const pin=s.phi*6;if(pinG.current)pinG.current.setAttribute('transform',`translate(${pinX} 92) rotate(${(pin/D)%360})`);
      if(drumG.current)drumG.current.setAttribute('transform',`translate(150 92) rotate(${(-pin*c.teeth/60/D)%360})`);
      const wy=130+(1-s.h)*190;if(wt.current)wt.current.setAttribute('y',wy);if(cable.current)cable.current.setAttribute('y2',wy);
      const sp=Math.min(1.4,s.omega/(c.w0||1));const spread=c.reg==='fly'?(0.35+0.5*Math.min(1,sp)):0.2;const psi=s.tSim*9*Math.min(2,sp)*(c.reg==='fly'?1:0.3);
      [0,1].forEach(i=>{const sg=i?-1:1;const x=420+sg*44*Math.sin(spread)*Math.cos(psi),y=226+44*Math.cos(spread);const g=gov.current[i];if(g&&g[0]&&g[1]){g[0].setAttribute('x2',x);g[0].setAttribute('y2',y);g[1].setAttribute('cx',x);g[1].setAttribute('cy',y)}});
      if(anchor.current)anchor.current.setAttribute('transform',`translate(420 250) rotate(${c.reg==='escape'?(((s.esc%1)<0.5?1:-1)*12):0})`);
      if(wbar.current)wbar.current.style.width=(s.h*100)+'%';
      if(jbar.current)jbar.current.style.width=(s.jerk*100)+'%';
    };loop();return()=>cancelAnimationFrame(raf)},[teeth]);
  const pr=teeth*1.05,pinX=150+62+pr+3;
  const solved=reg==='fly'&&Math.abs(interval-30)<0.01;
  const okMeasured=solved&&ivals.length>=2&&ivals.slice(-2).every(v=>Math.abs(v-30)<0.6);
  const regMsg=reg==='none'?['bad',t.noneMsg]:reg==='escape'?['',t.escMsg]:['good',t.flyMsg];
  const panelRects=[];for(let k=0;k<panels;k++){const a=k*360/panels;panelRects.push(html`<g key=${k} transform=${`rotate(${a})`}>
    <path d="M40 -10 L150 -46 L150 46 L40 10Z" fill="#ffc35a" opacity=".07"/>
    <rect x="86" y="-26" width="14" height="52" rx="3" fill="#bfe6f2" fillOpacity=".75" stroke="#7fcbe4"/>
    ${[ -16,-6,4,14].map(y=>html`<line key=${y} x1="86" x2="100" y1=${y} y2=${y} stroke="#1f6f8b" strokeOpacity=".6"/>`)}
  </g>`)}
  return html`<div className="scroll"><div className="wrap">
    <h2>${t.clockH}</h2><p className="lead">${t.clockLead}</p>
    <div className="lab2">
      <div>
        <div className="figs">
          <div className="figure"><svg viewBox="56 4 430 352" role="img" aria-label=${t.machCap}>
            <rect width="520" height="400" fill="#081822"/>
            <rect x="74" y="110" width="44" height="270" fill="none" stroke="#2c4652" strokeDasharray="4 5"/>
            <line ref=${cable} x1="96" y1="92" x2="96" y2="130" stroke="#9fb6c1" strokeWidth="2"/>
            <rect ref=${wt} x="80" y="130" width="32" height="46" rx="4" fill="#3b4a52" stroke="#9fb6c1"/>
            <g ref=${drumG} transform="translate(150 92)"><path d=${gearPath(62,60,5)} fill="#c99a33" fillOpacity=".3" stroke="#e0b04a" strokeWidth="1.5"/>
              <circle r="54" fill="none" stroke="#e0b04a" strokeOpacity=".4"/>${[0,60,120].map(a=>html`<line key=${a} x1="0" y1="0" x2=${54*Math.cos(a*D)} y2=${54*Math.sin(a*D)} stroke="#e0b04a" strokeOpacity=".5" strokeWidth="4"/>`)}
              <circle r="54" fill="none"/></g>
            <circle cx="150" cy="92" r="54" fill="none"/>
            <circle cx="150" cy="92" r="16" fill="#5a4a2a" stroke="#e0b04a"/>
            <line x1="96" y1="92" x2="134" y2="92" stroke="#9fb6c1" strokeWidth="2"/>
            <g ref=${pinG} transform=${`translate(${pinX} 92)`}><path d=${gearPath(pr,teeth,4)} fill="#e0b04a" fillOpacity=".45" stroke="#ffd27a" strokeWidth="1.5"/><circle r="3" fill="#ffd27a"/></g>
            <line x1=${pinX} y1="20" x2=${pinX} y2="92" stroke="#9fb6c1" strokeWidth="3"/>
            <path d=${`M${pinX-6} 30 L${pinX} 16 L${pinX+6} 30`} fill="none" stroke="#9fb6c1" strokeWidth="2"/>
            <path d=${`M${pinX} 92 L${pinX} 150 L420 150 L420 190`} fill="none" stroke="#9fb6c1" strokeWidth="2" strokeDasharray="5 4"/>
            ${reg==='escape'?html`<g ref=${anchor} transform="translate(420 250)"><path d="M0 -50 L0 10 M-34 -10 Q0 26 34 -10" fill="none" stroke="#e0b04a" strokeWidth="5" strokeLinecap="round"/><circle cy="-50" r="5" fill="#e0b04a"/></g>`
              :html`<g opacity=${reg==='none'?0.3:1}><line x1="420" y1="190" x2="420" y2="300" stroke="#e0b04a" strokeWidth="3"/><circle cx="420" cy="226" r="5" fill="#e0b04a"/>
                ${[0,1].map(i=>html`<g key=${i}><line ref=${el=>{gov.current[i]=gov.current[i]||[];gov.current[i][0]=el}} x1="420" y1="226" x2="440" y2="266" stroke="#e0b04a" strokeWidth="3"/>
                  <circle ref=${el=>{gov.current[i]=gov.current[i]||[];gov.current[i][1]=el}} cx="440" cy="266" r="11" fill=${i?'#c99a33':'#e0b04a'}/></g>`)}</g>`}
            <text x="420" y="340" textAnchor="middle" fill="#9fb6c1" fontSize="13" fontFamily="Barlow,sans-serif">${t.reg[reg]}</text>
          </svg><div className="cap">${t.machCap}</div></div>
          <div className="figure"><svg viewBox="0 0 300 300" role="img" aria-label=${t.topCap}>
            <rect width="300" height="300" fill="#081822"/>
            <g ref=${ship} style=${{opacity:.2}}><path d="M232 150 L300 120 L300 180Z" fill="#ffc35a" opacity=".55"/><circle cx="286" cy="150" r="10" fill="#fff3c8"/></g>
            <g ref=${top} transform="translate(150 150)">${panelRects}</g>
            <circle cx="150" cy="150" r="38" fill="#bfe6f2" fillOpacity=".25" stroke="#7fcbe4" strokeWidth="2"/>
            <circle cx="150" cy="150" r="9" fill="#ffd27a"/>
            <path d="M268 166 L296 166 L292 174 L272 174Z" fill="#c7a46a"/>
          </svg><div className="cap">${t.topCap}</div></div>
        </div>
      </div>
      <div>
        <p className="note" style=${{fontWeight:600,color:'var(--text)',marginBottom:12}}>${t.challenge}</p>
        <div className="ctl"><div className="lab">${t.teeth}<span>${teeth}</span></div>
          <div className="seg" role="group">${[8,12,16,24].map(v=>html`<button key=${v} aria-pressed=${teeth===v} onClick=${()=>setTeeth(v)}>${v}</button>`)}</div></div>
        <div className="ctl"><div className="lab">${t.panels}<span>${panels}</span></div>
          <div className="seg" role="group">${[2,4,8].map(v=>html`<button key=${v} aria-pressed=${panels===v} onClick=${()=>setPanels(v)}>${v}</button>`)}</div></div>
        <div className="ctl"><div className="lab">${t.regLbl}</div>
          <div className="seg" role="group">${['none','escape','fly'].map(v=>html`<button key=${v} aria-pressed=${reg===v} onClick=${()=>setReg(v)}>${t.reg[v]}</button>`)}</div></div>
        <p style=${{fontWeight:700,margin:'4px 0 8px'}}>${t.calc.replace('{s}',fmt(interval,t.loc,interval%1?1:0))}</p>
        <div className="lab" style=${{fontSize:14,fontWeight:600,marginBottom:6}}>${t.measured}</div>
        <div className="ivals" aria-live="polite">${ivals.map((v,i)=>html`<span key=${i} className=${Math.abs(v-30)<0.6?'ok':(Math.abs(v-interval)>1?'off':'')}>${fmt(v,t.loc)} s</span>`)}</div>
        ${okMeasured&&html`<div className="success" style=${{marginTop:12}}>${t.success}</div>`}
        <p className=${'msg '+regMsg[0]} style=${{marginTop:12}}>${regMsg[1]}</p>
        <div className="lab" style=${{fontSize:14,fontWeight:600}}>${t.weight}</div>
        <div className="weight"><i ref=${wbar}></i></div>
        <div className="lab" style=${{fontSize:14,fontWeight:600}}>${t.jerk}</div>
        <div className="weight"><i ref=${jbar} style=${{background:'var(--danger)'}}></i></div>
        ${empty&&html`<p className="msg bad">${t.empty}</p>`}
        <div style=${{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',marginTop:6}}>
          <button className="btn" onClick=${()=>{R.current.wind=true}}>${t.wind}</button>
          <span className="note">${t.speed}</span>
          <div className="seg" role="group">${[1,4].map(v=>html`<button key=${v} aria-pressed=${speed===v} onClick=${()=>setSpeed(v)}>×${v}</button>`)}</div>
        </div>
      </div>
    </div>
    <div className="explain">${t.cx.map(([h,p],i)=>html`<div key=${i}><h3>${h}</h3><p>${p}</p></div>`)}</div>
  </div></div>`;
}

/* ---------------- appen ---------------- */
function App({lang,kiosk,onDone}){
  const [view,setView]=useState(0);const t=T[lang];
  useEffect(()=>{if(!kiosk)return;let i=0,to,raf;
    const scrollAnim=()=>{cancelAnimationFrame(raf);const st=performance.now();const tick=()=>{const el=document.querySelector('.m2 .scroll');
      if(el){const k=Math.min(1,Math.max(0,(performance.now()-st-7000)/22000));el.scrollTop=k*(el.scrollHeight-el.clientHeight)}raf=requestAnimationFrame(tick)};tick()};
    const step=()=>{setView(i);scrollAnim();to=setTimeout(()=>{i++;if(i>=3){onDone&&onDone();return}step()},35000)};step();
    return()=>{clearTimeout(to);cancelAnimationFrame(raf)}},[]);
  return html`<div className=${'app'+(kiosk?' kiosk':'')}>
    <header className="top">
      <nav className="tabs" aria-label=${t.chapter}>${t.tabs.map((n,i)=>html`<button key=${i} aria-pressed=${view===i} onClick=${()=>setView(i)}>${n}</button>`)}</nav>
    </header>
    <main className="stage">
      ${view===0&&html`<${PeopleView} t=${t}/>`}
      ${view===1&&html`<${LightView} t=${t}/>`}
      ${view===2&&html`<${ClockView} t=${t}/>`}
    </main>
  </div>`;
}
window.OF_M2=App;
})();
