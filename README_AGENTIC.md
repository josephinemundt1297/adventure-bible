# Adventure Bible – Agentic Programming

Adventure Bible uses a controlled, evidence-based Agentic Programming workflow.

The goal is not maximum autonomous code generation. The goal is controlled, testable and traceable development.

## Core rule

> The agent works within the project's documented rules. It does not invent product requirements.

## Documentation hierarchy

Start with `AGENTS.md`, then read only the documentation relevant to the current task.

### Product

- `docs/PROJECT.md` – product vision and principles
- `docs/FEATURES.md` – feature scope and MVP boundary

### Design and quality

- `docs/DESIGN.md` – UI and UX
- `docs/ACCESSIBILITY.md` – accessibility
- `docs/SECURITY.md` – security and authentication

### Technical

- `docs/ARCHITECTURE.md` – technical architecture
- `docs/ROADMAP.md` – current MVP plan

### Agentic workflow

- `docs/AGENTIC.md` – detailed workflow and phase gates
- `docs/agentic/PROJECT_CONTEXT.md` – evidence-based project context
- `docs/agentic/` – task, bug, test, review and prompt templates
- `docs/SKILLS.md` – available project skills
- `skills/` – reusable agent skills

## Standard task loop

```text
Understand
→ Inspect
→ Scope
→ Plan
→ Acceptance criteria
→ Test / Verification
→ Implement
→ Checks
→ Review diff
→ Report
```

## Guardrails

The agent must not silently:

- expand MVP scope;
- weaken accessibility;
- weaken security;
- add dependencies without a reason and justification;
- remove or bypass tests;
- expose secrets;
- treat assumptions as requirements;
- replace Unicode support with unnecessary ASCII-only validation;
- invent authentication or credential storage outside the documented architecture.

## Quality gates

A feature is not complete merely because the code compiles.

Relevant tests, linting, type checks, build checks, accessibility checks, security checks and manual verification must be considered before declaring work complete.

## Templates

For repeatable work, use the appropriate template under `docs/agentic/` rather than improvising a new process.

## Workflow source

The workflow in `docs/AGENTIC.md` is adapted from the provided `agentic-programming-workflow` package and customized for Adventure Bible.
