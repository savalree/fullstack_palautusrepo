import { useState } from 'react'

const Blog = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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


return (
  <div style={blogStyle}>
    <div> 
      "{blog.title}" by {blog.author} <button onClick={toggleText}>{isExpanded ? 'hide' : 'view'}</button>
    </div>
    {isExpanded && (
      <div>
        {blog.url} <br></br>
        {blog.likes} <button>like</button> <br></br>
        {blog.user.username}
      </div>
    )}
  </div>
)}

export default Blog