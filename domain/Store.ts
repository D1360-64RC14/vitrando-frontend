import type { AgentID, ProductID, StoreID } from "./ID";

export interface Store {
  id: StoreID;
  agentID: AgentID;
  name: string;
  description: string;
  slug: string;
}

export interface Product {
  id: ProductID;
  storeID: StoreID;
  name: string;
  imageUrl: string;
  price: number;
}
