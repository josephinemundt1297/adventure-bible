# Projekt-Arbeitsplan

## Ziel

Adventure Bible bekommt für den Backend-Modulabschluss eine produktionsreife REST-API.

Die API soll den bestehenden Produkt-Loop serverseitig unterstützen:

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

## Stand am 30.09.2026, 10:24 Uhr

Das vorhandene Repository enthält ein React-Frontend mit dokumentiertem Produkt-Loop.

Der Backend-Modulabschluss startet mit Planung:

- Anforderungen aus der Modulaufgabe sind gelesen.
- Tagesdokumentation für den 30.09.2026 ist vorhanden.
- Der erste sinnvolle Backend-Scope ist noch zu konkretisieren.
- Backend-Code, Datenbankmodell, Tests und Deployment sind noch nicht angelegt.

## Kleinster sinnvoller Backend-Scope

### Kern-Entitäten

| Entität | Zweck | Beziehung |
|---|---|---|
| UserProfile | Adventure-Bible-Profil eines angemeldeten Nutzers | besitzt HP-Checks, QuestLogs und JournalEntries |
| HpCheck | gespeicherter großer oder kleiner Zustand | gehört zu einem UserProfile |
| Quest | Quest-Vorlage oder nutzereigene Quest | kann in QuestLogs verwendet werden |
| QuestLog | gestartete, abgeschlossene oder verschobene Quest | gehört zu UserProfile und Quest |
| JournalEntry | Tagesnotiz oder Tagesereignis | gehört zu UserProfile, optional zu QuestLog oder HpCheck |

### Erste Endpunktgruppen

- `GET /health` für technischen Healthcheck
- `GET /api/profile` und `PUT /api/profile` für das eigene Profil
- `POST /api/hp-checks` und `GET /api/hp-checks` für HP-Verlauf
- `GET /api/quests`, `POST /api/quests`, `PATCH /api/quests/:id`, `DELETE /api/quests/:id` für Quests
- `POST /api/quest-logs`, `PATCH /api/quest-logs/:id`, `GET /api/quest-logs` für Quest-Verlauf
- `POST /api/journal-entries`, `GET /api/journal-entries` für Tagesjournal

Die genauen Request- und Response-Formate werden vor der Implementierung dokumentiert.

## Arbeitsplan bis zur Abgabe

### Phase 1: Planung und API-Design

- Zweck und Zielgruppe der API formulieren.
- Datenmodell und Beziehungen festlegen.
- ERD oder gleichwertiges Datenmodelldiagramm erstellen.
- Endpunkte, Methoden, Statuscodes und Beispielantworten dokumentieren.
- Authentifizierungs- und Autorisierungsansatz festlegen.
- Sicherheitsmaßnahmen und nicht relevante Maßnahmen begründen.

### Phase 2: Backend-Grundstruktur

- Backend-Ordner oder separates Backend-Repository festlegen.
- Express-App mit zentralem Error-Handling aufsetzen.
- Environment-Konfiguration mit `.env.example` vorbereiten.
- Prisma und PostgreSQL konfigurieren.
- Datenmodell als Prisma-Schema anlegen.
- Erste Migration erstellen.

### Phase 3: Kern-Endpunkte

- Profil-Endpunkte implementieren.
- HP-Check-Endpunkte implementieren.
- Quest-Endpunkte implementieren.
- QuestLog-Endpunkte implementieren.
- JournalEntry-Endpunkte implementieren.
- Konsistente JSON-Antworten sicherstellen.

### Phase 4: Sicherheit und Validierung

- Zod-Schemas für Request-Daten anlegen.
- Authentifizierung und serverseitige Autorisierung integrieren.
- CORS gezielt konfigurieren.
- Rate Limiting für schreibende oder sensible Routen aktivieren.
- Fehlerantworten prüfen.

### Phase 5: Tests und Dokumentation

- API-Tests für erfolgreiche Requests schreiben.
- Tests für ungültige Eingaben schreiben.
- Tests für Auth- und Autorisierungsfehler schreiben.
- Tests für nicht gefundene Ressourcen schreiben.
- README mit Setup, Tests, API-Dokumentation und Datenmodell aktualisieren.

### Phase 6: Deployment und Abgabe

- Deployment-Ziel festlegen.
- Produktionskonfiguration prüfen.
- Live-URL testen.
- README um Live-URL ergänzen.
- Abgabeinformationen vorbereiten.

## Risiko am 30.09.2026

Das größte Risiko ist ein zu großer Scope. Adventure Bible hat viele mögliche Erweiterungen, aber der Modulabschluss braucht zuerst eine stabile und erklärbare API.

Gegenmaßnahme:

- Kern-Entitäten zuerst fertig planen.
- Erweiterungen wie Achievements, Inventar und komplexe Statistik bewusst zurückstellen.
- Jede neue Idee gegen die Modulanforderungen prüfen.

## Tagespriorität für den 30.09.2026

1. Backend-Scope für Adventure Bible festlegen.
2. Kern-Entitäten und Beziehungen dokumentieren.
3. Erste Endpunktgruppen und Risiken notieren.
