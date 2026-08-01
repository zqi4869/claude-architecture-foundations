# Multi-Agent Systems

Multiple agents are useful when work can be divided into bounded tasks that benefit from isolated context, specialized tools, or parallel execution.

<img class="diagram" src="/diagrams/multi-agent.svg" alt="Coordinator and specialist agent architecture">

## The coordinator pattern

A coordinator typically owns:

- decomposing the goal;
- selecting specialists;
- passing relevant context;
- tracking dependencies;
- detecting gaps and conflicts;
- deciding whether to re-delegate;
- synthesizing the final result.

Specialist agents own bounded tasks such as searching sources, tracing a code path, reviewing evidence, or checking a policy.

## Declaring specialists is not delegation

A configured specialist definition only makes the worker available. The coordinator must still invoke the delegation mechanism, wait for the result, and record whether execution actually occurred.

Do not let the coordinator narrate an intention such as “I will ask the research agent” and then continue as if a result exists. Treat delegation as an observable operation with:

- a task identifier;
- an execution event;
- a returned result or error;
- a timeout policy;
- a state transition in the coordinator.

## Why isolation helps

A specialist can consume a large amount of raw material without filling the main conversation. It returns a compact result containing only what the coordinator needs.

This is especially useful for:

- codebase exploration;
- document analysis;
- independent verification;
- parallel source collection;
- distinct technical domains.

## What a specialist should return

Avoid returning only prose. Use a structured result:

```json
{
  "task": "trace-authentication-flow",
  "status": "complete",
  "findings": [
    {"claim": "Refresh tokens are rotated", "evidence": ["src/auth/refresh.ts:44-87"]}
  ],
  "uncertainties": ["Mobile client behavior not found"],
  "recommended_follow_up": ["Inspect mobile repository"],
  "sources": ["src/auth/refresh.ts"]
}
```

This preserves provenance and makes gap detection possible.

## Do not give every agent every tool

A broad tool surface increases ambiguity and risk. A synthesis agent usually does not need file-write access. A document reviewer usually does not need deployment tools.

Provide each specialist with:

- only the tools required for its role;
- a clear task description;
- explicit output criteria;
- a bounded context;
- independent permissions where appropriate.

## Goal-oriented delegation

Overly procedural instructions can make specialists brittle. Prefer a clear goal and quality criteria when the search strategy should adapt.

Less useful:

> Search exactly these three queries, then stop.

More useful:

> Find current primary sources covering the feature. Prioritize official documentation, identify conflicting behavior, and report unresolved gaps. Vary queries as needed.

Use procedural steps only when the process itself is mandatory.

## Gap-driven iteration

A linear pipeline often produces incomplete outputs:

```text
search → analyze → synthesize → publish
```

A stronger pipeline adds feedback:

```text
search → analyze → identify gaps → targeted search → re-analyze → synthesize
```

The coordinator should treat missing evidence as an actionable workflow state, not only as a disclaimer in the final report.

## Conflict and uncertainty

When specialists disagree, do not collapse their findings into a single confident statement. Preserve:

- the competing claims;
- source quality;
- methodology differences;
- confidence or uncertainty;
- what additional evidence would resolve the conflict.

A good synthesis explains the disagreement rather than averaging it away.

## State and recovery

For long-running pipelines, persist:

- a task manifest;
- completed specialist outputs;
- source indexes;
- current dependencies;
- unresolved gaps;
- synthesis versions.

On recovery, reload only the state relevant to the next step. Replaying a full conversation log is rarely the most efficient recovery strategy.

## When not to use multiple agents

Avoid multi-agent architecture when:

- one context can handle the task comfortably;
- the work is tightly sequential and every detail is shared;
- coordination cost exceeds the benefit;
- specialists cannot produce independently verifiable outputs;
- the design merely renames functions as “agents.”

## Review questions

1. Can the task be decomposed into independently useful outputs?
2. Does isolation reduce context pressure?
3. Can each specialist be given a smaller tool surface?
4. Is provenance preserved through synthesis?
5. Can the coordinator detect gaps and re-delegate?
6. Is recovery possible without replaying everything?
