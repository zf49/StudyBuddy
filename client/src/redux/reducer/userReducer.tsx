import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserDetail } from "../../view/Profile/Profile";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";


export interface IUser {
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

const persistConfig = {
  key: 'root',
  storage:storageSession,
}

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);



export const { storeUser } = userSlice.actions;
export default persistedReducer;
