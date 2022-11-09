const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

const app = express();
const router = express.Router();
app.use(cors({ origin: '*' }));

router.get('/', (req, res) => {
  res.json({
    greeting: 'welcome',
  });
});

router.get('/payment', (req, res) => {
  res.send('<p>server running</p>');
});

router.post('/payment', (req, res) => {
  res.json({ data: req.data});
  // res.end('Hello, World!');
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
