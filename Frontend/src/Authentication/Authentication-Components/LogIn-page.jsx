import React, { useState, useRef } from "react";
import styles from "../authentication-components.css.mdules/login-page.module.css";
import { useDispatch } from "react-redux";
import { AuthenticationMethodActions } from "../../Store/AuthenticationMethod";
import Notification from "../../1st-Page/PopUpNotification"; // Import the notification component
import { MatchedUserActions } from "../../Store/matchedUser";
import { isRegisteredActions } from "../../Store/isRegistered";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userType, setUserType] = useState(""); // State for userType
  const [fetchedusers, setFetchedUsers] = useState([]); // State for fetched users
  const [notification, setNotification] = useState(null); // State for managing notification visibility
  const contactElement = useRef("");
  const passwordElement = useRef("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [EmailOrNumber, setEmailOrNumber] = useState("Email");

  const handleChange = () => setEmailOrNumber(!EmailOrNumber);

  const handleAuthenticationMethodChange = (e) => {
    dispatch(AuthenticationMethodActions.setAuthenticationMethod(e));
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value); // Update userType based on selected radio button
  };

  const handleLoginButtonClick = async (e) => {
    e.preventDefault();
    const contact = contactElement.current.value;
    const password = passwordElement.current.value;

    const userEnteredData = {
      contact,
      password,
      userType,
    };

    const endpoint = userType === "donor" ? "donor" : "ngo";

    try {
      const res = await fetch(`http://localhost:3001/${endpoint}/credentials`);
      const data = await res.json();
      const users = data.users;
      setFetchedUsers(users); // optional if you need it for UI later

      console.log("Fetched Users:", users);

      const matchedUser = users.find(
        (user) =>
          user.contact === userEnteredData.contact &&
          user.password === userEnteredData.password &&
          user.userType === userEnteredData.userType
      );

      if (matchedUser) {
        dispatch(MatchedUserActions.setUserInfo(matchedUser));
        dispatch(isRegisteredActions.setisRegistered(true));
        console.log("Matched User:", matchedUser);
        Navigate(`/${userType}`);
      } else {
        // Optional: handle failed login
        setNotification({
          message: "Invalid login credentials",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const closeNotification = () => setNotification(null);

  return (
    <div className={styles.loginPage}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      <h2 className={styles.heading}>Login</h2>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type={EmailOrNumber ? "email" : "number"}
            id={EmailOrNumber ? "email" : "number"}
            placeholder={EmailOrNumber ? "Email" : "Phone Number"}
            className={`${styles.input} ${styles.peer}`}
            required
            ref={contactElement}
          />
          <label
            htmlFor={EmailOrNumber ? "email" : "number"}
            className={styles.label}
          >
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
          onClick={() => handleAuthenticationMethodChange("register")}
        >
          or Register ?
        </p>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            className={styles.LoginButton}
            onClick={handleLoginButtonClick}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(LoginPage);
