<script lang="ts" setup>
import type { MenuMethods } from "primevue";
import type { MenuItem } from "primevue/menuitem";

const props = defineProps<{
  showCart?: boolean;
  showStore?: boolean;
}>();

const profileStore = useMyProfileStore();
const cartStore = useMyCartStore();

const profileMenu = ref<MenuMethods>();

const menuItems = reactive<MenuItem[]>([
  {
    icon: "fas user",
    label: "Meu Perfil",
    command: () => {
      navigateTo("/profile");
    },
  },
  {
    icon: "fas shop",
    label: "Abrir Loja",
    command: () => {
      navigateTo("/new-store");
    },
  },
  {
    class: "text-red-500",
    icon: "fas right-from-bracket",
    label: "Sair",
    command: () => {
      profileStore.logout();
      navigateTo("/");
    },
  },
]);
</script>

<template>
  <div class="flex gap-2">
    <NuxtLink to="/cart">
      <Button
        v-if="showCart"
        variant="outlined"
        :badge="cartStore.products.length.toString()"
        badge-severity=""
      >
        <template #icon>
          <font-awesome-icon :icon="['fas', 'cart-shopping']" />
        </template>
      </Button>
    </NuxtLink>

    <template v-if="showStore">
      <NuxtLink
        :to="`/@${profileStore.store?.slug}`"
        v-if="profileStore.haveStore"
      >
        <Button
          variant="outlined"
          title="Ver sua Loja"
        >
          <template #icon>
            <font-awesome-icon :icon="['fas', 'shop']" />
          </template>
        </Button>
      </NuxtLink>
    </template>

    <Button
      variant="outlined"
      severity="secondary"
      title="Meu Perfil"
      @click="profileMenu?.toggle"
    >
      <template #icon>
        <font-awesome-icon :icon="['fas', 'user']" />
      </template>
    </Button>

    <Menu
      :model="menuItems"
      popup
      ref="profileMenu"
    >
      <template #start>
        <h3 class="p-0 text-center my-3 font-semibold text-gray-600">
          Olá, {{ profileStore.client?.name.split(" ")[0] }}!
        </h3>
        <Divider class="!m-0 !mt-3 !mb-1" />
      </template>
      <template #itemicon="$itemicon">
        <font-awesome-icon
          :class="'me-2 aspect-square ' + $itemicon.item.class"
          :icon="$itemicon.item.icon ?? ''"
          size="sm"
        />
      </template>
    </Menu>
  </div>
</template>
