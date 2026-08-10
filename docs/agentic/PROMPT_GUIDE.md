# Prompt-Anleitung für Agentic Programming

## Die 10 Bausteine eines starken Prompts

1. **Ziel:** Was soll beobachtbar erreicht werden?
2. **Kontext:** Welches Repository, welche Seite, Komponente oder Funktion?
3. **Ist-Zustand:** Was passiert aktuell?
4. **Soll-Zustand:** Was soll stattdessen passieren?
5. **Akzeptanzkriterien:** Woran ist „fertig“ eindeutig erkennbar?
6. **Scope:** Was darf geändert werden?
7. **Nicht-Scope:** Was darf nicht verändert werden?
8. **Arbeitsweise:** Analyse, Plan, Test, Umsetzung, Diff, Bericht.
9. **Verifikation:** Welche Tests oder manuellen Checks sind erforderlich?
10. **Ausgabe:** Welche Belege soll der Agent am Ende liefern?

## Standard-Masterprompt

```text
Arbeite nach der AGENTS.md und lies zuerst alle relevanten Projektregeln.

Ziel:
[ein beobachtbarer Satz]

Ist-Zustand:
[aktuelle Beobachtung]

Soll-Zustand:
[erwartetes Verhalten]

Akzeptanzkriterien:
- [Kriterium 1]
- [Kriterium 2]
- [Kriterium 3]

Scope:
- [erlaubter Bereich]

Nicht-Scope:
- keine Änderungen außerhalb des Nutzerflusses
- keine neuen Abhängigkeiten ohne Begründung/Freigabe
- kein optionales Refactoring
- keine ungefragten Änderungen an Auth, Datenbank, API-Verträgen, CI/CD oder .env*

Vorgehen:
1. Analysiere das relevante Projektumfeld und belege Aussagen mit Dateien.
2. Erstelle einen kurzen Plan, Risiken und eine Todo-Liste.
3. Definiere zuerst Tests oder genaue Prüfschritte.
4. Implementiere die kleinste sinnvolle Änderung.
5. Führe fokussierte und relevante breitere Checks aus.
6. Prüfe den Diff auf unnötige Änderungen.
7. Prüfe Accessibility und Security, falls relevant.

Berichte am Ende:
- Ergebnis
- geänderte Dateien mit Zweck
- Tests/Checks und Resultate
- nicht ausgeführte Checks mit Grund
- verbleibende Risiken
```

## Gute Formulierungen

- „Analysiere zuerst nur, ohne Dateien zu ändern.“
- „Nenne zu jeder technischen Aussage den konkreten Dateipfad.“
- „Markiere Annahmen ausdrücklich.“
- „Implementiere die kleinste Änderung, die alle Kriterien erfüllt.“
- „Ändere keine Dateien außerhalb des genehmigten Scopes.“
- „Schwäche keine Tests oder Assertions.“
- „Trenne optionale Refactorings vom Bugfix.“

## Feedback an den Agenten

```text
Akzeptanzkriterium 2 ist nicht erfüllt. Beobachtung: [konkret].
Analysiere nur den betroffenen Pfad erneut, erkläre die Ursache mit Code-Beleg und korrigiere minimal. Ändere keine anderen Dateien.
```

```text
Der Diff enthält nicht beauftragte Änderungen in [Dateien].
Entferne sie und behalte nur Änderungen, die direkt für [Ziel] nötig sind.
Wiederhole dieselben Checks.
```
