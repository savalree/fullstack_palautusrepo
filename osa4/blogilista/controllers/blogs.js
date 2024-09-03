const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = new Blog(request.body)

  if(!body.title || !body.url){
    return response.status(400).end()
  }

  const likes = body.likes !== undefined ? body.likes : 0

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes
  })

  const result = await blog.save()

  response.status(201).json(result)
})

module.exports = blogsRouter