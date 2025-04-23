import { createSlice } from "@reduxjs/toolkit";

const MatchedUserSlice = createSlice({
  name: "matchedUser",
  initialState: {
    userInfo: {
      contact: "",
      name: "",
      password: "",
      userType: "",
    },
    userActivities: [],
  },
  reducers: {
    setUserInfo: (state, action) => {
      const { contact, name, password, userType } = action.payload;
      state.userInfo.contact = contact;
      state.userInfo.name = name;
      state.userInfo.password = password;
      state.userInfo.userType = userType;
    },
    resetUserInfo: (state) => {
      state.userInfo = {
        contact: "",
        name: "",
        password: "",
        userType: "",
      };
      state.userActivities = [];
    },
  },
});

export const MatchedUserActions = MatchedUserSlice.actions;

export default MatchedUserSlice;
