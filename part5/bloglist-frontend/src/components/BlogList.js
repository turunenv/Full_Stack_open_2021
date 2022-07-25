//import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const blogListStyle = {
    marginTop: 10,
    padding: 0,
  };

  const blogLinkStyle = {
    marginTop: 5,
    border: "2px solid black",
    paddingTop: 4,
    paddingLeft: 3,
  }
  // sort the blogs by the number of likes in descending order
  const sortedBlogs = [...blogs].sort(
    (blog1, blog2) => blog2.likes - blog1.likes
  );

  return (
    <ul style={blogListStyle}>
      {sortedBlogs.map((blog) => {
        return (
          <li key={blog.id} style={blogLinkStyle}>
            <Link to={`/blogs/${blog.id}`}>
              <em>{blog.title}</em> by {blog.author}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

//proptypes not in use anymore after implementing redux into the project

// BlogList.propTypes = {
//   blogs: PropTypes.array.isRequired,
//   updateBlog: PropTypes.func.isRequired,
//   deleteBlog: PropTypes.func.isRequired,
// };

export default BlogList;
