import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setNotification } from "../reducers/notificationSlice";
import { fetchBlogs } from "../reducers/blogSlice";
import { storeUser, removeUser } from "../reducers/userSlice";

import BlogList from "./BlogList";
import LoginForm from "./LoginForm";
import BlogForm from "./BlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";

import blogService from "../services/blogs";
import loginService from "../services/login";

const Home = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(state => state.blogs);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(fetchBlogs);
  }, []);

  //login to persist when refreshing the page by checking if user is set in the local storage
  useEffect(() => {
    console.log(
      "useEffect fired: checking if user-JSON has been set in the window.localStorage"
    );
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(storeUser(user));
      blogService.setToken(user.token);
    }
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(storeUser(user));
      setPassword("");
      setUsername("");
    } catch (exception) {
      setNotification(dispatch, { message: "wrong username or password", style: "error" });
      console.log(exception);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(removeUser());
  };

  const toggleFormAfterCreatingBlog = () => {
    blogFormRef.current.toggleVisibility();
  }

  const user = useSelector(state => state.user);
  //render login-form if user is not logged in
  if (user === null) {
    return (
      <>
        <h2>Login to the application</h2>

        <Notification />

        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </>
    );
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

      <div>
        {user.name + " logged in "}
        <button onClick={handleLogout}>Logout</button>
      </div>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>Create a new blog</h2>
        <BlogForm toggle={toggleFormAfterCreatingBlog} />
      </Togglable>

      <BlogList blogs={blogs} />
    </div>
  );
};

export default Home;