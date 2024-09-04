const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { errorHandler } = require('../utils/middleware')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(!username || !password){
    let errorMessage = !username ? 'username is missing' : 'password is missing'
    return response.status(400).json({ error: `${errorMessage}` })
  }

  if(username.length <3 || password.length <3){
    let errorMessage = (username.length < password.length) ? 'username is too short' : 'password is too short'
    return response.status(400).json({ error: `${errorMessage}` })
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({ error: 'username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter