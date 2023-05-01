import bcrypt from "bcrypt"
import { db } from "../database/database.connection.js";

export async function newInvoice(req, res) {

    try {
        await db.collection("invoices").insertOne({ ...req.body, creditCard: bcrypt.hashSync(req.body.creditCard, 10), cvv: bcrypt.hashSync(req.body.cvv, 10), expireDate: bcrypt.hashSync(req.body.expireDate, 10) })
        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message);

    }
}