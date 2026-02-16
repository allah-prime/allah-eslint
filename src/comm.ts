import { Linter } from 'eslint';

export const overridesRule: { files: string[]; rules: Linter.RulesRecord }[] = [
  {
    files: ['**/**Service.ts', '**/**Service.tsx', '**/service.ts', '**/service.tsx'],
    rules: {
      // 必须有返回值
      '@typescript-eslint/explicit-function-return-type': 'error',
      // 禁止使用any
      '@typescript-eslint/no-explicit-any': 'error'
    }
  },
  {
    files: ['**/**Enum.ts', '**/enum/*.ts', '**/constants/*.ts'],
    rules: {
      // 不强制实施驼峰命名约定
      camelcase: 'off'
    }
  }
];

export const reactRule: Linter.RulesRecord = {
  // 下面是react的配置
  'react-hooks/exhaustive-deps': 0,
  // 并不需要在jsx中引入react
  'react/react-in-jsx-scope': 0,
  //确保 useState 钩子值和 setter 变量
  'react/hook-use-state': 'error',
  // 在 JSX 中强制使用布尔属性表示法
  'react/jsx-boolean-value': ['error', 'never'],
  // 在 JSX 中强制使用右括号位置
  'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
  // 强制实施多行 JSX 的结束标记位置
  'react/jsx-closing-tag-location': 'error',
  // 当文本本身就足够时，不允许不必要的 JSX 表达式，或者对 JSX 子项或属性中的文本强制执行 JSX 表达式
  'react/jsx-curly-brace-presence': ['error', 'never'],
  // 不允许在 JSX 中使用重复属性
  'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
  // 每行需要一个 JSX 元素
  'react/jsx-one-expression-per-line': 'off',
  'react/display-name': 'off',
  // 禁止将 React 错误地标记为未使用
  'react/jsx-uses-react': 0,
  // 允许在 useEffect 中调用 setState（关闭警告）
  'react-hooks/set-state-in-effect': 0,
  // 要求 useEffect 中的依赖项是不可变的
  'react-hooks/immutability': 0,
  // 禁止在键中使用数组索引
  'react/no-array-index-key': 'error',
  // 不允许此状态的直接突变
  'react/no-direct-mutation-state': 'error',
  // 禁止使用字符串引用
  'react/no-string-refs': 'error',
  'react/jsx-indent': [2, 2],
  'react/jsx-wrap-multilines': [
    2,
    {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line'
    }
  ],
  // 在 JSX 中的一行上强制实施最大道具数
  'react/jsx-max-props-per-line': [2, { maximum: 12, when: 'always' }]
};

export const tsRule: Linter.RulesRecord = {
  // 下面是TS的配置
  // 禁令类型
  '@typescript-eslint/ban-types': 0,
  // 无效的this
  '@typescript-eslint/no-invalid-this': 0,
  // 禁止使用未声明的变量
  '@typescript-eslint/no-non-null-assertion': 0,
  // 禁止在变量定义之前使用它们
  '@typescript-eslint/no-use-before-define': 0,
  // 禁止未使用的表达式
  '@typescript-eslint/no-unused-expressions': 0,
  // 禁止未使用的变量
  '@typescript-eslint/naming-convention': 0,
  // 禁止空接口
  '@typescript-eslint/no-empty-interface': 0,
  // 禁止注释或在指令后要求描述@ts-<directive>
  '@typescript-eslint/ban-ts-comment': 0,
  // 禁止未使用的变量
  '@typescript-eslint/no-unused-vars': 'off',
  // 要求对导出的函数和类的公共类方法进行显式返回和参数类型。- 默认关闭
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  // 禁止语句，导入语句除外 请改用 ES6 样式导入或导入。var foo = require("foo")import foo = require("foo")
  '@typescript-eslint/no-var-requires': 0,
  // 禁止使用any
  '@typescript-eslint/no-explicit-any': 'warn'
};

export const commRule: Linter.RulesRecord = {
  // 下面的是JS的配置
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': [
    'warn',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_'
    }
  ],
  indent: 'off',
  // 要求使用模板字面量而非字符串连接
  'prefer-template': 2,
  // 在一元运算符之前或之后强制使用一致的间距
  'space-unary-ops': 2,
  // 不允许行尾的尾随空格
  'no-trailing-spaces': 'error',
  // 在数组括号内强制实施一致的间距
  'array-bracket-spacing': ['error', 'never'],
  // 强制在大括号内保持一致的间距
  'object-curly-spacing': ['error', 'always'],
  // 数组返回值配置
  'array-callback-return': 'error',
  // 无重复参数
  'no-dupe-args': 'error',
  // 无自我比较
  'no-self-compare': 'error',
  // 强制实施驼峰命名约定
  camelcase: 'error',
  // 需要使用和===!==
  eqeqeq: ['error', 'always'],
  // 不允许在语句中的语句后使用块else return if
  'no-else-return': 'error',
  // 禁止语句作为块中的唯一语句ifelse
  'no-lonely-if': 'error',
  // 无用的return
  'no-useless-return': 'error',
  // 无模板卷曲字符串
  'no-template-curly-in-string': 'error',
  // 不允许多个空行
  'no-multiple-empty-lines': [
    'error',
    {
      max: 1,
      maxEOF: 1,
      maxBOF: 1
    }
  ]
};
