# Production Reliability

Reliability is a property of the full system: model, prompt, tools, data, orchestration, permissions, and monitoring.

## Failure modes to design for

### Model behavior

- wrong tool selection;
- missing parameter;
- unsupported inference;
- overconfident synthesis;
- failure to ask a necessary question.

### Tool layer

- timeout;
- invalid or stale identifier;
- partial success;
- backend outage;
- ambiguous empty response;
- permission failure.

### Context layer

- stale results;
- lost provenance;
- context bloat;
- conflicting instructions;
- summary drift.

### Workflow layer

- duplicate side effect;
- invalid terminal state;
- infinite retry;
- unrecoverable checkpoint;
- silent item failure.

### Human process

- unclear escalation reason;
- missing evidence;
- overloaded reviewers;
- meaningless approval checkpoint.

## Graceful degradation

When a tool fails, the system should communicate:

- what is known;
- what could not be completed;
- whether data may be stale;
- whether retry is safe;
- which alternative is available;
- when a human will take over.

Never claim completion when the operation is unconfirmed.

## Retry budgets

Define budgets by operation type:

| Operation | Example policy |
|---|---|
| Read-only lookup | 2–3 bounded retries with backoff |
| Expensive analysis | 1 repair attempt, then review |
| Idempotent write | Retry with stable key after status check |
| Non-idempotent write | No blind retry |
| Permission failure | No retry; request authorization |
| Validation failure | Targeted repair with exact error |

## Observability

Record events that reconstruct the workflow:

- run and session IDs;
- model and prompt version;
- tool name and arguments, with sensitive fields protected;
- tool result category;
- latency and token usage;
- state transitions;
- approvals;
- retry reason;
- final outcome;
- handoff reference.

## Evaluation in production

Offline test sets are necessary but not sufficient. Monitor real-world segments:

- language;
- source type;
- task complexity;
- tool path;
- customer or business domain;
- error category;
- model version.

Use user feedback and human corrections to add regression cases.

## Silent failure detection

Silent errors are more dangerous than visible validation failures. Detect them through:

- random human sampling;
- reconciliation against downstream systems;
- source-evidence checks;
- independent review;
- invariants and totals;
- canary deployment;
- shadow evaluation.

## Safe release strategy

1. Define success and critical failures.
2. Build representative evaluations.
3. Test with production-like tools and permissions.
4. Launch to a limited cohort.
5. Monitor segmented metrics.
6. Review failures and update tests.
7. Expand gradually.
8. Preserve rollback capability.

## Reliability checklist

- Every failure has a category.
- Every retry has a reason and limit.
- Every side effect has an idempotency or reconciliation strategy.
- Every current-state claim can be refreshed.
- Every critical field can be traced to evidence.
- Every run ends in a valid terminal state.
- Every handoff contains actionable context.
- Every release has regression evidence.
