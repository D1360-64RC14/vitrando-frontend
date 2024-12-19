import { defineStore } from "pinia";
import type { Product, Store } from "~/domain/Store";

export interface NearbyStoreProducts {
  store: Store;
  products: Product[];
}

export const useMyNearbyStoresStore = defineStore("my_nearby_stores", {
  state: (): NearbyStoreProducts[] => [],
});
