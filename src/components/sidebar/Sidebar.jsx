import './sidebar.css';
import { Link } from 'react-router-dom';
// import { categories } from '../../dummyData';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '../../redux/apiCalls/categoryApiCall';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((store) => store.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  
  return (
    <div className='sidebar'>
      <h5 className='sidebar-title'>CATEGORIES</h5>
      <ul className='sidebar-links'>
        {categories.map((category) => (
          <Link
            to={`/posts/categories/${category.title}`}
            key={category._id}
            className='sidebar-link'
          >
            {category.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
