# Adventure Bible – Architecture

## Zweck

Dieses Dokument beschreibt die technische Architektur des aktuellen React-MVPs und bereitet die spätere Backend-Erweiterung vor.

Architekturentscheidungen sollen den MVP klein halten, aber keine unnötigen Sackgassen für Backend, Authentifizierung oder Persistenz erzeugen.

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

Beispiel:

```text
src/
├── app/
│   ├── app.tsx
│   ├── router.tsx
│   └── providers.tsx
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
├── app.tsx
└── main.tsx
```

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

DaisyUI-Komponenten können bereits einen Großteil dieser Rolle übernehmen.

## Molecules

Molecules kombinieren mehrere wiederverwendbare UI-Bausteine zu einer kleinen, eigenständigen Einheit.

Beispiele:

- SearchField
- QuestMeta
- FormField
- ProgressSummary

## Organisms

Organisms bilden größere wiederverwendbare UI-Bereiche.

Beispiele:

- QuestCard
- CharacterSummary
- StateOverview
- AppNavigation

## Templates / Pages

Templates und Pages strukturieren den Screen und verbinden Feature-Bereiche.

### Regel

Eine Komponente muss **nicht** zu einem Atomic-Level gezwungen werden.

Wenn eine UI-Einheit ausschließlich innerhalb eines Features verwendet wird, darf sie beim Feature bleiben.

Beispiel:

```text
features/
└── quests/
    └── components/
        └── questRecommendationPanel.tsx
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

Routing soll die Hauptbereiche der App eindeutig abbilden.

MVP-Ziele:

- Home
- Quests
- Plan
- Ich

Profil-Erstellung und andere Onboarding-Schritte dürfen einen eigenen Flow besitzen.

Die Routing-Lösung muss Deep Links und direkte Navigation auf gültige App-Bereiche ermöglichen.

---

# 8. State Management

Für den MVP gilt:

> So wenig globaler State wie möglich.

Lokaler Component State ist zu bevorzugen, wenn Daten nur innerhalb einer Komponente oder eines kleinen Flows benötigt werden.

Gemeinsamer App-State wird nur dort verwendet, wo mehrere unabhängige Bereiche denselben Zustand benötigen.

Keine zusätzliche State-Management-Library ohne konkreten Bedarf.

---

# 9. Domain Models

Produktlogik soll nicht unkontrolliert in UI-Komponenten verteilt werden.

Wichtige Domain-Konzepte sind unter anderem:

- Profile
- Character
- UserState
- Quest
- QuestType
- QuestStatus
- XP / Progress
- PlanItem
- Habit

Typen werden in TypeScript explizit modelliert.

Die konkrete Datenstruktur wird vor Implementierung der jeweiligen Features festgelegt.

---

# 10. Adaptive Logik

Die adaptive Auswahl der Quests gehört zur Anwendungslogik und nicht direkt in die UI-Komponente.

```text
UserState
   ↓
Quest candidates
   ↓
filter / score
   ↓
recommended quest
```

Die Logik muss deterministisch und testbar sein.

Im MVP wird keine KI benötigt.

---

# 11. Datenzugriff im MVP

Der MVP kann mit statischen Mock-Daten oder einer lokalen Datenquelle arbeiten.

Datenzugriff soll hinter klaren Funktionen oder Services liegen, wenn dadurch der spätere Austausch gegen ein Backend einfacher wird.

UI-Komponenten sollen nicht direkt überall auf Rohdaten zugreifen.

---

# 12. Backend-Vorbereitung

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

# 13. Datenbank

Die Datenbank wird erst im Backend-Modul eingeführt.

Der MVP soll daher keine unnötige Datenbankabhängigkeit enthalten.

Bei der späteren Modellierung müssen mindestens berücksichtigt werden:

- User ownership
- eindeutige IDs
- Zeitstempel
- Beziehungen zwischen User, Profile, Character und Quests
- Unicode-fähige Textfelder
- Validierung
- sichere Queries

Datenbankzugriffe dürfen niemals durch String-Konkatenation aus User Input erzeugt werden.

---

# 14. Authentifizierung und Secrets

Clerk wird für die spätere Benutzer-Authentifizierung bevorzugt.

Grundregeln:

- Passwörter werden nicht selbst gespeichert, wenn Clerk die Authentifizierung übernimmt.
- Secrets gehören niemals in den Git-Repository-Code.
- Private API Keys dürfen niemals im Browser-Code landen.
- Öffentliche Client-Konfiguration und geheime Server-Konfiguration müssen getrennt bleiben.
- Authentifizierung und Autorisierung werden getrennt betrachtet.

Siehe `docs/SECURITY.md`.

---

# 15. Unicode und Internationalisierung

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

# 16. Sicherheitsgrenzen

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

# 17. Komponentenregeln

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

# 18. Import- und Abhängigkeitsrichtung

Abhängigkeiten sollen möglichst in eine verständliche Richtung fließen:

```text
app
 ↓
features
 ↓
shared components / lib
```

Ein Feature soll nicht von einem anderen Feature abhängig werden, nur weil dadurch kurzfristig Code eingespart wird.

Wenn zwei Features dieselbe fachliche Logik benötigen, soll die gemeinsame Domänenlogik bewusst extrahiert werden.

Zirkuläre Abhängigkeiten sind zu vermeiden.

---

# 19. Testing Architecture

Tests werden möglichst nahe an der jeweiligen Funktion organisiert.

Zu testen sind insbesondere:

- Domain-/Business-Logik
- adaptive Quest-Auswahl
- Formvalidierung
- zentrale User Flows
- Accessibility-relevantes Verhalten

Tests sollen beobachtbares Verhalten prüfen.

---

# 20. Dependency-Regel

Neue Dependencies werden nur hinzugefügt, wenn:

1. ein konkreter Bedarf besteht,
2. die Dependency zum Projekt passt,
3. sie nicht sinnvoll mit vorhandenen Mitteln ersetzt werden kann,
4. Sicherheits- und Wartungsaspekte vertretbar sind.

Insbesondere werden keine Libraries nur für eine einzelne kleine UI-Aufgabe hinzugefügt.

---

# 21. Architektur-Definition-of-Done

Eine technische Entscheidung gilt erst als abgeschlossen, wenn:

- [ ] sie dokumentiert ist, wenn sie langfristige Auswirkungen hat
- [ ] sie zum aktuellen MVP-Scope passt
- [ ] sie testbar ist
- [ ] Accessibility nicht verschlechtert wird
- [ ] Security-Anforderungen berücksichtigt wurden
- [ ] keine unnötige Dependency eingeführt wurde
- [ ] die spätere Backend-Erweiterung nicht unnötig blockiert wird
- [ ] Naming Conventions eingehalten werden
- [ ] Feature-Grenzen nachvollziehbar bleiben
- [ ] Atomic Design nur dort eingesetzt wird, wo es tatsächlichen Nutzen bringt
