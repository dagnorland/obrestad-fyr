# Arbeidsnotater for Claude

Les README.md og docs/ først.

- Alt innhold finnes på tre språk: `nb`, `de`, `en`. Ny tekst legges inn i alle tre i tekstobjektet `T` i kapittelfila (eller `S` i `src/shell.html`).
- Typografi: «» i norsk tekst, „“ i tysk, “ ” i engelsk, og ’ som apostrof.
- Kapitlene er vanlige skript (React 18 UMD + htm), ikke moduler. Hvert kapittel eksporterer `window.OF_M1`, `OF_M2`, `OF_M3` med props `{lang, kiosk, onDone}`. `onDone` kalles når kiosk-gjennomgangen av kapitlet er ferdig.
- CSS i kapitlene er prefikset med `.m1`, `.m2`, `.m3`. Fargevariabler finnes for lys og mørk modus.
- Fakturadata redigeres i `src/data/faktura-linjer.json` (`box` er piksler i `src/assets/faktura.jpg`, 2576 × 1806). Oppdater `docs/fakturaen.md` etterpå.
- Hold fakta fra 1873 adskilt fra dagens fyr, og legg kilder i `docs/historie-og-kilder.md`.
- Test med `npm start`, og kiosk med `/?kiosk=1`.
