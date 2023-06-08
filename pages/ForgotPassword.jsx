import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import Link from "next/link"
import styles from "../styles/components/auth.module.scss";

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
        <div className={styles.auth__form__container}>
          <h2>Password Reset</h2>
          {error && alert(error)}
          {message && confirm(message)}
          <form onSubmit={handleSubmit}>
            <div id="email">
              <label>Email</label>
              <input autocomplete="on" type="email" ref={emailRef} required />
            </div>
            <button disabled={loading} type="submit">
              Reset Password
            </button>
          </form>
          <div>
            <Link href="/Login">Login</Link>
          </div>
          <div>
        Need an account? <Link href="/Signup">Sign Up</Link>
      </div>
        </div>
    </>
  )
}
