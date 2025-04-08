import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/auravibes/", // Change this to your GitHub Pages repository name
  plugins: [tailwindcss(), react()],
});
