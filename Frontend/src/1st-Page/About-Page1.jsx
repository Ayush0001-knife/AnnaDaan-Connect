import styles from "./about-page1.module.css";
import { ImSpoonKnife } from "react-icons/im";
import { FaClock } from "react-icons/fa6";
import { FaHandsPraying } from "react-icons/fa6";
import LogInPage from "../Authentication/Authentication-Components/LogIn-page";
import RegisterPage from "../Authentication/Authentication-Components/Register-page";
import { useSelector } from "react-redux";

const AboutPage1 = () => {
  const AuthenticationMethod = useSelector(
    (store) => store.authenticationMethod
  );

  return (
    <>
      <div className={`${styles["about-container"]}`}>
        <div className={`${styles["welcome"]}`}>
          <p>Welcome to AnnaDaan Connect</p>
        </div>
        <div className={`${styles["mission"]}`}>
          <p>
            Join our mission to reduce food waste by connecting surplus food to
            those in need. Post available food donations or claim available ones
            today.
          </p>
        </div>
      </div>
      {AuthenticationMethod.currentMethod === "login" ? (
        <LogInPage />
      ) : (
        <RegisterPage />
      )}
      <div className={`${styles["stats"]}`} id="donations-section">
        <div className={`${styles["stats-box"]}`}>
          <ImSpoonKnife className={styles["icon-green"]} />

          <p className="text-[20px] font-semibold "> Total Donations</p>

          <p className="text-[30px] text-green-600">1,248</p>
          <p className="text-[18px] text-gray-500">
            Food donations shared through our platform
          </p>
        </div>

        <div className={`${styles["stats-box"]}`}>
          <FaHandsPraying className={styles["icon-orange"]} />
          <p className="text-[20px] font-semibold "> NGOs Served</p>

          <p className="text-[30px] text-orange-400">73</p>
          <p className="text-[18px] text-gray-500">
            Organizations receiving food donations
          </p>
        </div>
        <div className={`${styles["stats-box"]}`}>
          <FaClock className={styles["icon-green"]} />
          <p className="text-[20px] font-semibold "> Average Claim Time</p>
          <p className="text-[30px] text-green-600">38 min</p>
          <p className="text-[18px] text-gray-500">
            From posting to pickup arrangement
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage1;
