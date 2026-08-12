# Adventure Bible – Architecture

## Zweck

Dieses Dokument beschreibt die technische Architektur des aktuellen React-MVPs und bereitet die spätere Backend-Erweiterung vor.

Architekturentscheidungen sollen den MVP klein halten, aber keine unnötigen Sackgassen für Backend, Authentifizierung oder Persistenz erzeugen.

Architekturprinzipien sollen praktisch bleiben und keine künstliche Komplexität erzeugen.

---

# 1. Aktueller Stack

## Frontend

- React
- TypeScript
- Vite
- DaisyUI
- Tailwind CSS

## Testing

- Vitest
- React Testing Library

Die tatsächlich installierten Versionen und Scripts in `package.json` sind maßgeblich.

---

# 2. Architekturprinzipien

Die Architektur folgt diesen Grundsätzen:

1. **Feature-oriented first** – Code wird primär nach fachlichen Features organisiert.
2. **Single Responsibility** – Dateien und Komponenten haben eine klar erkennbare Verantwortung.
3. **Explicit dependencies** – Abhängigkeiten zwischen Bereichen sollen nachvollziehbar sein.
4. **Local state first** – State bleibt so lokal wie möglich.
5. **Reusable only when useful** – Wiederverwendung entsteht aus tatsächlichem Bedarf, nicht aus abstrakter Vorplanung.
6. **UI ≠ Business Logic** – fachliche Logik wird nicht unnötig in UI-Komponenten eingebettet.
7. **Small changes** – Änderungen bleiben möglichst klein und überprüfbar.
8. **No architecture theatre** – Ordner, Patterns und Abstraktionen werden nicht nur eingesetzt, um professionell auszusehen.

---

# 3. MVP-Architektur

Der MVP ist zunächst eine Frontend-Anwendung.

```text
UI
↓
Pages / Routes
↓
Feature Components
↓
Application Logic
↓
Domain Models / Utilities
↓
Mock / Local Data
```

Die Architektur soll keine Backend-Schicht simulieren, die aktuell noch nicht benötigt wird.

---

# 4. Feature-orientierte Struktur

Die Anwendung wird bevorzugt nach Features organisiert und nicht ausschließlich nach technischen Dateitypen.

```text
src/
├── app/
│   ├── appShell.tsx
│   └── providers.tsx
├── routes/
│   ├── __root.tsx
│   ├── index.tsx
│   ├── quests.tsx
│   ├── plan.tsx
│   └── profile.tsx
├── components/
│   ├── ui/
│   └── layout/
├── features/
│   ├── profile/
│   ├── character/
│   ├── state/
│   ├── quests/
│   ├── progress/
│   └── plan/
├── data/
├── lib/
├── types/
├── assets/
├── App.tsx
└── main.tsx
```

### Routing boundary

TanStack Router wird im MVP mit **File-Based Routing** verwendet. Die Route-Definitionen liegen deshalb unter `src/routes/`.

`src/app/` enthält Application-Infrastruktur wie die App-Shell und Provider. `src/routes/` enthält ausschließlich die Zuordnung und Struktur der navigierbaren Screens und Flows.

Diese Trennung hält die Routing-Struktur einheitlich und ermöglicht später auch verschachtelte bzw. nicht in der Hauptnavigation sichtbare Routen, ohne die Application-Infrastruktur mit Route-Definitionen zu vermischen.

Nicht in der Hauptnavigation sichtbare Routen sind keine Sicherheitsgrenze. Zugriffsschutz wird bei Bedarf über Authentifizierung und serverseitige Autorisierung umgesetzt.

Die konkrete Struktur darf während der Implementierung angepasst werden, wenn der Code dadurch klarer wird.

Keine künstliche Ordnerstruktur nur um eine Regel zu erfüllen.

### Feature-Grenzen

Ein Feature darf seine eigenen fachlichen Komponenten, Hooks, Services, Tests und Typen enthalten, wenn diese nur für dieses Feature relevant sind.

Beispiel:

```text
features/
└── quests/
    ├── components/
    ├── hooks/
    ├── services/
    ├── quests.types.ts
    ├── questCard.tsx
    └── quests.test.ts
```

Feature-Code soll nicht unnötig in globale Ordner verschoben werden.

Wenn ein Baustein tatsächlich von mehreren unabhängigen Features benötigt wird, kann er in einen Shared-Bereich verschoben werden.

---

# 5. Naming Conventions

Einheitliche Benennung ist verbindlich.

## Dateien und Ordner

Adventure Bible verwendet für Datei- und Ordnernamen grundsätzlich **camelCase**.

Beispiele:

```text
questCard.tsx
questList.tsx
useQuestState.ts
questService.ts
userState.ts
apiClient.ts
```

Nicht verwenden:

```text
QuestCard.tsx
quest-card.tsx
quest_card.tsx
```

Ausnahmen sind Dateien, deren Name durch ein Framework, Tool oder eine bestehende Konvention vorgegeben ist, zum Beispiel:

```text
AGENTS.md
README.md
vite.config.ts
eslint.config.js
main.tsx
```

Dokumentationsdateien unter `docs/` verwenden die bereits etablierte **UPPERCASE.md**-Konvention.

## React-Komponenten

Auch wenn die Datei camelCase heißt, werden React-Komponenten selbst in **PascalCase** benannt.

Beispiel:

```tsx
// questCard.tsx
export function QuestCard() {
  return ...
}
```

Dateiname und Exportname müssen nicht identisch geschrieben sein.

## Variablen und Funktionen

- `camelCase`
- aussagekräftige Namen
- keine unnötigen Abkürzungen

Beispiel:

```ts
const currentQuest = ...
const recommendedQuest = ...
function completeQuest() {}
```

## Typen und Interfaces

Typen und Interfaces verwenden **PascalCase**.

Beispiel:

```ts
type Quest = ...
interface UserState = ...
```

## Konstanten

Normale Konstanten verwenden `camelCase`.

Globale unveränderliche Konfigurationswerte dürfen `UPPER_SNAKE_CASE` verwenden, wenn dies die Lesbarkeit verbessert.

---

# 6. Atomic Design – sinnvoll eingesetzt

Adventure Bible darf das Atomic Design Pattern verwenden, aber **nicht dogmatisch**.

Atomic Design ist ein Werkzeug zur Strukturierung wiederverwendbarer UI-Bausteine, kein Grund, jede kleine Komponente künstlich in Atom, Molekül oder Organismus einzuteilen.

## Atoms

Atoms sind kleine, allgemein wiederverwendbare UI-Bausteine.

Beispiele:

- Button
- Icon Button
- Badge
- Input
- Progress Indicator
- Slider

DaisyUI-Komponenten können bereits einen Großteil dieser Rolle übernehmen.

## Molecules

Molecules kombinieren mehrere wiederverwendbare UI-Bausteine zu einer kleinen, eigenständigen Einheit.

Beispiele:

- SearchField
- QuestMeta
- FormField
- ProgressSummary
- HpSlider

## Organisms

Organisms bilden größere wiederverwendbare UI-Bereiche.

Beispiele:

- QuestCard
- CharacterSummary
- StateOverview
- AppNavigation
- HpCheckSection

## Templates / Pages

Templates und Pages strukturieren den Screen und verbinden Feature-Bereiche.

### Regel

Eine Komponente muss **nicht** zu einem Atomic-Level gezwungen werden.

Wenn eine UI-Einheit ausschließlich innerhalb eines Features verwendet wird, darf sie beim Feature bleiben.

Beispiel:

```text
features/
└── state/
    └── components/
        └── hpCheckQuestionGroup.tsx
```

Erst bei tatsächlichem Wiederverwendungsbedarf wird geprüft, ob eine Extraktion in einen Shared-/Atomic-Bereich sinnvoll ist.

### Verbotene Überabstraktion

Nicht erwünscht:

```text
components/
├── atom/
├── molecule/
├── organism/
├── template/
├── primitive/
└── compound/
```

wenn diese Struktur keinen realen Wiederverwendungsbedarf löst.

---

# 7. Routing

Routing bildet die Hauptbereiche der App eindeutig ab.

MVP-Ziele:

- Home
- Quests
- Plan
- Ich

Profil-Erstellung und andere Onboarding-Schritte dürfen einen eigenen Flow besitzen.

Der HP-Check ist **kein eigener Hauptnavigation-Punkt**. Er ist Teil des Home-/Quest-Flows.

Die Routing-Lösung muss Deep Links und direkte Navigation auf gültige App-Bereiche ermöglichen.

Nicht in der Hauptnavigation sichtbare Routen dürfen für interne Flows verwendet werden, wenn sie die Produktstruktur vereinfachen und keine unnötige Navigationsebene erzeugen.

Diese Sichtbarkeitseigenschaft ersetzt keine Authentifizierung oder Autorisierung.

---

# 8. State Management

Für den MVP gilt:

> So wenig globaler State wie möglich.

Lokaler Component State ist zu bevorzugen, wenn Daten nur innerhalb einer Komponente oder eines kleinen Flows benötigt werden.

Gemeinsamer App-State wird nur dort verwendet, wo mehrere unabhängige Bereiche denselben Zustand benötigen.

Keine zusätzliche State-Management-Library ohne konkreten Bedarf.

Der zentrale Adventure-Bible-Flow ist ein expliziter UI-/Domain-Zustand:

```text
idle
  ↓
largeHpCheck
  ↓
questSelection
  ↓
questActive
  ↓
questComplete
  ↓
reward
  ↓
miniHpCheck
  ├── newQuest → questSelection
  └── campfire → resting
```

Diese Zustände sollen nicht ausschließlich aus zufälligen Boolean-Kombinationen zusammengesetzt werden, wenn dadurch ungültige Zustände möglich werden.

---

# 9. Domain Models

Produktlogik soll nicht unkontrolliert in UI-Komponenten verteilt werden.

Wichtige Domain-Konzepte sind unter anderem:

- Profile
- Character
- HpArea
- HpQuestion
- HpAnswer
- HpState
- Quest
- QuestType
- QuestStatus
- QuestReward
- XP / Progress
- PlanItem
- Habit

### HP-Domain

Der große HP-Check basiert auf:

```text
HpArea
  └── 3 HpQuestions
        └── 5 possible answers
```

Die Berechnungslogik für Bereichswerte und Gesamt-HP gehört in testbare Domain-/Application-Logik und nicht in die React-Komponente.

Der Mini HP-Check verwendet pro Bereich einen selbst eingeschätzten Slider-Wert.

Großer Check und Mini Check sind daher zwei unterschiedliche Eingabemodelle, die auf dasselbe HP-Domainmodell wirken können.

---

# 10. Adaptive Logik

Die adaptive Auswahl der Quests gehört zur Anwendungslogik und nicht direkt in die UI-Komponente.

```text
UserState / HpState
       ↓
Quest candidates
       ↓
filter / score
       ↓
recommended quests
```

Die Logik muss deterministisch und testbar sein.

Im MVP wird keine KI benötigt.

HP-Werte dürfen Empfehlungen beeinflussen, aber nicht als harte moralische oder technische Zugangssperre missbraucht werden.

---

# 11. HP-Berechnung

Die Berechnung des großen HP-Checks wird als reine, testbare Funktion modelliert, sobald die genaue Gewichtung festgelegt wurde.

Sie soll mindestens:

1. Antworten des großen Checks entgegennehmen,
2. pro HP-Bereich einen nachvollziehbaren Wert berechnen,
3. daraus einen Gesamtzustand ableiten.

Die Berechnung muss deterministisch sein.

Die konkrete Formel wird als eigene Entscheidung dokumentiert, bevor sie als Produktlogik implementiert wird.

Der Mini HP-Check verändert den Zustand auf Grundlage der subjektiven Slider-Werte und kann später zusätzlich für Verlauf und Mustererkennung verwendet werden.

---

# 12. Datenzugriff im MVP

Der MVP kann mit statischen Mock-Daten oder einer lokalen Datenquelle arbeiten.

Datenzugriff soll hinter klaren Funktionen oder Services liegen, wenn dadurch der spätere Austausch gegen ein Backend einfacher wird.

UI-Komponenten sollen nicht direkt überall auf Rohdaten zugreifen.

---

# 13. Backend-Vorbereitung

Nach dem React-Modul ist eine Backend-Erweiterung vorgesehen.

Geplante langfristige Struktur:

```text
React Client
    ↓
API / Backend
    ↓
Database
```

Authentifizierung:

```text
React Client
    ↕
Clerk
    ↓
Backend authorization
```

Clerk ist als vorgesehene Authentifizierungslösung dokumentiert.

Die Anwendung darf später nicht allein auf clientseitige Authentifizierung vertrauen. Backend-Endpunkte müssen Berechtigungen serverseitig prüfen.

---

# 14. Datenbank

Die Datenbank wird erst im Backend-Modul eingeführt.

Der MVP soll daher keine unnötige Datenbankabhängigkeit enthalten.

Bei der späteren Modellierung müssen mindestens berücksichtigt werden:

- User ownership
- eindeutige IDs
- Zeitstempel
- Beziehungen zwischen User, Profile, Character und Quests
- HP-Checks und deren Zeitpunkte
- Ergebnisse der großen HP-Checks
- Ergebnisse der Mini HP-Checks
- Quest-Auswirkungen auf den Zustand
- Unicode-fähige Textfelder
- Validierung
- sichere Queries

Datenbankzugriffe dürfen niemals durch String-Konkatenation aus User Input erzeugt werden.

---

# 15. Authentifizierung und Secrets

Clerk wird für die spätere Benutzer-Authentifizierung bevorzugt.

Grundregeln:

- Passwörter werden nicht selbst gespeichert, wenn Clerk die Authentifizierung übernimmt.
- Secrets gehören niemals in den Git-Repository-Code.
- Private API Keys dürfen niemals im Browser-Code landen.
- Öffentliche Client-Konfiguration und geheime Server-Konfiguration müssen getrennt bleiben.
- Authentifizierung und Autorisierung werden getrennt betrachtet.

Siehe `docs/SECURITY.md`.

---

# 16. Unicode und Internationalisierung

Alle Texte werden als Unicode behandelt.

Keine unnötigen ASCII-only-Regeln.

User-generated Content kann unter anderem enthalten:

- Umlaute
- Akzente
- Sonderzeichen
- Emojis
- nicht-lateinische Schriftsysteme

Mehrsprachigkeit ist nicht Bestandteil des aktuellen MVP, die Architektur darf sie aber nicht unnötig verhindern.

Spätere Internationalisierung soll über Locale-aware Lösungen erfolgen und nicht durch manuell zusammengesetzte Datums-, Zahlen- oder Währungsformate.

---

# 17. Sicherheitsgrenzen

Frontend-Eingaben sind grundsätzlich untrusted.

Validierung im Frontend verbessert UX, ersetzt aber niemals serverseitige Validierung.

Bei späterem Backend:

- Authentifizierung prüfen
- Autorisierung prüfen
- Input validieren
- Datenbankzugriffe parametrisieren
- Output sicher behandeln
- Fehler nicht mit sensiblen Informationen an den Client geben

---

# 18. Komponentenregeln

Komponenten sollen eine klare Verantwortung besitzen.

Bevorzugt:

```text
Page
 ↓
Feature component
 ↓
Presentational / shared component
```

Nicht bevorzugt:

```text
Eine riesige App-Komponente,
die Routing, State, Daten, Logik und komplettes UI enthält.
```

Wiederverwendbare UI-Grundbausteine können unter `components/ui/` liegen.

Shared Layout-Komponenten können unter `components/layout/` liegen.

Feature-spezifische Komponenten bleiben beim jeweiligen Feature.

---

# 19. Import- und Abhängigkeitsrichtung

Abhängigkeiten sollen möglichst in eine verständliche Richtung fließen:

```text
app
 ↓
routes
 ↓
features
 ↓
shared components / lib
```

Ein Feature soll nicht von einem anderen Feature abhängig werden, nur weil dadurch kurzfristig Code eingespart wird.

Wenn zwei Features dieselbe fachliche Logik benötigen, soll die gemeinsame Domänenlogik bewusst extrahiert werden.

Zirkuläre Abhängigkeiten sind zu vermeiden.

---

# 20. Testing Architecture

Tests werden möglichst nahe an der zu testenden Funktionalität organisiert.

Reine Domain- und Application-Logik wird bevorzugt mit Unit-Tests geprüft.

React-Komponenten und Nutzerflüsse werden mit React Testing Library und Vitest auf beobachtbares Verhalten getestet.

Tests sollen unabhängig voneinander ausführbar sein und keine Reihenfolge voraussetzen.

---

# 21. Responsive und Mobile-first

Die Anwendung wird mobile-first entwickelt.

Die UI muss auf kleinen Bildschirmen vollständig nutzbar sein.

Desktop nutzt den zusätzlichen Platz, ohne die App in eine klassische Website umzuwandeln.

Layouts sollen möglichst mit responsiven CSS-/Tailwind-Regeln statt mit geräteabhängigen Sonderlogiken umgesetzt werden.

---

# 22. Erweiterbarkeit

Die MVP-Architektur soll spätere Erweiterungen ermöglichen, ohne sie vorwegzunehmen.

Insbesondere sollen spätere Backend-, Authentifizierungs- und Persistenzschichten eingeführt werden können, ohne dass die fachliche Logik vollständig aus den Features herausgelöst oder neu geschrieben werden muss.

Gleichzeitig werden keine Abstraktionen nur für hypothetische zukünftige Anforderungen angelegt.
