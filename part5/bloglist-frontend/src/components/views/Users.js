import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import userService from "../../services/users";

const Users = () => {
  const blogs = useSelector((state) => state.blogs);

  // * fetch the current users from the database
  // * the original solution was to extract the users from the blogs-state,
  //   but then we have no access to users that haven't created any blogs
  // * we could store all users in the redux-store aswell, but we opt to just use react-hooks for now
  const [users, setUsers] = useState(null);
  useEffect(() => {
    //async functions return an implicit promise
    //useEffect can only return a cleanupfunction or nothing, so we need to define
    //the async function inside the hook and call it
    const fetchUsers = async() => {
      const fetchedUsers = await userService.getUsers();
      setUsers(fetchedUsers);
    }

    fetchUsers();
  }, []);

  //do not render until users have been fetched
  if (!users) {
    return null;
  }

  //loop through blogs, return an object with names as keys and an object with the user id
  //and blogcount as values
  const getBlogCounts = (blogs) => {
    const blogCounts = {};
    //add the users as keys to the blogCounts object, store the user id
    users.forEach(user => blogCounts[user.name] = { count: 0, id: user.id })

    //loop through the blogs and increment counts
    blogs.forEach((blog) => {
      blogCounts[blog.user.name].count++;
    });
    return blogCounts;
  };

  const blogCounts = getBlogCounts(blogs);
  const names = Object.keys(blogCounts);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {names.map((name, index) => {
            return (
              <tr key={index}>
                <td>
                  <Link to={`/users/${blogCounts[name].id}`}>{name}</Link>
                </td>
                <td>{blogCounts[name].count}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
