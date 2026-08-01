# Errors, Safety & Idempotency

Tool failures are not one category. The correct recovery depends on what happened and whether the operation may already have changed external state.

## A practical error taxonomy

| Category | Example | Retry? | Typical response |
|---|---|---:|---|
| Invalid input | malformed date | No | correct input or ask user |
| Not found | unknown record ID | Usually no | verify identifier |
| Unauthorized | missing permission | No | request access or hand off |
| Rate limited | temporary limit | Yes, bounded | backoff and retry |
| Service unavailable | upstream outage | Yes, bounded | retry or degrade |
| Timeout before execution | request never reached service | Often yes | retry with same idempotency key |
| Timeout with unknown status | service may have executed | Dangerous | query status before retry |
| Policy blocked | amount exceeds agent authority | No | human approval |
| Partial success | one of several writes succeeded | Conditional | reconcile state |

## Structured errors

Return errors as data rather than only prose:

```json
{
  "ok": false,
  "error": {
    "category": "delivery_status_unknown",
    "retryable": false,
    "operation_status": "unknown",
    "safe_message": "The provider did not confirm whether the notification was delivered.",
    "support_reference": "msg_7F2A"
  }
}
```

The distinction between `failed` and `unknown` is essential for side-effecting operations.

## Use `is_error` deliberately

When returning a tool result to Claude, mark tool failures as errors and include enough structured guidance for recovery. Do not hide failure behind an empty success-shaped object.

Poor:

```json
{"items": []}
```

This could mean no results, no permission, or backend failure.

Better:

```json
{"status": "no_matches", "items": []}
```

or

```json
{"status": "error", "category": "backend_unavailable", "retryable": true}
```

## Idempotency

An idempotent operation can be repeated without creating additional effects. For write tools, use an application-generated key:

```text
idempotency_key = stable(run_id + logical_action_id)
```

The model should not be responsible for inventing uniqueness rules.

### Why it matters

If a publish or payment request times out, the caller may not know whether the server completed it. Retrying without an idempotency strategy can duplicate the action.

## Safe retry sequence

For a side-effecting operation with uncertain status:

1. Preserve the original operation identifier.
2. Query operation status if the provider supports it.
3. Reconcile local and remote state.
4. Retry only if confirmed safe.
5. Reuse the idempotency key.
6. Escalate if status cannot be determined.

## Confirmation boundaries

A tool that publishes, pays, deletes, or sends should often require a durable confirmation artifact. The confirmation should bind to the exact action and content.

Example input:

```json
{
  "draft_id": "draft_42",
  "content_hash": "sha256:...",
  "confirmation_token": "confirm_abc",
  "idempotency_key": "publish_42_v3"
}
```

## Defense in depth

A trustworthy operation combines:

- clear tool description;
- strict schema;
- server-side authorization;
- validation of trusted identifiers;
- explicit confirmation;
- idempotency;
- structured errors;
- audit logging;
- bounded retries.

No single layer replaces the others.

## Avoid these failure patterns

- Retrying every timeout automatically
- Telling Claude to “be careful” instead of enforcing policy
- Returning raw exception text to end users
- Mixing user-safe messages with internal diagnostics
- Treating an empty result as a generic failure signal
- Allowing destructive tools when read-only tools would suffice
- Losing the operation ID after a partial failure
