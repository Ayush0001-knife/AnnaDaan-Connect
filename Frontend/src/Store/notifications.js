import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
  name: "notifications", // ✅ Corrected spelling
  initialState: {
    notifications: [],
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const NotificationsActions = NotificationSlice.actions;
export default NotificationSlice;
