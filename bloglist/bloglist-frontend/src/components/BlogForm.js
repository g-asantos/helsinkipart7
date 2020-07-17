import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notificationCreation } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import Togglable from '../components/Togglable'

const BlogForm = (props) => {
  const dispatch = useDispatch()
  const BlogFormRef = useRef()

  const addBlog = async (e) => {
    e.preventDefault()
    BlogFormRef.current.toggleVisibility()
    const author = e.target.author.value
    const title = e.target.title.value
    const url = e.target.url.value
    e.target.author.value = ''
    e.target.title.value = ''
    e.target.url.value = ''
    try {
      let newBlog = {
        blogId: (Math.random() * 10000).toFixed(0),
        title: title,
        author: author,
        likes: 0,
        url: url,
        token: props.user.token,
        user: props.user
      }
      await blogService.create(newBlog, props.user.token)
      dispatch(createBlog(newBlog))
      dispatch(notificationCreation(newBlog.title, 4000))

    } catch (error) {
      console.log(error)
    }
  }






  return (
    <Togglable buttonLabel='new blog' buttonCancel='cancel' ref={BlogFormRef}>
      <div>
        <div>
          <form onSubmit={addBlog}>
            <h2>create new</h2>
            <div>
            title
              <input name='title' />
            </div>
            <div>
            author
              <input name='author' />
            </div>
            <div>
            url
              <input name='url' />
            </div>
            <button type='submit' id='submit'>create</button>
          </form>
        </div>
      </div>
    </Togglable>
  )
}


export default BlogForm