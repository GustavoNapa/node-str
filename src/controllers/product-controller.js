'use strict'

const mongoose = require("mongoose");

const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
    Product.find({ active: true }, '_id title price slug').then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(
            { message: "Erro ao listar produto", data: e }
        );
    });
}

exports.getBySlug = (req, res, next) => {
    Product.findOne({
        slug: req.params.slug,
        active: true
    },
    '_id title description tags price slug').then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(
            { message: "Erro ao listar produto", data: e }
        );
    });
}

exports.post = (req, res, next) => {
    var product = new Product(req.body);

    product.save().then(x => {
        res.status(201).send(
            { message: "Produto salvo com sucesso!" }
        );
    }).catch(e => {
        res.status(400).send(
            { message: "Erro ao salvar produto", data: e }
        );
    });
}

exports.put = (req, res, next) => {
    const id = req.params.id;

    res.status(201).send(
        {
            id: id,
            item: req.body
        }
    );
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    res.status(200).send(
        {
            id: id,
            item: req.body
        }
    );
}