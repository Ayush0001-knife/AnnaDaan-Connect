import React from "react";
import styles from "./postfoodpage.module.css";

function PostFoodPage() {
  return (
    <section className={styles.formSection}>
      <header className={styles.header}>
        <h1 className={styles.title}>Post Surplus Food</h1>
        <p className={styles.subtitle}>
          Quickly share details about your excess food to connect with NGOs who
          can distribute it to those in need.
        </p>
      </header>

      <h2 className={styles.formTitle}>Post Donation Details</h2>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="donatorName">Donator Name</label>
          <input
            id="donatorName"
            type="text"
            name="donatorName"
            placeholder="Enter your name"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="type">Food Type</label>
          <select id="type" name="type" className={styles.select}>
            <option value="">Select food type</option>
            <option value="vegeterian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
            <option value="desserts">Desserts</option>
            <option value="beverages">Beverages</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="quantity">Quantity (kg)</label>
          <input
            id="quantity"
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            min="0"
            step="0.1"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="expiration">Expiration Time</label>
          <select id="expiration" name="expiration" className={styles.select}>
            <option value="">Select expiration time</option>
            <option value="1.5 hrs">Less than 2 hours</option>
            <option value="2-4 hrs">2–4 hours</option>
            <option value="4-6 hrs">4–6 hours</option>
            <option value="6-12 hrs">6–12 hours</option>
          </select>
        </div>

        <button type="submit" className={styles.button}>
          Post Now
        </button>
      </form>
    </section>
  );
}

export default PostFoodPage;
