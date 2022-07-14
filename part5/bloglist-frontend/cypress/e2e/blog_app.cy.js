describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
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
})