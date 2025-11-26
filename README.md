<div align="center">
  <img src="https://github.com/user-attachments/assets/f4d9bf1d-f45f-4c98-8bde-8c0b7144a120" alt="logo" height="120" />
</div>

<div align="center">
  <img src="https://img.shields.io/github/checks-status/wkylin/pro-react-admin/main" alt="check-status" />
  <img src="https://img.shields.io/github/workflow/status/wkylin/pro-react-admin/CodeQL" alt="build status" />
  <img src="https://img.shields.io/github/package-json/v/wkylin/pro-react-admin" alt="version-status" />
  <img src="https://img.shields.io/github/license/wkylin/pro-react-admin" alt="license" />
  <img src="https://img.shields.io/github/contributors/wkylin/pro-react-admin" alt="contributors" />
  <a href="https://deepscan.io/dashboard#view=project&tid=16370&pid=24083&bid=739580"><img src="https://deepscan.io/api/teams/16370/projects/24083/branches/739580/badge/grade.svg" alt="DeepScan grade" /></a>
  <a href="https://deepwiki.com/wkylin/pro-react-admin"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki" /></a>
</div>

# 🚦 Pro React Admin

高性能、企业级、现代化的 React 权限管理系统，支持多角色、多端适配、动态权限、Mock 测试、自动化 E2E、主题切换等特性，适合中大型管理后台、SaaS 平台、数据可视化等场景。

---

## 🏆 项目亮点

- 动态权限与路由：多角色、菜单/路由/按钮级权限，自动过滤无权路由，体系灵活安全
- 极致移动端适配：响应式布局，主流移动设备体验一致
- 主题与国际化：内置主题切换、暗黑模式、i18n 国际化
- Mock 多角色切换：内置 Mock 权限体系，开发/测试高效
- 自动化测试：Playwright E2E 场景覆盖，保障权限与流程安全
- 高可维护性：核心能力解耦，易扩展、易二次开发
- 现代工程体系：Vite 构建、TypeScript、ESLint/Prettier、CI/CD、Sentry、SonarQube、代码分割、性能优化

---

## 📦 技术栈

- React 19 / TypeScript 5
- Ant Design 6.x
- React Router v7
- Vite 4.x / Webpack 5
- Playwright / Jest / Testing Library
- Mock Server（Faker/MSW）
- ESLint / Prettier / Husky / Commitizen
- Sentry / SonarQube / DeepScan
- Docker / Nginx / Github Actions

---

## 📁 目录结构

```text
pro-react-admin/
├── src/
│   ├── actions/           # Redux/Action 相关
│   ├── assets/            # 静态资源
│   ├── components/        # 业务组件
│   ├── config/            # 配置文件
│   ├── hooks/             # 自定义 hooks
│   ├── i18n/              # 国际化
│   ├── mock/              # Mock 数据
│   ├── pages/             # 页面模块
│   ├── reducers/          # Redux Reducer
│   ├── routers/           # 路由配置
│   ├── service/           # 请求与服务
│   ├── store/             # 状态管理
│   ├── styles/            # 全局样式
│   ├── theme/             # 主题相关
│   ├── utils/             # 工具函数
│   ├── App.tsx            # 应用入口
│   └── index.tsx          # 渲染入口
├── public/                # 公共资源
├── tests/                 # 测试用例
├── docs/                  # 文档
├── scripts/               # 脚本
├── api/                   # Mock API 服务
├── ...
```

---

## 🚀 快速开始

```bash
git clone https://github.com/wkylin/pro-react-admin.git
cd pro-react-admin
npm install
npm run dev
```

更多用法详见 [详细文档](./README_PERMISSION.md) 与 [用户角色权限说明](./docs/USER_ROLE_PERMISSION.md)。

---

## 🔑 核心功能

- 动态权限菜单与路由自动过滤
- 登录/注册流程优化，支持一键测试账号与权限同步
- Mock 权限体系与多角色切换
- 移动端适配与响应式布局
- 主题切换与国际化
- Playwright E2E 自动化测试
- 统一请求层（支持并发/串行/重试/取消/全局错误处理）
- 消息去重与全局提示
- 代码分割与性能优化

---

## 📝 近期主要更新

- 权限体系重构，支持缓存、过期、强制刷新、单例获取，避免重复请求和竞态
- 路由与菜单权限自动过滤，首页对所有账号可见
- useSafeNavigate/SafeLink 封装，防止越权跳转
- 请求层重构，支持并发/串行/重试/取消/全局错误处理
- 消息去重，避免重复弹窗
- Mock 多角色切换与权限同步
- Playwright E2E 场景覆盖
- 文档与示例完善

---

## 🤝 贡献指南

欢迎 PR、Issue 与 Star！

1. Fork 本仓库
2. 新建分支：`git checkout -b feature/xxx`
3. 提交更改：`git commit -m 'feat: 新增 xxx 功能'`
4. 推送分支：`git push origin feature/xxx`
5. 新建 Pull Request

---

## 📄 License

Apache-2.0 © [wkylin](https://github.com/wkylin)

## 🌐 约定式提交

1. [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/)

## 📄 架构

![whiteboard_exported_image](https://github.com/wkylin/pro-react-admin/assets/1208330/c28852c2-7efe-407f-80f8-41d741ef3108)

## 📝 脚手架--白泽 baize

- 可以使用为此项目准备的脚手架开发--白泽 baize

  ```bash
     > npm install baize --location=global
     > baize
  ```

## 📝自动化持续代码审查工具

1. [DeepSource/](https://deepsource.io/)
2. [DeepScan](https://deepscan.io/)
3. [SonarQube](https://www.sonarsource.com/)

## 📝 Mac 本地部署 SonarQube

1. [SonarQube for Mac](https://juejin.cn/post/7210005376652886077)
2. [Gitlab for Mac](https://juejin.cn/post/7210746685802397755)
3. [Gitlab CI/CD for Mac](https://juejin.cn/post/7214686619097874491)

## 📝 Nginx

1. [Mac Nginx](https://newbedev.com/how-to-restart-nginx-on-mac-os-x)

   ```bash
    brew install nginx
    brew reinstall nginx

    /usr/local/var/www
    /usr/local/etc/nginx/nginx.conf
    /usr/local/etc/nginx/servers/

    brew services list
    brew services start nginx
    brew services stop nginx
    brew services restart nginx
   ```

2. Nginx.conf

   ```bash
   server {
    listen       8081;
    #server_name  localhost;
    server_name  www.pro.react.admin.com;
    # 静态资源
    location / {
        root   /usr/local/var/www/pro-react-admin;
        index  index.html index.htm;
        try_files  $uri $uri/ /index.html @rewrites;
        expires -1;
        add_header Cache-Control no-cache;
        # proxy_pass http://localhost:3000;
    }
    # API代理
    location /api/ {
        proxy_pass https://api.example.com/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        # 允许跨域配置
        add_header Access-Control-Allow-Origin $http_origin;
        add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';
        add_header Access-Control-Allow-Headers 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
        add_header Access-Control-Allow-Credentials 'true';
        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Max-Age 86400;
            add_header Content-Length 0;
            add_header Content-Type text/plain;
            return 204;
        }
    }
    location @rewrites {
      rewrite ^(.+)$ /index.html break;
    }
    # 不缓存
    location ~ .*(htm|html|json)?$ {
      expires -1;
    }
    # 或者全部重定向
    # return 301 https://$server_name$request_uri;
   }

    # SwitchHosts!
    192.168.1.101 www.pro.react.admin.com

    # 第一个目录的配置
    # C:\nginx-1.27.5\html\var\www\html\
    # location /html/ {
    #     root   /var/www;
    #     index  index.html index.htm;
    # }

    # 第二个目录的配置
    # C:\nginx-1.27.5\html\var\www\static\
    # location /static/ {
    #    root   /var/www;
    #    index  index.html index.htm;
    #}

   ```

3. Nginx for Windows

   ```bash
      1. start nginx
      2. nginx -s stop
      3. nginx -s quit
      4. nginx -s reload
      5. nginx -s reopen
   ```

## 📝 Tree Node Cli

1. npm install -g tree-node-cli
2. Mac: tree -L 2 -I "node_modules" -r -F
3. Win: treee -L 2 -I "node_modules" -r -F

## 📝 Webpack Analyse

1. [Webpack 官方分析工具](https://webpack.github.io/analyse/)

   ```bash
      npm run analyze:build
   ```

2. 依赖分析

```bash
   1. npm run js-analyzer
   2. "standard": "standard src/\*_/_",
   3. "standard:fix": "standard --fix src/\*_/_",
   4. rm -rf package-lock.json
```

## 📝 GitHub Proxy

1. 首先确认自己 git 拉取代码的方式

   ```bash
     git remote -v
   ```

2. 设置代理

   ```bash
     git config --global https.proxy 127.0.0.1:10808
     git config --global http.proxy 127.0.0.1:10808
     git config --global http.proxy 'socks5://127.0.0.1:10808'
     git config --global https.proxy 'socks5://127.0.0.1:10808'
   ```

3. 查看代理是否成功

   ```bash
     git config --get --global http.proxy
   ```

4. 查看 git 配置

   ```bash
     git config --global --list
   ```

5. 取消代理

   ```bash
     git config --global --unset http.proxy
     git config --global --unset https.proxy
   ```

## 🤝 Show your support

<!-- Give a ⭐️ if this project helped you! -->

If you like the project, give it a star ⭐️, it will be a great encouragement to me.

## ⭐️ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=wkylin/pro-react-admin&type=Date)](https://star-history.com/#wkylin/pro-react-admin&Date)

</div>
