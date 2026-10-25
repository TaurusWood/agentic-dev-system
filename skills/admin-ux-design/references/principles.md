# Principles

These eight principles are project-oriented synthesis, not a new universal standard. Source IDs resolve in [Sources](sources.md). Apply them while designing; do not turn them into a separate audit phase.

## P1 — Main task first

Make the operator's next meaningful action recognizable. Group information by the task, not backend DTO order. Distinguish page-wide, selection-wide, and row-level actions. Do not manufacture a dashboard, a statistic, or several equally prominent primary actions just to fill space. Sources: S1, S2, S6.

## P2 — Operate near the relevant context

Prefer a local interaction when comparison with nearby data matters. Choose a dedicated workspace when the task needs sustained attention or independent navigation. Proximity is a default, not an obligation to put every edit into a table. Sources: S2, S5, S7.

## P3 — Reduce avoidable work

Expose frequent, legitimate actions without unnecessary menu trips, repeated input, or repeated confirmation. Keep low-frequency controls secondary. Fewer clicks do not justify hiding consequences or inventing defaults for business values. Source: S1. Frequency-based placement is our synthesis, not a click-count target.

## P4 — Make selection and scope explicit

Users must know what is selected and what an action will affect. Page, filtered result, and all records are different scopes. Batch editing must distinguish leaving a field unchanged from setting or clearing it. Sources: S3, S4.

## P5 — Make state truthful and visible

Distinguish ready, working, completed, and failed behavior when relevant. Acknowledging a click is not proof that a write succeeded. Feedback should describe the actual result and next step, not merely a spinner or a generic success message. Sources: S1, S2.

## P6 — Preserve useful context

Keep relevant filters, location, and entered work across a bounded task when safe and meaningful. Do not preserve stale selections across a changed data scope without a defined policy. Context retention never authorizes leaking one tenant's data into another. Source: S2; scope and isolation boundaries are project synthesis.

## P7 — Locate errors and offer a valid recovery

Explain the affected field or record and a feasible next step. Keep user input after a failed submission. An error caused by the service is not a user validation error. Retry, cancellation, and undo must mean what the system can actually do. Sources: S8, S9; capability checks are project synthesis.

## P8 — Be consistent and operable

Reuse project terminology, interaction conventions, spacing, density, and components. Preserve visible focus, labels, keyboard paths, and readable states. A visual convention from another library does not override an approved project pattern. Sources: S1, S5, S10.

## Resolve trade-offs, do not stack rules

- Task efficiency versus consequence: add friction where it prevents a consequential mistake, not on every save.
- Context versus complexity: a side panel is useful only while the surrounding context remains usable.
- Density versus readability: test representative long values and the actual target viewport; do not impose a universal row height or forbid all horizontal table scrolling.
- Consistency versus improvement: change a working convention only for a concrete task benefit and within the approved scope.

Business and approved UX decisions are project authority. Sources inform recommendations; they do not authorize new features. Surface a security, accessibility, or correctness conflict rather than silently preserving harm or silently changing the product.
