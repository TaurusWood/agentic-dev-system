# Fictional practice: editing a review-list record

**Illustration only. Not the What-to-Eat contract, not a completed product prototype, and not user approval.** The purpose is to show the handoff boundary without requiring a new spec framework.

## Supplied exercise facts

Assume a fictional catalog already permits an operator to edit a record's display name. The approved shell and filters stay unchanged. For the exercise, the designer proposes a side editor so the operator retains list context. The save API is not yet defined. No batch publish, approval workflow, undo, or autosave is implied.

## Compact interaction contract

```yaml
contract_id: example-record-edit
design_revision: example-1
status: draft
business_refs: ["Exercise facts in this file; replace with project evidence"]
task: Correct a record name and continue inspecting the list.
non_goals: [Bulk operations, approval, new data fields, API design]
view_intent:
  hierarchy: Preserve the current list and its filters.
  interaction_container: Proposed side editor for a bounded correction.
  visual_refs: []
interactions:
  - id: edit.save
    trigger: Save the edited name.
    availability: Existing business eligibility plus valid changed input; pending blocks resubmission.
    pending:
      feedback: Show saving without claiming completion.
      repeat_submission: Block another save of the same operation.
      exit: Do not imply that closing cancels a server operation; behavior requires technical resolution.
    success:
      feedback: Identify the saved record after an authoritative result.
      update: Reflect the affected record; explain if it no longer matches the filter.
      preserve: [Current filter, meaningful list position]
      reset: [Saved dirty state]
    failure:
      feedback: Show a specific recoverable error near its relevant context.
      preserve: [Edited value, editor context]
    cancel: Before submitting, discard only the local proposed change after the project's dirty-exit policy.
    focus: Return to the invoking record action, or a logical successor if it disappeared.
questions:
  business: []
  technical:
    - id: T1
      question: What authoritative save result and field-error information can the API supply?
      affects: [edit.save]
      owner: Technical Design
      blocks: Formal save integration, not isolated interaction exploration.
    - id: T2
      question: How is an uncertain write outcome reconciled before resubmission?
      affects: [edit.save]
      owner: Technical Design
      blocks: Exit and retry implementation during uncertain outcomes.
prototype:
  artifact: null
  design_revision: example-1
  production_authority: false
  simulated: [Synthetic records, manually selected success/failure outcomes, fixed delay]
  not_demonstrated: [Live permissions, real persistence, uncertain network outcome]
  launch: null
acceptance:
  - interaction: edit.save
    given: A filtered list and an eligible record.
    when: Change the name and simulate a save failure.
    then: Retain the edit and context; do not claim success.
  - interaction: edit.save
    given: The same task with a successful result scenario.
    when: Save and return to the list.
    then: Reflect the result and preserve meaningful list context.
approval:
  evidence: null
  scope: []
```

The context names are observable outcomes, not mandated React state variables. The `availability` prose is not an executable authorization policy. The visual proposal stays a proposal until reviewed. `artifact: null` means no runnable prototype has been delivered by this example.

## Prototype brief

Build only the edit/return path with synthetic records and visible demonstration controls for success and failure. Keep simulation controls separate from the proposed product interface. Mark that persistence is simulated. Use an existing prototype location excluded from production output.

The user should operate the path. Ask only about decisions that materially affect behavior and remain unresolved after reading existing project sources. Do not require them to approve the YAML line by line.

## Technical handoff, not HTML conversion

After scoped approval, pass the approved contract and visual reference into the normal Technical Design step. Resolve T1/T2 from the real repository and service contract. Then implement within the existing component and data boundaries. A formal development mock follows that resolved contract; it does not define it.

Do not copy a prototype `setTimeout` into persistence, a local array into the server model, or a hardcoded allowed action into permission logic. A successful demo only demonstrates the chosen scenario.

## A separate bulk-selection question

If a later task introduces batching, do not expand this example automatically. Use pattern C and establish the actual page/filter selection policy, eligibility, and result semantics. A user's approved bottom floating bar remains in place; its behavior, not a vendor's toolbar position, is what needs specification.
