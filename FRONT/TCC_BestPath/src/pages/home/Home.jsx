import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import BestPathBanner from "../../../public/images/banner.png"
import styles from "./Home.module.css"

function Home() {

  return (
    <>
      <Header />
      {/* <h1>BestPath</h1> */}

      <div className={styles.banner}>
        <img src={BestPathBanner} className={styles.logo}></img>
      </div>

      <div className={styles.container}>

        {/* Vestibulares */}

        <div className={styles.vestibulares}>
          <p>Alguns vestibulares de São Paulo para você! 😉</p>

          <div className={styles.linksContainer}>

            <div className={styles.link}>
              <a href="/enem">ENEM</a>
            </div>

            <div className={styles.link}>
              <a href="/fuvest">Fuvest</a>
            </div>

            <div className={styles.link}>
              <a href="/unesp">Unesp</a>
            </div>

            <div className={styles.link}>
              <a href="/comvest">Comvest</a>
            </div>

            <div className={styles.link}>
              <a href="/fgv">FGV</a>
            </div>
          
          </div>

        </div>

        {/* Recomendação e contatos */}

          <div className={styles.contatos}>

            <div className={styles.email}>
              <p>Centralize suas metas, conquiste seus sonhos!</p>
            </div>

            <div className={styles.email}>
              <p>Quer enviar alguma recomendação para o site? Envie um email para:</p>
              <p className={styles.contact}>bestpahpsike@gmail.com</p>
            </div>

            <div className={styles.instagram}>
              <p>Siga-nos no instagram!</p>
              <a href="https://www.instagram.com/bes.tpath/">@bes.tpath</a>
            </div>

          </div>

        {/* Datas */}

        <div className={styles.calendar}>
          <p>📅 Datas importantes:</p>
          
          <div className={styles.dates}>
            <p>FUVEST - "6 a 10 de Janeiro de 2025 - Provas de Competências Específicas - Artes Cênicas (São Paulo)"</p>
          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default Home;