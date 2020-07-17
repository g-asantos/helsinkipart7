import React from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { vote, comment } from '../reducers/blogReducer'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import IconButton from '@material-ui/core/IconButton'

const BlogProfile = ({ blog }) => {
  const dispatch = useDispatch()
  if (!blog) {
    return null
  }

  if (!blog.id) {
    setTimeout(() => { window.location.reload() }, 1000)
    return null
  }

  const voteBlog = async (e) => {
    e.preventDefault()
    try {

      const id = e.currentTarget.id
      const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
      const user = JSON.parse(loggedUserJSON)

      let voteAddBlog = {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1
      }

      await blogService.update(voteAddBlog, user.token, id)

      dispatch(vote(blog))


    } catch (error) {
      console.error(error)
    }
  }

  const addComment = async (e) => {
    e.preventDefault()

    try {

      const content = e.target.content.value
      const id = e.currentTarget.id
      let newComment = {
        content: content,
        blogId: id
      }

      await blogService.comment(newComment, id)
      dispatch(comment(newComment))

    } catch (err) {
      console.error(err)
    }
  }


  return (
    <div>


      <h1>{blog.title}</h1>
      <div>
        <div >
          <div>{blog.url}</div>
          <br />

          <div id='likesValue'>{blog.likes} likes
            <label htmlFor={blog.id}>
              <IconButton color="primary" aria-label="add-likes" component="span"  onClick={voteBlog} type='submit' id={blog.id}>
                <ThumbUpAltIcon />
              </IconButton>
            </label>
          </div>
          <br />
          <div>{blog.user.username}</div>
        </div>
      </div>
      <form onSubmit={addComment} id={blog.id}>
        <h2>comments</h2>
        <input type="text" name='content' />
        <button type='submit'>add comment</button>
        {blog.comments ?
          blog.comments.map(comment => (
            <ul key={comment.content}>
              <li>{comment.content}</li>
            </ul>
          ))
          :
          <></>
        }
      </form>
    </div>


  )
}


export default BlogProfile