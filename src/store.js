import { createStore, combineReducers } from 'redux'
import { anecdoteReducer, notificationReducer } from './reducers/anecdoteReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})

const store = createStore(reducer)

export default store