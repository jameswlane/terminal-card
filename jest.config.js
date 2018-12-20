module.exports = {
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsConfig: 'tsconfig.json',
    },
  },
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/tests/**/*.(test|spec).(ts|tsx|js)',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  clearMocks: true,
  preset: 'ts-jest',
}
