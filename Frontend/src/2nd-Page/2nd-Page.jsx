import Dashboard from "./DashBoard";
import Navbar2 from "./Navbar2";
import { useSelector } from "react-redux";
import NotificationsPage from "./notifiactions";
import PostFoodPage from "./PostFoodPage";
import DonationStatusPage from "./DonationStatusPage";
import History from "./History";

const SecondPage = () => {
  const currentPage = useSelector((store) => store.currentPage.currentPage);

  return (
    <>
      <Navbar2 />

      {currentPage === "dashboard" && <Dashboard />}
      {currentPage === "post-food" && <PostFoodPage />}
      {currentPage === "donation-status" && <DonationStatusPage />}
      {currentPage === "notifications" && <NotificationsPage />}
      {currentPage === "history" && <History />}
    </>
  );
};

export default SecondPage;
