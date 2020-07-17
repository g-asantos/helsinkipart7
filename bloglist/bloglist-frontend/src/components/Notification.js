import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  

  if(notification === 'NONE' || undefined){
    return ''
  } else {
    return (
      <Alert severity='success' style={style}>
        {notification}
      </Alert>
    )
  }
  
}

export default Notification