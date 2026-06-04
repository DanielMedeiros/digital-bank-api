export default {
  rootDir: '.',

  testMatch: ['<rootDir>/test/**/*.spec.ts'],

  moduleFileExtensions: ['js', 'json', 'ts'],

  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
