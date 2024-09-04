const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      "title": "Kukuuuksia",
      "author": "Kuku Kissa",
      "url": "www.feikki.fi",
      "likes": 1000000,
      "userId": "66d83aa13a87acf3583fad55",
      "id": "66d83aa13a87acf3583fad51"
    },
    {
      "title": "Pöpön blogi",
      "author": "Pöpö kissa",
      "url": "www.tosiaito.fi",
      "likes": 69,
      "userId": "66d7f8bdd962199a00c05df4",
      "id": "66d553976189cffe79c5a3f4"
    }
]

const initialUsers = [
  {
    "username": "kuki22",
    "name": "Kuku Kissa",
    "blogs": ["66d83aa13a87acf3583fad51"],
    "id": "66d83aa13a87acf3583fad55"
  },
  {
    "username": "pöpö11",
    "name": "Peuni Kissa",
    "blogs": ["66d553976189cffe79c5a3f4"],
    "id": "66d7f8bdd962199a00c05df4"
  }
]

module.exports = {
    initialBlogs, initialUsers
  }