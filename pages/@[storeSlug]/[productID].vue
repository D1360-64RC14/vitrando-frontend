<script lang="ts" setup>
import HeaderLogo from "~/components/header/HeaderLogo.vue";
import StoreHeader from "~/components/StoreHeader.vue";
import { CurrencyManager } from "~/currency/CurrencyManager";
import type { ProductID } from "~/domain/ID";
import { StoreService } from "~/services/StoreService";

const profileStore = useMyProfileStore();

const route = useRoute();

const storeSlug =
  typeof route.params["storeSlug"] === "string"
    ? route.params["storeSlug"]
    : route.params["storeSlug"][0];

const productID: ProductID = Number(
  typeof route.params["productID"] === "string"
    ? route.params["productID"]
    : route.params["productID"][0]
);

const storeService = new StoreService();
const currencyManager = new CurrencyManager();

const store = (await storeService.getStoreFromSlug(storeSlug))!;
const product = (await storeService.getProduct(store.id, productID))!;
</script>

<template>
  <NuxtLayout name="base">
    <template #header>
      <StoreHeader>
        <HeaderLogo />
        <HeaderSearchBar />
        <HeaderAccount
          v-if="profileStore.isLoggedIn"
          show-cart
          show-store
        />
        <HeaderSignIn v-else />
      </StoreHeader>
    </template>

    <div class="container max-w-screen-lg self-center">
      <Card>
        <template #content>
          <main class="flex flex-row">
            <div
              class="w-[40%] aspect-square hover:bg-gray-50 transition-colors rounded-lg overflow-hidden"
            >
              <img
                class="rounded-lg h-full m-auto object-contain"
                :src="product.imageUrl"
                :alt="product.name"
              />
            </div>
            <div class="w-[60%] mx-6 flex flex-col justify-between gap-3">
              <div class="flex flex-col gap-3">
                <h3 class="text-3xl leading-relaxed">
                  {{ product.name }}
                </h3>
                <h4 class="text-2xl">
                  {{
                    currencyManager.currentComputed.value.format(product.price)
                  }}
                </h4>
                <p class="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                  corporis quis voluptates alias nulla nostrum debitis explicabo
                  dolor, et sit blanditiis numquam pariatur harum autem!
                </p>
              </div>
              <div class="flex flex-col gap-3">
                <div class="flex gap-2">
                  <Button
                    label="Adicionar ao Carrinho"
                    severity="success"
                  />
                  <Button
                    class="aspect-square"
                    variant="outlined"
                    severity="danger"
                    title="Adicionar aos favoritos"
                  >
                    <font-awesome-icon :icon="['far', 'heart']" />
                  </Button>
                  <Button
                    class="aspect-square"
                    variant="outlined"
                    severity="success"
                    title="Contatar Loja"
                  >
                    <font-awesome-icon :icon="['fab', 'whatsapp']" />
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </template>
      </Card>
    </div>
  </NuxtLayout>
</template>
