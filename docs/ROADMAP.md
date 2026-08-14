# Adventure Bible – Roadmap

## Zweck

Diese Roadmap beschreibt den aktuellen Stand und die verbleibenden Schritte für das React-Abschlussprojekt.

Ziel ist ein fokussierter, präsentierbarer MVP mit einem vollständigen und getesteten Adventure-Bible-Loop.

---

# 1. Projektziel

Der MVP demonstriert:

```text
Profil
→ großer HP-Check
→ HP-Zustand
→ adaptive Quest-Auswahl
→ Quest starten
→ Quest abschließen
→ XP / Quest Points / Reward
→ Mini HP-Check
→ neue Quest ODER Lagerfeuer
→ nächster Abenteuerzyklus
```

Die App soll auf Smartphone und Desktop wie eine persönliche App wirken.

---

# 2. Entwicklungsprinzip

> Einen kleinen, vollständigen und getesteten Produkt-Loop bauen.

Priorität:

1. funktionierender Kern-Loop
2. verständliche UX
3. Accessibility
4. Tests
5. visuelle Qualität
6. optionale Erweiterungen

---

# 3. Phase 0 – Dokumentation und Planung

- [x] AGENTS.md prüfen
- [x] PROJECT.md prüfen
- [x] DESIGN.md prüfen
- [x] FEATURES.md erstellen und Scope festlegen
- [x] ACCESSIBILITY.md erstellen
- [x] SECURITY.md erstellen
- [x] ARCHITECTURE.md festlegen
- [x] Agentic-Workflow dokumentieren
- [x] Skills / Workflow-Struktur festlegen
- [x] MVP-Scope bestätigen

---

# 4. Technisches Fundament

- [x] Dependencies prüfen
- [x] Tailwind / DaisyUI einrichten
- [x] globale Styles und Theme
- [x] TanStack Router integrieren
- [x] App-Shell erstellen
- [x] Hauptnavigation erstellen
- [x] responsive Grundstruktur erstellen
- [x] Test-Setup einrichten
- [x] Production Build grundsätzlich erfolgreich
- [x] Lint grundsätzlich erfolgreich

**Status:** 🟢 abgeschlossen

---

# 5. Profil und Charakter

- [x] Profil-/Account-Bereich
- [x] Clerk Sign-in / Sign-up UI
- [x] Character View
- [x] XP / Level / Quest Points
- [x] grundlegende Fortschrittsanzeige
- [x] responsive Darstellung

**Status:** 🟢 abgeschlossen

> Hinweis: Clerk ist bereits als Authentifizierungs-UI integriert. Backend-Persistenz und serverseitige Autorisierung bleiben außerhalb des React-MVP.

---

# 6. HP-Check und adaptive Quests

- [x] großer HP-Check
- [x] 3 Fragen pro HP-Bereich
- [x] 5 Antwortmöglichkeiten pro Frage
- [x] nachvollziehbare HP-Berechnung
- [x] HP-Zusammenfassung
- [x] regelbasierte Quest-Auswahl
- [x] Quest-Daten aus lokaler JSON-Datei
- [x] Quest starten
- [x] Quest abschließen
- [x] Quest-Historie berücksichtigen
- [x] XP / Quest Points vergeben
- [x] sichtbares Reward-Feedback

**Status:** 🟢 abgeschlossen

---

# 7. Mini HP-Check und Regeneration

- [x] Mini HP-Check mit zugänglichen Slidern
- [x] aktueller Wert sichtbar
- [x] vorheriger HP-Wert soweit vorhanden sichtbar
- [x] zwei passende Quest-Optionen
- [x] Nutzer entscheidet selbst
- [x] Lagerfeuer als bewusste Recovery-Option
- [x] Lagerfeuerzustand speichern
- [x] neuen Abenteuerzyklus aus dem Lagerfeuer starten

**Status:** 🟢 abgeschlossen

---

# 8. Home / zentraler Flow

- [x] Home als Einstiegspunkt
- [x] aktueller HP-Zustand sichtbar
- [x] nächster sinnvoller Schritt abhängig vom Loop-Zustand
- [x] aktive Quest verlinken
- [x] Quest-Abschluss → Mini HP-Check verlinken
- [x] Lagerfeuerzustand berücksichtigen
- [x] Fortschritt sichtbar

**Status:** 🟢 abgeschlossen

---

# 9. Plan und persönliche Bereiche

- [x] Plan-Bereich auf MVP-Niveau
- [x] Aufgaben hinzufügen
- [x] Aufgaben verschieben
- [x] Aufgaben entfernen
- [x] erledigte Aufgaben markieren
- [x] Plan scrollt intern, Navigation bleibt sichtbar
- [x] Profilbereich / Ich
- [x] Reflexion als vorhandene Zusatzfunktion

**Status:** 🟢 abgeschlossen

---

# 10. Accessibility und Qualität

- [x] semantische Strukturen in zentralen Flows
- [x] zugängliche Labels / Namen
- [x] Status ohne reine Farbcodierung
- [x] sichtbare Focus-Styles an zentralen Interaktionen
- [x] Touch-Ziele berücksichtigt
- [x] `prefers-reduced-motion` berücksichtigt
- [x] responsive Layout-Grundlagen
- [x] Unit-Tests für zentrale Domain-Logik
- [x] Campfire-State getestet
- [ ] vollständiger manueller Keyboard-Test
- [ ] vollständiger manueller Screenreader-Check
- [ ] vollständige Kontrastprüfung
- [ ] finaler Mobile-/Desktop-Durchlauf

**Status:** 🟡 technische Basis fertig, manuelle Abnahme offen

---

# 11. Finaler MVP-Check

- [ ] `npm run test`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] App lokal starten
- [ ] vollständigen Demo-Flow einmal durchspielen
- [ ] keine kritischen Fehler im Demo-Flow
- [ ] unnötige Debug-/Testartefakte prüfen
- [ ] finale Dokumentation auf Konsistenz prüfen

**Status:** 🟡 finale Verifikation offen

---

# 12. Definition of Done – MVP

Der MVP ist fertig, wenn:

- [x] zentraler Produkt-Loop implementiert ist
- [x] Profil / Charakter vorhanden sind
- [x] Zustand erfasst werden kann
- [x] Quest passend ausgewählt werden kann
- [x] Quest gestartet und abgeschlossen werden kann
- [x] XP / Quest Points aktualisiert werden
- [x] Mini HP-Check durchgeführt werden kann
- [x] zwischen neuer Quest und Lagerfeuer gewählt werden kann
- [x] Home den nächsten sinnvollen Schritt zeigt
- [x] Hauptnavigation funktioniert
- [x] mobile Grunddarstellung funktioniert
- [x] zentrale Accessibility-Anforderungen technisch berücksichtigt sind
- [x] Tests vorhanden sind
- [ ] finaler Testlauf erfolgreich verifiziert ist
- [ ] finaler Lint-Lauf erfolgreich verifiziert ist
- [ ] finaler Production Build erfolgreich verifiziert ist
- [ ] manuelle Accessibility-Abnahme durchgeführt ist
- [ ] vollständiger Demo-Flow ohne kritischen Fehler funktioniert

---

# 13. Nach dem MVP

Nicht Teil der aktuellen React-MVP-Abnahme:

- Backend
- Datenbank
- serverseitige Persistenz
- serverseitige Autorisierung
- komplexere adaptive Logik
- KI-Unterstützung
- Voice Input
- Kalenderintegration
- umfangreiche Statistiken
- komplexes Inventar / RPG-System
- langfristige Mustererkennung

Diese Funktionen werden erst nach einem stabilen MVP betrachtet.
