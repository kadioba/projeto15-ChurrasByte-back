import joi from 'joi'

export const createProductSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    imageURL: joi.string().uri().required(),
    stock: joi.number().required(),
    category: joi.string().required()
})

export const updateProductSchema = joi.object({
    name: joi.string().optional(),
    description: joi.string().optional(),
    price: joi.number().optional(),
    imageURL: joi.string().uri().optional(),
    stock: joi.number().optional(),
    category: joi.string().optional()
})