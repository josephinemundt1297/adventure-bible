# Testplan

## Erwartetes Verhalten

`{{Beschreibe das Verhalten aus Nutzer- oder Aufruferperspektive.}}`

## Testfälle

| Priorität | Fall | Ausgangslage | Aktion | Erwartung | Automatisch/manuell |
|---|---|---|---|---|---|
| P0 | Hauptfall | | | | |
| P0 | Fehlerfall | | | | |
| P1 | Randfall | | | | |
| P1 | Regression | | | | |
| P1 | Accessibility/Responsive | | | | |

## Red → Green → Refactor

### Red

- Testdatei oder Prüfschritt:
- Ausgeführter Befehl:
- Erwarteter Fehler:
- Tatsächlicher Fehler:
- Bestätigung, dass der Test aus dem richtigen Grund fehlschlägt: ja/nein

### Green

- Minimale Implementierung:
- Fokussierter Testbefehl:
- Ergebnis:

### Refactor

- Ist Refactoring nötig? ja/nein
- Verhalten, das unverändert bleiben muss:
- Zusätzliche Checks nach Refactoring:

## Prüf-Reihenfolge

- [ ] Einzelner Test oder betroffene Testdatei
- [ ] Verwandte Unit-/Component-Tests
- [ ] Integrationstest des Nutzerflusses
- [ ] Lint
- [ ] Typecheck
- [ ] Build
- [ ] E2E für kritische Flows
- [ ] Manuelle Browserprüfung
- [ ] Accessibility-Prüfung, wenn UI betroffen ist
- [ ] Security-Prüfung, wenn sicherheitsrelevante Bereiche betroffen sind

## Manuelle Prüfschritte

### Voraussetzungen

- Umgebung:
- Testdaten:
- Rolle:
- Browser/Viewport:

### Schritte

1. 
2. 
3. 

### Erwartete Ergebnisse

- 

## Ergebnisprotokoll

| Check | Befehl/Methode | Ergebnis | Notiz |
|---|---|---|---|
| Fokussierter Test | | pass/fail/not run | |
| Verwandte Tests | | | |
| Lint | | | |
| Typecheck | | | |
| Build | | | |
| E2E | | | |
| Accessibility | | | |
| Security | | | |
| Manuell | | | |

## Umgang mit Fehlern

- Ersten aussagekräftigen Fehler lesen.
- Ursache als Code-, Test-, Daten- oder Umgebungsproblem einordnen.
- Keine Tests überspringen, löschen oder schwächen.
- Kleinste gezielte Korrektur durchführen.
- Fokussierten Check erneut ausführen.
