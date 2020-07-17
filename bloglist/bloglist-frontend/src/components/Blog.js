import React from 'react'
import {
  Link,
} from 'react-router-dom'

const linkStyle = {
  textDecoration: 'none',
  color: 'rgb(77, 0, 77)',
  fontWeight: 'bold'
}


const Blog = ({ blog }) => (

  


  <div className='blog'>
   
   
   <Link style={linkStyle} to={`/blogs/${blog.blogId}`}>{blog.title}</Link>
   <div>{blog.author}</div>
      

    
  </div>
)

export default Blog
