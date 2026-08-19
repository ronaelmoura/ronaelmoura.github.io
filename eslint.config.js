import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', 'assets/**'] },
  js.configs.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['scripts/**'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: { ecmaVersion: 'latest', ecmaFeatures: { jsx: true }, sourceType: 'module' },
    },
  },
  {
    files: ['scripts/**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
  },
]
