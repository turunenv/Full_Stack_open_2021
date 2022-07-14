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
})