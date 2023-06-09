import PrivateRoute from "../../components/PrivateRoute";
import styles from "../../styles/components/reflex-training.module.scss";
import Header from "../../components/header";
import { useAuth } from "../../contexts/AuthContext";

import { useState, useEffect, useRef } from "react";
import Footer from "../../components/footer";
import { faBrain } from "@fortawesome/free-solid-svg-icons";



export default function ReflexTraining() {
  const defaultTime = 30;
  const defaultScore = 0;
  const {currentUser, maxReflexTrainingScore, uploadReflexTrainingScore} = useAuth();
  const [count, setCount] = useState(defaultScore);
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [timerId, setTimerId] = useState(null);
  const [testOver, setTestOver] = useState(false);
  const [startTestBtn, setStartTestBtn] = useState(false);
  const [bestScore, setBestScore] = useState(null);
  const moleRef = useRef(null);
  let testResult

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
    maxReflexTrainingScore(currentUser.displayName).then((score) => {
      setBestScore(score);
    });
    uploadReflexTrainingScore(currentUser.displayName,count)
    if (testOver) {
      clearInterval(timerId);
      
    }
  }, [timerId, testOver, maxReflexTrainingScore, currentUser, uploadReflexTrainingScore,count]);

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
            Congratulate {currentUser.displayName}
          </h3>
          <div>Your final score is {count}.</div>
          {bestScore && <div>Your best score is {bestScore}.</div>}
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
       <Header leftNavIcon={faBrain} leftNavName={'Тести'} leftNavPath={'/tests'}/>

      <div className={styles.page}>
        <h2>
        Тренування рефлексів
        </h2>
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
             Розпочати
            </button>
          )}
          <div className={styles.timer}>Time left: {timeLeft}s</div>
        </div>
      </div>
      <Footer/>
    </PrivateRoute>
  );
}
