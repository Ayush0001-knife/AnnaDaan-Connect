import React, { useState } from "react";
import styles from "./navbar1.module.css";

const Navbar1 = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={styles.navbar}>
      <div className={styles["left-side"]}>
        <div className={styles.logo}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/047/411/214/non_2x/food-logo-icon-symbol-silhouette-on-white-background-free-vector.jpg"
            alt="Logo"
          />
        </div>
        <p className={styles.name}>AnnaDann Connect</p>
      </div>

      <div
        className={`${styles["right-side"]} ${menuOpen ? styles.active : ""}`}
      >
        <p className={styles["nav-items"]}>Guest Profile</p>
        <p className={styles["nav-items"]}>Contact Us ?</p>
        <p className={styles["nav-items"]}>Help</p>
      </div>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Navbar1;
