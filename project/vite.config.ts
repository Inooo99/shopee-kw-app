// vite.config.ts - GUNAKAN KODE INI

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Pastikan tidak ada properti 'base' di sini
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
