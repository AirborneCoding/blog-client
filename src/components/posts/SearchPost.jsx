import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPostsBaseOnSorting,
  fetchPostsBaseOnTitle,
} from '../../redux/apiCalls/postApiCall';
const SearchPost = () => {
  const dispatch = useDispatch();

  // search name
  const titleRef = useRef('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const fetchByTitle = useCallback(async () => {
    try {
      dispatch(fetchPostsBaseOnTitle(title));
    } catch (error) {
      console.log(error);
    }
  }, [title]);

  useEffect(() => {
    fetchByTitle();
  }, [title, fetchByTitle]);

  // sort search
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    console.log(e.target.value);
    dispatch(fetchPostsBaseOnSorting(selectedOption));
  };

  return (
    <section className='mx-4 mt-3 d-flex'>
      <form style={{ flexGrow: 4 }}>
        <div className='form-row'>
          <input
            ref={titleRef}
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='form-input'
            placeholder='Search...'
          />
        </div>
      </form>
      <select
        style={styles}
        className='rounded '
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option disabled value=''>
          Select An Option
        </option>
        <option value='createdAt'>Latest</option>
        <option value='-createdAt'>oldest</option>
        <option value='-title'>Title(A__Z)</option>
        <option value='title'>Title(Z__A)</option>
      </select>
    </section>
  );
};

const styles = {
  height: '55px',
  flexGrow: 1,
  cursor: 'pointer',
  marginLeft: '15px',
};

export default SearchPost;
