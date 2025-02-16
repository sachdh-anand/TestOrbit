// Command to get API auth token
Cypress.Commands.add('apiAuthToken', () => {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/auth`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        "username": Cypress.env('apiUsername'),
        "password": Cypress.env('apiPassword')
      }
    }).then((response) => {
      const token = response.body.token;
      return token;
    });
  });
  
  // Command to make a GET request with Bearer token
  Cypress.Commands.add('getAPI', (endpoint, bodyParams = {}) => {
    cy.apiAuthToken().then((token) => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('apiBaseUrl')}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: bodyParams
      }).then((response) => {
        cy.wrap(response);
      });
    });
  });
  
  // Command to make a POST request with Bearer token
  Cypress.Commands.add('postAPI', (endpoint, bodyParams) => {
    cy.apiAuthToken().then((token) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiBaseUrl')}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: bodyParams
      }).then((response) => {
        cy.wrap(response);
      });
    });
  });
  
  // Command to create a booking
  Cypress.Commands.add('createBooking', (bookingDetails) => {
    cy.postAPI('/booking', bookingDetails).then((response) => {
      cy.wrap(response);
    });
  });
  
  // Command to get a booking
  Cypress.Commands.add('getBooking', (bookingId) => {
    cy.getAPI(`/booking/${bookingId}`).then((response) => {
      cy.wrap(response);
    });
  });