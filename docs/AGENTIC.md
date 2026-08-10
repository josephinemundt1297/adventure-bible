# Adventure Bible – Agentic Workflow

## Zweck

Adventure Bible verwendet einen kontrollierten Agentic-Programming-Workflow.

Der Agent soll nicht möglichst viel Code autonom erzeugen, sondern Änderungen nachvollziehbar, testbar und begrenzt durchführen.

Die verbindliche Reihenfolge lautet:

```text
Kontext
→ Ist/Soll
→ Scope
→ Plan
→ Akzeptanzkriterien
→ Test / Verifikation
→ Umsetzung
→ Checks
→ Diff-Review
→ Bericht
```

---

# 1. Phase Gates

Keine Phase wird übersprungen, wenn die Aufgabe nicht nachweislich trivial ist.

| Gate | Erforderlicher Nachweis | Weiter wenn |
|---|---|---|
| Kontext | Projektstruktur, Regeln, relevante Dateien und Befehle | Aussagen sind belegt |
| Scope | Ist-Zustand, Soll-Zustand, Scope, Nicht-Scope | ein klares Ziel existiert |
| Plan | Schritte, Risiken, Akzeptanzkriterien | jeder Schritt prüfbar ist |
| Test | Test oder präziser manueller Prüfschritt | erwartetes Verhalten prüfbar ist |
| Umsetzung | kleinste sinnvolle Änderung | Akzeptanzkriterien erfüllt sind |
| Review | Diff, Checks, Risiko-Review | keine unnötigen oder unsicheren Änderungen verbleiben |

---

# 2. Projektanalyse

Vor Änderungen werden mindestens die relevanten Teile von Folgendem geprüft:

- `AGENTS.md`
- `README.md`
- relevante Produkt-, Design-, Accessibility- und Security-Dokumentation
- `package.json`
- Lockfile
- TypeScript-, Vite-, Test- und Lint-Konfiguration
- relevante Komponenten und Entry Points
- Routing, State und Datenzugriff, sofern vorhanden
- CI/CD und Deployment, sofern relevant

Repository-Evidenz ist maßgeblich.

Keine Befehle, Dateien oder Konventionen erfinden, wenn sie nicht belegt sind.

Annahmen müssen ausdrücklich als Annahmen gekennzeichnet werden.

---

# 3. Planmodus

Bei Multi-File-, Verhaltens-, Risiko- oder unklaren Aufgaben wird vor der Implementierung geplant.

Der Plan enthält:

1. Ziel und beobachtbares Ergebnis
2. aktuellen Zustand
3. gewünschten Zustand
4. Scope
5. Nicht-Scope
6. betroffene Dateien/Bereiche in Untersuchungsreihenfolge
7. Risiken und Annahmen
8. geordnete Todo-Liste
9. Akzeptanzkriterien
10. Test- bzw. Verifikationsstrategie

Große oder gemischte Aufgaben werden in kleinere Änderungen geteilt.

---

# 4. Test-first

Bei Logik-, Feature- und Bugfix-Arbeit wird erwartetes Verhalten vor der Implementierung definiert.

Wenn automatisierte Tests sinnvoll verfügbar sind:

```text
Red → Green → Refactor
```

- Red: Test bzw. Regression reproduziert das fehlende Verhalten.
- Green: kleinste Implementierung erfüllt das Verhalten.
- Refactor: nur nach grünen Tests und nur innerhalb des freigegebenen Scopes.

Tests dürfen nicht gelöscht, übersprungen, abgeschwächt oder breit gemockt werden, nur um einen grünen Lauf zu erzeugen.

Wenn Automatisierung nicht sinnvoll möglich ist, werden präzise manuelle Prüfschritte mit erwarteten Ergebnissen dokumentiert.

---

# 5. Change Control

Es gilt grundsätzlich:

- nur notwendige Dateien ändern;
- bestehende Komponenten, Hooks, Utilities und Muster wiederverwenden;
- keine Dependency ohne klaren Bedarf und Begründung;
- keine Drive-by-Formatierung;
- keine ungefragten Umbenennungen oder Refactorings;
- keine Verträge oder Datenmodelle ohne Scope ändern;
- keine Sicherheits-, Auth-, Datenbank-, CI/CD- oder Deployment-Änderungen ohne ausdrückliche Freigabe.

Bugfix und optionales Refactoring bleiben getrennt.

---

# 6. Feature Workflow

Für ein neues Feature:

1. Produktanforderung in `FEATURES.md` prüfen.
2. Ist-/Soll-Zustand definieren.
3. Scope und Nicht-Scope festlegen.
4. betroffene Architektur und UI untersuchen.
5. Akzeptanzkriterien erstellen.
6. Tests oder Prüfschritte definieren.
7. kleinste Umsetzung durchführen.
8. fokussierte Checks ausführen.
9. relevante breitere Checks ausführen.
10. Accessibility und Responsive Verhalten prüfen, wenn UI betroffen ist.
11. Security prüfen, wenn Eingaben, Auth, Daten oder Verträge betroffen sind.
12. Diff prüfen.
13. Abschlussbericht erstellen.

---

# 7. Bug Workflow

1. aktuellen Zustand dokumentieren;
2. Soll-Zustand dokumentieren;
3. reproduzierbare Schritte festlegen;
4. Fehler reproduzieren bzw. validieren;
5. 3–5 Hypothesen nach Wahrscheinlichkeit ordnen;
6. Hypothesen mit konkreten Dateien/Code-Belegen verbinden;
7. direkt, indirekt und testrelevant betroffene Dateien bestimmen;
8. Regressionstest oder präzisen Prüfschritt definieren;
9. minimalen Fix planen;
10. kleinsten Fix umsetzen;
11. Reproduktion und relevante Checks wiederholen.

Während der initialen Hypothesenphase wird kein Code geändert.

---

# 8. Refactoring Workflow

Refactoring ist nur zulässig, wenn das strukturelle Problem und der Nutzen klar sind.

Vorher:

- Verhalten festlegen, das unverändert bleiben muss;
- Tests bzw. Charakterisierungstests prüfen;
- Scope begrenzen.

Währenddessen:

- kleine Schritte;
- fokussierte Checks nach jedem sinnvollen Schritt;
- keine Feature- oder Bugfix-Änderungen im selben Scope.

---

# 9. Accessibility Gate

Bei UI-Änderungen müssen die relevanten Regeln aus `docs/ACCESSIBILITY.md` berücksichtigt werden.

Mindestens prüfen:

- semantisches HTML
- zugängliche Namen
- Tastaturbedienung
- sichtbarer Fokus
- Touch-Bedienung
- Kontrast
- Status ohne alleinige Farbcodierung
- Responsive Verhalten
- reduzierte Bewegung
- kognitive Belastung

---

# 10. Security Gate

Bei sicherheitsrelevanten Änderungen ist `docs/SECURITY.md` verbindlich.

Besonders kritisch sind:

- Authentifizierung
- Autorisierung
- Clerk
- User Input
- Datenbankzugriffe
- API-Verträge
- Secrets
- `.env*`
- Sessions
- personenbezogene Daten

Client-seitige Validierung ist niemals die alleinige Sicherheitsgrenze.

---

# 11. Diff Review

Vor Abschluss prüfen:

- Entspricht jede Änderung dem Scope?
- Unterstützt jede Änderung ein Akzeptanzkriterium?
- Wurden Tests oder Assertions geschwächt?
- Gibt es unnötige Formatierung?
- Gibt es Drive-by-Refactorings?
- Wurden Secrets oder `.env*` verändert?
- Sind Randfälle und Fehlerzustände berücksichtigt?
- Stimmen gemeldete Checks mit tatsächlich ausgeführten Checks überein?

---

# 12. Abschlussbericht

Jede nicht-triviale Aufgabe endet mit:

### Ergebnis

Was funktioniert jetzt?

### Geänderte Dateien

Welche Dateien wurden geändert und warum?

### Verifikation

Welche Befehle oder manuellen Checks wurden ausgeführt und mit welchem Ergebnis?

### Diff Review

Wurde der Scope geprüft?

### Risiken

Was bleibt offen oder ungeprüft?

### Nächster Schritt

Nur nennen, wenn tatsächlich notwendig.

---

# 13. Verbindliche Templates

Für wiederkehrende Aufgaben liegen Vorlagen unter `docs/agentic/`:

- `PROJECT_CONTEXT.md`
- `TASK_TEMPLATE.md`
- `BUG_REPORT_TEMPLATE.md`
- `TEST_PLAN_TEMPLATE.md`
- `REVIEW_CHECKLIST.md`
- `DEFINITION_OF_DONE.md`
- `PROMPT_GUIDE.md`
- `prompts/`

---

# 14. Projektgrenzen

Der Agent darf aus dem Workflow keine Produktanforderungen ableiten, die nicht in den Projektunterlagen stehen.

Insbesondere darf der Agent nicht stillschweigend:

- den MVP vergrößern;
- Accessibility abschwächen;
- Security abschwächen;
- Authentifizierung selbst neu erfinden, wenn Clerk vorgesehen ist;
- Tests umgehen;
- Secrets ausgeben;
- Unicode-Unterstützung durch unnötige ASCII-Regeln einschränken;
- neue Dependencies ohne Begründung hinzufügen.
