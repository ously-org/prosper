// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeSix from '@six-tech/starlight-theme-six'

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			plugins: [
				starlightThemeSix({
					navLinks: [{ // optional
						label: 'Docs',
						link: '/getting-started',
					}],
					footerText: //optional
						'Built & designed by [Prosper](https://prosper.dev).'
				})
			],
			title: 'Prosper',
            customCss: [
                './src/styles/custom.css',
            ],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/prosper' }],
			sidebar: [
				{
					label: 'Intro',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Introduction', slug: 'intro' },
                        { label: 'Getting Started', slug: 'getting-started' },
					],
				},
			],
		}),
	],
});
