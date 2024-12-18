import type { InputConfig, ConfigLayerMeta } from "c12";
import type { NuxtConfig } from "nuxt/schema";

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

export default {
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
  fontawesome: {
    component: "font-awesome-icon",
    icons: {
      solid: [
        "phone",
        "at",
        "user",
        "arrow-left",
        "arrow-right",
        "cart-shopping",
      ],
    },
  },
} as InputConfig<NuxtConfig, ConfigLayerMeta>;
