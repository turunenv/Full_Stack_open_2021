import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log(user)
      setUser(user)
      setPassword('')
      setUsername('')
    } catch (error) {
        console.log(error)
    }
  }

  //render login-form if user is not logged in
  if (user === null) {
    return (
      <>
        <h2>Login to the application</h2>
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
      <div className='loggedInUser'>{user.name} logged in</div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
