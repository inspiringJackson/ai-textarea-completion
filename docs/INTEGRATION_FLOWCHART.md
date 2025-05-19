# 框架接入流程图 | Integration Flowchart

[English](#english) | [中文](#chinese)

<h2 id="english">English</h2>

## Integration Flowchart

```mermaid
graph TD
    A[Start Integration] --> B[Install Package]
    B --> C{Choose Integration Method}

    C -->|Method 1| D[Direct HTML Usage]
    C -->|Method 2| E[Framework Integration]
    C -->|Method 3| F[Build System Integration]

    D --> G[Add Script Import]
    D --> H[Use Web Component]

    E --> I[React]
    E --> J[Vue]
    E --> K[Angular]

    I --> L[Create Wrapper Component]
    J --> L
    K --> L

    F --> M[Webpack]
    F --> N[Vite]
    F --> O[Rollup]

    G --> P[Configure Backend]
    H --> P
    L --> P
    M --> P
    N --> P
    O --> P

    P --> Q[Test Integration]
    Q --> R[Production Deploy]
```

## Integration Steps

1. **Package Installation**

   ```bash
   npm install ai-textarea-completion
   ```

2. **Choose Integration Method**

   - Direct HTML Usage
   - Framework Integration
   - Build System Integration

3. **Framework-Specific Setup**

   - React Setup
   - Vue Setup
   - Angular Setup

4. **Backend Configuration**

   - API Setup
   - Environment Variables
   - Error Handling

5. **Testing & Deployment**
   - Integration Testing
   - Performance Testing
   - Production Deployment

---

<h2 id="chinese">中文</h2>

## 接入流程图

```mermaid
graph TD
    A[开始接入] --> B[安装包]
    B --> C{选择接入方式}

    C -->|方式1| D[直接HTML使用]
    C -->|方式2| E[框架接入]
    C -->|方式3| F[构建系统接入]

    D --> G[添加脚本导入]
    D --> H[使用Web组件]

    E --> I[React]
    E --> J[Vue]
    E --> K[Angular]

    I --> L[创建包装组件]
    J --> L
    K --> L

    F --> M[Webpack]
    F --> N[Vite]
    F --> O[Rollup]

    G --> P[配置后端]
    H --> P
    L --> P
    M --> P
    N --> P
    O --> P

    P --> Q[测试接入]
    Q --> R[生产部署]
```

## 接入步骤

1. **包安装**

   ```bash
   npm install ai-textarea-completion
   ```

2. **选择接入方式**

   - 直接HTML使用
   - 框架接入
   - 构建系统接入

3. **框架特定设置**

   - React设置
   - Vue设置
   - Angular设置

4. **后端配置**

   - API设置
   - 环境变量
   - 错误处理

5. **测试和部署**
   - 集成测试
   - 性能测试
   - 生产部署
