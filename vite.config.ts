import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { site } from "./src/config/site.js";

const siteHead = () => ({
  name: "raulmoracode-site-head",
  transformIndexHtml: {
    order: "pre" as const,
    handler: () => {
      const {
        name,
        title,
        description,
        favicon,
        socialImage,
        socialImageAlt,
        twitter,
        themeColor,
      } = site;
      const absolute = (value: string) =>
        site.url && value.startsWith("/")
          ? new URL(value, site.url).href
          : value;
      const meta = (name: string, content: string) => ({
        tag: "meta" as const,
        attrs: { name, content },
      });
      const image = absolute(socialImage);
      return {
        tags: [
          { tag: "title" as const, children: title },
          meta("theme-color", themeColor),
          ...(description
            ? [
                meta("description", description),
                meta("og:description", description),
                meta("twitter:description", description),
              ]
            : []),
          ...(favicon
            ? [{ tag: "link" as const, attrs: { rel: "icon", href: favicon } }]
            : []),
          meta("og:type", "website"),
          meta("og:title", title),
          meta("og:site_name", name),
          ...(twitter
            ? [
                meta("twitter:card", "summary_large_image"),
                meta("twitter:site", twitter),
                meta("twitter:creator", twitter),
                meta("twitter:title", title),
              ]
            : []),
          ...(socialImage
            ? [
                meta("og:image", image),
                meta("og:image:alt", socialImageAlt),
                meta("twitter:image", image),
                meta("twitter:image:alt", socialImageAlt),
              ]
            : []),
        ],
      };
    },
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), siteHead()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
