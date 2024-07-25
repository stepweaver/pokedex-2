import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import Comments from './Comments';

const CommentsBox = ({ profileId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const Comment = Parse.Object.extend('Comments');
      const query = new Parse.Query(Comment);
      query.equalTo('profile', {
        __type: 'Pointer',
        className: 'Profile',
        objectId: profileId,
      });
      query.include('user');
      try {
        const results = await query.find();
        setComments(results.map(comment => comment.toJSON()));
      } catch (error) {
        console.error('Error while fetching comments: ', error);
      }
    };

    fetchComments();
  }, [profileId]);

  return (
    <div className="comments-box">
      <Comments profileId={profileId} />
      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className="comment">
            <p><strong>{comment.user.username}</strong>: {comment.comment}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentsBox;