import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: { origin: "*" },
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:10101",
        changeOrigin: true,
      },
    },
  },
});
