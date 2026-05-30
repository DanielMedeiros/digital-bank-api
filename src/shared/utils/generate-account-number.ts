import { randomUUID } from 'crypto';

export function generateAccountNumber() {
  return randomUUID().slice(0, 8);
}
