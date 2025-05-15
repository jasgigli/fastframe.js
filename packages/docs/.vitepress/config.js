export default {
  title: 'FastFrame.js',
  description: 'Next-generation frontend framework with compile-time reactivity',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }]
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'GitHub', link: 'https://github.com/fastframejs/fastframe' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is FastFrame.js?', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Core Concepts', link: '/guide/concepts' }
          ]
        },
        {
          text: 'Essentials',
          items: [
            { text: 'Components', link: '/guide/components' },
            { text: 'Reactivity', link: '/guide/reactivity' },
            { text: 'Templates', link: '/guide/templates' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Partial Hydration', link: '/guide/partial-hydration' },
            { text: 'Server-Side Rendering', link: '/guide/ssr' },
            { text: 'TypeScript', link: '/guide/typescript' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'Packages',
          items: [
            { text: 'Core', link: '/api/core' },
            { text: 'Compiler', link: '/api/compiler' },
            { text: 'CLI', link: '/api/cli' }
          ]
        },
        {
          text: 'Core API',
          items: [
            { text: 'Reactivity', link: '/api/reactivity' },
            { text: 'Lifecycle', link: '/api/lifecycle' },
            { text: 'Rendering', link: '/api/rendering' }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Basic Examples',
          items: [
            { text: 'Counter', link: '/examples/counter' },
            { text: 'Todo List', link: '/examples/todo' }
          ]
        },
        {
          text: 'Advanced Examples',
          items: [
            { text: 'Data Fetching', link: '/examples/data-fetching' },
            { text: 'Form Handling', link: '/examples/forms' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/fastframejs/fastframe' },
      { icon: 'twitter', link: 'https://twitter.com/fastframejs' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present FastFrame Team'
    },
    search: {
      provider: 'local'
    }
  }
}
