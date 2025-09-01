// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import path from "path";

// https://astro.build/config
export default defineConfig({
  site: "https://aglobaltec.com",
  output: "static",
  integrations: [mdx(), sitemap()],
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
        "@components": path.resolve("./src/components"),
        "@layouts": path.resolve("./src/layouts"),
        "@pages": path.resolve("./src/pages"),
        "@styles": path.resolve("./src/styles"),
        "@assets": path.resolve("./src/assets"),
        "@utils": path.resolve("./src/utils"),
        "@lib": path.resolve("./src/lib"),
        "@types": path.resolve("./src/types")
      }
    }
  }
});
