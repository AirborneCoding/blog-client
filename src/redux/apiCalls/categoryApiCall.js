import request from '../../utils/request';
import { toast } from 'react-toastify';
import {
  addCategory,
  deleteCategory,
  setCategories,
} from '../slices/categorySlice';

// fecth categories
export function fetchCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get('/api/categories');
      dispatch(setCategories(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// create category
export function createCategory(newCategory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post('/api/categories', newCategory, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        },
      });
      dispatch(addCategory(data));
      toast.success('category Craeted');
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// delete category
export function deleteCategoryApi(categoryId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        },
      });
      dispatch(deleteCategory(data.categoryId));
      toast.success(data.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}
