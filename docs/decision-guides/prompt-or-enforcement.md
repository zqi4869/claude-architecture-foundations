# Prompt or Enforcement?

Prompting is powerful, but it is not a universal control plane.

## Use prompt guidance for

- tone and style;
- preferred reasoning approach;
- what evidence to consider;
- when clarification is useful;
- how to explain uncertainty;
- project conventions;
- task-specific priorities;
- output content within a validated shape.

## Use enforcement for

- access control;
- protected paths;
- spending or authority limits;
- required confirmation;
- schema validation;
- deterministic formatting;
- terminal-state guarantees;
- idempotency;
- retry budgets;
- data-retention policy.

## A three-level control model

### Level 1: guidance

The model is encouraged to behave a certain way.

Example:

> Prefer the project logging wrapper.

Mechanism: `CLAUDE.md` or prompt.

### Level 2: interception

A runtime hook or validator inspects the action and may block or transform it.

Example:

> Run formatting after each TypeScript edit.

Mechanism: post-tool hook.

### Level 3: capability restriction

The operation is unavailable or denied.

Example:

> Generated migration files must never be edited.

Mechanism: permission deny or server-side policy.

## Prompt plus enforcement

The best design often uses both.

For a refund tool:

- prompt: explain when refunds are appropriate;
- tool description: require a verified order ID;
- schema: validate amount and reason;
- policy engine: enforce authorization limit;
- confirmation: bind approval to exact action;
- idempotency: prevent duplicate refund;
- audit: record the result.

## Why stronger wording is not enough

Changing:

> Do not modify migrations.

into:

> IMPORTANT: NEVER, UNDER ANY CIRCUMSTANCES, modify migrations.

may improve compliance, but it still does not make the action impossible. If the requirement is absolute, use a mechanism that rejects the tool call.

## When a hook is appropriate

Use a hook when:

- an action should trigger deterministic automation;
- custom validation must run before or after a tool;
- a policy depends on inspectable runtime data;
- logging or formatting must be guaranteed.

Do not use a hook merely to inject a large semantic preference that belongs in project instructions.

## When a permission is appropriate

Use permissions for capability boundaries:

- read-only mode;
- disallow destructive commands;
- protected file paths;
- restricted MCP tools;
- explicit approval before side effects.

## Control review table

| Requirement wording | Recommended control |
|---|---|
| “prefer” | prompt / CLAUDE.md |
| “when working in this path” | path-scoped rule |
| “follow this reusable procedure” | Skill |
| “run this after every edit” | hook |
| “must ask before executing” | permission / approval policy |
| “must never execute” | deny rule / server-side authorization |
| “must always end in a valid state” | orchestration invariant |

## Review question

> If the model ignored this instruction once, what would prevent harm?

If the answer is “nothing,” the design needs enforcement.
