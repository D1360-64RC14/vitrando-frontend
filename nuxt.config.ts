import Styles from "./config/styles";
import App from "./config/app";
import Routes from "./config/routes";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: [
    "@primevue/nuxt-module",
    "@vesp/nuxt-fontawesome",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  devtools: {
    enabled: true,
  },
  ...Routes,
  ...App,
  ...Styles,
});
