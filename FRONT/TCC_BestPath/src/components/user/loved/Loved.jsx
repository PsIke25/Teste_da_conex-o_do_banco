import styles from "./Loved.module.css";
import { Link } from "react-router-dom";

const Loved = ({title, link}) => {
    return(
        <div className={styles.vestibular}>
            <Link to={link}className={styles.vestibular}>
                ⭐ {title}
            </Link>
            
        </div>
    )
}

export default Loved