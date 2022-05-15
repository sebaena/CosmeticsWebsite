const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const {username, password} = request.body;

    const existingUser = await User.findOne({username: username});
    if(existingUser){
        return response.status(400).json({
            error: 'username has been used'
        })
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        passwordHash
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({});
    response.json(users);
})

module.exports = usersRouter