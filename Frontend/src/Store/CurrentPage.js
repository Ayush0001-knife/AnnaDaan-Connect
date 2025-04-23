import { createSlice } from "@reduxjs/toolkit";

const CurrentPageSlice = createSlice({
      name:"currentPage",
      initialState:{
            currentPage: "dashboard"
          }
          ,
      reducers:{
            setCurrentPage:(state,action)=>{
                  state.currentPage = action.payload;
            }
      }
})

export const CurrentPageActions = CurrentPageSlice.actions;


export default CurrentPageSlice;