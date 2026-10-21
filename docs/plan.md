# Obrestad fyr – plan for interaktiv nettløsning

Oct 18, 2026 · @Dag Børre Norland

## Mål og målgruppe

Målet er én nettløsning som får besøkende til å forstå at fyret var høyteknologi i 1873: presis optikk fra Paris og presist urverk fra en urmakerfamilie, satt sammen for at sjøfolk skulle finne veien på havet i en tid da sjøen var en stor transportvei.

Løsningen skal fungere i to moduser fra samme kode:

- **Mobil:** besøkende scanner en QR-kode på fyret og utforsker på egen telefon, gjerne ute med utsikt mot havet.
- **Storskjerm:** den eksisterende storskjermen i fyrbygningen, uten berøring, som viser en selvgående demo-loop.

Primær målgruppe er familier og skoleklasser (ca. 10–16 år). Den skal også være interessant nok for voksne med interesse for kysthistorie. Tonen er leken og konkret, med korte tekster og mye å trykke, dra og prøve. Det er ofte turister fra de fleste europeike land på besøk på fyret.

## Opplevelsen i tre deler

Løsningen bygges som tre kapitler med en felles startskjerm: fyret i mørket, der lyset blinker i riktig rytme. Rekkefølgen følger nysgjerrigheten: først *hva* fyret gjorde, så *hvordan*, og til slutt *hvem* som laget det.

1. **Ute på havet:** kart, mørk kveld, lysvidde og «om bord i båten».
2. **Inne i lykta:** teknologien, der optiker og urmaker møtes.
3. **Fakturaen fra Paris:** originaldokumentet med en lupe som oversetter til norsk.

Gjennom alle kapitlene går en liten fortellerfigur, **fyrvokteren**, som gir hint og små utfordringer: «Klarer du å holde blinket på 30 sekunder?» Hvert kapittel avsluttes med en kort quiz eller oppgave, og den som fullfører alle tre, får et digitalt «fyrvokterbevis» å vise frem.

## Modul 1 – Ute på havet

Modulen viser hvorfor fyret ble bygget. Langs Jæren ligger den lange, steinete Varhaugstranda, som var beryktet blant sjøfolk, og Obrestad fyr ble satt opp for å varsle om faren ([SNL](https://snl.no/Obrestad_fyr)).

**1a. Kartet i mørket.** Et stilisert kart over Jærkysten med Obrestad fyr (58,658° N, 5,554° Ø). Brukeren drar en glidebryter fra skumring til natt. Landet blir mørkt, og fyrets lyssektor tegnes som en vifte ut over havet med rekkevidden markert som en bue.

**1b. Hvor langt ser du lyset?** Jorden krummer seg, så lyset forsvinner bak horisonten. Brukeren justerer to ting:

- *Lyshøyde* (hvor høyt lyset står over havet)
- *Øyehøyde* (robåt, fiskeskøyte eller mast på en seilskute)

Avstanden regnes ut live og vises på kartet. Formelen sjøfolk bruker er:

```latex
d_{\text{nm}} \approx 2{,}08 \left(\sqrt{h_{\text{lys}}} + \sqrt{h_{\text{øye}}}\right)
```

I dag har fyret lyshøyde 39 m og lysvidde 18 nautiske mil (ca. 33 km) ([Wikipedia](https://en.wikipedia.org/wiki/Obrestad_Lighthouse)). Med en øyehøyde på 4 m gir formelen omtrent 17 nautiske mil, så tallene stemmer godt.

**1c. Om bord i båten.** Brukeren ser fra dekk mot land i en mørk natt, med bølger som gynger og en horisont som vipper. Fyret viser sin karakter: fast lys med blink hvert 30. sekund (FFl W 30s). Tre spill:

- **«Hvilket fyr er det?»** Tre fyr blinker med ulik rytme. Brukeren ser på blinkene, sammenligner med en enkel fyrliste og velger riktig. Slik navigerte man.
- **«Tell blinket»** Trykk hver gang du ser et blink. Spillet måler hvor nær 30 sekunder du kom.
- **Vær-knapp:** klart vær, regn, tåke. I tåke forsvinner lyset, og man hører i stedet tåkesignalet. Det kom til i 1916 og fikk senere tilnavnet «Studen på Obrest» for sine grynte-toner ([SNL](https://snl.no/Obrestad_fyr)).

På storskjerm kjører 1c som demo-loop: en båt som seiler langs kysten om natten, med fyret blinkende i riktig takt.

## Modul 2 – Inne i lykta: optiker møter urmaker

Kjernebudskapet er at fyret trengte to typer presisjon samtidig. Optikeren gjorde lyset sterkt og rettet. Urmakeren gjorde blinket regelmessig. Uten den ene var den andre lite verdt.

**2a. Bygg fyret selv.** Brukeren starter med en naken flamme og legger til deler én etter én. Til hver del vises en måler for hvor langt lyset når:

1. Bare flammen: lyset spres i alle retninger.
2. Legg til Fresnel-linsen: strålene blir parallelle, og rekkevidden hopper opp.
3. Legg til prismene over og under: enda mer av lyset fanges.
4. Legg til reflektoren mot land: den mørke sektoren sender lyset tilbake mot havet.
5. Legg til de roterende panelene: nå kommer blinket.

**2b. Strålelaboratoriet.** Et enkelt optikk-verktøy der brukeren drar flammen frem og tilbake. Lysstrålene tegnes live gjennom linsen. Står flammen i brennpunktet, blir strålene parallelle og en «perfekt!»-markering lyser opp. Står den feil, sprer lyset seg.

**2c. Urverket.** Et animert snitt av rotasjonsmaskinen: loddet, tannhjulene, regulatoren og rammen med panelene. Brukeren kan:

- dra loddet opp med en sveiv (fyrvokterens jobb) og se det sakte synke
- skru av regulatoren og se hva som skjer: rammen spinner løpsk og blinket blir kaos
- endre antall tannhjul eller tenner og se hvordan blinkintervallet endrer seg

**2d. Utfordringen: få 30 sekunder.** Brukeren får et urverk som går feil og må justere utvekslingen til blinket kommer nøyaktig hvert 30. sekund. Dette er selve poenget med modulen: urmakerens presisjon gjorde fyret gjenkjennelig.

## Modul 3 – Fakturaen fra Paris med oversettende lupe

Originaldokumentet vises i høy oppløsning. Brukeren drar en lupe over det: under glasset forstørres håndskriften, og den franske teksten byttes ut med leselig norsk. Effekten er at gammel håndskrift plutselig blir forståelig.

Slik virker lupen teknisk:

- Fakturaen skannes eller fotograferes rett ovenfra (ikke skrått som dagens bilde).
- Hver linje markeres med et rektangel i bildet. Til hver linje lagres fransk original, norsk oversettelse og en kort forklaring.
- Når lupen ligger over en linje, tegnes den norske teksten i lupen med en håndskrift-lignende skrift. Et trykk åpner forklaringen.

Eksempler på hva lupen kan avsløre:

| Fransk i fakturaen | Norsk | Forklaring i lupen |
| --- | --- | --- |
| Machine de rotation | Rotasjonsmaskin | Urverket som drev blinket. Kostet 2 250 franc. |
| Cheminées de cristal (150 stk.) | Lampeglass | Glass rundt flammen. Gikk ofte i stykker, derfor 150 i reserve. |
| Mètres de mèches (40 m) | Meter med veker | Vekene ble klippet hver natt for jevn flamme. |
| Appareil de 3me Ordre | Apparat av 3. orden | Linsens størrelse, brennvidde ca. 50 cm. |
| Henry-Lepaute, 6 rue de La Fayette | Henry-Lepaute, Paris | Urmakerfamilien som ble fyrbyggere. |

En ekstra knapp, **«Hva kostet det?»**, setter 17 398,80 franc i perspektiv, for eksempel omregnet til antall årslønner for en fyrvokter. Dette tallet må hentes fra en historisk kilde før det brukes.

## Teknisk løsning og publisering

Anbefalingen er å lage én React-app som prototypes som artifact i Claude og deretter flyttes til egen hosting for drift på fyret.

| Valg | Anbefaling | Hvorfor |
| --- | --- | --- |
| Rammeverk | React + Vite | Raskt å bygge, lett å vedlikeholde |
| Grafikk | SVG og Canvas, ev. Three.js for båtscenen | Fungerer godt på mobil og storskjerm |
| Kart | Stilisert SVG-kystlinje laget fra Kartverkets åpne data | Ser bedre ut i mørkemodus og virker uten nett |
| Lyd | Bølger, vind og tåkesignal | Gir stemning, kan slås av |
| Språk | Norsk, tysk og engelsk fra start | Mange turister langs Jæren |
| Drift | PWA som virker offline | Dårlig mobildekning eller nett nede i bygget |

To publiseringsveier:

- **Claude-artifact (prototype):** raskt å dele og teste. Begrensning: en publisert side kan ikke hente kartfliser eller bilder fra andre nettsteder, så kart og faktura må bakes inn i filen. Det passer fint med den stiliserte kartløsningen.
- **Egen hosting (drift):** for eksempel på Hå kommunes eller fyrets nettsted, eller Vercel, som passer godt for en statisk React-app. Gir eget domene, QR-kode som aldri endres, besøksstatistikk og mulighet for ekte kartfliser fra Kartverket. Som PWA lastes hele løsningen ned ved første besøk og virker videre når nettet faller ut.

Storskjerm-modus aktiveres med en URL-parameter (for eksempel `?kiosk=1`). Siden skjermen ikke har berøring, går den som en selvgående demo: båtscenen, urverket og fakturaen under lupen i en løkke, med QR-kode til mobilversjonen der man kan utforske selv.

## Innhold som må skaffes og fakta som må sjekkes

Det viktigste er at fakta fra 1873 holdes adskilt fra dagens fyr. Tårnet ble bygget om i 1950: granittbygningen ble maskinhus, og lykta flyttet til et betongtårn ([SNL](https://snl.no/Obrestad_fyr)). Lyshøyden, lysvidden og karakteren vi kjenner i dag er derfor ikke nødvendigvis de samme som i 1873.

- [ ] God skanning eller rett-ovenfra-foto av fakturaen, begge sider
- [ ] Full transkripsjon og oversettelse av fakturaen, linje for linje
- [ ] Lyshøyde, lysvidde og lyskarakter for fyret slik det var i 1873 (Kystverket, Norsk Fyrhistorisk Forening, fyrlister fra 1870-tallet)
- [ ] Bilder eller tegninger av det originale tårnet og lyktehuset
- [ ] Om det originale linseapparatet eller deler av det fortsatt finnes
- [ ] Navn og historier om fyrvoktere på Obrestad, gjerne med bilder
- [ ] Lydopptak av tåkesignalet, hvis det finnes
- [ ] Forlis eller redningshistorier langs Varhaugstranda som kan gi menneskelige fortellinger
- [ ] Avklaring om rettigheter til bilder og dokumenter med Hå kommune, som eier fyret ([SNL](https://snl.no/Obrestad_fyr))

## Faser og arbeidsomfang

Hele løsningen er anslått til 18–29 dagsverk for én utvikler som jobber sammen med Claude. Den kan tas i bruk etter fase 1 og bygges ut gradvis. Innhenting av innhold (fase 0) avhenger mest av andre og kan gå parallelt.

| Fase | Innhold | Estimat (dagsverk) | Leveranse |
| --- | --- | --- | --- |
| 0. Innhold og avklaring | Skanning, transkripsjon, fakta fra 1873, rettigheter | 2–4 | Faktaark og oversatt faktura |
| 1. Ute på havet | Kart, lysvidde-kalkulator, 3D-båtscene med blink (5–7 dagsverk med 3D) | 3–5 | Første publiserbare versjon |
| 2. Inne i lykta | Bygg fyret, strålelab, urverk, 30-sekunders-utfordring | 4–6 | Teknologimodulen |
| 3. Fakturaen | Lupe med oversettelse og forklaringer | 2–3 | Faktura-modulen |
| 4. Samling og storskjerm | Startskjerm, fyrvokterbevis, kiosk-modus, test med besøkende | 3–5 | Komplett løsning |
| 5. Drift og språk | Hosting, QR-skilt, oversettelse til tysk og engelsk | 2–4 | Løsningen i drift på fyret |
| 6. Senere: det originale fyret | Gjøre fyret mer likt det originale fra 1873, ut fra kildebildene | – | Tas ikke nå |

Båtscenen lages i 3D med bølger og vær. Den alene tar 4–5 dager og er det største usikkerhetspunktet.

## Neste steg og spørsmål

Forslaget er å starte med en klikkbar prototype av modul 1c, båtscenen med blinkende fyr. Den viser ideen raskest og kan brukes til å vise Jæren Kystlag og Hå kommune hva som er mulig.

Avklart så langt:

- Oppdragsgiver: Jæren Kystlag tar initiativet, som arrangør for Hå kommune, som eier fyret. Rettigheter til bilder og dokumenter er dermed i orden.
- Storskjerm: finnes allerede på fyret, uten berøring. Kiosk-modus blir en selvgående demo.
- Båtscenen: 3D er ønsket.
- Språk: norsk, tysk og engelsk fra start.
- Faktura: foreløpig finnes bare dagens foto. Lupen bygges på det, og byttes ut hvis en bedre skanning dukker opp.

## Kilder

- [Obrestad fyr – Store norske leksikon](https://snl.no/Obrestad_fyr)
- [Obrestad Lighthouse – Wikipedia](https://en.wikipedia.org/wiki/Obrestad_Lighthouse)
- Originalfakturaen fra Henry-Lepaute, Paris 1873 (foto fra Dag Børre)
