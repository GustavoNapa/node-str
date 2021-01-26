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

const create = router.post('/', (req, res, next) => {
    res.status(201).send(
        req.body
    );
});

const put = router.put('/:id', (req, res, next) => {
    const id = req.params.id;

    res.status(201).send(
        {
            id: id,
            item: req.body
        }
    );
});

const del = router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    res.status(200).send(
        {
            id: id,
            item: req.body
        }
    );
});

app.use('/', index);
app.use('/products', create);
app.use('/products', put);
app.use('/products', del);

module.exports = app;
