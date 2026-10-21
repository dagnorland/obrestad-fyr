# Storskjerm (kiosk) og drift

## Adresser

| Adresse | Hva |
| --- | --- |
| `/` | Vanlig visning, mobil og PC |
| `/?kapittel=2` | Rett til et kapittel (1–3) |
| `/?lang=de` | Fast språk (`nb`, `de`, `en`). Ellers velges språk fra mobilens innstilling |
| `/?kiosk=1` | Storskjerm |

## Kiosk-løkken

Startside med QR-kode (14 s), kapittel 1 (ca. 115 s), kapittel 2 (ca. 105 s), kapittel 3 (ca. 65 s), og så neste språk. Én runde tar omtrent 5 minutter, alle tre språkene omtrent 15 minutter. Musepeker og språkknapper er skjult. Siden laster seg selv på nytt omtrent hver sjette time, ved starten av en norsk runde.

Tidene står i `App`-funksjonen i hvert kapittel (`src/chapters/kapittel*.js`) og i `Shell` i `src/shell.html`.

## QR-koden

QR-koden peker til `SITE_URL` i `src/shell.html`, som nå er `https://obrestad-fyr.vercel.app/`. Får løsningen eget domene, endrer du `SITE_URL` og bygger på nytt. Står `SITE_URL` tom, peker QR-koden til adressen siden åpnes fra, uten `kiosk`. Da vises den ikke når siden kjøres fra en fil eller fra Claude.

## Oppsett av skjermen

1. Åpne `https://obrestad-fyr.vercel.app/?kiosk=1` én gang med nett. Da lagres alt for bruk uten nett.
2. Start nettleseren i fullskjerm-kiosk, for eksempel Chrome:
   `chrome --kiosk --noerrdialogs --disable-session-crashed-bubble https://obrestad-fyr.vercel.app/?kiosk=1`
3. Slå av skjermsparer, hvilemodus og automatiske oppdateringer som kan avbryte visningen.
4. Legg nettleseren inn som oppstartsprogram, så skjermen kommer seg selv etter strømbrudd.

## Offline

`dist/sw.js` lagrer hele løsningen ved første besøk. Når nettet er tilbake, hentes ny versjon automatisk. Versjonsnummeret i cachen endres hver gang `index.html` endres.
