import React from 'react'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import {

  Link,

} from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@material-ui/core'


const BlogHeader = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.login)

  const getlogout = async (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedAppUser')
    dispatch(logout())
  }

  const generalStyling = {
    display: 'inline-grid',
    'gridTemplateColumns': '80px 80px 1500px',


  }



  return (
    <div>
      <AppBar position='static'>
        <Toolbar style={generalStyling}>
          <Button color='inherit' component={Link} to='/users'>
            users
          </Button>
          <Button color='inherit' component={Link} to='/blogs'>
            blogs
          </Button>
          <div style={{ 'fontWeight': 'bold', 'color': 'rgb(0, 0, 0)', 'textTransform': 'uppercase' }}>{loggedUser.username} logged in <Button variant='contained' color='secondary' onClick={getlogout}>logout</Button></div>
        </Toolbar>

      </AppBar>
      <div>
        <h2>blog app</h2>
        <Notification />
      </div>
    </div>
  )
}






export default BlogHeader