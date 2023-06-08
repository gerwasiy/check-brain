import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { db } from "../utils/firebase";

export default function Statistics() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.ref("users")
      .orderByChild("reflexTrainingScore")
      .limitToLast(10)
      .once("value")
      .then((snapshot) => {
        const usersData = snapshot.val();
        const usersArray = Object.keys(usersData).map((key) => {
          return {
            name: key,
            scoreRS: usersData[key].reflexTrainingScore || 0,
            scoreRR: usersData[key].reactionRateScore || 0
          };
        });
        setUsers(usersArray);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <main className="statistic__page">
        <h2>Статистика</h2>
        <section>
          <h3>Тренування рефлексів</h3>
          <div>
            {users.map((user) => (
              <div key={user.name}>
                <p>{user.name}</p>
                <p>{user.scoreRS} точок</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3>Тренування швидкості реакції</h3>
          <div>
          {users.map((user) => (
              <div key={user.name}>
                <p>{user.name}</p>
                <p>{user.scoreRR} мс</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}