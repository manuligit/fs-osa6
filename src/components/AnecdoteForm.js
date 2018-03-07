import React from 'react'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { createNotification, removeNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from './../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    let content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(newAnecdote)
    this.props.createAnecdote(newAnecdote)
    const message = 'created anecdote'
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
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('mapstatetoprops', state)
  return {
    anecdotes: state.anecdotes,
    notification: state.notification
  }
}

const mapDispatchToProps = { createAnecdote, createNotification, removeNotification }

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default ConnectedFilter