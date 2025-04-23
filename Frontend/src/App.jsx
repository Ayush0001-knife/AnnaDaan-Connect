import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { MatchedUserActions } from "./Store/matchedUser";
import { isRegisteredActions } from "./Store/isRegistered";
import Footer from "./1st-Page/Footer";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Reset matchedUser and isRegistered state when at the root path
  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(MatchedUserActions.resetUserInfo());
      dispatch(isRegisteredActions.resetIsRegistered()); // Reset registration status
    }
  }, [location.pathname, dispatch]);

  // Handle logout manually
  const handleLogout = () => {
    dispatch(MatchedUserActions.resetUserInfo());
    dispatch(isRegisteredActions.resetIsRegistered());
    navigate("/"); // Redirect to home or login page
  };

  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
