# Prompt Design & Clarification

Prompt engineering works best after the system has a clear definition of success and a way to test it. A longer prompt cannot compensate for an undefined task, missing data, or an unenforced safety boundary.

## Start with a response contract

Define:

- the user goal;
- available context and tools;
- what the model may infer;
- what it must not invent;
- how missing or conflicting information should be represented;
- the expected output form;
- completion and escalation conditions.

A response contract can be prose, a schema, a tool definition, or a combination.

## Be explicit about grounding

If the task must use only supplied sources, say so and define missing-data behavior.

Example:

> Use only the provided documents. Do not fill gaps from general knowledge. If a required fact is absent, return `not_found` and identify which source types were checked.

This is more reliable than merely asking the model to “avoid hallucinations.”

## Clarify with minimum friction

Ambiguous requests do not always require a questionnaire. Ask the **single most decision-relevant question** first.

User:

> Can you help with the report?

High-friction response:

> Which report? What type of help? What audience? What deadline? What format?

Lower-friction response:

> Sure—should I help draft it or review an existing version?

After the user answers, ask the next necessary question or begin useful work.

## When to ask and when to proceed

Ask when:

- different interpretations lead to materially different actions;
- a required parameter is missing and cannot be retrieved;
- the action is consequential;
- user preference controls the outcome;
- authorization or scope is unclear.

Proceed with a stated assumption when:

- the assumption is low risk and reversible;
- the user can easily correct it;
- the task can make useful partial progress;
- the system clearly labels the assumption.

## Few-shot examples

Examples are valuable when the boundary is difficult to express abstractly. Good examples cover variation:

- normal case;
- missing information;
- ambiguous case;
- conflicting evidence;
- edge length or format;
- unacceptable inference;
- correct abstention.

Do not use examples that all demonstrate the same easy pattern.

## Separate goals from procedures

For open-ended research or investigation, specify the goal and quality criteria, then let the agent adapt its strategy.

For regulated or deterministic workflows, specify the required procedure and enforce transitions in code.

Goal-oriented instruction:

> Identify the highest-risk compatibility changes, cite the affected code paths, and verify each claim with tests or source references.

Procedure-oriented instruction:

> Run the migration validator, then the compatibility test suite, then stop if either fails.

Both are useful in the right context.

## Prompt iteration should use evidence

A productive loop is:

1. define success criteria;
2. build representative test cases;
3. run the current prompt;
4. classify failures;
5. change one relevant mechanism;
6. re-run the suite;
7. check for regressions.

Not every failure is a prompt failure. The correct fix may be:

- a better tool description;
- a stricter schema;
- a permission rule;
- fresh data retrieval;
- deterministic normalization;
- a human-review policy.

## Prompt design checklist

- Is the task and success condition clear?
- Is the allowed evidence boundary explicit?
- Are missing and conflicting data handled?
- Are assumptions visible and reversible?
- Are clarification questions prioritized?
- Do examples cover meaningful variation?
- Is the output contract machine-checkable where needed?
- Are hard guarantees enforced outside the prompt?
