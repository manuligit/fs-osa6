import anecdoteService from './../services/anecdotes'

export const notify = (message, content, seconds) => {
  console.log('actionfor createnotification', content)
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      message,
      content
    })

    setTimeout(() => {
      dispatch({
        type: 'REMOVE'
      })
    }, seconds*1000)
  }
}

export const notifyId = (message, id, seconds) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    let anecdote = anecdotes.find(a => a.id === id)
    const content = anecdote.content
    console.log('actionfor createnotification', anecdote.content)

    dispatch({
      type: 'NOTIFY',
      message,
      content
    })

    setTimeout(() => {
      dispatch({
        type: 'REMOVE'
      })
    }, seconds*1000)
  }
}

export const notificationReducer = (store = null, action) => {
  if (action.type==='NOTIFY') {
    console.log('reducer notify ')
    return `${action.message} ${action.content}`
  }

  if (action.type==='REMOVE') {
    return null
  }
  return store
}