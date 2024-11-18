import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        // Include only files in the 'src' folder
        include: ['src/**/*.{js,ts,vue}'],
        exclude: ['node_modules', 'src/components/__tests__', 'src/data/**', 'src/stores/**', 'src/router/**', 'src/main.js', 'dist', '**/*.d.ts'],
        reportsDirectory: './coverage',
        reporter: ['text', 'html'],
      }
    },
  }),
)
