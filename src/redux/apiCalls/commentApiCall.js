import request from '../../utils/request';
import { toast } from 'react-toastify';
import {
  addCommentToPost,
  deleteCommentFromPost,
  updateCommentPost,
} from '../slices/postSlices';
import { deleteComments, setComments } from '../slices/commentSlice';

// create comment
export function createComment(newComment) {
  return async (dispatch, getState) => {
    const token = getState().auth.user.token;
    try {
      const { data } = await request.post(`/api/comments`, newComment, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(addCommentToPost(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// update comment
export function updateComment(commentId, newComment) {
  return async (dispatch, getState) => {
    const token = getState().auth.user.token;
    try {
      const { data } = await request.put(
        `/api/comments/${commentId}`,
        newComment,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch(updateCommentPost(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// delete comment
export function deleteComment(commentId) {
  return async (dispatch, getState) => {
    const token = getState().auth.user.token;
    try {
      await request.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(deleteComments(commentId));
      dispatch(deleteCommentFromPost(commentId));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// fetch all comment
export function fetchAllComment() {
  return async (dispatch, getState) => {
    const token = getState().auth.user.token;
    try {
      const { data } = await request.get(`/api/comments`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(setComments(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}
