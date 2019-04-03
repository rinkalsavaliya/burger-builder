const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');
const compression = require('compression');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.get('/api/v1/ingredients', (req, res) => {
  setTimeout(() => {
    res.send({
      isError: false,
      data: {
        ingredients: [
          { label: 'Salad', type: 'salad', price: 0.5 },
          { label: 'Tomato', type: 'tomato', price: 0.8 },
          { label: 'Cheese', type: 'cheese', price: 0.4 },
          { label: 'Bacon', type: 'bacon', price: 0.7 },
          { label: 'Meat', type: 'meat', price: 1.3 },
        ],
        basicPrice: 4
      }
    });
  }, 2000);
});

app.use(compression());
app.use(express.static(path.resolve(__dirname, '..', 'build'), {
  maxAge: (1 * 365 * 24 * 60 * 60 * 1000)
}));


app.listen(3001, () => {
  console.log('Server started at http://localhost:3001/');
});
