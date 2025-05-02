import { createSlice } from "@reduxjs/toolkit";

const MatchedUserSlice = createSlice({
  name: "matchedUser",
  initialState: {
    userInfo: {
      contact: "",
      name: "",
      password: "",
      userType: "",
      city: "",
    },
    userActivities: [],
  },
  reducers: {
    setUserInfo: (state, action) => {
      const { contact, name, password, userType ,city} = action.payload;
      state.userInfo.contact = contact;
      state.userInfo.name = name;
      state.userInfo.password = password;
      state.userInfo.userType = userType;
      state.userInfo.city = city;
    },
    resetUserInfo: (state) => {
      state.userInfo = {
        contact: "",
        name: "",
        password: "",
        userType: "",
        city:"",
      };
      state.userActivities = [];
    },
    setUserActivities: (state, action) => {
      state.userActivities = action.payload;
    },
  },
});

export const MatchedUserActions = MatchedUserSlice.actions;
export default MatchedUserSlice;
