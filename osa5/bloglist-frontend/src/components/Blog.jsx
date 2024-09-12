import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onUpdateBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const updateLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes+1
    }

    blogService
    .update(blog.id, updatedBlog)
    .then(returnedBlog => {
      if (onUpdateBlog) onUpdateBlog(returnedBlog)
    })
  }

return (
  <div style={blogStyle}>
    <div> 
      "{blog.title}" by {blog.author} <button onClick={toggleText}>{isExpanded ? 'hide' : 'view'}</button>
    </div>
    {isExpanded && (
      <div>
        {blog.url} <br></br>
        {blog.likes} <button onClick={updateLikes}>like</button> <br></br>
        {blog.user.username}
      </div>
    )}
  </div>
)}

export default Blog