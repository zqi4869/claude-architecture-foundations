# Guide Overview

This guide is organized around **architecture decisions**, not product trivia. Product interfaces change. Good responsibility boundaries remain useful.

<div class="badge-row">
<span>Agentic orchestration</span><span>Claude Code</span><span>MCP</span><span>Structured output</span><span>Context engineering</span><span>Reliability</span>
</div>

## The recurring design problem

A Claude-based system combines components with very different properties:

- **A language model** is adaptive, semantic, and probabilistic.
- **Application code** is deterministic, testable, and enforceable.
- **Tools** create access to fresh data and side effects.
- **Context** gives the model working information, but it is finite and transient.
- **Durable state** supports recovery, audit, and cross-session continuity.
- **Humans** retain authority for consequential, ambiguous, or explicitly requested decisions.

Many failures happen when one component is asked to do a job that belongs to another. A prompt is used as an access-control system. A conversation transcript is used as a database. A schema is treated as proof that extracted facts are correct. A tool timeout is retried even though the original operation may have succeeded.

## The six questions to ask

For any feature, ask:

1. **What must the model understand or decide?**
2. **What must the application guarantee?**
3. **What external data or action requires a tool?**
4. **What state must survive beyond the active context?**
5. **What evidence will prove the system works?**
6. **When must control return to a human?**

These questions are more durable than memorizing isolated commands.

## Three kinds of statements

The guide labels ideas implicitly through their framing:

### Documented product behavior

Behavior directly described in public Anthropic documentation, such as the client-tool loop, session persistence, or how Claude Code loads project instructions.

### Engineering recommendation

A design conclusion drawn from documented mechanisms and general software-engineering principles, such as keeping idempotency keys outside the model or validating terminal states after an agent loop exits.

### Original teaching example

A fictional scenario created to explain a principle. Examples do not reproduce private or live examination content.

## A compact mental model

| Concern | Primary owner | Supporting mechanism |
|---|---|---|
| Understand an ambiguous request | Claude | Prompt, examples, context |
| Fetch current or private data | Tool | Typed schema, authentication |
| Enforce “must never” | Application / permission system | Deny rule, validation, policy engine |
| Maintain conversation continuity | Session history | Resume / continue |
| Maintain durable business state | Application storage | Database, checkpoint, manifest |
| Guarantee valid JSON shape | Structured output / validator | JSON Schema |
| Guarantee factual correctness | No single mechanism | Grounding, evaluation, review |
| Execute high-impact action | Tool + policy layer | Confirmation, authorization, audit |

## What to ignore while studying

Avoid overfocusing on:

- answer letters or isolated multiple-choice phrasing;
- a single model name or version;
- memorizing configuration paths without understanding scope;
- treating every problem as prompt engineering;
- assuming a larger context window removes the need for context design.

Focus on the **reason a mechanism exists** and the failure it prevents.
