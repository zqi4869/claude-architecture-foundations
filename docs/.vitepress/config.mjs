import { defineConfig } from 'vitepress'

const base = '/claude-architecture-foundations/'
const siteOrigin = 'https://zqi4869.github.io'
const pageUrl = `${siteOrigin}${base}`
const socialImage = `${siteOrigin}${base}og-card.png`

export default defineConfig({
  base,
  lang: 'en-US',

  title: 'Claude Architecture Foundations',

  description:
    'An independent study guide to agentic orchestration, Claude Code, MCP, structured outputs, and reliability engineering.',

  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#0f766e' }],
    ['meta', { name: 'author', content: 'Zhen Qi' }],

    ['meta', { property: 'og:type', content: 'website' }],
    [
      'meta',
      {
        property: 'og:title',
        content: 'Claude Architecture Foundations'
      }
    ],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'A practical, independent guide to production architecture patterns for Claude-based systems.'
      }
    ],
    ['meta', { property: 'og:url', content: pageUrl }],
    ['meta', { property: 'og:image', content: socialImage }],

    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: socialImage }],

    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: `${base}favicon.svg`
      }
    ]
  ],

  themeConfig: {
    logo: `${base}logo.svg`,

    siteTitle: 'Claude Architecture Foundations',

    search: {
      provider: 'local'
    },

    nav: [
      {
        text: 'Start Here',
        link: '/foundations/'
      },
      {
        text: 'Decision Guides',
        link: '/decision-guides/model-or-code'
      },
      {
        text: 'Glossary',
        link: '/glossary'
      },
      {
        text: 'References',
        link: '/references'
      }
    ],

    sidebar: [
      {
        text: 'Orientation',
        items: [
          {
            text: 'Guide Overview',
            link: '/foundations/'
          },
          {
            text: 'System Layers',
            link: '/foundations/system-layers'
          },
          {
            text: 'How to Study',
            link: '/foundations/study-path'
          }
        ]
      },

      {
        text: 'Agentic Architecture',
        collapsed: false,
        items: [
          {
            text: 'Agent Loops & Orchestration',
            link: '/agentic-architecture/agent-loops'
          },
          {
            text: 'Multi-Agent Systems',
            link: '/agentic-architecture/multi-agent-systems'
          },
          {
            text: 'Human Control & Handoffs',
            link: '/agentic-architecture/human-control'
          }
        ]
      },

      {
        text: 'Tool Design & MCP',
        collapsed: false,
        items: [
          {
            text: 'Tool Contracts',
            link: '/tool-design-and-mcp/tool-contracts'
          },
          {
            text: 'Errors, Safety & Idempotency',
            link: '/tool-design-and-mcp/errors-and-safety'
          },
          {
            text: 'MCP Architecture',
            link: '/tool-design-and-mcp/mcp-architecture'
          }
        ]
      },

      {
        text: 'Claude Code',
        collapsed: false,
        items: [
          {
            text: 'Configuration Mechanisms',
            link: '/claude-code/configuration'
          },
          {
            text: 'Exploration & Verification',
            link: '/claude-code/exploration'
          },
          {
            text: 'Sessions, Forks & Subagents',
            link: '/claude-code/sessions-and-subagents'
          }
        ]
      },

      {
        text: 'Structured Output',
        collapsed: false,
        items: [
          {
            text: 'Prompt Design & Clarification',
            link: '/structured-output/prompt-design'
          },
          {
            text: 'Schemas & Extraction',
            link: '/structured-output/schemas-and-extraction'
          },
          {
            text: 'Validation, Repair & Evaluation',
            link: '/structured-output/validation-and-evaluation'
          }
        ]
      },

      {
        text: 'Context & Reliability',
        collapsed: false,
        items: [
          {
            text: 'Context Engineering',
            link: '/context-and-reliability/context-engineering'
          },
          {
            text: 'State, Freshness & Recovery',
            link: '/context-and-reliability/state-and-recovery'
          },
          {
            text: 'Production Reliability',
            link: '/context-and-reliability/production-reliability'
          }
        ]
      },

      {
        text: 'Decision Guides',
        collapsed: false,
        items: [
          {
            text: 'Model or Code?',
            link: '/decision-guides/model-or-code'
          },
          {
            text: 'Prompt or Enforcement?',
            link: '/decision-guides/prompt-or-enforcement'
          },
          {
            text: 'Common Anti-Patterns',
            link: '/decision-guides/anti-patterns'
          },
          {
            text: 'Production Checklist',
            link: '/decision-guides/production-checklist'
          }
        ]
      },

      {
        text: 'Project',
        items: [
          {
            text: 'Glossary',
            link: '/glossary'
          },
          {
            text: 'References',
            link: '/references'
          },
          {
            text: 'About & Disclaimer',
            link: '/about'
          }
        ]
      }
    ],

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },

    footer: {
      message:
        'Independent and unofficial educational resource. Not affiliated with or endorsed by Anthropic.',

      copyright:
        'Original text and diagrams © Zhen Qi. Content licensed under CC BY 4.0; code under MIT.'
    }
  }
})
