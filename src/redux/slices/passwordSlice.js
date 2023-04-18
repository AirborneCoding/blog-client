import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isError: false,
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setIsError: (state) => {
      state.isError = true;
    },
  },
});

export const { setIsError } = passwordSlice.actions;
export default passwordSlice.reducer;
