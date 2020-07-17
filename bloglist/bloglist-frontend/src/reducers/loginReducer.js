


const loginReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state

  }
}


const login = (content) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: content
    })


  }
}

const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })


  }
}


export {
    loginReducer,
    login,
    logout
  }