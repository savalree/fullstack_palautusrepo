
export const setFilter = (filter) => {
    return {
        type: 'SET',
        payload: filter
      }
}

const filterReducer = (state = 'NONE', action) => {
    console.log('FILTER ACTION: ', action)
    console.log('filter state', state)
    switch (action.type) {
      case 'SET': {
        console.log("filter is", action.payload)
        return action.payload
      }
      default: return state
    }
  }

  export default filterReducer
  