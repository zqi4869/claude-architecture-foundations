# Human Control & Handoffs

Human control is not only a final emergency step. It is an architectural property that determines who retains authority over consequential actions.

<img class="diagram" src="/diagrams/handoff.svg" alt="Structured human handoff flow">

## When to hand control back

Common triggers include:

- explicit user request for a human;
- action outside the agent’s authorization;
- high financial, legal, privacy, or safety impact;
- contradictory or insufficient evidence;
- repeated tool failure;
- uncertain side-effect status;
- exhausted retry or turn budget;
- policy requiring approval.

## Respect explicit requests

If a user clearly and urgently asks for a human, the system should not make them continue an automated troubleshooting flow simply because the agent could still investigate.

The current conversation can be transferred first. Additional data gathering can happen under human direction if needed.

## Handoff payload, not transcript dump

A handoff should contain the information needed to continue:

- verified identity and stable record identifiers;
- the user’s request and desired outcome;
- relevant evidence and source references;
- completed actions;
- current workflow state;
- failure reasons and retry history;
- permissions and confirmations already obtained;
- unresolved questions;
- recommended next action;
- audit reference.

A full transcript may be attached for audit, but it should not be the only handoff artifact.

## Authorization boundary

An agent may be capable of reasoning about a decision it is not authorized to make. Capability and authority are different.

Example:

- Claude may calculate that a large refund is justified.
- The policy may allow the agent to approve only smaller refunds.
- The agent should prepare the evidence and hand off the decision, not bypass the limit.

## Confirmation as a durable artifact

For consequential actions, user confirmation should be captured as application state:

```json
{
  "action": "publish-announcement",
  "content_hash": "sha256:...",
  "confirmed_by": "user-123",
  "confirmed_at": "2026-08-01T11:00:00Z",
  "scope": "publish this exact version once"
}
```

A vague conversational “yes” is risky if the content changed after confirmation.

## Keep the human decision meaningful

Avoid designs where the human receives:

- a nearly completed irreversible action;
- no explanation of why escalation occurred;
- only a binary approve/reject button;
- hidden uncertainty;
- no access to source evidence.

A meaningful checkpoint gives the reviewer enough information and time to exercise judgment.

## Human review is a scarce resource

Route review based on risk rather than random inconvenience alone. Useful signals include:

- ambiguity or contradiction in the source;
- high-impact fields;
- low evidence quality;
- out-of-distribution document types;
- policy exceptions;
- failed validation repair;
- uncertain side-effect status.

Random sampling still has value for measuring silent failures, but it should complement risk-based review.

## Handoff invariants

- The agent stops the restricted action.
- The handoff is created exactly once.
- The human receives stable identifiers and evidence.
- The user is told what happened and what to expect.
- The workflow remains resumable after the decision.
