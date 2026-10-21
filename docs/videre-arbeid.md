# Videre arbeid

Åpne punkter og ideer fra arbeidet så langt. Kryss av når de er gjort.

## Bør rettes før åpning

- [ ] Urverket i kapittel 2 bruker fire blinkpaneler. Fakturaen tyder på tre («3 lentilles verticales»), altså én omdreining på 90 sekunder. Legg til 3 som valg og bruk det som standard.
  - **Merknad:** Vi mener det er 2 blinkpaneler, ikke 3. Avklar dette før urverket endres.
- [ ] Test kiosken på selve storskjermen på fyret: lesbarhet på avstand, ytelse i 3D-scenen og at QR-koden lar seg skanne.
- [ ] Test på noen eldre mobiler (3D-scenen er tyngst).
- [ ] Gå gjennom kapitlene og tone ned historien etter ca. 1920 (se beslutningen om tidsramme nedenfor).
- [ ] Sjekk fresnellinsen i kapittel 2: Er prismene snudd riktig vei, innover eller utover? Sammenlign med kildebildene.
- [ ] Sjekk nøye hvor langt Obrestad fyr var synlig. Rekkevidden i kapittel 1 ser kanskje ikke helt riktig ut. Finn lyshøyden slik den var fram til ca. 1920, og vis lysvidden både med høyden fra 1920 og med dagens høyde (2026).

## Innhold som mangler

- [ ] Rett skanning ovenfra av fakturaen. Bytt `src/assets/faktura.jpg` og juster koordinatene i `src/data/faktura-linjer.json`.
- [ ] Den manglende fakturasiden (tilbehør for 245,30 franc mellom «à reporter 400» og «report 645,30»). Finnes den i arkivet?
- [ ] Fakta for fyret slik det var i 1873: lyshøyde, lysvidde og lyskarakter. I dag bygger kartet og rekkevidden på dagens fyr.
- [ ] Bilder eller tegninger av det originale tårnet og lyktehuset.
- [ ] Navn og historier om fyrvoktere på Obrestad.
- [ ] Ekte lydopptak av tåkesignalet («Studen på Obrest»), i stedet for den syntetiske lyden. **Bjørn Ådne** finner lydfilen.
- [ ] Forlis eller redningshistorier langs Varhaugstranda.

## Ideer fra planen som ikke er bygget ennå

- [ ] Fyrvokteren som fortellerfigur med hint og små utfordringer gjennom kapitlene.
- [ ] Kort quiz per kapittel og et digitalt «fyrvokterbevis» når alle tre er fullført.
- [ ] Knappen «Hva kostet det?» som setter 17 398,80 franc i perspektiv (for eksempel årslønner for en fyrvokter). Krever en historisk kilde.
- [ ] Eget domene og QR-skilt på fyret.
- [ ] Senere: Gjør fyret i 3D-scenen og illustrasjonene mer likt det originale fra 1873 (tårn, lyktehus og farger). Bygger på bildene i `docs/kilder/`. Ikke prioritert nå.

## Beslutninger så langt

- Initiativ fra Jæren Kystlag for Hå kommune, som eier fyret. Rettigheter til bilder og dokumenter er avklart.
- Språk: norsk, tysk og engelsk fra start.
- Storskjermen har ikke berøring, så kiosk-modus er en selvgående løkke med QR-kode til mobilversjonen.
- Båtscenen er i 3D.
- Tidsramme: Historien handler om det som skjedde fram til ca. 1920, da prismet og urverket fra 1873 fortsatt hørte sammen. Det som skjedde etterpå, skal bare nevnes kort.
- Hosting på Vercel fra GitHub. Løsningen virker offline (PWA) etter første besøk.
