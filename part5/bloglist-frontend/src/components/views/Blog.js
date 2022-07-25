import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBlog, addLike } from "../../reducers/blogSlice";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = useParams().id;

  const removeBlog = () => {
    if (window.confirm(`are you sure you want to remove '${blog.title}' by ${blog.author}?`)) {
      dispatch(deleteBlog(id));
      navigate("/blogs");
    }
  }

  //check if current logged-in user is the creator of the blog
  //if true - render the delete-button
  const user = useSelector((state) => state.user);
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  if (!user || !blog) {
    return null;
  }

  //render delete-button conditionally - only view for the blog creator
  const userIsTheBlogCreator =  user.id === blog.user.id;

  return (
    <div>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button onClick={() => dispatch(addLike(blog.id))}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {userIsTheBlogCreator && <button onClick={removeBlog}>Delete</button>}
    </div>
  );
};

export default Blog;
