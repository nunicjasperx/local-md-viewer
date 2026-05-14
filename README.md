# Local MD

> 本地 Markdown 查看器与格式导出工具 — 所有操作均在浏览器本地完成，不上传任何内容。

[English](#english) | [中文](#中文)

---

## 中文

### 简介

Local MD 是一个轻量的本地 Markdown 阅读工具。粘贴 Markdown 文本或打开 `.md` 文件，即可获得排版美观的阅读视图，支持全屏沉浸式阅读和多种格式导出。专为需要在本地快速、舒适地阅读 Markdown 文件的用户设计。

### 功能特性

- **实时预览** — 粘贴或输入 Markdown，即时渲染为格式化文档
- **文件导入** — 支持拖拽或点击上传 `.md` / `.markdown` 文件
- **全屏阅读** — 沉浸式阅读模式，专注内容本身
- **代码高亮** — 基于 highlight.js 的语法高亮，支持多种编程语言
- **多格式导出** — 一键导出为 HTML、PDF、Word (.docx) 文档
- **暗色主题** — 护眼的深色界面设计
- **隐私安全** — 所有数据处理均在浏览器本地完成，不上传任何内容到服务器
- **即时启动** — 无需安装，打开即用

### 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 或直接双击 启动.bat（Windows）
```

### 技术栈

- React + TypeScript
- Vite
- Tailwind CSS
- marked / markdown-it — Markdown 解析
- highlight.js — 代码高亮
- html2pdf.js — PDF 导出
- lucide-react — 图标

---

## English

### Introduction

Local MD is a lightweight local Markdown reading tool. Paste Markdown text or open a `.md` file to get a beautifully rendered reading view, with fullscreen immersive reading and multi-format export. Designed for anyone who wants to read Markdown files locally with comfort and speed.

### Features

- **Live Preview** — Paste or type Markdown and see the formatted document instantly
- **File Import** — Drag & drop or click to upload `.md` / `.markdown` files
- **Fullscreen Reading** — Immersive reading mode for focused reading
- **Syntax Highlighting** — Code blocks highlighted via highlight.js with support for many languages
- **Multi-format Export** — One-click export to HTML, PDF, and Word (.docx)
- **Dark Theme** — Easy-on-the-eyes dark interface
- **Privacy First** — All processing happens locally in your browser; nothing is uploaded to any server
- **Instant Start** — No installation needed, just open and use

### Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Or double-click 启动.bat (Windows)
```

### Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- marked / markdown-it — Markdown parsing
- highlight.js — Code syntax highlighting
- html2pdf.js — PDF export
- lucide-react — Icons

---

## License

MIT
