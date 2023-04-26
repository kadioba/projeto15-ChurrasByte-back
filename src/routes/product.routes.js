import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { productSchema } from "../schemas/product.schemas.js";
import { createProduct, getProducts } from "../controllers/product.controllers.js";

const productRouter = Router()

productRouter.post("/new-product", validateSchema(productSchema), createProduct)
productRouter.get("/get-products", getProducts)

export default productRouter
