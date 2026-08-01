# Production Checklist

Use this checklist before releasing a Claude-based workflow.

## Goal and success

- [ ] The user goal is defined in operational terms.
- [ ] Success, safe failure, cancellation, and handoff are distinct terminal states.
- [ ] Critical failure types are defined.
- [ ] Acceptance criteria are testable.

## Responsibility boundaries

- [ ] Semantic decisions are assigned to the model deliberately.
- [ ] Hard guarantees are enforced by code, policy, permissions, or approval.
- [ ] Current or private data is retrieved through authoritative tools.
- [ ] Durable state is stored outside active context.

## Prompt and context

- [ ] Instructions are specific and non-conflicting.
- [ ] The prompt defines uncertainty and missing-data behavior.
- [ ] Examples cover normal and edge cases.
- [ ] Critical claims retain source provenance.
- [ ] Context is pruned or compacted without losing durable state.

## Tools

- [ ] Tool names and descriptions are unambiguous.
- [ ] Preconditions and parameter provenance are explicit.
- [ ] Inputs are validated server-side.
- [ ] The tool surface follows least privilege.
- [ ] Success results are structured and high signal.
- [ ] Errors distinguish category, retryability, and operation status.
- [ ] Side-effecting tools have idempotency or reconciliation.
- [ ] Consequential actions require appropriate confirmation.

## MCP

- [ ] Only required servers and tools are enabled.
- [ ] Credentials are scoped and kept outside model-visible content.
- [ ] Allowlists, denylists, and approval policies are reviewed.
- [ ] Large tool sets use narrower exposure or deferred discovery.
- [ ] Server updates are treated as dependency changes.

## Claude Code workflow

- [ ] Persistent facts are in `CLAUDE.md`, not buried in chat.
- [ ] Path-specific guidance uses rules where appropriate.
- [ ] Reusable procedures use Skills.
- [ ] Deterministic automation uses hooks.
- [ ] Protected operations use permissions.
- [ ] Broad or uncertain changes begin with exploration and planning.
- [ ] Verification is executable and focused.

## Structured output

- [ ] The schema represents missing and uncertain values honestly.
- [ ] Schema conformance is not treated as factual verification.
- [ ] Semantic extraction and deterministic normalization are separated.
- [ ] Validation repair is targeted and bounded.
- [ ] Critical fields are traceable to evidence.

## State and recovery

- [ ] Workflow progress uses stable IDs and checkpoints.
- [ ] Partial success is visible at item level.
- [ ] Stale external state is refreshed before current claims.
- [ ] Resume behavior accounts for changed files or data.
- [ ] Recovery does not repeat uncertain side effects blindly.

## Human control

- [ ] Explicit requests for a human are respected.
- [ ] Authorization limits are enforced.
- [ ] Handoff packages are structured and actionable.
- [ ] Review routing reflects risk and uncertainty.
- [ ] Human approval binds to the exact action.

## Evaluation and operations

- [ ] Representative and edge-case test sets exist.
- [ ] Metrics are segmented by important risk dimensions.
- [ ] Random sampling detects silent failures.
- [ ] Model, prompt, schema, and tool versions are recorded.
- [ ] Runs are observable end to end.
- [ ] Retries and costs are bounded.
- [ ] Rollback and incident procedures exist.

## Release gate

Do not release because the demo worked once. Release when the system has evidence that it behaves safely across representative normal, failure, and recovery paths.
