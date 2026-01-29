const Joi = require('joi');

const updatePostBodySchema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    content: Joi.string().min(10).required(),
    author: Joi.string().min(2).max(100).required(),
    tags: Joi.array().items(Joi.string()),
    published: Joi.boolean().default(false),
    likes: Joi.number().min(0).default(0)
}).required();

const updatePostParamsSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
}).required();


const schema = {
    body: updatePostBodySchema,
    params: updatePostParamsSchema,
}

module.exports = schema;