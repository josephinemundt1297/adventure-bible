# Adventure Bible – Deployment

## Zweck

Dieses Dokument erklärt die geplante Deployment-Strategie für den gemeinsamen Frontend-Backend-MVP.

Wichtig ist dabei nicht nur, **wo** die App laufen soll, sondern auch **warum** diese Lösung gewählt wurde. Adventure Bible soll langfristig als kleine PWA für einen begrenzten Freundeskreis nutzbar sein, möglichst ohne laufende Kosten.

---

# 1. Zielarchitektur

| Teil | Geplante Lösung | Grund |
|---|---|---|
| Frontend | Netlify | Das Frontend ist eine Vite/React-App und kann als statische Web-App einfach veröffentlicht werden. |
| Backend | Render Free Web Service | Das Backend ist eine Express-API und braucht einen echten Node.js-Server. Render ist dafür einfach genug für den MVP. |
| Datenbank | Neon Free Postgres | Das Projekt nutzt bereits PostgreSQL und Prisma. Neon passt deshalb besser als ein kompletter Plattformwechsel. |
| Authentifizierung | Clerk | Clerk ist bereits im Frontend und Backend angebunden. Ein Wechsel würde den MVP unnötig vergrößern. |

Diese Kombination hält Frontend, Backend, Datenbank und Auth sauber getrennt. Das ist für den Modulabschluss gut erklärbar und später leichter austauschbar.

---

# 2. Warum nicht alles bei einem Anbieter?

Für Adventure Bible ist gerade wichtig, dass der MVP stabil und nachvollziehbar bleibt.

Darum wird nicht sofort auf eine große Komplettlösung umgebaut:

- Clerk bleibt, weil Authentifizierung bereits funktioniert.
- PostgreSQL bleibt, weil Prisma und Datenmodell bereits darauf aufgebaut sind.
- Supabase wird später separat getestet, aber nicht mitten im MVP eingeführt.
- Netlify bleibt für das Frontend, weil die App dort bereits gut als Website/PWA gedacht ist.

Das Ziel ist nicht die perfekte Langzeitarchitektur, sondern eine **kostenfreie oder kostenkontrollierte MVP-Architektur**, die gut zur bestehenden App passt.

---

# 3. Erwartete Einschränkungen

## Render Free Web Service

Render Free Services können nach Inaktivität einschlafen. Für einen kleinen Freundeskreis ist das akzeptabel, bedeutet aber:

- der erste Request nach einer Pause kann langsam sein,
- die API kann sich beim ersten Laden kurz verzögert anfühlen,
- für eine spätere größere Nutzung müsste ein bezahlter oder anderer Hosting-Weg geprüft werden.

## Neon Free Postgres

Neon ist für kleine Projekte geeignet, hat aber Free-Tier-Limits. Für den MVP reicht das voraussichtlich, weil Adventure Bible nur kleine Text-, Status- und Tagesdaten speichert.

Wichtig:

- keine großen Dateien in PostgreSQL speichern,
- keine sensiblen Geheimnisse in der Datenbank speichern,
- Datenmodell klein halten,
- Limits regelmäßig prüfen, falls Freunde die App später wirklich nutzen.

## Clerk Free Tier

Clerk ist für kleine Projekte geeignet, aber langfristig abhängig von den jeweils aktuellen Free-Tier-Grenzen.

Wichtig:

- Clerk bleibt für Auth,
- Adventure Bible speichert keine Passwörter selbst,
- Backend prüft produktiv Clerk-Tokens,
- Nutzerprofil-Daten bleiben in der eigenen Datenbank.

---

# 4. Umgebungsvariablen

## Frontend auf Netlify

Diese Werte gehören in Netlify als Environment Variables, nicht in das Repository:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
VITE_API_BASE_URL=https://deine-backend-url.onrender.com
```

`VITE_API_BASE_URL` sagt dem Frontend, wohin API-Requests gesendet werden. Lokal ist das `http://localhost:3000`, produktiv ist es die Render-URL.

## Backend auf Render

Diese Werte gehören in Render als Environment Variables:

```env
DATABASE_URL=postgresql://...
CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
FRONTEND_ORIGIN=https://deine-netlify-url.netlify.app
NODE_ENV=production
```

`FRONTEND_ORIGIN` ist wichtig für CORS. Das Backend soll in Production nur Requests vom echten Frontend erlauben.

`CLERK_SECRET_KEY` ist geheim und darf niemals ins Repository.

---

# 5. Prisma im Deployment

Lokal wird weiter dieses Skript genutzt:

```bash
npm run prisma:migrate
```

Das nutzt `prisma migrate dev` und ist für Entwicklung gedacht.

Für Deployment wird dieses Skript genutzt:

```bash
npm run prisma:migrate:deploy
```

Das nutzt `prisma migrate deploy` und wendet vorhandene Migrationen auf die Produktionsdatenbank an. Das ist kontrollierter, weil im Deployment keine neue Entwicklungs-Migration erzeugt werden soll.

---

# 6. Backend Build und Start

Geplante Render-Befehle:

```bash
npm install
npm run prisma:generate
npm run build
npm run prisma:migrate:deploy
```

Start-Befehl:

```bash
npm run start
```

Hinweis: Falls Render Build- und Start-Schritte getrennt konfiguriert, gehört `npm run prisma:migrate:deploy` in den Build- oder Pre-Deploy-Schritt. Wichtig ist nur, dass Migrationen vor dem Start der produktiven API auf der Datenbank angekommen sind.

---

# 7. Nach dem Deployment testen

## Backend

1. `GET /health`
2. `GET /api/auth-check` mit echtem Clerk-Login über das Frontend
3. `PUT /api/profile`
4. großer HP-Check speichern
5. Mini-HP-Check speichern
6. Quest starten und abschließen
7. Reflexion speichern
8. Plan-Aktivität anlegen, ändern, löschen

## Frontend

1. Netlify-Seite öffnen
2. einloggen
3. Profil prüfen
4. HP-Check durchführen
5. Seite neu laden
6. prüfen, ob Daten erhalten bleiben
7. Kalender/Plan prüfen
8. Lighthouse im Production-Build erneut prüfen
9. PWA-Installierbarkeit prüfen

---

# 8. Noch offene Entscheidungen

- echte Netlify-URL eintragen
- echte Render-URL eintragen
- Neon-Projekt anlegen
- Production-Clerk-Keys oder passende Clerk-Umgebung festlegen
- finale Screenreader-Prüfung durchführen
- Production-Lighthouse prüfen

