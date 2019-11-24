import React, { useEffect, useState } from "react";
import { StoreProvider } from "./StoreContext";
import { Product, CartItem } from "../components/interfaces";

export default function StoreState(props: any) {
  const [products, setProducts]: [Product[], any] = useState([]);
  const [cart, setCartItems] = useState<CartItem[]>(() => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchProducts = async () => {
    const data = await fetch(
      "https://api.cognityv.com/open/bibione/get_products"
    );
    const result = await data.json();
    setProducts(result);
    const items: any = window.localStorage.getItem("cart");
    try {
      const localItems: any = JSON.parse(items);
      if (localItems === null) {
        return;
      }
      setCartItems(localItems);
    } catch (error) {}
  };

  const addProductToCart = (product: Product) => {
    console.log("Adding product", product, cart);
    const updatedCart: CartItem[] = [...cart];

    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === product.id
    );

    if (updatedItemIndex < 0) {
      updatedCart.push({ ...product, quantity: 1 });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem.quantity++;

      updatedCart[updatedItemIndex] = updatedItem;
    }

    setCartItems(updatedCart);
  };

  const removeProductFromCart = (productId: string) => {
    console.log("Removing product with id: " + productId);
    const updatedCart = [...cart];

    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === productId
    );

    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedCart[updatedItemIndex] = updatedItem;
    }
    setCartItems(updatedCart);
  };

  return (
    <StoreProvider
      value={{
        products: products,
        cart: cart,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart
      }}
    >
      {props.children}
    </StoreProvider>
  );
}
