import React from 'react'
import Blog from './Blog'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const BlogList = ({ blogs }) => {







  return (
    <div>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog =>
              <TableRow key={blog.id + blog.url}>
                <TableCell>
                  <Blog key={blog.id} blog={blog} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


export default BlogList