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
  },
} as InputConfig<NuxtConfig, ConfigLayerMeta>;
