# SonarQube + VS Code 本地开发终极宝典（2025.12 完全版）

适用于所有语言（React / Vue / Next.js / Java / Python / Go / .NET …）  
适用于 Windows / macOS / Linux + Java 21 + SonarQube 25.x / 10.x

## 1. 先决条件（只需做一次）

- SonarQube 已运行 → http://localhost:9000（默认 admin/admin）
- sonar-scanner 已加入系统 PATH
- VS Code 已安装扩展：**SonarLint**（ID: SonarSource.sonarlint-vscode）

## 2. 生成永久 Token（所有方式都要用）

1. 打开 http://localhost:9000
2. 右上角头像 → My Account → Security
3. Name 随便填 → Generate Token → 复制（例：``）

> 注意：关闭页面后不可再看，请妥善保存

## 3. 三种核心使用方式对比

| 方式                 | 实时性 | 报告完整度 | 覆盖率 | 质量门 | 推荐场景                 |
| -------------------- | ------ | ---------- | ------ | ------ | ------------------------ |
| SonarLint 实时绑定   | ★★★★★  | ★★★★☆      | 支持   | 不支持 | 日常写代码、快速发现问题 |
| sonar-scanner 命令行 | ★☆☆☆☆  | ★★★★★      | 支持   | 支持   | 提交前、PR 前正式检查    |
| VS Code 一键任务     | ★★☆☆☆  | ★★★★★      | 支持   | 支持   | 懒人终极方案（强烈推荐） |

## 4. 方式一：SonarLint 实时分析（写代码即出报告）

1. 打开项目文件夹
2. 左下角点击 SonarLint → Add new connection → SonarQube
   - Server URL：`http://localhost:9000
   - Authentication：Token → 粘贴上面 token
3. 右键项目根目录 → **SonarLint: Update binding to SonarQube**
   - 选择已有项目或自动创建
4. 完成！保存文件即自动推送到网页

## 5. 方式二 & 三：完整扫描（最全报告 + 质量门）

### 5.1 通用 sonar-project.properties（直接复制到项目根目录）

```properties
# ==================== 项目信息（务必修改） ====================
sonar.projectKey=pro-react-admin
sonar.projectName=Pro React Admin
sonar.projectVersion=1.0

# ==================== 源码路径 ====================
sonar.sources=src
sonar.exclusions=**/node_modules/**,**/*.test.*,**/*.spec.*,public/**,build/**,dist/**,**/*.d.ts,**/*.config.*,coverage/**,.git/**

# ==================== 测试与覆盖率 ====================
sonar.tests=src
sonar.test.inclusions=**/*.test.*,**/*.spec.*
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.coverage.exclusions=src/index.tsx,src/setupTests.*,src/reportWebVitals.*,src/react-app-env.d.ts,**/*.config.*

# ==================== SonarQube 服务 ====================
sonar.host.url=http://localhost:9000
sonar.sourceEncoding=UTF-8
sonar.qualitygate.wait=true
sonar.scm.disabled=true

# ==== sonar-scanner.bat ===
sonar-scanner.bat
```

### 5.2 方式二：纯命令行（最快）

```shell
# 1. 生成覆盖率报告（React 示例）
npm test -- --coverage --watchAll=false

# 2. 执行扫描
sonar-scanner -Dsonar.token=
```

### 5.3 方式三：VS Code 一键任务（终极懒人）

创建 .vscode/tasks.json：

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "SonarQube 一键完整扫描",
      "type": "shell",
      "command": "npm run test:coverage && sonar-scanner",
      "options": {
        "env": {
          "SONAR_TOKEN": ""
        }
      },
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "panel": "shared",
        "clear": true
      },
      "problemMatcher": []
    }
  ]
}
```

package.json 加上脚本：

```json
"scripts": {
  "test:coverage": "react-scripts test --coverage --watchAll=false"
}
```

以后永远只按 Ctrl+Shift+B → 选择任务即可！

## 6. 查看报告

http://localhost:9000/dashboard?id=pro-react-admin

## 7. 常见问题秒解

| 问题                        | 解决方案                                             |
| --------------------------- | ---------------------------------------------------- |
| 扫描卡住                    | 检查 token / 防火墙 / localhost:9000 是否可访问      |
| 覆盖率 0%                   | 确认 coverage/lcov.info 已生成                       |
| 项目没出现                  | 第一次扫描自动创建，刷新页面                         |
| 连接到 activate.navicat.com | 删除 hosts 错误记录 或加 sonar.search.host=127.0.0.1 |
| Java 模块错误               | wrapper.conf 加入 --add-opens 参数                   |

## 8. 多语言额外配置（追加到 sonar-project.properties）

```shell
# properties# Java
sonar.java.source=21
sonar.java.target=21
# Python
sonar.python.version=3.11
# Go
sonar.go.coverage.reportPaths=coverage.out
```

## 9. 终极进阶

- 质量门（Quality Gate）
  Administration → Quality Gates → Create
  示例：Coverage < 80% / New Bugs > 0 → Fail

- 生产环境推荐配置（sonar.properties 追加）
  ```shell
  propertiessonar.web.javaOpts=-Xmx4g
  sonar.search.javaOpts=-Xmx4g
  sonar.ce.javaOpts=-Xmx4g
  ```
