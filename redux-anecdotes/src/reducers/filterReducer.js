export const filterReducer = (store = '', action) => {
  if (action.type==='FILTER') {
    //console.log('current filter', action.filter)
    return action.filter
  }

  return store
}

export const updateFilter = (filter) => {
  return {
    type: 'FILTER',
    filter
  }
}