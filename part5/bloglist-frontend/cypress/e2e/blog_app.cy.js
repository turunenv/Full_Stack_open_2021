describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    
    //add a user to the database
    const user = {
        name: 'Usain Bolt',
        username: 'UZain',
        password: 'fastman'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    //go to the front page of the app
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    //check that heading and labels are found
    cy.contains('Login to the application')
    cy.contains('username')
    cy.contains('password')

    //check that the input-elements are found
    cy.get('#Username')
    cy.get('#Password')

    //check that the login-button is found
    cy.get('.login-button').contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      //get input elements, type credentials and click the login-button
      cy.get('#Username').type('UZain')
      cy.get('#Password').type('fastman')
      cy.get('.login-button').click()

      cy.contains('Usain Bolt logged in')      
    })

    it('fails with wrong credentials', function() {
      //get input elements, type credentials and click the login-button
      cy.get('#Username').type('UZain')
      cy.get('#Password').type('wrong')
      cy.get('.login-button').click()

      //error-message rendered to the page?
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'UZain', password: 'fastman' })
    })

    it('A new blog can be created', function() {
      cy.contains('new blog').click()

      //fill the form 
      cy.get('#title').type('CSS selectors')
      cy.get('#author').type('Usain')
      cy.get('#url').type('www.usain-css.com')

      //click the create-button
      cy.contains('create').click()

      //check that span-elements with title and author can be found
      cy.contains('span', 'CSS selectors')
      cy.contains('span', 'Usain')
    })

    describe('When a blog has been created', function() {
        //add a default blog before each test in this block
        beforeEach(function() {
          const blog = {
            title: 'FullStack fun',
            author: 'Dan Abramov',
            url: "fb.com",
          }
          cy.addBlog(blog)
        })

        it('a user can like a blog', function() {
            //click open the full blog details
            cy.contains('view').click()

            //make sure that likes is initially 0
            cy.contains('span', 'likes 0')

            cy.contains('button', 'like').click()

            //check that likes is 1 after clicking the like-button
            cy.contains('span', 'likes 1')

        })

        it.only('user who created the blog can delete it', function() {
            cy.contains('view').click()

            //click the remove button
            //cypress auto-accepts confirmations -> no need to click the window.confirm dialog
            cy.contains('remove').click()

            //check that the blog has been removed
            cy.get('html').should('not.contain', 'FullStack fun')
            cy.get('html').should('not.contain', 'Dan Abramov')
        })
        
    })
  })
})