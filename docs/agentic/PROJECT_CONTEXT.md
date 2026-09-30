# Adventure Bible – Agentic Project Context

> Dieses Dokument enthält nur belegte Informationen aus dem Repository. Fehlende Informationen werden als offen markiert.

## Überblick

- Projektname: Adventure Bible
- Fachlicher Zweck: Mobile-first Habit Tracker mit RPG-Elementen
- Haupttechnologien Frontend: React + TypeScript + Vite
- UI-System: DaisyUI, vorgesehen für die Implementierung
- Authentifizierung: Clerk, für die spätere Backend-Phase vorgesehen
- Test-Stack: Vitest + React Testing Library, für die Projektumsetzung vorgesehen

## Aktueller Projektstand

Der MVP befindet sich vor der eigentlichen Feature-Implementierung.
Die Produkt-, Design-, Accessibility-, Security-, Architektur-, Roadmap- und Agentic-Dokumentation definiert den geplanten Rahmen.

## Struktur

| Bereich | Pfad | Aufgabe | Status |
|---|---|---|---|
| Frontend | `frontend/` | React-, TypeScript- und Vite-App | vorhanden |
| Backend | `backend/` | REST-API für den Modulabschluss | vorbereitet |
| Einstiegspunkt | `frontend/src/main.tsx` | React-Einstiegspunkt | vorhanden |
| App | `frontend/src/App.tsx` | Haupt-App-Komponente | vorhanden |
| Styling | `frontend/src/index.css` | globale Styles | vorhanden |
| Routing | `frontend/src/routes/` | Navigation/Routing | vorhanden |
| UI/Komponenten | `frontend/src/` | React-Komponenten | vorhanden |
| State | offen | Domain-/UI-State | noch nicht festgelegt |
| API/Daten | `backend/` | Datenzugriff | geplant |
| Tests | `frontend/tests/` | Unit-/Logiktests | vorhanden |

## Tooling und Befehle

Befehle dürfen erst in den Projektkontext eingetragen werden, wenn sie im Repository durch `package.json`, Lockfile oder andere Projektkonfiguration belegt sind.

| Zweck | Befehl | Quelle | Status |
|---|---|---|---|
| Installation Frontend | `cd frontend && npm install` | `frontend/package.json` / npm-Projekt | bestätigt |
| Entwicklung Frontend | `cd frontend && npm run dev` | `frontend/package.json` | bestätigt |
| Build Frontend | `cd frontend && npm run build` | `frontend/package.json` | bestätigt |
| Tests Frontend | `cd frontend && npm test` | `frontend/package.json` | bestätigt |
| Lint Frontend | `cd frontend && npm run lint` | `frontend/package.json` | bestätigt |
| Typecheck Frontend | `cd frontend && npm run build` | `frontend/package.json` / TypeScript-Konfiguration | bestätigt |
| E2E | offen | noch keine Konfiguration | nicht eingerichtet |

## Architektur und Konventionen

- Komponenten: React + TypeScript
- Styling: DaisyUI/Tailwind als geplantes UI-System
- Produktstruktur: feature-orientiert, sobald die Feature-Implementierung beginnt
- State: wird anhand der tatsächlichen Anforderungen festgelegt; keine unnötige globale State-Lösung
- Datenzugriff: zunächst lokaler/mock-basierter MVP; Backend später
- Authentifizierung: Clerk in der Backend-Phase
- Accessibility: `docs/ACCESSIBILITY.md` verbindlich
- Security: `docs/SECURITY.md` verbindlich

## Produktreferenzen

- `docs/PROJECT.md`
- `docs/FEATURES.md`
- `docs/DESIGN.md`
- `docs/ACCESSIBILITY.md`
- `docs/SECURITY.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`

## Risikobereiche

- Authentifizierung und Autorisierung bei der späteren Backend-Integration
- User Input und Datenbankzugriffe
- Unicode/Internationalisierung
- adaptive Quest-Logik
- Accessibility bei spielerischen UI-Elementen
- Scope-Ausweitung während der einwöchigen MVP-Entwicklung

## Unsicherheiten

| Aussage oder Frage | Status | Nächster Beleg |
|---|---|---|
| Routing-Lösung | offen | Architekturentscheidung vor Implementierung |
| State-Management | offen | tatsächlicher MVP-Bedarf |
| Backend-Implementierung | offen | Backend-Phase |
| Datenbank-Schema | offen | Backend-Phase |
