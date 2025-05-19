# 后端配置教程 | Backend Setup Guide

[English](#english) | [中文](#chinese)

<h2 id="english">English</h2>

## Backend Configuration Guide

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x
- An OpenAI API key or compatible API endpoint

### Installation

1. Navigate to the server directory:

```bash
cd test-server
```

2. Install dependencies:

```bash
npm install
```

3. Configure Environment Variables:

Create a `.env` file in the test-server directory:

```bash
# API Configuration
PORT=3000
ARK_API_KEY=your_api_key_here
ARK_BASE_URL=https://your-api-endpoint.com/v1
ARK_MODEL=your-model-name

# Optional Settings
NODE_ENV=development
RATE_LIMIT=100
CACHE_DURATION=3600
```

### Environment Variables Explanation

| Variable       | Description               | Required | Default                                  |
| -------------- | ------------------------- | -------- | ---------------------------------------- |
| PORT           | Server port number        | No       | 3000                                     |
| ARK_API_KEY    | Your API key              | Yes      | -                                        |
| ARK_BASE_URL   | API endpoint URL          | No       | https://ark.cn-beijing.volces.com/api/v3 |
| ARK_MODEL      | Model identifier          | No       | doubao-1-5-lite-32k-250115               |
| NODE_ENV       | Environment mode          | No       | development                              |
| RATE_LIMIT     | Requests per minute       | No       | 100                                      |
| CACHE_DURATION | Cache duration in seconds | No       | 3600                                     |

### Starting the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm start
```

### API Endpoints

#### Text Completion

```http
POST /api/complete
Content-Type: application/json

{
  "preContent": "string",
  "subContent": "string",
  "prompt": "string"
}
```

Response:

```json
{
  "suggestion": "string"
}
```

### Error Handling

The server implements the following error handling:

- Rate limiting
- Input validation
- API error handling
- Timeout handling

### Security Best Practices

1. Never commit `.env` files
2. Use CORS protection
3. Implement rate limiting
4. Validate all inputs
5. Use secure headers

---

<h2 id="chinese">中文</h2>

## 后端配置指南

### 前置要求

- Node.js >= 16.x
- npm >= 8.x
- OpenAI API密钥或兼容的API端点

### 安装

1. 进入服务器目录：

```bash
cd test-server
```

2. 安装依赖：

```bash
npm install
```

3. 配置环境变量：

在test-server目录中创建`.env`文件：

```bash
# API配置
PORT=3000
ARK_API_KEY=你的api密钥
ARK_BASE_URL=https://你的api端点.com/v1
ARK_MODEL=你的模型名称

# 可选设置
NODE_ENV=development
RATE_LIMIT=100
CACHE_DURATION=3600
```

### 环境变量说明

| 变量           | 说明               | 是否必需 | 默认值                                   |
| -------------- | ------------------ | -------- | ---------------------------------------- |
| PORT           | 服务器端口号       | 否       | 3000                                     |
| ARK_API_KEY    | 你的API密钥        | 是       | -                                        |
| ARK_BASE_URL   | API端点URL         | 否       | https://ark.cn-beijing.volces.com/api/v3 |
| ARK_MODEL      | 模型标识符         | 否       | doubao-1-5-lite-32k-250115               |
| NODE_ENV       | 环境模式           | 否       | development                              |
| RATE_LIMIT     | 每分钟请求数       | 否       | 100                                      |
| CACHE_DURATION | 缓存持续时间（秒） | 否       | 3600                                     |

### 启动服务器

开发模式：

```bash
npm run dev
```

生产模式：

```bash
npm run build
npm start
```

### API端点

#### 文本补全

```http
POST /api/complete
Content-Type: application/json

{
  "preContent": "string",
  "subContent": "string",
  "prompt": "string"
}
```

响应：

```json
{
  "suggestion": "string"
}
```

### 错误处理

服务器实现了以下错误处理：

- 速率限制
- 输入验证
- API错误处理
- 超时处理

### 安全最佳实践

1. 永远不要提交`.env`文件
2. 使用CORS保护
3. 实现速率限制
4. 验证所有输入
5. 使用安全头部
