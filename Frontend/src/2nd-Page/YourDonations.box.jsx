import React from "react";
import { useSelector } from "react-redux";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaWeightHanging } from "react-icons/fa";
import { CgSandClock } from "react-icons/cg";
import { GrCircleInformation } from "react-icons/gr";
import styles from "./yourdonationsbox.module.css";

function YourDonationsBox({ activity }) {
  const matchedUser = useSelector((store) => store.matchedUser);

  // If no activity data, show a placeholder
  if (!activity) {
    return <div className={styles.box}>No donation data available.</div>;
  }

  // Helper to parse "dd/mm/yyyy, hh:mm:ss" into a Date object
  const parsePostTiming = (postTimingStr) => {
    const [datePart, timePart] = postTimingStr.split(", ");
    const [day, month, year] = datePart
      .split("/")
      .map((s) => s.padStart(2, "0"));
    return new Date(`${year}-${month}-${day}T${timePart}`);
  };

  // Compute how much time is left until expiration
  const getExpirationStatus = () => {
    try {
      const postDate = parsePostTiming(activity.postTiming);
      if (isNaN(postDate.getTime())) return "Invalid post time";

      const expirationMs = activity.expiration * 60 * 60 * 1000;
      const timeLeft = postDate.getTime() + expirationMs - Date.now();

      if (timeLeft <= 0) return "Expired";

      const hours = Math.floor(timeLeft / 3_600_000);
      const minutes = Math.floor((timeLeft % 3_600_000) / 60_000);
      return `${hours}h ${minutes}m left`;
    } catch {
      return "Error calculating expiry";
    }
  };

  // Handler to delete this donation (only donors can)
  const handleRemoveFoodPost = async () => {
    if (matchedUser.userInfo.userType !== "donor") return;

    try {
      const res = await fetch(
        `http://localhost:3001/donor/remove-donations/${activity._id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to remove donation");
      window.location.reload();
    } catch (err) {
      console.error("Error removing donation:", err);
    }
  };

  return (
    <div className={styles.box}>
      {/* Donor / Recipient Name */}
      <div className={styles.name}>
        <div className={styles.icon}>
          <MdOutlineAccountCircle />
        </div>
        <div className={styles["person-name"]}>{activity.name}</div>
      </div>

      {/* Donation Details */}
      <div className={styles.props}>
        <div className={styles.type}>{activity.type}</div>
        <div className={styles.details}>
          <div className={styles.qty}>
            <div className={styles["qty-icon"]}>
              <FaWeightHanging />
            </div>
            <div className={styles["qty-name"]}>
              Quantity: {activity.quantity} kg
            </div>
          </div>
          <div className={styles.expiry}>
            <div className={styles["expiry-icon"]}>
              <CgSandClock />
            </div>
            <div className={styles["expiry-name"]}>
              Expires: {getExpirationStatus()}
            </div>
          </div>
          <div className={styles.status}>
            <div className={styles["status-icon"]}>
              <GrCircleInformation />
            </div>
            <div className={styles["status-name"]}>
              Status: {activity.status}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.btns}>
        <button type="button" className={styles["view-details"]}>
          {matchedUser.userInfo.userType === "donor"
            ? "Update Details"
            : "View Details"}
        </button>
        {matchedUser.userInfo.userType === "donor" && (
          <button
            type="button"
            className={styles.claim}
            onClick={handleRemoveFoodPost}
          >
            Remove
          </button>
        )}
        {matchedUser.userInfo.userType !== "donor" && (
          <button type="button" className={styles.claim}>
            Claim Donation
          </button>
        )}
      </div>
    </div>
  );
}

export default YourDonationsBox;
