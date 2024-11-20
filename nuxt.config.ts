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
});
