# Adventure Bible – Development Log

## Zweck

Dieses Dokument ist das persönliche Entwicklungs- und Lerntagebuch des Abschlussprojekts.

Es dokumentiert nicht nur, **was im Repository passiert ist**, sondern vor allem den eigenen Entwicklungsprozess:

- Was wurde an diesem Tag gemacht?
- Welche Entscheidungen wurden selbst getroffen?
- Welche Probleme wurden selbst analysiert?
- Was wurde bewusst anders gemacht oder überarbeitet?
- Worauf lag der persönliche Fokus?
- Was wurde gelernt?
- Was soll am nächsten Tag weitergeführt werden?

Das Tagebuch ist damit Bestandteil der Projektdokumentation und kann für die Abschlusspräsentation bzw. Rückfragen zum Entwicklungsprozess verwendet werden.

---

# Wichtig: Autorenschaft

Die persönlichen Reflexionsabschnitte dieses Dokuments werden **von Josi selbst geschrieben**.

Ein Agent darf diese Reflexionen nicht erfinden, vervollständigen oder als eigene Beobachtung ausgeben.

Ein Agent darf:

- an erledigte technische Arbeiten erinnern,
- Git-Diffs oder Commits als Fakten zusammenfassen,
- offene Punkte für den nächsten Eintrag auflisten,
- Fragen als Schreibimpuls stellen,
- beim Strukturieren eines von Josi gelieferten Textes helfen.

Ein Agent darf nicht behaupten, dass Josi etwas gelernt, entschieden, verstanden oder bewusst überarbeitet hat, wenn dies nicht von ihr selbst dokumentiert wurde.

Die persönliche Reflexion ist bewusst **menschlich und nicht automatisiert**.

---

# Tagesvorlage

Für jeden Projekttag wird ein eigener Abschnitt angelegt.

## 2026-08-10 – Tag 1: Fundament

### 1. Was habe ich heute gemacht?

Heute habe ich die Grundlage für mein Abschlussprojekt Adventure Bible vorbereitet. Ich habe nicht direkt mit dem Programmieren angefangen, sondern zuerst das Projekt konzeptionell und organisatorisch aufgestellt.

- Produktvision und grundlegende Anforderungen festgelegt
- Designrichtung und App-Aufbau definiert
- Feature-Scope mit MVP, Post-MVP und langfristiger Vision strukturiert
- Accessibility als festen Bestandteil des Projekts definiert
- Security als eigenen Projektbereich aufgenommen
- Unicode-Unterstützung und den Umgang mit Sonderzeichen berücksichtigt
- Clerk als geplante Authentifizierung für die spätere Backend-Phase festgelegt
- technische Architektur und Projekt-Roadmap vorbereitet
- meinen Agentic-Programming-Workflow in das Projekt integriert
- Skills, Templates und Prompts für den Workflow vorbereitet
- ein persönliches Entwicklungs- und Lerntagebuch für das Projekt eingerichtet

### 2. Was habe ich selbst entschieden?

**Mein Eintrag:**

> Ich habe mich bewusst dafür entschieden, nicht einfach irgendeinen Habit Tracker zu bauen, sondern Adventure Bible als App zu entwickeln, die sich dem Nutzer anpasst und nicht den Nutzer an ein starres System anpasst.
>
> Besonders wichtig war mir, dass die App Game Feeling bekommt, ohne den Nutzer mit zu vielen Informationen und Möglichkeiten zu überfordern. Ich möchte, dass möglichst schnell erkennbar ist, was die nächste sinnvolle Aktion ist.
>
> Ich habe außerdem selbst entschieden, Mobile-first zu arbeiten und auch auf dem Desktop den Charakter einer App beizubehalten. DaisyUI soll dabei Teil des Projekts werden.

### 3. Was habe ich selbst überarbeitet oder hinterfragt?

**Mein Eintrag:**

> Ich habe den Aufbau und das Design mehrfach hinterfragt. Ein früherer Entwurf hatte für mich zu viele Details und zu viele gleichwertige Möglichkeiten. Ich habe deshalb bewusst zurückgenommen und stärker darauf fokussiert, dass die App einfach verständlich bleibt.
>
> Außerdem habe ich hinterfragt, wie wir mit Sonderzeichen und anderen Sprachen umgehen. Mir war wichtig, dass nicht einfach nur deutsche Buchstaben funktionieren, sondern Unicode grundsätzlich unterstützt wird. Gleichzeitig wollte ich Sicherheit nicht dadurch herstellen, dass Sonderzeichen verboten werden. Daraus entstand die Entscheidung, Sicherheit über sichere Verarbeitung und Validierung zu lösen und nicht über unnötige Einschränkungen.
>
> Auch die spätere Authentifizierung habe ich bewusst mitgedacht und mich für Clerk als geplante Lösung entschieden, statt Login und Passwortverwaltung später selbst zu erfinden.

### 4. Worauf habe ich heute besonders fokussiert?

**Mein Fokus:**

> Heute lag mein Fokus vor allem auf der Planung und dem Fundament des Projekts. Besonders wichtig waren für mich UX, Accessibility, Security, Architektur und Agentic Programming.
>
> Ich wollte heute bewusst noch nicht möglichst viel Code schreiben. Stattdessen wollte ich sicherstellen, dass wir morgen nicht planlos anfangen, sondern einen klaren Rahmen haben, innerhalb dessen wir entwickeln können.

### 5. Was habe ich gelernt?

**Mein Learning:**

> Ich habe heute vor allem gemerkt, wie viel bei einem guten Softwareprojekt schon vor dem eigentlichen Programmieren entschieden werden muss.
>
> Ich habe außerdem gelernt, dass Accessibility nicht nur bedeutet, dass eine Website mit einem Screenreader funktioniert. Bei Adventure Bible spielt für mich auch die kognitive Accessibility eine große Rolle: Die App darf nicht selbst zu einer zusätzlichen Überforderung werden.
>
> Bei Security habe ich mich außerdem bewusst mit der Frage beschäftigt, dass Sonderzeichen nicht automatisch eine Sicherheitslücke darstellen. Entscheidend ist, wie Eingaben verarbeitet, validiert und später mit Datenbanken und anderen Systemen verwendet werden.

### 6. Wo hat mir Agentic Programming geholfen?

**Mein Eintrag:**

> Der Agentic-Programming-Workflow hat mir heute vor allem dabei geholfen, meine Gedanken in überprüfbare Projektregeln zu übersetzen. Ich wollte nicht einfach nur eine Sammlung von Markdown-Dateien haben, sondern einen Ablauf, der später verhindert, dass der Agent einfach unkontrolliert Code produziert.
>
> Wichtig war für mich dabei auch die Trennung zwischen dem, was ich selbst entscheide, und dem, wobei mir der Agent hilft. Gerade bei persönlichen Produktentscheidungen und meiner späteren Reflexion soll nicht der Agent für mich entscheiden oder meine Gedanken erfinden.

### 7. Was war schwierig?

**Mein Eintrag:**

> Schwierig war heute vor allem, die vielen Ideen zu begrenzen. Adventure Bible könnte sehr schnell zu einem riesigen RPG-System werden. Ich musste deshalb immer wieder zwischen dem unterscheiden, was ich langfristig cool fände, und dem, was für das Abschlussprojekt wirklich notwendig ist.
>
> Außerdem war es eine Herausforderung, die Dokumentation so aufzubauen, dass sie ausführlich genug für den Agentic-Workflow ist, aber nicht zu einer Dokumentationslawine wird.

### 8. Was ist noch offen?

- technische Installation und Konfiguration der benötigten Dependencies
- DaisyUI/Tailwind-Setup
- konkrete Projektstruktur im Source Code
- Routing und State-Management konkretisieren
- erste UI-Komponenten umsetzen
- MVP Schritt für Schritt implementieren
- Tests und Accessibility-Prüfungen während der Entwicklung

### 9. Nächster Schritt

**Mein Plan für den nächsten Projekttag:**

> Morgen möchte ich vom vorbereiteten Fundament in die eigentliche Umsetzung gehen. Zuerst soll der technische Ist-Zustand geprüft und das Projekt entsprechend der festgelegten Architektur vorbereitet werden. Danach möchte ich mit dem eigentlichen UI und dem ersten funktionierenden MVP-Teil beginnen.

---

## 2026-08-11 – Tag 2: Technisches Fundament

### 1. Was habe ich heute gemacht?

Heute habe ich mit der technischen Umsetzung von Adventure Bible begonnen und das vorbereitete Projektfundament in eine funktionierende React-Anwendung überführt.

- aktuellen Git- und Projektstatus geprüft
- mit `git log --oneline -5` die letzten Commits kontrolliert
- mit `npm list --depth=0` den aktuellen Dependency-Stand geprüft
- Tailwind CSS und DaisyUI installiert bzw. in das Projekt integriert
- Tailwind über `@tailwindcss/vite` in Vite eingebunden
- DaisyUI über `index.css` als Tailwind-Plugin aktiviert
- einen kleinen DaisyUI-Smoke-Test durchgeführt und anschließend wieder entfernt
- den bestehenden Vite-/React-Build erfolgreich getestet
- die Projektstruktur mit der definierten Architektur abgeglichen
- festgestellt, dass die zunächst angelegten Architekturordner fälschlicherweise im Projekt-Root lagen
- die leeren Root-Verzeichnisse entfernt und die Struktur korrekt unter `src/` angelegt
- `AppShell` als erste echte Anwendungskomponente erstellt
- `AppShell` in `App.tsx` integriert
- sowohl Production Build als auch Development Server erfolgreich getestet
- am Ende den Git-Status geprüft und einen sauberen Repository-Zustand hergestellt
- die geplante Navigation hinterfragt und festgestellt, dass statt einer temporären Fake-Navigation direkt TanStack Router integriert werden sollte

### 2. Was habe ich selbst entschieden?

**Mein Eintrag:**

> Ich habe mich bewusst dafür entschieden, bei der technischen Umsetzung nicht einfach möglichst schnell Code zu produzieren. Ich wollte verstehen, warum wir die einzelnen Schritte machen und welche Aufgabe die jeweiligen Werkzeuge haben.
>
> Besonders wichtig war mir, dass ich die Architektur nicht nur übernehme, sondern nachvollziehen kann. Als wir eine Navigation zunächst ohne Router bauen wollten, habe ich hinterfragt, warum wir nicht direkt den bereits festgelegten TanStack Router verwenden. Für mich macht es mehr Sinn, die tatsächliche Architektur direkt aufzubauen, statt zunächst eine temporäre Lösung zu implementieren, die später wieder ersetzt werden müsste.
>
> Ich habe außerdem bewusst darauf geachtet, dass die Projektstruktur meiner festgelegten Architektur entspricht und nicht einfach Dateien dort abgelegt werden, wo es gerade funktioniert.

### 3. Was habe ich selbst überarbeitet oder hinterfragt?

**Mein Eintrag:**

> Ich habe während der Arbeit mehrfach innegehalten und überprüft, ob ich die Entscheidungen wirklich verstehe.
>
> Besonders deutlich wurde das bei der Projektstruktur. Nachdem ich festgestellt hatte, dass die Architekturordner im Root lagen, habe ich den tatsächlichen Projektstand überprüft und die leeren Ordner anschließend an die richtige Stelle unter `src/` verschoben.
>
> Auch beim Terminal habe ich gemerkt, wie wichtig es ist, vor Änderungen immer zu prüfen, wo ich mich befinde. `pwd` ist dadurch für mich zu einer festen Regel geworden: Erst den Standort prüfen, dann Befehle ausführen.
>
> Außerdem habe ich hinterfragt, warum wir zunächst eine einfache Navigation ohne Router bauen wollten. Da TanStack Router bereits Bestandteil der geplanten Architektur ist, möchte ich keine unnötige Zwischenlösung entwickeln.

### 4. Worauf habe ich heute besonders fokussiert?

**Mein Fokus:**

> Mein Fokus lag heute darauf, nicht nur funktionierenden Code zu erzeugen, sondern den technischen Aufbau wirklich zu verstehen.
>
> Ich wollte insbesondere verstehen, wie React, Vite, TypeScript, Tailwind CSS und DaisyUI miteinander zusammenspielen und warum Dateien und Komponenten an bestimmten Stellen der Projektstruktur liegen.
>
> Außerdem lag mein Fokus auf einem kontrollierten Entwicklungsprozess: erst prüfen, dann eine kleine Änderung machen, anschließend Build bzw. Anwendung testen und erst danach weitermachen.

### 5. Was habe ich gelernt?

**Mein Learning:**

> Ich habe heute mehrere Grundlagen besser verstanden, die ich vorher eher nur angewendet hätte.
>
> `git status` zeigt nicht nur den aktuellen Branch, sondern auch den Zustand meines Arbeitsverzeichnisses und ob Änderungen vorhanden sind. `git log --oneline -5` zeigt die letzten fünf Commits in kompakter Form.
>
> Bei `npm list --depth=0` habe ich verstanden, dass ich damit die direkt installierten Dependencies meines Projekts kontrollieren kann. Die Dependencies zu prüfen ist wichtig, um den tatsächlichen technischen Stack zu kennen, doppelte Installationen zu vermeiden und Versionskompatibilität zu berücksichtigen.
>
> Ich habe verstanden, dass Tailwind über das Vite-Plugin in den Build-Prozess eingebunden wird und DaisyUI anschließend als Tailwind-Plugin über `index.css` aktiviert wird.
>
> Außerdem habe ich gelernt, was ein Smoke-Test ist: ein kleiner grundlegender Funktionstest, der überprüft, ob eine technische Integration grundsätzlich funktioniert. Bei DaisyUI haben wir damit nicht das gesamte System getestet, sondern lediglich überprüft, ob eine DaisyUI-Komponente tatsächlich verarbeitet und im Browser dargestellt wird.
>
> Bei der Architektur habe ich verstanden, dass `src/` in unserem Projekt den eigentlichen Anwendungscode enthält und TypeScript in unserer Konfiguration explizit diesen Bereich als Application Source einbezieht.
>
> Ich habe außerdem verstanden, dass Git keine leeren Verzeichnisse versioniert.
>
> Bei `AppShell` habe ich einen wichtigen Unterschied verstanden: `children` erklärt, wie die Komponente ihren Inhalt erhält, aber die Ablage unter `app/` ergibt sich aus der Verantwortung der Komponente. `AppShell` ist für das globale Application Layout zuständig und deshalb kein generisches UI-Element.

### 6. Wo hat mir Agentic Programming geholfen?

**Mein Eintrag:**

> Der Agentic-Programming-Ansatz hat mir heute vor allem geholfen, bewusst in kleinen, überprüfbaren Schritten zu arbeiten.
>
> Statt mehrere Änderungen gleichzeitig vorzunehmen, haben wir beispielsweise zuerst die Dependencies geprüft, anschließend Tailwind und DaisyUI integriert, danach den Build getestet und erst anschließend die nächste Ebene aufgebaut.
>
> Besonders hilfreich war für mich, dass Fehler oder Unstimmigkeiten nicht einfach übergangen wurden. Die falsch liegenden Architekturordner wurden erkannt, überprüft und korrigiert, bevor echter Anwendungscode darauf aufgebaut wurde.
>
> Gleichzeitig habe ich gemerkt, dass ich dem Agenten nicht einfach folgen möchte. Wenn eine vorgeschlagene Lösung für mich keinen Sinn ergibt, möchte ich nachfragen und die Entscheidung verstehen. Das Beispiel mit der geplanten Fake-Navigation und TanStack Router hat mir das besonders deutlich gemacht.

### 7. Was war schwierig?

**Mein Eintrag:**

> Schwierig war für mich vor allem, gleichzeitig zu programmieren und die technischen Zusammenhänge bewusst zu verstehen.
>
> Ich musste mich mehrfach bremsen und nachfragen, warum wir einen bestimmten Schritt machen, anstatt einfach den nächsten Befehl auszuführen.
>
> Ein kleiner praktischer Fehler war, dass ich zunächst nicht berücksichtigt hatte, dass ich vor Terminal-Befehlen immer meinen aktuellen Standort prüfen sollte. Dadurch wurde mir die Bedeutung von `pwd` noch einmal sehr praktisch bewusst.
>
> Außerdem habe ich gemerkt, dass ich bei der Architektur besonders darauf achten muss, nicht einfach vorhandene Ordner oder Dateien zu verwenden, sondern ihre jeweilige Verantwortung zu verstehen.

### 8. Was ist noch offen?

- TanStack Router als tatsächliche Routing-Lösung integrieren
- Routing-Architektur entsprechend der bestehenden Projektregeln festlegen
- App Shell weiter ausbauen
- Bottom Navigation mit dem tatsächlichen Router verbinden
- erste echte App-Routen erstellen
- Mobile-first Layout weiterentwickeln
- A11Y bei den ersten interaktiven Komponenten überprüfen
- erste Feature-Strukturen aufbauen
- Tests ergänzen
- MVP schrittweise implementieren

### 9. Nächster Schritt

**Mein Plan für den nächsten Projekttag:**

> Als Nächstes möchte ich TanStack Router direkt in das Projekt integrieren, statt zunächst eine temporäre Navigation zu bauen.
>
> Dabei möchte ich verstehen, welche Pakete und welche Struktur dafür benötigt werden und wie der Router mit unserer `AppShell` und der geplanten Navigation zusammenspielt.
>
> Erst danach möchte ich die ersten tatsächlichen Routen und die Navigation aufbauen.

---

# Abschlussreflexion

Am Ende des Projekts wird zusätzlich eine persönliche Abschlussreflexion ergänzt.

## Was habe ich gelernt?

>

## Was kann ich jetzt besser als vor dem Projekt?

>

## Welche Entscheidungen würde ich heute anders treffen?

>

## Was habe ich über React gelernt?

>

## Was habe ich über Agentic Programming gelernt?

>

## Was habe ich über meine eigene Arbeitsweise gelernt?

>

## Worauf bin ich bei diesem Projekt besonders stolz?

>

## Was würde ich in einer nächsten Version verbessern?

>

---

# Dokumentationsregeln

- Eintrag möglichst am Ende jedes Projekttages erstellen.
- Fakten und persönliche Reflexion voneinander trennen.
- Keine nachträgliche Schönfärbung des Entwicklungsprozesses.
- Fehler und verworfene Ansätze dürfen ausdrücklich dokumentiert werden.
- Technische Entscheidungen möglichst mit dem tatsächlichen Projektstand abgleichen.
- Persönliche Erkenntnisse in eigenen Worten festhalten.
- Keine sensiblen Zugangsdaten, Tokens, Passwörter oder personenbezogenen Secrets dokumentieren.

Das Ziel ist nicht, jeden Terminal-Befehl zu protokollieren.

Das Ziel ist, **den eigenen Entwicklungsprozess sichtbar zu machen**.
