import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/components/auth.module.scss";

export default function UpdateProfile() {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
    <Header/>

      <div className={styles.auth__form__container} style={{height:'70vh', background:'linear-gradient(0deg, #e3e3e3, white)'}}>
        <h2>Update Profile</h2>
        {error && alert(error)}
        <form onSubmit={handleSubmit} >
          <div id="email">
            <label>Email</label>
            <input
              type="email"
              ref={emailRef}
              required
              defaultValue={currentUser.email}
              autoComplete="on"
            />
          </div>
          <div id="username">
            <label>Username</label>
            <input
              type="text"
              ref={usernameRef}
              required
              defaultValue={currentUser.displayName}
              autoComplete="on"
            />
          </div>
          <div id="password">
            <label>Password</label>
            <input
              type="password"
              ref={passwordRef}
              placeholder="Leave blank to keep the same"
            />
          </div>
          <div id="password-confirm">
            <label>Password Confirmation</label>
            <input
              type="password"
              ref={passwordConfirmRef}
              placeholder="Leave blank to keep the same"
            />
          </div>
          <button disabled={loading} type="submit">
            Update
          </button>
        </form>

        <div>
          <Link href="/Profile">Cancel</Link>
        </div>
      </div>
  
   <Footer/>
   </>
  );
}
