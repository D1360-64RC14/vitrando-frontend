export default defineNuxtConfig({
  routeRules: {
    "/": {
      ssr: true,
    },
    "/login": {
      ssr: true,
      prerender: true,
    },
    "/signin": {
      ssr: true,
      prerender: true,
    },
    "/@[storeSlug]": {
      ssr: true,
    },
    "/@[storeSlug]/[productID]": {
      ssr: true,
    },
    "/cart": {
      ssr: false,
    },
    "/new-store": {
      ssr: false,
    },
  },
});
