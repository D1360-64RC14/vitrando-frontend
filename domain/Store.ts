import type { ProductID, StoreID } from "./ID";

export interface Store {
  id: StoreID;
  name: string;
  slug: string;
}

export interface Product {
  id: ProductID;
  storeID: StoreID;
  name: string;
  imageUrl: string;
  price: number;
}
