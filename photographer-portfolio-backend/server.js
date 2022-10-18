import express from 'express';
import mongoose from 'mongoose';
import data from './data/albumsNew.js';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import Product from './models/productModel.js';

dotenv.config(); //load config from env file

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('conntected to mongodb');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
