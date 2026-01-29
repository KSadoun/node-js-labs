const Joi = require('joi');

const donateBody = Joi.object({
    amount: Joi.number().min(5).required()
}).required();

const donateBodySchema = {
    body: donateBody
};

module.exports = donateBodySchema;