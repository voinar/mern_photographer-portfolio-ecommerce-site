import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
// Import the functions you need from the SDKs you need
import 'firebase/storage';
import 'firebase/firestore';

import {
  Store,
  useState,
  useContext,
  useEffect,
  useParams,
  axios,
  jsSHA,
} from '../imports';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const Purchased = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { uniqueId } = useParams();
  console.log('useParams uniqueId', uniqueId);

  const [largeImages, setLargeImages] = useState([]);
  const [purchasedImages, setPurchasedImages] = useState([]);

  //get purchased images list from db
  useEffect(() => {
    //1. find payment id db, 2. if isPaid: false, then confirm via payment gateway api query & set status as paid in db; if isPaid: true, then do nothing
    (async () => {
      console.log('get images list from db');
      const docRef = doc(db, 'orders', uniqueId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPurchasedImages(docSnap.data().cartItems);
      } else {
        console.log('error: order not found in db. unable to load images.');
      }
    })();
  }, [uniqueId])

  //payment verification
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
  }, [contextDispatch, state.cart.uniqueId]);

  useEffect(() => {
    //1. find payment id db, 2. if isPaid: false, then confirm via payment gateway api query & set status as paid in db; if isPaid: true, then do nothing
    (async () => {
      console.log('initiate payment verification');
      const docRef = doc(db, 'orders', state.cart.uniqueId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data().isPaid);
        if (docSnap.data().isPaid === false) {
          console.log('run payment verification');
          paymentVerification();
          setDoc(docRef, { isPaid: true }, { merge: true });
        } else {
          console.log('payment confirmation: order paid');
        }
      } else {
        console.log('error: order not found in db');
      }
    })();

    //send back the payment confirmation to payment gateway api
    const paymentVerification = () => {
      if (state.paymentVerification !== null) {
        console.log('state.paymentVerification', state.paymentVerification);
        //funkcja dla pierwszego etapu transkacji /v1/transaction/register
        const crcValue = process.env.REACT_APP_PAYMENT_GATEWAY_CRC_VALUE; //CRC pobrane z danych konta
        const username = process.env.REACT_APP_PAYMENT_GATEWAY_USERNAME;
        const password = process.env.REACT_APP_PAYMENT_GATEWAY_PASSWORD;

        // templatka sign: {"sessionId":"str","merchantId":int,"amount":int,"currency":"str","crc":"str"}
        const signTemplate = `{"sessionId":"${state.cart.uniqueId}","orderId":${state.paymentVerification.orderId},"amount":${state.paymentVerification.amount},"currency":"PLN","crc":"${crcValue}"}`;
        const shaObj = new jsSHA('SHA-384', 'TEXT', { encoding: 'UTF8' }); //nowy obiekt sha-384 generowany przez jsSHA
        shaObj.update(signTemplate); //wprowadzenie ciągu signCryptoInput do hashowania przez shaObj
        const signSha = shaObj.getHash('HEX'); //konwersja shaObj do hex

        axios({
          method: 'put', //metoda
          url: process.env.REACT_APP_PAYMENT_GATEWAY_URLVERIFY, //sandbox url

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
            console.log('verification res', response);
          })
          .catch((err) => {
            //blok dla odpowiedzi z błędem 400/401
            console.log('err', err);
          });
      } else {
        console.log('state.paymentVerification is', state.paymentVerification);
      }
    };
  }, [state.paymentVerification, state.cart.uniqueId]);

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
  useEffect(() => {
    console.log('current state', state);
  }, [state]);

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

  //set order status to 'paid' in db
  // const markOrderAsPaid = async () => {
  //   console.log('markOrderAsPaid');

  //   //get document from db

  //   const docRef = doc(db, 'orders', state.cart.uniqueId);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log('Document data:', docSnap.data());
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log('No such document!');
  //   }

  //   setDoc(docRef, { isPaid: true }, { merge: true });
  //   //update order status in db by marking it as paid
  // };

  return (
    <>
      <div className="purchased__container">
        <h1>Twoje zdjęcia</h1>
        <div className="purchased__images">
          <ul>
            {largeImages.map((image) => (
              <li key={image}>
                <img src={image} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Purchased;
