# Agent Loops & Orchestration

An agent loop is useful when the next action cannot be known until the system observes the result of the previous action.

<img class="diagram" src="/diagrams/agent-loop.svg" alt="Client tool agent loop sequence">

## The client-tool loop

For client-executed tools, the basic sequence is:

1. The application sends messages and tool definitions.
2. Claude returns a typed `tool_use` request.
3. The application validates and executes the operation.
4. The application returns a `tool_result`.
5. Claude reasons over the updated context.
6. The loop continues until Claude produces a final answer or another stop condition occurs.

The important idea is not the syntax. It is the **information dependency**. A tool result becomes new evidence. Claude can then revise its plan.

## Adaptive loop or fixed workflow?

| Use an adaptive loop when… | Use a fixed workflow when… |
|---|---|
| the next step depends on retrieved data | the transitions are known in advance |
| multiple investigation paths may be valid | compliance requires a specific sequence |
| the system must react to tool failures | every step is deterministic and testable |
| the user’s goal is underspecified | branching should be controlled by code |

A useful system may combine both: deterministic stages around an adaptive inner loop.

### Hybrid example

A document-processing workflow can be fixed at the outer level:

1. ingest;
2. extract;
3. validate;
4. review or accept;
5. persist.

Inside the extraction stage, Claude may adaptively decide which page, table, or attachment to inspect next.

## Stop reasons are application events

An agent loop can stop for several reasons. Do not assume every exit means successful completion.

The application should interpret exits explicitly:

- **final answer produced**;
- **tool use requested**;
- **token or turn limit reached**;
- **refusal or policy stop**;
- **server-side pause**;
- **unexpected exception**.

After any exit, evaluate the recorded workflow state.

## Terminal-state validation

A production workflow should define allowed terminal states, for example:

```text
COMPLETED
SAFELY_FAILED
HANDED_OFF
CANCELLED_BY_USER
```

Then enforce this invariant:

> Every run must end in one and only one valid terminal state.

If an agent loop ends without one, application code should execute a deterministic fallback, such as creating a recovery task or handing the case to a human.

## Why prompt-only fallback is insufficient

A prompt can tell Claude to escalate when it is running out of actions. That guidance is useful, but it is not a guarantee. If the host terminates the loop at a turn limit, Claude may never receive another opportunity to act.

The stronger design is:

1. prompt Claude to manage its remaining budget;
2. track progress in workflow state;
3. check the terminal state after the loop exits;
4. invoke a deterministic fallback if necessary.

## Bounded autonomy

An agent should know:

- what success means;
- which tools are available;
- which actions require confirmation;
- how many attempts are allowed;
- when to stop investigating;
- when to ask a question;
- when to hand control back.

Unbounded “keep trying” behavior increases cost and can create repeated side effects.

## Progress-aware planning

For longer tasks, represent progress explicitly:

```json
{
  "goal": "prepare-release-note",
  "completed": ["collect-changes", "group-by-theme"],
  "pending": ["verify-breaking-changes", "draft-summary"],
  "blocked": [],
  "remaining_budget": 4
}
```

The model can reason over this structure more reliably than over an implicit memory of a long transcript.

## Verification loop

A coding or research agent should not stop at “generated an answer.” A stronger loop is:

```text
inspect → hypothesize → act → observe → verify → revise
```

The verification step should produce observable evidence: tests, schema validation, source citations, or a concrete diff review.

## Design checklist

- Define valid terminal states.
- Distinguish “loop ended” from “task succeeded.”
- Bound turns, retries, and cost.
- Persist progress outside the model context.
- Make fallbacks idempotent.
- Record tool results and failure reasons.
- Require observable verification before completion.
