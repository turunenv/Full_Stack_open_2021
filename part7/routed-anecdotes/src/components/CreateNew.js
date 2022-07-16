import { useField } from '../hooks/index'
import { useNavigate } from 'react-router-dom'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('info')
  
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.attributes.value,
        author: author.attributes.value,
        info: info.attributes.value,
        votes: 0
      })
      navigate('/')
    }
  
    const reset = e => {
      e.preventDefault()
      content.reset()
      author.reset()
      info.reset()
    }
  
    return (
      <div>
      {console.log('content is', content)}
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content.attributes} />
          </div>
          <div>
            author
            <input {...author.attributes} />
          </div>
          <div>
            url for more info
            <input {...info.attributes} />
          </div>
          <button type='submit'>create</button>
          <button onClick={reset}>reset</button> 
        </form>
      </div>
    )
  
  }

export default CreateNew