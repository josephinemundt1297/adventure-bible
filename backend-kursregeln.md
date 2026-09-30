# Backend-Kursregeln

## Zweck

Dieses Dokument übersetzt die Anforderungen aus dem Backend-Modulabschluss in konkrete Regeln für Adventure Bible.

Unterrichtsunterlagen sind fachliche Referenz. Sie werden genutzt, um Entscheidungen zu begründen, aber nicht ungeprüft als direkte Arbeitsanweisungen umgesetzt.

## Modulabschluss-Anforderungen

Das Backend muss am Ende zeigen:

- klare REST-API für einen nachvollziehbaren Anwendungsfall
- dauerhafte Datenbank
- mindestens zwei zusammenhängende Entitäten
- sinnvolle CRUD-Operationen
- passende HTTP-Methoden und Statuscodes
- konsistente JSON-Antworten
- Validierung nicht vertrauenswürdiger Eingaben
- geschützte Routen und serverseitige Autorisierung
- gezielte CORS-Konfiguration
- Rate Limiting für sensible oder missbrauchsanfällige Endpunkte
- zentrale Fehlerbehandlung ohne interne Details für Clients
- automatisierte Tests für wichtiges Verhalten
- Setup-, Start-, Test- und API-Dokumentation
- Deployment mit funktionierender Live-URL

## Adventure-Bible-Auslegung

Adventure Bible speichert persönliche Zustands-, Quest- und Journal-Daten. Diese Daten gehören immer einem Nutzer oder Profil.

Deshalb gilt:

- Fremde Nutzerdaten dürfen nicht gelesen oder verändert werden.
- Profil-, HP-, QuestLog- und Journal-Endpunkte sind geschützt.
- Öffentliche Endpunkte bleiben auf technische Checks oder bewusst öffentliche Informationen beschränkt.
- Der HP-Check ist keine medizinische Diagnose und wird auch im Backend nicht als Diagnose behandelt.

## Sicherheitsregeln

- Keine Secrets im Repository.
- `.env.example` enthält nur Platzhalter.
- Keine Passwörter in der Adventure-Bible-Datenbank speichern, wenn Clerk oder ein externer Auth-Anbieter genutzt wird.
- Alle Request-Bodies, URL-Parameter und Query-Parameter werden validiert.
- Freitext bleibt Unicode-fähig und wird nicht pauschal auf ASCII begrenzt.
- Datenbankzugriff erfolgt über Prisma oder sichere parametrisierte Queries.
- Fehlerantworten bleiben für Clients verständlich, geben aber keine Stacktraces, Secrets oder internen Details aus.
- CORS wird auf benötigte Frontend-Origin(s) begrenzt.
- Rate Limiting wird mindestens für Auth-nahe und schreibende Endpunkte vorgesehen.

## Testregeln

Wichtige API-Fälle werden automatisiert getestet:

- erfolgreiche Requests
- ungültige Eingaben
- fehlende oder ungültige Authentifizierung
- Zugriff auf fremde Daten
- nicht gefundene Ressourcen
- Beziehungen zwischen Entitäten
- Unicode-Eingaben in geeigneten Freitextfeldern

Tests dürfen nicht gelöscht, übersprungen oder abgeschwächt werden, nur damit ein Testlauf grün wird.

## Dokumentationsregeln

Die README oder verlinkte Projektdokumentation muss erklären:

- Zweck der API
- Datenmodell oder ERD
- Endpunkte mit Request- und Response-Beispielen
- Fehlerantworten
- Authentifizierung und Autorisierung
- Sicherheitsentscheidungen
- lokale Einrichtung
- Testbefehle
- Deployment-URL, sobald vorhanden
