import { createContext, useReducer } from 'react';

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
      // check if item is already in cart
      const newItem = action.payload.id;
      const isInCart = state.cart.cartItems.find(
        (id) => id === action.payload.id,
      );

      // if not in cart then create new item
      // else inform the user that the item is already in the cart
      if (isInCart === undefined) {
        return {
          ...state,
          alertContent: 'Dodano do koszyka',
          cart: {
            ...state.cart,
            cartItems: [...state.cart.cartItems, newItem],
          },
        };
      }

      return {
        ...state,
        alertContent: 'Zdjęcie już znajduje się w koszyku',
      };
    }

    case 'CART_REMOVE_ITEM': {
      // remove item from cart by id
      const cartItems = state.cart.cartItems.filter(
        (id) => id !== action.payload.id,
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
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    state, dispatch,
  };
  // eslint-disable-next-line max-len
  // eslint-disable-next-line react/destructuring-assignment, react/prop-types, react/jsx-filename-extension
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export default StoreProvider;
