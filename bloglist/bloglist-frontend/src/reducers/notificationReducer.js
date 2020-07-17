const notificationReducer = (state = 'NONE', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  default:
    return state

  }
}


export const notificationCreation = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: `you created '${content}'`
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: 'NONE'
      })
    }, time)
  }

}

export const notificationDeletion = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: `you deleted '${content}'`
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: 'NONE'
      })
    }, time)
  }

}

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: `you voted '${content}'`
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: 'NONE'
      })
    }, time)
  }

}

export const notificationLogFail = (time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: 'Wrong Username or Password'
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: 'NONE'
      })
    }, time)
  }

}

export default notificationReducer