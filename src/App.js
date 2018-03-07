import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'


class App extends React.Component {
  /*
  <Filter store={this.props.store} />
  <AnecdoteList store={this.props.store} />
  <AnecdoteForm store={this.props.store} />
  */
  render() {
    //const anecdotes = this.context.store.getState().anecdotes
    //console.log(anecdotes[0])
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
      </div>
    )
  }
}

export default App