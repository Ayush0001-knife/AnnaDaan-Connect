import React from "react";
import styles from "./about2.module.css";
import { ImSpoonKnife } from "react-icons/im";
import { FaClock } from "react-icons/fa6";
import { FaHandsPraying } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { CurrentPageActions } from "../Store/CurrentPage";
import { useDispatch } from "react-redux";

const About2 = () => {
  const matchedUser = useSelector((store) => store.matchedUser);
  const dispatch = useDispatch();

  const handlePostFood = (page) => {
    dispatch(CurrentPageActions.setCurrentPage(page));
  };

  const hanldeNgoActivitiesClick = () => {
    alert("Work In progress");
  };

  const testing = () => {
    console.log(matchedUser.userActivities);
  };

  return (
    <>
      <div className={styles["about-container"]}>
        <div
          className={styles["welcome"]}
          onClick={() => console.log(matchedUser)}
        >
          <p>
            Welcome{" "}
            <span className={styles["user"]}>{matchedUser.userInfo.name}</span>{" "}
            to AnnaDaan Connect
          </p>
        </div>
        <div className={styles["mission"]} onClick={testing}>
          <p>
            Join our mission to reduce food waste by connecting surplus food to
            those in need. Post available food donations or claim available ones
            today.
          </p>
        </div>
        <div className={styles["buttons"]}>
          <button
            type="button"
            className={styles["btn1"]}
            onClick={() => handlePostFood("post-food")}
          >
            {matchedUser.userInfo.userType === "donor"
              ? "Post Surplus Food"
              : "Available Donations"}
          </button>
          <button
            type="button"
            className={styles["btn2"]}
            onClick={hanldeNgoActivitiesClick}
          >
            {matchedUser.userInfo.userType === "donor"
              ? "See Ngos Activities"
              : "See other Ngos Activities"}
          </button>
        </div>
      </div>

      <div className={styles["stats"]} id="donations-section">
        <div
          className={`${styles["stats-box"]} ${styles["hover-shadow"]} ${styles["transition-shadow"]}`}
        >
          <div className={styles["relative"]}>
            <ImSpoonKnife
              className={`${styles["icon-green"]} ${styles["text-4xl"]} ${styles["mb-3"]} ${styles["transform"]} ${styles["transition-transform"]} ${styles["hover-scale-110"]}`}
            />
            <div
              className={`${styles["absolute"]} ${styles["-top-2"]} ${styles["-right-2"]} ${styles["w-4"]} ${styles["h-4"]} ${styles["bg-green-500"]} ${styles["rounded-full"]} ${styles["animate-pulse"]}`}
            ></div>
          </div>
          <h3
            className={`${styles["text-22px"]} ${styles["font-bold"]} ${styles["mb-2"]}`}
          >
            {matchedUser.userInfo.userType === "donor"
              ? "Your Total Donations"
              : "Your Total Claims"}
          </h3>
          <p
            className={`${styles["text-36px"]} ${styles["text-green-600"]} ${styles["font-bold"]} ${styles["mb-2"]}`}
          >
            <span
              className={`${styles["counter"]} ${styles["text-green-600"]}`}
            >
              _ _ _ _
            </span>
          </p>
          <p
            className={`${styles["text-18px"]} ${styles["text-gray-600"]} ${styles["leading-tight"]}`}
          >
            {matchedUser.userInfo.userType === "donor"
              ? "Food donations shared through our platform"
              : "Food donations claimed through our platform"}
          </p>
        </div>

        <div
          className={`${styles["stats-box"]} ${styles["hover-shadow"]} ${styles["transition-shadow"]}`}
        >
          <div className={styles["relative"]}>
            <FaHandsPraying
              className={`${styles["icon-orange"]} ${styles["text-4xl"]} ${styles["mb-3"]} ${styles["transform"]} ${styles["transition-transform"]} ${styles["hover-scale-110"]}`}
            />
            <div
              className={`${styles["absolute"]} ${styles["-top-2"]} ${styles["-right-2"]} ${styles["w-4"]} ${styles["h-4"]} ${styles["bg-orange-400"]} ${styles["rounded-full"]} ${styles["animate-pulse"]}`}
            ></div>
          </div>
          <h3
            className={`${styles["text-22px"]} ${styles["font-bold"]} ${styles["mb-2"]}`}
          >
            {matchedUser.userInfo.userType === "donor"
              ? "NGOs Served"
              : "People Served"}
          </h3>
          <p
            className={`${styles["text-36px"]} ${styles["text-orange-400"]} ${styles["font-bold"]} ${styles["mb-2"]}`}
          >
            <span
              className={`${styles["counter"]} ${styles["text-green-600"]}`}
            >
              _ _ _ _
            </span>
          </p>
          <p
            className={`${styles["text-18px"]} ${styles["text-gray-600"]} ${styles["leading-tight"]}`}
          >
            {matchedUser.userInfo.userType === "donor"
              ? "Organizations benefited from your generosity"
              : "People who received food through your service"}
          </p>
        </div>

        <div
          className={`${styles["stats-box"]} ${styles["hover-shadow"]} ${styles["transition-shadow"]}`}
        >
          <div className={styles["relative"]}>
            <FaClock
              className={`${styles["icon-green"]} ${styles["text-4xl"]} ${styles["mb-3"]} ${styles["transform"]} ${styles["transition-transform"]} ${styles["hover-scale-110"]}`}
            />
            <div
              className={`${styles["absolute"]} ${styles["-top-2"]} ${styles["-right-2"]} ${styles["w-4"]} ${styles["h-4"]} ${styles["bg-green-500"]} ${styles["rounded-full"]} ${styles["animate-pulse"]}`}
            ></div>
          </div>
          <h3
            className={`${styles["text-22px"]} ${styles["font-bold"]} ${styles["mb-2"]}`}
          >
            Average Response Time
          </h3>
          <p
            className={`${styles["text-36px"]} ${styles["text-green-600"]} ${styles["font-bold"]} ${styles["mb-2"]}`}
          >
            <span
              className={`${styles["counter"]} ${styles["text-green-600"]}`}
            >
              _ _ _ _
            </span>{" "}
            min
          </p>
          <p
            className={`${styles["text-18px"]} ${styles["text-gray-300"]} ${styles["leading-tight"]} ${styles["mt-3"]}`}
          >
            Quick response from post to pickup
          </p>
        </div>
      </div>
    </>
  );
};

export default About2;
