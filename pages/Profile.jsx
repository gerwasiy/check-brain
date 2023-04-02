import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";

import PrivateRoute from "../components/PrivateRoute";

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
      <div>
        <div>
          <h2>Profile</h2>
          {error && alert(error)}
          <strong>Email:</strong> {currentUser.email}
          <Link href="/UpdateProfile">Update Profile</Link>
        </div>
      </div>
      <div>
        <Link href='/Login' onClick={handleLogout}>Log Out</Link>
      </div>
    </PrivateRoute>
  );
}
