import { useState } from 'react'

const BlogForm = ({ createBlog, setStatusMessage }) => {
  const [blogTitle, setNewTitle] = useState('')
  const [blogAuthor, setNewAuthor] = useState('')
  const [blogUrl, setNewUrl] = useState('')

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    createBlog(blogObject)

    setNewTitle('')
    setNewUrl('')
    setNewAuthor('')
    setStatusMessage(`New blog was created: "${blogTitle}"`)
  }

  return (
    <form onSubmit={addBlog}>
      <div>title: <input data-testid='title' value={blogTitle} onChange={handleNewTitle} placeholder='title'/></div>
      <div>author: <input data-testid='author' value={blogAuthor} onChange={handleNewAuthor} placeholder='author'/></div>
      <div>url: <input data-testid='url' value={blogUrl} onChange={handleNewUrl} placeholder='url'/></div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default BlogForm