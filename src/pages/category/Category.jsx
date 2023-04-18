import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostList from '../../components/posts/PostList';
// import { posts } from '../../dummyData';
import './category.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsBaseOnCategory } from '../../redux/apiCalls/postApiCall';
const Category = () => {
  const dispatch = useDispatch();
  const { postsCate } = useSelector((store) => store.post);
  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchPostsBaseOnCategory(category));
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className='category'>
      {postsCate.length === 0 ? (
        <>
          <h1 className='category-not-found'>
            Posts with <span>{category}</span> catgory not found
          </h1>
          <Link to='/posts' className='category-not-found-link'>
            Go to posts page
          </Link>
        </>
      ) : (
        <>
          <h1 className='category-title'>Posts based on {category}</h1>
          <PostList posts={postsCate} />
        </>
      )}
    </section>
  );
};

export default Category;
