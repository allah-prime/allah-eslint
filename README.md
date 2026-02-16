# @allah/eslint

My shared ESLint & Prettier configuration for projects.
这是一个基于 ESLint 9+ 和 Prettier 的共享配置包，提供了 React 和 Vue 的开箱即用配置。

## 核心特性

- **TypeScript**: 完整的类型检查支持。
- **Prettier**: 集成 Prettier 用于代码格式化，通过 `eslint-config-prettier` 解决冲突。
- **React**: 包含 Hooks 和 JSX 的最佳实践。
- **Vue**: 支持 Vue 3 + TypeScript。

## 参考文档

本项目配置参考了以下官方文档：

- [ESLint Shareable Configs](https://eslint.org/docs/latest/extend/shareable-configs)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [TypeScript ESLint Rules](https://typescript-eslint.io/rules/)
- [React Plugin Rules](https://github.com/jsx-eslint/eslint-plugin-react)
- [Vue Plugin Rules](https://eslint.vuejs.org/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

---

## 使用指南

### 1. 安装依赖

```bash
pnpm add -D eslint prettier @allah/eslint
```

### 2. 配置 Prettier

建议在项目根目录下创建 `.prettierrc` 以保持格式化风格一致：

```json
{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "trailingComma": "none",
  "printWidth": 100
}
```

### 3. 配置.editorconfig

需要在项目下配置`.editorconfig`文件以保持格式化风格统一

```editorconfig
# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```

### 3. 配置 ESLint

根据你的项目类型选择对应的配置。

#### 🅰️ React + TypeScript 项目

在项目根目录下创建 `eslint.config.js`：

```javascript
import allahConfig from '@allah/eslint';

export default [
  ...allahConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      camelcase: 0
    }
  }
];
```

#### 🅱️ Vue 3 + TypeScript 项目

在项目根目录下创建 `eslint.config.js`，注意引入路径为 `@allah/eslint/dist/vue`：

```javascript
import allahConfig from '@allah/eslint/dist/vue';

export default defineConfig([
  ...allahConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    rules: {
      // 要求使用模板字面量而非字符串连接
      'prefer-template': 2
    }
  }
]);
```

### 4. VSCode 配置推荐

为了获得最佳的开发体验，建议在 `.vscode/settings.json` 中添加以下配置，实现保存自动格式化和修复：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue"]
}
```

#### 自定义的示例

你有也可以自定义对eslint的规则进行配置，示例如下

```ts
import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // 1. 忽略文件
  {
    ignores: [
      'dist',
      'node_modules',
      'lambda',
      'scripts',
      'config',
      '.history',
      'public',
      '.umi',
      'mock',
      'service.js',
      'es',
      'lib'
    ]
  },

  // 2. 基础配置 + React 配置
  {
    files: ['**/*.{ts,tsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      // 必须开启 JSX 解析
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    // 注册插件
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks
    },
    rules: {
      // --- 基础规则 ---
      ...js.configs.recommended.rules,
      'prefer-template': 'error', // 你的核心需求

      // --- React 规则 ---
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules, // 如果你使用 React 17+ (不需要手动 import React)

      // --- React Hooks 规则 ---
      ...reactHooks.configs.recommended.rules,

      // 自定义调整
      'react/prop-types': 'off' // 如果你觉得写 PropTypes 太麻烦可以关掉
    },
    // 自动检测 React 版本
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];
```
