import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // If you deploy to GitHub Pages as a PROJECT site (username.github.io/repo-name),
  // change this to "/repo-name/". Leave as "/" for Vercel or a user/org GitHub Pages site.
  base: "/",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
});
