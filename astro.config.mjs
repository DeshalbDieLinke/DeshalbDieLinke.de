// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    server: { port: 4321, host: "127.0.0.1" },
    site: 'https://deshalbdielinke.de',
    integrations: [mdx(), sitemap(), react(),
        tailwind({
            applyBaseStyles: false,
        }),
    ],
    vite: {
        ssr: {
            external: ['prismjs', 'image-size', 'tiny-glob', 'require'],
        },
    }
});