# 🧭 Adventure Bible Backend

Das Backend ist die REST-API für den gemeinsamen Adventure-Bible-MVP. Es speichert App-Daten dauerhaft und stellt sie dem Frontend über geschützte Endpunkte bereit.

## ✨ Auf Einen Blick

| Bereich | Stand |
|---|---|
| API-Typ | REST-API |
| Laufzeit | Node.js mit Express |
| Datenbank | PostgreSQL über Prisma |
| Validierung | Zod |
| Authentifizierung | Clerk-Backend-Prüfung mit lokalem Entwicklungsheader als Fallback |
| Tests | Vitest und Supertest |
| Deployment | noch offen |

## 🌿 Ziel

Das Backend unterstützt den zentralen Produktflow:

```text
Profil
-> großer HP-Check
-> Quest-Auswahl
-> Quest starten
-> Quest abschließen
-> Mini HP-Check
-> Lagerfeuer oder neue Quest
-> Tagesjournal
```

Die API ist keine medizinische Anwendung. HP-Werte dienen nur der Selbstwahrnehmung und der Auswahl passender nächster Schritte.

## 🎯 MVP-Scope

Das Backend-MVP soll mindestens diese Daten speichern:

| Entität | Zweck |
|---|---|
| `UserProfile` | persönliches Adventure-Bible-Profil |
| `HpCheck` | großer oder kleiner Zustandscheck |
| `Quest` | Aufgabe im Adventure-Bible-Kontext |
| `QuestLog` | gestartete, abgeschlossene, verschobene oder übersprungene Quest |
| `JournalEntry` | Tagesereignis oder Reflexion |
| `PlanActivity` | geplanter Tagespunkt im Kalender oder Tagesplan |

Nicht Teil des Backend-MVP:

- eigene Passwortverwaltung
- medizinische Bewertung
- KI-Empfehlungen
- Inventar
- Routinen
- erweiterte Statistiken
- App-Store-Infrastruktur

## 🧩 Projektstatus

| Bereich | Umgesetzt | Offen |
|---|---|---|
| Basis | Express-App, Konfiguration, zentrale Fehlerantwort | Produktionskonfiguration final prüfen |
| Datenbank | Prisma-Schema und Migrationen | Deployment-Datenbank |
| Auth | Entwicklungsheader `x-test-auth-user-id`, Clerk-Backend-Prüfung, Frontend sendet Clerk-Token | Produktionskonfiguration final prüfen |
| Profil | Lesen und Aktualisieren | Profil-Löschung erst später |
| HP-Checks | Erstellen, Liste, Einzelansicht, großer HP-Check und Mini-HP-Check im Frontend angebunden | weitere Filter/Statistik später |
| Quests | Erstellen, Liste, Einzelansicht, Update | Archivieren/Löschen, Filter |
| QuestLogs | Liste, Starten und Aktualisieren/Abschließen, Frontend-Quest-Flow angebunden | Einzelansicht und Filter |
| JournalEntries | Lesen, Erstellen, Aktualisieren, Löschen, einfache Filter, Reflexion im Frontend angebunden | automatische Journal-Events aus weiteren App-Aktionen |
| PlanActivities | Lesen, Erstellen, Aktualisieren und Löschen, Frontend-Plan/Kalender angebunden | weitere Filter/Statistik später |
| Deployment | noch nicht vorhanden | Live-URL und sichere Env-Konfiguration |

Zieltermin für die vollständige Frontend-Backend-Version und Abgabe: 19.10.2026.

## 🔌 Aktuelle Endpunkte

| Methode | Pfad | Status |
|---|---|---|
| `GET` | `/health` | implementiert |
| `GET` | `/api/auth-check` | implementiert |
| `GET` | `/api/profile` | implementiert |
| `PUT` | `/api/profile` | implementiert |
| `GET` | `/api/hp-checks` | implementiert |
| `GET` | `/api/hp-checks/:id` | implementiert |
| `POST` | `/api/hp-checks` | implementiert |
| `GET` | `/api/quests` | implementiert |
| `POST` | `/api/quests` | implementiert |
| `GET` | `/api/quests/:id` | implementiert |
| `PATCH` | `/api/quests/:id` | implementiert |
| `GET` | `/api/quest-logs` | implementiert |
| `POST` | `/api/quest-logs` | implementiert |
| `PATCH` | `/api/quest-logs/:id` | implementiert |
| `GET` | `/api/journal-entries` | implementiert |
| `POST` | `/api/journal-entries` | implementiert |
| `GET` | `/api/journal-entries/:id` | implementiert |
| `PATCH` | `/api/journal-entries/:id` | implementiert |
| `DELETE` | `/api/journal-entries/:id` | implementiert |
| `GET` | `/api/plan-activities` | implementiert |
| `POST` | `/api/plan-activities` | implementiert |
| `PATCH` | `/api/plan-activities/:id` | implementiert |
| `DELETE` | `/api/plan-activities/:id` | implementiert |

## 🛠️ Tech Stack

| Technologie | Verwendung |
|---|---|
| Node.js | Laufzeit |
| Express | HTTP-Server und Routing |
| TypeScript | Typisierung |
| PostgreSQL | Datenbank |
| Prisma | ORM und Migrationen |
| Zod | Request-Validierung |
| Helmet | Security Header |
| CORS | erlaubte Frontend-Origin |
| Express Rate Limit | Schutz vor Missbrauch |
| dotenv | Umgebungsvariablen |
| Vitest | Test Runner |
| Supertest | API-Tests |

## 📁 Projektstruktur

```text
backend/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── app.ts
│   ├── config.ts
│   ├── database/
│   ├── middlewares/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   └── server.ts
├── tests/
│   ├── auth.test.ts
│   ├── health.test.ts
│   ├── hpChecks.test.ts
│   ├── hpScore.test.ts
│   ├── journalEntries.test.ts
│   ├── planActivities.test.ts
│   ├── profile.test.ts
│   ├── quests.test.ts
│   └── questLogs.test.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## 💻 Lokale Entwicklung

Dependencies installieren:

```bash
npm install
```

Private `.env` aus Beispiel anlegen:

```bash
cp .env.example .env
```

Benötigte Variablen:

```env
PORT=3000
DATABASE_URL=postgresql://...
CLERK_PUBLISHABLE_KEY=pk_test_dein_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_dein_clerk_secret_key
FRONTEND_ORIGIN=http://localhost:5173
```

Prisma vorbereiten:

```bash
npm run prisma:generate
npm run prisma:migrate
```

Entwicklungsserver starten:

```bash
npm run dev
```

## 🔐 Authentifizierung

Während der Entwicklung und in Tests kann die Auth-Middleware den Header `x-test-auth-user-id` lesen. Dieser Übergang ist nur außerhalb von `production` erlaubt.

Wenn echte Clerk-Keys gesetzt sind, nutzt die API `@clerk/express` für die Backend-Prüfung. Das Frontend sendet dafür bei angebundenen Requests einen Clerk-Session-Token mit. Die genaue Strategie steht in [auth-strategy.md](auth-strategy.md).

## 🧪 Tests und Qualität

```bash
npm test
npm run build
```

## 📚 API-Dokumentation

| Dokument | Zweck |
|---|---|
| [API-Plan](api-plan.md) | Endpunkte, Antwortformate und Fehlerfälle |
| [Datenmodell](data-model.md) | Entitäten und Beziehungen |
| [Prisma-Plan](prisma-plan.md) | Prisma-Struktur und Migrationen |
| [Auth-Strategie](auth-strategy.md) | Entwicklungs-Auth und später Clerk |

## 🚀 Deployment

Das Backend ist lokal lauffähig, aber noch nicht deployed.

Für die Modulanforderungen fehlt noch:

- Deployment-Ziel festlegen
- sichere Produktionsvariablen setzen
- CORS auf produktive Frontend-URL begrenzen
- Live-URL testen
- Live-URL in README und Abgabe ergänzen

Langfristig soll der Betrieb für einen kleinen Freundeskreis kostenfrei oder kostenkontrolliert bleiben. Das ist abhängig von den Free-Tier-Limits des gewählten Hostings und der Datenbank.
