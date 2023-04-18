import React, { useEffect } from 'react';
import './verify-email.css';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../../redux/apiCalls/authApiCall';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector((store) => store.auth);

  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [userId, token]);

  return (
    <sectio className='verify-email'>
      {isEmailVerified ? (
        <>
          <i className='bi bi-patch-check verify-email-icon'></i>
          <h1 className='verify-email-title'>
            Your Email adress has been successfuly verified
          </h1>
          <Link to='/login' className='verify-email-link'>
            Go To Login Page
          </Link>
        </>
      ) : (
        <>
          <h1 className='verify-email-not-found'>Not Found</h1>
        </>
      )}
    </sectio>
  );
};

export default VerifyEmail;
