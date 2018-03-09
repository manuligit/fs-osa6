import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Container, Table, Grid } from 'semantic-ui-react'

const Menu = () => {

  const activeStyle = {
    backgroundColor: 'hotpink',
    color: 'white',
    fontSize: 16,
    padding: '10px',
    margin: '5px',
    textDecoration: 'none'
  }

  const menuStyle = {
    backgroundColor: 'pink',
    color: 'purple',
    fontSize: 16,
    padding: '10px',
    margin: '15px',
    textDecoration: 'none'
  }

  return (
    <div style={menuStyle}>    
      <NavLink exact to="/" style={menuStyle} activeStyle={activeStyle} >anecdotes</NavLink> &nbsp;
      <NavLink exact to="/create" style={menuStyle} activeStyle={activeStyle} >create new</NavLink>&nbsp;
      <NavLink exact to="/about" style={menuStyle} activeStyle={activeStyle} >about</NavLink>&nbsp;
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table className='ui pink striped celled'>
      <Table.Body>
        {anecdotes.map(anecdote => 
        <Table.Row key={anecdote.id} >
          <Table.Cell>
            <NavLink to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</NavLink>
          </Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table>
  </div>
)

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    fontSize: 16,
    border: '1px solid green',
    borderRadius: '5px',
    padding: '10px',
    margin: '5px'
  }

  let hidden = {
    display: 'none'
  }
  if (message.length > 1) { 
    return (
      <div style={notificationStyle}> {message} </div> 
    )
  } else {
    return (
      <div style={hidden}></div>
    )
  }
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>

    <Grid>
      <Grid.Row>
        <Grid.Column className='eleven wide column'>
          <p>According to Wikipedia:</p>
          
          <em>An anecdote is a brief, revealing account of an individual person or an incident. 
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
            An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Grid.Column>
        <Grid.Column className='five wide column'>
          <img src='https://i.imgur.com/JZTwu0q.jpg' className='ui image'/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div style={{margin: '15px'}}>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div> 
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes </div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a> </div>
    </div>
  )
} 

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification: `created anecdote ${anecdote.content}` })
    
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes, notification: `voted anecdote ${anecdote.content}` })
    
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 2000)
  }

  render() {
    return (
      <Container>
        <div>
          <Router>
            <div>
              <h1>Software anecdotes</h1>
                <Menu />
                <Notification message={this.state.notification} />
                <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
                <Route exact path="/create" render={({history}) => <CreateNew addNew={this.addNew} history={history}/>} />
                <Route exact path="/about" render={() => <About />} />
                <Route exact path="/anecdotes/:id" render={({match}) => <Anecdote anecdote={this.anecdoteById(match.params.id)}/>} />
                
                <Footer />
            </div>
          </Router>
        </div>
      </Container>
    );
  }
}

export default App;
