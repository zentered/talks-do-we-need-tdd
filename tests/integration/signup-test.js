'use strict'

const test = require('tape')
const api = require('../../api')
const request = require('supertest')

test('GET /', assert => {
  const expected = {
    hello: 'world'
  }

  request(api)
    .get('/')
    .end((error, res) => {
      if (error) {
        assert.fail(error)
      }

      assert.deepEqual(res.body, expected)
      assert.end()
    })
})

test('GET /signup', assert => {
  request(api)
    .get('/signup')
    .end((error, res) => {
      if (error) {
        assert.fail(error)
      }

      assert.equal(res.status, 200)
      assert.end()
    })
})

test('POST /signup fails with missing input', assert => {
  const expected = 400

  request(api)
    .post('/signup')
    .send()
    .end((error, res) => {
      if (error) {
        assert.fail(error)
      }

      assert.equal(res.status, expected)
      assert.end()
    })
})

test('POST /signup fails with missing name', assert => {
  const expected = {
    status: 400,
    text: 'missing name',
    method: 'POST',
    path: '/signup'
  }

  request(api)
    .post('/signup')
    .send({
      email: 'test'
    })
    .end((error, res) => {
      if (error) {
        assert.fail(error)
      }
      assert.deepEqual(res.error, expected)
      assert.end()
    })
})

test('POST /signup fails with missing email', assert => {
  const expected = {
    status: 400,
    text: 'missing email',
    method: 'POST',
    path: '/signup'
  }

  request(api)
    .post('/signup')
    .send({
      name: 'test'
    })
    .end((error, res) => {
      if (error) {
        assert.fail(error)
      }
      assert.deepEqual(res.error, expected)
      assert.end()
    })
})

test('POST /signup fails with missing password', assert => {
  const expected = {
    status: 400,
    text: 'missing password',
    method: 'POST',
    path: '/signup'
  }

  request(api)
    .post('/signup')
    .send({
      name: 'test',
      email: 'test'
    })
    .end((error, res) => {
      if (error) {
        assert.fail(error)
      }
      assert.deepEqual(res.error, expected)
      assert.end()
    })
})

test('POST /signup fails with password mismatch', assert => {
  const expected = {
    status: 400,
    text: 'password mismatch',
    method: 'POST',
    path: '/signup'
  }

  request(api)
    .post('/signup')
    .send({
      name: 'test',
      email: 'test',
      password: 'hello',
      passwordRepeat: 'world'
    })
    .end((error, res) => {
      if (error) {
        assert.fail(error)
      }
      assert.deepEqual(res.error, expected)
      assert.end()
    })
})

test('POST /signup fails with invalid email', assert => {
  const expected = {
    status: 400,
    text: 'no valid email'
  }

  request(api)
    .post('/signup')
    .send({
      name: 'John Doe',
      email: 'invalid',
      password: 'hello',
      passwordRepeat: 'hello'
    })
    .end((error, res) => {
      if (error) {
        assert.fail(error)
      }
      assert.deepEqual(res.body, expected)
      assert.end()
    })
})

test('POST /signup returns new user', assert => {
  const expected = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com'
  }

  request(api)
    .post('/signup')
    .send({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'hello',
      passwordRepeat: 'hello'
    })
    .end((error, res) => {
      if (error) {
        assert.fail(error)
      }
      assert.equal(res.body.firstName, expected.firstName)
      assert.equal(res.body.lastName, expected.lastName)
      assert.equal(res.body.email, expected.email)
      assert.ok(res.body.password)
      assert.end()
    })
})
