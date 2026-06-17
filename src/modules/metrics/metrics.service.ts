import { Counter, Registry } from 'prom-client';

export const register = new Registry();

export const httpCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  registers: [register],
});

export const transferCounter = new Counter({
  name: 'bank_transfers_total',
  help: 'Total successful transfers',
  registers: [register],
});

export const depositCounter = new Counter({
  name: 'bank_deposits_total',
  help: 'Total successful deposits',
  registers: [register],
});

export const withdrawCounter = new Counter({
  name: 'bank_withdrawals_total',
  help: 'Total successful withdrawals',
  registers: [register],
});
