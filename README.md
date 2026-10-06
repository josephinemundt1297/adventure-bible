# 🧭 Adventure Bible

> Dein Leben. Dein Abenteuer. Deine Regeln.

Adventure Bible ist eine mobile-first App für Alltag, Selbstfürsorge und Aufgabenplanung mit ruhigen RPG-Elementen. Die App soll nicht antreiben um jeden Preis, sondern den aktuellen Zustand des Nutzers ernst nehmen und daraus einen passenden nächsten Schritt ableiten.

![Adventure Bible Layout-Idee](frontend/LayoutIdee.png)

## ✨ Auf Einen Blick

| Bereich | Stand |
|---|---|
| Produktidee | Mobile-first Quest- und Selbstfürsorge-App |
| MVP-Ziel | Gemeinsamer Frontend-Backend-MVP |
| Authentifizierung | Clerk wird genutzt, weil es die Anmeldung zuverlässig übernimmt und gut zum bestehenden Frontend passt |
| HP-Bereiche | Energie, Fokus, Stimmung, Körper |
| Datenhaltung | MVP-Daten sollen über das Backend gespeichert werden |
| Langfristiges Ziel | PWA für einen kleinen Freundeskreis |
| Abgabetermin | 19.10.2026 |

## 🌿 Produktidee

Adventure Bible stellt nicht die Frage: „Was musst du heute alles schaffen?“

Die App fragt zuerst: „Wie geht es dir gerade, und welcher nächste Schritt passt dazu?“

Der zentrale Loop:

```text
Profil und Onboarding
-> großer HP-Check
-> aktueller Zustand
-> passende Quest
-> Quest starten
-> Quest abschließen
-> XP / Quest Points / Achievement
-> Mini HP-Check
-> neue Quest oder Lagerfeuer
-> Tagesjournal / Verlauf
```

Der HP-Check ist keine medizinische Diagnose. Er dient dazu, den eigenen Zustand bewusster wahrzunehmen und daraus eine passende, machbare Handlung abzuleiten.

## 🎯 MVP-Scope

Der MVP ist ein gemeinsamer Frontend-Backend-MVP. Die App soll nicht nur lokal im Browser funktionieren, sondern die notwendigen MVP-Daten über das Backend speichern und wieder laden können.

| Gehört zum MVP | Nicht Teil des MVP |
|---|---|
| abgespecktes Onboarding mit Clerk, Anzeigename und Pronomen | ausführliche Charakter-Erstellung |
| Profil mit XP, Level und Quest Points | Inventar |
| vier HP-Bereiche | Routinen |
| großer HP-Check und Mini HP-Check | erweiterte Statistiken |
| adaptive Quest-Auswahl | KI-Unterstützung |
| Quests starten und abschließen | App-Store-Veröffentlichung |
| Achievements | große öffentliche Nutzerbasis |
| Tagesplan, Journal, Reflexion und Kalender |  |
| Backend-Persistenz für Profil, HP-Checks, Quests, QuestLogs, JournalEntries und PlanActivities |  |

## 🧩 Projektstatus

| Bereich | Umgesetzt | Offen |
|---|---|---|
| Frontend | App-Shell, HP-Checks, Quests, Plan, Kalender, Reflexion, Profil, Achievements, Backend-Anbindung für Profil, große und kleine HP-Checks, QuestLogs, Reflexion und Plan/Kalender | finale manuelle Accessibility-Abnahme |
| Backend | Express-Grundstruktur, Prisma/PostgreSQL, Profil, HP-Checks, Quests, QuestLogs, JournalEntries, PlanActivities, Tests, Clerk-Token-Prüfung im lokalen Flow | Produktionskonfiguration final prüfen |
| Deployment | Frontend ist lokal und als Web-App gedacht | Backend-Deployment, Live-URL, produktive Umgebungsvariablen |
| Dokumentation | README-Struktur, Backend-Pläne, Datenmodell, Auth-Strategie | finale API-Beispiele und Deployment-Notizen |

## 🚀 Langfristige App-Vision

Adventure Bible soll langfristig als kleine, verlässliche App für einen kleinen Freundeskreis nutzbar sein. Für dieses Ziel ist zuerst eine PWA sinnvoll: installierbar, teilbar per Link und ohne App-Store-Kosten.

Geplante Richtung:

- PWA statt App Store / Play Store
- kostenloser oder kostenkontrollierter Betrieb über Free-Tier-Angebote
- Clerk bleibt vorerst für Authentifizierung
- PostgreSQL bleibt Datenbasis
- Supabase wird später in einem separaten kleinen Projekt getestet
- langfristig: Charakter-Erstellung, Inventar, Routinen, erweiterte Statistiken und mehr RPG-Elemente

Hinweis: Die Freundeskreis-Nutzung ist kostenfrei geplant, bleibt aber abhängig von Free-Tier-Limits der eingesetzten Dienste.

## 🛠️ Tech Stack

| Frontend | Backend |
|---|---|
| React | Node.js |
| TypeScript | Express |
| Vite | TypeScript |
| TanStack Router | PostgreSQL |
| Tailwind CSS | Prisma |
| DaisyUI | Zod |
| Clerk | Helmet, CORS, Rate Limiting |
| Vitest | Vitest, Supertest |

## 📁 Projektstruktur

```text
adventure-bible/
├── frontend/              # React-, TypeScript- und Vite-App
├── backend/               # REST-API mit Datenbank
├── docs/                  # Produkt-, Architektur- und Sicherheitsdokumentation
├── skills/                # Projektspezifische Agentic-Workflow-Dateien
├── AGENTS.md              # Verbindliche Arbeitsregeln
├── backend-workflow.md    # Backend-Arbeitsweise
├── backend-kursregeln.md  # Modulabschluss-Regeln für das Backend
└── projekt-arbeitsplan.md # Backend-Arbeitsplan bis zur Abgabe
```

## 💻 Lokale Entwicklung

Frontend starten:

```bash
cd frontend
npm install
npm run dev
```

Backend starten:

```bash
cd backend
npm install
npm run dev
```

Weitere Details:

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

## 🧪 Tests und Qualität

Frontend:

```bash
cd frontend
npm test
npm run lint
npm run build
```

Backend:

```bash
cd backend
npm test
npm run build
```

## 📚 Dokumentation

| Dokument | Zweck |
|---|---|
| [Projekt-Arbeitsplan](projekt-arbeitsplan.md) | Backend-Arbeitsphasen und Scope |
| [Backend-Workflow](backend-workflow.md) | Arbeitsweise für Backend-Tasks |
| [Backend-Kursregeln](backend-kursregeln.md) | Modulabschluss-Regeln |
| [Backend API-Plan](backend/api-plan.md) | Endpunkte, Antwortformate, Fehlerfälle |
| [Backend Datenmodell](backend/data-model.md) | Entitäten und Beziehungen |
| [Backend Auth-Strategie](backend/auth-strategy.md) | Übergang von Test-Auth zu Clerk |
| [Produktdokumentation](docs/PROJECT.md) | Produktvision und Prinzipien |
| [Features](docs/FEATURES.md) | MVP und spätere Funktionen |
| [Roadmap](docs/ROADMAP.md) | Entwicklungsstand und nächste Schritte |
| [TODO](TODO.md) | Konkrete offene Aufgaben bis zum vollständigen MVP |
