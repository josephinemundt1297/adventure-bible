# Prompt: Kontrolliertes Refactoring

```text
Führe ein verhaltensbewahrendes Refactoring durch.

Strukturelles Problem:
[Problem]

Gewünschter Nutzen:
[Nutzen]

Grenzen:
- Verhalten und öffentliche Schnittstellen bleiben unverändert,
- nur [Dateien/Bereich],
- keine Feature- oder Bugfix-Änderungen,
- keine neue Abhängigkeit ohne Freigabe.

Erstelle zuerst einen Plan und liste die Verhaltensinvarianten. Prüfe, welche Tests diese absichern, und ergänze nur nötige Charakterisierungstests. Refaktoriere in kleinen Schritten, führe nach jedem Schritt fokussierte Tests aus und prüfe den Diff auf Scope-Abweichungen.
```
