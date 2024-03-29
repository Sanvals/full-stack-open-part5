import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import login from './services/login'
import Togglable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorType, setErrorType] = useState('error')
  const noteFormRef = useRef()
  const sortBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    blogService.getAll()
      .then(blog => setBlogs(blog))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user.username)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login.login({ username, password })
      setUser(user.username)
      setUsername('')
      setPassword('')

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (exception) {
      setMessage('wrong username and password')
      setErrorType('error')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const createBlog = async (event) => {
    await blogService.create(event)

    const blogs = await blogService.getAll()
    setBlogs(blogs)

    noteFormRef.current.toggleVisibility()
    setMessage(`Created new blog: ${event.title}, by ${user}`)
    setErrorType('success')
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  const deleteBlogApp = async (catchBlog) => {
    if(window.confirm(`You are about to delete the blog ${catchBlog.title}. Are you sure?`)) {
      await blogService.remove(catchBlog.id)
      setBlogs(blogs.filter(blog => blog.id !== catchBlog.id))
      setMessage('Blog deleted')
      setErrorType('success')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
  }

  const loggedIn = () => (
    <>
      Welcome, <strong>{user}</strong>! <button onClick={logOut}>Logout</button>
      <Togglable buttonLabel="create new" ref={noteFormRef}>
        <h2>Create</h2>
        <CreateBlog createBlog={createBlog}/>
      </Togglable>
      <h2>Blogs</h2>
      {
        sortBlogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            deleteBlogApp={deleteBlogApp} />)
      }
    </>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} error={errorType}/>
      {
        user === null
          ? <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
          : loggedIn()
      }
    </div>
  )
}

export default App