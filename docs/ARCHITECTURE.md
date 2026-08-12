# Adventure Bible – Architecture

## Zweck

Dieses Dokument beschreibt die technische Architektur von Adventure Bible und legt fest, wie die verschiedenen Bereiche des Frontends zusammenarbeiten.

Die Architektur soll:

- die aktuelle React-Anwendung klar und nachvollziehbar strukturieren,
- feature-orientierte Entwicklung ermöglichen,
- TanStack Router sauber von der Application-Struktur trennen,
- Atomic Design dort einsetzen, wo es echten Wiederverwendungsbedarf gibt,
- die spätere Backend-, Authentifizierungs- und Datenbank-Erweiterung nicht unnötig erschweren.

Architekturentscheidungen sollen praktisch bleiben. Ordner, Patterns und Abstraktionen werden nicht nur eingesetzt, um professionell auszusehen.

---

# 1. Aktueller Stack

Der aktuell verwendete Stack wird durch `package.json` bestimmt.

Aktuell relevant:

- React
- TypeScript
- Vite
- TanStack Router
- TanStack Router Vite Plugin
- DaisyUI
- Tailwind CSS

Spätere Module können weitere Technologien ergänzen. Dokumentation darf eine Technologie nicht als bereits implementiert darstellen, wenn sie nur geplant ist.

---

# 2. Architekturprinzipien

Adventure Bible folgt diesen Grundsätzen:

1. **Feature-oriented first** – fachliche Entwicklung wird primär nach Features organisiert.
2. **Single Responsibility** – Dateien und Komponenten haben eine klar erkennbare Verantwortung.
3. **Explicit dependencies** – Abhängigkeiten zwischen Bereichen sollen nachvollziehbar sein.
4. **Local state first** – State bleibt so lokal wie möglich.
5. **Reusable only when useful** – Wiederverwendung entsteht aus tatsächlichem Bedarf.
6. **UI ≠ Business Logic** – fachliche Logik wird nicht unnötig in UI-Komponenten eingebettet.
7. **Small changes** – Änderungen bleiben möglichst klein und überprüfbar.
8. **Generated code is not application code** – generierte Dateien werden nicht manuell bearbeitet.
9. **No architecture theatre** – keine künstliche Komplexität nur für eine vermeintlich professionelle Struktur.

---

# 3. Aktuelle `src/`-Struktur

Die aktuelle Frontend-Struktur ist bewusst in Application-, Routing-, Feature-, Shared- und technische Bereiche getrennt:

```text
src/
├── app/
│   └── appShell.tsx
├── components/
│   ├── layout/
│   └── ui/
├── data/
├── features/
├── lib/
├── routes/
│   ├── __root.tsx
│   └── index.tsx
├── types/
├── assets/
├── App.tsx
├── App.css
├── index.css
├── main.tsx
└── routeTree.gen.ts
```

Die Verzeichnisse `components`, `data`, `features`, `lib` und `types` dürfen zunächst leer sein. Ein Verzeichnis wird nicht nur deshalb mit künstlichen Dateien gefüllt, damit es im Git-Repository sichtbar ist.

`routeTree.gen.ts` ist eine Ausnahme: Die Datei wird durch TanStack Router generiert und gehört nicht zur handgeschriebenen Architektur.

---

# 4. Verantwortlichkeiten der Bereiche

## `src/main.tsx` – technischer Einstiegspunkt

`main.tsx` ist der Vite-/React-Einstiegspunkt der Anwendung.

Seine Aufgabe ist es, die React-Anwendung in das HTML-Dokument einzuhängen und den App-Einstieg zu starten.

`main.tsx` enthält keine fachliche Feature-Logik.

## `src/App.tsx` – Router-Einstieg

`App.tsx` stellt den TanStack Router über den `RouterProvider` bereit.

Der aktuelle Aufbau folgt grundsätzlich:

```text
main.tsx
    ↓
App.tsx
    ↓
RouterProvider
    ↓
routeTree
```

`App.tsx` ist **nicht** für das globale Seitenlayout zuständig.

Die `AppShell` wird deshalb nicht in `App.tsx` eingebettet.

## `src/app/` – Application-Ebene

`app/` enthält anwendungsweite Infrastruktur und Zusammensetzung.

Beispiele:

- `appShell.tsx`
- spätere globale Provider
- globale Application-Konfiguration

Die Application-Ebene ist nicht dasselbe wie ein UI-Component-Ordner.

## `src/routes/` – Routing-Ebene

`routes/` enthält die TanStack-File-Based-Routes.

Beispiele:

```text
routes/
├── __root.tsx
├── index.tsx
├── quests.tsx
├── plan.tsx
└── profile.tsx
```

Routen beschreiben navigierbare Screens und Flows. Sie sind nicht der Ort für beliebige globale UI-Komponenten.

### Root Route und AppShell

`__root.tsx` ist die Root-Route des TanStack Routers.

Die Root-Route ist die richtige Stelle, um die globale `AppShell` mit dem Router-Outlet zu verbinden:

```text
App.tsx
└── RouterProvider
    └── __root.tsx
        └── AppShell
            └── Outlet
                └── aktive Route
```

Dadurch bleibt `App.tsx` ein schlanker Router-Einstiegspunkt und die Application-Shell bleibt unter `src/app/`.

Die Root-Route darf globale Layout-Struktur bereitstellen, soll aber keine fachliche Feature-Logik enthalten.

### Nicht sichtbare Routen

Nicht in der Hauptnavigation sichtbare Routen sind möglich, wenn sie interne Flows vereinfachen.

Beispiele können später Onboarding-, Detail-, Modal- oder andere interne Flows sein.

Ein nicht sichtbarer oder schwer auffindbarer Pfad ist **keine Sicherheitsgrenze**. Zugriffsschutz erfolgt später über Authentifizierung und serverseitige Autorisierung.

## `src/features/` – fachliche Features

`features/` ist der wichtigste Bereich für die eigentliche Produktlogik.

Beispielsweise:

```text
features/
├── hpCheck/
├── quests/
├── progress/
├── plan/
└── profile/
```

Ein Feature darf seine eigenen Komponenten, Hooks, Services, Tests und Typen enthalten, wenn diese nur für dieses Feature relevant sind.

Beispiel:

```text
features/
└── hpCheck/
    ├── components/
    ├── hooks/
    ├── services/
    ├── hpCheck.types.ts
    └── hpCheck.test.ts
```

Feature-Code wird nicht ohne Grund in globale Ordner verschoben.

## `src/components/` – Shared UI

`components/` enthält UI-Bausteine, die tatsächlich von mehreren Bereichen oder Features wiederverwendet werden.

Aktuelle Unterteilung:

```text
components/
├── layout/
└── ui/
```

`components/ui/` ist für wiederverwendbare UI-Primitives bzw. kleine gemeinsame Bausteine gedacht.

`components/layout/` ist für wiederverwendbare Layout-Bausteine gedacht, die nicht ausschließlich zur Application-Infrastruktur gehören.

Feature-spezifische Komponenten bleiben dagegen im jeweiligen Feature.

## `src/data/` – Datenquellen

`data/` enthält statische oder lokale Datenquellen des MVPs.

Später können hier klar definierte Datenzugriffe liegen, wenn dies für den Übergang zum Backend sinnvoll ist.

UI-Komponenten sollen nicht überall direkt auf Rohdaten zugreifen.

## `src/lib/` – technische Hilfsfunktionen

`lib/` enthält technische, fachlich möglichst neutrale Utilities und Infrastruktur-Helfer.

Beispiele:

- Formatierung
- technische Helper
- API-Client-Helfer
- Validierungs-Utilities, sofern sie nicht eindeutig zu einem Feature gehören

Feature-spezifische Logik gehört nicht automatisch nach `lib/`.

## `src/types/` – geteilte Typen

`types/` ist für Typen gedacht, die tatsächlich von mehreren unabhängigen Bereichen benötigt werden.

Feature-spezifische Typen gehören bevorzugt in das jeweilige Feature.

Ein globaler Typ-Ordner darf nicht zu einem Ablageort für jeden beliebigen Typ werden.

## `src/assets/` – statische Frontend-Assets

`assets/` enthält lokal eingebundene Bilder und andere statische Assets, die Bestandteil des Frontends sind.

## `App.css` und `index.css`

`index.css` enthält globale Styles bzw. globale Tailwind-/DaisyUI-Einbindungen.

`App.css` darf app-spezifische Styles enthalten, sofern diese nicht besser global oder featurebezogen aufgehoben sind.

---

# 5. Feature-orientierte Entwicklung

Adventure Bible wird fachlich feature-orientiert entwickelt.

Die Hauptregel lautet:

> Fachliche Verantwortung bleibt möglichst zusammen, technische Wiederverwendung wird erst bei tatsächlichem Bedarf herausgezogen.

Beispiel:

```text
features/
└── quests/
    ├── components/
    ├── hooks/
    ├── services/
    ├── quests.types.ts
    └── questCard.tsx
```

Eine Quest-Komponente, die ausschließlich im Quest-Feature verwendet wird, gehört nicht automatisch nach `components/`.

Wenn mehrere unabhängige Features denselben Baustein benötigen, kann eine bewusste Extraktion nach `components/`, `lib/` oder `types/` sinnvoll sein.

---

# 6. Atomic Design – sinnvoll eingesetzt

Atomic Design wird in Adventure Bible **pragmatisch** verwendet.

Es ist ein Werkzeug zur Strukturierung wiederverwendbarer UI-Bausteine und keine Pflicht, jede Komponente künstlich einer Kategorie zuzuordnen.

## Atoms

Kleine, allgemein wiederverwendbare UI-Bausteine.

Beispiele:

- Button
- Icon Button
- Badge
- Input
- Progress Indicator
- Slider

DaisyUI kann bereits viele dieser Rollen übernehmen.

## Molecules

Kleine Kombinationen wiederverwendbarer Bausteine.

Beispiele:

- FormField
- SearchField
- QuestMeta
- ProgressSummary
- HpSlider

## Organisms

Größere, eigenständige UI-Bereiche.

Beispiele:

- QuestCard
- CharacterSummary
- StateOverview
- AppNavigation
- HpCheckSection

## Feature-Komponenten

Eine Komponente muss nicht in `components/ui/` verschoben werden, nur weil sie technisch wiederverwendbar sein könnte.

Wenn eine Komponente ausschließlich zum HP-Check gehört, darf sie beispielsweise hier bleiben:

```text
features/
└── hpCheck/
    └── components/
        └── hpCheckQuestionGroup.tsx
```

Erst tatsächlicher Wiederverwendungsbedarf rechtfertigt eine Shared-Komponente.

### Verbotene Überabstraktion

Nicht erwünscht ist eine künstliche Struktur wie:

```text
components/
├── atom/
├── molecule/
├── organism/
├── template/
└── primitive/
```

wenn diese Unterteilung keinen realen Bedarf löst.

---

# 7. Naming Conventions

Einheitliche Benennung ist verbindlich.

## Dateien und Ordner

Grundsätzlich verwendet Adventure Bible **camelCase** für selbst benannte Dateien und Ordner.

Beispiele:

```text
questCard.tsx
questList.tsx
useQuestState.ts
questService.ts
appShell.tsx
apiClient.ts
```

Nicht verwenden:

```text
QuestCard.tsx
quest-card.tsx
quest_card.tsx
```

### Framework- und Tool-Ausnahmen

Dateien, deren Namen durch Frameworks, Tools oder etablierte Projektkonventionen vorgegeben sind, behalten diese Namen.

Beispiele:

```text
AGENTS.md
README.md
vite.config.ts
eslint.config.js
main.tsx
App.tsx
```

TanStack-Route-Dateien wie `__root.tsx` und `index.tsx` folgen ebenfalls der vom Routing-System vorgegebenen Konvention.

Dokumentationsdateien unter `docs/` verwenden die etablierte `UPPERCASE.md`-Konvention.

## React-Komponenten

React-Komponenten selbst werden in **PascalCase** benannt.

Beispiel:

```tsx
// questCard.tsx
export function QuestCard() {
  return ...
}
```

## Variablen und Funktionen

- `camelCase`
- aussagekräftige Namen
- keine unnötigen Abkürzungen

## Typen und Interfaces

Typen und Interfaces verwenden **PascalCase**.

Beispiel:

```ts
type Quest = ...
interface UserState { ... }
```

---

# 8. Routing und Navigation

Die Hauptbereiche der App werden über TanStack File-Based Routing abgebildet.

Geplante Hauptnavigation:

- Home
- Quests
- Plan
- Ich

Der HP-Check ist kein eigener Hauptnavigation-Punkt. Er ist Bestandteil des Home-/Quest-Flows.

Die Routing-Struktur soll Deep Links und direkte Navigation auf gültige App-Bereiche ermöglichen.

Nicht sichtbare interne Routen sind möglich, ersetzen aber keine Authentifizierung oder Autorisierung.

---

# 9. Generierter Route Tree

`src/routeTree.gen.ts` wird automatisch durch das TanStack Router Vite Plugin erzeugt.

Die Datei ist **generated code**.

Regeln:

- nicht manuell bearbeiten,
- nicht als Ort für eigene Logik verwenden,
- Änderungen ausschließlich über die Route-Dateien und die TanStack-Konfiguration herbeiführen.

Der Datenfluss lautet:

```text
src/routes/*.tsx
        ↓
TanStack Router Vite Plugin
        ↓
src/routeTree.gen.ts
        ↓
App.tsx → createRouter({ routeTree })
```

Wenn der generierte Route Tree fehlerhaft ist, wird die Ursache in den Route-Dateien oder der Router-Konfiguration gesucht und nicht durch manuelle Änderungen an `routeTree.gen.ts` behoben.

---

# 10. State Management

Für den MVP gilt:

> So wenig globaler State wie möglich.

Lokaler Component State ist zu bevorzugen, wenn Daten nur innerhalb einer Komponente oder eines kleinen Flows benötigt werden.

Gemeinsamer App-State wird nur verwendet, wenn mehrere unabhängige Bereiche denselben Zustand benötigen.

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

Diese Zustände sollen nicht unnötig aus voneinander unabhängigen Booleans zusammengesetzt werden, wenn dadurch ungültige Kombinationen möglich werden.

---

# 11. Domain Models

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

## HP-Domain

Der große HP-Check basiert auf:

```text
HpArea
  └── 3 HpQuestions
        └── 5 possible answers
```

Die Berechnung der Bereichswerte und des Gesamtzustands gehört in testbare Domain-/Application-Logik und nicht in eine React-Komponente.

Der Mini HP-Check verwendet pro Bereich einen selbst eingeschätzten Slider-Wert.

Großer Check und Mini Check sind damit zwei unterschiedliche Eingabemodelle, die auf dasselbe HP-Domainmodell wirken können.

---

# 12. Adaptive Logik

Die adaptive Auswahl von Quests gehört zur Application-/Feature-Logik und nicht direkt in die UI-Komponente.

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

# 13. HP-Berechnung

Die Berechnung des großen HP-Checks wird als reine, testbare Funktion modelliert, sobald die genaue Gewichtung festgelegt wurde.

Sie soll mindestens:

1. Antworten des großen Checks entgegennehmen,
2. pro HP-Bereich einen nachvollziehbaren Wert berechnen,
3. daraus einen Gesamtzustand ableiten.

Die Berechnung muss deterministisch sein.

Die konkrete Formel wird als eigene Produktentscheidung dokumentiert, bevor sie als Produktlogik implementiert wird.

Der Mini HP-Check verändert den Zustand auf Grundlage der subjektiven Slider-Werte und kann später zusätzlich für Verlauf und Mustererkennung verwendet werden.

---

# 14. Datenzugriff im MVP

Der MVP kann mit statischen Mock-Daten oder einer lokalen Datenquelle arbeiten.

Datenzugriff soll hinter klaren Funktionen oder Services liegen, wenn dadurch der spätere Austausch gegen ein Backend einfacher wird.

UI-Komponenten sollen nicht überall direkt auf Rohdaten zugreifen.

---

# 15. Backend-Vorbereitung

Nach dem React-Modul ist eine Backend-Erweiterung vorgesehen.

Langfristige Struktur:

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

# 16. Datenbank

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

# 17. Authentifizierung und Secrets

Clerk wird für die spätere Benutzer-Authentifizierung bevorzugt.

Grundregeln:

- Passwörter werden nicht selbst gespeichert, wenn Clerk die Authentifizierung übernimmt.
- Secrets gehören niemals in den Git-Repository-Code.
- Private API Keys dürfen niemals im Browser-Code landen.
- Öffentliche Client-Konfiguration und geheime Server-Konfiguration müssen getrennt bleiben.
- Authentifizierung und Autorisierung werden getrennt betrachtet.

Siehe `docs/SECURITY.md`.

---

# 18. Unicode und Internationalisierung

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

# 19. Sicherheitsgrenzen

Frontend-Eingaben sind grundsätzlich untrusted.

Validierung im Frontend verbessert UX, ersetzt aber niemals serverseitige Validierung.

Bei späterem Backend:

- Authentifizierung prüfen
- Autorisierung prüfen
- Input validieren
- Datenbankzugriffe parametrisieren
- Output sicher behandeln
- Fehler nicht mit sensiblen Informationen an den Client geben

Details gehören in `docs/SECURITY.md`.

---

# 20. Abhängigkeitsrichtung

Die Abhängigkeiten sollen möglichst in eine nachvollziehbare Richtung laufen:

```text
Routes / Screens
      ↓
Features
      ↓
Domain / Application Logic
      ↓
Shared technical utilities
      ↓
Data / API boundary
```

Dabei gilt:

- Ein Feature darf Shared-Bausteine verwenden.
- Shared-Bausteine dürfen nicht von einem einzelnen Feature abhängen.
- Routing soll keine fachliche Domain-Logik besitzen.
- `App.tsx` soll keine Feature-Logik besitzen.
- Generierter Code wird nicht als Abhängigkeitsziel für eigene Logik verwendet.

Die konkrete Abhängigkeitsrichtung darf angepasst werden, wenn eine begründete Architekturentscheidung dokumentiert wird.

---

# 21. Testbarkeit

Fachliche Berechnungen und adaptive Entscheidungslogik müssen unabhängig von React testbar sein.

Besonders wichtig sind:

- HP-Berechnung
- Quest-Empfehlungslogik
- Zustandsübergänge
- Validierung
- spätere Datenzugriffslogik

Die konkret verwendeten Testwerkzeuge werden durch die tatsächlich installierten Dependencies bestimmt und in der Entwicklungsdokumentation nachvollziehbar gehalten.

---

# 22. Architekturentscheidungen dokumentieren

Wenn eine Entscheidung die Struktur des Projekts dauerhaft beeinflusst, soll sie nachvollziehbar dokumentiert werden.

Besonders relevante Entscheidungen sind:

- neue Architektur-Layer
- neue globale Dependencies
- Änderung der Routing-Struktur
- Einführung globalen States
- Extraktion von Feature-Code in Shared-Code
- neue Backend-Schnittstellen
- Änderungen an Authentifizierung oder Datenzugriff

Kleine Implementierungsentscheidungen müssen nicht künstlich dokumentiert werden.

---

# 23. Praktische Leitlinie

Bei jeder neuen Datei sollen zunächst diese Fragen beantwortet werden:

1. **Welche fachliche Verantwortung hat sie?**
2. **Gehört sie zu einem konkreten Feature?**
3. **Ist sie tatsächlich über mehrere Features wiederverwendbar?**
4. **Ist sie Application-Infrastruktur?**
5. **Ist sie Routing?**
6. **Ist sie ein technischer Helper oder eine Datenquelle?**
7. **Ist ihr Name mit den Naming Conventions vereinbar?**
8. **Erzeugt das Atomic Pattern hier echten Mehrwert?**

Wenn keine klare Antwort existiert, wird nicht automatisch ein neuer Ordner oder eine neue Abstraktion angelegt.

---

# 24. Zielbild

Die langfristige Architektur soll folgende Trennung erhalten:

```text
                        ┌─────────────────────┐
                        │      main.tsx       │
                        └──────────┬──────────┘
                                   ↓
                        ┌─────────────────────┐
                        │       App.tsx       │
                        │   RouterProvider    │
                        └──────────┬──────────┘
                                   ↓
                        ┌─────────────────────┐
                        │     __root.tsx      │
                        │     AppShell        │
                        └──────────┬──────────┘
                                   ↓
                              ┌────────┐
                              │ Outlet │
                              └───┬────┘
                                  ↓
                         ┌──────────────────┐
                         │      Routes      │
                         └────────┬─────────┘
                                  ↓
                         ┌──────────────────┐
                         │     Features     │
                         └────────┬─────────┘
                                  ↓
                    ┌────────────────────────────┐
                    │ Domain / Application Logic│
                    └─────────────┬──────────────┘
                                  ↓
                    ┌────────────────────────────┐
                    │ Data / API / Backend       │
                    └────────────────────────────┘
```

Diese Struktur ist ein Zielbild und darf sich weiterentwickeln, wenn die tatsächliche Implementierung neue Anforderungen sichtbar macht.
