import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote: (state, action) => {
      state.push(action.payload)
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