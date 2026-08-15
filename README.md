# 🧭 Adventure Bible

> **Dein Alltag wird zum Abenteuer.**
>
> Adventure Bible ist ein mobile-first Habit- und Quest-Tracker mit RPG-Elementen, der Aufgaben und Selbstfürsorge an den aktuellen Zustand des Nutzers anpasst.

![Adventure Bible – Layout-Idee](LayoutIdee.png)

## ✨ Über das Projekt

Adventure Bible wurde als React-Abschlussprojekt entwickelt. Die zentrale Idee: **Nicht der Mensch passt sich der App an – die App passt sich dem Menschen an.**

Statt eine starre To-do-Liste vorzugeben, erfasst Adventure Bible zunächst den aktuellen Zustand des Nutzers. Daraus werden passende Quests vorgeschlagen. Nach einer abgeschlossenen Quest kann der Nutzer seinen Zustand erneut einschätzen und entscheiden, ob er eine weitere Quest angehen oder am Lagerfeuer regenerieren möchte.

Der MVP konzentriert sich bewusst auf einen kleinen, vollständigen und getesteten Produkt-Loop.

## 🎯 Der zentrale Adventure-Bible-Loop

```text
┌─────────────────────┐
│   Großer HP-Check   │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│    HP-Zustand       │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Adaptive Quests     │
│  ≥ 2 Vorschläge     │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│    Quest starten    │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│   Quest abschließen │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ XP · Quest Points   │
│ · Reward            │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│    Mini HP-Check    │
└──────────┬──────────┘
           ↓
      ┌────┴────┐
      ↓         ↓
  Neue Quest  🔥 Lagerfeuer
      │         │
      └────┬────┘
           ↓
    Nächster Zyklus
```

Der HP-Check ist **keine medizinische Diagnose**. Er dient ausschließlich dazu, den eigenen aktuellen Zustand bewusst wahrzunehmen und daraus passende nächste Schritte abzuleiten.

---

## 🌟 Features

### 🖤 Großer HP-Check

- strukturierter Check zu sieben HP-Bereichen
- drei Fragen pro Bereich
- fünf Antwortmöglichkeiten pro Frage
- nachvollziehbare HP-Berechnung
- übersichtliche Zusammenfassung des aktuellen Zustands
- bewusst ohne medizinischen Diagnoseanspruch

### ⚔️ Adaptive Quest-Auswahl

Quests werden anhand des aktuellen HP-Zustands priorisiert.

- mindestens zwei passende Quest-Optionen
- lokale Quest-Bibliothek als JSON
- Quest-Historie wird berücksichtigt
- Quest starten und abschließen
- XP und Quest Points
- sichtbares Reward-Feedback

### 🌿 Mini HP-Check

Nach einer Quest kann der Nutzer seinen aktuellen Zustand schnell erneut einschätzen.

- zugängliche Regler
- aktuelle Werte direkt sichtbar
- Vergleich mit vorherigen Werten
- Grundlage für den nächsten Quest-Vorschlag

### 🔥 Lagerfeuer & Regeneration

Der Nutzer kann sich bewusst für eine Pause entscheiden.

Das Lagerfeuer ist kein Fehler- oder Abbruchzustand, sondern ein bewusstes Element des Fortschritts:

> **Regeneration ist Teil des Abenteuers.**

### 🏆 Rewards & Achievements

Fortschritt wird nicht nur über XP sichtbar.

- Achievements für Meilensteine
- Quest- und Lagerfeuer-Rewards
- sichtbare Reward-Benachrichtigungen
- keine doppelten Achievement-Auslösungen
- lokale Fortschrittslogik ohne Backend-Abhängigkeit im MVP

### 📅 Plan & Aufgaben

- Aufgaben hinzufügen
- eigene Aufgaben erstellen
- Quests in den Plan übernehmen
- Aufgaben verschieben
- Aufgaben erledigen oder wieder öffnen
- Aufgaben entfernen
- interne Scrollfläche für lange Listen
- Navigation bleibt sichtbar

### 👤 Profil & Authentifizierung

- persönlicher Charakterbereich
- XP / Level / Quest Points
- Clerk Sign-in / Sign-up
- eingeloggter Zustand in der Navigation sichtbar
- User Account über Clerk verwaltbar

### ♿ Accessibility & Responsive UX

Der MVP wurde mit Accessibility als Bestandteil der UI-Entwicklung umgesetzt.

- semantische HTML-Strukturen
- Tastaturbedienung zentraler Interaktionen
- sichtbare Focus-States
- verständliche Labels
- Statusmeldungen über zugängliche Live-Regionen
- ausreichende Touch-Ziele
- `prefers-reduced-motion`
- mobile-first Layout
- kein unnötiges Scrollen in den zentralen Flows

---

## 🛠️ Tech Stack

| Technologie | Verwendung |
|---|---|
| **React 19** | UI und Komponentenarchitektur |
| **TypeScript** | Typisierung und Domain-Logik |
| **Vite** | Development Server und Build |
| **TanStack Router** | File-based Routing |
| **Tailwind CSS 4** | Styling |
| **DaisyUI 5** | UI-Komponenten und Theme |
| **Clerk** | Authentifizierung |
| **Vitest** | Unit- und Logiktests |
| **ESLint** | Codequalität |

Die Quest-Daten liegen im MVP bewusst in einer lokalen JSON-Datei. Backend, Datenbank und serverseitige Persistenz gehören zum Post-MVP-Scope.

---

## 📁 Projektstruktur

```text
adventure-bible/
├── src/
│   ├── components/          # Wiederverwendbare UI-Komponenten
│   ├── data/                # Lokale Quest- und HP-Daten
│   ├── features/            # Feature-spezifische Komponenten und Logik
│   │   ├── hpCheck/
│   │   ├── plan/
│   │   ├── profile/
│   │   └── quests/
│   ├── lib/                 # Domain- und Hilfslogik
│   ├── routes/              # TanStack-Router-Routen
│   ├── types/               # TypeScript-Domain-Typen
│   └── main.tsx             # App-Einstiegspunkt
├── tests/                   # Vitest-Tests
├── docs/                    # Produkt-, Design-, Architektur- und Projektdoku
├── skills/                  # Projektspezifische Agentic Skills
├── LayoutIdee.png           # Ursprüngliche Layout-Idee
├── package.json
└── README.md
```

---

## 🚀 Lokale Entwicklung

### Voraussetzungen

- Node.js
- npm
- ein Clerk-Account für die Authentifizierung

### Installation

Repository klonen und Dependencies installieren:

```bash
npm install
```

### Clerk konfigurieren

Die Anwendung verwendet Clerk für Sign-in und Sign-up.

Für eine lokale Entwicklungsumgebung wird eine gültige Clerk Publishable Key-Konfiguration benötigt. Sensible Schlüssel gehören **nicht** ins Repository.

Die Clerk CLI kann für die Projekteinrichtung verwendet werden:

```bash
clerk auth login
clerk init
```

### Development Server starten

```bash
npm run dev
```

Danach ist die Anwendung standardmäßig unter `http://localhost:5173` erreichbar.

---

## 🧪 Tests & Qualitätssicherung

Die wichtigsten Domain- und Feature-Regeln werden mit Vitest getestet.

```bash
npm test
```

Linting:

```bash
npm run lint
```

Production Build:

```bash
npm run build
```

Preview des Production Builds:

```bash
npm run preview
```

Der aktuelle MVP wurde abschließend manuell durch den vollständigen Kern-Flow geprüft – von HP-Check und Quest-Auswahl über Quest-Abschluss und Rewards bis hin zu Mini-HP-Check und Lagerfeuer.

---

## 🧩 Produktprinzipien

Adventure Bible basiert auf einigen bewusst einfachen Prinzipien:

1. **Die App passt sich dem Nutzer an.**
2. **Energie ist eine Ressource.**
3. **Kleine Schritte sind echter Fortschritt.**
4. **Fortschritt zählt, nicht Perfektion.**
5. **Regeneration ist eine legitime Aktivität.**
6. **Der Nutzer bestimmt seinen Weg.**
7. **Bewusstes Nicht-Erledigen ist kein Versagen.**
8. **Verstehen statt Verurteilen.**

Diese Prinzipien beeinflussen sowohl die Produktlogik als auch die UX-Entscheidungen.

---

## 🔐 Authentifizierung & Sicherheit

Clerk übernimmt im MVP die Authentifizierungs-UI. Backend-Autorisierung, serverseitige Persistenz und eine eigene Benutzerdatenbank sind bewusst nicht Bestandteil dieses React-MVPs.

Sensible Konfiguration wird ausschließlich über Umgebungsvariablen bereitgestellt und nicht in den Quellcode oder das Repository geschrieben.

Weitere Sicherheitsentscheidungen sind in [`docs/SECURITY.md`](docs/SECURITY.md) dokumentiert.

---

## 📚 Projektdokumentation

Die ausführliche Projektdokumentation liegt unter `docs/`.

| Dokument | Inhalt |
|---|---|
| [`PROJECT.md`](docs/PROJECT.md) | Produktvision und Grundprinzipien |
| [`FEATURES.md`](docs/FEATURES.md) | MVP, Post-MVP und langfristige Vision |
| [`DESIGN.md`](docs/DESIGN.md) | Design- und UX-Regeln |
| [`ACCESSIBILITY.md`](docs/ACCESSIBILITY.md) | Accessibility-Anforderungen |
| [`ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Technische Architektur |
| [`SECURITY.md`](docs/SECURITY.md) | Sicherheitsregeln |
| [`ROADMAP.md`](docs/ROADMAP.md) | Entwicklungsstand und MVP-Abnahme |
| [`DEVELOPMENT_LOG.md`](docs/DEVELOPMENT_LOG.md) | Entwicklungs- und Lerndokumentation |

---

## 🗺️ MVP & zukünftige Entwicklung

### MVP — 🟢 abgeschlossen

Der zentrale Adventure-Bible-Loop ist implementiert, getestet und manuell durchgespielt.

### Post-MVP

Mögliche nächste Ausbaustufen sind unter anderem:

- Habit-System
- detailliertere Verlaufs- und Statistikfunktionen
- langfristige Mustererkennung
- umfangreicheres Achievement-System
- Inventar und weitere RPG-Elemente
- Journal / Reflexionserweiterungen
- Kalenderintegration
- Voice Input
- KI-Unterstützung
- Backend und serverseitige Persistenz

Diese Funktionen sind bewusst **nicht** Bestandteil des aktuellen MVPs.

---

## 👩‍💻 Projekt

**Adventure Bible** ist ein React-Abschlussprojekt von **Josephine Mundt**.

Das Projekt verbindet Webentwicklung mit dem Ziel, eine ruhige, adaptive und spielerische Alternative zu klassischen To-do- und Habit-Trackern zu entwickeln.

---

## 📄 Lizenz

Für dieses Abschlussprojekt ist aktuell keine separate Open-Source-Lizenz festgelegt.
