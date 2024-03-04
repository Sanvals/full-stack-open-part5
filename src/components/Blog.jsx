import { useState, forwardRef, useImperativeHandle } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
  <div>
    <i>{blog.title}</i>, 
    by <strong>{blog.author.username}</strong>
    <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
    <div style={hideWhenVisible}>
      <div>{blog.url}</div>
      <div>{blog.likes} likes</div>
    </div>
  </div>  
)}
export default Blog