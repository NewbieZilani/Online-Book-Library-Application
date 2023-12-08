import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    setCartCount((prevCartCount) => prevCartCount + 1);
    setCartItems((prevCartItems) => [...prevCartItems, book]);
  };

  const removeFromCart = (bookToRemove) => {
    setCartCount((prevCartCount) => prevCartCount - 1);
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.bookId !== bookToRemove.bookId)
    );
  };
  console.log("the count is : ", cartCount);

  return (
    <CartContext.Provider
      value={{ cartCount, addToCart, cartItems, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
