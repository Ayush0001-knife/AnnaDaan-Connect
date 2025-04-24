import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaWeightHanging } from "react-icons/fa";
import { CgSandClock } from "react-icons/cg";
import { GrCircleInformation } from "react-icons/gr";
import styles from "./yourdonationsbox.module.css";

function YourDonationsBox({ activity }) {
  const matchedUser = useSelector((store) => store.matchedUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    type: activity?.type || "",
    quantity: activity?.quantity || "",
    expiration: activity?.expiration || "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if the data has changed
    const originalData = {
      type: activity?.type || "",
      quantity: activity?.quantity || "",
      expiration: activity?.expiration || "",
    };

    const isDataUnchanged =
      originalData.type === formData.type &&
      String(originalData.quantity) === String(formData.quantity) &&
      String(originalData.expiration) === String(formData.expiration);

    if (isDataUnchanged) {
      // No changes, just close the form
      console.log("No changes detected. Skipping update.");
      setIsEditing(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/donor/update-donations`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          contact: matchedUser.userInfo.contact,
        }),
      });
      if (!res.ok) throw new Error("Failed to update donation");
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      console.error("Error updating donation:", err);
    }

    window.location.reload();
  };

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

  const parsePostTiming = (str) => {
    const [datePart, timePart] = str.split(", ");
    const [day, month, year] = datePart
      .split("/")
      .map((s) => s.padStart(2, "0"));
    return new Date(`${year}-${month}-${day}T${timePart}`);
  };

  const getExpirationStatus = () => {
    try {
      const postDate = parsePostTiming(activity.postTiming);
      const expirationMs = activity.expiration * 60 * 60 * 1000;
      const timeLeft = postDate.getTime() + expirationMs - Date.now();
      if (timeLeft <= 0) return "Expired";
      const hours = Math.floor(timeLeft / 3_600_000);
      const minutes = Math.floor((timeLeft % 3_600_000) / 60_000);
      return `${hours}h ${minutes}m left`;
    } catch {
      return "Invalid time";
    }
  };

  if (!activity) {
    return <div className={styles.box}>No donation data available.</div>;
  }

  return (
    <div className={styles.box}>
      {!isEditing ? (
        <>
          <div className={styles.name}>
            <MdOutlineAccountCircle />
            <div className={styles["person-name"]}>{activity.name}</div>
          </div>

          <div className={styles.props}>
            <div className={styles.type}>{activity.type}</div>
            <div className={styles.details}>
              <div className={styles.qty}>
                <FaWeightHanging className={styles["qty-icon"]} />
                <div className={styles["qty-name"]}>
                  Quantity : {activity.quantity} kg
                </div>
              </div>
              <div className={styles.expiry}>
                <CgSandClock className={styles["expiry-icon"]} />
                <div className={styles["expiry-name"]}>
                  Expires in : {getExpirationStatus()}
                </div>
              </div>
              <div className={styles.status}>
                <GrCircleInformation className={styles["status-icon"]} />
                <div className={styles["status-name"]}>
                  Status : {activity.status}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.btns}>
            {matchedUser.userInfo.userType === "donor" && (
              <>
                <button
                  type="button"
                  className={styles["view-details"]}
                  onClick={() => setIsEditing(true)}
                >
                  Update Details
                </button>
                <button
                  type="button"
                  className={styles.claim}
                  onClick={handleRemoveFoodPost}
                >
                  Remove
                </button>
              </>
            )}
            {matchedUser.userInfo.userType !== "donor" && (
              <button type="button" className={styles.claim}>
                Claim Donation
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <form className={styles.updateForm} onSubmit={handleFormSubmit}>
            <h3>Update Donation Details</h3>
            <div className={styles.formGroup}>
              <label>Food Type:</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="">Select food type</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="desserts">Desserts</option>
                <option value="beverages">Beverages</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Quantity (kg):</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Expiration (hours):</label>
              <input
                type="number"
                value={formData.expiration}
                onChange={(e) =>
                  setFormData({ ...formData, expiration: e.target.value })
                }
              />
            </div>
            <div className={styles.formButtons}>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default YourDonationsBox;
