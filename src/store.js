import { createStore, combineReducers } from 'redux'
import { anecdoteReducer, notificationReducer, filterReducer } from './reducers/anecdoteReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer)

export default store