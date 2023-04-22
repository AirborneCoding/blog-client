import { toast } from 'react-toastify';
import {
  clearIsPostCreated,
  clearLoading,
  setDeletePost,
  setIsPostCreated,
  setLike,
  setLoading,
  setPost,
  setPosts,
  setPostsCate,
  setPostsCount,
} from '../slices/postSlices';
import request from '../../utils/request';
// fetch all posts
export function fetchAllPosts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts`);
      dispatch(setPosts(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// fetch posts based on page number
export function fetchPosts(page) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?pageNumber=${page}`);
      dispatch(setPosts(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// get posts count
export function getPostsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/count`);
      dispatch(setPostsCount(data));
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
}

// fetch posts based on category
export function fetchPostsBaseOnCategory(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?category=${category}`);
      dispatch(setPostsCate(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// fetch posts based on title
export function fetchPostsBaseOnTitle(title) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?title=${title}`);
      dispatch(setPosts(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// fetch posts based on sorting
export function fetchPostsBaseOnSorting(sort) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?sort=${sort}`);
      dispatch(setPosts(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// create post
export function createPost(newPost) {
  return async (dispatch, getState) => {
    const token = getState().auth.user.token;
    try {
      dispatch(setLoading());
      await request.post(
        `/api/posts`,
        newPost,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // if still true can not open create post anymore
      dispatch(setIsPostCreated());
      setTimeout(() => dispatch(clearIsPostCreated()), 2000);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      dispatch(clearLoading());
    }
  };
}

// fetch single post
export function fetchSinglePost(postId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/${postId}`);
      dispatch(setPost(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// toggle likes
export function toggleLikePost(postId) {
  return async (dispatch, getState) => {
    const token = getState().auth.user.token;
    try {
      const { data } = await request.put(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch(setLike(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// update post image
export function updatePostImage(newImage, postId) {
  return async (dispatch, getState) => {
    const token = getState().auth.user.token;
    try {
      await request.put(`/api/posts/update-image/${postId}`, newImage, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('image updated successfully');
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// update post
export function updatePost(newPost, postId) {
  return async (dispatch, getState) => {
    const token = getState().auth.user.token;
    try {
      const { data } = await request.put(`/api/posts/${postId}`, newPost, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(setPost(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

// delete post
export function deletePost(postId) {
  return async (dispatch, getState) => {
    const token = getState().auth.user.token;
    try {
      const { data } = await request.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      dispatch(setDeletePost(data.postId));
      toast.success(data.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}
