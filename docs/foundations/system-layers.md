# System Layers

A reliable AI product is a stack of interacting layers. The model is central, but it is not the whole system.

<img class="diagram" src="/diagrams/system-layers.svg" alt="Layers of a Claude-based production system">

## 1. User experience

The interface establishes the human contract:

- what the system can do;
- what it cannot do;
- when it will ask for confirmation;
- how uncertainty is communicated;
- how a user can correct, interrupt, or escalate;
- what information will be passed to a human.

A technically safe backend can still produce a poor system if users cannot understand or control it.

## 2. Application and orchestration

The application owns deterministic workflow behavior:

- request and session routing;
- state persistence;
- retry budgets and timeouts;
- permission enforcement;
- tool execution;
- terminal-state checks;
- audit logging;
- handoff payload construction.

The application is the **harness** around model behavior. It converts model suggestions and tool calls into a bounded process.

## 3. Model reasoning

Claude is strongest where the task involves meaning:

- interpreting ambiguous language;
- selecting a relevant next step;
- comparing evidence;
- synthesizing across sources;
- drafting explanations;
- deciding whether more information is needed.

The model should not be expected to provide guarantees it cannot enforce after its turn ends.

## 4. Tools and MCP servers

Tools bridge language and systems. They can:

- retrieve current or private data;
- query a database;
- read or write files;
- create tickets;
- run commands;
- perform consequential actions.

A tool is a typed interface. Its name, description, input schema, output shape, and error behavior form the contract the model sees.

## 5. Operational controls

Controls span all layers:

- authentication and authorization;
- least-privilege tool exposure;
- approval policy;
- observability and traces;
- evaluation and regression testing;
- privacy, retention, and data classification;
- incident response and rollback.

## The boundary test

Use this test whenever you are unsure where a requirement belongs:

> If a violation would be unacceptable even once, can the chosen layer prevent it deterministically?

If the answer is no, move the guarantee into code, permissions, validation, or human approval.

<img class="diagram" src="/diagrams/responsibility-boundary.svg" alt="Model reasoning and application enforcement responsibility boundary">

## Example: publishing a public announcement

A robust design may split responsibilities as follows:

| Step | Owner |
|---|---|
| Interpret the requested tone and audience | Claude |
| Draft the announcement | Claude |
| Check required fields | Validator |
| Determine whether external publication requires approval | Policy engine |
| Display final content to the user | UI |
| Record explicit confirmation | Application state |
| Publish exactly once | Tool with idempotency key |
| Store result and audit reference | Application database |

The model contributes intelligence. The surrounding system contributes control.
