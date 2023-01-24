import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

import Form from '../component/form'

export default function AuthPage() {
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        getSession().then(session => {
            if (session) {
                // Use this to redirect when user is authenticated
                router.replace('/test')
            } else {
                setIsLoading(false)
            }
        })
    }, [router])

    if (isLoading) {
        return <p>Loading</p>
    }

    return (
        <>
            <div>AuthPage</div>
            <Form />
        </>
    )
}
