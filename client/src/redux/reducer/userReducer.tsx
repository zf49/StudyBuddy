import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  userID: string;
}

const initialState: IUserState = {
  userID:"",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserID(state,action){
        state.userID = action.payload
    }
  },
});

export const { setUserID } = userSlice.actions;
export default userSlice.reducer;
