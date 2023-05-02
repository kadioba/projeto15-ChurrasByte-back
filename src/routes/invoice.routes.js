import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { invoiceShema } from "../schemas/invoice.schemas.js";
import { getInvoice, newInvoice } from "../controllers/invoice.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const invoiceRouter = Router();

invoiceRouter.post("/new-invoice", validateSchema(invoiceShema), newInvoice)
invoiceRouter.get("/invoice", authValidation, getInvoice)


export default invoiceRouter