import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Signup() {
  const emailRef = useRef()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
router.push('Dashboard')
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value,usernameRef.current.value, passwordRef.current.value)
  
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="form-container">
          <h2>Sign Up</h2>
          {error && alert(error)}
          <form onSubmit={handleSubmit}>
            <div id="email">
              <label>Email</label>
              <input autoComplete="on" type="email" ref={emailRef} required />
            </div>
            <div id="username">
              <label>Username</label>
              <input autoComplete="on" type="text" ref={usernameRef} required />
            </div>
            <div id="password">
              <label>Password</label>
              <input autoComplete="on" type="password" ref={passwordRef} required />
            </div>
            <div id="password-confirm">
              <label>Password Confirmation</label>
              <input autoComplete="on" type="password" ref={passwordConfirmRef} required />
            </div>
            <button disabled={loading} type="submit">
              Sign Up
            </button>
          </form>
          <div>
        Already have an account? <Link href='/Login'>Log In</Link>
      </div>
      </div>
     
    </>
  )
}
