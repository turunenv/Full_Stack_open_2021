import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'


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
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))

    //dispatch message here to guarantee it only gets called after adding the new anecdote to state
    dispatch(setNotification(`created anecdote "${newAnecdote.content}"`, 5))
  }
}

export const voteAnecdote = (obj) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(obj)
    dispatch(addVote(updatedAnecdote.id))
    dispatch(setNotification(`you voted for "${updatedAnecdote.content}"`, 2))
  }
}

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer