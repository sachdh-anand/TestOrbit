import http from "k6/http";
import {
  describe,
  expect,
} from "https://jslib.k6.io/k6chaijs/4.5.0.1/index.js";

export let options = {
    scenarios: {
      load_test: {
        executor: "ramping-arrival-rate",
        startRate: 5, // Start with 5 requests/sec
        timeUnit: "1s",
        preAllocatedVUs: 10, // Start with 10 Virtual Users (VUs)
        maxVUs: 200, // Scale up to 50 VUs
        stages: [
          { duration: "30s", target: 50 }, // Ramp up to 50 requests/sec in 30 sec
          { duration: "90s", target: 50 }, // Maintain for 1.5 min
          { duration: "30s", target: 0 }, // Ramp down
        ],
      },
  
      stress_test: {
        executor: "ramping-arrival-rate",
        startRate: 10, // Start with 10 requests/sec
        timeUnit: "1s",
        preAllocatedVUs: 20, // Start with 20 VUs
        maxVUs: 500, // Scale up to 100 VUs
        stages: [
          { duration: "30s", target: 100 }, // Ramp up to 100 requests/sec in 30 sec
          { duration: "60s", target: 200 }, // Increase to 200 requests/sec over 1 min
          { duration: "30s", target: 300 }, // Peak at 300 requests/sec for 30 sec
          { duration: "30s", target: 0 }, // Ramp down to 0
        ],
      },
  
      soak_test: {
        executor: "constant-arrival-rate",
        rate: 50, // Sustained 50 requests/sec
        timeUnit: "1s",
        duration: "10m", // Run for 10 minutes
        preAllocatedVUs: 50, // Maintain 50 Virtual Users (VUs)
        maxVUs: 300, // Scale up if necessary
      },
  
      spike_test: {
        executor: "ramping-arrival-rate",
        startRate: 10, // Start with 10 requests/sec
        timeUnit: "1s",
        preAllocatedVUs: 20, // Start with 20 VUs
        maxVUs: 400, // Scale up to 200 VUs
        stages: [
          { duration: "10s", target: 200 }, // Sudden spike to 200 requests/sec in 10 sec
          { duration: "10s", target: 200 }, // Hold for 10 sec
          { duration: "10s", target: 0 }, // Drop off immediately
        ],
      },
    },
  
    thresholds: {
      http_req_duration: ["p(90)<500", "p(95)<800", "p(99)<1200"], // Stricter Response time SLAs for e-commerce APIs
      http_req_failed: ["rate<0.01"], // <1% error rate allowed
      checks: ["rate>0.99"], // Ensure at least 99% pass
    },
  };
  

export default function () {
  describe("🐊 Crocodiles API Performance Tests", () => {
    describe("✅ Fetch a list of public crocodiles", () => {
      const response = http.get("https://test-api.k6.io/public/crocodiles");

      expect(response.status, "Response status should be 200").to.equal(200);
      expect(response).to.have.validJsonBody();
      expect(
        response.json().length,
        "Number of crocodiles should be more than 4"
      ).to.be.above(4);
    });

    describe("✅ Fetch a single crocodile by valid ID", () => {
      const expected = {
        id: 6,
        name: "Sang Buaya",
        sex: "F",
        date_of_birth: "2006-01-28",
        age: 16,
      };

      const response = http.get("https://test-api.k6.io/public/crocodiles/6");

      expect(response.status, "Status should be 200").to.equal(200);
      expect(
        JSON.parse(response.body),
        "Response body should match expected"
      ).to.deep.equal(expected);
    });

    describe("❌ Fetch an invalid crocodile ID (should return 404)", () => {
      const response = http.get(
        "https://test-api.k6.io/public/crocodiles/9999999"
      );

      expect(response.status, "Status should be 404").to.equal(404);
      expect(
        JSON.parse(response.body).detail,
        "Error message should be 'Not found.'"
      ).to.equal("Not found.");
    });
  });
}
