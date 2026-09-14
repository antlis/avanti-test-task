import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      css: false,
      exclude: [...configDefaults.exclude, 'tests/e2e/**'],
      include: ['tests/unit/**/*.{test,spec}.ts', 'src/**/__tests__/**/*.{test,spec}.ts'],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
