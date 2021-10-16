import type { Config } from '@jest/types';
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.(suite|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['dist'],
  collectCoverage: true,
  collectCoverageFrom: ['./src/index.ts'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['./dist', './node_modules', './src/__tests__'],
  coverageReporters: ['json', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 100,
      lines: 100,
      statements: 97
    }
  }
};
export default config;
