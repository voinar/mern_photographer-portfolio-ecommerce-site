import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';
import data from './data/data.js';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
// import Product from './models/productModel.js';

dotenv.config(); //load config from env file

const app = express();
app.use(
  cors({
    origin: '*',
  })
);

//convert form data in post request to json object inside req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.post('/', function requestHandler(req, res) {
  res.end('Hello, World!',res.data);
});

// add router in the Express app.
app.use('/api/payment', router);




mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('conntected to mongodb');
  })
  .catch((err) => {
    console.log(err.message);
  });


//seed routes
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

//enable body parser for POST request handling
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//payment api routes
// app.use('/api/payment', paymentRoutes);

// app.get('/api/payment', (req, res) => {
//   // res.send('payment endpoint running', res, req);
//   console.log('payment endpoint running')
//   res.send(data);
// });


// app.get('/api/seed', (req, res) => {
//   res.send(data);
// });

// app.get('/api/products', (req, res) => {
//   res.send(data);
// });

app.get('/api/data', (req, res) => {
  res.send(data);
});

// app.get('/api/', (req, res) => {
//   res.send(data);
// });

// const run = async (num = 3) => {
//   try {
//     // let num = 1;
//     const newProduct = await Product.create({
//       description:
//         'Kwintesencja Trail Runningu, Wbiegnij na PODIUM z Buty Jana 2022',
//       imageLarge: `../assets/portfolio/biegi/${num}.jpg`,
//       imageMedium: `../assets/portfolio/biegi/${num}.jpg`,
//       imageSmall: `../assets/portfolio/biegi/${num}.jpg`,
//       album: 'Wbiegnij na PODIUM z Buty Jana 2022',
//       dateAdded: new Date().getTime(),
//       eventDate: '21.10.2022',
//       eventType: 'Biegi',
//       eventName: 'Buty Jana 2022',
//       price: 12,
//       numDownloads: 0,
//     });
//     // newProduct.imageLarge = '../assets/portfolio/biegi/1000.jpg'

//     await newProduct.save().then(() => console.log('Product saved'));
//     console.log(newProduct);
//   } catch (e) {
//     console.log('ERROR: ' + e.message);
//   }
// };
// run();

// const deleteItem = async () => {
//   await Product.deleteOne({eventType: "Biegi"})
// }

// deleteItem()

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
