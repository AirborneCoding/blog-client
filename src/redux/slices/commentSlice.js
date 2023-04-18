import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    deleteComments: (state, action) => {
      state.comments = state.comments.filter((c) => c._id !== action.payload);
    },
  },
});

export const { setComments, deleteComments } = commentSlice.actions;
export default commentSlice.reducer;
