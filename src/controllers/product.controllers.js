import { db } from "../database/database.connection.js"
import { ObjectId } from "mongodb"

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
    const { filter } = req.query

    if (filter) {
        try {
            const products = await db.collection("products").find({category: filter}).toArray()
            return res.status(200).send(products)

        } catch (err) {
            return res.status(500).send(err.message)
        }
    }
    try {
        const products = await db.collection("products").find().toArray()
        res.status(200).send(products)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getProductById(req, res) {

    try {
        const product = await db.collection('products').findOne({ _id: new ObjectId(req.params.id) });

        if (!product) return res.status(404).send('Produto não encontrado')

        res.status(200).send(product)

    } catch (err) {
        res.status(500).send(err.message)
    }
};

export async function updateProduct(req, res) {

    try {
        const productExists = await db.collection('products').findOne({ _id: new ObjectId(req.params.id) });

        if (!productExists) return res.status(404).send('Produto não encontrado')

        const updateResult = await db.collection('products').updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

        if (updateResult.modifiedCount === 0) {
            res.status(304).send("Nenhuma modificacao realizada");
            return;
        }

        res.status(200).send("Produto atualizado com sucesso")

    } catch (err) {
        res.status(500).send(err.message)
    }
};

export async function deleteProduct(req, res) {

    try {
        const deleteResult = await db.collection('products').deleteOne({ _id: new ObjectId(req.params.id) });

        if (deleteResult.deletedCount === 0) {
            res.status(404).send('Produto não encontrado');
            return;
        }

        res.status(200).send('Produto deletado com sucesso');

    } catch (err) {
        res.status(500).send(err.message)
    }
};