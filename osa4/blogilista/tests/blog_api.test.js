const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const User = require('../models/user')
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
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)

  })

describe('Blog GET request tests', () => {

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

describe('User GET request tests', () => {
    test('GET returns number of users in database', async () => {
        const response = await api.get('/api/blogs')
        
        assert.strictEqual(response.body.length, helper.initialUsers.length)
    })
})

describe('Blog POST request tests', () => {
    
    test('blog can be added', async () => {
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

describe('User POST request tests', () => {
    test('user can be added', async () => {
        const newUser = {
            username: 'postTest',
            name: 'SuperTest Post',
            password: 'sairaanSalainen'
        }
    
        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/users')
    
        const usernames = response.body.map(n => n.username)
    
        assert.strictEqual(response.body.length, helper.initialUsers.length + 1)
    
        assert(usernames.includes('postTest'))
    })

    test('if username is too short, creation fails with proper status code and message', async () => {
        const initialUsers = await api.get('/api/users')

        const newUser = {
            username: 'hm',
            name: 'SuperTest Post',
            password: 'ei onnistu'
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        
        const currentUsers = await api.get('/api/users')

        assert(result.body.error.includes('username is too short'))

        assert.strictEqual(initialUsers.length, currentUsers.length)
    })

    test('if password is too short, creation fails with proper status code and message', async () => {
        const initialUsers = await api.get('/api/users')

        const newUser = {
            username: 'hmmm',
            name: 'SuperTest Post',
            password: 'ei'
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        
        const currentUsers = await api.get('/api/users')

        assert(result.body.error.includes('password is too short'))

        assert.strictEqual(initialUsers.length, currentUsers.length)
    })

    test('if username is missing, creation fails with proper status code and message', async () => {
        const initialUsers = await api.get('/api/users')

        const newUser = {
            name: 'SuperTest Post',
            password: 'eiOnnistu'
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        
        const currentUsers = await api.get('/api/users')

        assert(result.body.error.includes('username is missing'))

        assert.strictEqual(initialUsers.length, currentUsers.length)
    })

    test('if password is missing, creation fails with proper status code and message', async () => {
        const initialUsers = await api.get('/api/users')

        const newUser = {
            username: 'hmmm',
            name: 'SuperTest Post'
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        
        const currentUsers = await api.get('/api/users')

        assert(result.body.error.includes('password is missing'))

        assert.strictEqual(initialUsers.length, currentUsers.length)
    })


    test('if username already exists, creation fails with proper status code and message', async () => {
        const initialUsers = await api.get('/api/users')

        const newUser = {
            username: initialUsers.body[0].username,
            name: 'SuperTest Post',
            password: 'ei onnistu'
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        
        const currentUsers = await api.get('/api/users')

        assert(result.body.error.includes('username must be unique'))

        assert.strictEqual(initialUsers.length, currentUsers.length)
    })
})

describe('Blog DELETE request tests', () => {

    test('successful deletion returns 204', async () => {
        const initialBlogs = await api.get('/api/blogs')
        const deleteThis = initialBlogs.body[0]

        await api
          .delete(`/api/blogs/${deleteThis.id}`)
          .expect(204)

        const afterDeletion = await api.get('/api/blogs')
        
        const blogsLeft = afterDeletion.body.length
        assert.strictEqual(blogsLeft, helper.initialBlogs.length - 1)
    })
    
    test('after deletion the deleted blog is not found', async () => {
        const initialBlogs = await api.get('/api/blogs')
        const deleteThis = initialBlogs.body[0]

        await api
          .delete(`/api/blogs/${deleteThis.id}`)
          .expect(204)

        const afterDeletion = await api.get('/api/blogs')
  
        const ids = afterDeletion.body.map(r => r.id)
        assert(!ids.includes(initialBlogs.id))
    })
  
})

describe('Blog PUT request tests', () => {

    test('editing one field changes its value', async () => {
        const initialBlogs = await api.get('/api/blogs')
        const oldBlog = initialBlogs.body[0]
        const copyBlog = { ...oldBlog, likes: 69 }

        await api
        .put(`/api/blogs/${copyBlog.id}`)
        .send(copyBlog)
        .expect(200)

        const blogsAfterChange = await api.get('/api/blogs')

        assert.notEqual(oldBlog.likes,blogsAfterChange.body[0].likes)
    }) 

    test('editing blog does not increase the number of blogs', async () => {
        const initialBlogs = await api.get('/api/blogs')
        const oldBlog = initialBlogs.body[0]
        const copyBlog = { ...oldBlog, likes: 69 }

        await api
        .put(`/api/blogs/${copyBlog.id}`)
        .expect(200)

        const blogsAfterChange = await api.get('/api/blogs')

        assert.strictEqual(initialBlogs.body.length,blogsAfterChange.body.length)
    }) 
})


after(async () => {
  await mongoose.connection.close()
})