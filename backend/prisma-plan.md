# Prisma-Plan

## Stand

- Datum: 30.09.2026
- Branch: `feature`
- Grundlage: [api-plan.md](api-plan.md) und [data-model.md](data-model.md)
- Status: Prisma-nahe Planung vor `schema.prisma`

## Ziel

Dieser Plan übersetzt das fachliche Datenmodell in eine erste Prisma-Struktur. Er ist noch kein ausführbares Prisma-Schema, sondern eine bewusst prüfbare Vorlage.

## Geplante Prisma-Dateien

Sobald die Backend-Grundstruktur umgesetzt wird, entstehen voraussichtlich:

```text
backend/
├── prisma/
│   └── schema.prisma
└── src/
```

Die Ordner werden erst mit echten Dateien angelegt.

## Generator und Datasource

Geplant:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

`DATABASE_URL` wird nur als Platzhalter in `.env.example` dokumentiert. Echte Zugangsdaten gehören nicht ins Repository.

## Enums

```prisma
enum HpCheckType {
  FULL
  MINI
}

enum QuestType {
  MAIN
  SIDE
  DAILY
  RECOVERY
}

enum QuestLogStatus {
  STARTED
  COMPLETED
  POSTPONED
  SKIPPED
}

enum JournalEntryType {
  EVENT
  REFLECTION
}
```

## Modelle

### UserProfile

```prisma
model UserProfile {
  id            String         @id @default(uuid())
  authUserId    String         @unique
  displayName   String
  characterName String
  level         Int            @default(1)
  xp            Int            @default(0)
  questPoints   Int            @default(0)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  hpChecks       HpCheck[]
  quests         Quest[]
  questLogs      QuestLog[]
  journalEntries JournalEntry[]
}
```

Prüfpunkte:

- `authUserId` darf niemals aus dem Request-Body vertraut werden.
- Nicht-negative Zahlen werden zusätzlich über Zod und Servicelogik validiert.

### HpCheck

```prisma
model HpCheck {
  id            String       @id @default(uuid())
  userProfileId String
  type          HpCheckType
  body          Int
  energy        Int
  focus         Int
  mood          Int
  overallScore  Int
  createdAt     DateTime     @default(now())

  userProfile   UserProfile  @relation(fields: [userProfileId], references: [id], onDelete: Cascade)
  journalEntries JournalEntry[] @relation("HpCheckJournalEntries")

  @@index([userProfileId])
  @@index([createdAt])
}
```

Prüfpunkte:

- Bereichswerte und `overallScore` werden nach der bestehenden HP-Logik berechnet.
- Bereichswerte und `overallScore` liegen auf Skala `0` bis `100`.
- HP-Werte sind keine Diagnosewerte.

### Quest

```prisma
model Quest {
  id               String      @id @default(uuid())
  userProfileId    String
  title            String
  description      String?
  type             QuestType
  difficulty       Int
  estimatedMinutes Int?
  xpReward         Int         @default(0)
  questPointReward Int         @default(0)
  isArchived       Boolean     @default(false)
  createdAt        DateTime    @default(now())
  updatedAt        DateTime    @updatedAt

  userProfile      UserProfile @relation(fields: [userProfileId], references: [id], onDelete: Cascade)
  questLogs        QuestLog[]

  @@index([userProfileId])
  @@index([type])
  @@index([isArchived])
}
```

Prüfpunkte:

- `DELETE /api/quests/:id` soll in Version 1 voraussichtlich `isArchived = true` setzen.
- `title` und `description` bleiben Unicode-fähig.

### QuestLog

```prisma
model QuestLog {
  id            String         @id @default(uuid())
  userProfileId String
  questId       String
  status        QuestLogStatus
  startedAt     DateTime?
  completedAt   DateTime?
  scorePoints   Int?
  note          String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  userProfile   UserProfile    @relation(fields: [userProfileId], references: [id], onDelete: Cascade)
  quest         Quest          @relation(fields: [questId], references: [id])
  journalEntries JournalEntry[] @relation("QuestLogJournalEntries")

  @@index([userProfileId])
  @@index([questId])
  @@index([status])
  @@index([createdAt])
  @@index([completedAt])
}
```

Prüfpunkte:

- Beim Erstellen oder Aktualisieren muss geprüft werden, dass `questId` zum gleichen `userProfileId` gehört.
- `scorePoints` beschreibt Level-/Fortschrittswertung, nicht HP.
- Bei `COMPLETED` soll `completedAt` gesetzt werden.

### JournalEntry

```prisma
model JournalEntry {
  id            String            @id @default(uuid())
  userProfileId String
  entryDate     DateTime?
  entryTime     String?
  type          JournalEntryType
  title         String
  content       String?
  questLogId    String?
  hpCheckId     String?
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @updatedAt

  userProfile   UserProfile       @relation(fields: [userProfileId], references: [id], onDelete: Cascade)
  questLog      QuestLog?         @relation("QuestLogJournalEntries", fields: [questLogId], references: [id])
  hpCheck       HpCheck?          @relation("HpCheckJournalEntries", fields: [hpCheckId], references: [id])

  @@index([userProfileId])
  @@index([entryDate])
  @@index([type])
}
```

Prüfpunkte:

- `entryDate` ist freiwillig und steht für den Kalendertag, zum Beispiel `30.09.2026`.
- `entryTime` ist freiwillig und steht für eine bewusst angegebene Uhrzeit, zum Beispiel `13:52`.
- `createdAt` bleibt der technische Erstellzeitpunkt.
- Wenn `questLogId` oder `hpCheckId` gesetzt ist, muss die verknüpfte Ressource zum gleichen `userProfileId` gehören.

## Bewusste Prisma-Entscheidungen für Version 1

- IDs werden als `String @id @default(uuid())` geplant.
- PostgreSQL ist die geplante Datenbank.
- `entryDate` wird zunächst als optionales `DateTime?` geplant, kann später mit PostgreSQL-spezifischem Date-Typ präzisiert werden.
- `entryTime` wird zunächst als optionaler `String?` im Format `HH:mm` geplant.
- Quests werden archiviert, nicht hart gelöscht.
- Profil-Löschung ist nicht Teil der ersten stabilen Abgabe.
- Globale Quest-Vorlagen werden nicht in Version 1 umgesetzt.

## Validierung außerhalb von Prisma

Diese Regeln gehören zusätzlich in Zod-Schemas und Servicelogik:

- Unicode für Freitext erlauben.
- HP-Bereichswerte und `overallScore`: `0` bis `100`.
- `difficulty`: `1` bis `5`.
- `estimatedMinutes`: positive Zahl, falls gesetzt.
- `xpReward`, `questPointReward`, `scorePoints`: `0` oder größer.
- `entryTime`: Format `HH:mm`, falls gesetzt.
- IDs: gültiges ID-Format.
- Zugriff auf fremde Ressourcen verhindern.

## Offene Punkte vor `schema.prisma`

- Soll `entryDate` direkt mit PostgreSQL-Date-Typ modelliert werden oder vorerst als normalisierte `DateTime`?
- Soll `scorePoints` beim Abschluss aus `questPointReward` kopiert werden oder unabhängig berechnet werden?
- Soll `QuestLog.quest` bei gelöschten Quests durch Archivierung immer erhalten bleiben?
- Soll `JournalEntry` später mehrere QuestLogs oder HpChecks referenzieren können, falls ein einzelner Eintrag mehrere Ereignisse zusammenfasst?
