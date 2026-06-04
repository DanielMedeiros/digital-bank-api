export const prismaMock = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },

  account: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },

  transaction: {
    create: jest.fn(),
    findMany: jest.fn(),
  },

  idempotencyKey: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },

  $transaction: jest.fn(),
};
