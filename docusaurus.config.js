// docusaurus.config.js
// Copy this file into your devops-labs/ folder, replacing the existing one

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DevOps Labs',
  tagline: 'Real-world DevOps. Built, broken, and fixed.',
  favicon: 'img/favicon.ico',

  url: 'https://mradelvand.github.io',
  baseUrl: '/devops-labs/',

  organizationName: 'mradelvand',
  projectName: 'devops-labs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/mradelvand/devops-labs/tree/main/',
        },
        blog: false,   // no blog section — everything goes in /docs
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'DevOps Labs',
        logo: {
          alt: 'DevOps Labs Logo',
          src: 'img/logo.svg',
        },
        items: [
          { to: '/docs/monitoring/overview', label: 'Monitoring', position: 'left' },
          { to: '/docs/docker/overview',     label: 'Docker',     position: 'left' },
          { to: '/docs/aws/overview',        label: 'AWS',        position: 'left' },
          { to: '/docs/gitops/overview',     label: 'GitOps',     position: 'left' },
          { to: '/docs/linux/overview',      label: 'Linux',      position: 'left' },
          {
            href: 'https://github.com/mradelvand/devops-labs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Built by mradelvand · ${new Date().getFullYear()}`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'yaml', 'hcl', 'docker', 'python'],
      },
    }),
};

export default config;
