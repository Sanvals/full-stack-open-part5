import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(0);

  const hideWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    setLikes(blog.likes)
    console.log(likes)
  }, [])

  const likeCounter = async () => {
    blogService.addLike(blog)
    setLikes(likes + 1)
  }

  return (
  <div>
    <i>{blog.title}</i>, by <strong>{blog.author.username}</strong>
    <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
    <div style={hideWhenVisible}>
      <div>{blog.url}</div>
      <div>{likes} likes <button onClick={likeCounter}>like</button></div>
    </div>
  </div>  
)}
export default Blog