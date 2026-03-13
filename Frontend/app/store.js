import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload,
  },
});

export const { setUsers } = userSlice.actions;

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
});
