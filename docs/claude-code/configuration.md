# Configuration Mechanisms

Claude Code provides several mechanisms that look similar at first but serve different purposes. Choose based on **scope**, **loading behavior**, and **enforcement semantics**.

<img class="diagram" src="/diagrams/configuration-decision.svg" alt="Claude Code configuration decision tree">

## CLAUDE.md

Use `CLAUDE.md` for persistent project knowledge that Claude should see in every relevant session:

- build and test commands;
- architecture overview;
- coding conventions;
- repository layout;
- preferred libraries;
- common development workflow;
- known constraints.

Keep it concise and concrete. Long, conflicting instruction files consume context and reduce adherence.

### Good instruction

> API handlers live in `src/api/handlers/`. Run `npm test -- api` after modifying them.

### Weak instruction

> Keep the API code clean and well tested.

`CLAUDE.md` is context, not a hard access-control mechanism.

## Path-scoped rules

Use `.claude/rules/` when an instruction applies only to specific files or directories.

Examples:

- frontend conventions for `src/ui/**`;
- SQL migration style for `db/migrations/**`;
- test rules for `**/*.test.ts`;
- security review guidance for authentication modules.

Path-scoped loading reduces irrelevant context while keeping instructions close to the files they govern.

## Skills

Use a Skill for a reusable, multi-step procedure or large reference that should load only when relevant.

Examples:

- migration checklist;
- release review;
- incident triage;
- accessibility audit;
- component conversion workflow.

A project Skill can be version controlled so the whole team shares the same procedure.

A Skill is preferable to putting a long occasional workflow in `CLAUDE.md`, because the body loads on demand.

## Hooks

Hooks run deterministic automation around events such as tool use or file modification.

Examples:

- run Prettier after an edit;
- block a command based on custom validation;
- log tool calls;
- run targeted tests after modifying a module;
- verify a generated file before accepting it.

Use a hook when the requirement is **an operation that should actually run**, not merely a preference Claude should remember.

## Permissions

Permissions control which tools or actions Claude Code may execute. Use them for hard boundaries:

- deny edits to protected paths;
- ask before shell commands;
- allow read-only exploration;
- restrict MCP tools;
- require approval for destructive actions.

A deny rule is stronger than writing “never edit this directory” in a prompt.

## Plan Mode

Plan Mode is useful when you want Claude to inspect and propose before modifying files.

Use it for:

- multi-file migrations;
- unfamiliar architecture;
- breaking dependency upgrades;
- changes with several viable approaches;
- work requiring stakeholder review.

Do not require Plan Mode for every tiny, obvious edit. The mechanism should match the risk and uncertainty.

## Decision table

| Requirement | Mechanism | Why |
|---|---|---|
| Team coding convention | `CLAUDE.md` | Persistent shared context |
| Only applies to one path | Rule | Context-efficient scope |
| Reusable multi-step workflow | Skill | On-demand procedure |
| Auto-format after editing | Hook | Deterministic automation |
| Never modify protected files | Permission deny | Hard boundary |
| Review before any edits | Plan Mode | Separate exploration from execution |
| Personal local preference | `CLAUDE.local.md` or user scope | Do not impose on team |

## Combination example

Requirement set:

1. Use the project logging wrapper.
2. Never edit generated schema files.
3. Format TypeScript after changes.
4. Run a release checklist when requested.

Recommended design:

- logging wrapper: `CLAUDE.md`;
- protected generated files: permission deny;
- formatting: `PostToolUse` hook;
- release checklist: project Skill.

## Configuration review checklist

- Does each instruction need to load every session?
- Is the rule a preference or a guarantee?
- Could a path scope reduce context?
- Should the workflow be a Skill instead of a long instruction?
- Does a hook have a clear failure behavior?
- Are protected paths enforced through permissions?
- Are team-shared files version controlled?
- Are secrets excluded from committed configuration?
