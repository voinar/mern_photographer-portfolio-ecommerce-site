// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { db } from '../firebase/config';
// // import { ordersColRef } from '../firebase/config';
// import jsSHA from 'jssha';
// import axios from 'axios';

import { Store, useState, useContext, useEffect, axios } from '../imports';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const Success = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const [largeImages, setLargeImages] = useState([]);
  const [purchasedImages] = useState(state.cart.cartItems);
  // const [paymentConfirmation, setPaymentConfirmation] = useState({});

  //payment verification
  //1. find payment confirmation with sessionId === uniqueId in api data array
  async function getPaymentConfirmation() {
    try {
      const response = await axios.get(process.env.REACT_APP_PAYMENT_GATEWAY_URLSTATUS);
      console.log('res',response.data);
      console.log('found', response.data.find(element => element.sessionId === state.cart.uniqueId))
      // setPaymentConfirmation(findConfirmation)
      console.log('payment confirmation',response.data.find(element => element.sessionId === state.cart.uniqueId));


    } catch (error) {
      console.error(error);
    }
  }
  getPaymentConfirmation();

  // axios
    //   .get(process.env.REACT_APP_PAYMENT_GATEWAY_URLSTATUS)
    //   .then((response) => {
    //     // console.log('REACT_APP_PAYMENT_GATEWAY_URLSTATUS res', response.data);
    //     // console.log('found',response.data.find(element => element.sessionId === state.cart.uniqueId))
    //     // const confirmationData = response.data.find(element => element.sessionId === state.cart.uniqueId);
    //     // setPaymentConfirmation(response.data)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // return
    // }

  // 2. send the data back to complete confirmation process
  console.log('conf');

  useEffect(() => {
    //clear cart on load–-_
    // const clearCart = () => {
    //   try {
    //     contextDispatch({
    //       type: 'CLEAR_CART',
    //     });
    //     // localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // clearCart();

    //get full versions of images
    purchasedImages.map((image) => {
      const storage = getStorage();
      const imageUrlFormatted = image
        .replace('https://firebasestorage.googleapis.com/v0/b/', 'gs://')
        .replace('/o', '')
        .replace('male', 'duze')
        .split('?')[0]
        .replace('jpg', 'JPG')
        .replace(/%2F/gi, '/');

      getDownloadURL(ref(storage, imageUrlFormatted))
        .then((url) => {
          console.log('large', imageUrlFormatted);
          console.log('url', url);
          setLargeImages((prevState) => [...prevState, url]);
        })
        .catch((error) => {
          console.log(error);
        });
      return null;
    });
  }, [purchasedImages, contextDispatch]);

  return (
    <>
      <div className="purchased__container">
        <h1>Twoje zdjęcia</h1>
        {/* <button onClick={clearCart}>clear koszyk</button> */}
        <div className="purchased__images">
          <ul>
            {largeImages.map((image) => (
              <li key={image}>
                {/* console.log(image) */}
                {/* {console.log('fullsize', getFullSize(image))}
                <div>
                  <h3>small</h3>
                  <img src={image} alt="" />
                </div>
                <h3>large</h3> */}
                <img src={image} alt="" />
                {/* <p>full size{getFullSize(image) ? 'true' : 'false'}</p> */}
                {/* <p>full size{largeUrl}</p> */}
                {/*
               <a href={getFullSize(image)}>download</a> */}

                {/* <img src={"https://firebasestorage.googleapis.com/v0/b/kacper-foto.appspot.com/o/albums%2FBiegam_i_wspieram%2Fduze%2FBiegamIWspieram_154.JPG?alt=media&token=1760f741-e4e5-4479-b4d9-dce90f26b10f"} alt="" /> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Success;
