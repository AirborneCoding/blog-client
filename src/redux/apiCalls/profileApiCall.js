import {
  clearLoading,
  setIsProfileDeleted,
  setLoading,
  setProfile,
  setProfilePhoto,
  setProfiles,
  setUpdateProfile,
  setUsersCount,
} from '../slices/profileSlice';
import { setUserPhoto, setUserName } from '../slices/authSlice';
import request from '../../utils/request';
import { toast } from 'react-toastify';

// get user profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);
      dispatch(setProfile(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// upload profile photo , here we tell server that we send form-data
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    const token = getState().auth.user.token;
    try {
      const { data } = await request.post(
        `/api/users/profile/profile-photo-upload`,
        newPhoto,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      dispatch(setProfilePhoto(data.profilePhoto));
      dispatch(setUserPhoto(data.profilePhoto));
      // modify user in local storage
      const user = JSON.parse(localStorage.getItem('userInfo'));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem('userInfo', JSON.stringify(user));
      toast.success(data.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// update user
export function updateProfile(userId, profile) {
  return async (dispatch, getState) => {
    const token = getState().auth.user.token;
    try {
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        profile,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch(setUpdateProfile(data));
      dispatch(setUserName(data.username));
      // modify user in local storage
      const user = JSON.parse(localStorage.getItem('userInfo'));
      user.username = data?.username;
      localStorage.setItem('userInfo', JSON.stringify(user));
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
}

// delete Profile (account)
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    const token = getState().auth.user.token;
    try {
      dispatch(setLoading());
      const { data } = await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(setIsProfileDeleted());
      // data?.message
      toast.success('profile deleted');
      setTimeout(() => dispatch(clearLoading()), 2000);
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(clearLoading());
    }
  };
}

// get users count (admin dashboard)
export function getUsersCount() {
  return async (dispatch, getState) => {
    const token = getState().auth.user.token;
    try {
      dispatch(setLoading());
      const { data } = await request.get(`/api/users/count`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(setUsersCount(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// get all users profiles (admin dashboard)
export function getAllUsersProfile() {
  return async (dispatch, getState) => {
    const token = getState().auth.user.token;
    try {
      dispatch(setLoading());
      const { data } = await request.get(`/api/users/profile`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(setProfiles(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}
