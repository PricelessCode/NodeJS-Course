const request = require('supertest');
const app = require('../src/app') // We made separate app.js cause we don't need to listen(port, f)
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')


// If this is not included, the previous test case will affect the other test cases' results.
// beforeEach is automatically supported by jest so you don't need to require or import 
// This gets executed before each test case.
beforeEach(setupDatabase)

// 'test' is automatically supported by jest so you don't need to require or import
test('Should signup a new user', async() => {
    const response = await request(app).post('/users').send({
        name: 'Seungho',
        email: 'poream3387@gmail.com',
        password: 'dltmdg98!'
    }).expect(201);

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull()

    // Assertiions about the response
    // Below object properties have to be included and match at least
    expect(response.body).toMatchObject({
        user: {
            name: 'Seungho',
            email: 'poream3387@gmail.com'
        },
        token: user.tokens[0].token
    });

    expect(user.password).not.toBe('dltmdgh98!');
});

test('Should login existing user', async() => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
    const user = await User.findById(response.body.user._id);
    expect(response.body.token).toBe(user.tokens[1].token)
});

test('Should not login nonexistent user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: "thisisnotmypassword"
    }).expect(400);
});

test('Should get profile for user', async() => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
});

test('Should not get profile for unauthenticated user', async() => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async() => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    // console.log(response.body)
    // Checking Database for the deleted user
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
})

test('Should not delete account for unauthenticated user', async() => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async() => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('photoFile', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId);
    // expect({}).toBe({}) // --> toBe() uses triple equality so this will fail
    expect(user.avatar).toEqual(expect.any(Buffer))
});

test('Should update valid user fields', async() => {
    const updateName = "Jess"
    const updateEmail = "poream3387@gmail.com"
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            email: updateEmail,
            name: updateName
        })
        .expect(200)
    const user = await User.findById(userOneId);
    expect(user.name).toEqual(updateName);
    expect(user.email).toEqual(updateEmail);
})

test('Should update valid user fields', async() => {
    const updateName = "Jess"
    const updateEmail = "poream3387@gmail.com"
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            email: updateEmail,
            name: updateName
        })
        .expect(200)

    // Checking database data
    const user = await User.findById(userOneId);
    expect(user.name).toEqual(updateName);
    expect(user.email).toEqual(updateEmail);
})

test('Should not update invalid user fields', async() => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Seoul'
        })
        .expect(400)
})