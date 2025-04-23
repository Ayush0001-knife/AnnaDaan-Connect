import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import AuthenticationMethodSlice from "./AuthenticationMethod";
import CurrentPageSlice from "./CurrentPage";
import MatchedUserSlice from "./matchedUser";
import isRegisteredSlice from "./isRegistered";

// Combine Reducers
const rootReducer = combineReducers({
  authenticationMethod: AuthenticationMethodSlice.reducer,
  currentPage: CurrentPageSlice.reducer,
  matchedUser: MatchedUserSlice.reducer,
  isRegistered: isRegisteredSlice.reducer,
});

// Set up persistence for specific slices
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["matchedUser", "isRegistered"], // Persist only these two slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
