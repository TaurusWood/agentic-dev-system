# Sources and adaptation notes

Checked on **2026-10-25**. These are primary publications, not popularity rankings. References below support specific principles or examples, not every local recommendation. This Skill is original synthesis; it does not copy vendor templates, screenshots, or component implementations.

| ID | Primary source | Used for / boundary |
| --- | --- | --- |
| S1 | [NN/g: Ten usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) | Broad usability principles, not deterministic layout rules |
| S2 | [NN/g: Heuristics for complex applications](https://www.nngroup.com/articles/usability-heuristics-complex-applications/) | Professional task context, feedback, and user control; not a mandatory new research process |
| S3 | [PatternFly: Bulk selection](https://www.patternfly.org/patterns/bulk-selection/) | Selection count and scope; do not copy a vendor toolbar location as universal |
| S4 | [SAP Fiori 1.120: Mass edit](https://www.sap.com/design-system/fiori-design-web/v1-120/foundations/best-practices/global-patterns/object-handling/mass-editing) | Shared editable properties and keep/set/clear distinctions; deliberately versioned, not claimed latest |
| S5 | [Carbon: Data table guidelines](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines) | Data organization and operation patterns; row sizes and batch-mode styling stay vendor-specific |
| S6 | [PatternFly: Actions](https://www.patternfly.org/patterns/actions/) | Action scope and consequences; confirmation wording/color/position are adapted, not copied |
| S7 | [PatternFly: Primary-detail](https://www.patternfly.org/patterns/primary-detail/) | Examples of primary/detail arrangements; not a universal drawer-selection algorithm |
| S8 | [GOV.UK: Error message](https://design-system.service.gov.uk/components/error-message/) | Explain validation problems near the affected inputs |
| S9 | [GOV.UK: Error summary](https://design-system.service.gov.uk/components/error-summary/) | Link errors to their locations; its always-summary policy is not imposed on every admin form |
| S10 | [W3C APG: Modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Modal semantics, focus and keyboard behavior; APG guidance is not a certificate of WCAG compliance |
| S11 | [PatternFly: Filters](https://www.patternfly.org/patterns/filters/) | Concrete filter variants; query timing and backend semantics remain project decisions |
| S12 | [GOV.UK: Making prototypes](https://www.gov.uk/service-manual/design/making-prototypes) | Prototype versus production purpose and quality boundary |

## Do not mechanically merge systems

- SAP's mass-edit example does not define this project's batch transaction or partial-failure semantics. Its cited version explicitly leaves end-to-end message handling incomplete. Resolve those semantics in the actual product/technical contract.
- Carbon's batch-mode row-action policy and PatternFly's action placement are contextual conventions. Preserve an approved bottom floating bar and decide conflicts based on the operator task.
- A government service's complete-page error summary is not automatically appropriate for a compact inline editor. Retain the ability to locate and correct the problem.
- The eight principles, six pattern selections, artifact alignment, and prototype isolation policies are this repository's synthesis, not claims of official endorsement.

Use the curated material offline for routine work. Recheck a relevant primary source when a capability/version matters, the material is ambiguous, or an unfamiliar case materially changes the decision. If unavailable, identify the uncertainty; do not fabricate a citation or a vendor rule. Do not make every UI task browse all sources.
