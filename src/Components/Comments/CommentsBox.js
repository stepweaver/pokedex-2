import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import Comments from './Comments';
import { Box, Typography, Paper } from '@mui/material';

const CommentsBox = ({ profileId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const Comment = Parse.Object.extend('Comments');
      const query = new Parse.Query(Comment);
      query.equalTo('profile', {
        __type: 'Pointer',
        className: 'Profile',
        objectId: profileId
      });
      query.include('user');
      query.descending('createdAt');
      try {
        const results = await query.find();
        setComments(results.map((comment) => comment.toJSON()));
      } catch (error) {
        console.error('Error while fetching comments: ', error);
      }
    };

    fetchComments();
  }, [profileId]);

  const addComment = async (newComment) => {
    const userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo('objectId', newComment.user.objectId);
    const user = await userQuery.first();
    newComment.user = user.toJSON();
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const colors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFF9C4', '#D1C4E9'];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-GB', { month: 'short' });
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  };

  return (
    <Box className='comments-box' sx={{ padding: 2 }}>
      <Comments profileId={profileId} addComment={addComment} />
      <Typography variant='h5' component='h2' gutterBottom>
        Comments
      </Typography>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Paper
            key={index}
            className='comment'
            sx={{
              padding: 2,
              marginBottom: 2,
              backgroundColor: colors[index % colors.length]
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant='body1'>
                <strong>{comment.user.username}:</strong>
              </Typography>
              <Typography
                variant='caption'
                color='textSecondary'
                className='comment-date'
              >
                <em>{formatDate(comment.createdAt)}</em>
              </Typography>
            </Box>
            <Typography variant='body1' sx={{ marginTop: 1 }}>
              {comment.comment}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography variant='body1'>No comments yet.</Typography>
      )}
    </Box>
  );
};

export default CommentsBox;
