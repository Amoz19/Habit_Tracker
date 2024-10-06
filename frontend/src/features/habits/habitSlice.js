import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const habitsAdapter = createEntityAdapter();
const initialState = habitsAdapter.getInitialState();

export const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    // getAllHabits: habitsAdapter.getSelectors,
  },
});

// export const { getAllHabits } = habitsSlice.actions;
export default habitsSlice.reducer;
