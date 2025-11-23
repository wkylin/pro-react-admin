<div align="center">
  <img src="https://github.com/user-attachments/assets/f4d9bf1d-f45f-4c98-8bde-8c0b7144a120" alt="logo" />
</div>

# Pro React Admin

<div align="left">

![check-status](https://img.shields.io/github/checks-status/wkylin/pro-react-admin/main 'check-status')
![build status](https://img.shields.io/github/workflow/status/wkylin/pro-react-admin/CodeQL 'build status')
![version-status](https://img.shields.io/github/package-json/v/wkylin/pro-react-admin 'version-status')
![license](https://img.shields.io/github/license/wkylin/pro-react-admin 'license')
![contributors](https://img.shields.io/github/contributors/wkylin/pro-react-admin 'contributors')
[![DeepScan grade](https://deepscan.io/api/teams/16370/projects/24083/branches/739580/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16370&pid=24083&bid=739580)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/wkylin/pro-react-admin)

## 项目特性

1. 升级 Ant 5.x.x， 实现亮白与暗黑主题切换，并自定义组件主题，且组合紧凑算法实现相关主题
2. 基于 React 最新版本，拥抱 Hooks
3. 基于 React Router V7, 实现嵌套路由更方便
4. 基于 Webpack 最新版本，实现多环境打包部署，代码分割优化，结合官方分析工具，实时优化代码
5. 同时 支持 vite 6.x.x, 极速构建
6. 基于 Faker 实现 Mock Server，不依赖后端实现模拟数据更加方便
7. 封装 Fetch, 实现 useFetch， 请求更加方便，取消请求，实现请求及响应拦截，方便数据处理及统一报错提示
8. 支持 TypeScript 5.x.x, 一切变得可控，扼杀错误于摇篮之中
9. 支持多页签，提升效率，支持国际化
10. 代码风格统一，项目统一配置 ESLint/Prettier/Husky/EditorConfig
11. 配置 Commit message， 使用标准 commit 生成 changelog 标准化
12. 配置 Sentry，方便日志追踪，及时发现问题
13. 实现 ErrorBoundary，方便定位问题，避免不可预知的问题导致系统崩溃
14. 代码分割，组件懒加载，Loading 垂直水平居中
15. 集成单元测试，通过编写全面的测试用例，可以发现代码中的潜在问题和漏洞，确保代码的质量和稳定性
16. 集成Tailwindcss V4，高度可定制主题，响应式设计友好，灵活布局，提高开发效率
17. 集成Moton，提供了简洁直观的Api，用于创建流畅、高性能动画，让动画更自自然流畅，方便实现复杂的交互动画
18. 集成 Bit，跨项目复用组件，支持在多个仓库间隔离和复用代码，简化协作过程，可以共享、维护和同步来自不同项目的隔离组件
19. 集成 Bookstory, 方便生成组件文档
20. 更多特性请 fork 项目，相信我，你会有意想不到的收获

## 📊 项目优化文档

为了帮助开发者更好地理解和优化项目，我们提供了以下文档：

1. **[代码质量分析报告](./CODE_QUALITY_ANALYSIS.md)** - 详细的代码质量分析，包含问题和改进建议
2. **[优化建议方案](./OPTIMIZATION_RECOMMENDATIONS.md)** - 完整的优化实施方案，分 3 个阶段
3. **[实施清单](./IMPLEMENTATION_CHECKLIST.md)** - 可执行的任务清单，逐项跟踪进度
4. **[快速参考指南](./QUICK_REFERENCE.md)** - 开发者速查手册，常见问题和最佳实践

**快速开始优化**：

```bash
# 1. 查看优化清单
cat IMPLEMENTATION_CHECKLIST.md

# 2. 从 Phase 1 开始实施
# 详见 OPTIMIZATION_RECOMMENDATIONS.md
```

## Vite构建版本

1. 基于Vite 构建， 请参见 feature-vite 分支

## Technology Stack

1. React: v19.x.x [React](https://reactjs.org/)
2. React Router: v7.x.x [React Router](https://reactrouter.com/)
3. Webpack:v5.x.x [Webpack](https://webpack.js.org/)
4. Babel: v7.x.x [Babel](https://babeljs.io/), [Versions](https://babel.docschina.org/versions/)
5. Antd: v5.x.x [Ant Design](https://ant.design/index-cn)
6. TypeScript: v5.x.x[TypeScript](https://www.typescriptlang.org/)
7. Vite: v6.x.x [Vite](https://vite.dev/)
8. Tailwindcss: v4.x.x[Tailwindcss](https://tailwindcss.com/)
9. Motion.dev: v12.x.x[Motion.dev](https://motion.dev/)
10. Testing: v16.x.x[Testing Library React](https://testing-library.com/)

## Development

```bash
  1. git clone https://github.com/wkylin/pro-react-admin.git
  2. cd pro-react-admin
  3. 可以选择以下两种方式的任一方式启动项目, 其他 cli 参考 package.json 中的 scripts
    - $ npm start
    - $ npm run dev:faker
    - $ npm run vite:dev:faker
  4. Bit - Build composable software
    - $ npm i -g @teambit/bvm
    - $ bvm install
    - $ bvm upgrade
    - $ bit start
  5. Storybook -- A tool for UI development
    - npx storybook init
    - npm run storybook
```

## 公共路由与权限菜单

### 公共路由维护
所有无需登录即可访问的页面集中在 `src/routers/config/publicRoutes.ts`：

```ts
export const publicRoutes = ['/signin','/signup','/auth/callback','/404','/403','/500']

// 运行时动态管理（如活动期间临时开放某页）
addPublicRoute('/landing')
removePublicRoute('/signup')
listPublicRoutes() // 获取当前公开列表
```

另外，在任意路由配置对象（如模块路由数组项）上添加 `auth: false` 也会被视为公开，优先级高于数组。适用于：
- 单个页面临时开放
- 希望和路由结构一起阅读维护

判断逻辑：
1. 若 `auth === false` 立即放行
2. 否则匹配 `publicRoutes`（支持前缀，如 `/auth/callback` 下子路径）

### 已登录访问公开页的行为
用户已登录再访问 `/signin` 或其它公开页会被重定向到：
1. 根路径 `/`（若有权限）
2. 否则其可访问路由列表的第一项

### 动态权限菜单生成
组件 `src/pages/layout/proSecNav/index.jsx` 在挂载时：
1. 调用 `permissionService.getPermissions()` 取回 `routes` 列表
2. 用 `generateMenuItems(routes)` 递归过滤所有候选菜单
3. 支持父路径包含子页面权限：拥有 `/coupons` 自动显示 `/coupons/add`
4. 子菜单全部被过滤则不展示父菜单

扩展新菜单步骤：
1. 在候选 `allMenuItems` 增加 `{ label:'Xxx', key:'/new-path', icon:<Icon/> }`
2. 将路径加入对应角色的路由数组（`mock/permission.ts` 内 `managerRoutes` 等）
3. 可选：添加权限码到 `routePermissionMap`（若做按钮级校验）

### 登出后权限刷新
`authService.logout()` 会清空 `user_permissions` 缓存并跳转 `/signin`，保证下次登录重新计算菜单。

### 调试技巧
在权限获取函数 `mockGetUserPermissions` 已插入日志，可在浏览器 DevTools Console 观察路由与角色匹配过程。


## 脚手架--白泽 baize

- 可以使用为此项目准备的脚手架开发--白泽 baize

  ```bash
     > npm install baize --location=global
     > baize
  ```

## VSCode extension: 别名路径跳转

```bash
    "alias-skip.mappings": {
        "@src": "/src",
        "@stateless": "/src/components/stateless",
        "@stateful": "/src/components/stateful",
        "@hooks": "/src/components/hooks",
        "@container": "/src/components/container",
        "@assets": "/src/components/assets",
        '@pages': path.resolve('./src/pages'),
        '@routers': path.resolve('./src/routers'),
        '@utils': path.resolve('./src/utils'),
    }
```

## WebStorm 别名跳转设置

1. Settings >> Languages & Frameworks >> Javascript >> Webpack: 指定 Configuration file: webpack\webpack.common.js

## 使用标准 commit 生成 changelog 标准化

- [conventional-changelog](https://github.com/conventional-changelog)
- [standard-version](https://github.com/conventional-changelog/standard-version)
- npm install
- package.json
- git commit
- conventional-changelog-cli
- standard-version
  - changes
  - git add . / git cz
  - npm run release

  ```bash
  npm install --save-dev commitizen
  npm install --save-dev cz-conventional-changelog
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
  git add .
  git cz or cz
  npm install -g conventional-changelog-cli
  conventional-changelog -p angular -i CHANGELOG.md -s
  npm install -g standard-version
  "release": "standard-version --tag-prefix \"publish/\""
  ```

## 约定式提交

1. [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/)

## Commit message

1. The commit message should be structured as follows:

   ```bash
     <type>[optional scope]: <description>
     <BLANK LINE>
     [optional body]
     <BLANK LINE>
     [optional footer(s)]
   ```

2. "type-enum": ["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"]
3. type-enum 说明文档：
   - build: 依赖调整
     影响构建系统或外部依赖的更改 (示例作用域：gulp, broccoli, npm）
   - chore: 杂务处理
     其他不会修改源文件或者测试文件的更改
   - ci: 脚本变更
     对 CI 配置文件和脚本的更改（示例作用域： Travis, Circle, BrowserStack, SauceLabs)
   - docs: 文档变更
     添加或者更新文档
   - feat: 添加功能
     引入新的特性
   - fix 错误修复
     修复 bug
   - perf: 性能优化
     更改代码以提高性能
   - refactor: 代码重构
     即不是修复 Bug，也不是添加特性的代码更改
   - revert: 恢复版本
     恢复到上一个版本
   - style: 格式调整
     不会影响代码含义的更改（空格，格式缺少分号等）
   - test: 更新测试
     添加或者更新测试

4. [https://www.npmjs.com/package/devmoji](https://www.npmjs.com/package/devmoji)
5. [https://gitmoji.dev/](https://gitmoji.dev/)
6. [git commit 工具链](https://juejin.cn/post/7067166468797890591)
7. [https://theodorusclarence.com/library/conventional-commit-readme](https://theodorusclarence.com/library/conventional-commit-readme)

## React Code Splitting Library

1. [Loadable Components](https://loadable-components.com/)

## Mock Server

```bash
// mock index.js
npm run dev:faker
```

## Github 登录

```
# Authorization callback URL
http://localhost:8080/auth/callback
```

## Deployment

1. Deployment: [Deployment] (<https://create-react-app.dev/docs/deployment>)
2. Deploy gh-pages:

   ```bash
   "predeploy": "npm run build:production",
    "deploy": "gh-pages -d dist",
   ```

3. Vercel
   提交后自动部署，预览地址：

   ```
   [https://pro-react-admin.vercel.app/](https://pro-react-admin.vercel.app/)
   ```

## 架构

![whiteboard_exported_image](https://github.com/wkylin/pro-react-admin/assets/1208330/c28852c2-7efe-407f-80f8-41d741ef3108)

## 待解决

1. 配备比较完善的脚手架：
   - [https://blog.kiradev.co/build-a-cli-using-nodejs](https://blog.kiradev.co/build-a-cli-using-nodejs)
2. 完善文档：
   - [https://docusaurus.io/](https://docusaurus.io/)
   - [https://d.umijs.org/zh-CN](https://d.umijs.org/zh-CN)
   - [Bit](https://bit.dev/)
3. CacheRoute: [react-router-cache-route](https://github.com/CJY0208/react-router-cache-route)

## Docusaurus

1. Github: [https://github.com/wkylin/pro-react-admin](https://github.com/wkylin/pro-react-admin)

2. Demo: [https://pro-react-admin.vercel.app/](https://pro-react-admin.vercel.app/)

## Snyk

```js
  - npm install -g snyk
  - snyk auth
  - snyk monitor
```

## Bit

1. [Bit.dev](https://bit.dev/)
2. [Bit 实践](https://juejin.cn/post/7157576390177456159)

## 已支持特性

1. TypeScript: [TypeScript](https://www.typescriptlang.org/)
   - [https://react-typescript-cheatsheet.netlify.app/](https://react-typescript-cheatsheet.netlify.app/)
   - [https://usehooks-ts.com/](https://usehooks-ts.com/)
   - [webpack-react-boilerplate](https://github.com/gor918/webpack-react-boilerplate)
   - [https://usehooks.com/](https://usehooks.com/)
   - [https://ahooks.js.org/](https://ahooks.js.org/)
2. Mock Server
   - [Faker](https://fakerjs.dev/)
   - [msw](https://github.com/mswjs/msw)
3. 单页面多页签参考
   - [react-antd-multi-tabs-admin](https://github.com/hsl947/react-antd-multi-tabs-admin.git)
4. Axios
   - [axios 拦截器之重复请求取消](https://juejin.cn/post/7004721390767046686)
5. React SVGR
   - [https://react-svgr.com/docs/webpack/](https://react-svgr.com/docs/webpack/)

## 代码规范：ESLint Prettier Husky EditorConfig

1. ESLint: [ESLint](https://eslint.org/)

   ESLint is a linter for the JavaScript language, written in Node.js. That helps you find and fix problems in your JavaScript code.

   [https://json.schemastore.org/eslintrc](https://json.schemastore.org/eslintrc)

2. Prettier: [Prettier](https://github.com/prettier/prettier)

   Prettier is an opinionated code formatter that formats the code with the help of rules we set.

3. Husky: [Husky](https://github.com/typicode/husky)

   Husky is an NPM package that lets you run a set of commands or script before any git action. For eg pre-push, pre-commit, pre-rebase.

4. Commit Lint: [Commit Lint ](https://commitlint.js.org)

   CommitLint helps your team adhering to a commit convention. By supporting npm-installed configurations it makes sharing of commit conventions easy.

5. Editor Config: [EditorConfig](https://EditorConfig.org)
   EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.

6. Semantic Versioning: [Semantic Versioning](https://semver.org/)

7. Active hooks:
   [https://typicode.github.io/husky/#/?id=install](https://typicode.github.io/husky/#/?id=install)
8. Prettierrc
   [http://json.schemastore.org/prettierrc](http://json.schemastore.org/prettierrc)
9. Conflict eslint prettier Conditional (ternary) operator

   ```bash
    // lint-staged

    "lint-staged": {
      "**/*": [
        "npm run prettier:fix"
      ],
      "src/**/*.{js, jsx, ts, tsx}": [
        "npm run eslint:fix",
        "npm run prettier:fix"
      ],
      "src/**/*.less": [
        "npm run stylelint:fix",
        "npm run prettier:fix"
      ],
      "*.md": [
        "npm run markdownlint:fix",
        "npm run prettier:fix"
      ]
    },
    // .eslintrc.json
    "extends": ["plugin:react/recommended", "standard", "prettier"],
    // package.json
    "prettier:fix": "prettier --write \"src/**/*\" --end-of-line auto --ignore-unknown",
   ```

## 自动化持续代码审查工具

1. [DeepSource/](https://deepsource.io/)
2. [DeepScan](https://deepscan.io/)
3. [SonarQube](https://www.sonarsource.com/)

## Mac 本地部署 SonarQube

1. [SonarQube for Mac](https://juejin.cn/post/7210005376652886077)
2. [Gitlab for Mac](https://juejin.cn/post/7210746685802397755)
3. [Gitlab CI/CD for Mac](https://juejin.cn/post/7214686619097874491)

## Sentry 接入

1. [Sentry](https://sentry.io/)
2. 遇到的问题：
   - ERROR in Sentry CLI Plugin: spawn /Users/sheldon/Desktop/promotion-manage-web/node_modules/@sentry/cli/sentry-cli ENOENT
   - 解决方案参考：[https://juejin.cn/post/6961012856636571655](https://juejin.cn/post/6961012856636571655)
   - "sentry:check": "node check-sentry.js
3. Self-Hosted Sentry nightly -[https://github.com/getsentry/self-hosted](https://github.com/getsentry/self-hosted)

## VSCode Extensions

1. ErrorLens: [ErrorLens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
2. SonarLint: [https://www.sonarlint.org/](https://www.sonarlint.org/)

## CSS Modules

A CSS Module is a CSS file in which all class names and animation names are scoped locally by default.

1. PostCSS: [PostCSS](https://postcss.org/)

2. StyleLint: [StyleLint](https://stylelint.io/)
   npx stylelint --help

## ACSS

1. Windi CSS: [Windi CSS](https://windicss.org/)

2. Tailwind CSS: [TailWind CSS](https://tailwindcss.com/)

## CI/CD 自动化构建

1. GitHub Actions

## Test

1. [Jest](https://jestjs.io/)
2. [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
3. [React Hooks Testing Library](https://github.com/testing-library/react-hooks-testing-library)
4. [Cypress](https://www.cypress.io/)

```bash
    1. npm install jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer --save-dev
    2. npm install  --save-dev @testing-library/react
    3. npm install cypress --save-dev
    4. npm install --save-dev @testing-library/react-hook
```

## Plugins

1. [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)
2. [react-refresh](https://www.npmjs.com/package/react-refresh)

## HTTP

1. HTTP: [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
2. HTTP.DEV [HTTP.DEV](https://http.dev/)

## Code Contributors

## [Choose A License](https://choosealicense.com/)

1. [MIT](https://choosealicense.com/licenses/mit/)

## Server: Dev, Test, UAT(Live), Staging, Demo, Production

1. [Server Info](https://www.gratasoftware.com/what-is-each-server-for-development-test-uat-or-staging-demo-and-production/)

Copyright (c) 2021 Promotion Web
Licensed under the [Apache License](https://choosealicense.com/licenses/apache-2.0/).

## NPM version

npm version [| major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=[alpha, beta, rc]] | from-git]

## Git Tag

1. git tag -a v1.2.0 -m "version: 1.2.0"
2. git push origin v1.2.0
3. git push origin --tags

## Nginx

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

## Tree Node Cli

1. npm install -g tree-node-cli
2. Mac: tree -L 2 -I "node_modules" -r -F
3. Win: treee -L 2 -I "node_modules" -r -F
4. tree node

   ```bash
    pro-react-admin/
   ├── workspace.jsonc
   ├── webpack/
   │   ├── webpack.prod.js
   │   ├── webpack.dev.js
   │   ├── webpack.common.js
   │   ├── process.js
   │   ├── paths.js
   │   └── dev.proxy.js
   ├── vite.config.js
   ├── typings/
   │   ├── style.d.ts
   │   ├── declaration.d.ts
   │   └── asset.d.ts
   ├── tsconfig.json
   ├── src/
   │   ├── utils/
   │   ├── theme.tsx
   │   ├── theme/
   │   ├── styles/
   │   ├── store/
   │   ├── service/
   │   ├── routers/
   │   ├── reducers/
   │   ├── pages/
   │   ├── index.tsx
   │   ├── components/
   │   ├── assets/
   │   ├── actions/
   │   └── App.tsx
   ├── public/
   │   ├── robots.txt
   │   ├── manifest.json
   │   ├── loading.svg
   │   ├── index.html
   │   └── favicon.ico
   ├── packagehash.txt
   ├── package.json
   ├── package-lock.json
   ├── index.html
   ├── faker/
   │   ├── utils/
   │   ├── shops/
   │   ├── index.js
   │   └── app/
   ├── docker-compose.yml
   ├── dist/
   │   ├── static/
   │   ├── react.bb194261542b956cd3ea.js.map
   │   ├── react.bb194261542b956cd3ea.js.gz
   │   ├── react.bb194261542b956cd3ea.js.LICENSE.txt
   │   ├── react.bb194261542b956cd3ea.js
   │   ├── index.html
   │   └── favicon.ico
   ├── compilation-stats.json
   ├── check-sentry.js
   ├── babel.config.js
   ├── api/
   │   ├── server.js
   │   ├── package.json
   │   ├── package-lock.json
   ├── SECURITY.md
   ├── README.md
   ├── LICENSE
   ├── Dockerfile
   ├── CODE_OF_CONDUCT.md
   └── CHANGELOG.md
   ```

## Webpack Analyse

1. [Webpack 官方分析工具](https://webpack.github.io/analyse/)

   ```bash
      npm run analyze:build
   ```

2. 依赖分析

```bash
   npm run js-analyzer
```

![image](https://github.com/user-attachments/assets/4a76e27f-47d3-4230-8587-73c3f0d8e5a0)

## CRACO:Create React App Configuration Override

1. [https://github.com/gsoft-inc/craco](https://github.com/gsoft-inc/craco)

## 与 ESLint 风格不一致

1. "lint:json": "jsonlint --quiet src/\*_/_.json",
2. "standard": "standard src/\*_/_",
3. "standard:fix": "standard --fix src/\*_/_",
4. rm -rf package-lock.json

## Update npm

```bash
  npm install css-loader@5.2.7 --save-dev
  "webpack-dev-server": "^4.1.1",
  Uncaught TypeError: SocketClient is not a constructor
```

## GitHub Proxy

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

## pm-keeper

1. [https://www.npmjs.com/package/pm-keeper](https://www.npmjs.com/package/pm-keeper)

## npm i && npm ci

1. [npm ci vs. npm install](https://betterprogramming.pub/npm-ci-vs-npm-install-which-should-you-use-in-your-node-js-projects-51e07cb71e26)

## Husky 不起作用解决方案

参考官网：[https://typicode.github.io/husky/#/](https://typicode.github.io/husky/#/)
按以下步骤进行设置：

1. 删除 .git 目录下的 hooks 及 .husky
2. 查看 git config 配置是否存在 core.hookspath=.husky

   ```base
     git config --list
   ```

3. 删除配置及卸载 Huksy:

   ```base
     npm uninstall husky && git config --unset core.hookspath
   ```

4. 再次安装 Husky:

   ```base
     npm install husky --save-dev
     // npm set-script prepare "husky install"
     npx husky-init
   ```

5. 新增 Hooks：

   ```base
     npx husky add .husky/pre-commit "npx lint-staged"
     npx husky add .husky/pre-commit "npx pretty-quick --staged"
     npx husky add .husky/commit-msg 'npx --no-install commitlint --edit'
     npx husky add .husky/prepare-commit-msg 'exec < /dev/tty && npx cz --hook || true'
   ```

## Show your support

<!-- Give a ⭐️ if this project helped you! -->

If you like the project, give it a star ⭐️, it will be a great encouragement to me.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=wkylin/pro-react-admin&type=Date)](https://star-history.com/#wkylin/pro-react-admin&Date)

</div>
