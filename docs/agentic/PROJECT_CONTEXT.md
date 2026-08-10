# Adventure Bible – Agentic Project Context

> Dieses Dokument enthält nur belegte Informationen aus dem Repository. Fehlende Informationen werden als offen markiert.

## Überblick

- Projektname: Adventure Bible
- Fachlicher Zweck: Mobile-first Habit Tracker mit RPG-Elementen
- Haupttechnologien: React + TypeScript + Vite
- UI-System: DaisyUI, vorgesehen für die Implementierung
- Authentifizierung: Clerk, für die spätere Backend-Phase vorgesehen
- Test-Stack: Vitest + React Testing Library, für die Projektumsetzung vorgesehen

## Aktueller Projektstand

Der MVP befindet sich vor der eigentlichen Feature-Implementierung.
Die Produkt-, Design-, Accessibility-, Security-, Architektur-, Roadmap- und Agentic-Dokumentation definiert den geplanten Rahmen.

## Struktur

| Bereich | Pfad | Aufgabe | Status |
|---|---|---|---|
| Einstiegspunkt | `src/main.tsx` | React-Einstiegspunkt | vorhanden |
| App | `src/App.tsx` | Haupt-App-Komponente | vorhanden |
| Styling | `src/index.css` | globale Styles | vorhanden |
| Routing | offen | Navigation/Routing | noch nicht implementiert |
| UI/Komponenten | `src/` | React-Komponenten | wird aufgebaut |
| State | offen | Domain-/UI-State | noch nicht festgelegt |
| API/Daten | offen | Datenzugriff | Backend später |
| Tests | offen | Unit-/Component-Tests | wird aufgebaut |

## Tooling und Befehle

Befehle dürfen erst in den Projektkontext eingetragen werden, wenn sie im Repository durch `package.json`, Lockfile oder andere Projektkonfiguration belegt sind.

| Zweck | Befehl | Quelle | Status |
|---|---|---|---|
| Installation | `npm install` | `package.json` / npm-Projekt | bestätigt |
| Entwicklung | `npm run dev` | `package.json` | bestätigt |
| Build | `npm run build` | `package.json` | bestätigt |
| Tests | offen | `package.json` | noch nicht eingerichtet |
| Lint | offen | `package.json` | noch nicht eingerichtet |
| Typecheck | offen | `package.json` / TypeScript-Konfiguration | noch zu prüfen |
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
| konkrete Test- und Lint-Commands | offen | `package.json` nach Tooling-Setup |
| Backend-Technologie | offen | Backend-Modul / spätere Architekturentscheidung |
| Datenbank | offen | Backend-Phase |
