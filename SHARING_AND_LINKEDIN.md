# Sharing and LinkedIn Guide

## Safe public positioning

Describe the project as an independent, open-source study guide based on public documentation and original technical analysis.

Avoid describing it as:

- an exam dump;
- a collection of real questions;
- an official certification guide;
- guaranteed preparation;
- endorsed by Anthropic.

## Suggested LinkedIn post

While studying production patterns for Claude-based systems, I noticed that the most useful lessons were not isolated product features, but recurring architecture decisions:

- when to rely on model reasoning and when to enforce behavior in deterministic code;
- how to design trustworthy tool contracts and MCP integrations;
- how to choose among CLAUDE.md, Skills, hooks, permissions, sessions, and subagents;
- how to separate schema compliance from factual correctness;
- how to manage context, durable state, failure recovery, and human control.

I turned those lessons into **Claude Architecture Foundations**, a free, independent, open-source study guide with original diagrams, decision tables, and production checklists.

The project is unofficial, is not affiliated with Anthropic, and does not reproduce certification exam questions or answer keys. Product behavior is linked back to public documentation.

🔗 [YOUR GITHUB PAGES LINK]
💻 [YOUR REPOSITORY LINK]

Feedback and corrections are welcome.

#AIEngineering #Claude #AgenticAI #MCP #ClaudeCode #SoftwareArchitecture #OpenSource

## Short repository announcement

I published an independent guide to architecture patterns for Claude-based systems: agent loops, tool contracts, MCP, Claude Code workflows, structured outputs, context engineering, and production reliability. It uses original examples and public documentation rather than exam questions.

## Social preview image

The repository includes `docs/public/og-card.png`. The deployment workflow sets the GitHub Pages origin during the build, so the generated site includes an absolute Open Graph image URL for LinkedIn and other social platforms.

After deployment, test the shared URL with a social-preview debugger. Platforms may cache the first preview, so update the page URL or request a refresh after changing metadata.
