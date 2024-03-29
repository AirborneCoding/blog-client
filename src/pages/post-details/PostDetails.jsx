import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddComment from '../../components/comments/AddComment';
import CommentList from '../../components/comments/CommentList';
// import { posts } from "../../dummyData";
import './post-details.css';
import UpdatePostModal from './UpdatePostModal';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import {
  deletePost,
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
} from '../../redux/apiCalls/postApiCall';

const PostDetails = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((store) => store.post);
  const { user } = useSelector((store) => store.auth);

  const { id } = useParams();
  const [updatePost, setUpdatePost] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePost(id));
  }, [id]);

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning('there is no file!');

    const formData = new FormData();
    formData.append('image', file);
    dispatch(updatePostImage(formData, post?._id)); //post?._id
  };

  // Delete Post Handler
  const navigate = useNavigate();
  const deletePostHandler = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this post!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  return (
    <div className='post-details'>
      <div className='post-details-image-wrapper'>
        <img
          src={file ? URL.createObjectURL(file) : post?.image?.url}
          alt={post?.user?.username}
          className='post-details-image'
        />
        {user?._id == post?.user?._id && (
          <form
            onSubmit={updateImageSubmitHandler}
            className='update-post-image-form'
          >
            <label className='update-post-image' htmlFor='file'>
              <i className='bi bi-image-fill'></i> select new image
            </label>
            <input
              style={{ display: 'none' }}
              type='file'
              name='file'
              id='file'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type='submit'>upload</button>
          </form>
        )}
      </div>
      <h1 className='post-details-title'>{post?.title}</h1>
      <div className='post-details-user-info'>
        <img
          src={post?.user.profilePhoto?.url}
          alt={post?.user?.username}
          className='post-details-user-image'
        />
        <div className='post-details-user'>
          <strong>
            <Link to={`/profile/${post?.user._id}`}>
              {post?.user?.username}
            </Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className='post-details-description'>
        {post?.description} ... Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Incidunt quis a omnis aut sit earum atque eveniet
        ratione sint animi illo id accusamus obcaecati dolore voluptatibus
        aperiam qui, provident fuga? Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Quibusdam neque odit soluta? Fugiat, dolores!
        Laboriosam rem quod, explicabo similique aliquam unde sed vel
        distinctio, fugiat ab aperiam odio nesciunt quas?
      </p>
      <div className='post-details-icon-wrapper'>
        <div>
          {user && (
            <i
              onClick={() => dispatch(toggleLikePost(post?._id))}
              className={
                post?.likes.includes(user?._id)
                  ? 'bi bi-hand-thumbs-up-fill'
                  : 'bi bi-hand-thumbs-up'
              }
            ></i>
          )}
          <small>{post?.likes.length} likes</small>
        </div>
        {user?._id === post?.user?._id && (
          <div>
            <i
              onClick={() => setUpdatePost(true)}
              className='bi bi-pencil-square'
            ></i>
            <i onClick={deletePostHandler} className='bi bi-trash-fill'></i>
          </div>
        )}
      </div>
      {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <Link to='/register'>
          <p
            className='text-secondary fw-bold fs-5'
            style={{ textDecoration: 'underline' }}
          >
            join our blog to can add your first like and comment
          </p>
        </Link>
      )}
      <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </div>
  );
};

export default PostDetails;
