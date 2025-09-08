module.exports = {
  env: {
    es2022: true,
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // Existing JavaScript rules
    'no-console': 'off',
    'no-unused-vars': 'off', // Replaced by TypeScript rule
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    indent: ['error', 2],
    'eol-last': 'error',
    'no-trailing-spaces': 'error',

    // TypeScript-specific rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-inferrable-types': 'off'
  },
  ignorePatterns: ['dist/', 'coverage/', '.eslintrc.cjs']
};
