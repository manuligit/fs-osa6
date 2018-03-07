const getId = () => (100000*Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

export const createAnecdote = (content) => {
  console.log('actionfor createanecdote called')
  return {
    type: 'CREATE',
    content: content.content
  }
}

export const castVote = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const initializeAnecdotes = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export const anecdoteReducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {
    console.log('anecdoterecurer create')
    return [...store, { content: action.content, id: getId(), votes:0 }]
  }
  if (action.type === 'INIT') {
    return action.data
  }
  //console.log('type wrong ')
  return store
}