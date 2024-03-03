const Blog = ({ blog }) => (
  <div>
    <i>{blog.title}</i>, by <strong>{blog.author.username}</strong>
  </div>  
)

export default Blog