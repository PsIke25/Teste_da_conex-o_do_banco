import styles from "./AboutUs.module.css";
import Header from "../../components/header/Header";
import Julia from "../../../public/images/julia.png";
import Luca from "../../../public/images/luca.png";
import Maria from "../../../public/images/mariaEduarda.png";
import Mario from "../../../public/images/mario.png";
import Rafaella from "../../../public/images/rafaella.png";
import LinkedIn from "../../../public/images/linkedin.png";
import GitHub from "../../../public/images/github.png";
import Footer from "../../components/footer/Footer";

function AboutUs() {

    return(
        <div>
            <Header />
            {/* <h1>AboutUs</h1> */}

            <div className={styles.container}>

                {/* Desenvolvedores */}
                <div className={styles.namesContainer}>

                    {/* Eduardo Luca */}
                    <div className={styles.user}>

                        <div className={styles.photo}>
                            <img src={Luca}/>
                        </div>
                        <div className={styles.links}>
                            <img src={LinkedIn}></img>
                            <a href="https://www.linkedin.com/in/eduardo-luca-pereira-barbosa-716758274/" target="_blank">Eduardo Luca</a>
                        </div>
                        <div className={styles.links}>
                            <img src={GitHub}></img>
                            <a href="https://github.com/Nick2901" target="_blank">Nick2901</a>
                        </div>
                    </div>

                    {/* Julia Souza */}
                    <div className={styles.user}>    
                        <div className={styles.photo}>
                            <img src={Julia}/>
                        </div>
                        <div className={styles.links}>
                            <img src={LinkedIn}></img>
                            <a href="https://www.linkedin.com/in/julia-souza-985056224/" target="_blank">Julia Souza</a>
                        </div>
                        <div className={styles.links}>
                            <img src={GitHub}></img>
                            <a href="https://github.com/Juliastudent18" target="_blank">Juliastudent18</a>
                        </div>
                    </div>

                    {/* Maria Eduarda Takano */}
                    <div className={styles.user}>    
                        <div className={styles.photo}>
                            <img src={Maria}/>
                        </div>
                        <div className={styles.links}>
                            <img src={LinkedIn}></img>
                            <a href="https://www.linkedin.com/in/maria-eduarda-takano-784a79283/" target="_blank">Maria Eduarda Takano</a>
                        </div>
                        <div className={styles.links}>
                            <img src={GitHub}></img>
                            <a href="https://github.com/M4riaDuda" target="_blank">M4riaDuda</a>
                        </div>
                    </div>

                    {/* Mario Ruan */}
                    <div className={styles.user}>    
                        <div className={styles.photo}>
                            <img src={Mario}/>
                        </div>
                        <div className={styles.links}>
                            <img src={LinkedIn}></img>
                            <a href="https://www.linkedin.com/in/mario-ruan-gon%C3%A7alves-da-silva-6a1358306/" target="_blank">Mario Ruan</a>
                        </div>
                        <div className={styles.links}>
                            <img src={GitHub}></img>
                            <a href="https://github.com/MarioRuan" target="_blank">MarioRuan</a>
                        </div>
                    </div>

                    {/* Rafaella Silva */}
                    <div className={styles.user}>    
                        <div className={styles.photo}>
                            <img src={Rafaella}/>
                        </div>
                        <div className={styles.links}>
                            <img src={LinkedIn}></img>
                            <a href="https://www.linkedin.com/in/rafaella-silva-32607828b/" target="_blank">Rafaella Silva</a>
                        </div>
                        <div className={styles.links}>
                            <img src={GitHub}></img>
                            <a href="https://github.com/RafaellaaSilva" target="_blank">RafaellaaSilva</a>
                        </div>
                    </div>

                    <p>Somos a Psike, equipe dedicada ao projeto BestPath, atualmente em execução, com colaboradores especializados em diferentes áreas.</p>

                </div>

            </div>

            <Footer />
        </div>
    )
}

export default AboutUs;