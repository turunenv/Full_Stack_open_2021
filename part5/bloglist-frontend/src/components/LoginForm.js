const LoginForm = (props) => (
  <form onSubmit={props.handleLogin}>
    <div>
      <label htmlFor="Username">username</label>
      <input
        type="text"
        value={props.username}
        name="Username"
        id="Username"
        onChange={(event) => props.setUsername(event.target.value)}
      />
    </div>
    <div>
      <label htmlFor="Password">password</label>
      <input type="text"
        value={props.password}
        name="Password"
        id="Password"
        onChange={(event) => props.setPassword(event.target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm