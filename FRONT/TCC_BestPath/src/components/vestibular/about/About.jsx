import styles from "./About.module.css";

const About = ({content, type, onClick, onFavorite, onLoved}) => {
    return(
        <div className={styles.aboutContainer}>
            <p>Mas afinal... o que é esse vestibular?</p>

            <div className={styles.contentDiv}>
                <p>{content}</p>
            </div>

            <div type={type} onClick={onClick} className={styles.favorite}>
                <button onClick={onFavorite}>💙 Gostei, quero um atalho no meu perfil!</button>
            
                <button onClick={onLoved}>⭐ Amei, quero receber as atualizações!</button> 
            </div>            

        </div>
    )
}

export default About;