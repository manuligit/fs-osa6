import React from 'react'
import { createNotification, removeNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import { castVote } from './../reducers/anecdoteReducer'

class AnecdoteList extends React.Component {
  clickEvent = (event) => {
    event.preventDefault()
    let id = event.target.value
    this.props.castVote(id)
    let anecdote = this.props.anecdotes.find(a => a.id === id)
    const content = anecdote.content
    const message = 'voted anecdote'
    this.props.createNotification(message, content)

    setTimeout(function () {
      //if multiple anecdotes are voted or created, remove only the newest one:
      if (this.props.notification === `${message} ${content}`) {
        this.props.removeNotification()
      }
    }.bind(this), 5000)
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

const mapDispatchToProps = { castVote, createNotification, removeNotification }

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedList