import express from 'express';

const paymentRoutes = express.Router();

paymentRoutes.get('/', async (req, res) => {
    res.send({hi: 'ok'})
  console.log('payment respo',res)
});

export default paymentRoutes;
