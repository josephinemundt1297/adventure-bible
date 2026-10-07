# Auth-Strategie

## Stand

- Datum: 06.10.2026
- Branch: `feature`
- Status: Clerk-Backend-Prüfung vorbereitet, Frontend-Token-Weitergabe noch offen

## Ziel

Alle persönlichen `/api/*`-Routen sollen serverseitig geschützt werden. Das Backend darf nicht darauf vertrauen, dass das Frontend eine Schaltfläche versteckt oder einen Nutzer nur clientseitig prüft.

## Zielbild

Das Backend erkennt den angemeldeten Nutzer über Clerk. Dafür wird in Express die offizielle Clerk-Middleware genutzt. Sie prüft Clerk-Session-Tokens aus Cookies oder `Authorization: Bearer ...` und stellt die Clerk-User-ID bereit.

Regeln:

- Das Backend speichert keine Passwörter.
- `authUserId` kommt aus geprüfter Authentifizierung, nicht aus dem Request-Body.
- Jede geschützte Ressource wird zusätzlich gegen das eigene `UserProfile` autorisiert.
- `GET /health` bleibt öffentlich.

## Aktueller Übergang für lokale Entwicklung

Für lokale Tests und Postman gibt es weiterhin eine Test-/Development-Middleware:

- Header: `x-test-auth-user-id`
- nur außerhalb von `NODE_ENV=production`
- setzt `request.auth.authUserId`
- fehlt der Header, antwortet die API mit `401`

Dieser Header ist keine Produktions-Authentifizierung. Er dient nur dazu, geschützte Routen, Autorisierung und Tests lokal sauber prüfen zu können.

## Clerk-Backend-Prüfung

Das Backend nutzt `@clerk/express`:

- `clerkMiddleware()` wird aktiviert, wenn echte Clerk-Keys vorhanden sind.
- `getAuth(request)` liest die geprüfte Clerk-Authentifizierung.
- `request.auth.authUserId` wird aus der Clerk-`userId` gesetzt.
- In `production` wird der Entwicklungsheader ignoriert.
- In `production` müssen `CLERK_PUBLISHABLE_KEY` und `CLERK_SECRET_KEY` gesetzt sein, sonst startet das Backend nicht.

Benötigte `.env`-Variablen:

```env
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Erste Test-Route

`GET /api/auth-check`

- ohne Header: `401`
- mit `x-test-auth-user-id`: `200` und die erkannte `authUserId`
- mit gültigem Clerk-Token: `200` und die erkannte Clerk-User-ID

Diese Route ist nur ein technischer Prüfpunkt für die Auth-Middleware. Fachliche Profilrouten bauen später auf derselben Middleware auf.

## Nächster Schritt

Das Frontend muss bei API-Requests den Clerk-Session-Token mitsenden, zum Beispiel als:

```text
Authorization: Bearer <clerk-session-token>
```

Danach kann der lokale Entwicklungsheader schrittweise aus der normalen manuellen Nutzung verschwinden. Für Tests bleibt er außerhalb von `production` erlaubt.
