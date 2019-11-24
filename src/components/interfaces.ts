export type ProductTypes = 'Pizza' | 'HealthyFood' | 'Beverage' | 'FoodItem';

type Extras = {};

export type Product = {
  id: string;
  type: ProductTypes;
  name: string;
  price: number;
  amount?: string;
  details?: string;
  calories?: number;
  carbs?: number;
  fat?: number;
  garnish?: string;
  toppings?: string[];
  sauce?: string[];
  pizza_size?: string;
  extras?: Extras[];
  addProductToCart?: (product: Product) => void;
};

export type CartItem = {
  id: string;
  type: ProductTypes;
  name: string;
  price: number;
  quantity: number;
  garnish?: string;
  toppings?: string[];
  sauce?: string[];
  addProductToCart?: (product: Product) => void;
};
