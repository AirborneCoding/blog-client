import { login, logout, register, setIsEmailVerified } from '../slices/authSlice';
import request from '../../utils/request';
import { toast } from 'react-toastify';

// TODO register
export function registerUser(user) {
  // anonymos function
  return async (dispatch) => {
    try {
      const { data } = await request.post('/api/auth/register', user);
      dispatch(register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// login
export function loginUser(user) {
  // anonymos function
  return async (dispatch) => {
    try {
      const { data } = await request.post('/api/auth/login', user);
      dispatch(login(data));
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// log out
export function logoutUser() {
  return async (dispatch) => {
    dispatch(logout());
    localStorage.removeItem('userInfo');
  };
}

// ? verify Email
export function verifyEmail(userId, token) {
  // anonymos function
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);
      dispatch(setIsEmailVerified());
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}
