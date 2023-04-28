import joi from 'joi'

export const addToCartSchema = joi.object({
    price: joi.number().required(),
    _id: joi.string().required(),
    quantity: joi.number().required(),
    name: joi.string().required(),
    imageURL: joi.string().uri().required()
})