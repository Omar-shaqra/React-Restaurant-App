import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    commonjsOptions: {
      strictRequires: false,
    },
  },
  plugins: [react()],
  server: {
    port: 80,
  },
});
