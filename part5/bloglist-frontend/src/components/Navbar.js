import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { removeUser } from "../reducers/userSlice";

//navbar gets the user as props to handle conditional rendering
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(removeUser());
  };
  return (
    <div>
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>
      {user ? (
        <>
          <em>{user.name} logged in</em>
          <button onClick={handleLogout}>logout</button>
        </>
      ) :
        <Link to="/">login</Link>}
    </div>
  );
};

export default Navbar;
