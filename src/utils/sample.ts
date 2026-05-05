export const SAMPLE_MARKDOWN = `# Git 基础命令操作指南

## 1. 配置与初始化

\`\`\`bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
git init
git clone <仓库URL>
\`\`\`

## 2. 日常工作流

\`\`\`bash
git status
git add <文件>       # 暂存特定文件
git add .            # 暂存所有更改
git commit -m "提交信息"
git push origin main
git pull origin main
\`\`\`

## 3. 分支管理

\`\`\`bash
git branch                 # 列出分支
git branch <分支名>         # 创建新分支
git checkout <分支名>       # 切换分支
git checkout -b <分支名>    # 创建并切换
git merge <分支名>          # 合并分支
git branch -d <分支名>      # 删除分支
\`\`\`

## 4. 查看历史

\`\`\`bash
git log
git log --oneline --graph
git diff
git show <提交哈希>
\`\`\`

## 5. 撤销操作

\`\`\`bash
git checkout -- <文件>       # 撤销工作区更改
git reset HEAD <文件>        # 取消暂存
git reset --soft HEAD~1      # 撤销提交，保留更改
git reset --hard HEAD~1      # 撤销提交，丢弃更改
\`\`\`

## 6. 远程仓库

\`\`\`bash
git remote add origin <URL>
git remote -v
git fetch origin
git push -u origin main      # 首次推送并设置上游
\`\`\`

## 7. 暂存工作区

\`\`\`bash
git stash
git stash list
git stash pop
git stash drop
\`\`\`

## 8. 标签管理

\`\`\`bash
git tag <标签名>
git tag -a <标签名> -m "标签信息"
git push origin --tags
\`\`\`

> 提示：使用 \`git help <命令>\` 查看详细帮助。

## 常用命令表格

| 命令 | 说明 |
| --- | --- |
| git status | 查看工作区状态 |
| git add . | 暂存所有更改 |
| git commit -m "信息" | 提交更改 |
| git push | 推送到远程仓库 |

- [x] 初始化仓库
- [x] 配置远程地址
- [ ] 编写 README

## 行内代码示例

使用 \`git status\` 查看当前状态，用 \`git log --oneline\` 查看简洁日志。

**粗体文本** 和 *斜体文本* 以及 ~~删除线~~。

## 数学公式（可选）

行内公式：$E = mc^2$

块级公式：

$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$
`;
