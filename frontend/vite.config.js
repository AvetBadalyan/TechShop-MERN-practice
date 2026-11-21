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
  build: {
    rollupOptions: {
      output: {
        // Put the big libraries in their own files. The browser downloads
        // them in parallel and keeps them cached between deploys, because
        // they only change when a library is updated.
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-redux": ["@reduxjs/toolkit", "react-redux"],
          "vendor-ui": ["react-bootstrap", "react-router-bootstrap"],
          "vendor-forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          "vendor-utils": ["axios", "react-toastify", "react-helmet-async"],
          "vendor-paypal": ["@paypal/react-paypal-js"],
        },
      },
    },
  },
  // Vite defaults to a "dist" output directory, which Vercel's Vite preset
  // detects automatically.
});
