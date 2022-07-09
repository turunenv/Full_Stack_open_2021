import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  //login to persist when refreshing the page by checking if user is set in the local storage
  useEffect(() => {
    console.log('useEffect fired: checking if user-JSON has been set in the window.localStorage');
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //function to set a notification for 3 seconds
  const setNotification = (newMessage, newMessageClass) => {
    setMessage(newMessage)
    setMessageClass(newMessageClass)

    setTimeout(() => {
      setMessage(null)
      setMessageClass('')
    }, 3000)
  }

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username,
        password,
      })
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setPassword('')
      setUsername('')

      
    } catch (exception) {
        setNotification('wrong username or password', 'message errorMessage')
        console.log(exception)
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  //render login-form if user is not logged in
  if (user === null) {
    return (
      <>
        <h2>Login to the application</h2>

        <Notification 
          message={message}
          className={messageClass}
        />

        <LoginForm 
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </>
      
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification 
          message={message}
          className={messageClass}
        />

      <div className='loggedInUser'>{user.name + " logged in "} 
  
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>Create a new blog</h2>
      <BlogForm createBlog={blogService.create} setNotification={setNotification} setBlogs={setBlogs} blogs={blogs}/>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
