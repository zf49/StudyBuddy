import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";

const store = configureStore({
  reducer: {

    //define reducer here
    userID:userReducer
  },
  middleware: (getDefaultMiddleware) => {
    // define middleware
    return getDefaultMiddleware();
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
