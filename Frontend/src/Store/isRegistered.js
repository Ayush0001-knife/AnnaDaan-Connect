import { createSlice } from "@reduxjs/toolkit";

const isRegisteredSlice = createSlice({
  name: "isRegistered",
  initialState: false, // Default value indicating the user is not registered
  reducers: {
    setisRegistered: (state, action) => action.payload, // Sets registration status
    resetIsRegistered: () => false, // Resets to false when logging out
  },
});

export const isRegisteredActions = isRegisteredSlice.actions;

export default isRegisteredSlice;
