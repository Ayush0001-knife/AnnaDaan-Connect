import React from "react";
import YourDonationsBox from "./YourDonations.box"; // Make sure the component name matches exactly
import styles from "./donationsboxlist.module.css";
import { useSelector } from "react-redux";

function DonationBoxList() {
  const matchedUser = useSelector((store) => store.matchedUser);

  return (
    <div className={styles["donationboxes-container"]}>
      {matchedUser.userInfo.userType === "donor" ? (
        <>
          <p className={styles["heading"]}>
            {matchedUser.userActivities.length === 0
              ? "No Donations Yet"
              : "Your Donations"}
          </p>
          {matchedUser.userActivities.map((activity) => (
            <YourDonationsBox activity={activity} />
          ))}
        </>
      ) : (
        <>
          <p className={styles["heading"]}>Available Donations</p>
          <YourDonationsBox />
          <YourDonationsBox />
          <YourDonationsBox />
        </>
      )}
    </div>
  );
}

export default DonationBoxList;
