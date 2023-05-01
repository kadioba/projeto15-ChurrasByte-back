import bcrypt from "bcrypt"
import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";

export async function newInvoice(req, res) {
    const { cart } = req.body

    try {
        // Update de stock
        for (let i = 0; i < cart.length; i++) {
            const product = await db.collection("products").findOne({ _id: new ObjectId(cart[i]._id) })
            const newStock = product.stock - cart[i].quantity;
            await db.collection("products").updateOne(
                { _id: product._id },
                { $set: { stock: newStock } })
        }

        const invoice = await db.collection("invoices").insertOne({ ...req.body, creditCard: bcrypt.hashSync(req.body.creditCard, 10), cvv: bcrypt.hashSync(req.body.cvv, 10), expireDate: bcrypt.hashSync(req.body.expireDate, 10) })

        if (req.body.userId) {
            const user = await db.collection("users").findOne({ _id: new ObjectId(req.body.userId) })
            if (!user) return res.status(401).send("Usuario não encontrado")

            const removeCart = await db.collection("users").updateOne(
                { _id: user._id },
                { $set: { cart: [] } }
            )
        }
        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message);

    }
}