import { db } from "../database/database.connection.js"

export async function createProduct(req, res) {

    // FUTURAMENTE VALIDAR SE É O ADM QUEM ESTA MODIFICANDO

    const { name, description, price, imageURL, stock, category } = req.body

    try {
        const productExists = await db.collection("products").findOne({ name })
        if (productExists) return res.status(409).send("Produto ja cadastrado")

        await db.collection("products").insertOne({ name, description, price: Number(price), imageURL, stock: Number(stock), category })
        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getProducts(req, res) {

    try {
        const products = await db.collection("products").find().toArray()
        res.status(200).send(products)

    } catch (err) {
        res.status(500).send(err.message)
    }
}