import NextAuth from "next-auth";
// import GoogleProvider from 'next-auth/providers/google'
// import GitProvider from 'next-auth/providers/github'
import CredentialProvider from 'next-auth/providers/credentials'
import { connectToDatabase } from "@/lib/mongodb";
import { compare } from "bcryptjs";

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        CredentialProvider({
            async authorize(credentials) {
                const client = await connectToDatabase()
                const db = client.db('blog')
                const collection = db.collection('articles')

                const result = await collection.findOne({
                    email: credentials.email
                })

                if (!result) {
                    client.close()
                    throw new Error('User not exist')
                }

                const checkPW = await compare(credentials.password, result.password)
                if (!checkPW) {
                    client.close()
                    throw new Error('Invalid password')
                }

                client.close()
                return { email: result.email }
            }
        })
    ],
})