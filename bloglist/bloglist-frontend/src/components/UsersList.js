import React from 'react'
import { useSelector } from 'react-redux'
import {

  Link,

} from 'react-router-dom'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'





const UserList = () => {

  const users = useSelector(state => state.users)
  const position = {
    position: 'relative',
    left: '48px'
  }
  const linkStyle = {
    textDecoration: 'none',
    color: 'rgb(102, 0, 102)',
    fontWeight: 'bold'
  }

  return (
    <div>


      <h1>Users</h1>
      <TableContainer id='table' component={Paper}>
        <Table>
          <TableBody >
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>

            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell><Link style={linkStyle} to={`/users/${user.id}`}>{user.username}</Link></TableCell>
                <TableCell style={position}>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>



        </Table>


      </TableContainer>
    </div>
  )
}


export default UserList