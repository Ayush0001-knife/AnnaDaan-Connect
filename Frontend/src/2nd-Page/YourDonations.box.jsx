import React from "react";
import styles from "./yourdonationsbox.module.css";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaWeightHanging } from "react-icons/fa";
import { CgSandClock } from "react-icons/cg";
import { GrCircleInformation } from "react-icons/gr";
import { useSelector } from "react-redux";

function YourDonationsBox() {
  const matchedUser = useSelector((store) => store.matchedUser);

  return (
    <div className={styles["box"]}>
      <div className={styles["name"]}>
        <div className={styles["icon"]}>
          <MdOutlineAccountCircle />
        </div>
        <div className={styles["person-name"]}>_ _ _ _ _ _ _ </div>
      </div>

      <div className={styles["props"]}>
        <div className={styles["type"]}>_ _ _ _ _ _ </div>

        <div className={styles["details"]}>
          <div className={styles["qty"]}>
            <div className={styles["qty-icon"]}>
              <FaWeightHanging />
            </div>
            <div className={styles["qty-name"]}>Quantity: _ _ _ kg</div>
          </div>

          <div className={styles["expiry"]}>
            <div className={styles["expiry-icon"]}>
              <CgSandClock />
            </div>
            <div className={styles["expiry-name"]}>Expires: _ _ _ _ left</div>
          </div>

          <div className={styles["status"]}>
            <div className={styles["status-icon"]}>
              <GrCircleInformation />
            </div>
            <div className={styles["status-name"]}>Status: _ _ _ _ _</div>
          </div>
        </div>
      </div>

      <div className={styles["btns"]}>
        <button type="button" className={styles["view-details"]}>
          {matchedUser.userInfo.userType === "donor"
            ? "Update Details"
            : "View Details"}
        </button>
        <button type="button" className={styles["claim"]}>
          {matchedUser.userInfo.userType === "donor"
            ? "Remove "
            : "Claim Donation"}
        </button>
      </div>
    </div>
  );
}

export default YourDonationsBox;
