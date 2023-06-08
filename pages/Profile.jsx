  import React, { useEffect, useState } from "react";
  import { useAuth } from "../contexts/AuthContext";
  import Link from "next/link";
  import PrivateRoute from "../components/PrivateRoute";
  import Header from "../components/header";
  import Footer from "../components/footer";
  import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

  export default function Profile() {
    const [error, setError] = useState("");
    const { currentUser, logout, maxReflexTrainingScore, maxReactionRateScore } = useAuth();
    const [maxReflexScore, setMaxReflexScore] = useState(null);
    const [maxReactionScore, setMaxReactionScore] = useState(null);

    async function handleLogout() {
      setError("");
      try {
        await logout();
      } catch {
        setError("Failed to log out");
      }
    }

    useEffect(() => {
    
      maxReflexTrainingScore(currentUser.displayName)
        .then((score) => {
          setMaxReflexScore(score);
        })
        maxReactionRateScore(currentUser.displayName)
        .then((score) => {
          setMaxReactionScore(score);
        })

    },[maxReflexTrainingScore,maxReactionRateScore, currentUser]);

    return (
      <PrivateRoute>
        <Header
          rightNavIcon={faRightFromBracket}
          rightNavName={
            <Link href="/Login" onClick={handleLogout}>
              Вийти
            </Link>
          }
        />
        <main className="profile__page">
          <section>
            <h2>Особисті дані</h2>
            <div>
              {error && alert(error)}
              {currentUser && (
                <React.Fragment>
                  <p>
                    <strong>Пошта:</strong> {currentUser.email}
                  </p>
                  <p>
                    <strong>Нікнейм:</strong> {currentUser.displayName}
                  </p>
                  <Link href="/UpdateProfile">Оновити дані</Link>
                </React.Fragment>
              )}
            </div>
          </section>
          <section>
            <h2>Кращі результати</h2>
            <div>
              <p>
                <strong>Reflex Training:</strong> {maxReflexScore || "Loading..."} points
              </p>
              <p>
                <strong>Reaction Rate:</strong> {maxReactionScore || "Loading..."} ms
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </PrivateRoute>
    );
  }
