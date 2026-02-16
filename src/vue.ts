import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vuePlugin from 'eslint-plugin-vue';
import prettierConfig from 'eslint-config-prettier';
import { Linter } from 'eslint';

import { commRule, tsRule, overridesRule } from './comm.js';

const config: Linter.Config[] = [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vuePlugin.configs['flat/essential'],
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser as any,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        require: true
      }
    },
    plugins: {
    },
    rules: {
      ...commRule,
      ...tsRule
    }
  },
  ...overridesRule.map((override) => ({
    files: override.files,
    rules: override.rules
  })),
  prettierConfig
];

export default config;
