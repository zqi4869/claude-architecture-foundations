# How to Study This Guide

The material is easier to retain when you study it as a set of **contrasts**.

## Study by decision pair

### Adaptive loop vs fixed workflow

- Use an adaptive loop when the next action depends on newly observed information.
- Use a fixed workflow when the steps and transitions are known and should be deterministic.

### Prompt guidance vs enforcement

- Use prompt guidance for preferences and judgment.
- Use enforcement for safety boundaries, permissions, and guaranteed automation.

### Context vs durable state

- Context supports the current reasoning step.
- Durable state supports recovery, audit, and future sessions.

### Model extraction vs code normalization

- Use the model to interpret meaning.
- Use code for exact conversion, canonicalization, and validation.

### Shared context vs subagent isolation

- Keep work in the main context when later reasoning needs the details.
- Delegate when raw exploration would flood the main conversation and only a summary is needed.

## A four-pass method

### Pass 1: explain the principle

After reading a section, explain the principle without product-specific names.

Example:

> A hard safety rule must be enforced by a mechanism that can reject the operation, not only by text telling the model not to do it.

### Pass 2: identify the failure mode

Ask what breaks when the principle is ignored.

Example:

> A long instruction says “never edit migrations,” but the model may still produce an Edit call because contextual guidance is not a permission boundary.

### Pass 3: choose the mechanism

Name the layer or mechanism that fixes the failure.

Example:

> Deny the relevant Edit path in the permission configuration.

### Pass 4: design evidence

State how you would test it.

Example:

> Run attempts using direct requests, indirect requests, aliases, and nested paths; verify that every prohibited Edit call is blocked and logged.

## Practice template

For every scenario, fill in:

| Question | Your answer |
|---|---|
| What is uncertain or semantic? | |
| What must be deterministic? | |
| Which tool or data source is needed? | |
| What state must persist? | |
| What can fail partially? | |
| What is the retry boundary? | |
| When is human approval required? | |
| What would a good evaluation test? | |

## Suggested schedule

- **Day 1:** system layers, agent loop, model vs code;
- **Day 2:** tool contracts, errors, MCP;
- **Day 3:** Claude Code configuration, exploration, sessions;
- **Day 4:** structured output, validation, evaluation;
- **Day 5:** context, recovery, reliability;
- **Day 6:** anti-patterns and production checklist;
- **Day 7:** explain the entire architecture using one original project example.
