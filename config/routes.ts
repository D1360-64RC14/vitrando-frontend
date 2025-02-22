export default defineNuxtConfig({
  routeRules: {
    "/": {
      ssr: true,
    },
    "/@[storeSlug]": {
      ssr: true,
    },
    "/@[storeSlug]/[productID]": {
      ssr: true,
    },
    "/login": {
      ssr: true,
    },
    "/signin": {
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
