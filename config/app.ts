import type { InputConfig, ConfigLayerMeta } from "c12";
import type { NuxtConfig } from "nuxt/schema";

export default {
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
} as InputConfig<NuxtConfig, ConfigLayerMeta>;
