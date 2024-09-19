import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdotes from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newCreation = await anecdotes.createNew(content)
        console.log(newCreation)
        dispatch(newAnecdote(newCreation))
        dispatch(setNotification(`New anecdote "${content}" created`))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000)
    }

    return(
        <div>
        <h2>create new anecdote</h2>
        <form onSubmit={createAnecdote}>
            <input name="anecdote"/>
            <button type="submit">create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm