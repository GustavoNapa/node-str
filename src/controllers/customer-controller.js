'use strict'

const ValidatorContract = require('../validator/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

const emailService = require('../services/email-service');

exports.post = async (req, res, next) => {
    let contract = new ValidatorContract();

    // Validadores
    contract.clear();
    contract.hasMinLen(req.body.name, 3, "O nome precisa ter mais de 3 caracteres.");
    contract.isEmail(req.body.email, "E-mail inválido");
    contract.hasMinLen(req.body.password, 6, "A senha precisa ter mais de 6 caracteres.");

    //Se os dados forem invalidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        await emailService.send(req.body.email, 'Bem vindo ao node Store', global.EMAIL_TMPL.replace('{0}', req.body.name)).then(async function (event) {
            await console.log("Enviado: " + event);
        }).catch(async function (err) {
            await console.error(err);
        })

        res.status(201).send(
            { message: "Cliente salvo com sucesso!" }
        );
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }

}

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: "Usuario ou senha invalidos"
            });
            return;
        }

        const token = await authService.generateToken({ email: customer.email, name: customer.name })

        res.status(201).send(
            {
                token,
                data: {
                    email: customer.email,
                    name: customer.name
                }
            }
        );
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }

}