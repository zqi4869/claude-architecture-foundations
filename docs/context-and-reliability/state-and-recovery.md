# State, Freshness & Recovery

Conversation history and business state solve different problems. A reliable system makes the distinction explicit.

## Three kinds of state

### Conversational state

What has been said and reasoned about in the current session.

### Workflow state

What has actually happened:

- tasks completed;
- external records changed;
- approvals obtained;
- retries attempted;
- failures recorded;
- next step pending.

### Source state

The current truth in external systems, files, or databases.

A session may remember yesterday's order status. That does not make the status current today.

## Freshness rule

Before making a time-sensitive claim or action, retrieve fresh state from the authoritative system.

Examples:

- current shipment status;
- latest account balance;
- current file contents;
- active permissions;
- latest ticket state.

Old tool results remain useful as history, but new results should supersede them for current-state decisions.

## Session resume after repository changes

When resuming code work:

1. preserve the prior analysis;
2. identify files changed externally;
3. re-read only the affected files and dependencies;
4. compare new content with earlier assumptions;
5. revise the plan;
6. re-run relevant verification.

A session is not a repository snapshot.

## Checkpoints and manifests

For long workflows, persist a manifest:

```json
{
  "run_id": "run-2026-08-01-17",
  "input_version": "sha256:...",
  "completed_steps": ["ingest", "extract"],
  "pending_steps": ["review", "publish"],
  "artifacts": [
    {"type": "extraction", "uri": "store://result-17", "version": 3}
  ],
  "last_error": null
}
```

This supports idempotent resume without repeating expensive work.

## Partial success

Do not collapse mixed outcomes into a single boolean.

Example batch result:

```json
{
  "status": "partial_success",
  "processed": 28,
  "succeeded": 25,
  "failed": 3,
  "failures": [
    {"item_id": "A17", "stage": "parse", "category": "encrypted_file"}
  ]
}
```

The workflow can continue with successful items while exposing failures clearly.

## Recovery design

A recovery plan should answer:

- What was the last confirmed successful step?
- Which side effects may have occurred?
- Can the next step be repeated safely?
- Which source version was used?
- Which approvals remain valid?
- What context must be reconstructed?
- When should the workflow stop and escalate?

## External storage for sessions

In multi-host or ephemeral environments, local session files may not be available after restart. Options include:

- external session storage;
- application-managed summaries and decisions;
- durable artifact storage;
- fresh sessions seeded with structured state.

Do not assume a local transcript is a globally available database.

## Recovery principle

<div class="decision-banner">
Resume from confirmed state, refresh anything that may have changed, and never repeat a side effect until its prior status is known.
</div>
