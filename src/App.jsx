import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

    }
  }
  
  const logOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const createBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: event.target[0].value,
      url: event.target[1].value,
    }

    await blogService.create(blogObject)
    
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const loggedIn = () => (
      <>
      Welcome, <strong>{user}</strong>! <button onClick={logOut}>Logout</button>
      <h2>Create</h2>
      <form onSubmit={createBlog}>
        <div>title: <input type="text" /></div>
        <div>url: <input type="text" /></div>
        <button type="submit">create</button>
      </form>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
  )

  return (
    <div>
      <h2>Blogs</h2>
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