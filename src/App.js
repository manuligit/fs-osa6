import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'


class App extends React.Component {
  /*
  <Filter store={this.props.store} />
  <AnecdoteList store={this.props.store} />

  <Filter />
  */
  render() {
    //const anecdotes = this.context.store.getState().anecdotes
    //console.log(anecdotes[0])
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <Filter />
        <AnecdoteForm />
      </div>
    )
  }
}

export default App