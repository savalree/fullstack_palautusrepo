import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        
        dispatch(newAnecdote(content))
    }

    return(
        <div>
        <form onSubmit={createAnecdote}>
            <input name="anecdote"/>
            <button type="submit">create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm