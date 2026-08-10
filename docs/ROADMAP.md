# Adventure Bible – Roadmap

## Zweck

Diese Roadmap beschreibt den Entwicklungsplan für das aktuelle React-Abschlussprojekt.

Sie ist bewusst vom langfristigen Produkt-Roadmap getrennt: Ziel ist ein fokussierter, präsentierbarer MVP.

---

# 1. Projektziel

**Präsentation:** Freitag, 10:00 Uhr

Der MVP muss den zentralen Adventure-Bible-Loop überzeugend demonstrieren:

```text
Profil
→ Charakter
→ Zustand einschätzen
→ adaptive Quest
→ Quest abschließen
→ XP erhalten
→ Fortschritt sehen
```

Die App soll dabei wie eine echte mobile App wirken und auf Desktop weiterhin als App erkennbar bleiben.

---

# 2. Entwicklungsprinzip

Nicht möglichst viele Features bauen.

Sondern:

> Einen kleinen, vollständigen und getesteten Produkt-Loop bauen.

Priorität:

1. funktionierender Kern-Loop
2. verständliche UX
3. Accessibility
4. Tests
5. visuelle Qualität
6. optionale Erweiterungen

Wenn Zeit knapp wird, werden optionale Features gestrichen – nicht Tests, Accessibility oder der Kern-Loop.

---

# 3. Phase 0 – Dokumentation und Planung

- [x] AGENTS.md prüfen
- [x] PROJECT.md prüfen
- [x] DESIGN.md prüfen
- [x] FEATURES.md erstellen
- [x] ACCESSIBILITY.md erstellen
- [x] SECURITY.md erstellen
- [ ] ARCHITECTURE.md finalisieren
- [ ] Agentic-Workflow dokumentieren
- [ ] Skills festlegen
- [ ] MVP-Scope bestätigen

---

# 4. Montag – Fundament

## Ziel

Technisches Fundament und Produktstruktur fertigstellen.

### Aufgaben

- [ ] aktuelle Dependencies prüfen
- [ ] DaisyUI / Tailwind-Setup abschließen
- [ ] globale Styles und Theme definieren
- [ ] Routing-Strategie festlegen
- [ ] App-Shell erstellen
- [ ] Hauptnavigation erstellen
- [ ] responsive Grundstruktur erstellen
- [ ] erste Accessibility-Prüfung
- [ ] Test-Setup einrichten

### Ergebnis

Die Anwendung startet sauber und besitzt eine navigierbare App-Shell mit den vorgesehenen Hauptbereichen.

---

# 5. Dienstag – Profil und Charakter

## Ziel

Der Nutzer kann die Anwendung erstmals als persönliche App erleben.

### Aufgaben

- [ ] Profil-Erstellung
- [ ] Formularvalidierung
- [ ] Character View
- [ ] persönliche Grunddaten
- [ ] grundlegender Zustand
- [ ] responsive Darstellung
- [ ] Accessibility-Tests
- [ ] Komponenten-Tests

### Ergebnis

Ein Nutzer kann ein Profil erstellen und anschließend seinen Charakter sehen.

---

# 6. Mittwoch – Zustand und Quests

## Ziel

Der adaptive Kern der Anwendung funktioniert.

### Aufgaben

- [ ] HP-/Zustandscheck
- [ ] Zustandmodell
- [ ] Questmodell
- [ ] Quest-Liste
- [ ] Quest-Detailansicht
- [ ] einfache regelbasierte adaptive Auswahl
- [ ] Quest starten
- [ ] Quest abschließen
- [ ] XP-Berechnung
- [ ] Tests für adaptive Logik

### Ergebnis

Der Zustand des Nutzers beeinflusst nachvollziehbar, welche Quest empfohlen wird.

---

# 7. Donnerstag – Fortschritt, Polish und Qualität

## Ziel

Den vollständigen Produkt-Loop stabilisieren und präsentationsbereit machen.

### Aufgaben

- [ ] XP und Fortschrittsanzeige
- [ ] Plan-Bereich auf MVP-Niveau
- [ ] Profilbereich / Ich
- [ ] Empty States
- [ ] Loading / Error / Success States, wo erforderlich
- [ ] Mobile Polish
- [ ] Desktop-Ansicht prüfen
- [ ] Keyboard-Test
- [ ] Screenreader-relevante Prüfung
- [ ] Kontrastprüfung
- [ ] `prefers-reduced-motion`
- [ ] Build
- [ ] Lint
- [ ] Tests
- [ ] unnötige Dateien / Debug-Code entfernen

### Ergebnis

Der komplette MVP-Loop funktioniert stabil und kann präsentiert werden.

---

# 8. Freitag – Präsentation

## Vor der Präsentation

- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] Tests ausführen
- [ ] App lokal starten
- [ ] Präsentationsablauf einmal vollständig durchspielen
- [ ] Demo-Daten prüfen
- [ ] keine offenen kritischen Fehler

## Demo-Reihenfolge

1. App öffnen
2. Profil zeigen / erstellen
3. Charakter zeigen
4. aktuellen Zustand setzen
5. adaptive Quest demonstrieren
6. Quest abschließen
7. XP zeigen
8. Fortschritt zeigen
9. kurz erklären, wie die App auf den Nutzer reagiert
10. Accessibility und technische Umsetzung erwähnen

---

# 9. Scope-Regel

Neue Ideen werden während der Woche in drei Kategorien eingeordnet:

### Must Have

Notwendig für den zentralen MVP-Loop oder die Präsentation.

### Should Have

Sinnvoll, aber der MVP funktioniert auch ohne sie.

### Later

Post-MVP oder langfristige Vision.

Nur **Must Have** darf den bestehenden Plan automatisch unterbrechen.

---

# 10. Definition of Done – MVP

Der MVP ist fertig, wenn:

- [ ] der zentrale Produkt-Loop funktioniert
- [ ] Profil-Erstellung funktioniert
- [ ] Zustand kann erfasst werden
- [ ] Quest wird passend ausgewählt
- [ ] Quest kann abgeschlossen werden
- [ ] XP / Fortschritt werden aktualisiert
- [ ] Hauptnavigation funktioniert
- [ ] mobile Ansicht funktioniert
- [ ] Desktop-Ansicht funktioniert
- [ ] zentrale Accessibility-Anforderungen erfüllt sind
- [ ] Tests vorhanden und erfolgreich sind
- [ ] Lint erfolgreich ist
- [ ] Production Build erfolgreich ist
- [ ] keine bekannten kritischen Fehler den Demo-Flow blockieren

---

# 11. Nach dem MVP

Erst nach erfolgreicher Präsentationsversion:

- Backend
- Clerk-Authentifizierung
- Datenbank
- Persistenz
- echte Benutzerkonten
- komplexere adaptive Logik
- weitere RPG-Systeme
- KI-Unterstützung
- Voice Input
- Kalenderintegration

Diese Punkte werden nicht in den aktuellen React-MVP gedrängt.
