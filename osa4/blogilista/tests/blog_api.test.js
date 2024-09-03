const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
    {
        "title": "Kukuuuksia",
        "author": "Kuku Kissa",
        "url": "www.feikki.fi",
        "likes": 1000000,
        "id": "66d5537a6189cffe79c5a3f1"
      },
      {
        "title": "Postmanista päivee",
        "author": "Post Mees",
        "url": "www.tosiaito.fi",
        "likes": 1,
        "id": "66d553976189cffe79c5a3f4"
      }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

test('GET returns number of blogs in database', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

// test('returned blogs have an id field', async () => {
//     const response = await api.get('/api/blogs')
  
//     assert.strictEqual(response.body.length, 3)
// })

after(async () => {
  await mongoose.connection.close()
})