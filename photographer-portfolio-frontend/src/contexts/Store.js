import React, { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  alertContent: null,
  languageSelected: localStorage.getItem('languageSelected') ? JSON.parse(localStorage.getItem('languageSelected')) : 'PL',
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    uniqueId: JSON.parse(localStorage.getItem('uniqueId'))
      ? JSON.parse(localStorage.getItem('uniqueId'))
      : null,
  },
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : [],
  cookiesConsentPopupAccepted: localStorage.getItem(
    'cookiesConsentPopupAccepted'
  )
    ? JSON.parse(localStorage.getItem('cookiesConsentPopupAccepted'))
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
      localStorage.setItem('cookiesConsentPopupAccepted', true);
      return { ...state, cookiesConsentPopupAccepted: true };
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

// import React, { createContext, useReducer } from 'react';

// export const Store = createContext();

// const initialState = {
//   alertContent: null,
//   cart: {
//     cartItems: localStorage.getItem('cartItems')
//       ? JSON.parse(localStorage.getItem('cartItems'))
//       : [],
//     uniqueId: JSON.parse(localStorage.getItem('uniqueId'))
//       ? JSON.parse(localStorage.getItem('uniqueId'))
//       : null,
//   },
//   userInfo: localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo'))
//     : [],
//   cookiesConsentPopupAccepted: localStorage.getItem(
//     'cookiesConsentPopupAccepted'
//   )
//     ? JSON.parse(localStorage.getItem('cookiesConsentPopupAccepted'))
//     : false,
//   paymentVerification: null,
//   // const [emailConfirmationSent, setEmailConfirmationSent] = useState(false);
//   // const [invoiceRequestEmailSent, setInvoiceRequestEmailSent] = useState(false);
//   emailConfirmationSent: false,
//   invoiceRequestEmailSent: false,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'CART_ADD_ITEM': {
//       //check if item is already in cart
//       const newItem = action.payload.id;
//       const isInCart = state.cart.cartItems.find((id) => {
//         return id === action.payload.id;
//       });

//       //if not in cart then create new item
//       if (isInCart === undefined) {
//         return {
//           ...state,
//           alertContent: 'Dodano do koszyka',
//           cart: {
//             ...state.cart,
//             cartItems: [...state.cart.cartItems, newItem],
//           },
//         };
//       } else {
//         //else inform the user that the item is already in the cart
//         return {
//           ...state,
//           alertContent: 'Zdjęcie już znajduje się w koszyku',
//         };
//       }
//     }

//     case 'CART_REMOVE_ITEM': {
//       //remove item from cart by id
//       const cartItems = state.cart.cartItems.filter(
//         (id) => id !== action.payload.id
//       );
//       return {
//         ...state,
//         cart: { ...state.cart, cartItems },
//         alertContent: 'Usunięto z koszyka',
//       };
//     }

//     case 'CLEAR_CART': {
//       return { ...state, cart: { ...state.cart, cartItems: [] } };
//     }

//     case 'CACHE_UNIQUE_ID': {
//       // const uniqueId = action.payload.uniqueId;
//       return {
//         ...state,
//         cart: { ...state.cart, uniqueId: action.payload.uniqueId },
//       };
//     }

//     case 'USER_SIGNIN': {
//       return { ...state, userInfo: action.payload };
//     }

//     case 'USER_SIGNOUT': {
//       localStorage.setItem('userInfo', null);
//       return { ...state, userInfo: null };
//     }

//     case 'ACCEPT_COOKIES': {
//       localStorage.setItem('cookiesConsentPopupAccepted', true);
//       return { ...state, cookiesConsentPopupAccepted: true };
//     }

//     case 'PAYMENT_VERIFICATION': {
//       return { ...state, paymentVerification: action.payload };
//     }

//     case 'EMAIL_CONFIRMATION_SENT': {
//       return { ...state, emailConfirmationSent: action.payload };
//     }

//     case 'EMAIL_INVOICE_REQUEST_SENT': {
//       return { ...state, invoiceRequestEmailSent: action.payload };
//     }

//     default:
//       console.log('default');
//       return state;
//   }
// }

// export function StoreProvider(props) {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const value = { state, dispatch };
//   return <Store.Provider value={value}>{props.children}</Store.Provider>;
// }

// export default StoreProvider;
