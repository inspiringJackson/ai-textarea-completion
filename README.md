# AI Textarea Completion | AI文本域自动补全

[English](#english) | [中文](#chinese)

<h2 id="english">English</h2>

## Introduction

AI Textarea Completion is a powerful web component that provides intelligent text completion capabilities. It seamlessly integrates with any web application and offers context-aware suggestions as you type.

## Features

- 🚀 Real-time AI-powered text completion
- 💡 Context-aware suggestions
- 🎨 Customizable writing styles through prompts
- ⌨️ Natural keyboard interaction
- 🔧 Easy integration with any web framework
- 🌐 Cross-browser compatibility
- 📱 Responsive design
- 🛠️ Highly customizable

## Installation

```bash
npm install ai-textarea-completion
```

## Quick Start

```html
<!-- Import the component -->
<script type="module">
  import "ai-textarea-completion";
</script>

<!-- Use it in your HTML -->
<ai-textarea apiUrl="Your backend AI request api url"></ai-textarea>
```

## Configuration

### Basic Props

| Prop             | Type    | Default | Description                |
| --------------- | ------- | ------- | -------------------------- |
| placeholder     | string  | ""      | Placeholder text           |
| value           | string  | ""      | Initial text value         |
| prompt          | string  | ""      | AI writing style prompt    |
| disabled        | boolean | false   | Disable the textarea       |
| readonly        | boolean | false   | Make the textarea readonly |
| disableAI       | boolean | false   | Disable AI completion      |
| apiUrl          | string  | ""      | Backend API endpoint URL   |
| placeholder-style| string  | ""      | Custom placeholder style in JSON format (e.g. '{"color": "#999"}') |
| suggestion-style | string  | ""      | Custom suggestion style in JSON format (e.g. '{"color": "#666"}') |

### Style Configuration

#### Placeholder Style
You can customize the placeholder style using the `placeholder-style` attribute. The value should be a JSON string containing CSS properties:

```html
<ai-textarea
  placeholder="Start typing here..."
  placeholder-style='{"color": "#1890ff", "fontWeight": "bold"}'
></ai-textarea>
```

#### Suggestion Style
You can customize the suggestion text style using the `suggestion-style` attribute:

```html
<ai-textarea
  suggestion-style='{"color": "#666", "fontStyle": "italic", "backgroundColor": "#f5f5f5"}'
></ai-textarea>
```

### Events

| Event  | Description                                |
| ------ | ------------------------------------------ |
| input  | Triggered when text changes                |
| change | Triggered when text completion is accepted |
| focus  | Triggered when textarea gains focus        |
| blur   | Triggered when textarea loses focus        |

## API Reference

### Methods

```typescript
interface AITextArea extends HTMLElement {
  value: string;
  prompt: string;
  focus(): void;
  blur(): void;
  select(): void;
  setSelectionRange(start: number, end: number): void;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

<h2 id="chinese">中文</h2>

## 简介

AI文本域自动补全是一个强大的Web组件，提供智能文本补全功能。它可以无缝集成到任何Web应用中，并在您输入时提供上下文感知的建议。

## 特性

- 🚀 实时AI驱动的文本补全
- 💡 上下文感知的建议
- 🎨 通过提示词自定义写作风格
- ⌨️ 自然的键盘交互
- 🔧 易于集成到任何Web框架
- 🌐 跨浏览器兼容
- 📱 响应式设计
- 🛠️ 高度可定制

## 安装

```bash
npm install ai-textarea-completion
```

## 快速开始

```html
<!-- 导入组件 -->
<script type="module">
  import "ai-textarea-completion";
</script>

<!-- 在HTML中使用 -->
<ai-textarea apiUrl="你的后端请求ai的接口url"></ai-textarea>
```

## 配置

### 基本属性

| 属性            | 类型    | 默认值 | 说明             |
| --------------- | ------- | ------ | ---------------- |
| placeholder     | string  | ""     | 占位符文本       |
| value           | string  | ""     | 初始文本值       |
| prompt          | string  | ""     | AI写作风格提示词 |
| disabled        | boolean | false  | 禁用文本域       |
| readonly        | boolean | false  | 设置为只读       |
| disableAI       | boolean | false  | 禁用AI补全功能   |
| apiUrl          | string  | ""     | 后端API接口地址  |
| placeholder-style| string  | ""     | 自定义占位符样式，JSON格式（如：'{"color": "#999"}'）|
| suggestion-style | string  | ""     | 自定义补全建议文本样式，JSON格式（如：'{"color": "#666"}'）|

### 样式配置

#### 占位符样式
你可以使用 `placeholder-style` 属性来自定义占位符的样式。该值应为包含 CSS 属性的 JSON 字符串：

```html
<ai-textarea
  placeholder="在这里开始输入..."
  placeholder-style='{"color": "#1890ff", "fontWeight": "bold"}'
></ai-textarea>
```

#### 补全建议样式
你可以使用 `suggestion-style` 属性来自定义补全建议文本的样式：

```html
<ai-textarea
  suggestion-style='{"color": "#666", "fontStyle": "italic", "backgroundColor": "#f5f5f5"}'
></ai-textarea>
```

### 事件

| 事件   | 说明               |
| ------ | ------------------ |
| input  | 文本变化时触发     |
| change | 接受文本补全时触发 |
| focus  | 获得焦点时触发     |
| blur   | 失去焦点时触发     |

## API参考

### 方法

```typescript
interface AITextArea extends HTMLElement {
  value: string;
  prompt: string;
  focus(): void;
  blur(): void;
  select(): void;
  setSelectionRange(start: number, end: number): void;
}
```

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## License | 许可证

MIT
