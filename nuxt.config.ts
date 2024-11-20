import { definePreset } from "@primevue/themes";
import Lara from "@primevue/themes/lara";

const Vitrando = definePreset(Lara, {
  semantic: {
    primary: {
      50: "{gray.50}",
      100: "{gray.100}",
      200: "{gray.200}",
      300: "{gray.300}",
      400: "{gray.400}",
      500: "{gray.500}",
      600: "{gray.600}",
      700: "{gray.700}",
      800: "{gray.800}",
      900: "{gray.900}",
      950: "{gray.950}",
    },
  },
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@primevue/nuxt-module"],
  devtools: {
    enabled: true,
  },
  routeRules: {
    "/": {
      ssr: true,
    },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Vitrando: A Vitrine Virtual para sua Loja",
      meta: [
        {
          property: "og:title",
          content: "Vitrando: A Vitrine Virtual para sua Loja",
        },
        {
          name: "description",
          property: "og:description",
          content:
            "Está procurando um lugar para anunciar facilmente seus produtos sem o trabalho de gerenciar todo um e-commerce? Então vamos juntos criar uma vitrine virtual para sua loja!",
        },
        {
          property: "og:type",
          content: "ecommerce",
        },
        {
          property: "og:locale",
          content: "pt_BR",
        },
      ],
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Vitrando,
        options: {
          darkModeSelector: "",
        },
      },
    },
  },
});
