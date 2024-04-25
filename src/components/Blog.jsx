import React, { useState } from 'react';
import blogService from '../services/blogs';
const Blog = ({ blog, blogs, setBlogs, user}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const addLike = () => {
    const blogToUpdate = {
      ...blog,
      user: blog.user.id, // Only send the user ID
      likes: blog.likes + 1
    };
    blogService
      .update(blog.id, blogToUpdate)
      .then((updatedBlog) => {
        // Replace the user ID with the user object in the updated blog
        updatedBlog.user = blog.user;
        setBlogs(blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)));
      });
  };
  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter((b) => b.id !== blog.id));
        });
    }
  };
  let removeButton = {
    display: 'none',
  };
  
  if (user.username === blog.user.username) {
    removeButton = {
      display: 'block',
    };
  }
  
  return (
    <div className='note'>
      {blog.title} {blog.author} <button onClick={toggleVisibility} className='viewButton'>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={addLike} className='likeButton'>like</button></p>
          <p>{blog.user.name}</p>
          <button style={removeButton} onClick={removeBlog}>remove</button>
        </div>
      )}
    </div>
  );
};
// const Blog = ({ blog }) => (
//   <div className="note">
//     {blog.title} {blog.author}<button onClick={show}>view</button>
//   </div>  
// )

export default Blog