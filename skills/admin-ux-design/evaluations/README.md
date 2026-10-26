# Behavioral evaluation

[Scenarios](scenarios.json) are prompts for actual agent runs, not evidence that those runs passed. Package validation checks their structure only.

To evaluate a change, give a fresh agent the installed Skill and one case with only the necessary project facts. Compare its output to `expected` and `must_not`. Keep model/runtime, Skill revision, input artifacts, output evidence, and a per-case result. Do not use the implementation author's memory as an independent run.

For practical acceptance, use a real admin task and compare the proposed interaction with the existing experience: can the operator finish the task, avoid repeated correction, recover appropriately, and retain working context? Record failures and refine only recurring or high-impact rules. Do not claim improvement from star counts, a syntax test, or a screenshot alone.

No browser runs, independent model evaluations, or user acceptance are implied by shipping these cases. No evaluation runner, API key, or new test framework is required.
