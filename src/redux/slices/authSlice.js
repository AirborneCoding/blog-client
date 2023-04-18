import { createSlice } from '@reduxjs/toolkit';
// parse from string to js object
const userInfo = localStorage.getItem('userInfo');
const initialState = {
  user: userInfo ? JSON.parse(userInfo) : null,
  registerMessage: null,
  isEmailVerified: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.registerMessage = null;
    },
    logout: (state, action) => {
      state.user = null;
    },
    register(state, action) {
      state.registerMessage = action.payload;
    },
    setUserPhoto(state, action) {
      state.user.profilePhoto = action.payload;
    },
    setUserName(state, action) {
      state.user.username = action.payload;
    },
    setIsEmailVerified(state, action) {
      state.isEmailVerified = true;
      state.registerMessage = null;
    },
  },
});

export const {
  login,
  logout,
  register,
  setUserPhoto,
  setUserName,
  setIsEmailVerified,
} = authSlice.actions;
export default authSlice.reducer;
