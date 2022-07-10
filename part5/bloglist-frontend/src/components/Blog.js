import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showAllInfo, setShowAllInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '2px solid black',
    marginBottom: 5
  }

  const toggleShowAllInfo = () => {
    setShowAllInfo(!showAllInfo)
  }

  const buttonText = showAllInfo ? 'hide' : 'view'

  if (showAllInfo) {
    return (
      <div style={blogStyle}>
        <div>{blog.title} {blog.author}
           <button onClick={toggleShowAllInfo}>{buttonText}</button>
        </div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
           <button>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title} {blog.author}
      <button onClick={toggleShowAllInfo}>{buttonText}</button></div>
    </div>
  )
}

export default Blog