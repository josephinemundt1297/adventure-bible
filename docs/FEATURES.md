# Adventure Bible – Features

## Zweck dieser Datei

Diese Datei beschreibt den Funktionsumfang von Adventure Bible und grenzt MVP, spätere Erweiterungen und langfristige Vision voneinander ab.

Sie dient als verbindliche Produktreferenz für Entwicklung und Agenten.

Eine Funktion darf nicht nur deshalb in den MVP aufgenommen werden, weil sie in der langfristigen Vision existiert.

---

# 1. MVP

Der MVP soll den zentralen Adventure-Bible-Loop demonstrieren:

```text
Profil erstellen
      ↓
Charakter kennenlernen / konfigurieren
      ↓
aktuellen Zustand einschätzen
      ↓
passende Aktivitäten und Quests erhalten
      ↓
Quest durchführen
      ↓
Quest abschließen
      ↓
XP / Fortschritt erhalten
      ↓
aktuellen Fortschritt sehen
```

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

## 1.3 Tageszustand / HP-Check

Der Nutzer kann seinen aktuellen Zustand einschätzen.

Der Check soll schnell durchführbar sein und keine medizinische Diagnose simulieren.

Mögliche Bereiche sind beispielsweise:

- Körper
- Energie
- Konzentration
- Stimmung
- Regeneration

Nicht jeder Bereich muss im MVP zwingend separat dargestellt werden.

### Anforderungen

- Zustand kann mit einfachen Eingaben erfasst werden.
- Werte können im Tagesverlauf erneut angepasst werden.
- Informationen werden verständlich dargestellt.
- Zustände werden nicht ausschließlich über Farbe kommuniziert.
- Der Check beeinflusst die Auswahl oder Darstellung passender Aktivitäten.

---

## 1.4 Dashboard / Home

Home ist der zentrale Einstiegspunkt nach dem Onboarding.

Das Dashboard soll nicht möglichst viele Informationen anzeigen.

Es soll dem Nutzer vor allem helfen, die nächste sinnvolle Aktion zu erkennen.

### Inhalte

- Begrüßung / aktueller Kontext
- aktueller Zustand
- relevanter Fortschritt
- eine passende nächste Aktivität oder Quest
- wichtige aktive Quests
- Hauptnavigation

### Grundregel

Der Nutzer soll auf Home möglichst schnell verstehen:

> Was ist gerade wichtig und was kann ich jetzt tun?

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

## 1.6 Adaptive Quest-Auswahl

Adventure Bible soll nicht jedem Nutzer jederzeit dieselben Aufgaben zeigen.

Der aktuelle Zustand des Nutzers soll bei der Auswahl oder Priorisierung berücksichtigt werden.

Beispiel:

```text
wenig Energie
    ↓
kleine / leichte / regenerative Aufgabe
```

statt:

```text
wenig Energie
    ↓
gleiche Aufgabenliste wie an jedem anderen Tag
```

Der MVP kann diese Anpassung mit einfachen regelbasierten Kriterien simulieren. Eine komplexe KI ist dafür nicht erforderlich.

---

## 1.7 Plan

Der Nutzer kann relevante Aufgaben bzw. Quests zeitlich einordnen.

Der Plan soll Orientierung geben, ohne den Nutzer in eine starre Routine zu zwingen.

### Grundprinzipien

- Aufgaben können geplant werden.
- Aufgaben können verschoben werden.
- Änderungen am Plan sind erlaubt.
- Der Plan ist Unterstützung und keine Bestrafung.

Der MVP benötigt keinen vollständigen Kalender.

---

## 1.8 XP und Fortschritt

Abgeschlossene Quests können XP vergeben.

XP machen Fortschritt sichtbar und unterstützen das Game Feeling.

### Anforderungen

- Abschluss einer Quest kann XP vergeben.
- Fortschritt wird unmittelbar sichtbar.
- XP werden verständlich dargestellt.
- Fortschritt darf nicht mit persönlichem Wert gleichgesetzt werden.

---

## 1.9 Hauptnavigation

Die Hauptnavigation des MVP bleibt reduziert:

- **Home** – aktueller Zustand und nächste Aktion
- **Quests** – Aufgaben und Quest-Liste
- **Plan** – geplante Aktivitäten
- **Ich** – Profil und persönliche Informationen

Weitere Funktionen werden nicht automatisch zu weiteren Hauptnavigation-Punkten.

---

## 1.10 Profilbereich / „Ich“

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

- mehrere Zustandschecks pro Tag
- Verlauf des Energielevels
- Tageszusammenfassung
- Vergleich zwischen geplantem und tatsächlichem Tag

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
- Energie- und Aktivitätsmuster
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
3. seinen aktuellen Zustand einschätzen kann,
4. eine passende Quest angezeigt bekommt,
5. eine Quest starten und abschließen kann,
6. dafür Fortschritt bzw. XP erhält,
7. seinen Fortschritt nachvollziehen kann,
8. zwischen Home, Quests, Plan und Ich navigieren kann.

Dabei muss die Anwendung:

- mobile-first funktionieren,
- auch auf Desktop als App erkennbar bleiben,
- verständlich bedienbar sein,
- zentrale Accessibility-Anforderungen erfüllen,
- und den Nutzer nicht mit unnötigen Funktionen überfordern.
