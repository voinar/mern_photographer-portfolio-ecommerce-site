import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    // cartItems: [],
    cartItems: [
      // {
      //   id: 'c9904ea3-7d9b-4215-a868-7b4060f18fd0',
      //   // url: '../assets/portfolio/biegi/0.jpg',
      //   // item: '../assets/portfolio/biegi/0.jpg',
      // },
      // {
      //   id: '19f4c678-e05b-4bee-b516-38879f9ed836',
      //   // url: '../assets/portfolio/biegi/1.jpg',
      //   // item: '../assets/portfolio/biegi/1.jpg',
      // },
      // {
      //   id: 'e7bb5fc9-9dd0-43af-b6ed-4e94fc9fc8f3',
      //   // url: '../assets/portfolio/biegi/2.jpg',
      //   // item: '../assets/portfolio/biegi/2.jpg',
      // },
    ],
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
        (image) => image.id !== action.payload.id
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
