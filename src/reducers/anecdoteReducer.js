import anecdoteService from './../services/anecdotes'

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log('actionfor createanecdote called')
    console.log(newAnecdote)
    dispatch({
      type: 'CREATE',
      content: newAnecdote
    })
  }
}
export const castVote = (id) => {
  return async (dispatch) => {
    let anecdotes = await anecdoteService.getAll()
    let anecdote = anecdotes.find(a => a.id === id)
    const newAnecdote = { ...anecdote, votes: (anecdote.votes + 1) }
    anecdoteService.update(id, newAnecdote)
    dispatch({
      type: 'VOTE',
      id
    })
  }
}
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const anecdoteReducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {
    console.log(action)
    console.log('anecdoterecurer create')
    return [...store, action.content]
  }

  if (action.type === 'INIT') {
    return action.data
  }
  return store
}