---
name: agentic-project-workflow
description: Apply Adventure Bible's controlled repository workflow for project analysis, planning, acceptance criteria, TDD, small feature implementation, debugging, refactoring, review, and completion reporting.
---

# Agentic Project Workflow

Read the nearest `AGENTS.md` and `docs/agentic/PROJECT_CONTEXT.md` before acting. Then read only the product, design, accessibility, security, architecture, and roadmap documents relevant to the task.

## Workflow

1. Inspect relevant files and repository commands.
2. State current behavior, desired behavior, scope, and non-scope.
3. Create acceptance criteria and an ordered Todo list.
4. Define a failing test or precise verification before implementation.
5. Implement the smallest change.
6. Run focused checks and broader checks according to risk.
7. Review the diff and remove unrelated changes.
8. Report outcome, changed files, checks, and residual risks.

## Adventure Bible constraints

- Do not invent product requirements outside the documented feature scope.
- Respect mobile-first, app-first UX.
- Treat cognitive accessibility as a first-class requirement.
- Do not weaken Unicode support through unnecessary ASCII-only validation.
- Treat user input as untrusted.
- Follow `docs/SECURITY.md` for security-sensitive work.
- Clerk is the planned authentication provider for the backend phase; do not invent a parallel credential system without explicit scope.
- Do not expand the MVP without explicit approval.

## Rules

- Tie claims to repository evidence.
- Mark assumptions and uncertainty.
- Do not mix bugfixing with optional refactoring.
- Do not add dependencies without a clear need and justification.
- Do not disable, delete, skip, or weaken tests or checks.
- Do not perform unrelated formatting, renaming, or cleanup.
- Prefer existing project patterns and reusable components.

## Templates

Use the appropriate file under `docs/agentic/`:

- feature/change: `TASK_TEMPLATE.md`
- bug: `BUG_REPORT_TEMPLATE.md`
- tests: `TEST_PLAN_TEMPLATE.md`
- final review: `REVIEW_CHECKLIST.md`
- completion: `DEFINITION_OF_DONE.md`
- prompt construction: `PROMPT_GUIDE.md`

## Required completion report

Every non-trivial task reports:

- outcome;
- changed files and purpose;
- exact checks and results;
- manual verification when applicable;
- diff scope review;
- remaining risks or unverified areas;
- next action only when materially needed.
