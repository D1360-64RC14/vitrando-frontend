import type { ShoppingListID, ClientID, ProductID, StoreID } from "~/domain/ID";

export interface Cart {
  products: ProductGroup[];
}

export interface ProductGroup {
  productID: ProductID;
  storeID: StoreID;
  quantity: number;
}

export interface ShoppingList {
  name: string;
  products: ProductGroup[];
}

interface beShoppingList {
  id: ShoppingListID;
  clientID: ClientID;
  name: string;
}

interface beShoppingListItem extends ProductGroup {
  shoppingListID: ShoppingListID;
}

export class ShoppingListRepository {
  private readonly profileStore = useMyProfileStore();
  private readonly shoppingLists = useShoppingListsStore();
  private readonly shoppingListItems = useShoppingListItemsStore();

  async getMyShoppingLists(): Promise<ShoppingList[]> {
    const beShoppingLists = this.shoppingLists.filter(
      (sl) => sl.clientID === this.profileStore.client?.id
    );

    const shoppingListsRequest = beShoppingLists.map((sl) =>
      this.getShoppingList(sl.id)
    );
    const shoppingLists = await Promise.all(shoppingListsRequest);

    return shoppingLists.filter((r) => r !== null);
  }

  async getShoppingList(
    shoppingListID: ShoppingListID
  ): Promise<ShoppingList | null> {
    const shoppingList = this.shoppingLists.find(
      (sl) =>
        sl.clientID === this.profileStore.client?.id && sl.id === shoppingListID
    );
    if (!shoppingList) return null;

    const shoppingListItems = this.shoppingListItems.filter(
      (sli) => sli.shoppingListID === shoppingListID
    );

    return {
      name: shoppingList.name,
      products: shoppingListItems,
    };
  }
}

const useShoppingListsStore = defineStore("db_shopping_list", {
  state: (): beShoppingList[] => [],
  persist: true,
});
const useShoppingListItemsStore = defineStore("db_shopping_list_item", {
  state: (): beShoppingListItem[] => [],
  persist: true,
});
