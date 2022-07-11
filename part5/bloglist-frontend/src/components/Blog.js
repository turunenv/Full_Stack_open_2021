import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [showAllInfo, setShowAllInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '2px solid black',
    marginBottom: 5,
    listStyleType: 'none'
  }

  const blogInfoStyle = {
    marginRight: 3,
  }

  const toggleShowAllInfo = () => {
    setShowAllInfo(!showAllInfo)
  }

  const increaseLikesByOne = () => {
    const updatedBlog = { ...blog,
      user: blog.user.id,
      likes: blog.likes + 1 }

    updateBlog(blog.id, updatedBlog)
  }

  const buttonText = showAllInfo ? 'hide' : 'view'

  if (showAllInfo) {
    return (
      <li style={blogStyle}>
        <div>
          <span style={blogInfoStyle}>{blog.title}</span>
          <span style={blogInfoStyle}>{blog.author}</span>
          <button onClick={toggleShowAllInfo}>{buttonText}</button>
        </div>
        <div>{blog.url}</div>
        <div>
          <span style={blogInfoStyle}>likes {blog.likes}</span>
          <button onClick={increaseLikesByOne}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={() => deleteBlog(blog.id)}>remove</button>
      </li>
    )
  }

  return (
    <li style={blogStyle}>
      <span style={blogInfoStyle}>{blog.title}</span>
      <span style={blogInfoStyle}>{blog.author}</span>
      <button onClick={toggleShowAllInfo}>{buttonText}</button>
    </li>
  )
}

export default Blog