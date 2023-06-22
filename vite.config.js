import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/time": {
        target: "http://127.0.0.1:5000/api/v1/time",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/time/, ""),
      },
      "/calculate": {
        target: "http://127.0.0.1:5000/api/v1/calculate",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/calculate/, ""),
      },
      "/download": {
        target: "http://127.0.0.1:5000/api/v1/download",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/download/, ""),
      },
      watch: {
        usePolling: true,
      },
    },
  },
});
