---
layout: home

title: Claude Architecture Foundations
titleTemplate: false

hero:
  name: Claude Architecture Foundations
  text: Practical patterns for dependable AI systems
  tagline: An independent, engineering-focused guide to agentic orchestration, Claude Code, MCP, structured outputs, context management, and production reliability.
  image:
    src: /logo.svg
    alt: Abstract layered architecture mark
  actions:
    - theme: brand
      text: Start the guide
      link: /foundations/
    - theme: alt
      text: Open the decision guides
      link: /decision-guides/model-or-code

features:
  - title: Architecture before prompting
    details: Learn which responsibilities belong to model reasoning, application code, tool contracts, permissions, and human review.
  - title: Tool and MCP design
    details: Design small, trustworthy capability surfaces with explicit provenance, error semantics, and least-privilege controls.
  - title: Claude Code workflows
    details: Choose deliberately among CLAUDE.md, rules, skills, hooks, permissions, Plan Mode, sessions, and subagents.
  - title: Structured, grounded outputs
    details: Separate schema conformance from factual correctness, normalization, evidence fidelity, and downstream validation.
  - title: Context and state
    details: Treat context as working memory while keeping durable state, provenance, checkpoints, and fresh data outside the conversation.
  - title: Production reliability
    details: Build bounded retries, deterministic terminal checks, explicit handoffs, segmented evaluations, and observable failure modes.
---

## What this guide is

This is an **independent and unofficial educational project**. It explains recurring architecture decisions that appear when building real systems with Claude and Claude Code. The material is written from scratch, uses original examples and diagrams, and cites publicly available product documentation.

It is **not** an exam dump, answer key, or reconstruction of certification questions. It is not affiliated with, endorsed by, or sponsored by Anthropic.

<div class="decision-banner">
<strong>Core idea:</strong> let the model handle language, ambiguity, and adaptive reasoning; let deterministic systems enforce permissions, validation, durable state, and guarantees.
</div>

## Five domains, one system

<div class="principle-grid">
  <div class="principle-card"><h3>Agentic orchestration</h3><p>Loops, stop conditions, delegation, synthesis, human control, and terminal-state guarantees.</p></div>
  <div class="principle-card"><h3>Tool design and MCP</h3><p>Typed contracts, parameter provenance, safe side effects, error taxonomies, and multi-server capability surfaces.</p></div>
  <div class="principle-card"><h3>Claude Code</h3><p>Persistent instructions, on-demand procedures, deterministic hooks, permissions, exploration, and session strategy.</p></div>
  <div class="principle-card"><h3>Structured output</h3><p>Schemas, validation repair, normalization, provenance, confidence, and human review.</p></div>
  <div class="principle-card"><h3>Context and reliability</h3><p>Compaction, selective retrieval, durable state, freshness, recovery, observability, and evaluation.</p></div>
  <div class="principle-card"><h3>Decision discipline</h3><p>A repeatable way to choose model or code, prompt or enforcement, shared context or isolated workers.</p></div>
</div>

## Recommended reading path

1. Begin with [System Layers](/foundations/system-layers) to understand where responsibilities live.
2. Read [Agent Loops & Orchestration](/agentic-architecture/agent-loops) and [Tool Contracts](/tool-design-and-mcp/tool-contracts) together.
3. Use the [Claude Code Configuration](/claude-code/configuration) chapter as a practical decision reference.
4. Study [Schemas & Extraction](/structured-output/schemas-and-extraction) with [Context Engineering](/context-and-reliability/context-engineering).
5. Finish with the [Decision Guides](/decision-guides/model-or-code) and [Production Checklist](/decision-guides/production-checklist).
