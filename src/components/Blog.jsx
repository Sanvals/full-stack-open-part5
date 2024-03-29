import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, deleteBlogApp }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(0)
  const [likedBy, setLikedBy] = useState([])

  const hideWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    setLikes(blog.likes)
    setLikedBy(blog.likedBy)
  }, [])

  const likeCounter = async () => {
    blogService.addLike(blog)
    setLikes(likes + 1)
    setLikedBy(likedBy.concat(user) ? likedBy.concat(user) : likedBy)
  }

  return (
    <>
      <div>
        {blog.title}, by <strong>{blog.author.username}</strong>
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
        <div style={hideWhenVisible}>
          <div>{blog.url}</div>
          <div>{likes} likes <button onClick={likeCounter}>❤️</button></div>
          <div>Liked by: {likedBy}</div>
          <div>{blog.author.username === user && <button onClick={() => deleteBlogApp(blog)}>🗑️</button>}</div>
        </div>
      </div>
    </>
  )}

export default Blog