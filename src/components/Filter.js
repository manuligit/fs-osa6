import React from 'react'
import { updateFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.updateFilter(event.target.value)
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

const mapDispatchToProps = { updateFilter }

const ConnectedFilter = connect(undefined, mapDispatchToProps)(Filter)

export default ConnectedFilter