const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const bcrypt = require('bcrypt')
const User = require('../models/user');
const { response } = require("../app");

describe('when there is initially a user in db', () => {
    beforeEach(async () => {
        await User.deleteMany();

        const passwordHash = await bcrypt.hash('123456789', 10);
        const user = new User({username: 'admin', passwordHash: passwordHash});

        await user.save();
    })

    test('create a new user succeeds', async () => {
        const usersBefore = await helper.userInDb();

        const newUser = {
            username: "test",
            password: "test"
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAfter  = await helper.userInDb();
        expect(usersAfter).toHaveLength(usersBefore.length + 1)

        const usernames = usersAfter.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    })

    test('create a new user with the same username will fail', async () => {
        const usersBefore = await helper.userInDb();

        const newUser = {
            username: "admin",
            password: "test"
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username has been used')

        const usersAfter = await helper.userInDb();
        expect(usersAfter).toEqual(usersBefore);
    })
})