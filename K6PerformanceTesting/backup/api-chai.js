import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';
import http from 'k6/http';

export let options = {
    scenarios: {
      my_scenario: {
        executor: "constant-arrival-rate",
        rate: 5,  // Run 5 iterations per second
        timeUnit: "1s",
        duration: "30s",
        preAllocatedVUs: 10,  // Start with 10 users
        maxVUs: 50,           // Scale up to 50 users
      }
    }
  };

  
export default function () {
  describe('crocodiles API', () => {
    describe('should fetch a list of public crocodiles', () => {
      const response = http.get('https://test-api.k6.io/public/crocodiles');

      expect(response.status, 'response status').to.equal(200);
      expect(response).to.have.validJsonBody();
      expect(response.json().length, 'number of crocs').to.be.above(4);
    });

    describe('should respond with status 200, when a valid user id is provided', () => {
      const expected = {
        id: 6,
        name: 'Sang Buaya',
        sex: 'F',
        date_of_birth: '2006-01-28',
        age: 16,
      };

      const response = http.get('https://test-api.k6.io/public/crocodiles/6');

      expect(response.status, 'status').to.equal(200);
      expect(JSON.parse(response.body), 'response body').to.deep.equal(expected);
    });

    describe('should respond with status 404, when an invalid user id is provided', () => {
      const response = http.get('https://test-api.k6.io/public/crocodiles/9999999');

      expect(response.status, 'status').to.equal(404);
      expect(JSON.parse(response.body).detail, 'error message').to.equal('Not found.');
    });
  });
}