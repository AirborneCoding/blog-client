import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { logoutUser } from '../../redux/apiCalls/authApiCall';


const getStorageTheme = () => {
  let theme = 'light-theme';
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  }
  return theme;
};

const HeaderRight = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [dropDown, setDropDown] = useState(false);

  // logout
  const logoutHandler = () => {
    setDropDown(false);
    dispatch(logoutUser());
  };



  return (
    <div className='header-right'>
      {user ? (
        <>
          <div className='header-right-user-info'>
            <span
              onClick={() => setDropDown(!dropDown)}
              className='header-right-username'
            >
              {user?.username}
            </span>
            <img
              src={user?.profilePhoto.url}
              alt={user?.username}
              className='header-right-user-photo'
            />
            {dropDown && (
              <div className='header-right-dropdown'>
                <Link
                  to={`/profile/${user?._id}`}
                  className='header-dropdown-item'
                  onClick={() => setDropDown(false)}
                >
                  <i className='bi bi-file-person'></i>
                  <span>Profile</span>
                </Link>
                <div className='header-dropdown-item text-danger'>
                  <i className='bi bi-box-arrow-in-left'></i>
                  <span onClick={logoutHandler}>Log-out</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link className='header-right-link' to='/login'>
            <i className='bi bi-box-arrow-in-right'></i>
            <span>Login</span>
          </Link>
          <Link className='header-right-link' to='/register'>
            <i className='bi bi-person-plus'></i>
            <span>Register</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
