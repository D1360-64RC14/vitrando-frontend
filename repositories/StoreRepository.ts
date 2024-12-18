import type { ProductID, StoreID } from "~/domain/ID";
import type { Product, Store } from "~/domain/Store";

export interface StoreNearbyStore {
  stores?: StorenearbyStoreProducts[];
}

export interface StorenearbyStoreProducts {
  store: Store;
  products: Product[];
}

export class StoreRepository {
  constructor() {}

  async getNearbyStoresForStore(): Promise<StorenearbyStoreProducts[]> {
    const stores = await this.getNearbyStores();

    const storeProductsToRequest = stores.map(async (s) => ({
      store: s,
      products: (await this.getProducts(s.id))!,
    }));

    return await Promise.all(storeProductsToRequest);
  }

  async getNearbyStores(): Promise<Store[]> {
    return stores;
  }

  async getStoreFromSlug(slug: string): Promise<Store | null> {
    const store = stores.find(
      (s) => s.slug.toLowerCase() === slug.toLowerCase()
    );

    return store ?? null;
  }

  async getProduct(
    storeID: StoreID,
    productID: ProductID
  ): Promise<Product | null> {
    const product = products.find(
      (p) => p.id === productID && p.storeID === storeID
    );

    return product ?? null;
  }

  async getProducts(storeID: StoreID): Promise<Product[] | null> {
    if (stores.some((store) => store.id === storeID)) {
      return products.filter((product) => product.storeID === storeID);
    }

    return null;
  }
}
const stores: Store[] = [
  {
    id: 1,
    name: "Tech World",
    description: "A loja perfeita para os amantes de tecnologia.",
    slug: "tech-world",
  },
  {
    id: 2,
    name: "Fashion Hub",
    description: "Sua referência em moda e estilo.",
    slug: "fashion-hub",
  },
  {
    id: 3,
    name: "Home Essentials",
    description: "Tudo o que você precisa para sua casa.",
    slug: "home-essentials",
  },
  {
    id: 4,
    name: "Gourmet Market",
    description: "Os melhores produtos para sua cozinha gourmet.",
    slug: "gourmet-market",
  },
  {
    id: 5,
    name: "Sports Planet",
    description: "O mundo dos esportes em um só lugar.",
    slug: "sports-planet",
  },
];

const products: Product[] = [
  {
    id: 1,
    storeID: 1,
    name: "Smartphone Pro Max",
    imageUrl:
      "https://reidocelular.com.br/wp-content/uploads/2024/09/Sem-2024-11-09T060332.311.png",
    price: 3999.99,
  },
  {
    id: 2,
    storeID: 1,
    name: "Ultra HD 4K TV",
    imageUrl:
      "https://a-static.mlcdn.com.br/800x560/smart-tv-65-ultra-hd-4k-led-lg-65up7550-60hz-wi-fi-e-bluetooth-alexa-2-hdmi-1-usb/magazineluiza/228863700/dbdc8056ba89ef2f7642c0d1a409b981.jpg",
    price: 2599.99,
  },
  {
    id: 3,
    storeID: 1,
    name: "Wireless Headphones",
    imageUrl:
      "https://media.wired.com/photos/66abec9ccb172c2e5de763bf/master/w_960,c_limit/Edifier-Stax-Spirit-S5-Headphones-Offwhite-Background-SOURCE-Amazon.jpg",
    price: 499.99,
  },
  {
    id: 4,
    storeID: 1,
    name: "Gaming Laptop",
    imageUrl: "https://example.com/techworld/laptop.jpg",
    price: 6999.99,
  },
  {
    id: 5,
    storeID: 1,
    name: "Smart Watch Series X",
    imageUrl: "https://example.com/techworld/smartwatch.jpg",
    price: 1299.99,
  },
  {
    id: 6,
    storeID: 1,
    name: "Bluetooth Speaker",
    imageUrl: "https://example.com/techworld/speaker.jpg",
    price: 299.99,
  },
  {
    id: 7,
    storeID: 1,
    name: "Mechanical Keyboard",
    imageUrl: "https://example.com/techworld/keyboard.jpg",
    price: 599.99,
  },
  {
    id: 8,
    storeID: 1,
    name: "4TB External SSD",
    imageUrl: "https://example.com/techworld/ssd.jpg",
    price: 999.99,
  },
  {
    id: 9,
    storeID: 1,
    name: "VR Headset",
    imageUrl: "https://example.com/techworld/vr.jpg",
    price: 1799.99,
  },
  {
    id: 10,
    storeID: 1,
    name: "Drone Explorer Pro",
    imageUrl: "https://example.com/techworld/drone.jpg",
    price: 2499.99,
  },
  {
    id: 11,
    storeID: 2,
    name: "Men's Casual Shirt",
    imageUrl: "https://example.com/fashionhub/shirt.jpg",
    price: 129.99,
  },
  {
    id: 12,
    storeID: 2,
    name: "Women's Summer Dress",
    imageUrl: "https://example.com/fashionhub/dress.jpg",
    price: 199.99,
  },
  {
    id: 13,
    storeID: 2,
    name: "Leather Jacket",
    imageUrl: "https://example.com/fashionhub/jacket.jpg",
    price: 399.99,
  },
  {
    id: 14,
    storeID: 2,
    name: "Running Shoes",
    imageUrl: "https://example.com/fashionhub/shoes.jpg",
    price: 299.99,
  },
  {
    id: 15,
    storeID: 2,
    name: "Denim Jeans",
    imageUrl: "https://example.com/fashionhub/jeans.jpg",
    price: 149.99,
  },
  {
    id: 16,
    storeID: 2,
    name: "Sports Cap",
    imageUrl: "https://example.com/fashionhub/cap.jpg",
    price: 49.99,
  },
  {
    id: 17,
    storeID: 2,
    name: "Silk Scarf",
    imageUrl: "https://example.com/fashionhub/scarf.jpg",
    price: 89.99,
  },
  {
    id: 18,
    storeID: 2,
    name: "Luxury Handbag",
    imageUrl: "https://example.com/fashionhub/handbag.jpg",
    price: 1299.99,
  },
  {
    id: 19,
    storeID: 2,
    name: "Sunglasses Classic",
    imageUrl: "https://example.com/fashionhub/sunglasses.jpg",
    price: 199.99,
  },
  {
    id: 20,
    storeID: 2,
    name: "Designer Belt",
    imageUrl: "https://example.com/fashionhub/belt.jpg",
    price: 149.99,
  },
  {
    id: 21,
    storeID: 3,
    name: "Non-stick Cookware Set",
    imageUrl: "https://example.com/homeessentials/cookware.jpg",
    price: 349.99,
  },
  {
    id: 22,
    storeID: 3,
    name: "Memory Foam Mattress",
    imageUrl: "https://example.com/homeessentials/mattress.jpg",
    price: 1299.99,
  },
  {
    id: 23,
    storeID: 3,
    name: "Robot Vacuum Cleaner",
    imageUrl: "https://example.com/homeessentials/vacuum.jpg",
    price: 1999.99,
  },
  {
    id: 24,
    storeID: 3,
    name: "Air Fryer XL",
    imageUrl: "https://example.com/homeessentials/airfryer.jpg",
    price: 499.99,
  },
  {
    id: 25,
    storeID: 3,
    name: "Double Door Refrigerator",
    imageUrl: "https://example.com/homeessentials/fridge.jpg",
    price: 2999.99,
  },
  {
    id: 26,
    storeID: 3,
    name: "Queen Bed Frame",
    imageUrl: "https://example.com/homeessentials/bed.jpg",
    price: 899.99,
  },
  {
    id: 27,
    storeID: 3,
    name: "Blender Pro 5000",
    imageUrl: "https://example.com/homeessentials/blender.jpg",
    price: 299.99,
  },
  {
    id: 28,
    storeID: 3,
    name: "Home Theater System",
    imageUrl: "https://example.com/homeessentials/hometheater.jpg",
    price: 1799.99,
  },
  {
    id: 29,
    storeID: 3,
    name: "Scented Candle Set",
    imageUrl: "https://example.com/homeessentials/candles.jpg",
    price: 99.99,
  },
  {
    id: 30,
    storeID: 3,
    name: "Modern Dining Table",
    imageUrl: "https://example.com/homeessentials/table.jpg",
    price: 2499.99,
  },
  {
    id: 31,
    storeID: 4,
    name: "Artisan Cheese Selection",
    imageUrl: "https://example.com/gourmetmarket/cheese.jpg",
    price: 199.99,
  },
  {
    id: 32,
    storeID: 4,
    name: "Organic Olive Oil",
    imageUrl: "https://example.com/gourmetmarket/oliveoil.jpg",
    price: 99.99,
  },
  {
    id: 33,
    storeID: 4,
    name: "Italian Pasta Kit",
    imageUrl: "https://example.com/gourmetmarket/pasta.jpg",
    price: 129.99,
  },
  {
    id: 34,
    storeID: 4,
    name: "Gourmet Coffee Beans",
    imageUrl: "https://example.com/gourmetmarket/coffee.jpg",
    price: 79.99,
  },
  {
    id: 35,
    storeID: 4,
    name: "Belgian Chocolate Box",
    imageUrl: "https://example.com/gourmetmarket/chocolates.jpg",
    price: 149.99,
  },
  {
    id: 36,
    storeID: 4,
    name: "Premium Meat Basket",
    imageUrl: "https://example.com/gourmetmarket/meat.jpg",
    price: 399.99,
  },
  {
    id: 37,
    storeID: 4,
    name: "Imported Spices Set",
    imageUrl: "https://example.com/gourmetmarket/spices.jpg",
    price: 179.99,
  },
  {
    id: 38,
    storeID: 4,
    name: "Luxury Wine Duo",
    imageUrl: "https://example.com/gourmetmarket/wine.jpg",
    price: 299.99,
  },
  {
    id: 39,
    storeID: 4,
    name: "French Macarons Box",
    imageUrl: "https://example.com/gourmetmarket/macarons.jpg",
    price: 89.99,
  },
  {
    id: 40,
    storeID: 4,
    name: "Caviar Premium Pack",
    imageUrl: "https://example.com/gourmetmarket/caviar.jpg",
    price: 499.99,
  },
  {
    id: 41,
    storeID: 5,
    name: "Football Pro",
    imageUrl: "https://example.com/sportsplanet/football.jpg",
    price: 299.99,
  },
  {
    id: 42,
    storeID: 5,
    name: "Tennis Racket",
    imageUrl: "https://example.com/sportsplanet/racket.jpg",
    price: 499.99,
  },
  {
    id: 43,
    storeID: 5,
    name: "Yoga Mat Deluxe",
    imageUrl: "https://example.com/sportsplanet/yogamat.jpg",
    price: 199.99,
  },
  {
    id: 44,
    storeID: 5,
    name: "Mountain Bike",
    imageUrl: "https://example.com/sportsplanet/bike.jpg",
    price: 2999.99,
  },
  {
    id: 45,
    storeID: 5,
    name: "Running Treadmill",
    imageUrl: "https://example.com/sportsplanet/treadmill.jpg",
    price: 3999.99,
  },
  {
    id: 46,
    storeID: 5,
    name: "Boxing Gloves Set",
    imageUrl: "https://example.com/sportsplanet/gloves.jpg",
    price: 149.99,
  },
  {
    id: 47,
    storeID: 5,
    name: "Sports Water Bottle",
    imageUrl: "https://example.com/sportsplanet/bottle.jpg",
    price: 59.99,
  },
  {
    id: 48,
    storeID: 5,
    name: "Weightlifting Set",
    imageUrl: "https://example.com/sportsplanet/weights.jpg",
    price: 699.99,
  },
  {
    id: 49,
    storeID: 5,
    name: "Hiking Boots",
    imageUrl: "https://example.com/sportsplanet/boots.jpg",
    price: 499.99,
  },
  {
    id: 50,
    storeID: 5,
    name: "Badminton Kit",
    imageUrl: "https://example.com/sportsplanet/badminton.jpg",
    price: 299.99,
  },
];
