import { useSelector } from "react-redux";
import NotificationBox from "./Notification-Box";

const NotificationList = () => {
  const notifications = useSelector(
    (store) => store.notifications.notifications // ✅ Correct reference
  );

  console.log(notifications);

  return (
    <>
      {notifications.map((notification) => (
        <NotificationBox key={notification._id} donations={notification} />
      ))}
    </>
  );
};

export default NotificationList;
