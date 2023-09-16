import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./Slices/NotificationSlice";

const store = configureStore({
  reducer: { notification: notificationReducer },
});

export default store;
