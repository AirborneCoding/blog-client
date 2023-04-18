import './create-post.css';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../redux/apiCalls/postApiCall';
import { RotatingLines } from 'react-loader-spinner';
import { fetchCategories } from '../../redux/apiCalls/categoryApiCall';

const CreatePost = () => {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((store) => store.post);
  const { categories } = useSelector((store) => store.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === '') return toast.error('Post Title is required');
    if (category.trim() === '') return toast.error('Post Category is required');
    if (description.trim() === '')
      return toast.error('Post Description is required');
    if (!file) return toast.error('Post Image is required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', file);

    // console.log({ title, category, description });
    dispatch(createPost(formData));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate('/');
    }
  }, [isPostCreated, navigate]);

  return (
    <section className='create-post'>
      <h1 className='create-post-title'>Create New Post</h1>
      <form onSubmit={formSubmitHandler} className='create-post-form'>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type='text'
          placeholder='Post Title'
          className='create-post-input'
        />
        <select
          className='create-post-input'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value=''>
            Select A Category
          </option>
          {categories.map((category) => {
            return (
              <option key={category._id} value={category.title}>
                {category.title}
              </option>
            );
          })}
        </select>
        <textarea
          className='create-post-textarea'
          placeholder='Post Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows='5'
        ></textarea>
        <input
          className='create-post-upload'
          type='file'
          name='file'
          id='file'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type='submit' className='create-post-btn'>
          {loading ? (
            <RotatingLines
              strokeColor='white'
              strokeWidth='5'
              animationDuration='0.75'
              width='30'
              visible={true}
            />
          ) : (
            'Create'
          )}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
