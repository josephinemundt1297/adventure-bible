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

Die tatsächlichen installierten Versionen und Scripts in `package.json` sind maßgeblich.

---

# 2. MVP-Architektur

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

# 3. Feature-orientierte Struktur

Die Anwendung soll bevorzugt nach Features organisiert werden und nicht ausschließlich nach technischen Dateitypen.

Beispiel:

```text
src/
├── app/
├── components/
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
└── main.tsx
```

Die konkrete Struktur darf während der Implementierung angepasst werden, wenn der Code dadurch klarer wird.

Keine künstliche Ordnerstruktur nur um eine Regel zu erfüllen.

---

# 4. Routing

Routing soll die Hauptbereiche der App eindeutig abbilden.

MVP-Ziele:

- Home
- Quests
- Plan
- Ich

Profil-Erstellung und andere Onboarding-Schritte dürfen einen eigenen Flow besitzen.

Die Routing-Lösung muss Deep Links und direkte Navigation auf gültige App-Bereiche ermöglichen.

---

# 5. State Management

Für den MVP gilt:

> So wenig globaler State wie möglich.

Lokaler Component State ist zu bevorzugen, wenn Daten nur innerhalb einer Komponente oder eines kleinen Flows benötigt werden.

Gemeinsamer App-State wird nur dort verwendet, wo mehrere unabhängige Bereiche denselben Zustand benötigen.

Keine zusätzliche State-Management-Library ohne konkreten Bedarf.

---

# 6. Domain Models

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

Typen werden in TypeScript explizit modelliert.

Beispielhafte konzeptionelle Beziehungen:

```text
Profile
  └── Character
  └── UserState
  └── Progress
  └── Quests
```

Die konkrete Datenstruktur wird vor Implementierung der jeweiligen Features festgelegt.

---

# 7. Adaptive Logik

Die adaptive Auswahl der Quests gehört zur Anwendungslogik und nicht direkt in die UI-Komponente.

Beispiel:

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

# 8. Datenzugriff im MVP

Der MVP kann mit statischen Mock-Daten oder einer lokalen Datenquelle arbeiten.

Datenzugriff soll trotzdem hinter klaren Funktionen oder Services liegen, wenn dadurch der spätere Austausch gegen ein Backend einfacher wird.

UI-Komponenten sollen nicht direkt überall auf Rohdaten zugreifen.

---

# 9. Backend-Vorbereitung

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

# 10. Datenbank

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

# 11. Authentifizierung und Secrets

Clerk wird für die spätere Benutzer-Authentifizierung bevorzugt.

Grundregeln:

- Passwörter werden nicht selbst gespeichert, wenn Clerk die Authentifizierung übernimmt.
- Secrets gehören niemals in den Git-Repository-Code.
- Private API Keys dürfen niemals im Browser-Code landen.
- Öffentliche Client-Konfiguration und geheime Server-Konfiguration müssen getrennt bleiben.
- Authentifizierung und Autorisierung werden getrennt betrachtet.

Siehe `docs/SECURITY.md`.

---

# 12. Unicode und Internationalisierung

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

# 13. Sicherheitsgrenzen

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

# 14. Komponentenregeln

Komponenten sollen eine klare Verantwortung besitzen.

Bevorzugt:

```text
Page
 ↓
Feature component
 ↓
Presentational component
```

Nicht bevorzugt:

```text
Eine riesige App-Komponente,
die Routing, State, Daten, Logik und komplettes UI enthält.
```

Wiederverwendbare UI-Grundbausteine können unter `components/` liegen.

Feature-spezifische Komponenten bleiben beim jeweiligen Feature.

---

# 15. Testing Architecture

Tests werden möglichst nahe an der jeweiligen Funktion organisiert.

Zu testen sind insbesondere:

- Domain-/Business-Logik
- adaptive Quest-Auswahl
- Formvalidierung
- zentrale User Flows
- Accessibility-relevantes Verhalten

Tests sollen beobachtbares Verhalten prüfen.

---

# 16. Dependency-Regel

Neue Dependencies werden nur hinzugefügt, wenn:

1. ein konkreter Bedarf besteht,
2. die Dependency zum Projekt passt,
3. sie nicht sinnvoll mit vorhandenen Mitteln ersetzt werden kann,
4. Sicherheits- und Wartungsaspekte vertretbar sind.

Insbesondere werden keine Libraries nur für eine einzelne kleine UI-Aufgabe hinzugefügt.

---

# 17. Architektur-Definition-of-Done

Eine technische Entscheidung gilt erst als abgeschlossen, wenn:

- [ ] sie dokumentiert ist, wenn sie langfristige Auswirkungen hat
- [ ] sie zum aktuellen MVP-Scope passt
- [ ] sie testbar ist
- [ ] Accessibility nicht verschlechtert wird
- [ ] Security-Anforderungen berücksichtigt wurden
- [ ] keine unnötige Dependency eingeführt wurde
- [ ] die spätere Backend-Erweiterung nicht unnötig blockiert wird
