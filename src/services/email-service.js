'use strict'
var config = require('../config');
var sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, html) => {
    sendgrid.send({
        to,
        from: 'contato@sitedosobrinho.com',
        subject,
        html
    });
}