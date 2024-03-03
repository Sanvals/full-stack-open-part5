import { useState, useEffect } from 'react'
import Blog from './components/Blog'
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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await login.login({ username, password })
      setUser(user.username)
      setUsername('')
      setPassword('')
    } catch (exception) {

    }
  }

  const loginForm  = () =>  (
      <form onSubmit={handleLogin}>
        <div>
          username: 
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password: 
          <input 
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">
          login
        </button>
      </form>
  )

  const loggedIn = () => (
      <>
      Welcome, <strong>{user}</strong>!
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
        ? loginForm()
        : loggedIn()
      }
    </div>
  )
}

export default App