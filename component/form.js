import React, { useState, useRef } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

let createUser = async (email, password) => {
    const res = await fetch('/api/auth/signup', {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
    }
    return data
}

export default function Form() {
    const emailRef = useRef(), pwRef = useRef()

    const [isLogin, setIsLogin] = useState(true)
    const router = useRouter()

    const switchAuthModeHandler = () => {
        setIsLogin((prev) => !prev)
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const email = emailRef.current.value,
            pw = pwRef.current.value

        if (isLogin) {
            const result = await signIn('credentials', {
                redirect: false,
                email: email,
                password: pw
            })

            if (!result.error) {
                router.replace('/test')
            }
            else {
                try {
                    const result = await createUser(email, pw)
                    console.log(result)
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
    }

    return (
        <>
            <div>Form</div>
            <form onSubmit={submitHandler}>
                <input
                    placeholder='Email'
                    type="email"
                    ref={emailRef}
                    required
                />
                <input
                    placeholder='Password'
                    type="password"
                    ref={pwRef}
                    required
                />
                <button type='submit' onClick={switchAuthModeHandler}>Submit</button>

            </form>
        </>
    )
}
