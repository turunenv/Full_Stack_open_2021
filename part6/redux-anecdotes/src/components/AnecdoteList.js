import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

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
    return (
        <div>
            {sortedAnecdotes.map(a => 
              <Anecdote 
                key={a.id}
                anecdote={a}
                handleVote={() =>
                  dispatch(addVote(a.id))}
              />)}
        </div>
    )
}

export default AnecdoteList