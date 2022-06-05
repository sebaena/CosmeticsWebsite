const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body

    const user = await User.findOne({username})
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if(!user){
        return response.status(401).json({
            error: 'username does not exist'
        })
    }

    if(!passwordCorrect){
        return response.status(401).json({
            error: 'incorrect password'
        })
    }

    const userForToken = {
        username: user.username
    }

    const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60})

    response.status(200).send({token, username: user.username})
})

module.exports = loginRouter