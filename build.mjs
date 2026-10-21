// Bygger nettløsningen fra src/ til dist/ (for Vercel) eller til én enkeltfil.
//   npm run build          -> dist/ med lokale biblioteker, skrifter og offline-støtte (PWA)
//   npm run build:single   -> dist-single/obrestad-fyr.html som henter biblioteker fra CDN
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const single = process.argv.includes('--single');
const root = path.dirname(new URL(import.meta.url).pathname);
const src = (...p) => path.join(root, 'src', ...p);
const nm = (...p) => path.join(root, 'node_modules', ...p);
const read = p => fs.readFileSync(p, 'utf8');

const out = path.join(root, single ? 'dist-single' : 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

// --- kapitler ---
const chapterCss = [1, 2, 3].map(i => read(src('chapters', `kapittel${i}.css`))).join('\n') + '\n' + read(src('chapters', 'felles.css'));
const img = 'data:image/jpeg;base64,' + fs.readFileSync(src('assets', 'faktura.jpg')).toString('base64');
const lines = JSON.parse(read(src('data', 'faktura-linjer.json')));
const dataScript = `<script>window.OF_FAKTURA={img:${JSON.stringify(img)},lines:${JSON.stringify(lines)}};</script>`;
const chapterJs = [1, 2, 3].map(i => `<script>\n${read(src('chapters', `kapittel${i}.js`))}</script>`).join('\n');

// --- biblioteker og skrifter ---
const LIBS = [
  ['react/umd/react.production.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js'],
  ['react-dom/umd/react-dom.production.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js'],
  ['htm/dist/htm.umd.js', 'https://cdn.jsdelivr.net/npm/htm@3.1.1/dist/htm.umd.js'],
  ['three/build/three.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'],
  ['qrcode-generator/qrcode.js', 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js'],
];
const FONTS = [
  ['IM Fell English', 'normal', 400, 'im-fell-english/files/im-fell-english-latin-400-normal.woff2'],
  ['IM Fell English', 'italic', 400, 'im-fell-english/files/im-fell-english-latin-400-italic.woff2'],
  ...[400, 500, 600, 700].map(w => ['Barlow', 'normal', w, `barlow/files/barlow-latin-${w}-normal.woff2`]),
];

let libsHtml, fontsHtml, swReg = '';
if (single) {
  libsHtml = LIBS.map(([, cdn]) => `<script src="${cdn}"></script>`).join('\n');
  fontsHtml = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet">`;
} else {
  fs.mkdirSync(path.join(out, 'vendor', 'fonts'), { recursive: true });
  libsHtml = LIBS.map(([p]) => {
    const name = path.basename(p);
    fs.copyFileSync(nm(p), path.join(out, 'vendor', name));
    return `<script src="vendor/${name}"></script>`;
  }).join('\n');
  let css = '';
  for (const [fam, style, w, p] of FONTS) {
    const name = path.basename(p);
    fs.copyFileSync(nm('@fontsource', p), path.join(out, 'vendor', 'fonts', name));
    css += `@font-face{font-family:'${fam}';font-style:${style};font-weight:${w};font-display:swap;src:url(fonts/${name}) format('woff2')}\n`;
  }
  fs.writeFileSync(path.join(out, 'vendor', 'fonts.css'), css);
  fontsHtml = `<link rel="stylesheet" href="vendor/fonts.css">
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#07141c">
<link rel="icon" href="icons/icon-192.png">
<link rel="apple-touch-icon" href="icons/icon-192.png">`;
  swReg = "if('serviceWorker' in navigator&&location.protocol!=='file:'){window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{})})}";
}

let html = read(src('shell.html'))
  .replace('<!--FONTS-->', () => fontsHtml)
  .replace('<!--LIBS-->', () => libsHtml)
  .replace('/*CHAPTERCSS*/', () => chapterCss)
  .replace('<!--CHAPTERS-->', () => dataScript + '\n' + chapterJs)
  .replace('/*SW*/', () => swReg);

const file = single ? 'obrestad-fyr.html' : 'index.html';
fs.writeFileSync(path.join(out, file), html);

if (!single) {
  fs.mkdirSync(path.join(out, 'icons'));
  for (const f of fs.readdirSync(src('assets', 'icons'))) fs.copyFileSync(src('assets', 'icons', f), path.join(out, 'icons', f));
  fs.writeFileSync(path.join(out, 'manifest.webmanifest'), JSON.stringify({
    name: 'Obrestad fyr', short_name: 'Obrestad fyr', start_url: './', scope: './', display: 'standalone',
    background_color: '#07141c', theme_color: '#07141c', lang: 'nb',
    icons: [{ src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }],
  }, null, 2));
  const walk = d => fs.readdirSync(path.join(out, d), { withFileTypes: true })
    .flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  const files = ['./', ...walk('').filter(f => f !== 'sw.js')].map(f => f.split(path.sep).join('/'));
  const ver = crypto.createHash('sha1').update(html).digest('hex').slice(0, 10);
  fs.writeFileSync(path.join(out, 'sw.js'), read(src('sw.template.js'))
    .replace('__VERSION__', ver).replace('__FILES__', JSON.stringify(files)));
}
console.log(`Bygget ${path.relative(root, path.join(out, file))} (${(html.length / 1e6).toFixed(2)} MB)`);
