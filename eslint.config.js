import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist/', 'public/', 'screenshots/', 'src/lib/'] },
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['scripts/**/*.mjs', 'test/**/*.js', '*.config.js'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  {
    rules: {
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }],
    },
  },
  prettier,
];
