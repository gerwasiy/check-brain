import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/components/auth.module.scss";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <div className={styles.auth__bg}>
      <div className={styles.auth__form__container}>
        <h2>Log In</h2>
        {error && alert(error)}
        <form onSubmit={handleSubmit}>
          <div id="email">
            <label>Email</label>
            <input type="email" ref={emailRef} required />
          </div>
          <div id="password">
            <label>Password</label>
            <input type="password" ref={passwordRef} required />
          </div>
          <button disabled={loading} type="submit">
            Log In
          </button>
        </form>
        <div className={styles.auth__helper}>
          <div>
            <Link href="/ForgotPassword">Forgot Password?</Link>
          </div>
          <div>
            Need an account? <Link href="/Signup">Sign Up</Link>
          </div>
          <div>
            Back to <Link href="/">Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
