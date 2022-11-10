//express imports
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

// firebase imports
// import firebase from 'firebase';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { db, ordersColRef } from '../firebase/config';

const app = express();
const router = express.Router();
app.use(cors({ origin: '*' }));

router.get('/', (req, res) => {
  () => console.log('payment');

  res.json({
    greeting: 'welcome',
  });
});

let confirmations = [{ data: 'one' }, { data: 'two' }, { data: 'three' }];

router.get('/payment', (req, res) => {
  // res.send('<p>server running</p>');
  res.send(confirmations.map((item) => item));
});

router.post('/payment', (req, res) => {
  confirmations.push(JSON.parse(req.body));
  res.json({ data: req.data });

  // const orderRef = doc(db, 'orders', uniqueId);

  // setDoc(orderRef, {
  //   docData: req
  // });
  // {
  //   "merchantId": 0,
  //   "posId": 0,
  //   "sessionId": "string",
  //   "amount": 0,
  //   "currency": "PLN",
  //   "orderId": 0,
  //   "sign": "string"
  //   }
  // res.end()
});

app.listen(() => console.log('express server running'));

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);

// const express = require('express');
// const serverless = require('serverless-http');

// const app = express();
// const router = express.Router();

// router.get('/', (req, res) => {
//   res.json({
//     path: 'home',
//     greet: 'hi',
//   });
// });

// router.post('/payment', (req, res) => {

//   res.json({
//     data: req.body
//   });
// });

// app.listen(() => console.log('express server running'));

// app.use('/.netlify/functions/api', router);

// module.exports.handler = serverless(app);
