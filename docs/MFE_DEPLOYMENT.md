# Module Federation 多项目部署指南

## 概述

本项目使用 Webpack Module Federation 实现微前端架构，支持动态扩展远程项目。配置已优化，无需硬编码项目名称。

## 配置扩展

### 1. 添加新的远程项目

编辑 `webpack/mfe.config.js`，在 `remoteProjects` 数组中添加新项目：

```javascript
export const remoteProjects = [
  {
    name: 'projectA',
    devUrl: 'http://localhost:8081/remoteEntry.js',
    prodPath: '/projectA/remoteEntry.js',
    envKey: 'MFE_PROJECTA_URL',
  },
  {
    name: 'projectB',
    devUrl: 'http://localhost:8082/remoteEntry.js',
    prodPath: '/projectB/remoteEntry.js',
    envKey: 'MFE_PROJECTB_URL',
  },
  // 新增项目 C
  {
    name: 'projectC',
    devUrl: 'http://localhost:8083/remoteEntry.js',
    prodPath: '/projectC/remoteEntry.js',
    envKey: 'MFE_PROJECTC_URL',
  },
]
```

### 2. 通过环境变量配置

在 `.env.development` 或 `.env.production` 中配置：

```bash
# 单个项目覆盖
MFE_PROJECTA_URL=http://192.168.1.100:8081/remoteEntry.js
MFE_PROJECTB_URL=http://192.168.1.100:8082/remoteEntry.js

# 或者批量配置（高级）
MFE_REMOTES=projectA@http://192.168.1.100:8081/remoteEntry.js,projectB@http://192.168.1.100:8082/remoteEntry.js
```

## 开发环境部署

### Host 应用（主应用）

```bash
# 开发环境启动
npm run dev

# 推荐：直接用 npm scripts（会自动把 node_modules/.bin 加入 PATH）
npm run start:mf:shell

# 或者：不依赖全局 PATH，用 npx 调用本地 cross-env
npx cross-env NODE_ENV=development MFE_ROLE=host webpack serve --config webpack/webpack.dev.js
```

### Remote 应用（远程项目）

启动 projectA：
```bash
# 推荐
npm run start:mf:projectA

# 或者：npx 方式
npx cross-env NODE_ENV=development MFE_ROLE=remote PROJECT=projectA webpack serve --config webpack/webpack.dev.js --port 8081
```

启动 projectB：
```bash
# 推荐
npm run start:mf:projectB

# 或者：npx 方式
npx cross-env NODE_ENV=development MFE_ROLE=remote PROJECT=projectB webpack serve --config webpack/webpack.dev.js --port 8082
```

## 生产环境部署

### 1. 构建所有项目

#### 构建主应用（Host）

```bash
# 推荐：直接用 npm scripts（会自动把 node_modules/.bin 加入 PATH）
npm run build:mf:shell

# 或者：不依赖全局 PATH，用 npx 调用本地 cross-env
npx cross-env PROJECT=shell MFE_ROLE=host PUBLIC_URL=/ SENTRY_SOURCE_MAP=no BUILD_GOAL=production NODE_ENV=production webpack --config webpack/webpack.prod.js --stats-error-details
```

输出目录：`dist/`

#### 构建远程应用（Remote）

构建 projectA：
```bash
# 推荐
npm run build:mf:projectA

# 或者：npx 方式
npx cross-env PROJECT=projectA MFE_ROLE=remote PUBLIC_URL=/projectA/ SENTRY_SOURCE_MAP=no BUILD_GOAL=production NODE_ENV=production webpack --config webpack/webpack.prod.js --stats-error-details
```

输出目录：`dist-projectA/`

构建 projectB：
```bash
# 推荐
npm run build:mf:projectB

# 或者：npx 方式
npx cross-env PROJECT=projectB MFE_ROLE=remote PUBLIC_URL=/projectB/ SENTRY_SOURCE_MAP=no BUILD_GOAL=production NODE_ENV=production webpack --config webpack/webpack.prod.js --stats-error-details
```

输出目录：`dist-projectB/`

### 2. 部署到服务器

#### 方案 1: 同域名部署（推荐）

将所有构建产物部署到同一域名的不同路径：

```
/var/www/myapp/
├── index.html                 # 主应用入口
├── static/                    # 主应用静态资源
├── remoteEntry.js            # 主应用 MFE 入口（如果需要）
├── projectA/
│   ├── index.html
│   ├── remoteEntry.js        # projectA 的 MFE 入口
│   └── static/
└── projectB/
    ├── index.html
    ├── remoteEntry.js        # projectB 的 MFE 入口
    └── static/
```

Nginx 配置示例：

```nginx
server {
    listen 80;
    server_name myapp.example.com;
    root /var/www/myapp;

    # 主应用
    location / {
        try_files $uri $uri/ /index.html;
    }

    # projectA
    location /projectA {
        alias /var/www/myapp/projectA;
        try_files $uri $uri/ /projectA/index.html;
    }

    # projectB
    location /projectB {
        alias /var/www/myapp/projectB;
        try_files $uri $uri/ /projectB/index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 方案 2: 跨域部署

如果远程应用部署在不同域名：

1. 更新 `webpack/mfe.config.js` 中的 `prodPath`：

```javascript
export const remoteProjects = [
  {
    name: 'projectA',
    devUrl: 'http://localhost:8081/remoteEntry.js',
    prodPath: 'https://projecta.example.com/remoteEntry.js', // 完整 URL
    envKey: 'MFE_PROJECTA_URL',
  },
]
```

2. 配置远程应用的 CORS 头：

```nginx
server {
    listen 80;
    server_name projecta.example.com;
    root /var/www/projectA;

    location / {
        # 允许主应用域名访问
        add_header Access-Control-Allow-Origin "https://myapp.example.com";
        add_header Access-Control-Allow-Methods "GET, OPTIONS";
        add_header Access-Control-Allow-Headers "Content-Type";

        try_files $uri $uri/ /index.html;
    }
}
```

### 3. 使用 Docker 部署

#### Dockerfile 示例（单个应用）

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
ARG PROJECT_NAME
ARG MFE_ROLE
ENV NODE_ENV=production
ENV PROJECT=${PROJECT_NAME}
ENV MFE_ROLE=${MFE_ROLE}

RUN npm run build

FROM nginx:alpine
ARG PROJECT_NAME
COPY --from=builder /app/dist-${PROJECT_NAME:-}/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml 示例

```yaml
version: '3.8'

services:
  # 主应用
  host:
    build:
      context: .
      args:
        MFE_ROLE: host
    ports:
      - "80:80"
    networks:
      - mfe-network

  # 远程应用 A
  projectA:
    build:
      context: .
      args:
        PROJECT_NAME: projectA
        MFE_ROLE: remote
    ports:
      - "8081:80"
    networks:
      - mfe-network

  # 远程应用 B
  projectB:
    build:
      context: .
      args:
        PROJECT_NAME: projectB
        MFE_ROLE: remote
    ports:
      - "8082:80"
    networks:
      - mfe-network

networks:
  mfe-network:
    driver: bridge
```

启动所有服务：
```bash
docker-compose up -d
```

### 4. CI/CD 部署

#### GitHub Actions 示例

```yaml
name: Deploy MFE Applications

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        project:
          # 建议：直接复用 package.json 里已定义的 build:mf:* 脚本
          - { name: 'shell', role: 'host', script: 'build:mf:shell', path: 'dist-shell' }
          - { name: 'projectA', role: 'remote', script: 'build:mf:projectA', path: 'dist-projectA' }
          - { name: 'projectB', role: 'remote', script: 'build:mf:projectB', path: 'dist-projectB' }

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build ${{ matrix.project.name }}
        run: |
          npm run ${{ matrix.project.script }}

          # 备选：如需不用 npm scripts，可改成 npx 形式（示意）
          # npx cross-env PROJECT=${{ matrix.project.name }} MFE_ROLE=${{ matrix.project.role }} BUILD_GOAL=production NODE_ENV=production webpack --config ./webpack/webpack.prod.js --stats-error-details

      - name: Deploy to server
        uses: easingthemes/ssh-deploy@v2
        with:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          SOURCE: ${{ matrix.project.path }}/
          TARGET: /var/www/myapp/${{ matrix.project.name }}
          REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
```

### 5. Vercel 部署（推荐方案：独立项目）

#### 为什么推荐独立项目？

将多个 MFE 放在同一 Vercel 项目 + 子路径下，使用 `publicPath: 'auto'` 经常出问题：
- 刷新页面或深层路由时 `document.currentScript.src` 推断错误
- Vercel rewrites 与 Module Federation chunk 加载互相干扰
- 调试困难，排错成本高

**推荐方案**：每个 MFE 独立 Vercel 项目，Host 用完整 URL 引用 Remote。

#### 部署架构

```
┌─────────────────────────────────────────────────────────────────┐
│  独立 Vercel 项目                                                │
├─────────────────────────────────────────────────────────────────┤
│  pro-react-admin-shell.vercel.app     ← Host (主应用)           │
│  pro-react-admin-projecta.vercel.app  ← Remote A               │
│  pro-react-admin-projectb.vercel.app  ← Remote B               │
└─────────────────────────────────────────────────────────────────┘
```

#### 步骤 1: 创建三个 Vercel 项目

在 Vercel Dashboard 中创建三个独立项目，连接同一个 Git 仓库：

| 项目名 | 配置文件 | 用途 |
|--------|----------|------|
| `pro-react-admin-shell` | `vercel.shell.json` | Host 主应用 |
| `pro-react-admin-projecta` | `vercel.projectA.json` | Remote A |
| `pro-react-admin-projectb` | `vercel.projectB.json` | Remote B |

#### 步骤 2: 配置各项目

**Shell (Host) 项目设置：**
- Framework Preset: `Other`
- Build Command: `npm run build:mf:shell`
- Output Directory: `dist-shell`
- 环境变量:
  ```
  MFE_PROJECTA_URL=https://pro-react-admin-projecta.vercel.app/remoteEntry.js
  MFE_PROJECTB_URL=https://pro-react-admin-projectb.vercel.app/remoteEntry.js
  ```

**ProjectA (Remote) 项目设置：**
- Framework Preset: `Other`
- Build Command: `cross-env PROJECT=projectA MFE_ROLE=remote npm run build:mf`
- Output Directory: `dist-projectA`

**ProjectB (Remote) 项目设置：**
- Framework Preset: `Other`
- Build Command: `cross-env PROJECT=projectB MFE_ROLE=remote npm run build:mf`
- Output Directory: `dist-projectB`

#### 步骤 3: 使用 Vercel CLI 部署（可选）

```bash
# 部署 Shell
vercel --prod --local-config vercel.shell.json

# 部署 ProjectA
vercel --prod --local-config vercel.projectA.json

# 部署 ProjectB
vercel --prod --local-config vercel.projectB.json
```

#### 步骤 4: 配置自定义域名（推荐）

为了更好的用户体验和品牌一致性：

```
app.yourdomain.com           → Shell (Host)
projecta.yourdomain.com      → ProjectA (Remote)
projectb.yourdomain.com      → ProjectB (Remote)
```

然后更新 Shell 的环境变量：
```
MFE_PROJECTA_URL=https://projecta.yourdomain.com/remoteEntry.js
MFE_PROJECTB_URL=https://projectb.yourdomain.com/remoteEntry.js
```

#### 配置文件说明

项目根目录包含三个 Vercel 配置文件：

- `vercel.shell.json` - Shell (Host) 配置
- `vercel.projectA.json` - ProjectA (Remote) 配置
- `vercel.projectB.json` - ProjectB (Remote) 配置

每个配置文件都包含：
- `buildCommand`: 构建命令
- `outputDirectory`: 输出目录
- `rewrites`: SPA 路由支持
- `headers`: CORS 和缓存配置（Remote 需要跨域头）

#### 单项目部署（备选方案）

如果坚持使用单项目 + 子路径方案，参考 `vercel.json`：

```json
{
  "version": 2,
  "buildCommand": "npm run build:mf:vercel",
  "outputDirectory": "dist-vercel",
  "rewrites": [
    { "source": "/projectA/((?!.*\\.[a-z0-9]+$).*)", "destination": "/projectA/index.html" },
    { "source": "/projectB/((?!.*\\.[a-z0-9]+$).*)", "destination": "/projectB/index.html" },
    { "source": "/((?!projectA|projectB)(?!.*\\.[a-z0-9]+$).*)", "destination": "/index.html" }
  ]
}
```

⚠️ **注意**：此方案需要精确配置 rewrites 正则表达式，且 `publicPath: 'auto'` 在某些边缘情况下可能失效。

## 环境变量配置

### .env.production 示例

```bash
# 构建目标
BUILD_GOAL=production

# 公共路径（根据部署位置调整）
PUBLIC_URL=/

# MFE 配置
MFE_ROLE=host

# 远程项目 URL（生产环境）
# 如果使用相对路径，无需配置
# 如果使用绝对路径或跨域，需要配置：
# MFE_PROJECTA_URL=https://projecta.example.com/remoteEntry.js
# MFE_PROJECTB_URL=https://projectb.example.com/remoteEntry.js

# API 地址
VITE_API_BASE_URL=https://api.example.com
```

## 验证部署

### 1. 检查文件结构

确保所有 `remoteEntry.js` 文件可访问：
- 主应用：`https://myapp.example.com/`
- projectA：`https://myapp.example.com/projectA/remoteEntry.js`
- projectB：`https://myapp.example.com/projectB/remoteEntry.js`

### 2. 浏览器控制台检查

打开主应用，查看控制台：
```javascript
// 应该能看到类似输出
[MFE] Remote projects configured: projectA, projectB
```

### 3. 网络面板检查

检查是否成功加载了远程入口文件：
- `remoteEntry.js` 应该返回 200 状态
- 动态加载的 chunk 文件也应该成功加载

## 常见问题

### 1. remoteEntry.js 404 错误

**原因**: 路径配置不正确

**解决**:
- 检查 `webpack/mfe.config.js` 中的 `prodPath` 是否正确
- 检查 Nginx 配置是否正确映射路径
- 确认文件确实存在于目标目录

### 2. CORS 错误

**原因**: 跨域配置问题

**解决**:
- 如果同域部署，使用相对路径
- 如果跨域部署，配置正确的 CORS 头
- 使用完整的 HTTPS URL

### 3. 共享依赖版本冲突

**原因**: 不同应用的依赖版本不一致

**解决**:
- 统一所有应用的 React、Antd 等关键依赖版本
- 检查 `package.json` 确保版本一致
- 使用 `npm list <package>` 检查实际安装版本

### 4. 动态路径问题

**原因**: SPA 路由与静态文件服务冲突

**解决**:
- 使用 `try_files $uri $uri/ /index.html` 配置
- 确保 `publicPath` 设置正确（通常为 'auto' 或 '/'）

## 性能优化建议

1. **启用 HTTP/2**: 改善多文件加载性能
2. **CDN 加速**: 将静态资源部署到 CDN
3. **压缩资源**: 启用 Gzip/Brotli 压缩
4. **缓存策略**: 设置合理的缓存过期时间
5. **预加载**: 使用 `<link rel="preload">` 预加载关键资源

## 安全建议

1. **HTTPS**: 生产环境必须使用 HTTPS
2. **CSP**: 配置内容安全策略
3. **源验证**: 验证远程模块的来源
4. **版本锁定**: 生产环境锁定依赖版本

## 监控与日志

建议添加以下监控：
- 远程模块加载成功率
- 加载时间监控
- 错误日志收集
- 用户体验指标（Core Web Vitals）

## 更多资源

- [Webpack Module Federation 文档](https://webpack.js.org/concepts/module-federation/)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)
- 项目内其他文档：
  - [docs/MULTI_PROJECT.md](./MULTI_PROJECT.md)
  - [docs/DEPLOY.md](./DEPLOY.md)
