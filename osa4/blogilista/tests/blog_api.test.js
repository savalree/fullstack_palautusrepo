const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

test('GET returns number of blogs in database', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('returned blogs have an id field', async () => {
    const response = await api.get('/api/blogs')
    const idFieldPresent = response.body.some(blog => 'id' in blog)
    assert.strictEqual(idFieldPresent, true)
})

after(async () => {
  await mongoose.connection.close()
})