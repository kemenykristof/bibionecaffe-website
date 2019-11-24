import { createContext } from 'react';
import { Product, CartItem } from '../components/interfaces';

const context: {
  products: Product[];
  cart: CartItem[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: string) => void;
} = {
  products: [],
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {}
};

const StoreContext = createContext(context);

export const StoreProvider = StoreContext.Provider;
export const StoreConsumer = StoreContext.Consumer;
export default StoreContext;
