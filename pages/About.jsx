import Footer from "../components/footer";
import Header from "../components/header";
import styles from "../styles/components/about.module.scss";
export default function About() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.container}>
          <h2 className={styles.title}>Про нас</h2>
          <div className={styles.paragraph}>
          <p>
            Ласкаво просимо на Check Brain! Ми працюємо над розробкою цього сайту для покращення вашого досвіду та навчання. Наша мета полягає у наданні цікавих та корисних інструментів для тренування вашого мозку та вдосконалення когнітивних навичок.
          </p>
          <p>
            Наш сайт пропонує різноманітні тести та вправи, які допоможуть вам покращити рефлективні навички, швидкість реакції та інші аспекти мозкової діяльності. Ми віримо, що постійне тренування та розвиток мозку можуть позитивно вплинути на вашу пам`ять, креативність та когнітивні здібності.
          </p>
          <p>
            Наша команда працює над постійним оновленням та додаванням нових вправ та тестів для забезпечення різноманітності та цікавості. Ми також зосереджені на забезпеченні зручного та простого використання нашого сайту, щоб ви могли легко отримувати доступ до наших ресурсів та тренувань.
          </p>
          <p>
            Ми сподіваємося, що ви будете насолоджуватися використанням нашого сайту та досягатимете вражаючих результатів у ваших когнітивних зусиллях. Бажаємо успіхів у вашому тренуванні та розвитку мозку!
          </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
