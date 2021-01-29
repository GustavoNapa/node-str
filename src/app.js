'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { get } = require('http');

const app = express();

mongoose.connect('mongodb://napa:valete@nodestr.brksx.mongodb.net/nodestr', { useNewUrlParser: true, useUnifiedTopology: true });

//Carrega os modelos
const Product = require('./models/product');

//Carrega as Rotas
const index = require('./routes/index');
const products = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ========== Verbos REST API ===========
// get 
// post
// put
// delete
// ======================================

app.use('/', index);
app.use('/products', products);

module.exports = app;
