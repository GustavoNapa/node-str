'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product.find({ active: true }, '_id title price slug');
}

exports.getBySlug = (slug) => {
    return Product.findOne({
        slug: slug,
        active: true
    },
    '_id title description tags price slug');
}

exports.getByTag = (tag) => {
    return Product.find({
        tags: tag,
        active: true
    },
    '_id title description tags price slug');
}

exports.getById = (id) => {
    return Product.findById(id,
        '_id title description tags price slug');
}

exports.create = (data) => {
    var product = new Product(data);

    return product.save();
}

exports.update = (id, data) => {
    return Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
            }
        })
}

exports.delete = (id) => {
    Product
        .findOneAndRemove(id)
}