import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogList from './BlogList'
import BlogForm from './BlogForm'



test('renders title and author, but not url or likes', () => {
  const blog = {
    title: 'Testing how to test',
    author: 'Myself',
    url: 'www.google.com',
    likes: 3
  }

  const component = render(
    <Blog blog={blog} />
  )


  expect(component.container).toHaveTextContent(
    `${blog.title} ${blog.author}`
  )

  expect(component.container).not.toHaveTextContent(
    `${blog.url} ${blog.likes}`
  )
})

describe('<Togglable />', () => {
  let component

  const blog = {
    title: 'Testing how to test',
    author: 'Myself',
    url: 'www.google.com',
    likes: 3
  }

  beforeEach(() => {
    component = render(
      <div>
        <Blog blog={blog} />
        <Togglable buttonLabel="show" buttonCancel='remove'>
          <div className="testDiv">
            {blog.url} {blog.likes}
          </div>
        </Togglable>
      </div> )
  })



  test('renders title and author' , () => {

    const div = component.container.querySelector('.blog')

    expect(div).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )

  })

  test('upon click renders all' , () => {

    const button = component.getByText('show')
    fireEvent.click(button)


    const div = component.container.querySelector('.testDiv')
    expect(div).not.toHaveStyle('display: none')

  })











})

test('clicking twice calls event handler twice', () => {
  const blog = [{
    title: 'Testing how to test',
    author: 'Myself',
    url: 'www.google.com',
    likes: 3,
    user: {
      username: 'wee'
    }
  }]

  const user = {
    username: 'wee'
  }

  const mockHandler = jest.fn()

  const component = render(
    <BlogList blogs={blog} user={user} updateBlog={mockHandler} deleteBlog={mockHandler} />
  )


  const form = component.container.querySelector('.likeAdd')

  fireEvent.submit(form)
  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('new blog', () => {
  const createBlog = jest.fn()




  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'help' }
  })
  fireEvent.change(author, {
    target: { value: 'please' }
  })
  fireEvent.change(url, {
    target: { value: 'work' }
  })

  fireEvent.submit(form)


  expect(createBlog.mock.calls).toHaveLength(1)
  expect(title.value).toBe('help')
  expect(author.value).toBe('please')
  expect(url.value).toBe('work')

})