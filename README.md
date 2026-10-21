# Obrestad fyr

Interaktiv utstilling om Obrestad fyr på Jæren, tent i 1873. Laget for mobil (QR-kode på fyret) og for storskjermen i fyrbygningen. Norsk, tysk og engelsk. Et initiativ fra Jæren Kystlag for Hå kommune.

Tre kapitler:

1. **Ute på havet:** 3D-båt en mørk kveld med fyret som blinker hvert 30. sekund, kart med lyssektor og rekkevidde, og en kalkulator for hvor langt lyset ses.
2. **Optikeren og urmakeren:** folkene bak (Fresnel, Soleil, Henry-Lepaute), et strålelaboratorium og et levende urverk med regulator.
3. **Fakturaen fra Paris:** originalfakturaen fra 1873 med et forstørrelsesglass som oversetter håndskriften.

## Kom i gang

Krever Node 18 eller nyere.

```
npm install
npm start          # bygger og åpner på http://localhost:5173
```

## Bygging

```
npm run build          # dist/ – til Vercel, med offline-støtte (PWA)
npm run build:single   # dist-single/obrestad-fyr.html – én fil, henter biblioteker fra nett
```

## Publisering på Vercel

Koble GitHub-repoet til Vercel (Add New → Project → velg repoet). `vercel.json` forteller Vercel at den skal kjøre `npm run build` og publisere `dist/`. Hver push til `main` publiseres automatisk. Ingen zip-filer trengs.

Løsningen ligger foreløpig ute på <https://obrestad-fyr.vercel.app/>. Kiosk: <https://obrestad-fyr.vercel.app/?kiosk=1>.

## Struktur

```
src/
  shell.html              ramme: toppmeny, startside, språk, kiosk-løkke, QR
  chapters/kapittelN.js   ett kapittel per fil (React via htm, ingen byggesteg for JSX)
  chapters/kapittelN.css  stiler, avgrenset med .m1/.m2/.m3
  data/faktura-linjer.json  transkripsjon, oversettelser og koordinater for lupen
  assets/                 fakturabildet og app-ikoner
  sw.template.js          offline-støtte
build.mjs                 setter alt sammen
docs/                     plan, fakturaen, historie og kilder, kiosk og drift, hefte (PDF)
```

## Dokumentasjon

- [Plan](docs/plan.md)
- [Fakturaen linje for linje](docs/fakturaen.md)
- [Historien og kildene](docs/historie-og-kilder.md)
- [Storskjerm og drift](docs/kiosk-og-drift.md)
