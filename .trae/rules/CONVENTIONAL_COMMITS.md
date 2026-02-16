# Conventional Commits 配置指南

本项目已配置支持 **Conventional Commits** 格式的提交记录。

## 快速开始

### 1. 使用交互式提交工具

使用 commitizen 进行交互式提交：

```bash
pnpm commit
```

这将引导你按照 Conventional Commits 格式填写提交信息。

### 2. 手动提交（需遵循格式）

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug issue"
git commit -m "docs: update README"
```

## Conventional Commits 格式说明

### 基本格式
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 提交类型（type）

| 类型 | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: add user authentication` |
| `fix` | bug 修复 | `fix: resolve login error` |
| `docs` | 文档更改 | `docs: update API documentation` |
| `style` | 格式调整（不影响代码功能） | `style: format code with prettier` |
| `refactor` | 代码重构 | `refactor: reorganize module structure` |
| `perf` | 性能优化 | `perf: improve query speed` |
| `test` | 测试相关 | `test: add unit tests for auth` |
| `chore` | 构建、依赖等 | `chore: update dependencies` |
| `ci` | CI/CD 配置 | `ci: add GitHub Actions workflow` |
| `build` | 构建系统变化 | `build: upgrade webpack` |
| `revert` | 回退提交 | `revert: revert "feat: xyz"` |

### 示例

```bash
# 新功能
git commit -m "feat(auth): add OAuth2 support"

# bug 修复
git commit -m "fix(api): handle null response"

# 文档
git commit -m "docs: add deployment guide"

# 包含详细描述
git commit -m "feat(core): add caching mechanism

- Implement Redis cache layer
- Add cache invalidation logic
- Update configuration"

# 带 breaking change
git commit -m "feat!: redesign API response format

BREAKING CHANGE: Response structure has changed from object to array"
```

## 配置文件说明

### commitlint.config.js
- 定义提交消息的验证规则
- 确保所有提交遵循 Conventional Commits 标准
- 在 `git commit` 时自动验证

### .husky/commit-msg
- git hook，在提交时运行 commitlint
- 如果提交消息不符合格式，提交会被拒绝

### package.json 配置
```json
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

## 与 Semantic Release 的集成

本项目使用 `semantic-release` 进行自动版本管理和发布：

- **patch** (0.0.x): 遇到 `fix` 类型提交时
- **minor** (0.x.0): 遇到 `feat` 类型提交时  
- **major** (x.0.0): 遇到有 `BREAKING CHANGE` 的提交时

这意味着你的提交格式直接影响版本号的自动更新。

## AI 生成提交信息的建议

如果使用 AI（如 GitHub Copilot）生成提交信息：

1. **指导 AI 生成 Conventional Commits 格式**
   ```
   请生成一个符合 Conventional Commits 格式的提交信息
   变更内容：[描述你的改动]
   ```

2. **生成后验证**
   - 确保格式正确：`<type>(<scope>): <description>`
   - 描述简洁明了（不超过 100 字符）
   - 使用小写字母

3. **使用 pnpm commit 验证**
   ```bash
   pnpm commit
   ```
   系统会自动检查格式是否正确。

## 常见问题

### Q: 如何修改已提交的消息？
```bash
git commit --amend --no-edit
```

### Q: 如何跳过 commitlint 检查？
```bash
git commit -m "message" --no-verify
```

### Q: 为什么我的提交被拒绝了？
运行 `pnpm commit` 查看详细的错误信息。

## 相关资源

- [Conventional Commits 官方文档](https://www.conventionalcommits.org/)
- [Semantic Release 文档](https://semantic-release.gitbook.io/)
- [Commitizen 文档](http://commitizen.github.io/cz-cli/)
