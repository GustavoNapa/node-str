'use strict'

const ValidatorContract = require('../validator/fluent-validator');
const repository = require('../repositories/order-repository');

exports.post = async (req, res, next) => {
    let contract = new ValidatorContract();

    // Validadores
    contract.clear();
    contract.hasMinLen(req.body.name, 3, "O nome precisa ter mais de 3 caracteres.");
    contract.isEmail(req.body.email, "E-mail inválido");
    contract.hasMinLen(req.body.password, 6, "A senha precisa ter mais de 6 caracteres.");

    //Se os dados forem invalidos
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        await repository.create(req.body);
        res.status(201).send(
            { message: "Ordem salva com sucesso!" }
        );
    }catch(e){
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }

}