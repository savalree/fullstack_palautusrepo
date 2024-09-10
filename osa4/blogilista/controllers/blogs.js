const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.
  find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log("token is", request.token)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if(!body.title || !body.url){
    return response.status(400).end()
  }

  const likes = body.likes !== undefined ? body.likes : 0

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes,
    user: user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(blog.user.toString() === decodedToken.id.toString()){  
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }else{
    return response.status(401).json({ error: 'not authorized to delete this blog' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  
  response.json(updatedBlog)
})

module.exports = blogsRouter