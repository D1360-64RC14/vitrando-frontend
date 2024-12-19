<script lang="ts" setup>
import HeaderLogo from "~/components/header/HeaderLogo.vue";
import StoreHeader from "~/components/StoreHeader.vue";
import { StoreRepository } from "~/repositories/StoreRepository";

const route = useRoute();
const storeRepo = new StoreRepository();

const profileStore = useMyProfileStore();

const storeSlug =
  typeof route.params["storeSlug"] === "string"
    ? route.params["storeSlug"]
    : route.params["storeSlug"][0];

const store = (await storeRepo.getStoreFromSlug(storeSlug))!;
const products = (await storeRepo.getProducts(store.id))!;
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
        />
        <HeaderSignIn v-else />
      </StoreHeader>
    </template>

    <div class="container self-center">
      <Card class="overflow-hidden">
        <template #header>
          <div class="relative bg-slate-400">
            <img
              src="https://picsum.photos/1920/300"
              width="1920"
              height="300"
            />
          </div>
        </template>
        <template #content>
          <div class="relative px-11 pb-8">
            <div class="absolute top-[-5rem]">
              <img
                class="rounded-full w-40 h-40 overflow-hidden bg-slate-200 drop-shadow"
                src="https://picsum.photos/160/160"
                width="160"
                height="160"
              />
            </div>
            <div class="ms-48">
              <h3 class="text-3xl drop-shadow">{{ store.name }}</h3>
              <p class="text-lg mt-2">{{ store.description }}</p>
            </div>
          </div>
        </template>
      </Card>
      <article class="mt-8 grid grid-cols-6 grid-flow-row gap-4">
        <Card
          v-for="product in products"
          class="flex"
          :pt="{ body: 'h-full', content: 'h-full' }"
        >
          <template #content>
            <ProductCard
              class="row-span-1"
              :product="product"
              :store="store"
            />
          </template>
        </Card>
      </article>
    </div>
  </NuxtLayout>
</template>
