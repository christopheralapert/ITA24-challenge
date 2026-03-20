import { useReducer, useState } from 'react';
import Header from './components/Header';
import Meals from './components/Meals';
import CartContext from './store/CartContext';
import Modal from './components/UI/Modal';
import Button from './components/UI/Button';

const defaultCartState = {
  items: [],
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    const updatedItems = [...state.items];

    if (existingItemIndex > -1) {
      const existingItem = updatedItems[existingItemIndex];

      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
    } else {
      updatedItems.push({
        ...action.item,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  return defaultCartState;
};

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartState);

  const handleAddItemToCart = (item) => {
    cartDispatch({ type: 'ADD_ITEM', item });
  };

  const handleShowCart = () => {
    setCartIsShown(true);
  };

  const handleHideCart = () => {
    setCartIsShown(false);
  };

  const cartContext = {
    items: cartState.items,
    addItem: handleAddItemToCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      <Modal open={cartIsShown}>
        <p>Test</p>
        <p className="modal-actions">
          <Button textOnly onClick={handleHideCart}>Close</Button>
        </p>
      </Modal>
      <Header onShowCart={handleShowCart} />
      <Meals />
    </CartContext.Provider>
  );
};

export default App;
