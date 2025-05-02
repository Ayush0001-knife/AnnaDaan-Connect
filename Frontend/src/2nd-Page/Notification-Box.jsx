import React from "react";
import styles from "./NotificationBox.module.css";

const NotificationBox = () => {
  return (
    <div className={styles.card}>
      <div className={styles.topBar}>
        <div>👤 Ayush Gautam</div>
        <div>📍 Gr Noida</div>
      </div>

      <div className={styles.category}>non-vegetarian</div>

      <div className={styles.info}>
        <span className={styles.icon}>⚖️</span>
        Quantity : 12 kg
      </div>

      <div className={`${styles.info} ${styles.orange}`}>
        <span className={styles.icon}>⏳</span>
        Expires in : 8h 47m left
      </div>

      <div className={`${styles.info} ${styles.status}`}>
        <span className={styles.icon}>ℹ️</span>
        Status : _ _ _ _
      </div>

      <button className={styles.button}>Claim Donation</button>
    </div>
  );
};

export default NotificationBox;
