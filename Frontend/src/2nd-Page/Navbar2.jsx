import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar2.module.css";
import { useSelector } from "react-redux";
import { CurrentPageActions } from "../Store/CurrentPage";
import { useDispatch } from "react-redux";
import { MatchedUserActions } from "../Store/matchedUser";
import { isRegisteredActions } from "../Store/isRegistered";
import { useNavigate } from "react-router-dom";

function Navbar2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook from react-router-dom

  const currentPage = useSelector((store) => store.currentPage.currentPage);
  const matchedUser = useSelector((store) => store.matchedUser);

  console.log("Matched user in Navbar", matchedUser);

  const handleCurrentPageChange = (page) => {
    dispatch(CurrentPageActions.setCurrentPage(page));
  };

  const hanldeLogoutbuttonClick = () => {
    dispatch(MatchedUserActions.resetUserInfo());
    dispatch(isRegisteredActions.resetIsRegistered());
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      {/* Left side with logo and name */}
      <div className={styles["left-side"]}>
        <div
          className={styles.logo}
          onClick={() => handleCurrentPageChange("dashboard")}
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/047/411/214/non_2x/food-logo-icon-symbol-silhouette-on-white-background-free-vector.jpg"
            alt="Logo"
          />
        </div>
        <Link
          to={`/${matchedUser.userInfo.userType}`}
          className={styles.name}
          onClick={() => handleCurrentPageChange("dashboard")}
        >
          AnnaDann Connect
        </Link>
      </div>

      {/* Right side navigation links */}
      <div
        className={`${styles["right-side"]} ${menuOpen ? styles.active : ""}`}
      >
        <Link
          to={`/${matchedUser.userInfo.userType}`}
          className={`${styles["nav-items"]} ${
            currentPage === "dashboard" ? styles.active : ""
          }`}
          onClick={() => handleCurrentPageChange("dashboard")}
        >
          Dashboard
        </Link>
        {matchedUser.userInfo.userType === "donor" && (
          <Link
            className={`${styles["nav-items"]} ${
              currentPage === "post-food" ? styles.active : ""
            }`}
            onClick={() => handleCurrentPageChange("post-food")}
          >
            Post Food
          </Link>
        )}

        {matchedUser.userInfo.userType === "ngo" && (
          <Link
            className={`${styles["nav-items"]} ${
              currentPage === "available-donations" ? styles.active : ""
            }`}
            onClick={() => handleCurrentPageChange("available-donations")}
          >
            Available Donations
          </Link>
        )}

        <Link
          className={`${styles["nav-items"]} ${
            currentPage === "notifications" ? styles.active : ""
          }`}
          onClick={() => handleCurrentPageChange("notifications")}
        >
          Notifications
        </Link>

        {matchedUser.userInfo.userType === "donor" && (
          <Link
            className={`${styles["nav-items"]} ${
              currentPage === "donation-status" ? styles.active : ""
            }`}
            onClick={() => handleCurrentPageChange("donation-status")}
          >
            Donation Status
          </Link>
        )}

        {matchedUser.userInfo.userType === "ngo" && (
          <Link
            className={`${styles["nav-items"]} ${
              currentPage === "claim-status" ? styles.active : ""
            }`}
            onClick={() => handleCurrentPageChange("claim-status")}
          >
            Claim Status
          </Link>
        )}

        <Link
          className={`${styles["nav-items"]} ${
            currentPage === "history" ? styles.active : ""
          }`}
          onClick={() => handleCurrentPageChange("history")}
        >
          History
        </Link>

        {/* Always show Log out button */}
        <button
          type="button"
          className={styles["Log-out"]}
          onClick={hanldeLogoutbuttonClick}
        >
          Log out
        </button>
      </div>

      {/* Hamburger menu icon */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Navbar2;
