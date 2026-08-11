# Adventure Bible – Specification

## Zweck

Diese Datei beschreibt, **was Adventure Bible langfristig können soll**.

Sie ist die funktionale Produktspezifikation und ergänzt die anderen Dokumente:

- `PROJECT.md` beschreibt Vision und Grundprinzipien.
- `SPEC.md` beschreibt die langfristigen Fähigkeiten und Systeme.
- `FEATURES.md` entscheidet, welche dieser Fähigkeiten in MVP, Post-MVP oder Vision liegen.
- `ARCHITECTURE.md` beschreibt, wie die Anwendung technisch umgesetzt werden soll.
- `DESIGN.md` und `ACCESSIBILITY.md` beschreiben die Nutzeroberfläche und ihre Zugänglichkeit.
- `SECURITY.md` beschreibt Sicherheitsanforderungen.

Die SPEC beschreibt bewusst **das Zielsystem**, nicht den Umfang des aktuellen React-Abschlussprojekts.

---

# 1. Produktmodell

Adventure Bible ist eine adaptive Habit- und Life-Management-Anwendung mit spielerischen RPG-Elementen.

Der Nutzer verwaltet seinen Alltag nicht als starre Checkliste, sondern als persönliches Abenteuer.

Der zentrale Grundgedanke lautet:

> Die App passt sich an den Nutzer an – nicht der Nutzer an die App.

Die Anwendung soll langfristig Aufgaben, Gewohnheiten, Energie, Planung und persönlichen Fortschritt miteinander verbinden.

---

# 2. Benutzerkonto und Profil

Ein Nutzer besitzt langfristig ein persönliches Konto und ein Profil.

Das Profil kann unter anderem enthalten:

- Anzeigename
- Charaktername
- Charakterdarstellung
- persönliche Präferenzen
- relevante Routinen
- bevorzugte Aufgabenarten
- persönliche Ziele
- Einstellungen
- Accessibility-Einstellungen
- Sprache / Locale

Persönliche Daten gehören ausschließlich zum jeweiligen Nutzerkonto.

Authentifizierung soll langfristig über Clerk erfolgen.

---

# 3. Charakter-System

Das Profil wird durch einen persönlichen Charakter repräsentiert.

Der Charakter dient der Motivation und Visualisierung des Fortschritts.

Mögliche langfristige Elemente:

- Charaktername
- Avatar / Erscheinungsbild
- Level
- XP
- Fortschrittswerte
- kosmetische Elemente
- freigeschaltete Belohnungen

Der Charakter ist keine Bewertung des persönlichen Wertes oder der Leistungsfähigkeit des Nutzers.

---

# 4. Zustand / HP-System

Adventure Bible besitzt ein persönliches Zustandsmodell.

Mögliche Zustandsbereiche:

- körperlicher Zustand
- Energie
- Konzentration
- Stimmung
- Muskelzustand
- Ernährung
- Regeneration

Der Nutzer kann seinen Zustand selbst einschätzen und im Tagesverlauf aktualisieren.

Die Werte dienen der Anpassung der Anwendung und stellen keine medizinische Diagnose dar.

---

# 5. Energie als Ressource

Energie ist eine zentrale Ressource des Systems.

Die Anwendung soll langfristig berücksichtigen, dass nicht jeder Tag und nicht jede Tageszeit dieselbe Leistungsfähigkeit bietet.

Ein niedriger Energiezustand kann beispielsweise dazu führen, dass:

- kleinere Aufgaben bevorzugt werden,
- Recovery Quests vorgeschlagen werden,
- große Aufgaben in kleinere Schritte zerlegt werden,
- geplante Aufgaben neu priorisiert werden.

Das System darf niedrige Energie nicht als Versagen interpretieren.

---

# 6. Quest-System

Alltägliche Aufgaben werden als Quests dargestellt.

Unterstützte Quest-Typen:

- Main Quest
- Side Quest
- Daily Quest
- Recovery Quest

Eine Quest kann langfristig enthalten:

- Titel
- Beschreibung
- Quest-Typ
- Aufwand
- benötigte Energie
- Priorität
- Zeitrahmen
- Status
- XP-Belohnung
- optionale Gegenstände oder Achievements

Mögliche Status:

- offen
- geplant
- aktiv
- abgeschlossen
- verschoben
- bewusst übersprungen
- archiviert

Das System muss bewusstes Überspringen und Verschieben unterstützen.

---

# 7. Adaptive Quest-Empfehlungen

Die Anwendung soll langfristig passende Quests empfehlen.

Die Empfehlung kann berücksichtigen:

- aktuellen Zustand
- verfügbare Energie
- Zeit
- Priorität
- geplante Termine
- bisheriges Verhalten
- persönliche Präferenzen
- Quest-Aufwand
- wiederkehrende Routinen

Der MVP kann dies regelbasiert umsetzen.

Später kann die Empfehlung durch statistische oder KI-basierte Verfahren erweitert werden.

Empfehlungen bleiben Empfehlungen. Der Nutzer behält die Entscheidungshoheit.

---

# 8. Habit-System

Adventure Bible soll langfristig wiederkehrende Gewohnheiten unterstützen.

Mögliche Funktionen:

- Habit erstellen
- Frequenz definieren
- flexible Wiederholung
- Habit pausieren
- Habit verschieben
- Habit abschließen
- Fortschritt anzeigen
- Gewohnheiten als Quests darstellen

Habits sollen nicht zwingend jeden Tag erfüllt werden müssen.

Das System soll mit Unterbrechungen umgehen können, ohne automatisch eine negative Bewertung zu erzeugen.

---

# 9. Planung

Der Plan verbindet Quests, Habits und Termine.

Mögliche Funktionen:

- Aufgaben planen
- Aufgaben verschieben
- Prioritäten setzen
- Zeitfenster berücksichtigen
- verfügbare Energie berücksichtigen
- Tagesstruktur anzeigen

Langfristig kann eine Kalenderintegration hinzukommen.

Der Plan soll flexibel bleiben und keine starre Tagesroutine erzwingen.

---

# 10. Kalenderintegration

Eine spätere Kalenderintegration kann externe Termine berücksichtigen.

Mögliche Funktionen:

- Termine importieren
- verfügbare Zeiträume erkennen
- Quests um Termine herum planen
- Konflikte erkennen
- Planung an Änderungen anpassen

Die Anwendung soll externe Termine nicht ungefragt verändern.

---

# 11. XP und Level

Abgeschlossene Aktivitäten können XP vergeben.

XP können langfristig zu Leveln führen.

Mögliche Systeme:

- Level
- XP-Balken
- Level-Up
- Fortschrittsmeilensteine
- kosmetische Freischaltungen

XP dienen der Visualisierung von Fortschritt und nicht der Bewertung des Nutzers.

---

# 12. Achievements

Langfristig können Achievements besondere Fortschritte sichtbar machen.

Mögliche Kategorien:

- erste Schritte
- langfristige Gewohnheiten
- besondere Meilensteine
- persönliche Erfolge
- Recovery / Selbstfürsorge

Achievements sollen optional und nicht drucksteigernd sein.

---

# 13. Inventar und Belohnungen

Ein späteres Inventarsystem kann spielerische Belohnungen verwalten.

Mögliche Inhalte:

- kosmetische Gegenstände
- Charakterelemente
- Sammelobjekte
- Buffs
- temporäre Effekte

Diese Systeme dürfen die Kernbedienung nicht unnötig komplizieren.

---

# 14. Journal und Reflexion

Der Nutzer soll langfristig persönliche Reflexionen festhalten können.

Mögliche Inhalte:

- Tagesreflexion
- persönliche Notizen
- Erfahrungen mit Quests
- Erfolge
- schwierige Tage
- Erkenntnisse
- Rückblicke

Journal-Inhalte gehören dem Nutzer und müssen entsprechend geschützt werden.

---

# 15. Statistiken und Verlauf

Langfristig soll Adventure Bible Entwicklungen sichtbar machen können.

Mögliche Auswertungen:

- XP-Verlauf
- Quest-Abschlüsse
- Habit-Verlauf
- Energieverlauf
- Aktivitätsmuster
- geplante vs. tatsächliche Aktivitäten
- persönliche Fortschritte

Statistiken sollen verständlich und sparsam eingesetzt werden.

---

# 16. Personalisierung und Mustererkennung

Die Anwendung soll langfristig aus freiwillig erfassten Nutzungsdaten Muster erkennen können.

Beispiele:

- typische Energiezeiten
- häufig verschobene Aufgaben
- passende Questgrößen
- funktionierende Routinen
- wiederkehrende Überforderung
- bevorzugte Quest-Arten

Muster werden als Unterstützung dargestellt und nicht als Diagnose oder Urteil.

---

# 17. KI-Unterstützung

KI kann langfristig unterstützend eingesetzt werden für:

- Quest-Vorschläge
- Zerlegung großer Aufgaben in kleine Schritte
- Formulierung von Quests
- Musterzusammenfassungen
- Reflexionshilfe
- flexible Tagesplanung
- natürliche Spracheingabe

KI darf keine Entscheidungen erzwingen.

Die Anwendung soll transparent machen, wenn eine Empfehlung durch ein KI-System erzeugt wurde, sofern dies für die Nutzerentscheidung relevant ist.

---

# 18. Voice Input

Langfristig können Nutzer Aufgaben und Zustände per Sprache erfassen.

Beispiel:

> „Ich muss heute noch Wäsche aufhängen und zum Arzt.“

Daraus können mehrere passende Aufgaben entstehen.

Vor dem Speichern muss der Nutzer die erkannten Inhalte überprüfen können.

---

# 19. Benachrichtigungen

Langfristig können optionale Erinnerungen unterstützt werden.

Mögliche Arten:

- geplante Quest
- Habit-Erinnerung
- Termin
- Recovery-Hinweis
- Tagesrückblick

Benachrichtigungen müssen vollständig deaktivierbar sein.

Die Anwendung soll keine aggressive oder manipulative Notification-Strategie verwenden.

---

# 20. Backend und Persistenz

Nach dem React-Modul soll Adventure Bible durch ein Backend erweitert werden.

Langfristig benötigt die Anwendung:

- Benutzerkonten
- sichere Authentifizierung
- serverseitige Autorisierung
- Persistenz
- API / Backend Services
- Datenbank
- Synchronisation
- Validierung

Geplante Authentifizierung: Clerk.

Die konkrete Datenbank und Backend-Technologie wird im Backend-Modul bewusst entschieden und ist nicht Bestandteil dieser Frontend-Spezifikation.

---

# 21. Datenschutz und Dateneigentum

Persönliche Daten, Journal-Inhalte, Zustandsdaten und Nutzungsverläufe sind sensible Anwendungsdaten.

Die langfristige Anwendung muss:

- nur notwendige Daten speichern,
- Nutzerzugriff serverseitig prüfen,
- Daten eines Nutzers von anderen Nutzern isolieren,
- Secrets getrennt von Nutzdaten verwalten,
- Löschung und Änderung persönlicher Daten ermöglichen,
- sichere Datenübertragung verwenden.

Konkrete Sicherheitsregeln stehen in `docs/SECURITY.md`.

---

# 22. Unicode und Internationalisierung

Alle geeigneten Nutzerinhalte müssen Unicode unterstützen.

Dazu gehören insbesondere:

- Umlaute
- `ß`
- Akzente
- Emojis
- nicht-lateinische Schriftsysteme

Eine spätere Mehrsprachigkeit soll über ein bewusstes Internationalisierungssystem erfolgen.

Dazu gehören langfristig auch:

- Übersetzungen
- Locale-aware Datumsformate
- Locale-aware Zahlenformate
- Pluralisierung
- mögliche RTL-Unterstützung

Unicode-Unterstützung und Mehrsprachigkeit sind getrennte Anforderungen.

---

# 23. Accessibility

Alle langfristigen Systeme müssen die Accessibility-Prinzipien aus `docs/ACCESSIBILITY.md` einhalten.

Neue Features dürfen nicht deshalb auf Accessibility verzichten, weil sie erst später implementiert werden.

Insbesondere müssen berücksichtigt werden:

- Tastatur
- Screenreader
- Touch
- Kontrast
- reduzierte Bewegung
- verständliche Sprache
- kognitive Belastung
- alternative Darstellung von Statusinformationen

---

# 24. Nicht-Ziele

Adventure Bible soll langfristig kein System werden, das:

- Nutzer für schlechte Tage bestraft,
- Produktivität mit persönlichem Wert gleichsetzt,
- zwingende Streaks verwendet,
- aggressive Gamification einsetzt,
- Nutzer mit Benachrichtigungen bombardiert,
- medizinische Diagnosen stellt,
- Entscheidungen vollständig an KI delegiert.

---

# 25. Priorisierung

Die langfristige Vision wird in dieser Reihenfolge bewertet:

1. Kernnutzen
2. Nutzerautonomie
3. Accessibility
4. Datenschutz und Sicherheit
5. Verständlichkeit
6. Personalisierung
7. Game Feeling
8. zusätzliche Komfortfunktionen

Eine spätere Funktion darf den Kernnutzen nicht verschlechtern.
