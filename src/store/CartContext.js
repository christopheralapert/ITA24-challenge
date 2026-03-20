import { createContext } from 'react';

const CartContext = createContext({
  items: [],
  addItem: () => {},
  clearCart: () => {},
});

export default CartContext;