import styles from "./Header.module.css";
import PsIke from "../../../public/images/psike_corporation.png";
import User from "../../../public/images/user.png";
// import Menu from "../../../public/images/menu.png";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

function Header() {
     const { usuario } = useAuth();
     const [link, setLink] = useState("/signIn"); // <- começa com padrão
    
      // Quando o usuário mudar (ou no carregamento), muda o link
      useEffect(() => {
        if (usuario && usuario.id > 0) {
          setLink("/user");
        } else {
          setLink("/signIn");
        }
      }, [usuario]);
    return (
        <header className={styles.header}>
            <div className={styles.leftGroup}>
                <Navbar />
                <img src={PsIke} />
            </div>
                <Link to={link}>
                <img src={User} className={styles.user} />
            </Link>
            </header>

    );
}

export default Header;