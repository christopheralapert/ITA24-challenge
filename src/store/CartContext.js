import { createContext, useState } from 'react';

const CartContext = createContext({
  items: [],
  addItem: () => {},
});

export const CartContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);

      if (existingItemIndex === -1) {
        return [...prevItems, { ...item, quantity: 1 }];
      }

      const updatedItems = [...prevItems];
      const existingItem = updatedItems[existingItemIndex];

      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      return updatedItems;
    });
  };

  const cartContext = {
    items,
    addItem,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartContext;