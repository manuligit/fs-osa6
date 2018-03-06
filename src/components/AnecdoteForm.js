import React from 'react'
import { actionFor } from './../reducers/anecdoteReducer'
import { createNotification } from './../utils/createNotification'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    let content = e.target.anecdote.value
    console.log(content)
    this.props.store.dispatch(
      actionFor.anecdoteCreation(content)
    )
    e.target.anecdote.value = ''
    const newAnecdote = this.props.store.getState().anecdotes.find(a => a.content === content)
    createNotification(this.props.store, newAnecdote.id, actionFor, 'created anecdote')
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
