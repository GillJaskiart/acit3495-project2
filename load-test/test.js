import http from 'k6/http';
import { sleep, check } from 'k6';

// Real external IPs
const ENTER_DATA_URL = 'http://34.148.44.245';
const SHOW_RESULTS_URL = 'http://34.23.29.245';

export const options = {
  stages: [
    { duration: '15s', target: 10 },   // warm up
    { duration: '30s',  target: 50 },   // trigger scaling
    { duration: '45s',  target: 100 },  // peak load
    { duration: '15s', target: 0 },    // scale down
  ],
};

export function setup() {
  let warm1 = http.get(`${ENTER_DATA_URL}/login`);
  check(warm1, { 'warmup enter-data status 200': (r) => r.status === 200 });

  let warm2 = http.get(`${SHOW_RESULTS_URL}/login`);
  check(warm2, { 'warmup show-results status 200': (r) => r.status === 200 });

  sleep(1);
}

export default function () {
  let r1 = http.get(`${ENTER_DATA_URL}/login`);
  check(r1, { 'enter-data status 200': (r) => r.status === 200 });

  let r2 = http.get(`${SHOW_RESULTS_URL}/login`);
  check(r2, { 'show-results status 200': (r) => r.status === 200 });

  sleep(1);
}

