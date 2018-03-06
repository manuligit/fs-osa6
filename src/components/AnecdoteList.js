import React from 'react'
import { actionFor } from './../reducers/anecdoteReducer'
import { createNotification } from './../utils/createNotification'

class AnecdoteList extends React.Component {
  clickEvent = (event) => {
    event.preventDefault()
    let id = event.target.value
    this.props.store.dispatch(actionFor.castVote(id))
    console.log(event.target.id)
    createNotification(this.props.store, id, actionFor, 'voted anecdote')
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    console.log(this.props.store.getState())
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.clickEvent} value={anecdote.id}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
