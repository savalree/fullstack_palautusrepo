import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const BlogForm = (props) => {
  return (
    <form onSubmit={props.addBlog}>
      <div>title: <input value={props.blogTitle} onChange={props.handleNewTitle}/></div>
      <div>author: <input value={props.blogAuthor} onChange={props.handleNewAuthor}/></div>
      <div>url: <input value={props.blogUrl} onChange={props.handleNewUrl}/></div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [blogTitle, setNewTitle] = useState('')
  const [blogAuthor, setNewAuthor] = useState('')
  const [blogUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)


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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
  
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewUrl('')
        setNewAuthor('')
        setNewBlog('')
      })
  }

  const handleNewTitle = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser()
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && <div>
       <p>{user.username} logged in</p>
       <button onClick={handleLogout}>logout</button>

       <h2>Create a blog</h2>
       <BlogForm blogTitle={blogTitle} blogAuthor={blogAuthor} blogUrl={blogUrl} addBlog={addBlog}
       handleNewTitle={handleNewTitle} handleNewUrl={handleNewUrl} handleNewAuthor={handleNewAuthor}/>

       <h2>Blogs</h2>
       <ul>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </ul>
      </div>
    } 
    </div>
  )
}

export default App