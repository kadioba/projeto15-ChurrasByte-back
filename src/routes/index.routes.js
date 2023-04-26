import { Router } from "express"
import authRouter from "./auth.routes.js"
import productRouter from "./product.routes.js"

const router = Router()
router.use(authRouter)
router.use(productRouter)

export default router