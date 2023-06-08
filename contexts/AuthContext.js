import React, { useContext, useState, useEffect } from "react";

import { fb, db } from "../utils/firebase";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(username, email, password) {
    return fb
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user.updateProfile({
          displayName: username,
        });
      });
  }
  function saveUsername(id, user) {
    const userId = id;
    db.ref(`users/${userId}`)
      .set({ username: user, reflexTrainingScore: 0, reactionRateScore: 100000 })
      .then(() => {
        console.log("Username saved successfully");
      })
      .catch((error) => {
        console.log("Failed to save username:", error);
      });
  }

  function login(email, password) {
    return fb.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return fb.signOut();
  }

  function resetPassword(email) {
    return fb.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function maxReactionRateScore(userId) {
    return new Promise((resolve, reject) => {
      db.ref(`users/${userId}/reactionRateScore`)
        .once("value")
        .then((snapshot) => {
          let score = snapshot.val();
          resolve(score);
        })
        .catch((error) => {
          console.error("Помилка при отриманні даних:", error);
          reject(error);
        });
    });
  }

    function maxReflexTrainingScore(userId) {
    return new Promise((resolve, reject) => {
      db.ref(`users/${userId}/reflexTrainingScore`)
        .once("value")
        .then((snapshot) => {
          let score = snapshot.val();
          resolve(score);
        })
        .catch((error) => {
          console.error("Помилка при отриманні даних:", error);
          reject(error);
        });
    });
  }

  function uploadReactionRateScore(userId, score) {
    return new Promise((resolve, reject) => {
      db.ref(`users/${userId}/reactionRateScore`)
        .once("value")
        .then((snapshot) => {
          let currentScore = snapshot.val();
          if (score < currentScore) {
            db.ref(`users/${userId}/reactionRateScore`)
              .set(score)
              .then(() => {
                console.log("Score saved successfully");
                resolve();
              })
              .catch((error) => {
                console.log("Failed to save score:", error);
                reject(error);
              });
          } else {
            resolve();
          }
        })
        .catch((error) => {
          console.error("Помилка при отриманні даних:", error);
          reject(error);
        });
    });
  }

  function uploadReflexTrainingScore(userId, score) {
    return new Promise((resolve, reject) => {
      db.ref(`users/${userId}/reflexTrainingScore`)
        .once("value")
        .then((snapshot) => {
          let currentScore = snapshot.val();
          if (score > currentScore) {
            db.ref(`users/${userId}/reflexTrainingScore`)
              .set(score)
              .then(() => {
                console.log("Score saved successfully");
                resolve();
              })
              .catch((error) => {
                console.log("Failed to save score:", error);
                reject(error);
              });
          } else {
            resolve();
          }
        })
        .catch((error) => {
          console.error("Помилка при отриманні даних:", error);
          reject(error);
        });
    });
  }

  useEffect(() => {
    const unsubscribe = fb.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    saveUsername,
    maxReactionRateScore,
    maxReflexTrainingScore,
    uploadReactionRateScore,
    uploadReflexTrainingScore,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
