import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onUpdateBlog, deleteBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleText = () => {
    setIsExpanded(!isExpanded)
  }

  const updateLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes+1,
      user: blog.user
    }

    const apiReturned = await blogService.update(blog.id, updatedBlog)
    const completeReturnedBlog = { ...apiReturned, user: blog.user }
    if (onUpdateBlog) onUpdateBlog(completeReturnedBlog)
  }

  const deleteThis = () => {
    deleteBlog(blog)
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
        {blog.user.username}<br></br>
      </div>
    )}
    {isExpanded && blog.user.username === "testi" && (
      <div>
        <button onClick={deleteThis}>remove</button>
      </div>
    )}

  </div>
)}

export default Blog