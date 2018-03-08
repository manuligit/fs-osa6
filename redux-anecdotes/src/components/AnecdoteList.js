import React from 'react'
import { notifyId } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import { castVote } from './../reducers/anecdoteReducer'

class AnecdoteList extends React.Component {
  clickEvent = (event) => {
    event.preventDefault()
    let id = event.target.value
    this.props.castVote(id)
    this.props.notifyId('voted anecdote', id, 5)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const mapStateToProps = (state) => {
  console.log('mapstatetoprops', state)
  return {
    anecdotes: state.anecdotes.filter(a => a.content.includes(state.filter)),
    notification: state.notification
  }
}

const mapDispatchToProps = { castVote, notifyId }

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedList