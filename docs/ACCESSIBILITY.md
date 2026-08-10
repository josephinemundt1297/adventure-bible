# Adventure Bible – Accessibility

## Zweck

Accessibility ist ein fester Bestandteil von Adventure Bible und keine nachträgliche Optimierung.

Die Anwendung soll möglichst vielen Menschen ermöglichen, ihre Aufgaben, ihren Zustand und ihren Fortschritt selbstständig zu erfassen und zu verwalten.

Dabei berücksichtigen wir sowohl **technische Accessibility** als auch **kognitive Accessibility**.

---

# 1. Grundprinzipien

Adventure Bible folgt diesen Grundsätzen:

1. Informationen müssen verständlich sein.
2. Interaktionen müssen wahrnehmbar und bedienbar sein.
3. Funktionen dürfen nicht ausschließlich von einer bestimmten Eingabemethode abhängen.
4. Statusinformationen dürfen nicht ausschließlich über Farbe vermittelt werden.
5. Die App soll keine unnötige kognitive Belastung erzeugen.
6. Accessibility darf nicht zugunsten von Game Feeling oder visueller Gestaltung verloren gehen.
7. Die primäre Nutzeraktion muss eindeutig erkennbar sein.

Bei einem Konflikt zwischen dekorativer Gestaltung und Accessibility gewinnt Accessibility.

---

# 2. Semantisches HTML

Bevorzugt werden semantische HTML-Elemente:

- `header`
- `main`
- `nav`
- `section`
- `article`
- `button`
- `form`
- `label`
- `input`
- `select`
- `textarea`
- `ul` / `ol`

Ein Element darf nicht nur wegen seines Aussehens als anderes Element verwendet werden.

Interaktive Elemente müssen auch mit Tastatur und assistiven Technologien sinnvoll funktionieren.

---

# 3. Tastaturbedienung

Alle wichtigen Funktionen müssen ohne Maus bedienbar sein.

Dazu gehören insbesondere:

- Navigation
- Buttons
- Formulare
- Dialoge
- Tabs
- Auswahlfelder
- Quest-Aktionen
- Navigation zwischen Hauptbereichen

### Fokus

- Der Tastaturfokus muss sichtbar sein.
- Fokus darf nicht durch dekoratives Styling entfernt werden.
- Die Fokusreihenfolge muss logisch sein.
- Der Fokus darf nicht hinter einem Dialog oder einer anderen UI-Ebene verborgen bleiben.

---

# 4. Touch und Interaktion

Interaktive Elemente müssen auf mobilen Geräten zuverlässig bedienbar sein.

Dabei gilt:

- Touch-Ziele ausreichend groß gestalten.
- Benachbarte Aktionen nicht unnötig dicht platzieren.
- Nicht ausschließlich auf Hover-Zustände verlassen.
- Wichtige Aktionen nicht nur durch kleine Icons darstellen.

---

# 5. Farbe und Kontrast

Farbe darf niemals die einzige Information sein.

Beispiel:

Nicht nur:

> rote Anzeige = niedrige Energie

Sondern beispielsweise:

> Energie – niedrig

mit zusätzlicher visueller Kennzeichnung.

Kontrast muss ausreichend sein für:

- normalen Text
- wichtige UI-Elemente
- Fokuszustände
- Statusanzeigen
- Icons mit funktionaler Bedeutung

---

# 6. Typografie und Lesbarkeit

- Text muss gut lesbar sein.
- Schriftgrößen dürfen nicht unnötig klein gewählt werden.
- Zeilenabstände und Abstände zwischen Elementen müssen ausreichend sein.
- Lange Textblöcke sollen vermieden oder sinnvoll strukturiert werden.
- Überschriften müssen die Informationshierarchie unterstützen.

Dekorative Schriften dürfen nur dort eingesetzt werden, wo sie die Lesbarkeit nicht beeinträchtigen.

---

# 7. Screenreader

Die Anwendung soll mit Screenreadern sinnvoll nutzbar sein.

Dafür gelten unter anderem:

- Bilder mit relevanter Information benötigen sinnvolle Alternativtexte.
- Dekorative Bilder dürfen von Screenreadern ignoriert werden.
- Buttons müssen verständlich benannt sein.
- Icon-only Buttons benötigen einen zugänglichen Namen.
- Formulare benötigen zugehörige Labels.
- Überschriften müssen die Struktur der Seite widerspiegeln.
- Wichtige Statusänderungen müssen für assistive Technologien sinnvoll angekündigt werden.

---

# 8. Formulare

Formulare sollen so kurz und verständlich wie möglich sein.

Jedes Eingabefeld benötigt:

- ein verständliches Label
- einen klaren Zweck
- eine erkennbare Fehleranzeige, falls notwendig

Fehlermeldungen müssen:

- verständlich sein
- das Problem benennen
- möglichst erklären, wie es behoben werden kann
- nicht ausschließlich durch Farbe dargestellt werden

Keine unnötigen Pflichtfelder.

---

# 9. Navigation

Die Hauptnavigation muss:

- konsistent bleiben
- eindeutig beschriftet sein
- einen erkennbaren aktuellen Zustand besitzen
- mit Tastatur bedienbar sein
- auf mobilen Geräten zuverlässig erreichbar sein

Icons dürfen die Navigation unterstützen, ersetzen aber nicht automatisch verständliche Beschriftungen.

---

# 10. Zustände und Feedback

Die Anwendung muss wichtige Zustandsänderungen verständlich kommunizieren.

Zu berücksichtigen sind insbesondere:

- Loading
- Success
- Error
- Empty State
- Disabled State
- Focus State
- aktive Navigation
- Quest abgeschlossen
- XP erhalten

Beispiel:

Nicht ausschließlich:

> Karte wird grün.

Sondern zusätzlich verständliches Feedback wie:

> Quest abgeschlossen – 20 XP erhalten.

---

# 11. Animation und Bewegung

Animationen sollen Atmosphäre unterstützen, aber keine notwendige Information transportieren.

Bei aktivem `prefers-reduced-motion: reduce` müssen nicht notwendige Bewegungen reduziert oder entfernt werden.

Zu vermeiden sind:

- unnötig lange Animationen
- dauerhaft bewegte Elemente
- starke visuelle Effekte ohne funktionalen Nutzen
- Animationen, die die Bedienung erschweren

Game Feeling darf nicht auf Kosten der Nutzbarkeit entstehen.

---

# 12. Responsive Accessibility

Mobile-first bedeutet nicht nur, dass Inhalte auf kleine Displays passen.

Die Bedienbarkeit muss auf verschiedenen Bildschirmgrößen erhalten bleiben.

### Mobile

- keine horizontale Scrollpflicht für normale Inhalte
- wichtige Aktionen gut erreichbar
- ausreichend große Touch-Ziele
- klare vertikale Informationshierarchie

### Desktop

- Tastaturbedienung vollständig erhalten
- Fokus sichtbar
- Inhalte nicht unnötig über die gesamte Bildschirmbreite strecken
- App-Charakter beibehalten

---

# 13. Kognitive Accessibility

Kognitive Accessibility ist für Adventure Bible besonders wichtig.

Die App soll nicht nur technisch zugänglich sein, sondern auch dabei helfen, Entscheidungen und Aufgaben zu strukturieren.

## Vermeiden

- zu viele gleichwertige Aktionen
- unnötige Menüs
- überfüllte Dashboards
- lange Formulare
- unnötige Dialoge
- unklare Fehlermeldungen
- überraschende Navigation
- unnötige Fachbegriffe
- Informationsüberflutung
- zeitlichen Druck ohne zwingenden Grund

## Bevorzugen

- eine klare nächste Aktion
- kurze Texte
- erkennbare Kategorien
- konsistente Begriffe
- vorhersehbare Navigation
- progressive Offenlegung von Zusatzinformationen
- verständliche Defaults
- kleine, überschaubare Schritte

---

# 14. Game-Mechaniken und Accessibility

RPG-Elemente dürfen Accessibility nicht verschlechtern.

## XP

XP müssen verständlich sein und dürfen nicht die einzige Darstellung von Fortschritt sein.

## HP / Zustand

HP- oder Zustandswerte dürfen nicht ausschließlich durch Farben, Symbole oder Animationen vermittelt werden.

## Quests

Quest-Typen müssen auch ohne Farberkennung unterscheidbar sein.

## Belohnungen

Belohnungen dürfen nicht ausschließlich durch Animationen oder Sound kommuniziert werden.

## Fortschritt

Fortschritt darf nicht als moralische Bewertung des Nutzers dargestellt werden.

---

# 15. Sprache und Verständlichkeit

Die Sprache der App soll:

- klar
- freundlich
- konkret
- nicht wertend
- möglichst kurz

sein.

Vermeide Formulierungen, die nicht erledigte Aufgaben als persönliches Versagen darstellen.

Bevorzugt:

> Heute verschoben

statt:

> Du hast versagt.

---

# 16. Technische Prüfungen

Accessibility wird während der Entwicklung regelmäßig geprüft.

Mindestens zu prüfen sind:

- TypeScript / Build
- Tastaturbedienung
- sichtbarer Fokus
- semantische Struktur
- Formulare und Labels
- Kontrast
- responsive Darstellung
- reduzierte Bewegung
- Screenreader-relevante Namen und Zustände

Automatisierte Accessibility-Tests sollen eingesetzt werden, wo sie sinnvoll sind.

Automatisierte Tests ersetzen jedoch keine manuelle Prüfung.

---

# 17. Definition of Done – Accessibility

Eine UI-Funktion gilt aus Accessibility-Sicht erst als abgeschlossen, wenn:

- [ ] sie mit Tastatur bedienbar ist
- [ ] der Fokus sichtbar und logisch ist
- [ ] interaktive Elemente zugängliche Namen besitzen
- [ ] Formulare korrekt beschriftet sind
- [ ] Status nicht ausschließlich über Farbe kommuniziert wird
- [ ] relevante Fehler verständlich dargestellt werden
- [ ] Touch-Bedienung funktioniert
- [ ] responsive Darstellung geprüft wurde
- [ ] unnötige Animationen reduziert werden können
- [ ] die kognitive Belastung angemessen ist
- [ ] eine manuelle Accessibility-Prüfung durchgeführt wurde

---

# 18. Priorität

Bei Konflikten gilt folgende Reihenfolge:

1. Accessibility
2. Verständlichkeit
3. Nutzerführung
4. Funktionalität
5. visuelle Konsistenz
6. dekoratives Game Feeling

Adventure Bible soll sich wie ein Spiel anfühlen.

Es darf aber niemals wichtiger werden, wie spielerisch etwas aussieht,
als wie gut ein Mensch es tatsächlich benutzen kann.
