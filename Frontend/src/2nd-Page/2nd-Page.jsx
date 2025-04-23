import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MatchedUserActions } from "../Store/matchedUser";
import Dashboard from "./DashBoard";
import Navbar2 from "./Navbar2";
import NotificationsPage from "./notifiactions";
import PostFoodPage from "./PostFoodPage";
import DonationStatusPage from "./DonationStatusPage";
import History from "./History";

const SecondPage = () => {
  const currentPage = useSelector((store) => store.currentPage.currentPage);
  const matchedUser = useSelector((store) => store.matchedUser);
  const dispatch = useDispatch();

  const handleMatchedUserActivities = () => {
    if (!matchedUser.userInfo) {
      console.error("User info not available");
      return;
    }

    if (matchedUser.userInfo.userType === "donor") {
      fetch("http://localhost:3001/donor/donations-data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch donations data");
          }
          return response.json();
        })
        .then((data) => {
          if (!data.donations) {
            throw new Error("No donations data received");
          }

          const filteredDonations = data.donations.filter(
            (donation) => donation.contact === matchedUser.userInfo.contact
          );

          console.log(
            "Filtered donations for matched user:",
            filteredDonations
          );
          dispatch(MatchedUserActions.setUserActivities(filteredDonations));
        })
        .catch((error) => {
          console.error("Error fetching donations:", error);
          dispatch(MatchedUserActions.setUserActivities([]));
        });
    }
  };

  useEffect(() => {
    if (currentPage === "dashboard") {
      handleMatchedUserActivities();
    }
  }, [currentPage]); // ✅ Reacts to page changes only

  return (
    <>
      <Navbar2 />
      {currentPage === "dashboard" && <Dashboard />}
      {currentPage === "post-food" && <PostFoodPage />}
      {currentPage === "donation-status" && (
        <DonationStatusPage userDonations={matchedUser.userActivities} />
      )}
      {currentPage === "notifications" && <NotificationsPage />}
      {currentPage === "history" && <History />}
    </>
  );
};

export default SecondPage;
