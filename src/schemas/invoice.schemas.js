import joi from 'joi'

export const invoiceShema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    adress: joi.string().required(),
    creditCard: joi.number().required(),
    cvv: joi.number().required(),
    expireDate: joi.string().required(),
    userId: joi.string(),
    cart: joi.array().required(),
    total: joi.number().required()
})