module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'no-trailing-spaces': ['error'],
    'no-multi-spaces': ['error'],
    'space-infix-ops': ['error'],
    '@typescript-eslint/no-explicit-any': 'off'
  }
};