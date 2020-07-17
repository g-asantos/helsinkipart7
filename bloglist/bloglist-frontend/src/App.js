import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import BlogHeader from './components/BlogHeader'
import UserList from './components/UsersList'
import UniqueUser from './components/UniqueUser'
import UniqueBlog from './components/UniqueBlog'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { login } from './reducers/loginReducer'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Container from '@material-ui/core/Container'



const App = () => {
  const dispatch = useDispatch()
  const loginInfo = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      console.log(user.token, 'test')
    }
  }, [dispatch])

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find((blog) => Number(blog.blogId) === Number(blogMatch.params.id))
    : null


  return (
    <div>


      {loginInfo === null ? <Container><LoginForm /></Container> :
        <Container>
          <Switch>
            <Route path='/blogs/:id'>
              <BlogHeader />
              <UniqueBlog blog={blog} />
            </Route>
            <Route path='/users/:id'>
              <BlogHeader />
              <UniqueUser user={user} />
            </Route>
            <Route path='/users'>
              <BlogHeader />
              <UserList />
            </Route>
            <Route path='/'>
              <BlogHeader />
              <BlogForm user={loginInfo} />
              <BlogList blogs={blogs} />
            </Route>
          </Switch>
        </Container>}



    </div>
  )

}

export default App