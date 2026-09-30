# Backend-Workflow

## Zweck

Dieses Dokument beschreibt den Arbeitsablauf für das Adventure-Bible-Backend im Backend-Modulabschluss.

Der Workflow hilft dabei, nicht direkt in Code zu springen, sondern zuerst Zweck, Datenmodell, Endpunkte, Sicherheit, Tests und Deployment nachvollziehbar zu planen.

## Startpunkt

- Projektstart Backend-Workflow: 30.09.2026, 10:05 Uhr
- Aktueller Fokus am 30.09.2026 um 10:24 Uhr: Planung, Scope und Risiko einschätzen
- Grundlage: bestehendes Frontend-Projekt `adventure-bible`
- Repository-Struktur: bestehende React-App in `frontend/`, geplante REST-API in `backend/`
- Ziel: REST-API für serverseitige Persistenz und geschützte Nutzerdaten

## Arbeitsreihenfolge

1. Projektanforderungen lesen und in eigene Worte übersetzen.
2. Bestehenden Adventure-Bible-Loop verstehen.
3. Kleinsten sinnvollen Backend-Scope festlegen.
4. Kern-Entitäten und Beziehungen planen.
5. API-Endpunkte mit Methoden, Zweck und Beispielantworten skizzieren.
6. Authentifizierung und Autorisierung fachlich planen.
7. Sicherheitsmaßnahmen planen: Validierung, CORS, Rate Limiting, Fehlerbehandlung.
8. Teststrategie planen: Erfolg, ungültige Eingaben, nicht gefunden, nicht autorisiert.
9. Erst danach Backend-Grundstruktur anlegen.
10. Nach jeder Umsetzung Tests und Checks ausführen.
11. Dokumentation aktuell halten.
12. Tägliche Projekt-Updates vorbereiten.

## Backend-Scope für die erste stabile Version

Die erste Version soll den Kern von Adventure Bible speichern und abrufbar machen:

- Profil eines angemeldeten Nutzers
- großer HP-Check als Startzustand
- Quest-Katalog oder nutzereigene Quests
- QuestLog für gestartete und abgeschlossene Quests
- JournalEntry für Tagesverlauf und Reflexion

Nicht Teil der ersten stabilen Backend-Version:

- komplexe KI-Empfehlungen
- externe Kalenderintegration
- Inventar-System
- umfangreiche Achievements
- komplexe Statistik-Auswertung
- eigene Passwortverwaltung

## Geplanter technischer Stack

- Node.js als JavaScript-Laufzeit
- Express für REST-Endpunkte
- PostgreSQL für dauerhafte Speicherung
- Prisma für Datenmodell, Migrationen und Datenbankzugriff
- Zod für serverseitige Validierung
- Clerk-Backend-Integration oder JWT-basierte Prüfung für geschützte Routen
- Supertest mit Jest, Vitest oder Node-Test für API-Tests

Der genaue Test-Runner wird festgelegt, wenn das Backend-Projekt angelegt wird.

## Akzeptanzkriterien für Planung am 30.09.2026

- Der Backend-Zweck ist klar beschrieben.
- Der erste Scope ist kleiner als die langfristige Produktvision.
- Mindestens zwei zusammenhängende Entitäten sind geplant.
- Beziehungen zwischen den Entitäten sind erklärbar.
- Erste Endpunktgruppen sind erkennbar.
- Sicherheits- und Testthemen sind nicht auf später verschoben.
- Offene Fragen sind sichtbar.
