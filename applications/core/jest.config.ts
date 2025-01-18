
import { execSync } from 'child_process';
process.env.NODE_ENV = 'test';
process.env.DB_CLIENT = 'mock';
process.env.DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/test';

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.*\\.(ts|tsx)$': 'ts-jest',
  },
  clearMocks: true,
  globalTeardown: './jest.teardown.js',
  setupFilesAfterEnv: ['./jest.setup.js'],
  setupFiles: ['ts-node/register'],
  testMatch: ['**/*.test.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
