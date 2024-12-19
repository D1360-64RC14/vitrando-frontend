import { defineStore } from "pinia";
import type { ProductID, StoreID } from "~/domain/ID";
import type { Cart } from "~/repositories/ShoppingListRepository";

export const useMyCartStore = defineStore("my_cart", {
  state: (): Cart => ({
    products: [],
  }),
  actions: {
    add(productID: ProductID, storeID: StoreID, quantity: number) {
      const existentGroup = this.products.find(
        (pg) => pg.productID === productID
      );

      if (existentGroup) {
        existentGroup.quantity += quantity;
        return;
      }

      this.products.push({ productID, storeID, quantity });
    },

    remove(productID: ProductID, storeID: StoreID, quantity: number) {
      const existentGroup = this.products.find(
        (pg) => pg.productID === productID
      );
      if (!existentGroup) return;

      existentGroup.quantity -= quantity;

      if (existentGroup.quantity <= 0) {
        this.products = this.products.filter(
          (pg) => pg.productID !== productID && pg.storeID == storeID
        );
      }
    },
  },
  persist: true,
});
