const Anecdote = ({ anecdote }) => {
    const padding = {
      paddingBottom: 10,
    }
    return (
    <div className='anecdote'>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div style={padding}>has {anecdote.votes} votes</div>
      <div style={padding}>for more info see {anecdote.info}</div>
    </div>
    )
  }

export default Anecdote