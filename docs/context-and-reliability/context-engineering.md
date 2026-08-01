# Context Engineering

Context is the model's active working set. More context is not always better: irrelevant detail competes with the information that matters.

<img class="diagram" src="/diagrams/context-lifecycle.svg" alt="Context, durable state, source storage, and fresh retrieval lifecycle">

## Four sources of context pressure

### Conversation history

Long discussions accumulate decisions, corrections, and obsolete assumptions.

### Tool definitions

Large tool surfaces consume input tokens before the task begins.

### Tool results

Verbose API responses can dominate the context after several calls.

### Source material

Large repositories, documents, logs, and web pages can overwhelm the active working set.

## Keep high-signal information

Retain information that changes the next decision:

- stable identifiers;
- current status;
- evidence and provenance;
- completed and pending steps;
- constraints;
- unresolved questions;
- relevant errors.

Remove or externalize:

- repeated boilerplate;
- raw payload fields not used by the task;
- obsolete intermediate drafts;
- duplicate tool results;
- long logs after extracting the failure signal.

## Structured compaction

A useful compact state is not merely a prose summary. It may contain:

```json
{
  "objective": "resolve-data-import-failure",
  "facts": [
    {"claim": "CSV uses semicolon delimiters", "source": "upload-17"}
  ],
  "decisions": ["preserve decimal commas"],
  "completed": ["inspect-header", "identify-encoding"],
  "pending": ["run-parser", "verify-row-count"],
  "errors": [],
  "source_refs": ["upload-17"]
}
```

This is easier to resume and verify than a narrative paragraph.

## Preserve provenance during summarization

If a synthesis stage receives only detached claims, it cannot cite the original sources reliably. Keep content and metadata linked.

Good representation:

```json
{
  "claim": "The API uses short-lived access tokens",
  "source_id": "auth-doc",
  "location": "section 4.2",
  "evidence": "...",
  "confidence": "explicit"
}
```

A later stage can shorten the evidence, but it should not lose the claim–source relationship.

## Tool-result pruning

If a tool returns 40 fields but the task uses six, preserve the six structured fields rather than replacing everything with loose prose.

Why not prose only?

- it loses exact types;
- it may omit identifiers;
- it is harder to compare across records;
- it can introduce paraphrase errors.

## Large tool sets

For large capability surfaces:

- expose only relevant tools;
- defer loading where supported;
- use tool search;
- delegate to a specialist with a narrower set;
- consolidate semantically overlapping operations.

## Subagents as context isolation

Use subagents when an investigation needs many file reads or search results but the parent only needs findings. The summary should include evidence and unresolved gaps.

## Compaction is not deletion

Keep original sources and durable state outside active context. Compaction should make the next reasoning step efficient while leaving detailed material retrievable.

## Context review questions

- What information will affect the next action?
- What can be retrieved later by stable reference?
- What is stale or superseded?
- Does every critical claim retain provenance?
- Are tool definitions larger than the task requires?
- Would a subagent isolate raw exploration?
- Is structured state more appropriate than prose history?
