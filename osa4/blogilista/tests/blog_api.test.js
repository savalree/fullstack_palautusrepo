const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/test_helper')
const { url } = require('node:inspector')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

describe('GET request tests', () => {
    test('GET returns number of blogs in database', async () => {
        const response = await api.get('/api/blogs')
    
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
    
    test('returned blogs have an id field', async () => {
        const response = await api.get('/api/blogs')
        const idFieldPresent = response.body.some(blog => 'id' in blog)
        assert.strictEqual(idFieldPresent, true)
    })
})

describe('POST request tests', () => {
    
    test('note can be added', async () => {
        const newBlog = {
            title: 'This is very new',
            author: 'SuperTest',
            url: 'www.testi.fi',
            likes: 69
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
    
        const titles = response.body.map(n => n.title)
    
        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    
        assert(titles.includes('This is very new'))
    })

    test('like is initialized to 0 when value is missing', async () => {
        const newBlog = {
            title: 'No likes for me',
            author: 'SuperTest',
            url: 'www.yhyy.fi',
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
    
        const findNew = response.body.filter(n => n.title === newBlog.title)

        const getLikes = findNew[0].likes

        assert.strictEqual(getLikes, 0)
    })

    test('if title is missing from request, 400 is returned and blog is not added', async () => {
        const titlelessBlog = {
            author: 'mUtsis',
            url: 'www.yhyy.fi',
            likes: 100000
        }

        await api
        .post('/api/blogs')
        .send(titlelessBlog)
        .expect(400)

        const response = await api.get('/api/blogs')
      
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('if url is missing from request, 400 is returned and blog is not added', async () => {
        const urlessBlog = {
            author: 'iSukkis',
            title: '',
            likes: 100000
        }

        await api
        .post('/api/blogs')
        .send(urlessBlog)
        .expect(400)

        const response = await api.get('/api/blogs')
      
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

})

after(async () => {
  await mongoose.connection.close()
})