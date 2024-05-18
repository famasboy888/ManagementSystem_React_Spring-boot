import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        "src/main.jsx",
        "coverage",
        ".eslintrc.cjs",
      ],
    },
  },
});
