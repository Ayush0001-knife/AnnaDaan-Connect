import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import AuthenticationMethodSlice from "./AuthenticationMethod";
import CurrentPageSlice from "./CurrentPage";
import MatchedUserSlice from "./matchedUser";
import isRegisteredSlice from "./isRegistered";
import NotificationSlice from "./notifications";

// ✅ Combine reducers with consistent keys
const rootReducer = combineReducers({
  authenticationMethod: AuthenticationMethodSlice.reducer,
  currentPage: CurrentPageSlice.reducer,
  matchedUser: MatchedUserSlice.reducer,
  isRegistered: isRegisteredSlice.reducer,
  notifications: NotificationSlice.reducer, // ✅ Correct key
});

// ✅ Persist only selected slices
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["matchedUser", "isRegistered", "notifications"], // ✅ Correct key
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
