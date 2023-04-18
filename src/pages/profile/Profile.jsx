import './profile.css';
// import { posts } from '../../dummyData';
import { useEffect, useState } from 'react';
import UpdateProfileModal from './UpdateProfileModal';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from '../../redux/apiCalls/profileApiCall';
import PostItem from '../../components/posts/PostItem';
import { Oval } from 'react-loader-spinner';
import { logoutUser } from '../../redux/apiCalls/authApiCall';
// import {logou}

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(
    (store) => store.profile
  );
  const { user } = useSelector((store) => store.auth);

  const [updateProfile, setUpdateProfile] = useState(false);
  const [file, setFile] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [id]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning('there is no file!');

    const formData = new FormData();
    formData.append('image', file);
    dispatch(uploadProfilePhoto(formData));
  };

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover your account!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isProfileDeleted) {
      navigate('/');
    }
  }, [isProfileDeleted, navigate]);

  // if (loading) {
  //   return (
  //     <div className='profile-loader' >
  //       <Oval
  //         height={120}
  //         width={120}
  //         color='#222'
  //         wrapperStyle={{}}
  //         wrapperClass=''
  //         visible={true}
  //         ariaLabel='oval-loading'
  //         secondaryColor='#fff'
  //         strokeWidth={3}
  //         strokeWidthSecondary={3}
  //       />
  //     </div>
  //   );
  // }

  return (
    <section className='profile'>
      <div className='profile-header'>
        <div className='profile-image-wrapper'>
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : profile?.profilePhoto.url || '/images/user-avatar.png'
            }
            alt=''
            className='profile-image'
          />
          {user?._id === profile?._id && (
            <form onSubmit={formSubmitHandler}>
              <abbr title='choose profile photo'>
                <label
                  htmlFor='file'
                  className='bi bi-camera-fill upload-profile-photo-icon'
                ></label>
              </abbr>
              <input
                type='file'
                name='file'
                id='file'
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type='submit' className='upload-profile-photo-btn'>
                upload
              </button>
            </form>
          )}
        </div>
        <h1 className='profile-username'>{profile?.username}</h1>
        <p className='profile-bio'>
          {profile?.bio || ''}
        </p>
        <div className='user-date-joined'>
          <strong>Date Joined: </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        {user?._id === profile?._id && (
          <button
            onClick={() => setUpdateProfile(true)}
            className='profile-update-btn'
          >
            <i className='bi bi-file-person-fill'></i>
            Update Profile
          </button>
        )}
      </div>
      <div className='profile-posts-list'>
        <h2 className='profile-posts-list-title'>{profile?.username} Posts</h2>
        {profile?.posts?.map((post) => {
          return (
            <PostItem
              key={post?._id}
              post={post}
              username={profile?.username}
              userId={profile?._id}
            />
          );
        })}
      </div>
      {user?._id === profile?.id && (
        <button onClick={deleteAccountHandler} className='delete-account-btn'>
          Delete Your Account
        </button>
      )}
      {updateProfile && (
        <UpdateProfileModal
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
};

export default Profile;
