'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { get } = require('http');

const app = express();

mongoose.connect('mongodb+srv://napa:valete@nodestr.brksx.mongodb.net/nodestr?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

//Carrega os modelos
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carrega as Rotas
const index = require('./routes/index');
const productsRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ========== Verbos REST API ===========
// get 
// post
// put
// delete
// ======================================

app.use('/', index);
app.use('/products', productsRoute);
app.use('/customer', customerRoute);
app.use('/order', orderRoute);

module.exports = app;
