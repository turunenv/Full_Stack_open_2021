import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, addLike } from "../reducers/blogSlice";

const Blog = ({ blog }) => {
  const [showAllInfo, setShowAllInfo] = useState(false);

  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "2px solid black",
    marginBottom: 5,
    listStyleType: "none",
  };

  const blogInfoStyle = {
    marginRight: 3,
  };

  const removeBlog = () => {
    if (window.confirm(`are you sure you want to remove '${blog.title}' by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id));
    }
  }

  const toggleShowAllInfo = () => {
    setShowAllInfo(!showAllInfo);
  };

  const buttonText = showAllInfo ? "hide" : "view";

  if (showAllInfo) {
    return (
      <li style={blogStyle} className="blog">
        <div>
          <span style={blogInfoStyle}>{blog.title}</span>
          <span style={blogInfoStyle}>{blog.author}</span>
          <button onClick={toggleShowAllInfo}>{buttonText}</button>
        </div>
        <div>{blog.url}</div>
        <div>
          <span style={blogInfoStyle}>likes {blog.likes}</span>
          <button onClick={() => dispatch(addLike(blog.id))}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={removeBlog}>remove</button>
      </li>
    );
  }

  return (
    <li style={blogStyle} className="blog">
      <span style={blogInfoStyle}>{blog.title}</span>
      <span style={blogInfoStyle}>{blog.author}</span>
      <button onClick={toggleShowAllInfo}>{buttonText}</button>
    </li>
  );
};

export default Blog;
