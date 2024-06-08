import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {},
	component: {
		specPattern: 'cypress/components/**/*.cy.ts',
		indexHtmlFile: 'cypress/support/component-index.html',
		devServer: {
			framework: 'svelte',
			bundler: 'vite',
			viteConfig: {
				configFile: 'vite.config.ts'
			}
		}
	}
});
