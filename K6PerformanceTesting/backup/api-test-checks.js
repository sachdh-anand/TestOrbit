import { check } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    my_scenario1: {
      executor: 'constant-arrival-rate',
      duration: '30s', // total duration
      preAllocatedVUs: 100, // to allocate runtime resources
      maxVUs: 150, // maximum number of VUs to run concurrently

      rate: 50, // number of constant iterations given `timeUnit`
      timeUnit: '1s',
    },
  },
};

export default function () {
  const payload = JSON.stringify({
    name: 'lorem',
    surname: 'ipsum',
  });
  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('https://quickpizza.grafana.com/api/post', payload, { headers });

  check(res, {
    'Post status is 200': (r) => res.status === 200,
    'Post Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',
    'Post response name': (r) => res.status === 200 && res.json().name === 'lorem',
  });
}