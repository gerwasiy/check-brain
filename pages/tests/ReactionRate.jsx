import { useState, useEffect, useCallback } from "react";
import PrivateRoute from "../../components/PrivateRoute";
import styles from "../../styles/components/reaction-rate.module.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";



export default function ReactionRate() {
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(undefined);
  const [showReactionBlock, setShowReactionBlock] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { maxReactionRateScore, uploadReactionRateScore, currentUser } = useAuth();
  const [bestScore, setBestScore] = useState(null);

  const randomTime = () => {
    return 1000 + Math.random() * (5000 - 1000);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowReactionBlock(false);
    setShowResult(false);
    setTimeout(() => {
      setShowReactionBlock(true);
      setStartTime(Date.now());
    }, randomTime());
  };

  const endGame = useCallback(() => {
    setGameStarted(false);
    setReactionTime(Date.now() - startTime);
    setShowResult(true);
    document.removeEventListener("click", endGame);
  }, [startTime]);

  useEffect(() => {
    maxReactionRateScore(currentUser.displayName).then((score) => {
      setBestScore(score);
    });
    uploadReactionRateScore(currentUser.displayName,reactionTime)
    if (showReactionBlock) {
      document.addEventListener("click", endGame);
    }
  }, [showReactionBlock, endGame]);

  return (
    <PrivateRoute>
      <Header
        leftNavIcon={faBrain}
        leftNavName={"Тести"}
        leftNavPath={"/tests"}
      />
      <main>
        <section className={styles.page}>
          <h2>Тест-тренажер на швидкість реакції</h2>
          {!gameStarted ? (
            <div className={styles.testContainer} onClick={startGame}>
              Натисніть щоб почати
            </div>
          ) : (
            <>
              {showReactionBlock ? (
                <div className={styles.testFinalContainer} onClick={endGame}>
                  Тисни! <br />
                </div>
              ) : (
                <div className={styles.testWaitingContainer}>
                  Чекайте на синій колір
                </div>
              )}
            </>
          )}

          {showResult && (
            <div className={styles.resultContainer}>
              <div className={styles.resultText}>
                Швидкість реакції: {reactionTime} мс
              </div>
            {bestScore && <div>Ваш найкращий результат: {bestScore} мс.</div>}
            </div>
          )}
        </section>
        <section className={styles.resultsGrade}>
          <h2>Оцінка результатів</h2>
          <ul>
            <li>
              <span>до 150 мс:</span> Відмінно!
            </li>
            <li>
              <span>від 150 - 170 мс:</span> Це п`ять з плюсом!.
            </li>
            <li>
              <span>від 170 - 190 мс:</span> Чудово! Майстри спорту міжнародного
              класу схвалюють.
            </li>
            <li>
              <span>від 190 - 200 мс:</span> Добре! Майстер спорту у Вас в
              кармані.
            </li>
            <li>
              <span>від 200 - 210 мс:</span> Непогано..
            </li>
            <li>
              <span>від 210 - 230 мс:</span> Нормально. Ви активні, можете
              краще.
            </li>
            <li>
              <span>від 230 - 270 мс:</span> Средненько. Швидкість реакції, як і
              у більшості людей.
            </li>
            <li>
              <span>від 270 - 350 мс:</span> Незадовільно
            </li>
            <li>
              <span>від 350 - 500 мс:</span> Незалік
            </li>
            <li>
              <span>від 500 і вище:</span> Ви взагалі живі там? Краще
              відпочиньте, спробуйте завтра.
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </PrivateRoute>
  );
}
