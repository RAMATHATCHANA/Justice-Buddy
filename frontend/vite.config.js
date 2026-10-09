// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow access from all network interfaces
    port: 5000, // Use port 5000 as specified in package.json
    strictPort: false, // Allow Vite to try next available port if 5000 is taken
    watch: {
      usePolling: false, // Not needed for local development
    },
  },
});
