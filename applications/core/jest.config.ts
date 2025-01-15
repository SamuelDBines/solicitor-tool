
process.env.DB_CLIENT = 'mock';

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.*\\.(ts|tsx)$': 'ts-jest',
  },
  clearMocks: true,
  setupFiles: ['ts-node/register'],
  testMatch: ['**/*.test.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};