# AI 生成提交消息提示模板

## 用于 GitHub Copilot 或其他 AI 的提示词

### 提示 1：生成单行提交消息
```
请根据以下代码变更生成一个符合 Conventional Commits 格式的提交消息：
格式：<type>(<scope>): <description>

要求：
- 使用英文，全小写
- type 必须是以下之一：feat, fix, docs, style, refactor, perf, test, chore, ci, build, revert
- description 不超过 50 字符
- 不要以句号结尾

变更内容：[粘贴你的代码变更内容]
```

### 提示 2：生成详细的提交消息（包含 body）
```
根据以下代码变更生成完整的 Conventional Commits 消息：

格式：
<type>(<scope>): <description>

<body>

<footer>

要求：
- type: feat, fix, docs, style, refactor, perf, test, chore, ci, build, revert
- scope: 可选，用括号表示改动范围
- description: 简短总结，不超过 50 字符
- body: 详细说明（可选），需要用空行与 description 分隔
- footer: 可选，用于标记 BREAKING CHANGE 或关闭的 issue

变更内容：[粘贴你的代码变更内容]
```

### 提示 3：生成 Breaking Change 提交消息
```
这个变更包含不兼容的API改动，请生成一个 Conventional Commits 消息：

格式应该包含：
1. 类型! 标记（如 feat!）
2. 简短描述
3. 详细描述（说明为什么会破坏兼容性）
4. BREAKING CHANGE 标注

变更内容：[粘贴你的代码变更内容]

旧 API：[描述旧的行为]
新 API：[描述新的行为]
```

## 常见提交场景示例

### 1. 添加新功能
```
feat(auth): add two-factor authentication support

- Implement TOTP-based 2FA
- Add qrcode generation for 2FA setup
- Update user API with 2FA endpoints
- Add comprehensive tests for 2FA flows
```

### 2. 修复 bug
```
fix(api): handle concurrent requests correctly

The race condition in request handler was causing 
duplicate entries. Fixed by implementing proper 
request queuing and locking mechanism.

Fixes #123
```

### 3. 性能优化
```
perf(database): optimize query performance with indexing

- Add composite index on user_id and created_at
- Cache frequently accessed records
- Reduce average query time from 500ms to 50ms

Resolves #456
```

### 4. 重构代码
```
refactor(core): simplify class hierarchy

- Remove abstract base class
- Use composition instead of inheritance
- Improve code maintainability
```

### 5. 文档更新
```
docs: add API authentication guide

Includes:
- OAuth2 flow explanation
- Example requests
- Error handling guide
```

### 6. 依赖更新
```
chore(deps): upgrade TypeScript to 5.3.0

- Update TypeScript from 5.2.2 to 5.3.0
- Update type definitions accordingly
- All tests passing
```

## 在 VS Code 中的使用建议

### 方式 1：使用命令行工具
```bash
# 而不是 git commit -m "..."
pnpm commit
```

### 方式 2：结合 AI 编辑器功能
1. 在终端中输入 `pnpm commit`
2. 在交互式的 commitizen 提示中，选择 type、scope、description 等
3. 让 AI 帮助填写 body 部分的详细信息

### 方式 3：使用 AI 预生成内容
1. 问 AI："根据我的改动，生成一个 Conventional Commits 消息"
2. 复制生成的消息到 git commit -m "..." 中
3. 信息会自动通过 commitlint 验证

## 验证提交消息

如果手动编写提交消息，可以用以下命令验证：

```bash
# 验证单条消息
echo "feat: your message" | npx commitlint

# 验证最近的提交
npx commitlint -f HEAD~1
```

如果消息不符合规范，commitlint 会显示具体的错误信息。
