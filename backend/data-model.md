# Adventure Bible Datenmodell

## Stand

- Datum: 30.09.2026
- Branch: `feature`
- Grundlage: [api-plan.md](api-plan.md)
- Status: Datenmodellplanung vor Prisma-Implementierung

## Ziel des Datenmodells

Das Datenmodell speichert den kleinsten sinnvollen Adventure-Bible-Kern:

- ein Profil pro angemeldetem Nutzer
- HP-Checks als Zustandsverlauf
- Quests als Aufgaben oder Quest-Vorlagen
- QuestLogs als tatsächlicher Quest-Verlauf
- JournalEntries als Tagesereignisse und Reflexionen
- HP-Gesamtwerte als berechnete Zustandswerte
- Fortschrittswerte für Level-Aufstieg als berechenbare Werte aus abgeschlossenen Quests

Alle persönlichen Daten hängen an `UserProfile`. Dadurch kann die API später sauber autorisieren: Ein Nutzer darf nur Daten lesen oder verändern, die zu seinem eigenen Profil gehören.

## ERD-Skizze

```text
┌────────────────┐
│  UserProfile   │
│────────────────│
│ id             │
│ authUserId     │
│ displayName    │
│ characterName  │
│ level          │
│ xp             │
│ questPoints    │
└───────┬────────┘
        │ 1
        │
        ├───────────────< HpCheck
        │
        ├───────────────< Quest
        │                   │ 1
        │                   │
        │                   └───────────────< QuestLog
        │                                         │
        └───────────────< JournalEntry >──────────┘
                              │
                              └──────── optional HpCheck
```

Lesart:

- `UserProfile` hat viele `HpCheck`.
- `UserProfile` hat viele `Quest`.
- `UserProfile` hat viele `QuestLog`.
- `UserProfile` hat viele `JournalEntry`.
- `Quest` hat viele `QuestLog`.
- `JournalEntry` kann optional auf einen `QuestLog` oder `HpCheck` zeigen.

## Tabellen und Felder

### UserProfile

| Feld | Geplanter Typ | Pflicht | Eindeutig | Zweck |
|---|---|---:|---:|---|
| `id` | `String` / UUID | ja | ja | interne Profil-ID |
| `authUserId` | `String` | ja | ja | ID aus Clerk oder geprüftem Auth-System |
| `displayName` | `String` | ja | nein | sichtbarer Nutzername |
| `characterName` | `String` | ja | nein | Name des Adventure-Bible-Charakters |
| `level` | `Int` | ja | nein | aktuelles Level |
| `xp` | `Int` | ja | nein | gesammelte Erfahrungspunkte |
| `questPoints` | `Int` | ja | nein | gesammelte Quest-Punkte |
| `createdAt` | `DateTime` | ja | nein | Erstellzeitpunkt |
| `updatedAt` | `DateTime` | ja | nein | letzter Änderungszeitpunkt |

Regeln:

- `authUserId` kommt aus dem Auth-Kontext, nicht aus dem Request-Body.
- `displayName` und `characterName` unterstützen Unicode.
- `level`, `xp` und `questPoints` dürfen nicht negativ sein.
- Startwerte: `level = 1`, `xp = 0`, `questPoints = 0`.

### HpCheck

| Feld | Geplanter Typ | Pflicht | Zweck |
|---|---|---:|---|
| `id` | `String` / UUID | ja | interne HP-Check-ID |
| `userProfileId` | `String` / UUID | ja | Besitzer des Checks |
| `type` | `HpCheckType` | ja | großer oder kleiner HP-Check |
| `body` | `Int` | ja | Körper-Wert |
| `energy` | `Int` | ja | Energie-Wert |
| `focus` | `Int` | ja | Konzentrations-Wert |
| `mood` | `Int` | ja | Stimmungs-Wert |
| `muscle` | `Int` | ja | Muskelzustand-Wert |
| `nutrition` | `Int` | ja | Ernährungs-Wert |
| `recovery` | `Int` | ja | Regenerations-Wert |
| `overallScore` | `Int` | ja | berechneter HP-Gesamtwert |
| `createdAt` | `DateTime` | ja | Erstellzeitpunkt |

Enum:

```text
HpCheckType = FULL | MINI
```

Regeln:

- Einzelantworten liegen im Frontend bei `1` bis `5`.
- Die gespeicherten Bereichswerte und `overallScore` folgen der bestehenden HP-Berechnung aus dem Frontend: Skala `0` bis `100`.
- `overallScore` wird aus den Bereichswerten berechnet.
- Der HP-Gesamtwert ist nicht dasselbe wie die Level-Aufstieg-Bewertung.
- HP-Werte sind keine Diagnosewerte.

### Quest

| Feld | Geplanter Typ | Pflicht | Zweck |
|---|---|---:|---|
| `id` | `String` / UUID | ja | interne Quest-ID |
| `userProfileId` | `String` / UUID | ja | Besitzer der Quest |
| `title` | `String` | ja | Quest-Titel |
| `description` | `String` | nein | Quest-Beschreibung |
| `type` | `QuestType` | ja | Quest-Kategorie |
| `difficulty` | `Int` | ja | Schwierigkeit |
| `estimatedMinutes` | `Int` | nein | geschätzte Dauer |
| `xpReward` | `Int` | ja | XP-Belohnung |
| `questPointReward` | `Int` | ja | Quest-Point-Belohnung |
| `isArchived` | `Boolean` | ja | Ausblendung statt hartem Löschen |
| `createdAt` | `DateTime` | ja | Erstellzeitpunkt |
| `updatedAt` | `DateTime` | ja | letzter Änderungszeitpunkt |

Enum:

```text
QuestType = MAIN | SIDE | DAILY | RECOVERY
```

Regeln:

- `title` und `description` unterstützen Unicode.
- `difficulty` liegt voraussichtlich zwischen `1` und `5`.
- Belohnungswerte dürfen nicht negativ sein.
- Erste Empfehlung: `DELETE /api/quests/:id` setzt `isArchived = true`, damit alte `QuestLog`-Einträge erklärbar bleiben.

### QuestLog

| Feld | Geplanter Typ | Pflicht | Zweck |
|---|---|---:|---|
| `id` | `String` / UUID | ja | interne QuestLog-ID |
| `userProfileId` | `String` / UUID | ja | Besitzer des Verlaufs |
| `questId` | `String` / UUID | ja | verknüpfte Quest |
| `status` | `QuestLogStatus` | ja | Zustand dieses Quest-Eintrags |
| `startedAt` | `DateTime` | nein | Startzeitpunkt |
| `completedAt` | `DateTime` | nein | Abschlusszeitpunkt |
| `scorePoints` | `Int` | nein | Punkte, die dieser QuestLog zum Score beiträgt |
| `note` | `String` | nein | optionale Notiz |
| `createdAt` | `DateTime` | ja | Erstellzeitpunkt |
| `updatedAt` | `DateTime` | ja | letzter Änderungszeitpunkt |

Enum:

```text
QuestLogStatus = STARTED | COMPLETED | POSTPONED | SKIPPED
```

Regeln:

- `questId` muss zu einer Quest desselben `UserProfile` gehören.
- `completedAt` wird gesetzt, wenn `status = COMPLETED` ist.
- `scorePoints` wird bei abgeschlossenen Quests aus der Quest oder aus einer späteren Bewertungslogik abgeleitet.
- `note` unterstützt Unicode.
- Ein QuestLog wird nicht genutzt, um die Quest-Vorlage selbst zu verändern.

### JournalEntry

| Feld | Geplanter Typ | Pflicht | Zweck |
|---|---|---:|---|
| `id` | `String` / UUID | ja | interne Journal-ID |
| `userProfileId` | `String` / UUID | ja | Besitzer des Eintrags |
| `entryDate` | `Date` oder normalisierte `DateTime` | nein | freiwilliger Kalendertag, z. B. `30.09.2026` |
| `entryTime` | `String` oder `DateTime` | nein | freiwillige Uhrzeit, z. B. `13:52` |
| `type` | `JournalEntryType` | ja | Ereignis oder Reflexion |
| `title` | `String` | ja | kurzer Titel |
| `content` | `String` | nein | Freitext |
| `questLogId` | `String` / UUID | nein | optionaler Bezug zu QuestLog |
| `hpCheckId` | `String` / UUID | nein | optionaler Bezug zu HpCheck |
| `createdAt` | `DateTime` | ja | Erstellzeitpunkt |
| `updatedAt` | `DateTime` | ja | letzter Änderungszeitpunkt |

Enum:

```text
JournalEntryType = EVENT | REFLECTION
```

Regeln:

- `title` und `content` unterstützen Unicode.
- `entryDate` und `entryTime` sind freiwillig.
- Wenn `entryDate` gesetzt ist, kann sie für Kalenderfilter genutzt werden.
- Wenn keine freiwillige Zeit gesetzt wird, bleibt `createdAt` der technische Erstellzeitpunkt.
- Ein Eintrag darf ohne `questLogId` und ohne `hpCheckId` existieren.
- Wenn `questLogId` oder `hpCheckId` gesetzt ist, muss die verknüpfte Ressource zum selben `UserProfile` gehören.

## Beziehungsregeln

### UserProfile zu HpCheck

- Ein Profil kann viele HP-Checks haben.
- Ein HP-Check gehört genau einem Profil.
- Wenn ein Profil gelöscht würde, müssten die dazugehörigen HP-Checks ebenfalls gelöscht werden.

### UserProfile zu Quest

- Ein Profil kann viele Quests haben.
- Eine Quest gehört genau einem Profil.
- Quests werden voraussichtlich archiviert statt gelöscht.

### Quest zu QuestLog

- Eine Quest kann viele QuestLogs haben.
- Ein QuestLog gehört genau einer Quest.
- Ein QuestLog muss zusätzlich `userProfileId` speichern, damit Autorisierung und Filter einfacher bleiben.

### UserProfile zu JournalEntry

- Ein Profil kann viele JournalEntries haben.
- Ein JournalEntry gehört genau einem Profil.
- JournalEntries sind private Nutzerdaten.

### JournalEntry zu QuestLog und HpCheck

- Beide Beziehungen sind optional.
- Ein JournalEntry kann ein manuelles Reflexionsdokument sein.
- Ein JournalEntry kann ein technisches Tagesereignis aus einem HP-Check oder QuestLog abbilden.
- Mehrere Bezüge sind erlaubt, wenn sie fachlich sinnvoll sind, zum Beispiel Reflexion zu einer abgeschlossenen Quest und dem danach erfassten HP-Check.

## Fortschritts-Score-Modell

Fortschritts-Scores beschreiben Level-Aufstieg und Fortschritt, nicht Gesundheit und nicht HP-Zustand.

Geplante Begriffe:

- `scorePoints`: Punkte eines einzelnen abgeschlossenen QuestLogs für Fortschritt.
- `progressTotalScore`: laufende Summe mehrerer Quest-Punkte innerhalb eines Tages oder Auswertungsbereichs.
- `dayScore`: Tageswert am Ende eines Tages.
- `finalScore`: Summe aller bisherigen `dayScore`-Werte.

Beispiel:

```text
Quest A = 5 Punkte
Quest B = 3 Punkte
progressTotalScore = 8 Punkte

dayScore Tag 1 = 8 Punkte
dayScore Tag 2 = 6 Punkte
finalScore = 14 Punkte
```

Entscheidung für Version 1:

- `scorePoints` kann am `QuestLog` gespeichert werden, damit abgeschlossene Quests nachvollziehbar bleiben.
- `progressTotalScore`, `dayScore` und `finalScore` werden zunächst aus `QuestLog.scorePoints` berechnet.
- Eine eigene Score-Tabelle wird erst eingeführt, wenn Tagesabschlüsse oder Performance das wirklich nötig machen.

## Globale Quest-Vorlagen

Globale Quest-Vorlagen sind für Version 1 noch nicht entschieden.

Wenn sie später gebraucht werden, könnte eine eigene Tabelle entstehen:

```text
QuestTemplate
├─ id
├─ title
├─ description
├─ type
├─ difficulty
├─ estimatedMinutes
├─ xpReward
├─ questPointReward
└─ isActive
```

Dann gäbe es zwei Arten von Quests:

- globale `QuestTemplate`, die als Vorschlag für alle Nutzer sichtbar sein können
- persönliche `Quest`, die einem `UserProfile` gehört

Ein Nutzer könnte aus einer Vorlage eine eigene Quest erstellen. Die persönliche Quest wäre danach unabhängig von der Vorlage veränderbar.

Entscheidung für Version 1:

- Erst persönliche `Quest` umsetzen.
- `QuestTemplate` nur als spätere Erweiterung dokumentieren.

## Indizes und Constraints

Geplante eindeutige Constraints:

- `UserProfile.authUserId` ist eindeutig.

Geplante Indizes:

- `HpCheck.userProfileId`
- `HpCheck.createdAt`
- `Quest.userProfileId`
- `Quest.type`
- `Quest.isArchived`
- `QuestLog.userProfileId`
- `QuestLog.questId`
- `QuestLog.status`
- `QuestLog.createdAt`
- `QuestLog.completedAt`
- `JournalEntry.userProfileId`
- `JournalEntry.entryDate`
- `JournalEntry.type`

## Lösch- und Archivierungsstrategie

Für die erste Backend-Version:

- Quests werden archiviert statt hart gelöscht.
- QuestLogs bleiben erhalten, damit der Verlauf nachvollziehbar bleibt.
- JournalEntries können gelöscht werden, wenn der Nutzer sie bewusst entfernt.
- Profil-Löschung ist erst nach der ersten stabilen Abgabe geplant.

## Validierungsentscheidungen

Geplante Grenzen:

- HP-Werte: `1` bis `5`
- Schwierigkeit: `1` bis `5`
- `estimatedMinutes`: positive Zahl, falls gesetzt
- `xpReward`: `0` oder größer
- `questPointReward`: `0` oder größer
- `scorePoints`: `0` oder größer, falls gesetzt
- `overallScore`: `0` bis `100`
- `displayName`, `characterName`, `title`, `description`, `note`, `content`: Unicode erlaubt
- technische IDs: streng als UUID oder passendes Prisma-ID-Format validieren

## Entschiedene Modellfragen

- `entryDate` und `entryTime` sind freiwillig, nicht verpflichtend.
- Globale Quest-Vorlagen bleiben offen und werden nicht in Version 1 umgesetzt.
- HP-Werte behalten die bestehende HP-Berechnung mit Bereichswerten und `overallScore`.
- Fortschrittswerte für Level-Aufstieg werden getrennt davon aus Quest-/QuestLog-Punkten berechnet.
- Ein `JournalEntry` darf mehrere Bezüge haben, wenn das fachlich sinnvoll ist.
- Profil-Löschung kommt erst nach der ersten stabilen Abgabe.

## Weiter offene Modellfragen

- Soll `entryDate` in Prisma als normalisierte `DateTime` oder mit PostgreSQL-Date-Typ gespeichert werden?
- Soll `entryTime` als eigener String im Format `HH:mm` gespeichert werden oder später in einem kombinierten optionalen `DateTime` aufgehen?
- Soll `scorePoints` direkt aus `questPointReward` entstehen oder als eigenes Feld unabhängig davon gepflegt werden?
- Soll der Fortschritts-Gesamtwert später `progressTotalScore` heißen oder im UI anders benannt werden?
