import './posts-page.css';
// import { posts } from '../../dummyData';
import SearchPost from '../../components/posts/SearchPost';
import PostList from '../../components/posts/PostList';
import Sidebar from '../../components/sidebar/Sidebar';
import Pagination from '../../components/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchPosts, getPostsCount } from '../../redux/apiCalls/postApiCall';

const POST_PER_PAGE = 3;

const PostsPage = () => {
  const dispatch = useDispatch();
  const { posts, postsCount } = useSelector((store) => store.post);

  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(postsCount / POST_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    dispatch(getPostsCount());
  }, []);

  return (
    <>
      <SearchPost />
      {posts.length === 0 ? (
        <section className='centered'>
          <h2 className='fw-bold display-2'>No Post Found</h2>
        </section>
      ) : (
        <>
          <section className='posts-page'>
            <PostList posts={posts} />
            <Sidebar />
          </section>
          <Pagination
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

export default PostsPage;
