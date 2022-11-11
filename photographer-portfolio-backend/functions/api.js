//express imports
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

const app = express();
const router = express.Router();
app.use(cors({ origin: '*' }));

router.get('/', (req, res) => {
  () => console.log('payment');

  res.json({
    greeting: 'welcome',
  });
});

let confirmations = [{ data: null }];

router.get('/payment', (req, res) => {
  // res.send('<p>server running</p>');
  res.send(confirmations.map((item) => item));
});

router.post('/payment', (req, res) => {
  confirmations.push(JSON.parse(req.body));
  res.json({ data: req.data });
});

app.listen(() => console.log('express server running'));

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
