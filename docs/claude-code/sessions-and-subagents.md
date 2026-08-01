# Sessions, Forks & Subagents

Session history, filesystem state, and specialist context are related but distinct. Choosing the right mechanism prevents lost work and cross-contamination.

## Continue and resume

A session preserves conversation history, including prompts, tool calls, tool results, and decisions.

Use:

- **continue** when you want the most recent session in a working directory;
- **resume** when you need a specific known session;
- **a fresh session** when prior context would bias or confuse the task.

## Sessions do not snapshot the filesystem

A resumed session may remember files it read earlier, but those files may have changed externally.

On resume:

1. identify changed files;
2. re-read affected files;
3. compare them with earlier assumptions;
4. revise any dependent conclusions.

Do not re-read the entire repository automatically if only a few files changed.

## Fork sessions for alternative approaches

Forking creates a new conversation history from the same starting point while leaving the original intact.

Good use cases:

- compare two refactoring strategies;
- explore alternative architectures;
- test two debugging hypotheses;
- create an independent review branch.

Forking conversation history does **not** isolate file edits. Use worktrees, separate directories, or checkpointing when the approaches may modify files.

## Subagents

A subagent runs a bounded task in its own context and returns a summary.

Use a subagent when:

- raw file reads would flood the main context;
- a side investigation is self-contained;
- a specialist needs different tools or permissions;
- several research paths can proceed independently;
- only conclusions need to return.

## Session fork or subagent?

| Need | Better choice |
|---|---|
| Explore two full alternative continuations | Fork session |
| Delegate a bounded side investigation | Subagent |
| Preserve a user-facing conversation thread | Session |
| Isolate a large amount of raw exploration | Subagent |
| Keep two approaches resumable independently | Fork session |
| Run repeated specialist workflow | Custom subagent or Skill |

## What a subagent receives

A subagent starts with isolated context. It does not automatically know everything in the parent conversation. The delegation message must include:

- the goal;
- relevant file or source scope;
- success criteria;
- constraints;
- expected output format;
- what uncertainty to report.

## Avoid context contamination

Independent review is weaker when the reviewer receives the implementer’s conclusions as unquestioned truth. For stronger review:

- give the reviewer the specification and artifact;
- keep implementation rationale separate where possible;
- ask for independent evidence;
- compare findings after the review.

## Persist important outputs

Do not rely only on session history for critical project state. Persist:

- architecture decisions;
- task manifests;
- verification results;
- unresolved risks;
- approved plans;
- file diffs or checkpoints.

Session transcripts are valuable context and audit material, but application state should remain explicit.

## Recovery checklist

- Capture session IDs when future resume matters.
- Name sessions or record their purpose.
- Re-read files changed outside the session.
- Use fork for alternative reasoning paths.
- Use filesystem isolation for alternative edits.
- Save durable decisions outside the transcript.
- Define what a subagent must return.
