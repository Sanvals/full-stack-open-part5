import { useState, useEffect } from 'react'
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
  const [title, setTitle] = useState('New Title')
  const [link, setLink] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorType, setErrorType] = useState("error")
  const [noteVisible, setNoteVisible] = useState(false)

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
  })

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
      setMessage(`wrong username and password`)
      setErrorType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  
  const logOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const createBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      url: link,
    }

    await blogService.create(blogObject)
    
    const blogs = await blogService.getAll()
    setBlogs(blogs)

    setMessage(`Created new blog: ${blogObject.title}, by ${user}`)
    setErrorType('success')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const loggedIn = () => (
      <>
      Welcome, <strong>{user}</strong>! <button onClick={logOut}>Logout</button>
      <Togglable buttonLabel="create new">
      <h2>Create</h2>
        <CreateBlog 
          createBlog={createBlog}
          title={title}
          setTitle={setTitle}
          link={link}
          setLink={setLink}
          />
      </Togglable>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
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