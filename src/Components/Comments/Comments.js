import React, { useState } from 'react';
import { createComment } from './commentService';

const Comments = ({ profileId, addComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = await createComment(profileId, commentText);
      setCommentText('');
      addComment(newComment);
    } catch (error) {
      console.error('Error submitting comment: ', error);
    }
  };

  return (
    <div className="comments">
      <form onSubmit={handleSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Comments;