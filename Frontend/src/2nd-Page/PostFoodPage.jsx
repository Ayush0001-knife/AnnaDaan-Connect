import React from "react";
import styles from "./postfoodpage.module.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrentPageActions } from "../Store/CurrentPage";

function PostFoodPage() {
  const matchedUser = useSelector((store) => store.matchedUser);
  const currentPage = useSelector((store) => store.currentPage.currentPage);
  const dispatch = useDispatch();

  const typeElement = useRef("");
  const quantityElement = useRef("");
  const expirationElement = useRef("");

  const handlePostNowClick = (e) => {
    e.preventDefault();
    const type = typeElement.current.value;
    const quantity = quantityElement.current.value;
    const expiration = expirationElement.current.value;
    const postTiming = new Date().toLocaleString();

    const foodData = {
      contact: matchedUser.userInfo.contact,
      name: matchedUser.userInfo.name,
      type,
      quantity,
      expiration,
      postTiming,
    };

    console.log("Your Enterd Food data", foodData); // Fixed typo in console.log

    fetch("http://localhost:3001/donor/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodData),
      console: "Donation posted successfully",
    });

    typeElement.current.value = "";
    quantityElement.current.value = "";
    expirationElement.current.value = "";

    dispatch(CurrentPageActions.setCurrentPage("dashboard"));
  };

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
            value={matchedUser.userInfo.name}
            placeholder="Enter your name"
            className={styles.input}
            readOnly
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="type">Food Type</label>
          <select
            id="type"
            name="type"
            className={styles.select}
            ref={typeElement}
          >
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
            ref={quantityElement}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="expiration">Expiration Time</label>
          <select
            id="expiration"
            name="expiration"
            className={styles.select}
            ref={expirationElement}
          >
            <option value="">Select expiration time</option>
            <option value="1.5 ">Less than 2 hours</option>
            <option value="3.5">2–4 hours</option>
            <option value="5.5">4–6 hours</option>
            <option value="11.5">6–12 hours</option>
          </select>
        </div>

        <button
          type="submit"
          className={styles.button}
          onClick={handlePostNowClick}
        >
          Post Now
        </button>
      </form>
    </section>
  );
}

export default PostFoodPage;
