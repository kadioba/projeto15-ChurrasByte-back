import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt"

export async function signUp(req, res) {
    const { password, email, name } = req.body;

    try {
        const user = await db.collection("users").findOne({ email })
        if (user) return res.status(409).send("Usuario com email ja cadastrado")

        const encryptedPassword = bcrypt.hashSync(password, 10);

        await db.collection("users").insertOne({
            name,
            email,
            password: encryptedPassword
        })

        res.sendStatus(201)

    } catch (err) {
        return res.status(500).send(err.message);
    }
}