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
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.ts
│   ├── config.ts
│   └── server.ts
├── tests/
│   └── health.test.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Status

Die Backend-Grundstruktur ist vorbereitet. Implementiert ist bisher nur der öffentliche Healthcheck `GET /health`.

Der erste API-Plan steht in [api-plan.md](api-plan.md).

Das erste Datenmodell steht in [data-model.md](data-model.md).

Der erste Prisma-Plan steht in [prisma-plan.md](prisma-plan.md).

Die Auth-Übergangsstrategie steht in [auth-strategy.md](auth-strategy.md).

## Lokale Entwicklung

Dependencies installieren:

```bash
npm install
```

Entwicklungsserver starten:

```bash
npm run dev
```

Tests ausführen:

```bash
npm test
```

Build prüfen:

```bash
npm run build
```
