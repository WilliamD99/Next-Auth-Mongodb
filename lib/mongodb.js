import { MongoClient } from 'mongodb'


export async function connectToDatabase() {
    if (!process.env.MONGODB_URI) {
        throw new Error('Invalid/Missing mongodb uri')
    }
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    return client
}
