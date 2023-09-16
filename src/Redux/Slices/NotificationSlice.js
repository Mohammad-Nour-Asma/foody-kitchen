import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noti: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, { payload }) => {
      let newArray = state.noti;
      newArray.push(payload);
      state.noti = newArray;
    },
    clear: (state) => {
      state.noti = [];
    },
  },
});

export const { addNotification, clear } = notificationSlice.actions;

export default notificationSlice.reducer;
