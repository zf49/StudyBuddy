import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserDetail } from "../../view/Profile/Profile";

interface IUser {
  user:IUserDetail|undefined
}

const initialState: IUser = {
   user:undefined
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser(state,action){
        state.user = action.payload
    }
  },
});

export const { storeUser } = userSlice.actions;
export default userSlice.reducer;
