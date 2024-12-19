import type { ProductID, StoreID } from "~/domain/ID";
import type { Product, Store } from "~/domain/Store";

export class StoreRepository {
  private readonly storesStore = useStoresStore();
  private readonly productsStore = useProductsStore();
  private readonly profileStore = useMyProfileStore();

  constructor() {}

  async getNearbyStores(): Promise<Store[]> {
    return this.storesStore.$state;
  }

  async getStoreFromSlug(slug: string): Promise<Store | null> {
    const store = this.storesStore.$state.find(
      (s) => s.slug.toLowerCase() === slug.toLowerCase()
    );

    return store ?? null;
  }

  async getMyStore(): Promise<Store | null> {
    console.assert(
      this.profileStore.isLoggedIn,
      "O cliente precisa estar logado para pegar a loja"
    );

    const store = this.storesStore.$state.find(
      (s) => s.agentID === this.profileStore.client!.id
    );

    return store ?? null;
  }

  async getProduct(
    storeID: StoreID,
    productID: ProductID
  ): Promise<Product | null> {
    const product = this.productsStore.$state.find(
      (p) => p.id === productID && p.storeID === storeID
    );

    return product ?? null;
  }

  async getProducts(storeID: StoreID): Promise<Product[] | null> {
    if (this.storesStore.$state.some((store) => store.id === storeID)) {
      return this.productsStore.$state.filter(
        (product) => product.storeID === storeID
      );
    }

    return null;
  }
}
const useStoresStore = defineStore("db_store", {
  state: (): Store[] => [
    {
      id: 1,
      agentID: 0,
      name: "Tech World",
      description: "A loja perfeita para os amantes de tecnologia.",
      slug: "tech-world",
    },
    {
      id: 2,
      agentID: 0,
      name: "Fashion Hub",
      description: "Sua referência em moda e estilo.",
      slug: "fashion-hub",
    },
    {
      id: 3,
      agentID: 0,
      name: "Home Essentials",
      description: "Tudo o que você precisa para sua casa.",
      slug: "home-essentials",
    },
    {
      id: 4,
      agentID: 0,
      name: "Gourmet Market",
      description: "Os melhores produtos para sua cozinha gourmet.",
      slug: "gourmet-market",
    },
    {
      id: 5,
      agentID: 0,
      name: "Sports Planet",
      description: "O mundo dos esportes em um só lugar.",
      slug: "sports-planet",
    },
  ],
  persist: true,
});

const useProductsStore = defineStore("db_product", {
  state: (): Product[] => [
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
      imageUrl: "https://imgs.casasbahia.com.br/55066339/1g.jpg",
      price: 2599.99,
    },
    {
      id: 3,
      storeID: 1,
      name: "Wireless Headphones",
      imageUrl: "https://imgs.casasbahia.com.br/1564406861/1xg.jpg",
      price: 499.99,
    },
    {
      id: 4,
      storeID: 1,
      name: "Gaming Laptop",
      imageUrl: "https://imgs.casasbahia.com.br/55066981/1g.jpg",
      price: 6999.99,
    },
    {
      id: 5,
      storeID: 1,
      name: "Smart Watch Series X",
      imageUrl: "https://imgs.casasbahia.com.br/1570416836/1xg.jpg",
      price: 1299.99,
    },
    {
      id: 6,
      storeID: 1,
      name: "Bluetooth Speaker",
      imageUrl: "https://imgs.casasbahia.com.br/1546641038/1xg.jpg",
      price: 299.99,
    },
    {
      id: 7,
      storeID: 1,
      name: "Mechanical Keyboard",
      imageUrl:
        "https://www.pngitem.com/pimgs/m/50-509598_keyboard-png-clipart-mechanical-keyboard-transparent-png.png",
      price: 599.99,
    },
    {
      id: 8,
      storeID: 1,
      name: "4TB External SSD",
      imageUrl:
        "https://www.verbatim.com/includes/binary_details.php?id=8074&show=1",
      price: 999.99,
    },
    {
      id: 9,
      storeID: 1,
      name: "VR Headset",
      imageUrl:
        "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/42/2665972/1.jpg?1958",
      price: 1799.99,
    },
    {
      id: 10,
      storeID: 1,
      name: "Drone Explorer Pro",
      imageUrl:
        "https://www-cdn.djiits.com/cms/uploads/7f249c36fa1ed9ba68140f237f51a6b0.png",
      price: 2499.99,
    },
    {
      id: 11,
      storeID: 2,
      name: "Men's Casual Shirt",
      imageUrl:
        "https://m.media-amazon.com/images/I/710o1qQDaTL._AC_UF894,1000_QL80_.jpg",
      price: 129.99,
    },
    {
      id: 12,
      storeID: 2,
      name: "Women's Summer Dress",
      imageUrl:
        "https://m.media-amazon.com/images/I/71ZARINFaeL._AC_UY1000_.jpg",
      price: 199.99,
    },
    {
      id: 13,
      storeID: 2,
      name: "Leather Jacket",
      imageUrl:
        "https://jacketsquare.com/cdn/shop/files/93.png?v=1730364204&width=533",
      price: 399.99,
    },
    {
      id: 14,
      storeID: 2,
      name: "Running Shoes",
      imageUrl:
        "https://i5.walmartimages.com/seo/CAICJ98-Running-Shoes-Womens-Women-s-Knits-Oxfords-Classic-Lace-Up-Shoes-Square-Toe-Wingtip-Flats-Casual-Fall-Walking-Sneakers-Grey_24ec9823-47fd-4c60-941b-045dccc957ca.c3cc81df3ce151a8ce979a983fbd54ce.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
      price: 299.99,
    },
    {
      id: 15,
      storeID: 2,
      name: "Denim Jeans",
      imageUrl:
        "https://5.imimg.com/data5/SELLER/Default/2023/6/313423306/OX/CX/RI/40698162/henly-square-jeans-500x500.jpeg",
      price: 149.99,
    },
    {
      id: 16,
      storeID: 2,
      name: "Sports Cap",
      imageUrl:
        "https://1010discs.com/media/amasty/amoptmobile/catalog/product/cache/1ad030623c78fed62b64a171a6facda6/i/d/id1b8754_jpg.webp",
      price: 49.99,
    },
    {
      id: 17,
      storeID: 2,
      name: "Silk Scarf",
      imageUrl:
        "https://ae01.alicdn.com/kf/S29aa3ecdfe2c46b2ad4a9ef772653aa7u/Hem-Silk-Scarf-Luxury-Brand-Designer-Brand-Women-Summer-Shawl-Square-Bag-Bandana-110CM-Mulberry-Rolling.jpg",
      price: 89.99,
    },
    {
      id: 18,
      storeID: 2,
      name: "Luxury Handbag",
      imageUrl:
        "https://image.made-in-china.com/2f0j00HLukbDPqHlgy/Luxury-Handbag-Square-Bag-Brand-Women-s-Bag-Lady-Bag.webp",
      price: 1299.99,
    },
    {
      id: 19,
      storeID: 2,
      name: "Sunglasses Classic",
      imageUrl:
        "https://ae01.alicdn.com/kf/S053c730c059d4b2096998c2057c62e94q.jpg",
      price: 199.99,
    },
    {
      id: 20,
      storeID: 2,
      name: "Designer Belt",
      imageUrl:
        "https://www.buttonsparadise.com/5808-thickbox_default/design-belt-woman-square-mixi-pop-red.jpg",
      price: 149.99,
    },
    {
      id: 21,
      storeID: 3,
      name: "Non-stick Cookware Set",
      imageUrl: "https://m.media-amazon.com/images/I/81nHNaPJMAL.jpg",
      price: 349.99,
    },
    {
      id: 22,
      storeID: 3,
      name: "Memory Foam Mattress",
      imageUrl: "https://m.media-amazon.com/images/I/818thzUWDyL.jpg",
      price: 1299.99,
    },
    {
      id: 23,
      storeID: 3,
      name: "Robot Vacuum Cleaner",
      imageUrl:
        "https://cdn.mall.adeptmind.ai/https%3A%2F%2Fmultimedia.bbycastatic.ca%2Fmultimedia%2Fproducts%2F500x500%2F172%2F17211%2F17211478.jpg_large.webp",
      price: 1999.99,
    },
    {
      id: 24,
      storeID: 3,
      name: "Air Fryer XL",
      imageUrl: "https://m.media-amazon.com/images/I/61w2qlLKiwL.jpg",
      price: 499.99,
    },
    {
      id: 25,
      storeID: 3,
      name: "Double Door Refrigerator",
      imageUrl:
        "https://www.shutterstock.com/image-vector/stainless-steel-double-door-refrigerator-600nw-2171778115.jpg",
      price: 2999.99,
    },
    {
      id: 26,
      storeID: 3,
      name: "Queen Bed Frame",
      imageUrl:
        "https://ak1.ostkcdn.com/images/products/is/images/direct/87aeda8dbf0f2b30d98ae22d9d4e94b561abb5a0/Metal-Platform-Bed-Frame-with-Diamond-Stitched-Square-Headboard.jpg",
      price: 899.99,
    },
    {
      id: 27,
      storeID: 3,
      name: "Blender Pro 5000",
      imageUrl: "https://m.media-amazon.com/images/I/61ih08G+kWL.jpg",
      price: 299.99,
    },
    {
      id: 28,
      storeID: 3,
      name: "Home Theater System",
      imageUrl:
        "https://images.jdmagicbox.com/quickquotes/images_main/zebronics_5_1_multimedia_speaker_zeb_bt6790rucf__11256277_0.jpg",
      price: 1799.99,
    },
    {
      id: 29,
      storeID: 3,
      name: "Scented Candle Set",
      imageUrl:
        "https://wickbond.com/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-13-at-3.24.29-PM.jpeg",
      price: 99.99,
    },
    {
      id: 30,
      storeID: 3,
      name: "Modern Dining Table",
      imageUrl:
        "https://www.vikinterio.com/product-images/VIKSP001.jpg/473239000004874118/900x900",
      price: 2499.99,
    },
    {
      id: 31,
      storeID: 4,
      name: "Artisan Cheese Selection",
      imageUrl:
        "https://orders.booths.co.uk/media/catalog/product/cache/59b906c9f4a6503cc9c6cc39e925f9a1/2/7/274-artisan-4-piece-british-cheese-selection.jpg",
      price: 199.99,
    },
    {
      id: 32,
      storeID: 4,
      name: "Organic Olive Oil",
      imageUrl:
        "https://chefshop.com/GetImage.ashx?Path=%7E%2FAssets%2FProductImages%2FBoni-Mores-Organic-Semidana-Sardinian-Olive-Oil-Square-Bottle.jpg&maintainAspectRatio=true&maxHeight=480&maxWidth=480",
      price: 99.99,
    },
    {
      id: 33,
      storeID: 4,
      name: "Italian Pasta Kit",
      imageUrl: "https://m.media-amazon.com/images/I/71Si61eshcL.jpg",
      price: 129.99,
    },
    {
      id: 34,
      storeID: 4,
      name: "Gourmet Coffee Beans",
      imageUrl:
        "https://coffeebros.com/cdn/shop/articles/the-10-best-espresso-roast-coffees-for-specialty-coffee-lovers.jpg?v=1667044851",
      price: 79.99,
    },
    {
      id: 35,
      storeID: 4,
      name: "Belgian Chocolate Box",
      imageUrl:
        "https://leonidasbrighton.co.uk/cdn/shop/files/Untitleddesign_76.png?v=1729684611&width=1445",
      price: 149.99,
    },
    {
      id: 36,
      storeID: 4,
      name: "Premium Meat Basket",
      imageUrl:
        "https://www.kenricks.com/wp-content/uploads/2017/08/basket-gourment-1.jpg",
      price: 399.99,
    },
    {
      id: 37,
      storeID: 4,
      name: "Imported Spices Set",
      imageUrl: "https://m.media-amazon.com/images/I/71jz0hYszoS.jpg",
      price: 179.99,
    },
    {
      id: 38,
      storeID: 4,
      name: "Luxury Wine Duo",
      imageUrl:
        "https://www.bottledandboxed.com/images/products/Luxury-Classic-Wine-Duo-Gift-Box.jpg",
      price: 299.99,
    },
    {
      id: 39,
      storeID: 4,
      name: "French Macarons Box",
      imageUrl:
        "https://millyspatisserie.co.uk/wp-content/uploads/2021/05/Square-Standard-Box-.png",
      price: 89.99,
    },
    {
      id: 40,
      storeID: 4,
      name: "Caviar Premium Pack",
      imageUrl:
        "https://caviarmarketnyc.com/cdn/shop/files/IMG_1116square.jpg?v=1725482880&width=1445",
      price: 499.99,
    },
    {
      id: 41,
      storeID: 5,
      name: "Football Pro",
      imageUrl:
        "https://memorabiliadisplays.com/cdn/shop/products/82204-UV.jpg?v=1552106844",
      price: 299.99,
    },
    {
      id: 42,
      storeID: 5,
      name: "Tennis Racket",
      imageUrl: "https://m.media-amazon.com/images/I/41w1RIguWzL.jpg",
      price: 499.99,
    },
    {
      id: 43,
      storeID: 5,
      name: "Yoga Mat Deluxe",
      imageUrl:
        "https://cdn.americanfloormats.com/content/product/large/Deluxe-color-pyramid.jpg",
      price: 199.99,
    },
    {
      id: 44,
      storeID: 5,
      name: "Mountain Bike",
      imageUrl:
        "https://www.newleccycles.com/images/products/c/cs/csm_ghost-bikes-square-cross-base-u-90_54797ac397.png?width=1998&height=1998&quality=85&mode=pad&format=webp&bgcolor=ffffff",
      price: 2999.99,
    },
    {
      id: 45,
      storeID: 5,
      name: "Running Treadmill",
      imageUrl:
        "https://cdn11.bigcommerce.com/s-gok9a/images/stencil/1280x1280/products/1027/1802/trueform-runner_2__71839.1612275032_1__39229.1634915250.jpg?c=2?imbypass=on",
      price: 3999.99,
    },
    {
      id: 46,
      storeID: 5,
      name: "Boxing Gloves Set",
      imageUrl:
        "https://medias.collectorsquare.com/images/products/412541/00pp-louis-vuitton-karl-lagerfeld-pair-of-boxing-gloves-collection-2014-hs-code-4203210000.jpg",
      price: 149.99,
    },
    {
      id: 47,
      storeID: 5,
      name: "Sports Water Bottle",
      imageUrl: "https://m.media-amazon.com/images/I/41c3M1xfEoL.jpg",
      price: 59.99,
    },
    {
      id: 48,
      storeID: 5,
      name: "Weightlifting Set",
      imageUrl:
        "https://image.made-in-china.com/226f3j00jZmhQyYRbqrG/Home-Gym-Fitness-1-5kg-Adjustable-Weight-ABS-Square-Dumbbell-Set.webp",
      price: 699.99,
    },
    {
      id: 49,
      storeID: 5,
      name: "Hiking Boots",
      imageUrl:
        "https://s7d5.scene7.com/is/image/PetsUnited/TE022001?wid=328&hei=328&fmt=webp&qlt=75,0&op_sharpen=0&resMode=sharp2&op_usm=0.9,1.0,6,0&iccEmbed=0",
      price: 499.99,
    },
    {
      id: 50,
      storeID: 5,
      name: "Badminton Kit",
      imageUrl: "https://m.media-amazon.com/images/I/71TJ3DmzAaL.jpg",
      price: 299.99,
    },
  ],
  persist: true,
});
