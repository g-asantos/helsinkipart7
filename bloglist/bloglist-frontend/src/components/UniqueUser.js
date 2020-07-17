import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import StarBorder from '@material-ui/icons/StarBorder'
import PersonIcon from '@material-ui/icons/Person';

const UserProfile = ({ user }) => {

  if (!user) {
    return null
  }


  return (
    <div>

      <ListItem>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={user.username} />
      </ListItem>
      <h2>added blogs</h2>
      <List component='div'>
        {user.blogs.map(blog => (

          <ListItem key={blog.id}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}

      </List>


    </div>


  )
}


export default UserProfile