# Exploration & Verification

Effective codebase work alternates between understanding, planning, editing, and verification. Skipping the understanding phase creates fast but fragile changes.

## Read, Glob, and Grep are complementary

### Glob

Use Glob to discover files by path pattern:

- tests for a module;
- all migration files;
- configuration variants;
- generated files.

### Grep

Use Grep to find text patterns across files:

- symbol references;
- configuration keys;
- error messages;
- route names;
- feature flags.

### Read

Use Read to understand surrounding implementation and semantics:

- whether a wrapper renames a function;
- whether a reference is executable or only documentation;
- whether a branch is conditional;
- how types and errors flow.

Search finds candidates. Reading establishes meaning.

## Trace aliases before removing symbols

Searching only for the original function name is insufficient when code uses:

- re-exports;
- wrapper functions;
- local aliases;
- dependency injection;
- registries;
- configuration-driven references.

A reliable sequence is:

1. read the definition;
2. map exports and wrappers;
3. identify all public names;
4. search each name;
5. inspect call sites;
6. check tests, configuration, and generated code;
7. verify with type checks and tests.

## Plan before broad changes

For a breaking library upgrade, first map:

- import locations;
- changed signatures;
- affected types;
- indirect callers;
- tests and fixtures;
- rollout and rollback risks.

Then propose a migration sequence. Fixing failures one by one after blindly changing the dependency may miss silent behavior changes.

## Direct execution is still valid

Direct execution is appropriate when:

- the change is small and localized;
- expected behavior is clear;
- affected files are known;
- verification is fast;
- rollback is trivial.

Examples include a typo, a focused test assertion, or a small configuration correction.

## Verification should be executable

Weak verification:

> The code looks correct.

Stronger verification:

- run the focused unit test;
- run type checking;
- inspect the exact diff;
- reproduce the original bug;
- test an edge case;
- run a formatter or linter;
- confirm generated artifacts match expectations.

## Tight feedback loops

For uncertain implementation work:

```text
small change → focused test → inspect result → revise
```

This is usually safer than generating a large rewrite and testing only at the end.

## Use examples as implementation context

When an existing codebase already demonstrates the desired pattern, reference the relevant files directly rather than summarizing them loosely.

Good context includes:

- transaction pattern;
- error structure;
- logging fields;
- naming conventions;
- helper APIs;
- nearby tests.

Do not load a large implementation into persistent instructions if it matters only for one task.

## Requirements discovery

When the task is underspecified, Claude should ask targeted questions before editing. Useful questions expose decisions that materially affect implementation:

- Which compatibility versions must be supported?
- Is backward compatibility required?
- What happens to invalid legacy data?
- Is migration reversible?
- Which performance constraint matters?
- What is the acceptance test?

Avoid asking many generic questions at once. Ask the smallest set needed to unblock a safe plan.

## Code exploration checklist

- Map the architecture boundary before editing.
- Trace aliases and re-exports.
- Inspect tests and configuration, not only source files.
- Choose Plan Mode based on uncertainty and impact.
- Make changes incrementally.
- Verify with observable evidence.
- Review the diff for unintended scope.
