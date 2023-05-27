import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";

import PrivateRoute from "../components/PrivateRoute";
import Header from "../components/header";
import Footer from "../components/footer";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    setError("");
    try {
      await logout();
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <PrivateRoute>
      <Header
        rightNavIcon={faRightFromBracket}
        rightNavName={
          <Link href="/Login" onClick={handleLogout}>
            Log Out
          </Link>
        }
      />
      <main className="profile__page">
        <section>
          <h2>Profile</h2>
          <div>
            {error && alert(error)}
            {currentUser && (
              <React.Fragment>
                <p>
                  <strong>Email:</strong> {currentUser.email}
                </p>
                <p>
                  <strong>Username:</strong> {currentUser.displayName}
                </p>
                <Link href="/UpdateProfile">Update Profile</Link>
              </React.Fragment>
            )}
          </div>
        </section>
        <section>
          <h2>Best results</h2>
          <div>
            <p>
              <strong>Reflex Training:</strong> some score
            </p>
            <p>
              <strong>Reaction Rate:</strong> some score
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </PrivateRoute>
  );
}
