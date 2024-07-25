import React, { useState } from 'react';
import { createComment } from './commentService';
import { TextField, Button, Box, Paper } from '@mui/material';

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
    <Box
      className='comments'
      component={Paper}
      p={2}
      mt={2}
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant='outlined'
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder='Write a comment...'
          margin='normal'
          sx={{
            backgroundColor: 'transparent',
            color: 'white',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'lightgray',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
          }}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{
            backgroundColor: 'white',
            color: 'black',
            '&:hover': {
              backgroundColor: 'lightgray',
            },
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Comments;