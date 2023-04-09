import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserDetail } from "../../view/Profile/Profile";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";


export interface IIsRegister {
  isRegister:boolean
}

const initialState: IIsRegister = {
  isRegister:false

};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser(state,action){
        state.isRegister = action.payload
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
