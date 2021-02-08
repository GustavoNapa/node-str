'use strict'

const ValidatorContract = require('../validator/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = async (req, res, next) => {
    try{
        var data = await repository.get();
        res.status(200).send(data);
    }catch( e ){
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.getBySlug = async (req, res, next) => {
    try{
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.getByTag = async (req, res, next) => {
    try{
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.getById = async (req, res, next) => {
    try{
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidatorContract();

    // Validadores
    contract.clear();
    contract.hasMinLen(req.body.title, 3, "O titulo precisa ter mais de 3 caracteres.");
    contract.hasMinLen(req.body.slug, 3, "O slug precisa ter mais de 3 caracteres.");
    contract.hasMinLen(req.body.description, 3, "A descrição precisa ter mais de 3 caracteres.");

    //Se os dados forem invalidos
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        await repository.create(req.body);
        res.status(201).send(
            { message: "Produto salvo com sucesso!" }
        );
    }catch(e){
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }

}

exports.put = async (req, res, next) => {
    try{
        await repository.update(req.params.id, req.body);
        res.status(201).send(
            { message: "Produto atualizado com sucesso!" }
        );
    }catch(e){
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.delete = async (req, res, next) => {
    try{
        await repository.delete(req.params.id);
        res.status(200).send(
            { message: "Produto removido com sucesso!" }
        );
    }catch(e){
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}