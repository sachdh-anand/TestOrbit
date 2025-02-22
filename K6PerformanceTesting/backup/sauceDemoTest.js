import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

// ✅ Load config from environment variables or use defaults
const BASE_URL = __ENV.BASE_URL || 'https://www.saucedemo.com';
const USERNAME = __ENV.USERNAME || 'standard_user';
const PASSWORD = __ENV.PASSWORD || 'secret_sauce';

// ✅ Load config settings for stages & thresholds
const TEST_TYPE = __ENV.TEST_TYPE || 'load'; // Allow switching between load/stress tests
const config = JSON.parse(open('../configs/masterConfig.json'));
const selectedTest = config[`${TEST_TYPE}Test`] || config.loadTest;

// Custom performance metrics
const loginTrend = new Trend('login_duration');
const addToCartTrend = new Trend('add_to_cart_duration');
const checkoutTrend = new Trend('checkout_duration');

export let options = {
  stages: selectedTest.stages, // ✅ Now dynamically selected from config
  thresholds: config.thresholds // ✅ Load thresholds from config
};

// ✅ **Simulating SauceDemo Login**
function login() {
  let res = http.post(`${BASE_URL}/`, {
    username: USERNAME,
    password: PASSWORD
  });

  // Debugging Response
  console.log(`Login Response Status: ${res.status}`);
  console.log(`Login Response Body: ${res.body}`);

  check(res, {
    'Login successful': (r) => r.status === 200 || r.status === 302 // Redirect means login success
  });

  if (res.status !== 200 && res.status !== 302) {
    console.error('❌ Login failed! Check credentials and test setup.');
    return null;
  }

  loginTrend.add(res.timings.duration);
  return res.cookies; // Returning session cookies for authentication
}

// ✅ **Add item to cart**
function addToCart(cookies) {
  let headers = { headers: { Cookie: cookies } };

  let res = http.post(`${BASE_URL}/cart.html`, null, headers);

  check(res, { 'Item added to cart': (r) => r.status === 200 });

  addToCartTrend.add(res.timings.duration);
}

// ✅ **Proceed to checkout**
function checkout(cookies) {
  let headers = { headers: { Cookie: cookies } };

  let res = http.post(`${BASE_URL}/checkout-step-one.html`, null, headers);

  check(res, { 'Checkout successful': (r) => r.status === 200 });

  checkoutTrend.add(res.timings.duration);
}

// ✅ **Test Execution Flow**
export default function () {
  let cookies = login();
  if (!cookies) {
    console.error("⚠️ Skipping test due to login failure.");
    return;
  }

  addToCart(cookies);
  checkout(cookies);
  sleep(1);
}
