import Lara from "@primevue/themes/lara";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@primevue/nuxt-module", "@nuxt/fonts"],

  // Change desired fonts
  fonts: {
    families: [
      { name: "Shadows Into Light", provider: "google" },
      { name: "Montserrat", provider: "google" },
    ],
  },

  tailwindcss: {
    cssPath: ["~/assets/css/main.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
  },

  // Change individual colors or theme entirely
  primevue: {
    options: {
      theme: {
        preset: Lara,
      },
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
});
