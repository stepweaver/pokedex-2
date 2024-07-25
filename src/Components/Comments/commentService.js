import Parse from 'parse';

export const createComment = async (profileId, commentText) => {
  const currentUser = Parse.User.current();
  if (!currentUser) {
    throw new Error('User not logged in');
  }

  const Comment = Parse.Object.extend('Comments');
  const comment = new Comment();

  comment.set('comment', commentText);
  comment.set('replies', []);
  comment.set('user', {
    __type: 'Pointer',
    className: '_User',
    objectId: currentUser.id,
  });
  comment.set('profile', {
    __type: 'Pointer',
    className: 'Profile',
    objectId: profileId,
  });

  try {
    await comment.save();
    console.log('Comment created successfully');
    return comment.toJSON();
  } catch (error) {
    console.error('Error while creating comment: ', error);
    throw error;
  }
};