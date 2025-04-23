import { createSlice } from "@reduxjs/toolkit";

const AuthenticationMethodSlice = createSlice({
      name:"authenticationMethod",
      initialState:{
            currentMethod: "login" // <- not an object with an initialState key
          }
          ,
      reducers:{
            setAuthenticationMethod:(state,action)=>{
                  state.currentMethod = action.payload;
            }
      }
})

export const AuthenticationMethodActions = AuthenticationMethodSlice.actions;


export default AuthenticationMethodSlice;