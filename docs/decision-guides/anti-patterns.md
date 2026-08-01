# Common Anti-Patterns

These patterns recur across agentic systems, Claude Code workflows, tool integrations, and structured extraction pipelines.

## 1. Prompt as security boundary

**Symptom:** A prompt says an action is forbidden, but the tool remains available.

**Why it fails:** Contextual instructions guide behavior; they do not remove capability.

**Better:** Enforce permissions and authorization outside the model.

## 2. Tool parameters without provenance

**Symptom:** Claude supplies a plausible identifier that was never retrieved.

**Why it fails:** The schema says the field is required but not where it must come from.

**Better:** Document prerequisite tools, trusted sources, and server-side validation.

## 3. Blind retry after timeout

**Symptom:** A send, payment, or publish action is repeated after an uncertain timeout.

**Why it fails:** The original operation may already have succeeded.

**Better:** Use idempotency keys and query operation status before retry.

## 4. Valid JSON equals correct answer

**Symptom:** Schema-compliant extraction is accepted without evidence review.

**Why it fails:** Structure does not prove semantic or factual correctness.

**Better:** Add source fidelity, semantic validation, and segmented evaluation.

## 5. Conversation as database

**Symptom:** Critical workflow state exists only in the transcript.

**Why it fails:** Context may be compacted, lost, stale, or unavailable on another host.

**Better:** Persist durable state with stable IDs and checkpoints.

## 6. Full raw tool payloads in context

**Symptom:** Each lookup appends dozens of irrelevant fields.

**Why it fails:** Context pressure grows and important evidence becomes harder to retrieve.

**Better:** Preserve task-relevant structured fields and externalize raw payloads.

## 7. Prose summary without provenance

**Symptom:** A synthesis agent cannot cite original sources.

**Why it fails:** Claims were detached from source metadata during summarization.

**Better:** Keep claim–source mappings through every stage.

## 8. Every agent gets every tool

**Symptom:** Specialists call tools outside their role.

**Why it fails:** Large and overlapping tool surfaces increase ambiguity and risk.

**Better:** Use narrow role-specific tool sets and permissions.

## 9. Linear multi-agent pipeline with no feedback

**Symptom:** Missing evidence is mentioned only in the final report.

**Why it fails:** The workflow cannot act on identified gaps.

**Better:** Let the coordinator re-delegate targeted follow-up tasks.

## 10. Fresh session for every follow-up

**Symptom:** Prior analysis is repeatedly reconstructed manually.

**Why it fails:** Useful decisions and file exploration are discarded.

**Better:** Resume or fork when context is still relevant; refresh changed sources.

## 11. Resume without refreshing changed files

**Symptom:** The agent reasons from obsolete code or data.

**Why it fails:** Session history persists, but the filesystem or external system changed.

**Better:** Re-read affected sources and revise dependent conclusions.

## 12. One global accuracy number

**Symptom:** A high overall metric hides failures on high-risk segments.

**Why it fails:** Errors are not uniformly distributed.

**Better:** Evaluate by document type, field, language, risk, and source quality.

## 13. Confidence-only review routing

**Symptom:** High-confidence wrong outputs bypass review.

**Why it fails:** Self-reported confidence may not be calibrated.

**Better:** Combine confidence with evidence, validation, distribution, and impact signals.

## 14. Large rewrite before verification

**Symptom:** Many files change before the first test runs.

**Why it fails:** Failure localization and rollback become difficult.

**Better:** Use small changes and focused executable feedback.

## 15. Human approval without usable context

**Symptom:** Reviewer receives a binary button and no evidence.

**Why it fails:** The human cannot exercise meaningful judgment.

**Better:** Provide structured state, evidence, uncertainty, and recommended next steps.
