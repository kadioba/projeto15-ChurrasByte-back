import joi from 'joi'

export const productSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    imageURL: joi.string().uri().required(),
    stock: joi.number().required(),
    category: joi.string().required()
})