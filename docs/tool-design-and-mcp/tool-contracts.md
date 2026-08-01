# Tool Contracts

A tool definition is the model-facing API contract. Claude does not see your implementation. It sees the tool name, description, input schema, and the results you return.

<img class="diagram" src="/diagrams/tool-contract.svg" alt="Anatomy of a trustworthy tool contract">

## A complete contract answers seven questions

### 1. What does the tool do?

Use a specific verb and resource. `lookup_order` is clearer than `order_tool`.

### 2. When should it be used?

Describe the triggering situation and important exclusions.

### 3. What must be true first?

State preconditions such as identity verification, prior lookup, eligibility, or user confirmation.

### 4. Where do parameters come from?

This is **parameter provenance**. A required identifier may need to come from another tool rather than from user text or model inference.

### 5. What side effect occurs?

State whether the tool reads, writes, sends, publishes, deletes, charges, or changes external state.

### 6. What does success return?

Return the smallest structured result needed for the next decision.

### 7. How are errors represented?

Distinguish not-found, unauthorized, invalid input, temporary failure, and uncertain execution status.

## Parameter provenance

A schema can require an `order_id`, but the schema alone does not say whether Claude may invent it. The description should state the trusted source.

```json
{
  "name": "issue_refund",
  "description": "Issue a refund for an order already retrieved with lookup_order. The order_id must be copied from a successful lookup_order result and must never be inferred, invented, or taken from an unverified message.",
  "input_schema": {
    "type": "object",
    "properties": {
      "order_id": {"type": "string"},
      "amount": {"type": "number", "minimum": 0}
    },
    "required": ["order_id", "amount"]
  }
}
```

Server-side validation should still verify the identifier. Prompting reduces bad calls; validation contains them.

## Tool granularity

### Too many overlapping tools

A surface with many nearly identical tools increases selection ambiguity:

- `refund_order`
- `refund_payment`
- `reverse_charge`
- `cancel_transaction`

If the operations share semantics, consider one tool with a controlled action parameter.

### One tool that is too broad

A single `manage_customer` tool with a free-text instruction hides authorization and validation boundaries.

### Good boundary

A good tool groups operations that share:

- the same resource;
- similar authorization;
- similar side effects;
- a coherent error model;
- a controlled action enum.

## Names and descriptions

Tool selection depends heavily on names and descriptions. Use:

- domain-prefixed names where useful;
- explicit verbs;
- concrete nouns;
- details about when not to use the tool;
- parameter semantics and units;
- caveats about missing data;
- examples for complex nested inputs.

## High-signal results

A result should support the next decision without flooding context.

Poor:

```json
{"raw_backend_payload": "...40 fields..."}
```

Better:

```json
{
  "order_id": "ord_123",
  "purchase_date": "2026-07-12",
  "return_window_status": "eligible",
  "refund_status": "not_started",
  "currency": "EUR",
  "amount": 89.50
}
```

Keep stable identifiers and fields that affect the next action. Store raw payloads elsewhere if needed for audit.

## Read tools and write tools

Separate read and write semantics clearly. A model should not call a destructive tool when it only needs status information.

Useful patterns:

- `get_*`, `lookup_*`, `search_*` for reads;
- `create_*`, `update_*`, `publish_*`, `delete_*` for writes;
- explicit confirmation or approval token for consequential writes;
- dry-run or preview mode where useful.

## Tool contract checklist

- Clear, specific name
- Detailed description
- Explicit preconditions
- Trusted parameter sources
- Strict input schema where supported
- Side-effect classification
- Confirmation requirements
- Idempotency strategy
- Minimal structured success result
- Structured error taxonomy
- Authorization enforced server-side
- Audit reference returned
