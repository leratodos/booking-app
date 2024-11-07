// eslint.config.mjs (in ESM format)
import "@rushstack/eslint-patch/modern-module-resolution";

export default {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'prettier',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['/public/**', '**/vendor/*.js'],
};
