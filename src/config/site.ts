/**
 * Single source of truth for the identity of this site.
 *
 * Change it here and both the browser tab and the social preview
 * (X, WhatsApp, Slack, LinkedIn) follow: the Vite plugin and the Next.js
 * metadata read these values, so nothing has to be repeated in
 * `index.html` or `src/app/layout.tsx`.
 */

export const site = {
  name: "tagger",
  title: "tagger",
  description: "",
  url: "",
  favicon: "https://cdn.raulmoracode.com/icons/favicon.ico",
  socialImage: "",
  socialImageAlt: "tagger — visor 3D",
  author: "Raul Mora",
  twitter: "@raulmoracode",
  locale: "es_ES",
  themeColor: "#1a1a1a",
} as const;
