import type { InputConfig, ConfigLayerMeta } from "c12";
import type { NuxtConfig } from "nuxt/schema";

export default {
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
    "/cart": {
      ssr: false,
    },
    "/login": {
      ssr: false,
    },
    "/signin": {
      ssr: false,
    },
  },
} as InputConfig<NuxtConfig, ConfigLayerMeta>;
