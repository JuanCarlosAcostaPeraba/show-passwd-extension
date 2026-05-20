import tseslint from 'typescript-eslint';
import pluginImport from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', '*.config.*', 'scripts/**/*.mjs'],
  },
  ...tseslint.configs.strictTypeChecked,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      }
    },
    plugins: {
      import: pluginImport
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
        }
      ],
      'import/no-unresolved': 'error',
    }
  },
  prettier
);
