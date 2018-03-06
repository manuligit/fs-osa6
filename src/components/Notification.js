import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    
    if (this.props.store.getState().notification !== null) {
      return (
        <div style={style}>
          {this.props.store.getState().notification}
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default Notification
