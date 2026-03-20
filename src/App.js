import { useReducer, useState } from 'react';
import Header from './components/Header';
import Meals from './components/Meals';
import CartContext from './store/CartContext';
import Modal from './components/UI/Modal';
import Button from './components/UI/Button';

const defaultCartState = {
  items: [],
};

const currencyFormatter = new Intl.NumberFormat('et-EE', {
  style: 'currency',
  currency: 'EUR',
});

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

  if (action.type === 'CLEAR_CART') {
    return {
      ...state,
      items: [],
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
    if (cartState.items.length > 0) {
      setCartIsShown(true);
    }
  };

  const handleHideCart = () => {
    setCartIsShown(false);
  };

  const handleClearCart = () => {
    cartDispatch({ type: 'CLEAR_CART' });
  };

  const handleCheckout = () => {
    alert('Tellimus on vastu voetud. Aitah!');
    handleClearCart();
    handleHideCart();
  };

  const cartTotal = cartState.items.reduce((totalPrice, item) => {
    return totalPrice + Number(item.price) * item.quantity;
  }, 0);

  const cartContext = {
    items: cartState.items,
    addItem: handleAddItemToCart,
    clearCart: handleClearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      <Modal open={cartIsShown}>
        <div className="cart">
          <h2>Your cart</h2>
          <ul>
            {cartState.items.map((item) => (
              <li key={item.id} className="cart-item">
                <p>
                  {item.name} - {item.quantity}
                </p>
              </li>
            ))}
          </ul>
          <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
          <p className="modal-actions">
            <Button textOnly onClick={handleHideCart}>Close</Button>
            <Button onClick={handleCheckout}>Checkout</Button>
          </p>
        </div>
      </Modal>
      <Header onShowCart={handleShowCart} />
      <Meals />
    </CartContext.Provider>
  );
};

export default App;
