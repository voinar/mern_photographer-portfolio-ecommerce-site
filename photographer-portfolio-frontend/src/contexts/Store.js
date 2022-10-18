import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    // cartItems: [],
    cartItems: ['634e65e100c931d92937dc66', '634e65e100c931d92937dc65']
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      //check if item is already in cart //add item to cart
      // console.log('img id: ' + JSON.stringify(image.id))
      // console.log('a p id: ' + JSON.stringify(action.payload.id))
      const newItem = action.payload.id;
      const existingItem = state.cart.cartItems.find((image) => {
        return image.id === action.payload.id;
      });
      console.log('existingItem' + existingItem);
      console.log('newItem: ' + newItem)

      if (existingItem === undefined) {
        return { ...state, cart: { ...state.cart, cartItems: [...state.cart.cartItems, newItem]} };
      } else {
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
