(function(){
const IMG=window.OF_FAKTURA.img;const R=window.OF_FAKTURA.lines;

const {useState,useEffect,useRef,useLayoutEffect}=React;
const html=htm.bind(React.createElement);
const KIOSK=new URLSearchParams(location.search).has('kiosk');
const IW=2576,IH=1806,FS=22;
const T={
 nb:{loc:'nb-NO',chapter:'Kapittel 3: Fakturaen fra Paris',tabs:['Lupen','Hele teksten'],h:'Fakturaen fra Paris',
  lead:'Dra forstørrelsesglasset over håndskriften. Under glasset blir den franske teksten fra 1873 til norsk.',
  hint:'Dra glasset over fakturaen',orig:'Original (fransk)',price:'Pris',prev:'Forrige linje',next:'Neste linje',
  facts:'Lest fra et foto av originalen. Usikre ord er nevnt i forklaringen. Beløpene er i franc.',listH:'Hele fakturaen, linje for linje',show:'Vis i lupen',fr:'fr.',
  kiosk:'Utforsk selv på mobilen: skann QR-koden ved skjermen.'},
 de:{loc:'de-DE',chapter:'Kapitel 3: Die Rechnung aus Paris',tabs:['Die Lupe','Ganzer Text'],h:'Die Rechnung aus Paris',
  lead:'Zieh die Lupe über die Handschrift. Unter dem Glas wird der französische Text von 1873 zu Deutsch.',
  hint:'Zieh die Lupe über die Rechnung',orig:'Original (Französisch)',price:'Preis',prev:'Vorige Zeile',next:'Nächste Zeile',
  facts:'Von einem Foto des Originals gelesen. Unsichere Wörter stehen in der Erklärung. Beträge in Franc.',listH:'Die ganze Rechnung, Zeile für Zeile',show:'In der Lupe zeigen',fr:'Fr.',
  kiosk:'Selbst entdecken auf dem Handy: Scanne den QR-Code neben dem Bildschirm.'},
 en:{loc:'en-GB',chapter:'Chapter 3: The invoice from Paris',tabs:['The magnifier','Full text'],h:'The invoice from Paris',
  lead:'Drag the magnifying glass across the handwriting. Under the glass, the French text from 1873 turns into English.',
  hint:'Drag the glass across the invoice',orig:'Original (French)',price:'Price',prev:'Previous line',next:'Next line',
  facts:'Read from a photo of the original. Uncertain words are mentioned in the notes. Amounts in francs.',listH:'The whole invoice, line by line',show:'Show in magnifier',fr:'fr.',
  kiosk:'Explore on your phone: scan the QR code next to the screen.'}
};
const money=(r,t)=>r.p==null?'':r.p.toLocaleString(t.loc,{minimumFractionDigits:r.p%1?2:0,maximumFractionDigits:2})+' '+t.fr+(r.extra?'  |  '+r.extra:'');
const center=r=>[(r.box[0]+r.box[2])/2,(r.box[1]+r.box[3])/2];
const hitAt=(x,y)=>{let best=-1,bd=1e9;R.forEach((r,i)=>{const [x0,y0,x1,y1]=r.box;if(x>=x0&&x<=x1&&y>=y0&&y<=y1){const a=(x1-x0)*(y1-y0);if(a<bd){bd=a;best=i}}});return best};

function Magnifier({t,lang,cur,setCur,goto,gotoN}){
  const wrap=useRef(null);const [dim,setDim]=useState({w:0,h:0});
  const [pos,setPos]=useState(()=>center(R[3]));const [moved,setMoved]=useState(false);
  const target=useRef(null);
  useLayoutEffect(()=>{const el=wrap.current;const fit=()=>{const W=el.clientWidth-(innerWidth<860?16:36),H=el.clientHeight-(innerWidth<860?16:36);const s=Math.min(W/IW,H/IH);setDim({w:IW*s,h:IH*s})};fit();const ro=new ResizeObserver(fit);ro.observe(el);return()=>ro.disconnect()},[]);
  useEffect(()=>{if(goto==null)return;target.current=center(R[goto])},[goto,gotoN]);
  useEffect(()=>{let r;const loop=()=>{r=requestAnimationFrame(loop);const tg=target.current;if(!tg)return;
    setPos(p=>{const nx=p[0]+(tg[0]-p[0])*0.12,ny=p[1]+(tg[1]-p[1])*0.12;if(Math.hypot(tg[0]-nx,tg[1]-ny)<1){target.current=null;return tg}return [nx,ny]})};loop();return()=>cancelAnimationFrame(r)},[]);
  useEffect(()=>{const i=hitAt(pos[0],pos[1]);if(i>=0&&i!==cur)setCur(i)},[pos]);
  const s=dim.w/IW;const small=innerWidth<640;
  const L=small?180:300;
  const Z=Math.max(small?3.4:1.9,14*IW/(FS*Math.max(1,dim.w)));
  const toImg=e=>{const r=e.currentTarget.getBoundingClientRect();const touch=e.pointerType==='touch';
    const x=(e.clientX-r.left)/s,y=(e.clientY-r.top-(touch?L*0.75:0))/s;return [Math.max(0,Math.min(IW,x)),Math.max(0,Math.min(IH,y))]};
  const onMove=e=>{if(e.pointerType==='mouse'||e.buttons||e.type==='pointerdown'){target.current=null;setPos(toImg(e));setMoved(true)}};
  const onKey=e=>{const m={ArrowLeft:[-30,0],ArrowRight:[30,0],ArrowUp:[0,-20],ArrowDown:[0,20]}[e.key];if(m){e.preventDefault();target.current=null;setPos(p=>[Math.max(0,Math.min(IW,p[0]+m[0])),Math.max(0,Math.min(IH,p[1]+m[1]))])}};
  const lx=pos[0]*s,ly=pos[1]*s;
  const iw=dim.w*Z,ih=dim.h*Z;const fs=FS*iw/IW;
  return html`<div className="paperwrap" ref=${wrap}>
    ${dim.w>0&&html`<div className="paper" style=${{width:dim.w,height:dim.h}} tabIndex="0" role="application" aria-label=${t.hint}
        onPointerMove=${onMove} onPointerDown=${e=>{e.currentTarget.setPointerCapture&&e.currentTarget.setPointerCapture(e.pointerId);onMove(e)}} onKeyDown=${onKey}>
      <img src=${IMG} alt=${t.h}/>
      <div className="handle" style=${{left:lx+L*0.33-10,top:ly+L*0.33,transform:'rotate(-45deg)'}}></div>
      <div className="lens" style=${{width:L,height:L,left:lx-L/2,top:ly-L/2}}>
        <div className="inner" style=${{width:iw,height:ih,transform:`translate(${L/2-lx*Z}px,${L/2-ly*Z}px)`}}>
          <img src=${IMG} alt=""/>
          ${R.map((r,i)=>{const [x0,y0,x1,y1]=r.box;return html`<div key=${r.id} className=${'tr'+(i===cur?' cur':'')}
            style=${{left:x0/IW*100+'%',top:y0/IH*100+'%',width:(x1-x0)/IW*100+'%',height:(y1-y0)/IH*100+'%',fontSize:fs}}>
            <span className="t">${r[lang]}</span>${r.p!=null&&html`<span className="p">${money(r,t)}</span>`}</div>`})}
        </div>
      </div>
      ${!moved&&!KIOSK&&html`<div className="hint">${t.hint}</div>`}
    </div>`}
  </div>`;
}

function Side({t,lang,cur,step}){
  const r=R[cur];const note=r['n_'+lang];
  return html`<aside className="side" aria-live="polite">
    <h2>${t.h}</h2><p className="lead">${t.lead}</p>
    <div className="card">
      <div className="lbl">${t.orig}</div>
      <p className="fr">${r.fr}</p>
      <p className="to">${r[lang]}</p>
      ${r.p!=null&&html`<p className="price">${money(r,t)}</p>`}
      ${note&&html`<p className="note">${note}</p>`}
    </div>
    <div className="nav"><button className="btn ghost" onClick=${()=>step(-1)}>${t.prev}</button><button className="btn" onClick=${()=>step(1)}>${t.next}</button></div>
    <p className="facts">${t.facts}</p>
  </aside>`;
}

function ListView({t,lang,show}){
  return html`<div className="list"><div className="listin"><h2>${t.listH}</h2><p className="lead" style=${{fontSize:16}}>${t.facts}</p>
    ${R.map((r,i)=>html`<div className="row" key=${r.id}>
      <div className="fr">${r.fr}</div>
      <div className="to">${r[lang]}</div><div className="p">${money(r,t)}</div>
      ${r['n_'+lang]&&html`<p className="note">${r['n_'+lang]}</p>`}
      <div><button onClick=${()=>show(i)}>${t.show}</button></div>
    </div>`)}
  </div></div>`;
}

function App({lang,kiosk,onDone}){
  const [view,setView]=useState(0),[cur,setCur]=useState(3),[go,setGo]=useState({i:null,n:0});
  const t=T[lang];
  const jump=i=>{setCur(i);setGo(g=>({i,n:g.n+1}))};
  const step=d=>jump((cur+d+R.length)%R.length);
  useEffect(()=>{if(!kiosk)return;const seq=['memoire','l4','l8','a1','r7','r8','rep2','val','sig'].map(id=>R.findIndex(r=>r.id===id)).filter(i=>i>=0);
    let k=0;const first=setTimeout(()=>jump(seq[0]),400);
    const iv=setInterval(()=>{k++;if(k>=seq.length){clearInterval(iv);onDone&&onDone();return}jump(seq[k])},7000);
    return()=>{clearInterval(iv);clearTimeout(first)}},[]);
  return html`<div className=${'app'+(kiosk?' kiosk':'')}>
    <header className="top">
      <nav className="tabs" aria-label=${t.chapter}>${t.tabs.map((n,i)=>html`<button key=${i} aria-pressed=${view===i} onClick=${()=>setView(i)}>${n}</button>`)}</nav>
    </header>
    <main className="stage">
      ${view===0?html`<div className="desk">
          <${Magnifier} t=${t} lang=${lang} cur=${cur} setCur=${setCur} goto=${go.i} gotoN=${go.n}/>
          <${Side} t=${t} lang=${lang} cur=${cur} step=${step}/>
        </div>`
        :html`<${ListView} t=${t} lang=${lang} show=${i=>{setView(0);setTimeout(()=>jump(i),50)}}/>`}
    </main>
  </div>`;
}
window.OF_M3=App;
})();
