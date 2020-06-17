module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    'plugin:jsdoc/recommended'
  ],
  plugins: [
    'jsdoc'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error', 'group', 'groupEnd', 'clear'] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'valid-jsdoc': 2,
    'no-return-assign': 'off',
    camelcase: 'off',
    'no-return-await': 'off',
    'prefer-promise-reject-errors': 'off'
  }
}
