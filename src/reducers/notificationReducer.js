export const createNotification = (message, content) => {
  console.log('actionfor createnotification', content)
  return {
    type: 'NOTIFY',
    message,
    content
  }
}

export const removeNotification = () => {
  console.log('actionfor removenotification')
  return {
    type: 'REMOVE'
  }
}

export const notificationReducer = (store = null, action) => {
  if (action.type==='NOTIFY') {
    console.log('reducer notify ')
    return `${action.message} ${action.content}`
  }

  if (action.type==='REMOVE') {
    return null
  }
  return store
}