# Adventure Bible – Skills

## Zweck

Skills sind wiederverwendbare Arbeitsanweisungen für klar abgegrenzte Aufgaben.

Sie ergänzen `AGENTS.md`, ersetzen aber keine Projektregeln.

---

# 1. Skill-Regeln

Ein Skill muss:

- einen klaren Zweck besitzen,
- einen definierten Input und Output haben,
- die relevanten Projektregeln referenzieren,
- überprüfbare Ergebnisse erzeugen,
- Security und Accessibility berücksichtigen, wenn relevant.

Ein Skill darf keine Produktanforderung erfinden.

---

# 2. Geplante Skills

## UI / Design

### `ui-component`

Erstellt oder erweitert eine UI-Komponente nach `DESIGN.md` und `ACCESSIBILITY.md`.

### `responsive-layout`

Prüft und implementiert mobile-first Layouts für Smartphone, Tablet und Desktop.

### `accessibility-review`

Prüft eine UI auf die Regeln aus `docs/ACCESSIBILITY.md`.

---

## React

### `react-feature`

Plant und implementiert ein klar abgegrenztes React-Feature einschließlich Tests.

### `react-test`

Erstellt oder erweitert Verhaltenstests mit der im Projekt verwendeten Testumgebung.

---

## Domain

### `quest-logic`

Implementiert oder testet Quest-Zustände, Quest-Abschluss und adaptive Quest-Auswahl.

### `state-model`

Arbeitet mit User-State, HP/Zustand und der zugehörigen Domain-Logik.

---

## Qualität

### `code-review`

Prüft eine Änderung auf Scope, Lesbarkeit, Tests, Security und Accessibility.

### `security-review`

Prüft sicherheitsrelevante Änderungen anhand von `docs/SECURITY.md`.

---

# 3. Skill-Priorität

Wenn mehrere Skills relevant sind, werden nur die notwendigen Skills verwendet.

Beispiel:

```text
Feature ändern
↓
react-feature
↓
ui-component
↓
react-test
↓
accessibility-review
↓
code-review
```

Nicht jeder Skill muss bei jeder Änderung ausgeführt werden.

---

# 4. Skill-Ausführung

Ein Skill soll möglichst:

1. Kontext prüfen
2. Voraussetzungen prüfen
3. Aufgabe ausführen
4. Ergebnis prüfen
5. relevante Tests ausführen
6. Ergebnis berichten

---

# 5. Skill-Grenzen

Skills dürfen nicht:

- `AGENTS.md` überschreiben
- Security-Regeln abschwächen
- Accessibility umgehen
- Secrets verlangen oder ausgeben
- ungefragt den MVP-Scope erweitern
- unnötige Dependencies installieren

---

# 6. Status

Die Liste oben beschreibt die geplanten Skills.

Die konkreten Skill-Dateien werden erst aus dem vorgesehenen Agentic-Programming-Workflow abgeleitet und anschließend unter `skills/` abgelegt.
