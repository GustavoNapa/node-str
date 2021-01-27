'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const { get } = require('http');

const app = express();

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
