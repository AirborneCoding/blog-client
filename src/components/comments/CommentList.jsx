import { useState } from 'react';
import './comment-list.css';
import UpdateCommentModal from './UpdateCommentModal';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { deleteComment } from '../../redux/apiCalls/commentApiCall';

const CommentList = ({ comments }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [updateComment, setUpdateComment] = useState(false);
  const [commentForupdate, setCommentForUpdate] = useState(null);

  //?  update comment handler
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this comment!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  return (
    <div className='comment-list'>
      <h4 className='comment-list-count'>{comments?.length} Comments </h4>
      {comments?.map((comment) => (
        <div key={comment._id} className='comment-item'>
          <div className='comment-item-info'>
            <div className='comment-item-user-info'>
              <img
                src='/images/user-avatar.png'
                alt=''
                className='comment-item-user-photo'
              />
              <span className='comment-item-username'>{comment?.username}</span>
            </div>
            <div className='comment-item-time'>
              {moment(comment?.createdAt).fromNow()}
            </div>
          </div>
          <p className='comment-item-text'>{comment?.text}</p>
          {user?._id === comment?.user && (
            <div className='comment-item-icon-wrapper'>
              <i
                onClick={() => updateCommentHandler(comment)}
                className='bi bi-pencil-square'
              ></i>
              <i
                onClick={() => deleteCommentHandler(comment?._id)}
                className='bi bi-trash-fill'
              ></i>
            </div>
          )}
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModal
          commentForupdate={commentForupdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;
