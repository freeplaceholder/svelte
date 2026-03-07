import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

export default defineConfig({
  plugins: [svelte({ hot: false })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    environmentOptions: {
      jsdom: {},
    },
    browser: {
      enabled: false,
    },
    coverage: {
      provider: "v8",
      include: ["src/**/*.svelte", "src/**/*.ts"],
      exclude: ["src/index.ts"],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
  resolve: {
    conditions: ["browser"],
  },
});
