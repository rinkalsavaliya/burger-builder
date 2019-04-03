const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');
const compression = require('compression');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.get('/api/v1', (req, res) => {
  res.send({ isError: false });
});

app.use(compression());
app.use(express.static(path.resolve(__dirname, '..', 'build'), {
  maxAge: (1 * 365 * 24 * 60 * 60 * 1000)
}));


app.listen(3001, () => {
  console.log('Server started on port', 3001);
});
