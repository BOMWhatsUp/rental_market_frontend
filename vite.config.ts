import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ts from "vite-plugin-ts-checker";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ts()],
  define: {
    global: {},
  },
});
