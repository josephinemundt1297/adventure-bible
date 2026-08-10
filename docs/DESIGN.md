# Adventure Bible – Design

## Designziel

Adventure Bible soll sich wie eine ruhige, persönliche
RPG-Anwendung anfühlen.

Der Nutzer soll das Gefühl haben:

> „Ich betrete mein eigenes kleines Abenteuer.“

Nicht:

> „Ich muss hier erst 17 Dinge verstehen, bevor ich anfangen kann.“

---

# Designprinzipien

## 1. Einfach vor dekorativ

Jedes visuelle Element muss einen Zweck erfüllen.

Dekoration darf die Orientierung nicht erschweren.

---

## 2. Game Feeling ohne Game Over

RPG-Elemente sollen Motivation und Atmosphäre erzeugen.

Sie sollen nicht:

- Druck erzeugen
- den Nutzer bestrafen
- wichtige Informationen verstecken
- die Bedienung komplizierter machen

XP, Quests, Level und Charakterelemente sind eine
Darstellung von Fortschritt – kein Bewertungssystem für den Wert des Nutzers.

---

## 3. Eine klare nächste Aktion

Auf einem Screen soll möglichst eindeutig sein:

> **Was kann ich hier als Nächstes tun?**

Nicht mehrere gleichwertige Call-to-Actions gleichzeitig anbieten,
wenn eine davon die Hauptaktion ist.

---

## 4. Mobile First

Die Smartphone-Ansicht ist die primäre Referenz.

Die Anwendung wird zuerst für kleine Displays gestaltet
und anschließend für größere Displays erweitert.

Desktop ist keine separate Website.

Die Anwendung soll auch auf großen Bildschirmen
den Charakter einer App behalten.

---

# Navigation

Die Hauptnavigation bleibt klein und konstant.

Der aktuelle MVP verwendet:

- Home
- Quests
- Plan
- Ich

Weitere Bereiche werden nicht automatisch in die Hauptnavigation aufgenommen.

Zusätzliche Funktionen können innerhalb von `Ich`
oder kontextbezogen erreichbar sein.

---

# Informationshierarchie

Ein Screen sollte möglichst diese Hierarchie besitzen:

```text
Kontext
↓
wichtigste Information
↓
eine primäre Aktion
↓
optionale Informationen
```
