import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Plain Vite + React SPA. Output is a fully static bundle in dist/ — no SSR,
// no server entry, no nitro/cloudflare target. Deep links are handled by the
// SPA fallback rewrite in vercel.json.
export default defineConfig({
  plugins: [react(), tailwindcss(), tsConfigPaths()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  server: {
    host: true,
    port: 8080,
  },
  preview: {
    port: 8080,
  },
});
