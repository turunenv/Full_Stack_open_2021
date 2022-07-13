import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleVote}) => {
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes-a.votes)

    const handleVote = (id, content) => {
      dispatch(addVote(id))
      dispatch(addNotification(`you voted for "${content}"`))   
      setTimeout(() => dispatch(removeNotification()), 5000)   
    }

    return (
        <div>
            {sortedAnecdotes.map(a => 
              <Anecdote 
                key={a.id}
                anecdote={a}
                handleVote={() => handleVote(a.id, a.content)} 
              />
            )}
        </div>
    )
}

export default AnecdoteList