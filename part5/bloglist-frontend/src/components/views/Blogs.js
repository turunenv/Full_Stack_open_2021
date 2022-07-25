import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setNotification } from "../../reducers/notificationSlice";
import { storeUser } from "../../reducers/userSlice";

import BlogList from "../BlogList";
import LoginForm from "../LoginForm";
import BlogForm from "../BlogForm";
import Notification from "../Notification";
import Togglable from "../Togglable";

import blogService from "../../services/blogs";
import loginService from "../../services/login";

const Blogs = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

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

      <Notification />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>Create a new blog</h2>
        <BlogForm toggle={toggleFormAfterCreatingBlog} />
      </Togglable>

      <BlogList />
    </div>
  );
};

export default Blogs;