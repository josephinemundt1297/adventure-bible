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
