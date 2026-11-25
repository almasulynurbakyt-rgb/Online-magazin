import React, { createContext, useContext, useState } from 'react';

export type ProductItem = {
  id: string;
  name: string;
  weight: string;
  price: number;
  imageUri: string;
  section: 'exclusive' | 'best' | 'groceries' | 'beverages' | 'pantry';
  category: string;
  brand: string;
  description: string;
  nutrition: string;
};

export type CartEntry = {
  product: ProductItem;
  qty: number;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignIn: undefined;
  NumberInput:
    | { country?: { code: string; name: string; dialCode: string; flag: string } }
    | undefined;
  Verification: { fullPhone?: string } | undefined;
  SelectLocation: { userName?: string } | undefined;
  Login: undefined;
  SignUp: undefined;
  Home: { userName?: string; location?: string } | undefined;
  ProductDetail: { product: ProductItem };
  Explore: undefined;
  Beverages: { initialCategory?: string } | undefined;
  Search: { initialQuery?: string; initialCategory?: string } | undefined;
  Cart: undefined;
  Favorites: undefined;
  Account: undefined;
  AccountDetail: { section: string };
};

export const ALL_PRODUCTS: ProductItem[] = [
  {
    id: 'banana',
    name: 'Органикалық банандар',
    weight: '7 дана, Бағасы',
    price: 4.99,
    imageUri: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=600',
    section: 'exclusive',
    category: 'Жаңа піскен жемістер мен көкөністер',
    brand: 'Жеке топтама',
    description:
      'Банан өте қоректік, тәтті және күнделікті сергектік пен қуат беретін тамаша тағам.',
    nutrition: '100 гр',
  },
  {
    id: 'red-apple',
    name: 'Табиғи қызыл алма',
    weight: '1 кг, Бағасы',
    price: 4.99,
    imageUri: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=600',
    section: 'exclusive',
    category: 'Жаңа піскен жемістер мен көкөністер',
    brand: 'Cocola',
    description:
      'Алма өте пайдалы. Салмақты реттеуге және жүрек саулығына жақсы әсер етеді.',
    nutrition: '100 гр',
  },
  {
    id: 'bell-pepper',
    name: 'Қызыл тәтті бұрыш',
    weight: '1 кг, Бағасы',
    price: 4.99,
    imageUri: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=600',
    section: 'best',
    category: 'Жаңа піскен жемістер мен көкөністер',
    brand: 'Kazi Farmas',
    description:
      'С дәруменіне бай шырынды қызыл бұрыш салаттар мен ыстық тағамдарға өте үйлеседі.',
    nutrition: '100 гр',
  },
  {
    id: 'ginger',
    name: 'Зімбір (Имбирь)',
    weight: '250 гр, Бағасы',
    price: 2.99,
    imageUri: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600',
    section: 'best',
    category: 'Жаңа піскен жемістер мен көкөністер',
    brand: 'Ifad',
    description: 'Хош иісті жас зімбір тамыры шайға, тұздықтар мен маринадтарға таптырмас.',
    nutrition: '100 гр',
  },
  {
    id: 'beef-bone',
    name: 'Сиыр сүйегі',
    weight: '1 кг, Бағасы',
    price: 4.99,
    imageUri: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=600',
    section: 'groceries',
    category: 'Ет және балық',
    brand: 'Kazi Farmas',
    description: 'Қою сорпа мен баяу пісетін тағамдарға арналған таңдаулы сиыр сүйегі.',
    nutrition: '100 гр',
  },
  {
    id: 'broiler-chicken',
    name: 'Бройлер тауық еті',
    weight: '1 кг, Бағасы',
    price: 4.99,
    imageUri: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=600',
    section: 'groceries',
    category: 'Ет және балық',
    brand: 'Kazi Farmas',
    description: 'Жас әрі жұмсақ тауық еті күнделікті түскі және кешкі асқа дайын.',
    nutrition: '100 гр',
  },
  {
    id: 'salmon-fillet',
    name: 'Лосось филесі',
    weight: '500 гр, Бағасы',
    price: 11.99,
    imageUri: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600',
    section: 'groceries',
    category: 'Ет және балық',
    brand: 'Ifad',
    description: 'Омега-3-ке бай жас лосось балығының филесі.',
    nutrition: '100 гр',
  },
  {
    id: 'diet-coke',
    name: 'Diet Coke',
    weight: '355 мл, Бағасы',
    price: 1.99,
    imageUri: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600',
    section: 'beverages',
    category: 'Сусындар',
    brand: 'Cocola',
    description: 'Қантсыз сергітетін салқын кола сусыны.',
    nutrition: '355 мл',
  },
  {
    id: 'sprite-can',
    name: 'Sprite құтыда',
    weight: '325 мл, Бағасы',
    price: 1.5,
    imageUri: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=600',
    section: 'beverages',
    category: 'Сусындар',
    brand: 'Cocola',
    description: 'Лимон-лайм дәмі бар газды салқын сусын.',
    nutrition: '325 мл',
  },
  {
    id: 'apple-grape-juice',
    name: 'Алма және жүзім шырыны',
    weight: '2 л, Бағасы',
    price: 15.99,
    imageUri: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=600',
    section: 'beverages',
    category: 'Сусындар',
    brand: 'Ifad',
    description: 'Алма мен жүзімнен жасалған 2 литрлік отбасылық шырын.',
    nutrition: '200 мл',
  },
  {
    id: 'orange-juice',
    name: 'Апельсин шырыны',
    weight: '2 л, Бағасы',
    price: 15.99,
    imageUri: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=600',
    section: 'beverages',
    category: 'Сусындар',
    brand: 'Ifad',
    description: 'Цитрус дәмі қанық сергітетін апельсин шырыны.',
    nutrition: '200 мл',
  },
  {
    id: 'coca-cola-can',
    name: 'Coca-Cola құтыда',
    weight: '325 мл, Бағасы',
    price: 4.99,
    imageUri: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=600',
    section: 'beverages',
    category: 'Сусындар',
    brand: 'Cocola',
    description: 'Классикалық Coca-Cola сусыны.',
    nutrition: '325 мл',
  },
  {
    id: 'pepsi-can',
    name: 'Pepsi құтыда',
    weight: '330 мл, Бағасы',
    price: 4.99,
    imageUri: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=600',
    section: 'beverages',
    category: 'Сусындар',
    brand: 'Cocola',
    description: '330 мл құтыдағы сергітетін Pepsi сусыны.',
    nutrition: '330 мл',
  },
  {
    id: 'egg-chicken-red',
    name: 'Қоңыр тауық жұмыртқасы',
    weight: '4 дана, Бағасы',
    price: 1.99,
    imageUri: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=600',
    section: 'pantry',
    category: 'Сүт өнімдері және жұмыртқа',
    brand: 'Kazi Farmas',
    description: 'Таңғы ас пен пісірмелерге арналған жас фермерлік жұмыртқа.',
    nutrition: '100 гр',
  },
  {
    id: 'egg-chicken-white',
    name: 'Ақ тауық жұмыртқасы',
    weight: '180 гр, Бағасы',
    price: 1.5,
    imageUri: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=600',
    section: 'pantry',
    category: 'Сүт өнімдері және жұмыртқа',
    brand: 'Жеке топтама',
    description: 'Күнделікті ас үйге арналған жас ақ жұмыртқа.',
    nutrition: '100 гр',
  },
];

type StoreContextType = {
  cart: Record<string, CartEntry>;
  favorites: string[];
  addToCart: (product: ProductItem, qty?: number) => void;
  updateQty: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  addAllFavoritesToCart: () => void;
  checkout: () => void;
};

const StoreContext = createContext<StoreContextType>({
  cart: {},
  favorites: [],
  addToCart: () => {},
  updateQty: () => {},
  removeFromCart: () => {},
  toggleFavorite: () => {},
  addAllFavoritesToCart: () => {},
  checkout: () => {},
});

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Record<string, CartEntry>>({
    'bell-pepper': { product: ALL_PRODUCTS[2], qty: 1 },
    'beef-bone': { product: ALL_PRODUCTS[4], qty: 1 },
    banana: { product: ALL_PRODUCTS[0], qty: 1 },
    ginger: { product: ALL_PRODUCTS[3], qty: 1 },
  });

  const [favorites, setFavorites] = useState<string[]>([
    'sprite-can',
    'diet-coke',
    'apple-grape-juice',
    'coca-cola-can',
    'pepsi-can',
  ]);

  const addToCart = (product: ProductItem, qty = 1) => {
    setCart((prev) => {
      const existing = prev[product.id];
      return {
        ...prev,
        [product.id]: { product, qty: (existing ? existing.qty : 0) + qty },
      };
    });
  };

  const updateQty = (productId: string, delta: number) => {
    setCart((prev) => {
      const existing = prev[productId];
      if (!existing) return prev;
      const nextQty = existing.qty + delta;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: { ...existing, qty: nextQty } };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addAllFavoritesToCart = () => {
    setCart((prev) => {
      const next = { ...prev };
      favorites.forEach((id) => {
        const item = ALL_PRODUCTS.find((p) => p.id === id);
        if (item) {
          const existing = next[id];
          next[id] = { product: item, qty: (existing ? existing.qty : 0) + 1 };
        }
      });
      return next;
    });
  };

  const checkout = () => setCart({});

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        updateQty,
        removeFromCart,
        toggleFavorite,
        addAllFavoritesToCart,
        checkout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);