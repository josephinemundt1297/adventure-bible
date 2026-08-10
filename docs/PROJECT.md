cat > docs/PROJECT.md <<'EOF'

# Adventure Bible – Project

## Vision

Adventure Bible verwandelt den Alltag in ein persönliches Abenteuer.

Die Anwendung ist ein Habit Tracker mit spielerischen RPG-Elementen.
Der RPG-Aspekt soll Motivation und Orientierung schaffen, nicht zusätzlichen
Druck erzeugen.

> Dein Leben. Dein Abenteuer. Deine Regeln.

---

## Grundidee

Klassische Habit Tracker erwarten vom Nutzer, dass er sich an ein
festgelegtes System anpasst.

Adventure Bible verfolgt den umgekehrten Ansatz:

> Die App passt sich an den Nutzer an.

Der aktuelle Zustand des Nutzers beeinflusst,
welche Aufgaben sinnvoll erscheinen und wie Fortschritt dargestellt wird.

Ein energiearmer Tag wird deshalb nicht als schlechter Tag bewertet.

Eine kleine erledigte Aufgabe kann an diesem Tag genauso wertvoll sein
wie eine große Aufgabe an einem energiereichen Tag.

---

## Leitprinzipien

### 1. Die App passt sich an den Nutzer an

Es gibt nicht für jeden Tag dieselbe optimale Routine.

Die Anwendung berücksichtigt den aktuellen Zustand,
die vorhandenen Ressourcen und die Situation des Nutzers.

---

### 2. Energie ist eine Ressource

Energie ist begrenzt.

Die Anwendung soll den Nutzer nicht dazu motivieren,
seine Ressourcen ungeachtet seines Zustands aufzubrauchen.

Stattdessen soll sie helfen, mit vorhandener Energie sinnvoll umzugehen.

---

### 3. Kleine Schritte zählen

Fortschritt muss nicht groß sein.

Eine kleine Aufgabe kann ein sinnvoller Schritt sein,
wenn die verfügbaren Ressourcen begrenzt sind.

---

### 4. Fortschritt statt Perfektion

Nicht erledigte Aufgaben sind nicht automatisch ein Fehlschlag.

Das System soll Fortschritt sichtbar machen,
nicht Schuld oder Versagen erzeugen.

---

### 5. Regeneration ist eine Quest

Schlaf, Pause, Essen, Trinken und andere Formen der Regeneration
sind keine verlorene Zeit.

Sie sind Bestandteil des persönlichen Fortschritts.

---

### 6. Der Nutzer bestimmt den Weg

Adventure Bible unterstützt Entscheidungen.

Die Anwendung schreibt dem Nutzer nicht vor,
wie sein Tag auszusehen hat.

Empfehlungen bleiben Empfehlungen.

---

## Kernsysteme

### HP / Zustand

Der aktuelle Zustand des Nutzers kann mehrere Bereiche umfassen:

- Körper
- Energie
- Konzentration
- Stimmung
- Muskelzustand
- Ernährung
- Regeneration

Der Zustand wird über einfache Einschätzungen erfasst
und kann im Tagesverlauf aktualisiert werden.

Die Werte dienen der Orientierung und Anpassung.

Sie sind keine medizinische Diagnose.

---

### XP

Erledigte Aktivitäten können XP vergeben.

XP machen Fortschritt sichtbar.

Nach einer abgeschlossenen Quest soll das Ergebnis unmittelbar
verständlich sein.

Beispiel:

Quest abgeschlossen → +20 XP → Fortschrittsanzeige aktualisiert

---

### Quests

Adventure Bible unterscheidet unter anderem:

- Main Quest
- Side Quest
- Daily Quest
- Recovery Quest

Quests können zeitlich geplant, empfohlen oder spontan erstellt werden.

Eine Quest kann verschoben oder bewusst nicht durchgeführt werden,
ohne dass dies automatisch als persönliches Versagen gewertet wird.

---

## Anpassung

Die langfristige Vision umfasst eine Anwendung,
die aus dem Verhalten des Nutzers Muster erkennen kann.

Beispiele:

- wiederholt verschobene Aufgaben
- typische Energiezeiten
- funktionierende Routinen
- häufige Überforderung bei bestimmten Aufgabentypen
- passende Questgrößen

Die Anwendung soll Muster beschreiben,
nicht den Nutzer bewerten oder diagnostizieren.

---

## UX-Prinzipien

Adventure Bible soll möglichst wenig Eingabe benötigen,
aber möglichst hilfreiche Informationen liefern.

Bevorzugt werden:

- kurze Interaktionen
- Auswahlmöglichkeiten
- Checkboxen
- Slider oder einfache Bewertungen
- wiederkehrende Vorschläge
- später optional Spracheingabe

Freitext wird dort verwendet, wo er echten Mehrwert bietet,
nicht als Standard für jede Interaktion.

---

## MVP

Der React-MVP konzentriert sich auf den zentralen Produkt-Loop:

Profil
↓
Charakter
↓
Dashboard
↓
aktuellen Zustand einschätzen
↓
passende Quest sehen
↓
Quest durchführen
↓
Quest abschließen
↓
XP erhalten
↓
Fortschritt sehen

Der MVP soll diesen Loop verständlich und vollständig demonstrieren.

Nicht jedes langfristig geplante System muss Teil des MVP sein.

---

## Nicht-Ziele des MVP

Der MVP muss nicht vollständig enthalten:

- komplexe AI
- umfangreiche Mustererkennung
- vollständiges Inventarsystem
- komplexes Achievement-System
- umfassende Statistiken
- vollständige Kalenderintegration
- Voice Input
- Backend
- Authentifizierung
- Multiplayer
- komplexe RPG-Mechaniken

Diese Systeme können später ergänzt werden.

---

## Langfristige Vision

Die langfristige Adventure Bible kann unter anderem umfassen:

- intelligente Quest-Empfehlungen
- Mustererkennung
- Routinen
- Kalender
- Statistiken
- Achievements
- Inventar
- Buffs und Debuffs
- Journal
- Voice Input
- KI-Unterstützung
- Backend und Persistenz

Diese Vision darf den MVP nicht unnötig vergrößern.

---

## Entwicklungsregel

Wenn eine neue Idee auftaucht, wird zuerst geprüft:

1. Unterstützt sie den zentralen Produkt-Loop?
2. Ist sie für den MVP notwendig?
3. Verbessert sie die Nutzererfahrung deutlich?
4. Erzeugt sie mehr Komplexität als Nutzen?

Wenn sie nicht notwendig ist, wird sie dokumentiert
und für später zurückgestellt.
