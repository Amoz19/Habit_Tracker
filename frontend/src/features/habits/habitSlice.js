import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedHabitId: null,
  isComplete: null,
};

export const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addSelectHabitId: (state, action) => {
      state.selectedHabitId = action.payload.habitId;
      state.isComplete = action.payload.isComplete;
    },
  },
});

export const { addSelectHabitId } = habitsSlice.actions;
export default habitsSlice.reducer;
