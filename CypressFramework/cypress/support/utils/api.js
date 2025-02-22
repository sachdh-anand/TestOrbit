Cypress.Commands.add('apiAuth', (username, password) => {
  cy.request({
    method: 'POST',
    url: 'https://api.example.com/auth', // Replace with your actual API endpoint
    body: {
      username: username,
      password: password
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('token');
    cy.log('Authentication successful');
  });
});