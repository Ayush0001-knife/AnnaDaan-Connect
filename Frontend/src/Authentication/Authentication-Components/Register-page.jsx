import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthenticationMethodActions } from "../../Store/AuthenticationMethod";
import styles from "../authentication-components.css.mdules/register-page.module.css";
import Notification from "../../1st-Page/PopUpNotification"; // Import the notification component
import { useNavigate } from "react-router-dom";
import { MatchedUserActions } from "../../Store/matchedUser";
import { isRegisteredActions } from "../../Store/isRegistered";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [EmailOrNumber, setEmailOrNumber] = useState("Email");
  const [userType, setUserType] = useState("");
  const [notification, setNotification] = useState(null); // State to manage notifications
  const Navigate = useNavigate();

  const nameElement = useRef(null);
  const contactElement = useRef(null);
  const passwordElement = useRef(null);

  const handleChange = () => setEmailOrNumber(!EmailOrNumber);

  const handleAuthenticationMethodChange = (e) => {
    dispatch(AuthenticationMethodActions.setAuthenticationMethod(e));
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value); // Update userType based on selected radio button
  };

  const handleregisterButtonClick = async (e) => {
    e.preventDefault();

    const name = nameElement.current.value;
    const contact = contactElement.current.value;
    const password = passwordElement.current.value;

    const userEnteredData = {
      name: name,
      contact: contact,
      password: password,
      userType: userType, // Add userType in the data
    };

    console.log("Your Entered Data", userEnteredData);

    dispatch(MatchedUserActions.setUserInfo(userEnteredData));
    dispatch(isRegisteredActions.setisRegistered(true));

    Navigate(`/${userType}`);

    const endpoint = userType === "donor" ? "donor/register" : "ngo/register";

    await fetch(`http://localhost:3001/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEnteredData),
    });
  };

  const closeNotification = () => setNotification(null);

  return (
    <div className={styles.modalContent}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      <h2 className={styles.heading}>Register</h2>
      <form className={styles.form} onSubmit={handleregisterButtonClick}>
        {/* Form Inputs */}
        <div className={styles.inputGroup}>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className={`${styles.input} ${styles.peer}`}
            required
            ref={nameElement}
          />
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
        </div>
        <div className={styles.inputGroup}>
          <input
            type={EmailOrNumber ? "email" : "number"}
            id={EmailOrNumber ? "email" : "number"}
            placeholder={EmailOrNumber ? "Email" : "Phone Number"}
            className={`${styles.input} ${styles.peer}`}
            required
            ref={contactElement}
          />
          <label htmlFor="email" className={styles.label}>
            {EmailOrNumber ? "Email" : "Phone Number"}
          </label>
          <p className={styles.option} onClick={handleChange}>
            or {EmailOrNumber ? "Phone Number" : "Email"} instead?
          </p>
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className={`${styles.input} ${styles.peer}`}
            required
            ref={passwordElement}
          />
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
        </div>
        <div className={styles.checkboxGroup}>
          <div className={styles.checkboxOption}>
            <input
              type="radio"
              id="donor"
              name="userType"
              value="donor"
              className={styles.radioInput}
              required
              checked={userType === "donor"} // Ensure radio is checked based on state
              onChange={handleUserTypeChange}
            />
            <label htmlFor="donor" className={styles.radioLabel}>
              Donor
            </label>
          </div>
          <div className={styles.checkboxOption}>
            <input
              type="radio"
              id="ngo"
              name="userType"
              value="ngo"
              className={styles.radioInput}
              required
              checked={userType === "ngo"} // Ensure radio is checked based on state
              onChange={handleUserTypeChange}
            />
            <label htmlFor="ngo" className={styles.radioLabel}>
              NGO
            </label>
          </div>
        </div>
        <p
          className={styles.option}
          onClick={() => handleAuthenticationMethodChange("login")}
        >
          or Login ?
        </p>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.registerButton}>
            Register
          </button>
          <button type="button" className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
