# Review- und Diff-Checkliste

## 1. Scope

- [ ] Die geänderten Dateien entsprechen dem genehmigten Plan.
- [ ] Jede Änderung unterstützt ein Akzeptanzkriterium.
- [ ] Keine unnötigen Umbenennungen, Formatierungen oder Aufräumarbeiten.
- [ ] Bugfix und Refactoring sind getrennt.

## 2. Korrektheit

- [ ] Hauptfall funktioniert.
- [ ] Fehlerfall funktioniert.
- [ ] Randfälle sind berücksichtigt.
- [ ] Loading-, Empty-, Error- und Success-Zustände sind korrekt.
- [ ] Keine offensichtlichen Race Conditions, stale States oder falschen Zustandsübergänge.

## 3. React/UI

- [ ] Hooks werden regelkonform verwendet.
- [ ] Effect-Abhängigkeiten sind korrekt und der Effect ist wirklich nötig.
- [ ] State liegt beim richtigen Besitzer und wird korrekt initialisiert/zurückgesetzt.
- [ ] Listen verwenden stabile Keys.
- [ ] Fokus, Tastaturbedienung und verständliche Labels bleiben erhalten.
- [ ] Responsive Layout und Kontrast wurden bei visuellen Änderungen geprüft.
- [ ] Unicode- und Textdarstellung funktionieren mit relevanten Zeichen.

## 4. Tests

- [ ] Der Test prüft beobachtbares Verhalten.
- [ ] Ein Regressionstest deckt den Bug ab.
- [ ] Assertions wurden nicht geschwächt.
- [ ] Keine Tests wurden gelöscht, übersprungen oder übermäßig gemockt.
- [ ] Relevante Befehle und Ergebnisse sind dokumentiert.

## 5. Sicherheit und Verträge

- [ ] Keine unbeabsichtigten Änderungen an Auth, Berechtigungen oder Eingabevalidierung.
- [ ] Keine unbeabsichtigten Änderungen an API-, Daten- oder Routing-Verträgen.
- [ ] Keine Secrets oder `.env*`-Inhalte im Diff.
- [ ] Keine riskanten Dependency-, CI/CD- oder Deployment-Änderungen.
- [ ] User Input wird als nicht vertrauenswürdig behandelt.

## 6. Wartbarkeit

- [ ] Bestehende Muster wurden wiederverwendet.
- [ ] Neue Abstraktion hat einen klaren, aktuellen Nutzen.
- [ ] Namen und Verantwortlichkeiten sind verständlich.
- [ ] Der Diff ist klein genug, um sicher reviewed zu werden.

## Review-Ergebnis

- Entscheidung: akzeptieren / überarbeiten / zurückweisen
- Kritische Punkte:
- Wichtige Punkte:
- Optionale Verbesserungen:
- Fehlende Verifikation:
