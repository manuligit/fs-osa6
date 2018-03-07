
export const createNotification = (store, content, actions, message) => {
  //console.log("hello", content)
  store.dispatch(actions.createNotification(message, content))
  setTimeout(function () {
    //if multiple anecdotes are voted, remove only the newest one:
    if (store.getState().notification === `${message} ${content}`) {
      store.dispatch(actions.removeNotification())
    }
  }, 5000)
}