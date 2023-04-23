import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserDetail } from "../../view/Profile/Profile";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";



interface IUserState {
  userList: IUserDetail[];
}

const initialState:IUserState = {
  userList: [],
};


const userSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    storeUser(state,action){
        state.userList = action.payload
    }
  },
});

const persistConfig = {
  key: 'root',
  storage:storageSession,
}

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const { storeUser } = userSlice.actions;
export default persistedReducer;
// export default userSlice.reducer;
