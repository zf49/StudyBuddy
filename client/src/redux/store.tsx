import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "./reducer/userReducer";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {

    //define reducer here
    storeUser:persistedReducer
  },
  middleware: (getDefaultMiddleware) => {
    // define middleware
    return getDefaultMiddleware();
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
