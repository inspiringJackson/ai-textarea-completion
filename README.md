# AI Textarea Completion

一个支持AI补全功能的textarea Web组件。

## 特性

- 基于Web Components，可在任何现代浏览器中使用
- 支持所有原生textarea属性和方法
- 支持自定义AI补全提供者
- 使用Tab键接受补全建议，Esc键取消建议
- 优雅的补全建议显示

## 安装

```bash
npm install ai-textarea-completion
```

## 使用方法

### 基本使用

```html
<ai-textarea placeholder="开始输入..."></ai-textarea>
```

### 设置自定义补全提供者

```javascript
class CustomCompletionProvider {
  async getCompletion(text, cursorPosition) {
    // 实现你的补全逻辑
    return '补全建议';
  }
}

const textarea = document.querySelector('ai-textarea');
textarea.setCompletionProvider(new CustomCompletionProvider());
```

## 后端服务配置

1. 进入test-server目录：
```bash
cd test-server
```

2. 安装依赖：
```bash
npm install
```

3. 复制环境变量配置文件：
```bash
cp .env.example .env
```

4. 编辑.env文件，设置你的OpenAI API密钥：
```env
OPENAI_API_KEY=your_api_key_here
```

5. 启动服务：
```bash
npm run dev
```

## 事件

组件会触发以下自定义事件：

- `input`: 当文本内容变化时触发
  ```javascript
  textarea.addEventListener('input', (e) => {
    console.log('当前值：', e.detail.value);
    console.log('光标位置：', e.detail.cursorPosition);
  });
  ```

## 开发

1. 克隆仓库：
```bash
git clone [repository-url]
cd ai-textarea-completion
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

## 贡献

欢迎提交Issue和Pull Request！

## 许可

MIT
