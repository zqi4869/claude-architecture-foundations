# MCP Architecture

The Model Context Protocol (MCP) standardizes how AI applications connect to external capabilities and data sources. It reduces integration friction, but it does not remove the need for tool design, authentication, or least privilege.

<img class="diagram" src="/diagrams/mcp-architecture.svg" alt="MCP multi-server architecture with control plane">

## Core roles

An MCP architecture usually includes:

- **host or application** — the product running the interaction;
- **client** — the component that connects to an MCP server;
- **server** — the process exposing tools, resources, or prompts;
- **external system** — the database, API, repository, or service behind the server.

Product support varies by integration. Always check which MCP capabilities a specific client or connector currently supports.

## Multiple servers

A single interaction can use tools from multiple configured servers. For example:

- Git operations from one server;
- issue tracking from another;
- documentation search from a third.

The model chooses among enabled tools based on names, descriptions, schemas, and the current task.

## Capability exposure

Do not expose every available tool by default. Use:

- allowlists;
- denylists;
- per-tool configuration;
- deferred loading or tool search for large surfaces;
- separate read and write permissions;
- approval policies for consequential operations.

## Authentication and authorization

Authentication proves which user or service is connecting. Authorization decides what that identity may do.

Keep credentials outside model-visible content. The tool or connector should apply the user’s effective permissions, not a broad shared credential.

## Tool naming across servers

Names should remain distinguishable across services. Useful namespacing patterns include:

```text
git_create_branch
jira_update_ticket
docs_search
storage_archive_file
```

Avoid relying on hidden server identity to disambiguate semantically overlapping tools.

## Large tool surfaces

When dozens of tools are loaded, context cost and selection ambiguity increase. Options include:

- consolidate related operations;
- use clear resource-oriented namespaces;
- expose only task-relevant tools;
- defer loading;
- use a tool-search mechanism;
- delegate to specialists with narrower tool sets.

## MCP prompts and resources

Where supported, MCP may expose more than tools:

- **tools** perform operations;
- **resources** provide data or content;
- **prompts** provide reusable prompt templates.

Do not confuse a prompt template with a permission boundary. A prompt can guide usage; a tool policy controls capability.

## Local and remote scope

Configuration scope affects who can use a server:

- project-shared configuration can be version controlled;
- user-level configuration applies across projects;
- local configuration can hold machine-specific endpoints or secrets;
- organization-managed configuration can enforce policy.

Never commit credentials to a public repository.

## MCP security checklist

- Expose only required capabilities.
- Separate read and write operations.
- Use per-user or scoped credentials.
- Validate all tool inputs server-side.
- Return structured, minimal outputs.
- Treat external content as potentially untrusted.
- Require confirmation for consequential actions.
- Log tool identity, caller, parameters, result, and audit ID.
- Define timeout and retry semantics.
- Review server updates as supply-chain changes.
