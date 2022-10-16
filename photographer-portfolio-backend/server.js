import express from 'express';
import data from './data/albums.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('conntected to mongodb');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.get('/api/data', (req, res) => {
  res.send(data.albums);
});

app.get('/api');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
