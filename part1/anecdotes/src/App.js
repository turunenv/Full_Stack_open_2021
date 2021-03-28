import React, { useState } from 'react';




const Button = ({text, handleEvent}) => {
  return (
    <button onClick={handleEvent}>
      {text}
    </button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const numAnecdotes = anecdotes.length;

  const [selected, setSelected] = useState(0);
  //state array to store the votes
  const [votes, setVotes] = useState(new Array(numAnecdotes).fill(0))

  

  //event handler for the button that selects a random array entry from anecdotes
  const selectRandomAnecdote = () => {
    let randIndex = Math.floor(Math.random() * numAnecdotes);
    setSelected(randIndex);
  }
  //event handler to add a vote for the anecdote
  const addVote = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  }

  //index of highest value in votes array (returns the first array item, if more than one with the same highest value)
  let maxVotesIndex = votes.indexOf(Math.max(...votes));

  //Some console.logs to see that everything works
  //console.log(`votes: ${votes}`);
  //console.log(`maxVotesIndex: ${maxVotesIndex}`);
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <Button text="vote" handleEvent={addVote} />
      <Button text="next anecdote" handleEvent={selectRandomAnecdote} />

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVotesIndex]}</p>
      <p>has {votes[maxVotesIndex]} votes</p>
    </div>
  )

  
}
export default App;
