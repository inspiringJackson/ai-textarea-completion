# 插件开发指南 | Plugin Development Guide

[English](#english) | [中文](#chinese)

<h2 id="english">English</h2>

## Introduction
This guide will help you develop plugins for the AI Textarea Completion component. You can extend its functionality by creating custom completion providers, adding new features, or modifying existing behaviors.

## Custom Completion Provider
The most common way to extend the component is by creating a custom completion provider.

### Basic Structure
```typescript
class CustomCompletionProvider implements CompletionProvider {
  async getCompletion(preContent: string, subContent: string, prompt?: string): Promise<string> {
    // Implement your completion logic here
    return "your completion suggestion";
  }
}
```

### Integration Example
```javascript
const textarea = document.querySelector('ai-textarea');
const customProvider = new CustomCompletionProvider();
textarea.setCompletionProvider(customProvider);
```

## Event Handling
You can extend the component's functionality by listening to its events:

```javascript
textarea.addEventListener('input', (e) => {
  // Handle input changes
});

textarea.addEventListener('change', (e) => {
  // Handle completion acceptance
});
```

## Styling Extensions
Create custom styles by targeting the component's shadow DOM elements:

```css
ai-textarea::part(suggestion) {
  /* Style the suggestion text */
}

ai-textarea::part(container) {
  /* Style the container */
}
```

## Best Practices
1. Always implement error handling in your completion provider
2. Use debouncing for network requests
3. Maintain type safety with TypeScript
4. Follow the existing code style
5. Document your extensions

---

<h2 id="chinese">中文</h2>

## 简介
本指南将帮助你为AI文本域自动补全组件开发插件。你可以通过创建自定义补全提供者、添加新功能或修改现有行为来扩展其功能。

## 自定义补全提供者
扩展组件最常见的方式是创建自定义补全提供者。

### 基本结构
```typescript
class CustomCompletionProvider implements CompletionProvider {
  async getCompletion(preContent: string, subContent: string, prompt?: string): Promise<string> {
    // 在这里实现你的补全逻辑
    return "你的补全建议";
  }
}
```

### 集成示例
```javascript
const textarea = document.querySelector('ai-textarea');
const customProvider = new CustomCompletionProvider();
textarea.setCompletionProvider(customProvider);
```

## 事件处理
你可以通过监听组件的事件来扩展其功能：

```javascript
textarea.addEventListener('input', (e) => {
  // 处理输入变化
});

textarea.addEventListener('change', (e) => {
  // 处理补全接受
});
```

## 样式扩展
通过定位组件的shadow DOM元素来创建自定义样式：

```css
ai-textarea::part(suggestion) {
  /* 设置建议文本的样式 */
}

ai-textarea::part(container) {
  /* 设置容器的样式 */
}
```

## 最佳实践
1. 在补全提供者中始终实现错误处理
2. 对网络请求使用防抖处理
3. 使用TypeScript保持类型安全
4. 遵循现有的代码风格
5. 为你的扩展编写文档 