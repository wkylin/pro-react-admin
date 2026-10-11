# `src` 目录职责与依赖约定

本文说明当前 `src` 各目录的职责、相互关系和后续迁移规则。组件数量、页面入口数量和 Story 数量由[源码与组件清单](./COMPONENT_CATALOG.md)生成；不要通过手工维护数字来代替清单。

## 当前目录

```mermaid
src/
├── assets/       # 应用全局静态资源：图片、字体、地图、音频、视频
├── bootstrap/    # React 启动组合、全局 Provider 和启动期监听
├── components/   # 历史共享组件与 Hooks，按功能迁移中的存量区
├── features/     # 按业务领域组织的页面、组件、状态、请求和类型
├── i18n/         # 国际化初始化和语言资源
├── layouts/      # 应用壳、导航/菜单文案键、标签页、布局 preset 与 slots
├── lib/          # 已发布 npm API 的旧源码入口，受组件库契约约束
├── pages/        # 尚未迁入 feature 的独立页面和技术演示
├── platform/     # API、认证/权限、导航、PWA、遥测等横切基础能力
├── projects/     # 多项目入口、各项目组合及 Module Federation Host/Remote
├── routers/      # 路由表、功能分组、加载策略、路由守卫组合
├── shared/       # 与具体业务无关的应用共享 UI 和通用库
├── store/        # 应用壳全局状态；领域状态放回对应 feature
├── styles/       # 全局 reset、动画和基础样式
├── theme/        # 主题 token、模式定义和 Provider Hook
├── index.tsx     # 主应用入口
├── theme.tsx     # 主应用路由与主题组合
└── sw.ts         # Webpack Service Worker 构建入口
```

## 每个目录解决什么问题

| 目录 | 所有者与用途 | 适合放置 | 不应放置 |
| --- | --- | --- | --- |
| `assets` | 全应用共享的静态文件 | Logo、默认背景、通用字体、公共音视频 | 只被单个业务使用的图片；这类资源放到 feature 或组件旁 |
| `bootstrap` | 应用启动阶段 | Provider 组装、启动监听、错误兜底 | 页面业务、具体菜单和业务状态 |
| `components` | 迁移中的历史组件集合 | 既有 `stateless`、`stateful`、`hooks` 存量维护 | 新组件和新 Hook；新代码应按下表归入 feature、shared、platform 或 package |
| `features/<domain>` | 一个业务领域的垂直切片 | 页面、领域组件、API adapter、model/store、领域 Hook、样式 | 其他领域的私有实现；跨领域复用应通过公开入口或提炼到 shared |
| `i18n` | 国际化运行时 | i18next 初始化、按语言组织的翻译资源 | 页面组件和菜单配置；菜单翻译键由 `layouts/navigation` 生成 |
| `layouts` | 应用框架和视觉骨架 | Header、Sider、Tabs、Content、导航配置、布局 registry/slots | 业务页面内容和领域数据请求 |
| `lib` | 对外发布的旧 npm API 源码 | 已发布入口及其依赖，严格遵守 `packages/wui-react` 的 exports/版本契约 | 新应用组件或随意移动已发布路径；逐步迁入 package 时必须同步更新发布清单 |
| `pages` | 路由可直接呈现的历史页面与演示 | 目前尚未迁移的单页 demo、独立技术示例、认证入口 | 新建的复杂业务域；应新建 `features/<domain>` |
| `platform` | 多业务共享的应用基础设施 | `api`、`auth`、`navigation`、`pwa`、`telemetry`、`feedback`、`mfe`、环境配置、错误处理 | 具体业务页面、业务 store、依赖 `pages` 或 `features` 的代码 |
| `projects` | 多应用的组合与入口 | 项目入口、项目注册、远程模块和项目级覆写 | 重复实现已有 feature 或共享能力 |
| `routers` | 把 URL 映射到页面/布局/访问策略 | route registry、按功能拆分的路由、加载和守卫组合 | 页面实现本身、认证服务实现、第二份菜单业务数据 |
| `shared` | 应用内部跨 feature 复用层 | 无业务语义的 UI、纯函数、浏览器通用 Hook | 路由、布局、feature、project、platform 的反向依赖 |
| `store` | 跨页面且生命周期属于应用壳的状态 | 侧栏、布局模式等应用级状态和 selectors | 通知、埋点、订单等领域数据；放入相应 feature |
| `styles` | 全局 CSS 入口 | reset、全局动画、第三方全局样式修补 | 组件私有规则；应使用 CSS Modules 或组件局部样式 |
| `theme` | 主题系统 | Ant Design Provider、颜色/模式 token、主题 Hook | 业务逻辑、菜单和 API 请求 |

认证与权限现在由 `platform/auth` 统一持有类型、mock、API、服务、Hook 和守卫组件；通用请求客户端在 `platform/api`；纯共享工具在 `shared/lib`。菜单配置与其翻译键生成均由 `layouts/navigation` 所有。依赖分析页及其生成数据归到 `features/dependencies`。PWA 实现属于 `platform/pwa`。Storybook 配置、公共 story 资源和文档辅助组件统一由根级 `.storybook` 持有；具体组件故事仍与组件源码并置，由 Storybook 配置发现，二者均不进入应用运行时。

## 组件应该放在哪里

先按所有权和复用范围判断，再看组件是否有内部 state：

1. 只服务一个业务域，或包含领域名词、接口和状态：`src/features/<domain>/components`。
2. 多个 feature 可复用，但依赖当前应用主题或交互：`src/shared/ui`。
3. 与应用私有代码无关，API 稳定且确实需要独立发布：`packages/wui-react/src`。
4. 应用框架的结构组件：`src/layouts`；认证、遥测、错误边界等横切组件：`src/platform`。
5. `src/components/stateless` 和 `stateful` 是历史目录名称，不代表真实状态特征，也不是新代码的分类标准。

## 允许的依赖方向

```text
flowchart TD
  Bootstrap[bootstrap] --> Projects[projects]
  Bootstrap --> Routers[routers]
  Projects --> Layouts[layouts]
  Projects --> Features[features]
  Routers --> Layouts
  Routers --> Features
  Routers --> Platform[platform]
  Layouts --> Shared[shared]
  Layouts --> Platform
  Features --> Shared
  Features --> Platform
```

`packages/wui-react` 只依赖显式声明的 React、Ant Design 等 peer dependencies，不参与应用源码的依赖环。

- `features` 可以使用 `shared` 和 `platform`，不能读取另一个 feature 的私有文件。
- `shared`、`platform` 不得依赖 `features`、`pages`、`layouts`、`projects` 或 `routers`。
- `routers` 引用 feature 的公开页面入口；页面实现留在 feature 内。
- `store` 只保存应用壳状态；领域状态和服务端数据随 feature 生命周期管理。
- `packages/wui-react` 不得导入 `src` alias。`src/lib` 是当前已发布 API 的迁移例外，不是新增功能入口。
- 不为删除的目录增加兼容 barrel 或转发文件；迁移时一次性更新调用方和文档。
- 新增目录必须有明确 owner；避免 `misc`、`common`、`utils2` 和只含一个临时文件的分类。

## 后续迁移顺序

1. **当前已完成的归并**：认证/权限和通用 API；通用工具；语言资源；Storybook 支持文件；依赖分析 feature；PWA 平台能力。
2. **迁移历史页面**：把有共同数据、状态和交互的页面组合按领域迁入 `features`；纯展示的技术示例可保留在 `pages`。
3. **迁移历史组件与 Hook**：依据调用者把领域组件放进 feature、应用复用组件放进 shared、稳定公开组件迁入 package；同步组件清单和 story。
4. **清理发布源码边界**：逐个核对 `src/lib` 的 npm exports，将实现迁入 package 后再更新构建入口和语义版本，不以目录搬迁破坏已发布 API。
5. **收敛路由元数据**：校验 route registry、菜单、权限声明之间的一致性，逐功能组减少重复配置。

每次迁移都应同步更新 import、Webpack/TypeScript alias（若有）、文档和组件清单，并运行类型检查、边界检查与受影响目标的构建。无需为目录搬家添加没有行为价值的空目录或兼容入口。
