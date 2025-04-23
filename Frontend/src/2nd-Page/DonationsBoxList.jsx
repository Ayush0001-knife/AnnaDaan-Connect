import React from "react";
import YourDonationsBox from "./YourDonations.box"; // Make sure the component name matches exactly
import styles from "./donationsboxlist.module.css";
import { useSelector } from "react-redux";

function DonationBoxList() {
  const matchedUser = useSelector((store) => store.matchedUser);

  return (
    <div className={styles["donationboxes-container"]}>
      <p className={styles["heading"]}>
        {matchedUser.userInfo.userType === "donor"
          ? "Your Donations"
          : "Available Donations"}
      </p>
      <YourDonationsBox />
      <YourDonationsBox />
      <YourDonationsBox />
      {/* Add more YourDonationsBox components as needed */}
    </div>
  );
}

export default DonationBoxList;
