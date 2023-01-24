import React from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function Test() {
    const { data: session, status } = useSession()

    console.log(status)

    return (
        <>
            <div onClick={() => signOut()}>Test</div>
        </>
    )
}
