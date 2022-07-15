import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    
    const addAnecdote = async e => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        
        props.createAnecdote(content)
    }

    return (
        <form onSubmit={addAnecdote}>
            <input type="text" name="anecdote" />
            <button type="submit">add</button>
        </form>
    )
}

export default connect(null, { createAnecdote })(AnecdoteForm)