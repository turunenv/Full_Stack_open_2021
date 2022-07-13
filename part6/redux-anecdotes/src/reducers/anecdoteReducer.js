import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote: (state, action) => {
      //redux toolkit uses immer under the hood, so we can 'mutate' state here
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      anecdoteToVote.votes += 1
    },
    createAnecdote: (state, action) => {
      state.push(asObject(action.payload))
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }

})

export const { addVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer