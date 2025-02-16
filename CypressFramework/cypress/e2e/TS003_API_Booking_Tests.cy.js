describe('TS003_API_Booking_Tests', () => {
  it('TC001_Authenticate_Create_Get_Booking', () => {
    // Create a booking
    const bookingDetails = {
      "firstname": "Jim",
      "lastname": "Brown",
      "totalprice": 111,
      "depositpaid": true,
      "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
      },
      "additionalneeds": "Breakfast"
    };

    cy.createBooking(bookingDetails).then((response) => {
      const bookingId = response.body.bookingid;

      // Get the booking
      cy.getBooking(bookingId).then((response) => {
        cy.equate(response.status, 200);
        cy.equate(response.body.firstname, 'Jim');
        cy.equate(response.body.lastname, 'Brown');
      });
    });
  });
});