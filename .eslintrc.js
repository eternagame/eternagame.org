module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript', 'prettier'],
  rules: {
    'vue/max-attributes-per-line': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'class-methods-use-this': 'off',
    'camelcase': 'off',
    'indent': 'off',
    'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    'no-param-reassign': ['error', { props: false }],
    'semi': 'off',
    '@typescript-eslint/semi': ['error'],
    'no-unused-vars': 'off',
    'arrow-parens': 'off',
    'object-curly-newline': 'off',
    'no-underscore-dangle': ['error', { allow: ['__INITIAL_STATE__', '_instance'] }],
    // Why doesn't typescript-eslint do this for us? No idea!
    "no-use-before-define": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
