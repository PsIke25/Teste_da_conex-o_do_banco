import styles from "./Favorite.module.css";
import { Link } from "react-router-dom";

const Favorite = ({title,link}) => {
    return(
        <div className={styles.vestibular}>
            <Link to={link}className={styles.vestibular}>
                💙 {title}
            </Link>
            
        </div>
    )
}

export default Favorite