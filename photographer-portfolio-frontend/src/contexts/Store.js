import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      //check if item is already in cart
      const newItem = action.payload.id;
      const isInCart = state.cart.cartItems.find((id) => {
        return id === action.payload.id;
      });

      //if not in cart then create new item
      if (isInCart === undefined) {
        return {
          ...state,
          cart: {
            ...state.cart,
            cartItems: [...state.cart.cartItems, newItem],
          },
        };
      } else { //else do nothing
        console.log('item already in cart');
        return state;
      }
    }

    case 'CART_REMOVE_ITEM': {
      //remove item from cart by id
      const cartItems = state.cart.cartItems.filter(
        (id) => id !== action.payload.id
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'USER_SIGNIN': {
      return { ...state, userInfo: action.payload };
    }

    case 'USER_SIGNOUT': {
      return { ...state, userInfo: null };
    }

    default:
      console.log('default');
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export default StoreProvider;
