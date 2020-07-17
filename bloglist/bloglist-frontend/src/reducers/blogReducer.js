/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'



const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return (action.data).sort((a, b) => b.likes - a.likes)
  case 'ADD_VOTE':
    const id = action.data.id
    const changedBlog = {
      ...action.data,
      likes: action.data.likes + 1
    }
    return state.map(blog => blog.id !== id ? blog : changedBlog).sort((a, b) => b.likes - a.likes)
  case 'ADD_COMMENT':
    const blogId = action.data.blogId
    const blog = state.find(blog => blog.id === blogId)
    blog.comments.push(action.data)

    return state.filter(blog => blog.id === blogId)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  default:
    return state

  }
}
const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })

  }
}



const createBlog = (content) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_BLOG',
      data: content
    })


  }
}

const removeBlog = (content) => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_BLOG',
      data: content
    })


  }
}


const vote = (content) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_VOTE',
      data: content
    })
  }
}


const comment = (content) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_COMMENT',
      data: content
    })
  }
}

export {
  blogReducer,
  createBlog,
  initializeBlogs,
  vote,
  removeBlog,
  comment

}