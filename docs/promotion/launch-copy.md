# 推广文案草稿

更新于 2026-11-09。以下正文供审阅与复制，尚未对外发布。发布前先完成[推广执行包的验收](./README.md#发布前验收)，确认公开版本、图片与录屏一致。不要把本地新功能的录像称为已经部署的免登录体验。

统一主体验入口：[公开访问管理预览](https://pro-react-admin.vercel.app/#/preview/access)。源码：[GitHub](https://github.com/wkylin/pro-react-admin)。组件细节：[Storybook](https://wkylin.github.io/pro-react-admin/storybook/)。

## V2EX · 分享创造

标题：

> 做了一个 React 后台脚手架，先开放成员、审批和审计的免登录预览

正文：

我在整理一个供团队复用的 React 管理后台：Pro React Admin。

先放一个可以直接打开的界面：[成员、审批和审计预览](https://pro-react-admin.vercel.app/#/preview/access)。不用注册，数据都是虚构的，只能查看。可以搜索成员、切换审批和审计，先判断这种组织方式是否适合自己的后台。

项目想解决的是开始做内部工具时反复搭建的那部分：后台布局、查询与表单页面、访问管理，以及从演示页面找到源码的路径。仓库也提供 Enterprise 项目预设，可以生成独立项目，接着配置自己的身份、权限和数据。

最近在完善导航分组、页面标题与工具条，以及通知编辑、筛选和手机端体验。录屏使用本地演示环境；公开免登录入口仍是只读的访问管理预览。仪表盘保留示例数据，通知和业务页面模板也没有接真实业务服务。

[源码和本地启动步骤](https://github.com/wkylin/pro-react-admin)；想单独检查组件，可看 [Storybook](https://wkylin.github.io/pro-react-admin/storybook/)。

这轮想收集三类具体问题：

1. 不看说明，能否找到一名成员、待审批事项和一条审计记录？哪一步需要猜？
2. 按 README 创建并启动项目时，卡在哪条命令或哪段说明？请附环境与报错，避免贴入凭据。
3. 如果要做你手头的内部工具，第一块需要替换或补充的页面是什么？

有可复现的问题会整理成 issue，再按影响试用的程度处理。

发布备注：适用节点为 [V2EX 分享创造](https://v2ex.com/go/create)。配一张真实访问管理截图和实际录屏；若目标部署尚未更新，保留正文中的本地演示说明。

## 掘金 · 实操文章提纲与开头

标题：

> 从查询列表到表单提交：用 React 后台脚手架跑通一条管理流程

开头：

在“基础表单”里提交一条申请，从结果页打开详情，再回到列表搜索刚才的标题。列表、表单和详情因此有了同一条记录，而不再只是几个独立页面。

这篇文章用 Pro React Admin 的业务页面模板跑通这条流程，再定位要改字段、接 API 和配置权限时分别该看哪里。模板记录保存在当前工作区的演示 Provider 中，刷新后会重置；真实业务仍需实现服务端校验、授权与持久化。

想先看界面，可以打开[免登录的访问管理预览](https://pro-react-admin.vercel.app/#/preview/access)。接下来的表单提交操作需要在本地项目登录后完成。

提纲：

1. **先看到结果**：截图展示“列表 → 基础表单 → 结果 → 详情 → 回到列表”，说明使用同一组申请记录。引用[业务页面模板指南](../development/PAGE_PATTERNS.md)。
2. **运行这组页面**：使用下面的命令启动既有 Enterprise 入口，记录实际运行环境和终端输出。登录后打开“业务页面模板”，依次提交和查找申请。
3. **找到页面与数据的连接处**：从 `src/features/pagePatterns/module.ts` 进入，查看 `pages/RequestsPage.tsx`、`pages/BasicFormPage.tsx` 与 `model/requests.ts`；解释共享 Provider 为什么让提交结果能回到列表。
4. **新增一个业务字段**：说明类型与解析器、表单、详情、列表、双语文案分别要改什么。提供实际 diff 后再发布这一节，不用伪代码冒充已验证实现。
5. **把演示数据换成 API**：复制为自己的业务模块，定义列表、单条、创建与状态变更的契约；服务端处理租户范围、输入校验和权限。区分菜单隐藏与服务端授权。
6. **迁入自己的项目**：用 Enterprise 预设生成独立项目。预设默认只注册组织管理模块，需要在新项目的 `modules.ts` 显式注册自己的业务模块；说明如何把前面的模板作为参考，而不声称预设已包含所有展示页面。
7. **验证与交付**：按项目质量指南跑受影响的检查；总结仍使用演示数据的区域，并给出对应源码和文档入口。

文章命令块：

```bash
git clone https://github.com/wkylin/pro-react-admin.git
cd pro-react-admin
pnpm install --frozen-lockfile
pnpm run start:enterprise
```

完成页面体验后，停止服务，再创建独立项目：

```bash
pnpm run project:create myApp --preset enterprise
PROJECT=myApp pnpm start
```

环境要求以仓库 README 为准，当前为 Node.js >=24.15.0 且 <25、pnpm 12.16.1。上面的 `PROJECT=...` 写法适用于 macOS/Linux；Windows 使用 `pnpm exec cross-env PROJECT=myApp pnpm start`。首次启动会创建本地 SQLite 演示租户；使用终端打印的地址和登录页提供的本地演示账号。

编辑备注：本文目前只完成提纲与开头，新增字段的具体改动和文章截图尚待按当前提交制作。页面模板不调用企业业务 API，也不生成服务端业务审计。发布前跟随[项目预设指南](../development/MULTI_PROJECT.md)与[业务页面模板指南](../development/PAGE_PATTERNS.md)完整复跑，写明实际验证版本。

## DEV · #showdev

Title:

> Pro React Admin: a React starter for internal management workflows

Body:

You can try the [access management preview](https://pro-react-admin.vercel.app/#/preview/access) without an account. Search members and browse approvals and audit events. It uses fictional data and is read-only.

Pro React Admin is a React admin starter for teams building internal tools. The repository includes reusable list, form, detail, and result pages, plus an Enterprise project preset for starting an independent application.

Recent work focuses on clearer navigation, consistent page headers and toolbars, and notification editing and filtering. The walkthrough shows those interactions in a local demo. The public link above remains a read-only access preview; the business dashboard and page examples use demo data.

[Source and setup instructions](https://github.com/wkylin/pro-react-admin) · [Component Storybook](https://wkylin.github.io/pro-react-admin/storybook/)

Useful feedback would be a task you could not complete, a confusing navigation label, or a setup step that failed, with the environment and reproduction steps. That gives me something concrete to fix.

Suggested tags: `showdev`, `react`, `typescript`, `webdev`.

Publishing note: use `#showdev` for this project showcase. The [official `#opensource` tag guidelines](https://dev.to/t/opensource) direct showcase posts to `#showdev`. Attach the verified screenshots or walkthrough; do not describe local changes as deployed features unless the target deployment has been checked.

## Show HN

Title:

> Show HN: Pro React Admin, a React starter with an account-free access preview

Submission URL:

> https://pro-react-admin.vercel.app/#/preview/access

First comment:

I’m building Pro React Admin for React teams starting internal management tools. The link opens a read-only preview of members, approvals, and audit events without an account. All preview records are fictional.

The repository includes list, form, detail, and result page patterns, along with an Enterprise project preset. That preset is the starting point for an independent app; teams still need to configure their own identity, authorization, data, and deployment.

I have been working on navigation, page consistency, and notification editing. The walkthrough uses a local demo for editable flows. The public preview does not allow writes, and the business dashboard and page examples use demo data.

Source and local setup: https://github.com/wkylin/pro-react-admin

I’m particularly interested in where a developer gets stuck moving from the preview to a running project, or identifying which module to change for a new list or form. I’ll be here to answer implementation questions.

Publishing note: first assess whether the current release is a substantial, tryable project suitable for Show HN. Follow the [official Show HN guidance](https://news.ycombinator.com/showhn.html), keep the usable preview as the submission URL, be available for discussion, and do not ask for upvotes. The comment is a draft; do not promise to be present unless the author can actually participate.

## 复用的短介绍

中文：

> Pro React Admin 是供 React 团队复用的后台脚手架，提供访问管理、常见业务页面模板和独立项目预设。先免登录查看成员、审批与审计，再按 README 运行自己的项目。

English:

> Pro React Admin is a starter for React teams building internal tools, with access management, reusable page patterns, and an Enterprise project preset. Try the read-only preview before running your own project.

可将此介绍用于 README 外部引用或项目目录。首个链接始终使用[公开访问管理预览](https://pro-react-admin.vercel.app/#/preview/access)，其后再放[源码](https://github.com/wkylin/pro-react-admin)。GitHub About、topics 和分享图上传步骤见[推广执行包](./README.md#github-展示设置)。
