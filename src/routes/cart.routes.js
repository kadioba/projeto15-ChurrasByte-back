import { Router } from "express";

const cartRouter = Router()

cartRouter.get('/', getCart);
cartRouter.post('/', addToCart);
cartRouter.put('/:itemId', updateCartItem);
cartRouter.delete('/:itemId', deleteCartItem);

export default cartRouter