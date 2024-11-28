import { createSlice } from '@reduxjs/toolkit';

interface BottomSheetState {
  isVisible: boolean;
}

const initialState: BottomSheetState = {
  isVisible: false,
};

const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    openBottomSheet: (state) => {
      state.isVisible = true;
    },
    closeBottomSheet: (state) => {
      state.isVisible = false;
    },
  },
});

export const { openBottomSheet, closeBottomSheet } = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;