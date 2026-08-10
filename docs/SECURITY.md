# Adventure Bible – Security

## Zweck

Sicherheit ist Bestandteil der Architektur und wird nicht erst mit dem Backend nachträglich ergänzt.

Adventure Bible verarbeitet später persönliche Daten, Zustandsdaten und Authentifizierungsinformationen. Diese Daten müssen von Anfang an mit klaren Sicherheitsgrenzen behandelt werden.

---

# 1. Grundprinzip

> **Sonderzeichen sind kein Sicherheitsproblem. Unsichere Verarbeitung von Eingaben ist es.**

Legitime Unicode-Zeichen wie `ä`, `ö`, `ü`, `ß`, `'`, `é`, `ñ`, kyrillische oder CJK-Zeichen dürfen nicht pauschal verboten werden, um vermeintliche Injection-Angriffe zu verhindern.

Sicherheit entsteht durch sichere Verarbeitung und passende Schutzmaßnahmen.

---

# 2. User Input ist nicht vertrauenswürdig

Alle Daten, die von einem Nutzer oder einem externen System kommen, gelten als untrusted input.

Das betrifft unter anderem:

- Profilnamen
- Charakternamen
- Quest-Titel
- Quest-Beschreibungen
- Journal-Einträge
- Suchbegriffe
- URL-Parameter
- Formulardaten
- Daten aus externen APIs

Validierung muss sowohl syntaktisch als auch semantisch erfolgen, wenn dies für das jeweilige Feld sinnvoll ist.

Client-seitige Validierung verbessert die UX, ist aber keine Sicherheitsgrenze. Sicherheitsrelevante Prüfungen müssen auf der vertrauenswürdigen Server-Seite erfolgen.

---

# 3. Unicode und Normalisierung

Freitext muss Unicode-fähig verarbeitet werden.

Bei geeigneten Eingaben können Unicode-Normalisierung und kontextbezogene Zeichenregeln eingesetzt werden.

Es darf keine pauschale ASCII-only-Validierung verwendet werden.

Felder mit strukturierten Werten, beispielsweise bestimmte IDs oder technische Schlüssel, dürfen dagegen bewusst restriktiver sein, wenn der technische Zweck dies verlangt.

Validierungsregeln müssen immer zum jeweiligen Feld gehören und dürfen nicht als globale Regel für alle Texte verwendet werden.

---

# 4. XSS und Output Encoding

User Input darf niemals als vertrauenswürdiges HTML behandelt werden.

Insbesondere:

- keine unkontrollierte Verwendung von `dangerouslySetInnerHTML`
- User Content standardmäßig als Text rendern
- HTML nur nach bewusster, sicherer Verarbeitung erlauben
- Ausgabe kontextabhängig absichern

Input-Validierung allein ist kein ausreichender Schutz gegen XSS.

---

# 5. SQL Injection

Sobald eine Datenbank eingeführt wird:

- keine SQL-Abfragen durch String-Konkatenation aus User Input erzeugen
- parametrisierte Queries bzw. sichere ORM-/Query-Builder-Mechanismen verwenden
- Datenbankzugriffe serverseitig ausführen
- Datenbankberechtigungen nach dem Prinzip der geringsten Rechte vergeben

Sonderzeichen wie Apostrophe oder Unicode-Zeichen dürfen nicht durch fragiles manuelles Escaping „sicher“ gemacht werden.

---

# 6. Authentifizierung

Für die spätere Authentifizierung ist **Clerk** vorgesehen.

Adventure Bible soll die Authentifizierung nicht unnötig selbst implementieren.

Clerk übernimmt insbesondere den Bereich der Benutzeranmeldung und Session-Verwaltung.

Die aktuelle Sicherheitsplanung orientiert sich an einer Integration über das offizielle React SDK.

Bei der späteren Integration müssen aktuelle Clerk-Dokumentation und Sicherheitsoptionen geprüft werden.

---

# 7. Passwörter und Zugangsdaten

Adventure Bible soll Passwörter nicht selbst speichern, wenn Clerk die Authentifizierung übernimmt.

Insbesondere:

- keine Passwörter in der Adventure-Bible-Datenbank speichern
- keine Passwörter in Logs schreiben
- keine Secrets im Frontend hardcoden
- keine Secrets committen
- keine API-Keys in Git einchecken

Clerk-spezifische Zugangsdaten und andere Secrets gehören in geeignete Umgebungsvariablen bzw. Secret-Management.

---

# 8. Sessions und Autorisierung

Authentifizierung und Autorisierung sind unterschiedliche Dinge.

Es reicht nicht aus, eine UI nur dann anzuzeigen, wenn ein Nutzer eingeloggt ist.

Sensible Daten und serverseitige Ressourcen müssen serverseitig autorisiert werden.

Clientseitige UI-Gates sind Komfort und UX, keine alleinige Sicherheitsgrenze.

---

# 9. Datenbank und persönliche Daten

Die spätere Datenbank darf nur Daten speichern, die für die Anwendung notwendig sind.

Für jeden Datentyp soll geklärt werden:

- Warum wird er gespeichert?
- Wer darf ihn lesen?
- Wer darf ihn verändern?
- Wie lange wird er benötigt?
- Kann er gelöscht werden?

Besonders persönliche Daten sollen nicht unnötig gesammelt werden.

---

# 10. Least Privilege

Jede Anwendungskomponente und jeder Datenbankzugang soll nur die Rechte erhalten, die tatsächlich benötigt werden.

Keine unnötigen Admin-Rechte.

Keine direkte Datenbankverbindung aus dem Browser.

Sensible Operationen gehören auf eine vertrauenswürdige Server-Seite.

---

# 11. Fehler und Logs

Fehlermeldungen dürfen keine sensiblen Informationen preisgeben.

Nicht in Logs schreiben:

- Passwörter
- Authentifizierungs-Tokens
- vollständige Session-Daten
- Secrets
- unnötige persönliche Daten

Technische Fehler sollen für Entwickler ausreichend diagnostizierbar sein,
ohne sensible Informationen an Nutzer oder Logs zu geben.

---

# 12. Dependency Security

Neue Dependencies müssen einen nachvollziehbaren Zweck haben.

Bei sicherheitsrelevanten Dependencies sollen aktuelle, offizielle Dokumentationen und bekannte Sicherheitsmeldungen berücksichtigt werden.

Dependencies dürfen nicht nur deshalb hinzugefügt werden, weil sie eine kleine Funktion bequem machen, wenn diese Funktion mit bestehenden Mitteln sicher umgesetzt werden kann.

---

# 13. Security Testing

Sicherheitsrelevante Features benötigen Tests für mindestens:

- ungültige Eingaben
- Unicode-Eingaben
- Sonderzeichen
- sehr lange Eingaben
- leere Eingaben
- manipulierte Requests
- unautorisierte Zugriffe
- Authentifizierungszustände

Bei Datenbankzugriffen sind insbesondere Injection-Szenarien zu berücksichtigen.

---

# 14. Sicherheits-Checkliste

Vor dem Abschluss eines sicherheitsrelevanten Features:

- [ ] User Input wird als untrusted behandelt.
- [ ] Unicode und legitime Sonderzeichen funktionieren.
- [ ] Keine unnötige ASCII-only-Validierung.
- [ ] Client-Validierung wird nicht als Sicherheitsgrenze verwendet.
- [ ] Output wird sicher verarbeitet.
- [ ] Keine dynamischen SQL-Queries durch String-Konkatenation.
- [ ] Keine Secrets im Repository.
- [ ] Keine Passwörter in der eigenen Datenbank, wenn Clerk diese Aufgabe übernimmt.
- [ ] Autorisierung erfolgt serverseitig für geschützte Ressourcen.
- [ ] Fehler und Logs geben keine sensiblen Daten preis.
- [ ] Relevante Security-Tests wurden durchgeführt.
