/* eslint-disable no-undef */

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url, likes: likes || 0 },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedAppUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})


describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Tester',
      username: 'testmaster',
      password: '1111'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })


  describe('Login', function () {
    it('user can login', function () {


      cy.get('#username').type('testmaster')
      cy.get('#password').type('1111')
      cy.get('#login').click()

      cy.contains('testmaster logged in')
    })


    it('login fails with wrong password', function () {
      cy.get('#username').type('wrong')
      cy.get('#password').type('12345')
      cy.get('#login').click()

      cy.contains('Wrong Username or Password')

    })
  })


  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testmaster', password: '1111' })

    })


    it('A new blog can be created', function () {
      cy.createBlog({
        title: 'Masterpiece',
        author: 'Myself',
        url: 'www.google.com'
      })
      cy.contains('Masterpiece')
    })


  })

  describe('After creation', function () {
    beforeEach(function () {
      cy.login({ username: 'testmaster', password: '1111' })
      cy.createBlog({
        title: 'Masterpiece',
        author: 'Myself',
        url: 'www.google.com'
      })
    })


    it('A blog can be liked', function () {
      cy.contains('view').click()
      cy.get('#likes').click()
      cy.contains('likes: 1')
    })

    it('A blog can be deleted', function () {
      cy.contains('view').click()
      cy.get('#remove').click()
      cy.contains('a Blog was removed!')

    })



  })



  describe('multiple blogs', function () {
    beforeEach(function () {
      cy.login({ username: 'testmaster', password: '1111' })
      cy.createBlog({
        title: 'Masterpiece',
        author: 'Myself',
        url: 'www.google.com',
        likes: 0
      })
      cy.createBlog({
        title: 'Masterpiece2',
        author: 'Myself2',
        url: 'www.google2.com',
        likes: 1
      })
      cy.createBlog({
        title: 'Masterpiece3',
        author: 'Myself3',
        url: 'www.google3.com',
        likes: 3
      })
    })


    it('is ordered by likes', function () {




      cy.get('#blog .likeAdd #likesValue').then(blogs => {
        console.log(Number(blogs[0].innerText.replace(/[A-Za-z:]/g, '')))
        expect(Number(blogs[0].innerText.replace(/[A-Za-z:]/g, ''))).to.be.greaterThan(Number(blogs[1].innerText.replace(/[A-Za-z:]/g, '')))
        expect(Number(blogs[1].innerText.replace(/[A-Za-z:]/g, ''))).to.be.greaterThan(Number(blogs[2].innerText.replace(/[A-Za-z:]/g, '')))

      })





    })
  })
})
