# Adventure Bible - Development Log

## Zweck

Dieses Dokument sammelt wichtige Entwicklungsschritte im Projekt.

Es ist kein privates Lerntagebuch. Es soll nachvollziehbar zeigen:

- was am Projekt geändert wurde,
- warum die Änderung sinnvoll war,
- welche Dateien betroffen waren,
- wie das Ergebnis geprüft wurde,
- welche Punkte noch offen sind.

Die Sprache bleibt bewusst einfach. Der Fokus liegt auf sauberer Arbeit statt auf komplizierten Fachwörtern.

---

## Schreibregeln

- Nur technische Fakten dokumentieren.
- Keine persönlichen Gedanken oder Learnings erfinden.
- Kleine, abgeschlossene Schritte eintragen.
- Tests und Checks konkret nennen.
- Offene Risiken ehrlich notieren.
- Keine langen Romane schreiben.

---

## 2026-09-06 - CSS und App-Einstieg aufgeräumt

### Ziel

Der technische Einstieg der App sollte sauberer werden. Styling und Theme-Konfiguration sollten nicht direkt in `main.tsx` liegen.

### Ist-Zustand

`main.tsx` enthielt zu viel Verantwortung. Neben dem App-Start war dort auch Clerk-Appearance-Konfiguration vorhanden.

### Umsetzung

- Clerk-Appearance wurde in eine eigene Datei verschoben.
- Globale Styles und Theme-Klassen bleiben in `index.css`.
- `main.tsx` ist wieder hauptsächlich Einstiegspunkt für React und Provider.

### Betroffene Bereiche

- `src/main.tsx`
- `src/app/clerkAppearance.ts`
- `src/index.css`

### Prüfung

- App wurde manuell auf Desktop und Mobile geprüft.
- User hat die manuelle Ansicht bestätigt.

### Offene Punkte

Keine offenen Punkte aus diesem Schritt.

---

## 2026-09-06 - Wiederholte UI-Muster zentraler gemacht

### Ziel

Wiederholte Farb- und Oberflächenmuster sollten nicht immer wieder einzeln in Komponenten stehen.

### Umsetzung

- Gemeinsame App-Surface- und Theme-Klassen wurden zentraler in `index.css` gebündelt.
- Wiederholte harte Farbwerte wurden aus TSX-Dateien entfernt, soweit sie im geprüften Scope betroffen waren.

### Prüfung

- `index.css`, `AppShell` und Clerk-Appearance wurden manuell geprüft.
- User hat die manuelle Prüfung bestätigt.

### Offene Punkte

Weitere UI-Muster werden weiter dateiweise geprüft, sobald sie auffallen oder im nächsten Scope liegen.

---

## 2026-09-06 - Layout-Muster geprüft

### Ziel

Unnötige `grid`-Layouts sollten entfernt werden, wenn `flex` für das konkrete Layout besser passt.

### Umsetzung

- Bottom Navigation wurde von `grid` auf `flex` umgestellt.
- Weitere Formular- und Flow-Bereiche wurden auf wiederholte Grid/Flex-Muster geprüft.
- Offensichtliche Layout-Fälle wurden auf `flex` vereinheitlicht.

### Wichtige Entscheidung

`grid` ist nicht grundsätzlich verboten. Bei echten Rastern, zum Beispiel einer Kalender-Woche mit 7 Spalten, bleibt `grid` sinnvoll.

### Prüfung

- Automatische Checks wurden nach den Änderungen ausgeführt.
- User hat betroffene Ansichten manuell bestätigt.

---

## 2026-09-06 - Quest Recommendation aufgeräumt

### Ziel

Die Quest-Empfehlung sollte kritisch geprüft und lesbarer gemacht werden.

### Umsetzung

- Layout wurde entschlackt.
- Feste Höhen und unnötiges Abschneiden von Text wurden reduziert.
- Verhalten der Quest-Auswahl wurde nicht fachlich verändert.

### Prüfung

- User hat die manuelle Prüfung bestätigt.

---

## 2026-09-06 - Reflexion lesbarer gemacht

### Ziel

`reflection.tsx` sollte besser wartbar werden.

### Umsetzung

- JSX wurde lesbarer strukturiert.
- Lokale Lade- und Speicherlogik blieb klein und nachvollziehbar.
- Kommentar ergänzt, damit klar ist, warum kaputte lokale Daten die Reflexion nicht blockieren.

### Prüfung

- User hat die Ansicht manuell bestätigt.

---

## 2026-09-06 - Tagesjournal und Kalenderverlauf ergänzt

### Ziel

Die Abendreflexion und der HP-/Quest-Verlauf sollten im Kalender nachvollziehbar werden.

### Soll-Zustand

Der Kalender soll zeigen können:

- großer HP-Check am Morgen,
- Quest gestartet,
- Quest abgeschlossen,
- Mini HP-Check,
- Lagerfeuer,
- abendliche Reflexion.

### Umsetzung

- Lokales Tagesjournal-Datenmodell angelegt.
- Journal-Events werden bei HP-Check, Quest-Aktionen, Mini HP-Check und Lagerfeuer geschrieben.
- Abendliche Reflexion wird als Tagesjournal-Eintrag gespeichert.
- Kalender zeigt Tage mit Einträgen, Tagesverlauf und Reflexion.

### Betroffene Bereiche

- `src/types/dayJournal.ts`
- `src/lib/dayJournal.ts`
- `src/features/hpCheck/components/hpCheck.tsx`
- `src/features/hpCheck/components/miniHpCheck.tsx`
- `src/features/quests/components/questRecommendation.tsx`
- `src/routes/reflection.tsx`
- `src/features/calendar/components/calendarView.tsx`
- `tests/dayJournal.test.ts`
- `docs/FEATURES.md`
- `docs/ROADMAP.md`
- `docs/ARCHITECTURE.md`

### Prüfung

- Automatische Tests für Tagesjournal-Logik wurden ergänzt.
- User hat den Flow manuell geprüft und bestätigt.

### Offene Punkte

Die Daten liegen im MVP nur lokal im Browser. Backend-Persistenz und serverseitige Autorisierung bleiben bewusst außerhalb des React-MVP.

---

## 2026-09-06 - Reflexionsformular nach Speichern verbessert

### Ziel

Nach dem Absenden der Reflexion soll klar sein, dass die Daten gespeichert wurden. Das Formular soll danach wieder frei sein.

### Umsetzung

- Formular setzt sich nach dem Speichern zurück.
- Erfolgsnachricht wird sichtbar angezeigt.
- Statusmeldung nutzt `role="status"` und `aria-live="polite"`.

### Prüfung

- User hat das Verhalten manuell getestet und bestätigt.

---

## 2026-09-06 - Statische Demo-Daten entfernt

### Ziel

Feste Demo-Daten wie `28.07.2026` sollten nicht mehr in produktiven UI-Komponenten stehen.

### Umsetzung

- Zentraler Date-Formatter in `src/lib/dateFormat.ts` angelegt.
- Plan nutzt jetzt ein dynamisches kurzes deutsches Datum.
- Reflexion nutzt jetzt ein dynamisches langes deutsches Datum.
- Tests für die Datumsformatierung ergänzt.

### Betroffene Bereiche

- `src/lib/dateFormat.ts`
- `src/features/plan/components/dayPlan.tsx`
- `src/routes/reflection.tsx`
- `tests/dateFormat.test.ts`

### Prüfung

- `npm test -- dateFormat`
- `npm test`
- `npm run lint`
- `npm run build`

Alle Checks waren erfolgreich.

---

## 2026-09-06 - Kalender-View in kleinere Verantwortungen geteilt

### Ziel

`calendarView.tsx` war zu groß und hatte zu viele Aufgaben in einer Datei.

### Umsetzung

- `CalendarView` steuert jetzt hauptsächlich den Screen-State und setzt die Bereiche zusammen.
- Wochenlogik und Event-Zusammenfassungen liegen in `calendar.helpers.ts`.
- Wochenauswahl liegt in `WeekSelector`.
- Tageszusammenfassung liegt in `DaySummary`.
- Tagesverlauf und Reflexion liegen in `DayJournalDetails`.
- Kalender-Helper wurden automatisiert getestet.

### Betroffene Bereiche

- `src/features/calendar/components/calendarView.tsx`
- `src/features/calendar/calendar.helpers.ts`
- `src/features/calendar/components/weekSelector.tsx`
- `src/features/calendar/components/daySummary.tsx`
- `src/features/calendar/components/dayJournalDetails.tsx`
- `tests/calendarHelpers.test.ts`
- `src/lib/dateFormat.ts`
- `tests/dateFormat.test.ts`

### Prüfung

- `npm test`
- `npm run lint`
- `npm run build`

Alle Checks waren erfolgreich.

### Offene Punkte

Eine manuelle Kalender-Prüfung auf Desktop und Mobile steht nach diesem Refactor noch aus.

---

## 2026-09-06 - Abgeschnittene UI-Texte reduziert

### Ziel

Wichtige Texte sollen nicht unnötig abgeschnitten werden. Das ist besser für Lesbarkeit und passt zu den Accessibility-Regeln.

### Umsetzung

- Quest-Beschreibungen im Mini HP-Check werden nicht mehr nach zwei Zeilen abgeschnitten.
- Achievement-Titel in der Reward-Benachrichtigung dürfen umbrechen, statt abgeschnitten zu werden.

### Betroffene Bereiche

- `src/features/hpCheck/components/miniHpCheck.tsx`
- `src/components/ui/rewardNotification.tsx`

### Prüfung

- `npm test`
- `npm run lint`
- `npm run build`

Alle Checks waren erfolgreich.

### Offene Punkte

Eine manuelle Prüfung mit sehr langen Quest- und Achievement-Texten wäre sinnvoll.

---

## 2026-09-06 - Profilbild-Feedback ohne Browser-Alert

### Ziel

Fehler und Erfolg beim Profilbild-Upload sollen direkt in der App sichtbar sein, nicht als blockierender Browser-Alert.

### Umsetzung

- `window.alert` im Profilbild-Upload entfernt.
- Upload-Feedback als lokale Statusmeldung ergänzt.
- Fehlermeldungen nutzen `role="alert"`.
- Erfolgsmeldung nutzt `role="status"`.

### Betroffene Bereiche

- `src/features/profile/components/profileAvatar.tsx`

### Prüfung

- Suche nach `window.alert`, `alert(`, `confirm(` und `prompt(` im App-Code.
- `npm test`
- `npm run lint`
- `npm run build`

Alle Checks waren erfolgreich.

### Offene Punkte

Manuelle Prüfung mit falschem Dateityp, zu großer Datei und gültigem Bild steht noch aus.

---

## 2026-09-06 - README an aktuellen MVP-Stand angepasst

### Ziel

Der README soll für eine Bewerbung klar und ehrlich zeigen, was die App kann und was noch offen ist.

### Umsetzung

- Tagesjournal und Kalenderverlauf in den Feature-Überblick aufgenommen.
- Projektstruktur um das Calendar-Feature ergänzt.
- Beschreibung des Development Logs korrigiert.
- MVP-Status an die Roadmap angepasst: Kern-Loop ist fertig, finale manuelle Accessibility-Abnahme ist noch offen.

### Betroffene Bereiche

- `README.md`
- `docs/DEVELOPMENT_LOG.md`

### Prüfung

- README mit `docs/ROADMAP.md` abgeglichen.
- `npm test`
- `npm run lint`
- `npm run build`

Alle Checks waren erfolgreich.

---

## 2026-09-06 - Lange Reflexionstexte im Kalender abgesichert

### Ziel

Lange Texte aus der abendlichen Reflexion sollen im Kalender nicht aus der Karte herauslaufen.

### Ist-Zustand

Sehr lange Wörter oder unstrukturierte Texte konnten in der Reflexionskarte optisch über den rechten Rand laufen.

### Umsetzung

- Reflexionstexte im Tagesjournal bekommen eine gemeinsame Textklasse.
- Lange Wörter dürfen jetzt innerhalb der Karte umbrechen.

### Betroffene Bereiche

- `src/features/calendar/components/dayJournalDetails.tsx`
- `docs/DEVELOPMENT_LOG.md`

### Prüfung

- `npm test`
- `npm run lint`
- `npm run build`

Alle Checks waren erfolgreich.

### Offene Punkte

Manuelle Prüfung im Browser mit dem langen Testtext aus der Reflexion steht noch aus.

---

## 2026-09-06 - Sehr kleine Schrift im Mini HP-Check angepasst

### Ziel

Sehr kleine UI-Texte sollen vermieden werden, damit die App auf mobilen Geräten besser lesbar bleibt.

### Ist-Zustand

Der vorherige Vergleichswert im Mini HP-Check wurde mit einer zu kleinen Sonderklasse angezeigt.

### Umsetzung

- Schriftgröße für den vorherigen HP-Wert im Mini HP-Check auf eine normale Tailwind-Klasse angehoben.
- Eigene Zeilenhöhe ergänzt, damit der kompakte Wertebereich stabil bleibt.

### Betroffene Bereiche

- `src/features/hpCheck/components/miniHpCheck.tsx`
- `docs/DEVELOPMENT_LOG.md`

### Prüfung

- Suche nach Schriftgrößen unter 10px im `src`-Code.
- `npm test`
- `npm run lint`
- `npm run build`

Alle Checks waren erfolgreich.

---

## 2026-09-06 - Ersetzbare Tailwind-Sonderwerte reduziert

### Ziel

Tailwind-Klassen mit eckigen Klammern sollen nur dort bleiben, wo es wirklich keine passende Standardklasse gibt.

### Ist-Zustand

Mehrere Texte nutzten Sonderwerte wie eigene Pixelgrößen oder eigenes Letter-Spacing.

### Umsetzung

- Ersetzbare `text-[...]`-Klassen durch normale Tailwind-Textgrößen ersetzt.
- Ersetzbare `tracking-[...]`-Klassen durch `tracking-widest` ersetzt.
- `hover:scale-[1.01]` durch eine normale Scale-Klasse ersetzt.
- Layout-Sonderwerte mit `vw`, `dvh`, `calc()` und `env()` bleiben vorerst stehen, weil sie keine saubere 1:1-Standardklasse haben.

### Betroffene Bereiche

- `src/routes/profile.tsx`
- `src/routes/reflection.tsx`
- `src/features/home/components/homeDashboard.tsx`
- `src/features/hpCheck/components/miniHpCheck.tsx`
- `src/features/plan/components/dayPlan.tsx`
- `src/features/profile/components/progressStats.tsx`
- `src/components/layout/bottomNavigation.tsx`
- `src/components/ui/rewardNotification.tsx`
- `docs/DEVELOPMENT_LOG.md`

### Prüfung

- Suche nach `text-[...]`, `tracking-[...]` und `scale-[...]` im `src`-Code.
- `npm test`
- `npm run lint`
- `npm run build`

---

## 2026-09-06 - Touch-Ziele kritisch geprüft

### Ziel

Wichtige Aktionen sollen auf mobilen Geräten zuverlässig antippbar sein.

### Ist-Zustand

Einige interaktive Elemente waren kleiner als 44px oder nutzten kompakte DaisyUI-Buttonklassen.

### Umsetzung

- Plan-Aktionsbuttons von `size-9` auf `size-11` angehoben.
- Mini HP-Check-Aktionen auf mindestens `min-h-11` angehoben.
- Kleines Dialog-Schließen auf `min-h-11 w-11` angehoben.
- Profilbild-Upload-Label auf `min-h-11` angehoben.

### Betroffene Bereiche

- `src/features/plan/components/dayPlan.tsx`
- `src/features/hpCheck/components/miniHpCheck.tsx`
- `src/features/plan/components/addActivityDialog.tsx`
- `src/features/profile/components/profileAvatar.tsx`
- `docs/DEVELOPMENT_LOG.md`

### Prüfung

- Suche nach `size-9`, `min-h-9`, `btn-xs` und `btn-sm` im App-Code.
- `npm test`
- `npm run lint`
- `npm run build`

Alle Checks waren erfolgreich.

---

## 2026-09-06 - Bottom Navigation bei Desktop-Skalierung stabilisiert

### Ziel

Die Bottom Navigation soll im Desktop-PhoneFrame nicht rechts abgeschnitten werden.

### Ist-Zustand

Bei einer Prüfung auf einem anderen PC wurde sichtbar, dass die Navigation durch Skalierung und enge Breite rechts aus dem sichtbaren Bereich laufen konnte.

### Umsetzung

- Navigation wird über `left-4 right-4` im Frame gehalten statt über eine berechnete Breite.
- Seitliche Link-Paddings wurden reduziert.
- Flexible Navigationseinträge bekommen `min-w-0`.
- Der mittlere HP-Button bekommt eine feste Breite, damit er die anderen Einträge nicht wegdrückt.

### Betroffene Bereiche

- `src/components/layout/bottomNavigation.tsx`
- `docs/ROADMAP.md`
- `docs/DEVELOPMENT_LOG.md`

### Prüfung

- Keyboard-Test wurde manuell bestätigt.
- Google Lighthouse wurde geprüft und bestanden.
- `npm test`
- `npm run lint`
- `npm run build`

### Offene Punkte

Der konkrete Desktop-Skalierungsfall sollte nach dem Fix nochmal auf dem betroffenen PC geprüft werden.
