import React, { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  alertContent: null,
  languageSelected: localStorage.getItem('languageSelected')
    ? JSON.parse(localStorage.getItem('languageSelected'))
    : 'PL',
  cart: {
    cartItems: sessionStorage.getItem('cartItems')
      ? JSON.parse(sessionStorage.getItem('cartItems'))
      : [],
    uniqueId: JSON.parse(sessionStorage.getItem('uniqueId'))
      ? JSON.parse(sessionStorage.getItem('uniqueId'))
      : null,
  },
  cookiesConsentPopupSet: localStorage.getItem('cookiesConsentPopupSet')
    ? JSON.parse(localStorage.getItem('cookiesConsentPopupSet'))
    : false,
  cookiesConsentAll: localStorage.getItem('cookiesConsentAll')
    ? JSON.parse(localStorage.getItem('cookiesConsentAll'))
    : false,
    cookiesConsentDecline: localStorage.getItem('cookiesConsentDecline')
    ? JSON.parse(localStorage.getItem('cookiesConsentDecline'))
    : false,
  paymentVerification: null,
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
          alertContent: 'Dodano do koszyka',
          cart: {
            ...state.cart,
            cartItems: [...state.cart.cartItems, newItem],
          },
        };
      } else {
        //else inform the user that the item is already in the cart
        return {
          ...state,
          alertContent: 'Zdjęcie już znajduje się w koszyku',
        };
      }
    }

    case 'CART_REMOVE_ITEM': {
      //remove item from cart by id
      const cartItems = state.cart.cartItems.filter(
        (id) => id !== action.payload.id
      );
      return {
        ...state,
        cart: { ...state.cart, cartItems },
        alertContent: 'Usunięto z koszyka',
      };
    }

    case 'CLEAR_CART': {
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }

    case 'CACHE_UNIQUE_ID': {
      // const uniqueId = action.payload.uniqueId;
      return {
        ...state,
        cart: { ...state.cart, uniqueId: action.payload.uniqueId },
      };
    }

    // case 'USER_SIGNIN': {
    //   return { ...state, userInfo: action.payload };
    // }

    // case 'USER_SIGNOUT': {
    //   localStorage.setItem('userInfo', null);
    //   return { ...state, userInfo: null };
    // }

    case 'ACCEPT_COOKIES': {
      localStorage.setItem('cookiesConsentPopupSet', true);
      localStorage.setItem('cookiesConsentAll', true);
      return {
        ...state,
        cookiesConsentPopupSet: true,
        cookiesConsentAll: true,
      };
    }

    case 'DECLINE_COOKIES': {
      localStorage.setItem('cookiesConsentPopupSet', true);
      localStorage.setItem('cookiesConsentDecline', true);
      return {
        ...state,
        cookiesConsentPopupSet: true,
        cookiesConsentDecline: true,
      };
    }

    case 'PAYMENT_VERIFICATION': {
      return { ...state, paymentVerification: action.payload };
    }

    case 'SET_UI_LANGUAGE': {
      return { ...state, languageSelected: action.payload };
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
