import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";
import Navbar from "./components/Navbar";

import { fetchBlogs } from "./reducers/blogSlice";
import { storeUser } from "./reducers/userSlice";
import blogService from "./services/blogs";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

//react router imports
import {
  BrowserRouter as Router,
  Routes, Route, Navigate //,Link
} from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  //this needs to be in the app, not the Blogs.js so we fetch the blogs when refreshing on the other views
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
  return (
    <div>
      <Router>
        <Navbar />
        <h2>Blog-app</h2>
        <Routes>
          <Route path="/" element={<Navigate to="/blogs"/>} />
          <Route path="/blogs" element={<Blogs />}/>
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;