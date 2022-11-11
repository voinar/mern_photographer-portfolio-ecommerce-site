// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { db } from '../firebase/config';
// // import { ordersColRef } from '../firebase/config';
// import jsSHA from 'jssha';
// import axios from 'axios';

import {
  Store,
  useState,
  useContext,
  useEffect,
  axios,
  jsSHA,
} from '../imports';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const Success = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const [largeImages, setLargeImages] = useState([]);
  const [purchasedImages] = useState(state.cart.cartItems);

  //payment verification
  const paymentVerification = () => {
    console.log('state.paymentVerification', state.paymentVerification);
    //funkcja dla pierwszego etapu transkacji /v1/transaction/register
    // e.preventDefault();
    const crcValue = process.env.REACT_APP_PAYMENT_GATEWAY_CRC_VALUE; //CRC pobrane z danych konta
    const username = process.env.REACT_APP_PAYMENT_GATEWAY_USERNAME;
    const password = process.env.REACT_APP_PAYMENT_GATEWAY_PASSWORD;

    // templatka sign: {"sessionId":"str","merchantId":int,"amount":int,"currency":"str","crc":"str"}
    const signTemplate = `{"sessionId":"${state.cart.uniqueId}","orderId":${state.paymentVerification.orderId},"amount":${state.paymentVerification.amount},"currency":"PLN","crc":"${crcValue}"}`;
    // console.log('signtemp', signTemplate);
    // console.log('id type', typeof state.cart.uniqueId);
    // const signTemplate = `{"sessionId":${uniqueId},"merchantId":200527,"amount":2,"currency":"PLN","crc":${crcValue}}`; //template string do obliczenia sumy kontrolnej
    const shaObj = new jsSHA('SHA-384', 'TEXT', { encoding: 'UTF8' }); //nowy obiekt sha-384 generowany przez jsSHA
    shaObj.update(signTemplate); //wprowadzenie ciągu signCryptoInput do hashowania przez shaObj
    const signSha = shaObj.getHash('HEX'); //konwersja shaObj do hex

    console.log(
      'env register',
      typeof process.env.REACT_APP_PAYMENT_GATEWAY_URLREGISTER
    );
    console.log(
      'env verify',
      typeof process.env.REACT_APP_PAYMENT_GATEWAY_URLREGISTER
    );
    axios({
      //zapytanie http przez axios
      method: 'put', //metoda
      // url: process.env.REACT_APP_PAYMENT_GATEWAY_URLVERIFY, //sandbox url
      url: 'https://sandbox.przelewy24.pl/api/v1/transaction/verify', //sandbox url

      auth: {
        username: username,
        password: password,
      }, //dane z konta sandbox
      data: {
        merchantId: state.paymentVerification.merchantId,
        posId: state.paymentVerification.posId,
        sessionId: state.cart.uniqueId,
        amount: state.paymentVerification.amount,
        currency: 'PLN',
        orderId: state.paymentVerification.orderId,
        sign: signSha,
      },
    })
      .then((response) => {
        //blok uruchamiany dla odpowiedzi z kodem 200
        // console.log(response);
        console.log('verification res', response);
      })
      .catch((err) => {
        //blok dla odpowiedzi z błędem 400/401
        console.log('err', err);
        // console.log('err', err.response.data.error);
      });
  };

  //1. find payment confirmation with sessionId === uniqueId in api data array
  useEffect(() => {
    console.log('start payment confirmation');
    getPaymentConfirmation();

    async function getPaymentConfirmation() {
      console.log('getPaymentConfirmation start');
      try {
        await axios({
          method: 'get',
          url: process.env.REACT_APP_PAYMENT_GATEWAY_URLSTATUS,
          // responseType: 'stream'
        }).then(function (response) {
          console.log(response);
          contextDispatch({
            type: 'PAYMENT_VERIFICATION',
            payload: response.data.find(
              (element) => element.sessionId === state.cart.uniqueId
            ),
          });
          // paymentVerification(); //send back payment verification data
        });
      } catch (error) {
        console.error(error);
      }
    }
    // console.log('c', paymentConfirmation);
  }, [contextDispatch, state.cart.uniqueId]);

  // }, [paymentConfirmation]);

  // 2. send the data back to complete confirmation process
  // useEffect(() => {
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
  useEffect(() => {
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
          // console.log('large', imageUrlFormatted);
          // console.log('url', url);
          setLargeImages((prevState) => [...prevState, url]);
        })
        .catch((error) => {
          console.log(error);
        });
      return null;
    });
  }, [purchasedImages]);

  return (
    <>
      <div className="purchased__container">
        <h3>{JSON.stringify(state.paymentVerification)}</h3>
        <button onClick={paymentVerification}>verify</button>
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
