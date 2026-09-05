import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Proxy API and upload requests to the backend during development,
    // replacing the CRA "proxy" package.json field.
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  build: {
    outDir: "build", // keep the same output folder name the backend serves
  },
});
