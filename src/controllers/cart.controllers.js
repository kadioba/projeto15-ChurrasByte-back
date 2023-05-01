import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";


export async function addToCart(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.status(401).send("Token de usuario necessario para realizar a operação")

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.status(401).send("Sessão não encontrada");

        const user = await db.collection("users").findOne({ _id: session.userId })
        if (!user) return res.status(401).send("Usuario não encontrado")

        const newProduct = req.body;
        const existingProductIndex = user.cart.findIndex(item => item._id === newProduct._id);

        if (existingProductIndex >= 0) {
            user.cart[existingProductIndex].quantity += newProduct.quantity;
            await db.collection("users").updateOne(
                { _id: user._id },
                { $set: { [`cart.${existingProductIndex}.quantity`]: user.cart[existingProductIndex].quantity } }
            );
        } else {
            await db.collection("users").updateOne(
                { _id: user._id },
                { $push: { cart: newProduct } }
            );
        }

        res.status(200).send("Produto adicionado ao carrinho")

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getCart(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.status(401).send("Token de usuario necessario para realizar a operação")

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.status(401).send("Sessão não encontrada");

        const user = await db.collection("users").findOne({ _id: session.userId })
        if (!user) return res.status(401).send("Usuario não encontrado")

        res.status(200).send(user.cart)

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function updateCartItem(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const { itemId } = req.params

    if (!token) return res.status(401).send("Token de usuario necessario para realizar a operação")

    if (req.body.quantity < 0) return res.status(400).send("Quantidade invalida")

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.status(401).send("Sessão não encontrada");

        const user = await db.collection("users").findOne({ _id: session.userId })
        if (!user) return res.status(401).send("Usuario não encontrado");

        const existingProductIndex = user.cart.findIndex(item => item._id === itemId);
        if (existingProductIndex < 0) return res.status(404).send("Produto não encontrado")

        await db.collection("users").updateOne(
            { _id: user._id },
            { $set: { [`cart.${existingProductIndex}.quantity`]: req.body.quantity } }
        );

        const updatedUser = await db.collection("users").findOne({ _id: session.userId })

        res.status(200).send(updatedUser.cart)

    } catch (err) {
        res.status(500).send(err.message)

    }

}
