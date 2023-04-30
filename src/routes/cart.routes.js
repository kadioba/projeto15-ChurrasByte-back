import { Router } from "express";
import { addToCart, getCart, updateCartItem } from "../controllers/cart.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { addToCartSchema } from "../schemas/cart.shemas.js";

const cartRouter = Router()

cartRouter.get('/get-cart', getCart);
cartRouter.post('/add-to-cart', validateSchema(addToCartSchema), addToCart);
cartRouter.put('/edit-from-cart/:itemId', updateCartItem);
//cartRouter.delete('/delete-from-cart/:itemId', deleteCartItem);

export default cartRouter