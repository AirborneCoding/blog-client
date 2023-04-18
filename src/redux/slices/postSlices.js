import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  postsCate: [],
  postsCount: null,
  loading: false,
  isPostCreated: false,
  post: null, // if [] do not work
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPostsCount: (state, action) => {
      state.postsCount = action.payload;
    },
    setPostsCate: (state, action) => {
      state.postsCate = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    clearLoading: (state) => {
      state.loading = false;
    },
    setIsPostCreated: (state) => {
      state.isPostCreated = true;
      state.loading = false;
    },
    clearIsPostCreated: (state) => {
      state.isPostCreated = false;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setLike: (state, action) => {
      state.post.likes = action.payload.likes;
    },
    setDeletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    addCommentToPost: (state, action) => {
      state.post.comments.push(action.payload);
    },
    updateCommentPost: (state, action) => {
      state.post.comments = state.post.comments.map((comment) =>
        comment._id === action.payload ? action.payload : comment
      );
    },
    deleteCommentFromPost: (state, action) => {
      const comment = state.post.comments.find(
        (comment) => comment._id === action.payload
      );
      const commentIndex = state.post.comments.indexOf(comment);
      state.post.comments.splice(commentIndex, 1);
    },
  },
});

export const {
  setPosts,
  setPostsCate,
  setPostsCount,
  setLoading,
  clearLoading,
  setIsPostCreated,
  clearIsPostCreated,
  setPost,
  setLike,
  setDeletePost,
  addCommentToPost,
  updateCommentPost,
  deleteCommentFromPost,
} = postSlice.actions;
export default postSlice.reducer;
