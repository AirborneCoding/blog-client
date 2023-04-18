import request from '../../utils/request';
import { toast } from 'react-toastify';
import { setIsError } from '../slices/passwordSlice';

// forgot password
export function forgotPassword(email) {
  return async () => {
    try {
      const { data } = await request.post('/api/password/reset-password-link', {
        email,
      });
      toast.success(data.message);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
}

// get reset password
export function getResetPassword(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/password/reset-password/${userId}/${token}`);
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(setIsError());
    }
  };
}

// send reseted password
export function resetPassword(newPassword, user) {
  return async () => {
    try {
      const { data } = await request.post(
        `/api/password/reset-password/${user.userId}/${user.token}`,
        { password: newPassword }
      );
      toast.success(data.message);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
}
