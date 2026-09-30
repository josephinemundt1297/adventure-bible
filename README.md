# Adventure Bible

Adventure Bible ist ein mobile-first Habit- und Quest-Tracker mit RPG-Elementen. Dieses Repository enthält getrennte Bereiche für das bestehende React-Frontend und das geplante Backend für den Backend-Modulabschluss.

## Projektstruktur

```text
adventure-bible/
├── frontend/              # React-, TypeScript- und Vite-App
├── backend/               # Geplante REST-API mit Datenbank
├── docs/                  # Gemeinsame Produkt-, Architektur- und Sicherheitsdokumentation
├── skills/                # Projektspezifische Agentic-Workflow-Dateien
├── AGENTS.md              # Verbindliche Arbeitsregeln
├── backend-workflow.md    # Backend-Arbeitsweise
├── backend-kursregeln.md  # Modulabschluss-Regeln für das Backend
└── projekt-arbeitsplan.md # Backend-Arbeitsplan bis zur Abgabe
```

## Frontend

Das bestehende React-Projekt liegt unter `frontend/`.

```bash
cd frontend
npm install
npm run dev
```

Weitere Details stehen in [frontend/README.md](frontend/README.md).

## Backend

Das Backend wird unter `backend/` aufgebaut. Der Bereich ist vorbereitet, enthält aber noch keine implementierte API.

Geplanter Stack:

- Node.js
- Express
- PostgreSQL
- Prisma
- Zod
- Clerk-Backend-Integration oder JWT-Prüfung
- API-Tests mit Supertest und einem passenden Test-Runner

Weitere Details stehen in [backend/README.md](backend/README.md).

## Dokumentation

Die Modulabschlussplanung steht in:

- [backend-workflow.md](backend-workflow.md)
- [backend-kursregeln.md](backend-kursregeln.md)
- [projekt-arbeitsplan.md](projekt-arbeitsplan.md)

