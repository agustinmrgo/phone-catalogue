import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./spec.yaml",
  output: "./generated",
  plugins: ["@hey-api/types", "@hey-api/services"],
});
