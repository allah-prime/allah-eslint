# 快速参考：Conventional Commits 工作流

## 提交方式

### 🚀 推荐：使用交互式工具
```bash
pnpm commit
```
系统会引导你选择 type、scope、description 等，确保格式正确。

### 📝 手动提交（需要手动确保格式）
```bash
git commit -m "feat(scope): description"
```

## 常用命令速查

| 场景 | 命令 | 说明 |
|------|------|------|
| 新功能 | `pnpm commit` → 选 `feat` | 会触发 minor 版本更新 |
| bug 修复 | `pnpm commit` → 选 `fix` | 会触发 patch 版本更新 |
| API 改动 | 在 description 中添加 `BREAKING CHANGE:` | 会触发 major 版本更新 |
| 验证消息 | `echo "feat: msg" \| npx commitlint` | 检查消息是否正确 |
| 查看规则 | 查看 `commitlint.config.js` | 了解所有验证规则 |

## 提交类型一览

```
feat     → 新功能              [自动 minor 版本 ↑]
fix      → bug 修复             [自动 patch 版本 ↑]
docs     → 文档更改             [无版本更新]
style    → 代码格式             [无版本更新]
refactor → 代码重构             [无版本更新]
perf     → 性能优化             [自动 patch 版本 ↑]
test     → 测试相关             [无版本更新]
chore    → 构建/依赖            [无版本更新]
ci       → CI/CD 配置           [无版本更新]
build    → 构建系统             [无版本更新]
revert   → 回退提交             [自动 patch 版本 ↑]
```

## 提交消息示例

### 强制更新（BREAKING CHANGE）
```bash
git commit -m "feat!: redesign API response format

BREAKING CHANGE: Response structure changed from object to array"
```

### 带详细描述
```bash
git commit -m "fix(auth): resolve token validation issue

- Fix token expiration check
- Update JWT validation logic

Fixes #123"
```

### 简单提交
```bash
git commit -m "docs: update README installation instructions"
```

## 工作流完整示例

```bash
# 1. 进行代码修改
# ... 修改你的代码 ...

# 2. 暂存变更
git add .

# 3. 使用交互式提交
pnpm commit

# 4. 系统会提示选择：
# ❯ Select the type of change:
#   feat
#   fix
#   ↓ ...

# 5. 输入 scope（可选）
# What is the scope of this change?
# (Press enter to skip)

# 6. 简短描述
# Write a short, imperative tense description of the change:

# 7. 详细描述（可选）
# Provide a longer description of the change:

# 8. 是否有 breaking change（可选）
# Are there any breaking changes?

# 9. 完成！提交被验证并创建
```

## 验证和故障排除

### ✓ 提交成功
```
[main e3f4a7c] feat: add new feature
 1 file changed, 10 insertions(+)
```

### ✗ 提交被拒绝
```
⧗   input: invalid message
✖   type may not be empty [type-empty]
✖   subject may not be empty [subject-empty]

ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
```

解决方案：使用 `pnpm commit` 或确保消息格式为 `type(scope): description`

## 与发版流程的关系

```
你的提交 → commitlint 验证 → semantic-release 分析
                                    ↓
                              自动更新版本号
                              自动生成 CHANGELOG
                              自动发布到 npm
                              自动创建 GitHub Release
```

版本号自动更新规则：
- `feat:` 提交 → 版本号 +0.1.0 (minor)
- `fix:` 提交 → 版本号 +0.0.1 (patch)  
- `BREAKING CHANGE` → 版本号 +1.0.0 (major)

## 配置文件位置

| 文件 | 用途 |
|------|------|
| `package.json` | 记录脚本和 commitizen 配置 |
| `commitlint.config.js` | 定义提交消息验证规则 |
| `.husky/commit-msg` | git hook，在提交时验证消息 |
| `release.config.js` | semantic-release 配置 |
| `CONVENTIONAL_COMMITS.md` | 详细文档 |
| `AI_COMMIT_PROMPTS.md` | AI 生成提示模板 |

## 有用的 AI 提示词

### 给 GitHub Copilot 的提示
```
生成一个符合 Conventional Commits 格式的提交消息
(feat|fix|docs|style|refactor|perf|test|chore)(<scope>): <description>

代码变更：[粘贴你的改动]
```

### 快速示例
```
# 问 AI
"根据我修复了登录表单的 bug，生成 Conventional Commits 消息"

# AI 可能回答
"fix(auth): resolve form validation error in login component"

# 你可以直接使用
git commit -m "fix(auth): resolve form validation error in login component"
```

---

**更多信息见：** [CONVENTIONAL_COMMITS.md](./CONVENTIONAL_COMMITS.md) 和 [AI_COMMIT_PROMPTS.md](./AI_COMMIT_PROMPTS.md)
