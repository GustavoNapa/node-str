'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const { get } = require('http');

const app = express();
const router = express.Router();

const index = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ========== Verbos REST API ===========
// get 
// post
// put
// delete
// ======================================

app.use('/', index);
app.use('/products', create);
app.use('/products', put);
app.use('/products', del);

module.exports = app;
