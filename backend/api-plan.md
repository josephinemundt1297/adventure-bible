# Adventure Bible API-Plan

## Stand

- Datum: 30.09.2026
- Uhrzeit beim Start dieses Plans: 13:28 Uhr
- Branch: `feature`
- Status: Planung vor Implementierung

## Zweck der API

Die Adventure-Bible-API speichert persönliche Zustands-, Quest- und Journal-Daten dauerhaft und stellt sie über eine REST-API bereit.

Die API unterstützt den bestehenden Produkt-Loop:

```text
Profil
-> großer HP-Check
-> passende Quest wählen
-> Quest starten
-> Quest abschließen
-> Mini HP-Check
-> neue Quest oder Lagerfeuer
-> Tagesjournal
```

Die API ist keine medizinische Anwendung. HP-Werte dienen nur der Selbstwahrnehmung und der Anpassung von Quest-Vorschlägen.

## Zielgruppe

Primäre Nutzer sind angemeldete Adventure-Bible-Nutzer, die ihren Alltag mit Quests, Zustands-Checks und Reflexionen organisieren möchten.

Technisch wird die API vom Adventure-Bible-Frontend genutzt. Lehrkräfte und Reviewer sollen die API lokal und später über eine Deployment-URL testen können.

## Nicht-Ziele der ersten Backend-Version

- keine eigene Passwortverwaltung
- keine medizinische Diagnose oder Gesundheitsbewertung
- keine KI-basierte Quest-Empfehlung
- keine externe Kalenderintegration
- kein Inventar-System
- keine komplexe Statistik-Auswertung
- keine erweiterten Achievements über die bereits vorhandenen App-Achievements hinaus

## Geplanter Stack

- Node.js
- Express
- PostgreSQL
- Prisma
- Zod
- Clerk-Backend-Integration für geschützte Routen
- Supertest mit einem passenden Test-Runner

Clerk bleibt die geplante Authentifizierungsbasis. Der Test-Runner ist inzwischen Vitest.

## Datenmodell

### UserProfile

Speichert das Adventure-Bible-Profil eines angemeldeten Nutzers.

Wichtige Felder:

- `id`
- `authUserId`
- `displayName`
- `characterName`
- `level`
- `xp`
- `questPoints`
- `createdAt`
- `updatedAt`

Beziehungen:

- besitzt viele `HpCheck`
- besitzt viele `Quest`
- besitzt viele `QuestLog`
- besitzt viele `JournalEntry`

### HpCheck

Speichert große und kleine HP-Checks.

Wichtige Felder:

- `id`
- `userProfileId`
- `type`: `FULL` oder `MINI`
- `body`
- `energy`
- `focus`
- `mood`
- `overallScore`
- `createdAt`

Beziehungen:

- gehört zu genau einem `UserProfile`
- kann optional mit `JournalEntry` verbunden werden

### Quest

Speichert Quest-Vorlagen oder nutzereigene Quests.

Wichtige Felder:

- `id`
- `userProfileId`
- `title`
- `description`
- `type`: `MAIN`, `SIDE`, `DAILY` oder `RECOVERY`
- `difficulty`
- `estimatedMinutes`
- `xpReward`
- `questPointReward`
- `isArchived`
- `createdAt`
- `updatedAt`

Beziehungen:

- gehört zu genau einem `UserProfile`
- kann in vielen `QuestLog`-Einträgen verwendet werden

### QuestLog

Speichert, was mit einer Quest tatsächlich passiert ist.

Wichtige Felder:

- `id`
- `userProfileId`
- `questId`
- `status`: `STARTED`, `COMPLETED`, `POSTPONED` oder `SKIPPED`
- `startedAt`
- `completedAt`
- `scorePoints`
- `note`
- `createdAt`
- `updatedAt`

Beziehungen:

- gehört zu genau einem `UserProfile`
- gehört zu genau einer `Quest`
- kann optional mit `JournalEntry` verbunden werden

### JournalEntry

Speichert Tagesereignisse und Reflexionen.

Wichtige Felder:

- `id`
- `userProfileId`
- `entryDate`
- `entryTime`
- `type`: `EVENT` oder `REFLECTION`
- `title`
- `content`
- `questLogId`
- `hpCheckId`
- `createdAt`
- `updatedAt`

Beziehungen:

- gehört zu genau einem `UserProfile`
- kann optional zu einem `QuestLog` gehören
- kann optional zu einem `HpCheck` gehören

## Beziehungsskizze

```text
UserProfile
  ├─ HpCheck
  ├─ Quest
  │   └─ QuestLog
  └─ JournalEntry
        ├─ optional QuestLog
        └─ optional HpCheck
```

## API-Konventionen

### Basis-URL

Lokal geplant:

```text
http://localhost:3000
```

### Antwortformat bei Erfolg

Einzelne Ressource:

```json
{
  "data": {
    "id": "example-id"
  }
}
```

Listen:

```json
{
  "data": [],
  "meta": {
    "count": 0
  }
}
```

### Antwortformat bei Fehlern

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Die Anfrage enthält ungültige Daten.",
    "details": []
  }
}
```

Interne Fehler geben keine Stacktraces, Secrets oder Datenbankdetails an Clients zurück.

## Endpunkte

### Health

| Methode | Pfad | Schutz | Zweck |
|---|---|---|---|
| `GET` | `/health` | öffentlich | Prüft, ob die API läuft |

Beispielantwort:

```json
{
  "data": {
    "status": "ok"
  }
}
```

### Profil

| Methode | Pfad | Schutz | Zweck |
|---|---|---|---|
| `GET` | `/api/profile` | geschützt | Eigenes Profil lesen |
| `PUT` | `/api/profile` | geschützt | Eigenes Profil erstellen oder aktualisieren |

Beispiel `PUT /api/profile`:

```json
{
  "displayName": "Josi",
  "characterName": "Lumi"
}
```

### HP-Checks

| Methode | Pfad | Schutz | Zweck |
|---|---|---|---|
| `GET` | `/api/hp-checks` | geschützt | Eigene HP-Checks lesen |
| `POST` | `/api/hp-checks` | geschützt | HP-Check speichern |
| `GET` | `/api/hp-checks/:id` | geschützt | Einzelnen eigenen HP-Check lesen |

Filter:

- `type`
- `from`
- `to`

Beispiel `POST /api/hp-checks`:

```json
{
  "type": "FULL",
  "body": 3,
  "energy": 2,
  "focus": 4,
  "mood": 3
}
```

### Quests

| Methode | Pfad | Schutz | Zweck |
|---|---|---|---|
| `GET` | `/api/quests` | geschützt | Eigene Quests lesen |
| `POST` | `/api/quests` | geschützt | Eigene Quest erstellen |
| `GET` | `/api/quests/:id` | geschützt | Einzelne eigene Quest lesen |
| `PATCH` | `/api/quests/:id` | geschützt | Eigene Quest aktualisieren |
| `DELETE` | `/api/quests/:id` | geschützt | Eigene Quest archivieren oder löschen |

Filter:

- `type`
- `isArchived`
- `search`

Beispiel `POST /api/quests`:

```json
{
  "title": "10 Minuten aufräumen",
  "description": "Räume eine kleine Fläche sichtbar auf.",
  "type": "SIDE",
  "difficulty": 2,
  "estimatedMinutes": 10,
  "xpReward": 20,
  "questPointReward": 1
}
```

### QuestLogs

Aktueller Implementierungsstand: Liste, Starten und Aktualisieren/Abschließen sind umgesetzt. Einzelansicht und Filter bleiben spätere Ausbaustufen.

| Methode | Pfad | Schutz | Zweck |
|---|---|---|---|
| `GET` | `/api/quest-logs` | geschützt | Eigenen Quest-Verlauf lesen |
| `POST` | `/api/quest-logs` | geschützt | Quest starten oder Ereignis speichern |
| `GET` | `/api/quest-logs/:id` | geschützt | Einzelnen eigenen QuestLog lesen, später |
| `PATCH` | `/api/quest-logs/:id` | geschützt | QuestLog aktualisieren, z. B. abschließen |

Filter:

- `status`
- `from`
- `to`

Beispiel `POST /api/quest-logs`:

```json
{
  "questId": "quest-id",
  "status": "STARTED"
}
```

Beispiel `PATCH /api/quest-logs/:id`:

```json
{
  "status": "COMPLETED",
  "note": "Hat gut funktioniert."
}
```

### JournalEntries

Aktueller Implementierungsstand: Lesen, Erstellen, Aktualisieren, Löschen und Filter nach `entryDate`, `from`, `to` und `type` sind umgesetzt.

| Methode | Pfad | Schutz | Zweck |
|---|---|---|---|
| `GET` | `/api/journal-entries` | geschützt | Eigene Journal-Einträge lesen |
| `POST` | `/api/journal-entries` | geschützt | Journal-Eintrag erstellen |
| `GET` | `/api/journal-entries/:id` | geschützt | Einzelnen eigenen Journal-Eintrag lesen |
| `PATCH` | `/api/journal-entries/:id` | geschützt | Eigenen Journal-Eintrag aktualisieren |
| `DELETE` | `/api/journal-entries/:id` | geschützt | Eigenen Journal-Eintrag löschen |

Filter:

- `entryDate`
- `from`
- `to`
- `type`

Beispiel `POST /api/journal-entries`:

```json
{
  "entryDate": "2026-09-30",
  "type": "REFLECTION",
  "title": "Abendreflexion",
  "content": "Heute habe ich meinen Backend-Scope geklärt."
}
```

## Authentifizierung und Autorisierung

Langfristig geplant ist eine produktive Authentifizierung über Clerk-Backend-Integration.

Für die erste testbare Backend-Version gibt es eine Übergangs-Middleware mit dem Header `x-test-auth-user-id`. Dieser Header ist nur außerhalb von `NODE_ENV=production` gültig und ersetzt keine echte Produktions-Authentifizierung.

Regeln:

- Alle `/api/*`-Routen sind geschützt.
- `GET /health` bleibt öffentlich.
- Ein Nutzer darf nur eigene Profile, HP-Checks, Quests, QuestLogs und JournalEntries lesen oder verändern.
- `authUserId` wird aus dem geprüften Auth-Kontext abgeleitet, nicht aus dem Request-Body vertraut.
- Fremde Ressourcen geben `404` oder `403` zurück, je nach finaler Autorisierungsentscheidung.

## Validierung

Alle nicht vertrauenswürdigen Eingaben werden mit Zod validiert:

- Request-Body
- URL-Parameter
- Query-Parameter

Unicode bleibt für geeignete Freitextfelder erlaubt:

- `displayName`
- `characterName`
- `title`
- `description`
- `note`
- `content`

Technische IDs, Enum-Werte, Datumswerte und Zahlen werden streng validiert.

## Sicherheit

Geplante Maßnahmen:

- keine Secrets im Repository
- `.env.example` nur mit Platzhalterwerten
- keine Passwörter in der eigenen Datenbank
- zentrale Fehlerbehandlung ohne interne Details für Clients
- konkrete CORS-Origin statt pauschal offenem Zugriff
- Rate Limiting für schreibende Endpunkte und gegebenenfalls Auth-nahe Routen
- Datenbankzugriff über Prisma
- keine dynamischen SQL-Strings aus Nutzereingaben

## Teststrategie

Mindestens zu testen:

- `GET /health` funktioniert öffentlich
- geschützte Route ohne Auth wird abgelehnt
- Nutzer kann eigenes Profil erstellen und lesen
- ungültige Eingaben erzeugen `400`
- fremde Ressourcen können nicht gelesen oder verändert werden
- HP-Check wird mit gültigen Unicode-unabhängigen Zahlenwerten gespeichert
- Quest mit Unicode-Titel wird akzeptiert
- QuestLog kann eine Quest starten und abschließen
- JournalEntry kann erstellt und nach Datum gefiltert werden
- nicht vorhandene IDs erzeugen `404`

## Offene Entscheidungen

- Wie wird die produktive Clerk-Prüfung konkret in Middleware und Tests eingebunden?
- Werden Quests komplett nutzereigen gespeichert oder gibt es zusätzlich globale Quest-Vorlagen?
- Soll `DELETE /api/quests/:id` wirklich löschen oder nur `isArchived` setzen?
- Sollen Journal-Ereignisse automatisch aus HP-Checks und QuestLogs entstehen oder explizit über eigene Requests?
- Wie genau werden `progressTotalScore`, `dayScore` und `finalScore` in Version 1 berechnet und angezeigt?
