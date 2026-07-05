---
title: 当 AI Agent 学会分工：16 个部门的数字团队
date: 2026-07-03 01:20:00
tags: ai
cover: /posts/ai-agent-team-16-departments/cover.jpg
excerpt: 一个 GitHub 项目今日全球增长第一——它不是框架，不是模型，而是一支 16 个部门的 AI Agent 团队。
---

# 当 AI Agent 学会分工：16 个部门的数字团队

> 今天 GitHub Trending 全球日增长第一的不是什么新框架或新模型，而是一支**AI Agent 团队**——16 个分工部门，从工程到营销，每个岗位都有专属人格和工作流。

## 这是什么？

[agency-agents](https://github.com/msitarzewski/agency-agents) 做了一件很简单但没人做过的事：**把一个公司的组织架构搬进 AI Agent 里**。

不是又一个通用 ChatGPT prompt 模板，而是 16 个深度专精的"数字员工"：

- **工程部门**：前端开发、后端开发、DevOps
- **设计部门**：UI 设计、UX 设计、品牌设计
- **安全部门**：安全审计
- **营销部门**：SEO、内容、社交媒体
- **社区部门**：Reddit 运营、Discord 运营
- ……还有财务、HR、产品等

每个 Agent 有三样东西：**身份特征**（人格）、**核心工作流**（做事方式）、**可交付成果**（输出什么）。

## 为什么有意思？

### 1. 不是 prompt，是员工

我们见惯了"你是一个专业的前端工程师……"这种 prompt。但 agency-agents 的思路完全不同——它给每个 Agent 写了完整的"岗位职责说明书"。

比如前端开发 Agent 不只是会写代码，它还知道：
- 什么时候该主动提出设计质疑
- 代码审查时关注什么
- 怎么跟后端 Agent 协作交接
- 什么场景该用什么技术栈

这更像是一个**真正的前端工程师的工作手册**，而不是一段 prompt。

### 2. 跨工具兼容

一套 Agent 定义，适配 12+ AI 编码工具：

```bash
# 安装到你常用的 AI 编码工具
./scripts/install.sh --tool claude-code

# 只安装工程和安全部门
./scripts/install.sh --tool claude-code --division engineering,security

# macOS 下一键安装桌面 App
brew install --cask msitarzewski/agency-agents/agency-agents
```

Claude Code、Cursor、Codex、Gemini……全覆盖。

### 3. 人格驱动

每个 Agent 有自己的沟通风格和做事方式。安全工程师偏执严谨，营销 Agent 活泼有创意，DevOps Agent 务实高效。

这不是装饰——**人格影响决策风格**。一个偏执的安全 Agent 会拒绝不安全的代码合并，这比一个通用 Agent "尽量注意安全"有效得多。

## 对开发者意味着什么

如果你在做独立开发或小团队项目，agency-agents 提供了一种新思路：**把 AI 工具链组织化**。

- 写代码的 Agent 专精语法和架构
- 审查代码的 Agent 偏执地挑安全问题
- 写文档的 Agent 用通俗易懂的语言
- 做营销的 Agent 懂 SEO 和社交媒体传播

这不是把多个 prompt 简单堆叠，而是让每个 Agent 在自己的领域深度专精，然后**像真正的团队一样协作**。

## 试试看

```bash
# 克隆项目
git clone https://github.com/msitarzewski/agency-agents.git

# 查看所有部门
ls divisions/

# 安装到你常用的 AI 编码工具
./scripts/install.sh --tool claude-code
```

---

*项目地址：[agency-agents](https://github.com/msitarzewski/agency-agents)*
