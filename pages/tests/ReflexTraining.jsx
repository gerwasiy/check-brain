import PrivateRoute from "../../components/PrivateRoute";
import styles from "../../styles/components/reflex-training.module.css";
import Header from "../../components/header";
import { useAuth } from "../../contexts/AuthContext";

import { useState, useEffect, useRef } from "react";


export default function ReflexTraining() {
  const defaultTime = 5;
  const defaultScore = 0;
  const {currentUser} = useAuth();
  const [count, setCount] = useState(defaultScore);
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [timerId, setTimerId] = useState(null);
  const [testOver, setTestOver] = useState(false);
  const [startTestBtn, setStartTestBtn] = useState(false);
  const moleRef = useRef(null);
  let testResult = null;

  function randomLocation() {
    let x = Math.floor(Math.random() * window.innerWidth * 0.8);
    let y = Math.floor(Math.random() * window.innerHeight * 0.8);
    moleRef.current.style.top = `${y}px`;
    moleRef.current.style.left = `${x}px`;
  }

  function incrementScore() {
    setCount((prevCount) => prevCount + 1);
  }

  function startTest() {
    setTimerId(
      setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timerId);
            setTestOver(true);
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000)
    );

    setTimeout(() => {
      moleRef.current.addEventListener("click", () => {
        incrementScore();
        randomLocation();
      });
    });
  }

  useEffect(() => {
    if (testOver) {
      clearInterval(timerId);
    }
  }, [timerId, testOver]);

  let OnClickHandler = function (e) {
    e.preventDefault();
    setStartTestBtn(true);
    startTest();
  };
  let OffClickHandler = function (e) {
    e.preventDefault();
    setStartTestBtn(false);
    setCount(defaultScore);
    setTimeLeft(defaultTime);
    clearInterval(timerId);
    setTestOver(false);
   
  };

  if (testOver) {
    moleRef.current.style.display = 'none'
    testResult = (
      <div className={styles.testOverContainer}>
        <div className={styles.userStatistic}>
          <h3 className={styles.statisticTitle}>
            Congratulate {currentUser.email}
          </h3>
          <div>Your final score is {count}.</div>
          <div>Your best score is {count}.</div>
        </div>
        <div className={styles.allStatistic}>
          <h3 className={styles.statisticTitle}>Top 10 users</h3>
          <div></div>
        </div>
      </div>    
    );
  }

  return (
    <PrivateRoute>
      <Header />

      <div className={styles.page}>
        <div className={styles.testContainer}>
          {startTestBtn ? <div className={styles.mole} ref={moleRef}></div> : null}
          {testResult}
        </div>
        <div className={styles.testFooter}>
          <div className={styles.score}>Score: {count}</div>
          {startTestBtn ? (
            <button onClick={OffClickHandler} className={styles.resetStartTestBtn}>
              Reset
            </button>
          ) : (
            <button onClick={OnClickHandler} className={styles.startTestBtn}>
              Start Test
            </button>
          )}
          <div className={styles.timer}>Time left: {timeLeft}s</div>
        </div>
      </div>
    </PrivateRoute>
  );
}
