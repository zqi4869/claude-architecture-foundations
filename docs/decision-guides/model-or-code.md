# Model or Code?

The most important architecture decision is often not which prompt to write, but whether the responsibility belongs to the model at all.

## The decision rule

Use the model when the task depends on meaning, ambiguity, synthesis, or adaptive judgment.

Use deterministic code when the task requires exactness, enforceability, repeatability, or a hard guarantee.

## Decision matrix

| Task | Model | Code | Combined pattern |
|---|:---:|:---:|---|
| Interpret a vague user request | ✓ | | Model interprets intent |
| Select the next investigation step | ✓ | | Model uses observed evidence |
| Normalize currency to decimal | | ✓ | Model identifies amount; code converts |
| Validate JSON shape | | ✓ | Structured output + validator |
| Decide whether evidence is contradictory | ✓ | | Model explains conflict |
| Enforce a spending limit | | ✓ | Policy engine blocks action |
| Generate a handoff summary | ✓ | | Code attaches stable state and IDs |
| Prevent duplicate publication | | ✓ | Idempotency key |
| Classify a document semantically | ✓ | | Evaluation and review around result |
| Guarantee escalation after loop exit | | ✓ | Orchestrator checks terminal state |
| Ask a useful clarifying question | ✓ | | Prompt defines when to ask |
| Re-fetch current account status | | ✓ | Tool performs lookup |

## The four tests

### 1. Ambiguity test

Does the task require interpreting human language or incomplete evidence?

- Yes: model may be appropriate.
- No: code may be simpler and more reliable.

### 2. Guarantee test

Would one violation be unacceptable?

- Yes: enforcement must live outside prompt-only behavior.

### 3. Freshness test

Does the answer depend on current or private data?

- Yes: use a tool or authoritative store.

### 4. Audit test

Must the result be reproducible and explainable later?

- Yes: persist structured inputs, outputs, state transitions, and evidence.

## Common combined patterns

### Semantic extraction + deterministic normalization

Claude identifies the meaning of a field; code converts it into the canonical representation.

### Adaptive planning + deterministic execution boundary

Claude chooses an investigation path; the application validates and executes each tool call.

### Model summary + structured handoff state

Claude drafts a concise explanation; the application attaches identifiers, permissions, failures, and audit data.

### Model uncertainty + policy-driven review

Claude flags ambiguity; code routes high-risk cases to a review queue.

## Warning signs that code should own more

- You are parsing prose to discover which action the model intended.
- You say “always” or “never” but have no enforcement mechanism.
- A timeout could create duplicate side effects.
- The model is asked to invent stable identifiers.
- Business state exists only in conversation history.
- A valid JSON response is treated as proof of truth.
- Review is triggered only by model-reported confidence.

## Warning signs that the model could own more

- A large decision tree tries to enumerate every natural-language variation.
- Users must fill rigid forms for a fundamentally semantic task.
- Code uses brittle keyword matching where context matters.
- A human manually summarizes large amounts of evidence that the model could synthesize.
- Tool routing is fixed even though the next step depends on results.

## Final principle

<div class="decision-banner">
Use models for understanding and adaptation. Use code for boundaries and guarantees. Design the interface between them as carefully as any production API.
</div>
