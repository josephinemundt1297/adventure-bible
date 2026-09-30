# Auth-Strategie

## Stand

- Datum: 30.09.2026
- Branch: `feature`
- Status: Übergangsstrategie vor echter Clerk-Backend-Integration

## Ziel

Alle persönlichen `/api/*`-Routen sollen serverseitig geschützt werden. Das Backend darf nicht darauf vertrauen, dass das Frontend eine Schaltfläche versteckt oder einen Nutzer nur clientseitig prüft.

## Zielbild

Langfristig soll das Backend den angemeldeten Nutzer über Clerk oder eine gleichwertig geprüfte JWT-Strategie erkennen.

Regeln:

- Das Backend speichert keine Passwörter.
- `authUserId` kommt aus geprüfter Authentifizierung, nicht aus dem Request-Body.
- Jede geschützte Ressource wird zusätzlich gegen das eigene `UserProfile` autorisiert.
- `GET /health` bleibt öffentlich.

## Übergang für Version 1

Bis die echte Clerk-Backend-Integration umgesetzt wird, gibt es eine Test-/Development-Middleware:

- Header: `x-test-auth-user-id`
- nur außerhalb von `NODE_ENV=production`
- setzt `request.auth.authUserId`
- fehlt der Header, antwortet die API mit `401`

Dieser Header ist keine Produktions-Authentifizierung. Er dient nur dazu, geschützte Routen, Autorisierung und Tests sauber vorzubereiten.

## Erste Test-Route

`GET /api/auth-check`

- ohne Header: `401`
- mit `x-test-auth-user-id`: `200` und die erkannte `authUserId`

Diese Route ist nur ein technischer Prüfpunkt für die Auth-Middleware. Fachliche Profilrouten bauen später auf derselben Middleware auf.

## Nächster Schritt

Nach dieser Übergangsstrategie kann `GET /api/profile` und `PUT /api/profile` umgesetzt werden. Dabei wird `authUserId` aus `request.auth.authUserId` gelesen und nicht aus dem Request-Body.
