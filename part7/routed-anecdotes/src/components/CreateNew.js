import { useField } from '../hooks/index'
import { useNavigate } from 'react-router-dom'

const CreateNew = (props) => {
    const [content, resetContent] = useField('text')
    const [author, resetAuthor] = useField('text')
    const [info, resetInfo] = useField('info')
  
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/')
    }
  
    const reset = e => {
      e.preventDefault()
      resetContent()
      resetAuthor()
      resetInfo()
    }
  
    return (
      <div>
      {console.log('content is', content)}
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button type='submit'>create</button>
          <button onClick={reset}>reset</button> 
        </form>
      </div>
    )
  
  }

export default CreateNew