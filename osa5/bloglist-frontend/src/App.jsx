import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [password, setPassword] = useState('') 
  const [statusMessage, setStatusMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user)) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser()
  }

  const handleStatusMessage = (message) => {
    setStatusMessage(message)
    setTimeout(() => {
      setStatusMessage(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        blogFormRef.current.toggleVisibility()
      })
  }

  const handleBlogUpdate = (updatedBlog) => {
    console.log("i want to handle update", updatedBlog)
    setBlogs(blogs.map(blog =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    ))
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} isError={true}/>
      <Notification message={statusMessage} isError={false}/>

      {!user && loginForm()}
      {user && <div>
       <p>{user.username} logged in</p>
       <button onClick={handleLogout}>logout</button>

       <h2>Create a blog</h2>
       <Togglable buttonLabel="create new blog" ref={blogFormRef}>
       <BlogForm createBlog={addBlog} setStatusMessage={handleStatusMessage}/>
       </Togglable>

       <h2>Blogs</h2>
       <ul>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} onUpdateBlog={handleBlogUpdate} />
      )}
      </ul>
      </div>
    } 
    </div>
  )
}

export default App