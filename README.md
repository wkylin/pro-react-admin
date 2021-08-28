# 1. Technology Stack

1. React: v17.0.2 [React](https://reactjs.org/)
2. React Router: v5.2.0 [React Router](https://reactrouter.com/)
3. Webpack:v5.50.0 [Webpack](https://webpack.js.org/)
4. Babel: v7.13.14 [Babel](https://babeljs.io/), [Versions](https://babel.docschina.org/versions/)
5. Antd: v4.15.0 [Ant Design](https://ant.design/index-cn)
6. Redux Hooks: v4.0.5 [Redux Hooks](https://react-redux.js.org/api/hooks)

## 2. 开发环境

1. 推荐 nvm 进行本地 node 版本管理，nrm 进行本地 npm registry 管理

```bash
mac: npm install -g nvm nrm
win: nvm-windows nodist nvs

nvm install 14.16.1
nvm use 14.16.1

```

### 3. VSCode extension: 别名路径跳转

```bash
    "alias-skip.mappings": {
        "@src": "/src",
        "@stateless": "/src/components/stateless",
        "@stateful": "/src/components/stateful",
        "@hooks": "/src/components/hooks",
        "@container": "/src/components/container",
        "@assets": "/src/components/assets",
    }
```

### 4. WebStorm 别名跳转设置

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

### 5. 一次 changelog 的过程如下

- 修改代码
- git add . / git cz
- 修改 package.json 中的 version
- 运行生成 changelog 命令，最好将命令集成到 package.json 的 scripts 中
- 手动 Tag， Push 等

### 6. Mock Server

```bash
// mock index.js
npm run dev:faker
```

### 7. Development

```bash
  1. git clone https://github.com/wkylin/promotion-web.git
  2. cd promotion-web
  3. 可以选择以下两种方式的任一方式启动项目, 其他 cli 参考 package.json 中的 scripts
    - npm start
    - npm run dev:faker 与后端接口约定后，在没有提供接口时前端可以来模拟后端返回数据
    - npm run pm2:server
    - npm run dev:server
```

### 8. Commit message

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

### 9. React Code Splitting Library

1. [Loadable Components](https://loadable-components.com/)

### 6. Deployment

1. Deployment: [Deployment] (<https://create-react-app.dev/docs/deployment>)

### 10. TODO

1. TypeScript: [TypeScript](https://www.typescriptlang.org/)
2. Umi Hox: [Hox](https://github.com/umijs/hox)
3. Mock Server (OK)
   - [msw](https://github.com/mswjs/msw)

### 11. ESLint Prettier Husky EditorConfig

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

7. Active hooks: npx husky install
   [https://typicode.github.io/husky/#/?id=install](https://typicode.github.io/husky/#/?id=install)
8. Prettierrc
   [http://json.schemastore.org/prettierrc](http://json.schemastore.org/prettierrc)
9. Conflict eslint prettier Conditional (ternary) operator

   ```bash
    // lint-staged
    "**/*": [
      "npm run prettier:write"
    ],
    // .eslintrc.json
    "extends": ["plugin:react/recommended", "standard", "prettier"],
    // package.json
    "prettier:write": "prettier --write \"src/**/*\" --end-of-line auto --ignore-unknown",
   ```

### 12. CSS Modules

A CSS Module is a CSS file in which all class names and animation names are scoped locally by default.

1. PostCSS: [PostCSS](https://postcss.org/)

2. StyleLint: [StyleLint](https://stylelint.io/)
   npx stylelint --help

### 13. CI/CD 自动化构建

### 14. Test

1. [Jest](https://jestjs.io/)
2. [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
3. [React Hooks Testing Library](https://github.com/testing-library/react-hooks-testing-library)
4. [Cypress](https://www.cypress.io/)

```bash
    1. npm install jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer --save-dev
    2. npm install  --save-dev @testing-library/react  
```


### 15. Sentry 接入

1. [Sentry](https://sentry.io/)
2. 遇到的问题：
   - ERROR in Sentry CLI Plugin: spawn /Users/sheldon/Desktop/promotion-manage-web/node_modules/@sentry/cli/sentry-cli ENOENT
   - 解决方案参考：[https://juejin.cn/post/6961012856636571655](https://juejin.cn/post/6961012856636571655)
   - "sentry:check": "node check-sentry.js"

### 16. Plugins

1. [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)

### 17. VSCode Extensions

1. ErrorLens: [ErrorLens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
2. SonarLint: [https://www.sonarlint.org/](https://www.sonarlint.org/)

### 18. HTTP

1. HTTP: [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)

### 19. Code Contributors

### 20. [Choose A License](https://choosealicense.com/)

1. [MIT](https://choosealicense.com/licenses/mit/)

### 21. Server: Dev, Test, UAT(Live), Staging, Demo, Production

1. [Server Info](https://www.gratasoftware.com/what-is-each-server-for-development-test-uat-or-staging-demo-and-production/)

Copyright (c) 2021 Promotion Web
Licensed under the [Apache License](https://choosealicense.com/licenses/apache-2.0/).

### 22. NPM

npm version [| major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=[alpha, beta, rc]] | from-git]

### 23. Nginx

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
    server_name  www.promotion-web.com;

    location / {
        root   /usr/local/var/www/promotion-web;
        index  index.html index.htm;
        try_files  $uri $uri/ /index.html @rewrites;
        expires -1;
        add_header Cache-Control no-cache;
        # proxy_pass http://localhost:3000;
    }
    # 接口转发，如果需要的话
    #location ~ ^/api {
    #  proxy_pass http://www.wklin.com;
    #}
    location @rewrites {
      rewrite ^(.+)$ /index.html break;
    }
    # 或者全部重定向
    # return 301 https://$server_name$request_uri;
   }

    # SwitchHosts!
    192.168.1.101 www.promotion-web.com
   ```

3. Nginx for Windows

   ```bash
      1. start nginx
      2. nginx -s stop
      3. nginx -s quit
      4. nginx -s reload
      5. nginx -s reopen
   ```

### 24. Tree Node Cli

1. npm install -g tree-node-cli
2. Mac: tree -L 2 -I "node_modules" -r -F
3. Win: treee -L 2 -I "node_modules" -r -F
4. tree node

   ```bash
    .
    ├── webpack/
    │   ├── webpack.prod.js
    │   ├── webpack.dev.server.js
    │   ├── webpack.dev.js
    │   ├── webpack.common.js
    │   ├── process.js
    │   ├── paths.js
    │   └── dev.server.js
    ├── src/
    │   ├── utils/
    │   ├── styles/
    │   ├── store/
    │   ├── service/
    │   ├── routers/
    │   ├── reducers/
    │   ├── pages/
    │   ├── index.js
    │   ├── components/
    │   ├── assets/
    │   ├── actions/
    │   └── App.js
    ├── public/
    │   ├── robots.txt
    │   ├── manifest.json
    │   ├── index.ejs
    │   └── favicon.ico
    ├── postcss.config.js
    ├── package.json
    ├── package-lock.json
    ├── faker/
    │   ├── utils/
    │   ├── shops/
    │   ├── index.js
    │   └── app/
    ├── docker-compose.yml
    ├── dist/
    │   ├── static/
    │   ├── index.html
    │   └── favicon.ico
    ├── babel.config.js
    ├── README.md
    ├── Dockerfile
    └── CHANGELOG.md
   ```

### 25. Webpack Analyse

1. [Webpack 官方分析工具](https://webpack.github.io/analyse/)
   
   ```bash
      npm run analyze:build
   ```

### 26. CRACO:Create React App Configuration Override

1. [https://github.com/gsoft-inc/craco](https://github.com/gsoft-inc/craco)

### 27. 与ESLint 风格不一致

1. "lint:json": "jsonlint --quiet src/**/*.json",
2. "standard": "standard src/**/*",
3. "standard:fix": "standard --fix src/**/*",
4. rm -rf package-lock.json
