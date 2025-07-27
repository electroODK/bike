import React from "react";
import styles from "./dashboard.module.css";

const Dashboard = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Dashboard</h1>
    <div className={styles.grid}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Total Items</h3>
        <p className={`${styles.cardValue} ${styles.orange}`}>156</p>
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Categories</h3>
        <p className={`${styles.cardValue} ${styles.blue}`}>8</p>
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Orders Today</h3>
        <p className={`${styles.cardValue} ${styles.green}`}>42</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
