import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Form, Button, Message, Menu } from 'semantic-ui-react'

const MenuComponent = () => {
  return (
    <Menu className='inverted ui pink'>
      <Menu.Item link>
        <NavLink exact to="/">anecdotes</NavLink> 
      </Menu.Item>
      <Menu.Item link>
        <NavLink exact to="/create">create new</NavLink>
      </Menu.Item>
      <Menu.Item link>
        <NavLink exact to="/about">about</NavLink>
      </Menu.Item>
    </Menu>
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
  if (message.length > 1) { 
    return (
      <Message success> {message} </Message> 
    )
  } else {
    return (
      <div style={{display: 'none'}}></div>
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
          <img src='https://i.imgur.com/JZTwu0q.jpg' className='ui image' alt="Djikstra"/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

const Footer = () => (
  //div className="ui pink inverted segment">
  <div className="ui pink segment">
    <div style={{margin: '15px'}}>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

      See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
    </div>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div className="ui justified container"> 
      <h2 className='ui header'><i>{anecdote.content}</i> by {anecdote.author}</h2>
      <div className="ui divider"></div>
      <p>has {anecdote.votes} votes </p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a> </p>
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
        <h2>Create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>content</label>
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>url for more info</label>
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field>
          <Button>create</Button>
        </Form>
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
              <h1 className="ui pink header">Software anecdotes</h1>
              <MenuComponent />
                <div className="ui segment">
                  <Notification message={this.state.notification} />
                  <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
                  <Route exact path="/create" render={({history}) => <CreateNew addNew={this.addNew} history={history}/>} />
                  <Route exact path="/about" render={() => <About />} />
                  <Route exact path="/anecdotes/:id" render={({match}) => <Anecdote anecdote={this.anecdoteById(match.params.id)}/>} />
                </div>
              <Footer />
            </div>
          </Router>
        </div>
      </Container>
    );
  }
}

export default App;
