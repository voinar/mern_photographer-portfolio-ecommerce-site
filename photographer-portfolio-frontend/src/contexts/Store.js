import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};

function reducer(state, action) {
  // const index = state.cart.cartItems.findIndex((object) => {
  //   return object.id === action.payload.id;
  // });

  switch (action.type) {
    case 'CART_ADD_ITEM':
      //add item to cart
      console.log(
        state.cart.cartItems.findIndex((object) => {
          return object.id === action.payload.id;
        })
      );

      if (
        state.cart.cartItems.findIndex((object) => {
          return object.id === action.payload.id;
        }) === -1
      ) {
        return {
          ...state,
          cart: {
            ...state.cart,
            cartItems: [...state.cart.cartItems, action.payload],
          },
        };
      }
      break;
      
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export default StoreProvider;
