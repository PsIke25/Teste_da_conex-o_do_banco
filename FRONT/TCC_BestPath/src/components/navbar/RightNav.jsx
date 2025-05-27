import React, { useState, useEffect } from 'react';
import styles from './RightNav.module.css';
import PropTypes from 'prop-types'; 
import { useAuth } from "../../context/AuthContext";
;
const RightNav = ({ open }, ref) => {
  const { usuario } = useAuth();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [link, setLink] = useState("/signIn"); // <- começa com padrão

  const { logout } = useAuth();
  const deslogar = '/'

  const handleLogout = () => {
    logout(); // zera auth
  };

  // Quando o usuário mudar (ou no carregamento), muda o link
  useEffect(() => {
    if (usuario && usuario.id > 0) {
      setLink("/user");
    } else {
      setLink("/signIn");
    }
  }, [usuario]);

  return (
    <div className={styles.menu} style={{ display: open ? 'block' : 'none' }} ref={ref}>
      <ul className={styles.navList}>
        <li><a href="/">Tela Inicial</a></li>
        <li><a href={link}>Acessar Perfil</a></li>
        <li><a href="/signup">Realizar Cadastro</a></li>

        <li
          className={styles.submenuToggle}
          onClick={() => setSubmenuOpen(!submenuOpen)}
        >
          Vestibulares {submenuOpen ? '▾' : '▸'}
        </li>

        {submenuOpen && (
          <ul className={styles.submenu}>
            <li><a href="/belasartes">Belas Artes</a></li>
            <li><a href="/comvest">Comvest</a></li>
            <li><a href="/enem">ENEM</a></li>
            <li><a href="/etec">ETEC</a></li>
            <li><a href="/fatec">Fatec</a></li>
            <li><a href="/fgv">FGV</a></li>
            <li><a href="/fuvest">Fuvest</a></li>
            <li><a href="/mackenzie">Mackenzie</a></li>
            <li><a href="/nucvest">NucVest</a></li>
            <li><a href="/unesp">Unesp</a></li>
          </ul>
        )}
        <li><a href="/aboutUs">Quem somos</a></li>
        <li><a onClick={handleLogout} href={deslogar}>Sair</a></li>
      </ul>
    </div>
  );
};

RightNav.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default React.forwardRef(RightNav);
