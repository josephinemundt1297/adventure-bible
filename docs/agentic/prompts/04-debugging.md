# Prompt: Debugging

```text
Analysiere den Bug zuerst, ohne Code zu ändern.

Ist-Zustand:
[Beobachtung]

Soll-Zustand:
[Erwartung]

Reproduktionsschritte:
1. ...

Aufgabe:
1. Reproduziere oder validiere den Fehler.
2. Nenne 3-5 wahrscheinliche Ursachen, sortiert nach Wahrscheinlichkeit.
3. Verknüpfe jede Hypothese mit konkreten Dateien und Code-Belegen.
4. Identifiziere direkt, indirekt und testrelevant betroffene Dateien.
5. Schlage einen minimalen Fix und einen Regressionstest vor.
6. Implementiere erst danach den kleinsten Fix.
7. Wiederhole Reproduktion und relevante Checks.

Kein optionales Refactoring im Bugfix-Diff.
```
