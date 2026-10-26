# Admin interaction patterns

Read only the affected sections. **Use when / Recommend / Exceptions / Specify / Avoid** are decision aids, not a component generator. All patterns are synthesis informed by the cited [sources](sources.md); exact project choices remain explicit and approvable.

## A — Lists and filtering

**Use when:** an operator locates, compares, or processes records.

**Recommend:** choose columns from the task and approved fields; keep essential identifiers and frequent actions findable. Separate query controls, result information, and actions. Provide a clear representation of active filters and a way to remove them. Distinguish an empty dataset from no matches.

**Exceptions:** a comparison table is not mandatory for visual browsing or a focused review queue. Use explicit query submission for expensive or combined queries; immediate filtering can suit cheap, frequent exploration. Preserve the project's choice rather than mixing both silently.

**Specify:** trigger and reset semantics, query scope, sort/pagination behavior, selection policy on query change, refresh behavior, empty/no-match/loading/error states. Keep prior results during refresh only when their stale status is clear. Do not show results for an older query as the new query's answer.

**Avoid:** exposing every searchable backend property as a filter; adding pagination or bulk actions when not needed; silently resetting all context on every mutation; using an error as an empty result.

Sources: S5, S11. Query-race and preservation behavior are project synthesis.

## B — Viewing and editing

**Use when:** inspecting a record or changing a bounded set of values.

**Recommend:** inline editing for a simple local correction with clear commit/cancel semantics; a side panel for a bounded task that benefits from list context; a dialog for a short focused decision; a dedicated page for sustained, complex work or an independently navigable resource. A primary-detail layout can suit repeated inspection.

**Exceptions:** field count does not determine complexity. A modal side panel cannot also promise interaction with the background. Reuse an approved container unless the current task demonstrates a material mismatch.

**Specify:** entry/exit, dirty-state behavior, save/cancel, validation timing, pending submission, failure retention, and the return destination/focus. Show relevant business data, not invented fields. If a saved record leaves the current filter, explain its disappearance rather than showing contradictory rows.

**Avoid:** turning all forms into steppers; nested editors without an exit; closing and losing input on failure; making the user re-enter unrelated fields. Do not introduce autosave or drafts just to avoid choosing save behavior.

Sources: S7, S8, S10. Container selection is an explicit synthesis, not a vendor field-count rule.

## C — Selection and bulk operations

**Use when:** the business permits the same operation on multiple records.

**Recommend:** expose the selected count, exact scope, and clear-selection action. Separate opening a record from selecting it. Show batch controls when relevant and follow the approved location, including a bottom floating bar. Ensure it does not cover rows, pagination, or keyboard focus.

**Exceptions:** do not add cross-page/all-results selection without business and technical support. Disabling all row actions in batch mode is one system's choice, not a universal requirement; explicitly prevent only confusing or conflicting operations. Mixed eligibility needs a product decision, not silent exclusion.

**Specify:** current-page versus result-wide selection; filter/page/scope change behavior; eligibility; which records and values the operation will affect; pending behavior; and outcomes actually supported by the service. A bulk-edit field needs distinguishable keep/set/clear intent, with clear unavailable when prohibited.

**Avoid:** treating an empty editor as a request to clear every selected record; claiming partial success without a defined result contract; retrying already-successful records; treating total result count as selected count. Do not promise an undo that the service cannot perform.

Sources: S3, S4, S5. Placement preservation, capability gating, and outcome handling are project synthesis.

## D — Actions and feedback

**Use when:** an operator initiates a mutation, command, or workflow step.

**Recommend:** label the consequence specifically and distinguish scope. Acknowledge submission, prevent accidental duplicates while pending, and report the outcome when known. Confirm consequential irreversible actions using the affected objects and consequence, not an uninformative extra click. Reversible routine changes do not automatically require confirmation.

**Exceptions:** a product contract may require explicit confirmation. Optimistic updates require an explicit recovery plan and must not misrepresent the authoritative result. Closing a dialog is not necessarily cancellation of server work.

**Specify:** allowed/disabled/hidden conditions and meaningful reason, pending state, exit/cancel semantics, actual success result, error/recovery, and context after completion. Client eligibility is presentation only; authorization and transitions remain server-enforced.

**Avoid:** universal confirmation dialogs; fake progress percentages; multiple competing success notices; generic "operation successful" after a partial failure; adding reason fields, approval steps, retry, or undo as guessed business capabilities.

Sources: S6, S2. Server authority and duplicate-write boundaries are engineering constraints, not a new UX feature.

## E — Navigation and working context

**Use when:** moving between list, detail, edit, tabs, or a scoped workspace.

**Recommend:** preserve meaningful location when returning from a bounded task. Identify the current object and scope. Make the return path predictable and restore focus to a sensible origin or successor. Use existing application navigation instead of creating another shell.

**Exceptions:** permissions, tenant/workspace changes, deleted records, and changed queries can invalidate previous context. Do not restore inaccessible records or selection just to preserve position. Not every transient dialog or hover state belongs in a URL.

**Specify:** return destination, which filters/tab/page/scroll survive, what invalidates them, and unsaved-work behavior. Deep links and browser-back semantics matter where the product supports independent navigation; avoid sensitive values in URLs.

**Avoid:** returning every detail page to the first list page; encoding a fake prototype route as the formal router design; adding cross-session draft persistence without authorization.

Sources: S2, S10. State persistence boundaries are project synthesis and do not mandate a storage mechanism.

## F — Empty, loading, error, and recovery

**Use when:** the normal data path is unavailable, incomplete, or in progress.

**Recommend:** distinguish initial emptiness, no matches, loading, service failure, and access denial when applicable. Explain the state and offer only an available next step. Keep recoverable work. Put field errors near the fields; use a linked summary when needed to locate dispersed errors.

**Exceptions:** no-access screens must not reveal protected information. A read-only page has no validation form. A skeleton is not mandatory for every wait. Short focused forms need not copy a government service's always-summary policy.

**Specify:** error location and wording, input retention, focus/announcement behavior, supported retry, timeout or uncertain-result handling when material, and whether displayed data is stale. Never treat timeout as proof a write was rolled back; use the technical contract's reconciliation path.

**Avoid:** fake success after a catch; clearing forms on service errors; telling the user to correct a service outage; infinite spinners; enabling blind repeat writes after an uncertain result.

Sources: S8, S9, S10. Uncertain-write treatment is project synthesis that requires technical support.
