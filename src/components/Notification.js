import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const notification = this.props.notification
    console.log(notification)
    if (notification !== null) {
      return (
        <div style={style}>
          {notification}
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}


const ConnectedNotifications = connect(mapStateToProps)(Notification)


export default ConnectedNotifications
