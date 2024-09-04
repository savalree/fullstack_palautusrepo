const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
  {
    "username": "kuki22",
    "name": "Kuku Kissa",
    "blogs": [],
    "id": "66d7f8bdd962199a00c05df8"
  },
  {
    "username": "pöpö11",
    "name": "Peuni Kissa",
    "blogs": [],
    "id": "66d7f8bdd962199a00c05df4"
  }
]

module.exports = {
    initialBlogs, initialUsers
  }