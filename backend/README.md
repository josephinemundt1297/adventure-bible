# Adventure Bible Backend

Dieser Ordner ist für die REST-API des Backend-Modulabschlusses vorbereitet.

## Ziel

Das Backend soll den Adventure-Bible-Loop serverseitig speichern und über klare REST-Endpunkte verfügbar machen:

- Profil eines angemeldeten Nutzers
- HP-Checks
- Quests
- Quest-Verlauf
- Tagesjournal

## Geplanter Aufbau

```text
backend/
├── src/       # Express-App, Routen, Controller, Services, Middleware
├── prisma/    # Prisma-Schema und Migrationen
├── tests/     # API- und Integrationstests
└── README.md
```

## Status

Noch keine API implementiert. Der nächste Schritt ist die konkrete API-Planung mit Datenmodell, Endpunkten, Authentifizierung, Sicherheitsmaßnahmen und Teststrategie.

