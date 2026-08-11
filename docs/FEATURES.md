# Adventure Bible – Features

## Zweck dieser Datei

Diese Datei beschreibt den Funktionsumfang von Adventure Bible und grenzt MVP, spätere Erweiterungen und langfristige Vision voneinander ab.

Sie dient als verbindliche Produktreferenz für Entwicklung und Agenten.

Eine Funktion darf nicht nur deshalb in den MVP aufgenommen werden, weil sie in der langfristigen Vision existiert.

---

# 1. MVP

Der MVP demonstriert den zentralen Adventure-Bible-Loop:

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

Der HP-Check ist dabei kein medizinisches Messinstrument und kein Zwangssystem. Er dient dazu, den Nutzer bewusst wahrnehmen zu lassen, welche Ressourcen gerade verfügbar sind, und die Quest-Auswahl daran anzupassen.

## 1.1 Profil-Erstellung

Der Nutzer kann ein persönliches Profil erstellen.

Das Profil bildet die Grundlage dafür, dass sich die Anwendung an den Nutzer und dessen Bedürfnisse anpassen kann.

Das Onboarding soll kurz und verständlich sein.

### Anforderungen

- Profil kann neu erstellt werden.
- Nutzer kann die für den MVP notwendigen persönlichen Einstellungen festlegen.
- Eingaben sind verständlich beschriftet.
- Pflichtangaben werden auf das notwendige Minimum reduziert.
- Der Nutzer weiß jederzeit, was als Nächstes benötigt wird.

---

## 1.2 Charakter

Das persönliche Profil wird spielerisch als Charakter dargestellt.

Der Charakter ist kein Bewertungssystem für den Nutzer.

Er dient als motivierende Darstellung des persönlichen Fortschritts.

### Anforderungen

- Charakter ist eindeutig dem Profil zugeordnet.
- Relevante Fortschrittsinformationen sind sichtbar.
- RPG-Elemente unterstützen die Orientierung, ohne zusätzliche Komplexität zu erzeugen.

---

## 1.3 Großer HP-Check

Der große HP-Check bildet den strukturierten Ausgangszustand eines neuen Abenteuerzyklus ab.

Für jeden definierten HP-Bereich werden **3 konkrete Fragen** gestellt.

Jede Frage besitzt **5 Antwortmöglichkeiten**.

Die Antworten werden zu einem Wert für den jeweiligen Bereich zusammengeführt. Aus den Bereichswerten entsteht der aktuelle HP-Gesamtzustand.

### Anforderungen

- Jeder HP-Bereich besitzt im MVP drei Fragen.
- Jede Frage bietet fünf klar unterscheidbare Antwortmöglichkeiten.
- Die Antwortwerte sind technisch eindeutig und testbar.
- Aus den Antworten wird ein nachvollziehbarer Bereichswert berechnet.
- Aus den Bereichswerten kann ein Gesamtzustand abgeleitet werden.
- Der Nutzer erhält eine verständliche Zusammenfassung seines Zustands.
- Der Check stellt keine medizinische Diagnose dar.
- Zustände werden nicht ausschließlich über Farbe kommuniziert.

### Aktuelle HP-Bereiche

Die bestehenden Produktdefinitionen sehen folgende Bereiche vor:

- Körper
- Energie
- Konzentration
- Stimmung
- Muskelzustand
- Ernährung
- Regeneration

Die genaue Gewichtung der Bereiche wird vor der Implementierung als technische Produktentscheidung festgelegt und getestet.

---

## 1.4 Adaptive Quest-Auswahl

Der berechnete HP-Zustand beeinflusst die Quest-Auswahl.

Die App soll nicht einfach eine identische Aufgabenliste anzeigen, sondern aus verfügbaren Quests passende Kandidaten auswählen oder priorisieren.

Beispiel:

```text
niedrige Energie
      ↓
leichte / kurze / regenerative Quests
```

statt:

```text
niedrige Energie
      ↓
dieselbe Quest-Auswahl wie bei hoher Energie
```

Der MVP verwendet dafür eine einfache, deterministische und testbare Regel- oder Scoring-Logik. Eine KI ist dafür nicht erforderlich.

Empfehlungen bleiben Empfehlungen. Der Nutzer behält die Entscheidungshoheit.

---

## 1.5 Quests

Quests übersetzen alltägliche Aufgaben in den spielerischen Kontext der App.

Unterstützte Quest-Arten können sein:

- Main Quest
- Side Quest
- Daily Quest
- Recovery Quest

### Questinformationen

Eine Quest soll mindestens erkennen lassen:

- Titel
- Beschreibung bzw. Handlung
- Quest-Typ
- ungefährer Aufwand
- mögliche Belohnung
- Status

### Aktionen

Der Nutzer kann eine Quest:

- starten
- abschließen
- verschieben
- bewusst nicht durchführen

Das bewusste Nicht-Erledigen darf nicht automatisch als persönliches Versagen dargestellt werden.

---

## 1.6 Quest Reward

Eine abgeschlossene Quest kann eine Belohnung auslösen.

Im MVP gehören insbesondere dazu:

- XP
- Quest Points
- sichtbares Abschlussfeedback

Die konkrete Reward-Struktur soll klein und verständlich bleiben.

---

## 1.7 Mini HP-Check

Nach dem Abschluss einer Quest folgt ein kurzer HP-Check.

Der Mini HP-Check ist bewusst anders aufgebaut als der große HP-Check.

Für jeden HP-Bereich kann der Nutzer seinen aktuellen Zustand **selbst auf einer Skala per Regler einschätzen**.

Es gibt keine drei Fragen pro Bereich.

### Zweck

Der Mini HP-Check beantwortet:

> Wie geht es mir nach dieser Quest gerade?

Damit kann der Nutzer unmittelbar wahrnehmen, ob eine Quest Energie gekostet, erhalten oder möglicherweise zurückgegeben hat.

### Anforderungen

- Jeder relevante HP-Bereich besitzt einen zugänglichen Regler.
- Der aktuelle Wert ist verständlich erkennbar.
- Die Skala ist nicht ausschließlich farbcodiert.
- Tastaturbedienung funktioniert.
- Der Nutzer kann den Check schnell abschließen.
- Die Werte können mit dem vorherigen Zustand verglichen werden.

---

## 1.8 Lagerfeuer / Regeneration

Nach dem Mini HP-Check kann der Nutzer bewusst eine Pause wählen.

Das Lagerfeuer ist eine eigene Recovery-Mechanik und kein „Nichtstun“-Fehlerzustand.

```text
Quest
  ↓
Reward
  ↓
Mini HP-Check
  ↓
Lagerfeuer
  ↓
Regeneration
```

Das Lagerfeuer soll das Grundprinzip sichtbar machen:

> Regeneration ist Bestandteil des Fortschritts.

Die konkrete Berechnung der Regeneration wird später festgelegt. Der MVP muss zunächst den bewussten Übergang in einen Erholungszustand darstellen können.

---

## 1.9 Dashboard / Home

Home ist der zentrale Einstiegspunkt nach dem Onboarding.

Home soll nicht als statische Quest-Liste funktionieren.

Der zentrale Inhalt verändert sich abhängig vom aktuellen Zustand des Adventure-Bible-Loops.

Mögliche Zustände sind:

- großer HP-Check erforderlich
- HP-Zustand vorhanden
- Quest-Empfehlung
- aktive Quest
- Reward nach Quest-Abschluss
- Mini HP-Check
- Lagerfeuer / Regeneration

### Grundregel

Der Nutzer soll auf Home möglichst schnell verstehen:

> Was ist gerade der nächste sinnvolle Schritt?

---

## 1.10 Hauptnavigation

Die Hauptnavigation des MVP bleibt reduziert:

- **Home** – aktueller Zustand und nächster Schritt
- **Quests** – Aufgaben und Quest-Liste
- **Plan** – geplante Aktivitäten
- **Ich** – Profil und persönliche Informationen

Der HP-Check ist **kein eigener Hauptnavigation-Punkt**. Er ist ein Bestandteil des zentralen Nutzerflusses.

---

## 1.11 Plan

Der Nutzer kann relevante Aufgaben bzw. Quests zeitlich einordnen.

Der Plan soll Orientierung geben, ohne den Nutzer in eine starre Routine zu zwingen.

### Grundprinzipien

- Aufgaben können geplant werden.
- Aufgaben können verschoben werden.
- Änderungen am Plan sind erlaubt.
- Der Plan ist Unterstützung und keine Bestrafung.

Der MVP benötigt keinen vollständigen Kalender.

---

## 1.12 XP und Fortschritt

Abgeschlossene Quests können XP vergeben.

XP machen Fortschritt sichtbar und unterstützen das Game Feeling.

### Anforderungen

- Abschluss einer Quest kann XP vergeben.
- Quest Points können den Quest-Fortschritt ergänzen.
- Fortschritt wird unmittelbar sichtbar.
- XP werden verständlich dargestellt.
- Fortschritt darf nicht mit persönlichem Wert gleichgesetzt werden.

---

## 1.13 Profilbereich / „Ich“

Der Nutzer kann sein Profil und persönliche Einstellungen einsehen.

Der Bereich dient als persönlicher Rückzugs- und Verwaltungsbereich.

Mögliche MVP-Inhalte:

- Charakter
- Profilinformationen
- aktueller Fortschritt
- grundlegende Einstellungen

---

# 2. POST-MVP

Diese Funktionen gehören zum Produkt, sind aber nicht notwendig, um den React-MVP erfolgreich zu demonstrieren.

## 2.1 Habit-System

- wiederkehrende Gewohnheiten
- flexible Frequenzen
- Habit-Fortschritt
- adaptive Habit-Vorschläge
- Darstellung von Routinen als Quests

---

## 2.2 Detaillierter Tagesverlauf

- mehrere große HP-Checks pro Tag bzw. Abenteuerzyklen
- Mini-HP-Verläufe nach Quests
- Verlauf der einzelnen HP-Bereiche
- Tageszusammenfassung
- Vergleich zwischen Ausgangszustand und Quest-Auswirkungen

---

## 2.3 Achievements

- einmalige Erfolge
- langfristige Meilensteine
- besondere Quest-Erfolge
- optionale Sammelmechanik

Achievements sollen Motivation unterstützen und keine Pflicht erzeugen.

---

## 2.4 Statistiken

- XP-Verlauf
- Quest-Abschlüsse
- Gewohnheitsverläufe
- HP-/Energieverläufe
- Quest-Auswirkungen
- persönliche Fortschrittsübersichten

Statistiken müssen verständlich bleiben und dürfen den Nutzer nicht mit Daten überladen.

---

## 2.5 Inventar und RPG-Erweiterungen

Mögliche spätere Systeme:

- Inventar
- Gegenstände
- Buffs
- Debuffs
- kosmetische Belohnungen
- Charakterentwicklung

Diese Systeme sind Ergänzungen zum Kernprodukt und dürfen dessen Bedienung nicht unnötig verkomplizieren.

---

## 2.6 Journal / Reflexion

- kurze Tagesreflexion
- persönliche Notizen
- Rückblick auf schwierige oder erfolgreiche Tage
- optionale Verknüpfung mit Quests und Zuständen

---

# 3. LANGFRISTIGE VISION

## 3.1 Intelligente Anpassung

Die Anwendung soll langfristig aus dem Verhalten des Nutzers lernen können.

Mögliche Muster:

- häufig verschobene Aufgaben
- typische Energiezeiten
- passende Questgrößen
- funktionierende Routinen
- wiederkehrende Überforderung
- tatsächliche Quest-Auswirkungen auf HP

Die Anwendung beschreibt Muster und schlägt Anpassungen vor. Sie bewertet den Nutzer nicht.

---

## 3.2 KI-Unterstützung

Langfristig kann KI bei folgenden Aufgaben unterstützen:

- Quest-Vorschläge
- Umformulierung großer Aufgaben in kleinere Schritte
- Erkennen wiederkehrender Muster
- natürliche Interaktion mit der App
- Unterstützung bei Reflexion und Planung

KI ist kein Bestandteil des React-MVPs.

---

## 3.3 Voice Input

Langfristig kann der Nutzer Aufgaben oder Zustände per Sprache erfassen.

Beispiel:

> „Ich muss heute noch Wäsche aufhängen und zum Arzt.“

Die Anwendung könnte daraus passende Aufgaben erzeugen.

---

## 3.4 Kalenderintegration

Langfristig können externe Kalender eingebunden werden.

Mögliche Funktionen:

- Termine erkennen
- verfügbare Zeiträume berücksichtigen
- Quests um Termine herum planen
- geplante Aufgaben automatisch anpassen

---

## 3.5 Persistenz und Backend

Die langfristige Anwendung kann ein Backend erhalten für:

- Benutzerkonten
- Persistenz
- Synchronisation
- Datenhistorie
- personalisierte Empfehlungen

Das Backend gehört nicht zum React-MVP.

---

# 4. Bewusst nicht Bestandteil des MVP

Folgende Dinge werden nicht nur deshalb implementiert, weil sie für die langfristige Vision interessant sind:

- komplexe KI
- Backend
- Authentifizierung
- Multiplayer
- vollständiger Kalender
- Voice Input
- komplexes Inventar
- komplexes Achievement-System
- umfangreiche Statistik-Dashboards
- automatische Mustererkennung
- komplexe RPG-Kampfsysteme

Wenn eine dieser Funktionen für eine konkrete Präsentationsfunktion notwendig erscheint, muss der Scope bewusst neu bewertet werden.

---

# 5. Feature-Prinzipien

Jedes neue Feature muss mindestens eine dieser Fragen positiv beantworten:

1. Unterstützt es den zentralen Adventure-Bible-Loop?
2. Macht es die Anwendung für den Nutzer verständlicher?
3. Unterstützt es die adaptive Ausrichtung der App?
4. Verbessert es die Accessibility oder kognitive Entlastung?
5. Erzeugt es einen klaren Mehrwert für den MVP?

Wenn keine dieser Fragen positiv beantwortet wird, wird das Feature nicht automatisch implementiert.

---

# 6. MVP-Erfolgskriterien

Der MVP gilt funktional als erfolgreich, wenn ein Nutzer:

1. ein Profil erstellen kann,
2. seinen Charakter sehen kann,
3. den großen HP-Check mit 3 Fragen pro Bereich und 5 Antwortmöglichkeiten pro Frage durchführen kann,
4. daraus einen nachvollziehbaren HP-Zustand erhält,
5. passende Quests angezeigt bekommt,
6. eine Quest starten und abschließen kann,
7. dafür XP / Quest Points erhält,
8. anschließend einen Mini HP-Check mit Reglern durchführen kann,
9. zwischen einer weiteren Quest und dem Lagerfeuer wählen kann,
10. seinen Fortschritt nachvollziehen kann,
11. zwischen Home, Quests, Plan und Ich navigieren kann.

Dabei muss die Anwendung:

- mobile-first funktionieren,
- auch auf Desktop als App erkennbar bleiben,
- verständlich bedienbar sein,
- zentrale Accessibility-Anforderungen erfüllen,
- und den Nutzer nicht mit unnötigen Funktionen überfordern.
