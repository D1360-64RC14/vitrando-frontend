import type { StoreCart } from "~/repositories/ShoppingListRepository";

export const useMyCartStore = reactive<StoreCart>({
  items: [],
});
