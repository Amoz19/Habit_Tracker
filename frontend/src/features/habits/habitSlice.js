import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const habitsAdapter = createEntityAdapter({
  selectId: (e) => e._id,
});
const initialState = habitsAdapter.getInitialState();

export const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    // getAllHabits: habitsAdapter.getSelectors,
  },
});

export const { selectAll } = habitsAdapter.getSelectors(
  (state) => state.products
);

// export const { getAllHabits } = habitsSlice.actions;
export default habitsSlice.reducer;
