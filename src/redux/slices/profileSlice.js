import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  updateProfile: null,
  loading: false,
  isProfileDeleted: false,
  usersCount: null,
  profiles: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setProfilePhoto: (state, action) => {
      state.profile.profilePhoto = action.payload;
    },
    setUpdateProfile: (state, action) => {
      state.profile = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    clearLoading: (state) => {
      state.loading = false;
    },
    setIsProfileDeleted: (state) => {
      state.isProfileDeleted = true;
      state.loading = false;
    },
    clearIsProfileDeleted: (state) => {
      state.isProfileDeleted = false;
    },
    setUsersCount: (state, action) => {
      state.usersCount = action.payload;
    },
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
  },
});

export const {
  setProfile,
  setLoading,
  setIsProfileDeleted,
  clearIsProfileDeleted,
  clearLoading,
  setProfilePhoto,
  setUpdateProfile,
  setUsersCount,
  setProfiles,
} = profileSlice.actions;
export default profileSlice.reducer;
