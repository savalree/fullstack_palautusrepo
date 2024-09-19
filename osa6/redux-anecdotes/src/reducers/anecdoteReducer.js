import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote: (state, action) => {
      const newAnecdote = asObject(action.payload)
      console.log("creating", newAnecdote)
      state.push(newAnecdote)
    },
    voteAnecdote: (state,action) => {
      const id = action.payload
      const votedAnecdote = state.find(n => n.id === id)
      if (votedAnecdote) {
        console.log("found id", votedAnecdote.id, votedAnecdote.votes)
        votedAnecdote.votes += 1;
      } 
      state.sort((a, b) => b.votes - a.votes)
    },
    appendDote(state, action) {
      state.push(action.payload)
    },
    setDotes(state, action){
      return action.payload
    }
  }
})

export const { newAnecdote, voteAnecdote, appendDote, setDotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer