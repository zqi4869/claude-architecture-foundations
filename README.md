# Claude Architecture Foundations

An independent, engineering-focused study guide to production architecture patterns for Claude-based systems.

## Scope

The site covers:

- agentic loops and deterministic orchestration;
- multi-agent coordination and human handoffs;
- trustworthy tool contracts and MCP integrations;
- Claude Code configuration, exploration, sessions, forks, and subagents;
- structured outputs, validation, repair, and evaluation;
- context engineering, durable state, freshness, and recovery;
- decision guides and a production-readiness checklist.

The public material is written from scratch and does **not** reproduce certification questions or answer keys.

## Local development

Requirements: Node.js 20 or newer.

```bash
npm install
npm run docs:dev
```

Build locally:

```bash
npm run docs:build
npm run docs:preview
```

## Deploy to GitHub Pages

1. Create a new GitHub repository, for example `claude-architecture-foundations`.
2. Push this project to the repository's `main` branch.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions**.
5. Open the **Actions** tab and wait for `Deploy VitePress site to GitHub Pages` to complete.
6. The site will be available at:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

The included workflow automatically selects `/` as the base path for a `YOUR-USERNAME.github.io` user-site repository, or `/<repository>/` for a normal project repository.

## Before publishing

- Replace generic repository links or author details if desired.
- Review `docs/about.md` and the licensing notice.
- Confirm no private source material, screenshots, or exam mappings are added.
- Test the site on desktop and mobile.
- Use public primary documentation for new factual claims.

## Suggested repository description

> Independent study guide to agentic orchestration, Claude Code, MCP, structured outputs, and reliability engineering.

## License

- Code: MIT, see [`LICENSE`](./LICENSE).
- Original text and diagrams: CC BY 4.0, see [`CONTENT_LICENSE.md`](./CONTENT_LICENSE.md).

## Disclaimer

This project is independent and unofficial. It is not affiliated with or endorsed by Anthropic and does not contain or reconstruct live certification exam questions.
