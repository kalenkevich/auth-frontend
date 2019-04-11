module.exports = {
  extends: [
    'airbnb-base',
    'plugin:react/recommended'
  ],
  parser: 'babel-eslint',
  plugins: [
    'import',
    'prefer-class-properties',
    'jest',
    'react',
  ],
  globals: {
    'IS_CLIENT': true,
    'IS_SERVER': true,
    'ENVIRONMENT': true,
  },
  rules: {
    'no-use-before-define': 'off',
    'max-len': ['error', { code: 120 }],
    'indent': ['error', 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      FunctionDeclaration: {
        parameters: 1,
        body: 1
      },
      FunctionExpression: {
        parameters: 1,
        body: 1
      }
    }],
  },
  env: {
    'browser': true,
    'es6': true,
    'node': true,
    "jest/globals": true,
  },
};
