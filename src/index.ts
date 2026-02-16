import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';
import { fixupPluginRules } from '@eslint/compat';
import { Linter } from 'eslint';

import { commRule, tsRule, reactRule, overridesRule } from './comm.js';

const config: Linter.Config[] = [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      'lambda',
      '.history',
      'public',
      '.umi',
      'mock',
      '**/es/**',
      '**/lib**/'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        require: true
      }
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': fixupPluginRules(reactHooksPlugin)
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...reactPlugin.configs!.recommended!.rules,
      ...reactHooksPlugin.configs!.recommended!.rules,

      ...commRule,
      ...tsRule,
      ...reactRule
    }
  },
  ...overridesRule.map((override) => ({
    files: override.files,
    rules: override.rules
  })),
  prettierConfig
];

export default config;
