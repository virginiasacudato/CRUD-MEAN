const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectbd = require('./utils/db');
const cors = require('cors');
require ('dotenv');

const product = require('./routes/product');

const app = express();

connectbd();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/products', product);

module.exports = app;
