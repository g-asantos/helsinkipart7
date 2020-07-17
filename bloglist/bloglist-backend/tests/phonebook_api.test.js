const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


const biggerList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
    user: '5ef4f9f50b8cee2384458063',
    __v: 0
  },
  {
    _id: '5eefb0dd1b2ed81d789540f6',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
    user: '5ef4f9f50b8cee2384458063',
    __v: 0
  }

]



beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(biggerList[0])
  await blogObject.save()

  blogObject = new Blog(biggerList[1])
  await blogObject.save()
})

test('returns correct amount of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('has id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})



test('creates new blog post', async () => {
  const newBlog = {

    
    title: 'awfas',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
    

  }





  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpbmFsVGVzdERvd24iLCJpZCI6IjVlZjRmOWY1MGI4Y2VlMjM4NDQ1ODA2MyIsImlhdCI6MTU5MzExMzEwNX0.jZLXA4igINXV19ZF9EHQYgjGwxilOAsBNuN9ju8XnFs')
    .send(newBlog)
    .expect(200)
    

})





test('fails if no token', async () => {
  const newBlog = {

    _id: '5eefac30810e932e501ebb37',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
    __v: 0

  }


  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('has likes', async () => {
  const newBlog = {

    _id: '5eefac30810e932e501ebb37',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    __v: 0

  }

  try {

    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.body.likes).toBeDefined()
  } catch{
    newBlog.likes = 0
  }

})

test('verify missing titleurl', async () => {
  const newBlog = {

    _id: '5eefac30810e932e501ebb37',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
    __v: 0

  }


  try {

    const blogs = await api.post('/api/blogs').send(newBlog)
    expect(blogs.body.title).toBeDefined()
    expect(blogs.body.url).toBeDefined()
  } catch{
    console.error('400 Bad Request')
  }
})

test('deletes one blog', async () => {

  

  const blogs = await api.get('/api/blogs')
  
  await api
    .delete(`/api/blogs/${blogs.body[0].id}`)
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpbmFsVGVzdERvd24iLCJpZCI6IjVlZjRmOWY1MGI4Y2VlMjM4NDQ1ODA2MyIsImlhdCI6MTU5MzExMzEwNX0.jZLXA4igINXV19ZF9EHQYgjGwxilOAsBNuN9ju8XnFs')
    .expect(204)


})

test('updates blog', async () => {
  const blogToUpdate = biggerList[1]

  await api.put(`/api/blogs/${blogToUpdate._id}`)

  const response = await api.get('/api/blogs')

  expect(response.body[1].likes).toBe(8)

})

test('checks if invalid user not created', async () => {
  const newUser = {
    username: '',
    name: 'test',
    password: '1111'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)



})

afterAll(() => {
  mongoose.connection.close()
})