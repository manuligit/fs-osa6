import React from 'react'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    let content = e.target.anecdote.value
    e.target.anecdote.value = ''
    this.props.createAnecdote(content)
    const message = 'created anecdote'
    this.props.notify(message, content, 5)
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

const mapDispatchToProps = { createAnecdote, notify }

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default ConnectedFilter