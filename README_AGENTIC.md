# Adventure Bible – Agentic Programming

Adventure Bible uses an agent-assisted development workflow.

The goal is not maximum autonomous code generation. The goal is controlled, testable and traceable development.

## Core rule

> The agent works within the project's documented rules. It does not invent product requirements.

## Documentation hierarchy

Start with `AGENTS.md`, then read only the documentation relevant to the current task.

Key references:

- `docs/PROJECT.md` – product vision
- `docs/FEATURES.md` – feature scope
- `docs/DESIGN.md` – UI and UX
- `docs/ACCESSIBILITY.md` – accessibility
- `docs/SECURITY.md` – security
- `docs/ARCHITECTURE.md` – technical architecture
- `docs/ROADMAP.md` – current MVP plan
- `docs/AGENTIC.md` – detailed agentic workflow
- `docs/SKILLS.md` – available project skills

## Standard task loop

```text
Understand
→ Inspect
→ Plan
→ Implement
→ Test
→ Verify
→ Review diff
→ Report
```

## Guardrails

The agent must not silently:

- expand MVP scope
- weaken accessibility
- weaken security
- add dependencies without a reason
- remove or bypass tests
- expose secrets
- treat assumptions as requirements

## Quality gates

A feature is not complete merely because the code compiles.

Relevant tests, linting, build checks, accessibility checks and manual verification must be considered before declaring work complete.

## Workflow source

The detailed workflow will be adapted from the project's provided Agentic Programming workflow and maintained in `docs/AGENTIC.md`.
