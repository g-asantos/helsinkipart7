import React from 'react'
import Notification from './Notification'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { notificationLogFail } from '../reducers/notificationReducer'
import {
  TextField,
  Button
} from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()




  const handleLogin = async (e) => {
    e.preventDefault()

    try {


      const username = e.target.username.value
      const password = e.target.password.value
      e.target.username.value = ''
      e.target.password.value = ''
      const user = await loginService.login({
        username, password
      })
      console.log(user)

      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )

      dispatch(login(user))

    } catch (err) {
      dispatch(notificationLogFail(4000))
      console.error(err)
    }
  }



  return (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <div>
        <TextField name='username' label='username' />
      </div>
      <div>
        <TextField name='password' label='password' />
      </div>
      <br />
      <div>
      <Button variant='contained' color='primary' type='submit' id='login'>login</Button>
      </div>
      <Notification />
    </form>
  )
}

export default LoginForm