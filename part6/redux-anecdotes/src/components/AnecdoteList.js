import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'


const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()
    const handleVote = () => {
        dispatch(voteAnecdote(anecdote))
    }
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
    const anecdotes = useSelector(state => state.anecdotes)

    //filter case insensitively
    const filter = useSelector(state => state.filter).toLowerCase()
    const filteredAnecdoted = anecdotes.filter(a => a.content.toLowerCase().includes(filter))

    const sortedAnecdotes = [...filteredAnecdoted].sort((a,b) => b.votes-a.votes)


    return (
        <div>
            {sortedAnecdotes.map(a => 
              <Anecdote 
                key={a.id}
                anecdote={a}
              />
            )}
        </div>
    )
}

export default AnecdoteList