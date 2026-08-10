# AGENTS.md

## Projekt

- **Name:** Adventure Bible
- **Typ:** Mobile-first Habit Tracker mit RPG-Elementen
- **Framework:** React + TypeScript + Vite
- **UI:** DaisyUI
- **Testing:** Vitest + React Testing Library
- **Ziel:** React-Abschlussprojekt

Adventure Bible verwandelt den Alltag in ein persönliches Abenteuer.

Die App passt sich an den Menschen an – nicht der Mensch an die App.

---

## Verbindliche Dokumentation

Vor Änderungen an Code oder Projektstruktur müssen die für die Aufgabe
relevanten Dokumente gelesen werden.

### Produkt

- `docs/PROJECT.md` – Produktvision und Grundprinzipien
- `docs/FEATURES.md` – Funktionsumfang und Scope

### Design & UX

- `docs/DESIGN.md` – visuelle und UX-Regeln
- `docs/ACCESSIBILITY.md` – Accessibility-Regeln

### Technik

- `docs/ARCHITECTURE.md` – technische Architektur
- `docs/ROADMAP.md` – aktueller Entwicklungsstand

### Agentic Workflow

- `docs/agentic/` – Arbeitsprozess, Templates und Checklisten
- `skills/` – projektspezifische Skills

Nicht jedes Dokument muss für jede Aufgabe gelesen werden.
Lies nur den Kontext, der für die konkrete Aufgabe relevant ist.

---

# Arbeitsablauf

Für jede nicht-triviale Änderung gilt:

1. Aufgabe in eigenen Worten wiedergeben.
2. Ist-Zustand feststellen.
3. Soll-Zustand definieren.
4. Scope und Nicht-Scope festlegen.
5. Betroffene Dateien und Bereiche untersuchen.
6. Risiken, Annahmen und offene Punkte benennen.
7. Akzeptanzkriterien formulieren.
8. Test oder präzisen Prüfschritt definieren.
9. Kleinste sinnvolle Änderung implementieren.
10. Relevante Tests und Checks ausführen.
11. Diff auf unnötige Änderungen prüfen.
12. Ergebnis, Checks und verbleibende Risiken berichten.

Bei trivialen lokalen Änderungen darf der Plan kurz ausfallen.
Die Prüfung des Ergebnisses bleibt trotzdem verpflichtend.

---

# Coding-Regeln

- Folge bestehenden Projektmustern.
- Ändere nur notwendige Dateien.
- Halte Änderungen klein und nachvollziehbar.
- Verwende bestehende Komponenten und Utilities wieder.
- DaisyUI ist das bevorzugte UI-System.
- Füge keine Dependency ohne nachvollziehbaren Grund hinzu.
- Verwende kein `any`, wenn ein sinnvoller Typ möglich ist.
- Keine globalen TypeScript- oder ESLint-Suppressions.
- Keine ungefragten Architekturänderungen.
- Keine ungefragten Designänderungen.
- Keine Drive-by-Refactorings.
- Loading-, Error-, Empty- und Success-Zustände bewusst behandeln.
- Accessibility ist Bestandteil jeder UI-Änderung.

---

# Testregeln

Bei Logik-, Feature- und Bugfix-Arbeit:

1. Erwartetes Verhalten definieren.
2. Möglichst zuerst einen passenden Test schreiben.
3. Bestätigen, dass der Test aus dem erwarteten Grund fehlschlägt.
4. Nur den notwendigen Code implementieren.
5. Test erfolgreich ausführen.
6. Erst danach refaktorieren.

Tests prüfen bevorzugt beobachtbares Verhalten statt
interner Implementierungsdetails.

Tests dürfen nicht gelöscht, übersprungen oder abgeschwächt werden,
nur damit das Projekt einen grünen Testlauf erhält.

Wenn ein automatisierter Test nicht sinnvoll möglich ist,
müssen konkrete manuelle Prüfschritte dokumentiert werden.

---

# UI- und UX-Regeln

Adventure Bible ist:

- mobile-first
- app-first
- ruhig
- verständlich
- spielerisch
- aber nicht überladen

Die App soll sich auf Smartphone und Desktop wie dieselbe Anwendung
anfühlen.

Desktop darf zusätzlichen Platz nutzen, darf die Anwendung aber
nicht in eine klassische Website verwandeln.

Die App soll dem Nutzer immer eine klare nächste Handlung anbieten.

Vermeide unnötige Entscheidungen, Menüs und visuelle Reize.

---

# Accessibility

Accessibility darf nicht nachträglich hinzugefügt werden.

Bei jeder UI-Änderung sind mindestens zu berücksichtigen:

- semantisches HTML
- Tastaturbedienung
- sichtbarer Fokus
- ausreichende Touch-Ziele
- verständliche Beschriftungen
- ausreichender Kontrast
- Statusinformationen nicht ausschließlich über Farbe
- reduzierte Bewegung bei `prefers-reduced-motion`
- sinnvolle Screenreader-Struktur

Kognitive Accessibility ist besonders wichtig.

Die App darf den Nutzer nicht durch unnötige Komplexität,
Informationsflut oder zu viele gleichwertige Aktionen überfordern.

---

# Produktprinzipien

Diese Regeln dürfen nicht durch technische oder spielerische
Entscheidungen unterlaufen werden:

1. Die App passt sich dem Nutzer an.
2. Energie ist eine Ressource.
3. Kleine Schritte sind echter Fortschritt.
4. Fortschritt zählt, nicht Perfektion.
5. Regeneration ist eine legitime Aktivität.
6. Der Nutzer bestimmt seinen Weg.
7. Bewusstes Nicht-Erledigen ist kein Versagen.
8. Verstehen statt Verurteilen.

---

# Änderungen mit besonderer Vorsicht

Ohne ausdrückliche Freigabe nicht verändern:

- Secrets oder `.env*`
- Authentifizierung
- Deployment
- CI/CD
- öffentliche API-Verträge
- Datenmodelle mit weitreichenden Auswirkungen
- Dependency-Versionen mit breiter Projektwirkung

Keine destruktiven Änderungen ohne ausdrückliche Zustimmung.

Wenn Ursache oder Auswirkung einer Änderung unklar ist:
zuerst analysieren und Unsicherheit offenlegen.

---

# Abschlussbericht

Nach einer abgeschlossenen Aufgabe berichten:

## Ergebnis

Was funktioniert jetzt?

## Geänderte Dateien

Welche Dateien wurden geändert und warum?

## Verifikation

Welche Tests oder Checks wurden ausgeführt?

## Diff

Wurde geprüft, dass keine unnötigen Änderungen enthalten sind?

## Risiken

Was wurde nicht geprüft oder bleibt offen?

## Nächster Schritt

Nur nennen, wenn tatsächlich notwendig.
