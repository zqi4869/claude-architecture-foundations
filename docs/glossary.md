# Glossary

## Agent

A model-driven system that can direct parts of its own process and tool use toward a goal, usually within an application-controlled harness.

## Agent loop

The repeated cycle of model reasoning, tool request, tool execution, observation, and further reasoning.

## Application / harness

The surrounding software that supplies instructions, tools, permissions, state, execution, limits, and operational controls.

## Authorization

The decision about what an authenticated identity is allowed to do.

## Checkpoint

A durable record of confirmed workflow progress that supports recovery without repeating completed work.

## Compaction

A context-management technique that replaces older active conversation content with a shorter representation while preserving enough information to continue.

## Context

The information available to the model for the current generation: instructions, messages, tool definitions, tool results, and selected source material.

## Context engineering

The practice of selecting, structuring, retrieving, and compacting information so the model has the right working set for the current task.

## Durable state

Workflow or business data stored outside the model context so it can survive restarts, compaction, and cross-host execution.

## Handoff

A structured transfer of authority and state from an automated workflow to a human or another responsible system.

## Hook

Deterministic logic triggered around a Claude Code lifecycle event or tool action.

## Idempotency

The property that repeating an operation with the same logical identifier does not create additional side effects.

## MCP

Model Context Protocol, a standard for connecting AI applications to external capabilities and data sources.

## Orchestrator / coordinator

The component that decomposes work, invokes agents or tools, tracks dependencies, validates outcomes, and synthesizes results.

## Parameter provenance

The trusted origin of a tool input, such as an identifier returned by a prior verified lookup.

## Plan Mode

A Claude Code mode for exploration and planning without immediately editing files.

## Provenance

Metadata that links a claim, extracted field, or decision to its source and processing history.

## Schema conformance

The property that an output matches a required structural schema. It does not imply factual correctness.

## Session

Persisted conversation history for a Claude Code or Agent SDK interaction, including prompts, tool calls, results, and responses.

## Skill

A reusable Claude Code procedure or instruction package whose body loads when invoked or relevant.

## Structured output

A response constrained to a defined schema so it can be parsed and validated reliably.

## Subagent

A specialist agent working in isolated context on a bounded delegated task, returning a focused result to the parent.

## Terminal state

An allowed final workflow condition such as completed, safely failed, handed off, or cancelled.

## Tool

A typed capability that lets Claude retrieve external data or request an action through application or server execution.

## Tool contract

The model-facing definition of a tool: name, description, input schema, preconditions, behavior, outputs, and error semantics.

## Tool result

The structured result returned to Claude after a client tool executes, allowing the model to continue reasoning.
