import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Proxy API requests to the backend during local development.
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  // Vite defaults to a "dist" output directory, which Vercel's Vite preset
  // detects automatically.
});
