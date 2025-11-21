import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/assets"),
      components: path.resolve(__dirname, "src/shared/components"),
      layouts: path.resolve(__dirname, "src/layouts"),
      features: path.resolve(__dirname, "src/features"),
      games: path.resolve(__dirname, "src/features/games"),
      hooks: path.resolve(__dirname, "src/shared/hooks"),
      provider: path.resolve(__dirname, "src/provider"),
    },
  },
});
