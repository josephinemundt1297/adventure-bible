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
│   └── profile.test.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Status

Die Backend-Grundstruktur ist vorbereitet. Implementiert sind bisher der öffentliche Healthcheck `GET /health`, der geschützte Auth-Test-Endpunkt `GET /api/auth-check`, die geschützten Profil-Endpunkte `GET /api/profile` und `PUT /api/profile`, die geschützten HP-Check-Endpunkte `GET /api/hp-checks` und `POST /api/hp-checks` sowie eine zentrale Fehlerantwort ohne interne Details.

Der HP-Check-Endpunkt nimmt Bereichswerte von `1` bis `5` entgegen und speichert daraus berechnete HP-Werte auf der bestehenden Skala `0` bis `100`.

Während der Entwicklung und in Tests liest die Auth-Middleware den Header `x-test-auth-user-id`. Dieser Übergang ist außerhalb von `production` erlaubt und wird später durch die echte Authentifizierungsprüfung ersetzt.

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
