import { useDispatch } from 'react-redux'
import { addNotification, removeNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async e => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        
        dispatch(createAnecdote(content))
        
        dispatch(addNotification(`added anecdote "${content}"`))
        setTimeout(() => dispatch(removeNotification()), 5000)
    }

    return (
        <form onSubmit={addAnecdote}>
            <input type="text" name="anecdote" />
            <button type="submit">add</button>
        </form>
    )
}

export default AnecdoteForm