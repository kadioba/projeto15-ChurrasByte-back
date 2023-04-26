import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controllers.js";
import { createProductSchema, updateProductSchema } from "../schemas/product.schemas.js";

const productRouter = Router()

productRouter.post("/new-product", validateSchema(createProductSchema), createProduct)
productRouter.get("/get-products", getProducts)
productRouter.get("/get-products/:id", getProductById)
productRouter.put("/update-product/:id", validateSchema(updateProductSchema), updateProduct)
productRouter.delete("/delete-product/:id", deleteProduct)

export default productRouter
