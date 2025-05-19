# AI Textarea Completion | AI文本域自动补全

[English](#english) | [中文](#chinese)

<h2 id="english">English</h2>

## Introduction

AI Textarea Completion is a powerful web component that provides intelligent text completion capabilities. It seamlessly integrates with any web application and offers context-aware suggestions as you type. The supported language model has been tested: [Doubao](https://console.volcengine.com/ark/region:ark+cn-beijing/model/detail?Id=doubao-lite-32k).

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
<ai-textarea placeholder="Start typing here..."></ai-textarea>
```

## Configuration

### Basic Props

| Prop        | Type    | Default | Description                |
| ----------- | ------- | ------- | -------------------------- |
| placeholder | string  | ""      | Placeholder text           |
| value       | string  | ""      | Initial text value         |
| prompt      | string  | ""      | AI writing style prompt    |
| disabled    | boolean | false   | Disable the textarea       |
| readonly    | boolean | false   | Make the textarea readonly |

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

## More Information
- [Backend example (Node.js)](https://github.com/inspiringJackson/ai-textarea-completion/blob/master/docs/BACKEND_SETUP.md)
- [Develop?](https://github.com/inspiringJackson/ai-textarea-completion/blob/master/docs/PLUGIN_DEVELOPMENT_GUIDE.md)
- [Contribute?](https://github.com/inspiringJackson/ai-textarea-completion/blob/master/docs/CONTRIBUTING.md)
- [Integrate?](https://github.com/inspiringJackson/ai-textarea-completion/blob/master/docs/INTEGRATION_FLOWCHART.md)
- [Performance checklist](https://github.com/inspiringJackson/ai-textarea-completion/blob/master/docs/PERFORMANCE_CHECKLIST.md)

## Browser Support

- Chrome (latest) (To be tested)
- Firefox (latest) (To be tested)
- Safari (latest) (To be tested)
- Edge (latest)

---

<h2 id="chinese">中文</h2>

## 简介

AI文本域自动补全是一个强大的Web组件，提供智能文本补全功能。它可以无缝集成到任何Web应用中，并在您输入时提供上下文感知的建议。目前已测试支持的大模型：[豆包](https://console.volcengine.com/ark/region:ark+cn-beijing/model/detail?Id=doubao-lite-32k)。

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
<ai-textarea placeholder="在这里开始输入..."></ai-textarea>
```

## 配置

### 基本属性

| 属性        | 类型    | 默认值 | 说明             |
| ----------- | ------- | ------ | ---------------- |
| placeholder | string  | ""     | 占位符文本       |
| value       | string  | ""     | 初始文本值       |
| prompt      | string  | ""     | AI写作风格提示词 |
| disabled    | boolean | false  | 禁用文本域       |
| readonly    | boolean | false  | 设置为只读       |

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

## 更多信息
- [后端例子(Node.js)](https://github.com/inspiringJackson/ai-textarea-completion/blob/master/docs/BACKEND_SETUP.md)
- [开发](https://github.com/inspiringJackson/ai-textarea-completion/blob/master/docs/PLUGIN_DEVELOPMENT_GUIDE.md)
- [贡献](https://github.com/inspiringJackson/ai-textarea-completion/blob/master/docs/CONTRIBUTING.md)
- [接入](https://github.com/inspiringJackson/ai-textarea-completion/blob/master/docs/INTEGRATION_FLOWCHART.md)
- [性能清单](https://github.com/inspiringJackson/ai-textarea-completion/blob/master/docs/PERFORMANCE_CHECKLIST.md)

## 浏览器支持

- Chrome (最新版) (待测试)
- Firefox (最新版) (待测试)
- Safari (最新版) (待测试)
- Edge (最新版)

## License | 许可证

MIT
