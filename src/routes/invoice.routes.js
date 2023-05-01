import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { invoiceShema } from "../schemas/invoice.schemas.js";
import { newInvoice } from "../controllers/invoice.controllers.js";

const invoiceRouter = Router();

invoiceRouter.post("/new-invoice", validateSchema(invoiceShema), newInvoice)

export default invoiceRouter