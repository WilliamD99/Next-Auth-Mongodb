import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';

async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body

        if (!email || !email.includes('@') || !password) {
            res.status(422).json({ message: "Invalid data" })
            return;
        }

        const client = await MongoClient.connect(process.env.MONGODB_URI)
        const db = client.db('blog');

        const checkExisting = await db.collection('articles').findOne({ email: email })
        if (checkExisting) {
            res.status(422).json({ message: "User already exist" })
            client.close()
            return
        }

        const status = await db.collection('articles').insertOne({
            email,
            password: await hash(password, 12)
        })

        res.status(201).json({ message: "User created", ...status })
        client.close()
    } else {
        res.status(500).json({ message: "Invalid router" })
    }
}

export default handler