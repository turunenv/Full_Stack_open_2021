import PropTypes from "prop-types";

import Blog from "./Blog";

const BlogList = ({ blogs, updateBlog, deleteBlog }) => {
  const blogListStyle = {
    marginTop: 10,
    padding: 0,
  };
  // sort the blogs by the number of likes in descending order
  const sortedBlogs = [...blogs].sort(
    (blog1, blog2) => blog2.likes - blog1.likes
  );

  return (
    <ul style={blogListStyle}>
      {sortedBlogs.map((blog) => {
        return (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        );
      })}
    </ul>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default BlogList;
