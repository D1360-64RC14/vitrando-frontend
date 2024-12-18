import type { ShoppingListID, ClientID, ProductID } from "~/domain/ID";
import type { Product } from "~/domain/Store";
import { StoreRepository } from "./StoreRepository";

export interface ShoppingList {
  shoppingListID: ShoppingListID;
  name?: string;
  clientID: ClientID;
}

export interface ShoppingListItem {
  shoppingListID: ShoppingListID;
  productID: ProductID;
  quantity: number;
}

export interface StoreCart {
  shoppingList?: ShoppingList;
  items: StoreCartItem[];
}

export interface StoreCartItem {
  item: ShoppingListItem;
  product: Product;
}

export class ShoppingListRepository {
  private readonly storeRepo = new StoreRepository();

  async getCartForStore(clientID: ClientID): Promise<StoreCart> {
    const cart = await this.getCart(clientID);
    const cartItems = await this.getShoppingListItems(
      clientID,
      cart.shoppingListID
    );

    const productItemsToRequest = cartItems!.map(async (sli) => ({
      item: sli,
      product: (await this.storeRepo.getProduct(sli.productID, sli.productID))!,
    }));

    const productItems = await Promise.all(productItemsToRequest);

    return {
      shoppingList: cart,
      items: productItems,
    };
  }

  async getCart(clientID: ClientID): Promise<ShoppingList> {
    let shoppingList = shoppingLists.findLast((sl) => sl.clientID === clientID);

    if (!shoppingList) {
      shoppingList = {
        shoppingListID: (shoppingLists.at(-1)?.shoppingListID ?? 0) + 1,
        clientID: clientID,
      };

      shoppingLists.push(shoppingList);
    }

    return shoppingList;
  }

  async addToCart(
    clientID: ClientID,
    productID: ProductID,
    quantity: number
  ): Promise<ShoppingListItem> {
    const cart = await this.getCart(clientID);

    let item = shoppingListItems.find(
      (sli) =>
        sli.shoppingListID === cart.shoppingListID &&
        sli.productID === productID
    );

    if (!item) {
      item = {
        shoppingListID: cart.shoppingListID,
        productID: productID,
        quantity: quantity,
      };

      shoppingListItems.push(item);
    } else {
      item.quantity += quantity;
    }

    return item;
  }

  async removeFromCart(
    clientID: ClientID,
    productID: ProductID,
    quantity: number
  ): Promise<ShoppingListItem> {
    const cart = await this.getCart(clientID);

    const item = shoppingListItems.find(
      (sli) =>
        sli.shoppingListID === cart.shoppingListID &&
        sli.productID === productID
    );

    if (!item) {
      return {
        shoppingListID: cart.shoppingListID,
        productID: productID,
        quantity: 0,
      };
    }

    item.quantity -= quantity;

    if (item.quantity <= 0) {
      item.quantity = 0;
    }

    return item;
  }

  async getShoppingLists(clientID: ClientID): Promise<ShoppingList[]> {
    const cart = await this.getCart(clientID);

    return shoppingLists.filter(
      (sl) => sl.clientID === clientID && sl !== cart
    );
  }

  async getShoppingList(
    clientID: ClientID,
    shoppingListID: ShoppingListID
  ): Promise<ShoppingList | null> {
    const shoppingList = shoppingLists.find(
      (sl) => sl.clientID === clientID && sl.shoppingListID === shoppingListID
    );

    return shoppingList ?? null;
  }

  async getShoppingListItems(
    clientID: ClientID,
    shoppingListID: ShoppingListID
  ): Promise<ShoppingListItem[] | null> {
    const shoppingList = await this.getShoppingList(clientID, shoppingListID);
    if (!shoppingList) return null;

    return shoppingListItems.filter(
      (sli) => sli.shoppingListID === shoppingListID
    );
  }
}

const shoppingLists: ShoppingList[] = [];
const shoppingListItems: ShoppingListItem[] = [];
