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

Das wird im zentralen Produkt-Loop durch das **Lagerfeuer** als bewusste
Recovery-Option nach einem Mini HP-Check sichtbar gemacht.

---

### 6. Der Nutzer bestimmt den Weg

Adventure Bible unterstützt Entscheidungen.

Die Anwendung schreibt dem Nutzer nicht vor,
wie sein Tag auszusehen hat.

Empfehlungen bleiben Empfehlungen.

---

## Zentraler Produkt-Loop

Adventure Bible arbeitet nicht mit einer statischen Aufgabenliste als
Hauptinteraktion. Der Nutzer durchläuft einen adaptiven Zyklus:

```text
App öffnen / neuer Abenteuerzyklus
          ↓
   großer HP-Check
          ↓
 HP-Zustand berechnen
          ↓
 Quest-Auswahl passend zu den HP
          ↓
     Quest erledigen
          ↓
 XP / Quest Points / Reward
          ↓
     Mini HP-Check
          ↓
    ┌──────────────┐
    │              │
 Neue Quest     Lagerfeuer
    │              │
    └──────┬───────┘
           ↓
      nächster Zustand
```

Der große HP-Check ist strukturiert: Für jeden HP-Bereich gibt es drei
Fragen mit jeweils fünf Antwortmöglichkeiten. Daraus wird der aktuelle
Ausgangszustand berechnet.

Der Mini HP-Check ist bewusst subjektiver: Der Nutzer schätzt sich nach
einer Quest pro Bereich selbst über einen Regler ein.

Der Vergleich zwischen Ausgangszustand und aktuellem Zustand soll langfristig
sichtbar machen, wie sich Aktivitäten auf den Nutzer auswirken.

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

Der **große HP-Check** verwendet pro Bereich drei Fragen mit jeweils fünf
Antwortmöglichkeiten. Die Antworten werden zu Bereichswerten und einem
Gesamtzustand zusammengeführt.

Der **Mini HP-Check** verwendet nach einer Quest Regler, über die der Nutzer
seinen aktuellen Zustand selbst einschätzt.

Die Werte dienen der Orientierung und Anpassung.

Sie sind keine medizinische Diagnose.

---

### XP und Quest Points

Erledigte Aktivitäten können XP und Quest Points vergeben.

XP machen Fortschritt sichtbar.

Nach einer abgeschlossenen Quest soll das Ergebnis unmittelbar
verständlich sein.

Beispiel:

```text
Quest abgeschlossen → +20 XP → Reward → Mini HP-Check
```

---

### Quests

Adventure Bible unterscheidet unter anderem:

- Main Quest
- Side Quest
- Daily Quest
- Recovery Quest

Quests können zeitlich geplant, empfohlen oder spontan erstellt werden.

Die Quest-Auswahl wird durch den aktuellen HP-Zustand beeinflusst.

Eine Quest kann verschoben oder bewusst nicht durchgeführt werden,
ohne dass dies automatisch als persönliches Versagen gewertet wird.

---

### Lagerfeuer

Nach dem Mini HP-Check kann der Nutzer eine neue Quest wählen oder zum
Lagerfeuer gehen.

Das Lagerfeuer ist eine bewusste Recovery-Mechanik und kein Zeichen des
Scheiterns.

Es macht das Prinzip sichtbar, dass Regeneration ein legitimer Bestandteil
des Fortschritts ist.

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
- tatsächliche Quest-Auswirkungen auf HP

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

Der große HP-Check darf bewusst etwas ausführlicher sein, weil er die
Grundlage für die adaptive Quest-Auswahl bildet. Der Mini HP-Check muss dagegen
so kurz wie möglich bleiben.

Freitext wird dort verwendet, wo er echten Mehrwert bietet,
nicht als Standard für jede Interaktion.

---

## Unicode und internationale Zeichen

Adventure Bible behandelt Unicode als normalen Bestandteil der Anwendung.

Benutzernamen, Charakternamen, Quest-Titel, Beschreibungen und andere
geeignete User-Inhalte dürfen internationale Zeichen enthalten.

Dazu gehören unter anderem:

- Umlaute und `ß`
- Akzente und diakritische Zeichen
- kyrillische, griechische, arabische und CJK-Zeichen
- Emojis, sofern das jeweilige Feld sie erlaubt

Die Anwendung darf legitime Sonderzeichen nicht pauschal ablehnen,
nur weil sie technisch einfacher zu validieren wären.

Unicode-Unterstützung ist Bestandteil der technischen Basis.

Mehrsprachigkeit und Übersetzungen sind dagegen ein separates Feature
und werden später bewusst geplant.

---

## Sicherheit und Authentifizierung

Sicherheit wird als Produktanforderung behandelt und nicht erst mit dem
Backend nachträglich ergänzt.

Für die spätere Authentifizierungsintegration ist **Clerk** vorgesehen.

Clerk soll die Authentifizierung und Session-Verwaltung übernehmen,
anstatt dass Adventure Bible Passwörter selbst verwaltet.

Die spätere Adventure-Bible-Datenbank soll ausschließlich die Daten speichern,
die die Anwendung tatsächlich benötigt. Authentifizierungsgeheimnisse und
Passwörter gehören nicht in die eigene Anwendungsdatenbank, wenn diese
Verantwortung bei Clerk liegt.

User Input wird auch bei Unicode-Zeichen als nicht vertrauenswürdig behandelt.
Sicherheit entsteht nicht durch das Verbot von Sonderzeichen, sondern durch
sichere Verarbeitung, kontextgerechte Ausgabe, sichere Datenbankzugriffe,
Authentifizierung und serverseitige Autorisierung.

Die detaillierten Sicherheitsregeln stehen in `docs/SECURITY.md`.

---

## MVP

Der React-MVP konzentriert sich auf den zentralen Produkt-Loop:

Profil
↓
Charakter
↓
Großer HP-Check
↓
HP-Zustand berechnen
↓
passende Quest sehen
↓
Quest durchführen
↓
XP / Quest Points / Reward
↓
Mini HP-Check
↓
Neue Quest oder Lagerfeuer

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
- Clerk-basierte Authentifizierung

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
