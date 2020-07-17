const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')
const { urlencoded } = require('express')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })



    response.json(blogs.map(blog => blog.toJSON()))

})





blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!request.token) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if (!decodedToken.id && !decodedToken) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    const user = await User.findById(decodedToken.id)
    
    const blog = new Blog({
        blogId: body.blogId,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()


    response.status(200).end()
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const body = request.body
    const id = request.params.id
    const blog = await Blog.findById(id)
    const comment = new Comment({
        content: body.content
    })
    
    const savedComment = await comment.save()
    blog.comments.push(savedComment)
    await blog.save()
    response.json(savedComment)
})

blogsRouter.delete('/:id', async (req, res) => {

    const blog = await Blog.findById(req.params.id)
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    
    if (blog.user.toString() === decodedToken.id.toString()) {
        Blog.findByIdAndDelete(req.params.id).then(
            () => { res.status(204).end() }
        ).catch(error => next(error))
    } else {
        return res.status(401).json({ error: 'this user cannot delete this blog' })
    }




})



blogsRouter.put('/:id', async (req, res) => {

    const blog = {
        ...req.body
    }
   
    
    await Blog.findByIdAndUpdate(req.params.id, blog, { new: true }).then(
        () => { res.status(204).end() }
    )


})

module.exports = blogsRouter