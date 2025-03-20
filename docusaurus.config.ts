import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Cirkit Designer Docs',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon/favicon.ico',

  // Set the production url of your site here
  url: 'https://learn.cirkitdesigner.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Cirkit Design LLC', // Usually your GitHub org/user name.
  projectName: 'Cirkit Designer', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Cirkit Designer | Docs',
      logo: {
        alt: 'Cirkit Designer Logo',
        src: 'img/logo/512x512.png',
      },
      items: [
        {
          href: 'https://www.cirkitdesigner.com',
          label: 'Home',
          position: 'right',
        },
        {
          href: 'https://app.cirkitdesigner.com',
          label: 'Cirkit Designer IDE',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Welcome',
              to: '/',
            },
            {
              label: 'Custom Simulation Components',
              to: '/custom-simulation-parts/getting-started',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/2R2DY37VpE',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Home',
              href: 'https://www.cirkitdesigner.com',
            },
            {
              label: 'Cirkit Designer IDE',
              href: 'https://app.cirkitdesigner.com',
            },
            {
              label: 'Components and Projects Library',
              href: 'https://docs.cirkitdesigner.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Cirkit Design LLC.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
