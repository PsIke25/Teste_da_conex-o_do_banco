import React from "react";
import styles from "./Navbar.module.css";
import Burger from "./Burger";
import RightNav from './RightNav';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
      </div>
      <RightNav />
      <Burger />
    </nav>
  );
}

export default Navbar;
