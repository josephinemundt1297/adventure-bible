# Adventure Bible – Design

## Designziel

Adventure Bible soll sich wie eine ruhige, persönliche
RPG-Anwendung anfühlen.

Der Nutzer soll das Gefühl haben:

> Ich betrete mein eigenes kleines Abenteuer.

Nicht:

> Ich muss hier erst 17 Dinge verstehen, bevor ich anfangen kann.

---

## Designprinzipien

### 1. Einfach vor dekorativ

Jedes visuelle Element muss einen Zweck erfüllen.

Dekoration darf die Orientierung nicht erschweren.

---

### 2. Game Feeling ohne Game Over

RPG-Elemente sollen Motivation und Atmosphäre erzeugen.

Sie sollen nicht:

- Druck erzeugen
- den Nutzer bestrafen
- wichtige Informationen verstecken
- die Bedienung komplizierter machen

XP, Quests, Level und Charakterelemente sind eine
Darstellung von Fortschritt – kein Bewertungssystem für den Wert des Nutzers.

---

### 3. Eine klare nächste Aktion

Auf einem Screen soll möglichst eindeutig sein:

> Was kann ich hier als Nächstes tun?

Nicht mehrere gleichwertige Call-to-Actions gleichzeitig anbieten,
wenn eine davon die Hauptaktion ist.

---

### 4. Mobile First

Die Smartphone-Ansicht ist die primäre Referenz.

Die Anwendung wird zuerst für kleine Displays gestaltet
und anschließend für größere Displays erweitert.

Die Anwendung bleibt auch auf Desktop eine App.

---

## Navigation

Die Hauptnavigation bleibt klein und konstant.

Der aktuelle MVP verwendet:

- Home
- Quests
- Plan
- Ich

Weitere Funktionen werden nicht automatisch in die Hauptnavigation aufgenommen.

Zusätzliche Funktionen können innerhalb von Ich
oder kontextbezogen erreichbar sein.

---

## Informationshierarchie

Ein Screen sollte möglichst diese Hierarchie besitzen:

Kontext
↓
wichtigste Information
↓
eine primäre Aktion
↓
optionale Informationen

Nicht alle verfügbaren Informationen müssen gleichzeitig angezeigt werden.

Sekundäre Informationen dürfen hinter einer weiteren Interaktion liegen.

---

## Dashboard

Das Dashboard ist der Einstiegspunkt der Anwendung.

Es soll primär zeigen:

1. Begrüßung / aktueller Kontext
2. aktuellen Zustand
3. eine passende nächste Aktivität
4. relevante Quests
5. Navigation

Das Dashboard ist kein Informations-Dashboard mit möglichst vielen Widgets.

---

## Quests

Quests sollen schnell verständlich sein.

Eine Questkarte sollte möglichst sofort erkennen lassen:

- Was ist zu tun?
- Wie viel Aufwand ist ungefähr nötig?
- Welche Art von Quest ist es?
- Welche Belohnung gibt es?

Die wichtigste Aktion muss eindeutig erkennbar sein.

---

## HP / Zustand

Zustände dürfen nicht ausschließlich durch Farbe kommuniziert werden.

Beispiel:

Nicht nur:

🔴

sondern:

❤️ Körper – Niedrig

Farben und Icons dürfen unterstützen,
aber Text und Struktur müssen die Information ebenfalls vermitteln.

---

## Visuelle Sprache

Die visuelle Richtung orientiert sich an:

- Natur
- Wald
- Abenteuer
- Buch / Journal
- ruhiger Fantasy
- warmer, freundlicher Atmosphäre

Die Gestaltung soll eher Cozy Fantasy als
klassisches High-Fantasy-RPG sein.

---

## Farben

Grundstimmung:

- warmes Creme / Pergament
- dunkles Waldgrün
- natürliche Erd- und Brauntöne
- dezente Gold-/Akzentfarben

Farben werden sparsam eingesetzt.

Primärfarbe:

Forest Green

Die Farbpalette soll Ruhe und Orientierung unterstützen.

---

## Typografie

Typografie soll klar und gut lesbar sein.

Eine dekorativere Schrift darf für:

- Logo
- große Überschriften
- besondere RPG-Elemente

verwendet werden.

Fließtext, Formulare und Interaktionen müssen
eine gut lesbare Standardschrift verwenden.

Lesbarkeit hat Vorrang vor Atmosphäre.

---

## Komponenten

DaisyUI ist das bevorzugte UI-System.

Bevorzugt werden vorhandene Komponenten,
bevor eigene UI-Komponenten entwickelt werden.

Typische Komponenten:

- Button
- Card
- Input
- Select
- Checkbox
- Progress
- Badge
- Modal
- Tabs
- Alert
- Toast

Eigene Komponenten werden nur erstellt,
wenn sie einen wiederkehrenden oder projektspezifischen Bedarf haben.

---

## Abstände und Layout

Das Layout soll großzügig und ruhig wirken.

Keine unnötig dichten Informationsblöcke.

Keine großen Mengen gleichwertiger Cards auf einem Screen.

Whitespace ist ausdrücklich erlaubt.

---

## Responsive Verhalten

### Mobile

- einspaltig
- klare vertikale Hierarchie
- Bottom Navigation

### Tablet / Desktop

- mehr Platz darf genutzt werden
- Inhalte dürfen breiter angeordnet werden
- App-Struktur bleibt erhalten
- Navigation bleibt klar und reduziert

Nicht erlaubt:

- Desktop-Layout als bloße Vergrößerung der Mobile-Ansicht
- riesige Content-Breiten ohne Zweck
- mehrere konkurrierende Navigationsebenen

---

## Accessibility

Accessibility ist Bestandteil des Designs.

Mindestens:

- ausreichender Kontrast
- sichtbarer Fokus
- Tastaturbedienung
- ausreichend große Touch-Ziele
- semantische HTML-Elemente
- verständliche Labels
- Status nicht nur über Farbe
- reduzierte Animation bei `prefers-reduced-motion`

---

## Kognitive Accessibility

Adventure Bible soll nicht nur technisch,
sondern auch kognitiv zugänglich sein.

Vermeiden:

- unnötige Entscheidungen
- überladene Dashboards
- zu viele gleichwertige Buttons
- überraschende Navigation
- lange Formulare
- unnötige Dialoge
- visuelle Überreizung

Die App soll den Nutzer führen,
ohne ihn zu bevormunden.

---

## Referenz

Das aktuelle Adventure-Bible-Layout dient als visuelle Referenz.

Bei einer Abweichung zwischen dekorativer Idee
und Usability gewinnt immer:

1. Accessibility
2. Verständlichkeit
3. Nutzerführung
4. Konsistenz
5. visuelle Atmosphäre
