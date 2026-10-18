/**
 * Single source of truth for the identity of this site.
 *
 * Change it here and both the browser tab and the social preview
 * (X, WhatsApp, Slack, LinkedIn) follow: the Vite plugin and the Next.js
 * metadata read these values, so nothing has to be repeated in
 * `index.html` or `src/app/layout.tsx`.
 */

export const site = {
  name: "tagger-new-web",
  title: "tagger-new-web",
  description: "",
  url: "",
  favicon: "https://cdn.raulmoracode.com/icons/favicon.ico",
  socialImage: "/imagen.png",
  socialImageAlt: "tagger-new-web — React 19 + Vite 8 + TypeScript 6",
  author: "Raul Mora",
  twitter: "@raulmoracode",
  locale: "es_ES",
  themeColor: "#ffffff",
} as const;
