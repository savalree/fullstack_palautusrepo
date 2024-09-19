import { configureStore } from '@reduxjs/toolkit'

import anecdotes from '../services/anecdotes'
import anecdoteReducer, { setDotes} from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'
import notificationReducer from '../reducers/notificationReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notification: notificationReducer
    }
})

anecdotes.getAll().then(dotes =>
    store.dispatch(setDotes(dotes))
)

export default store