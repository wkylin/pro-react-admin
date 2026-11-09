# 聊天室与 Chat Platform

独立入口为 `/#/chat`。界面参考 [Studio Admin Chat](https://studio-admin.arhamkhnz.com/dashboard/chat)，在现有后台中提供房间列表、固定消息头与输入区、独立滚动的消息列表和按需展开的房间详情。手机默认显示房间列表，选择后进入消息页，可返回列表。

## 使用

1. 点击「连接聊天室」，检查 API 地址并使用 Chat Platform 账号连接。预填的 guest 是原集成已提供的公开体验账号，可替换为自己的账号。
2. 连接成功后加载可访问房间，加入首个可用房间。可按名称/说明搜索，查看可用或全部房间，筛选本次连接的未读消息。房间菜单支持置顶、取消置顶、标记为已读和打开详情；这些操作只影响当前页面会话。
3. 消息区显示最近 80 条历史；有更多记录时可扩大读取范围，最多 200 条。也可以刷新历史，或在已加载消息中搜索。
4. 输入区分为「回复」与「内部备注」。Enter 提交，Shift+Enter 换行；中文等输入法组合期间 Enter 不会提交。两类草稿按房间分别保留在内存，发送失败保留原稿，提交期间继续输入不会被旧发送完成清空。
5. 文本工具支持加粗、斜体、删除线、行内代码、引用和列表，保留选区与光标；表情以普通 Unicode 插入。支持插入 HTTP(S) 链接、已上传文件的附件链接，以及引用公共消息。含引用的实际发送文本最多 4000 个字符，超限保留草稿并禁用发送。
6. 「内部备注」仅本人可见，按房间保留本次连接的最近 100 条，可复制、搜索和删除。备注不会进入群聊传输、公共消息缓存或房间共享链接；暂时离线仍可保存。切回「回复」后继续公共对话。
7. 星光按钮打开本地写作提示词工具，弹窗中的「草稿内容」可直接输入或编辑，默认带入当前消息草稿，空消息也可直接使用。选择润色、精简、正式语气或翻译后，下方只读预览自动更新，可复制完整提示词，也可进入已有 AI 工作台。弹窗编辑不会改动原消息草稿，不会调用模型、自动改写或发送草稿。
8. 房间详情包含「详情」「共享链接」「活动」。详情展示后端提供的介绍、累计加入人数、消息总数、创建时间和地址，以及从已加载公共消息中识别的参与者。共享链接取自已加载公共消息，最多 30 个安全链接；活动展示最近 8 条公共消息。累计人数和参与者均不代表在线人数。
9. 断开、关闭页面或切换项目账号/租户会清除连接、消息、备注、置顶和草稿，并撤销本次临时聊天会话。口令、令牌、消息和备注不写入 localStorage 或 sessionStorage。

页面不会自动登录外部服务。默认状态可查看布局和连接说明；真实房间与历史只在主动连接后加载。后台标签页被缓存时连接可以继续接收消息，实际观察到的后台消息计入本次连接的新消息数；这不是服务端未读统计。

## 复用的既有后端

默认 REST 地址仍为项目原有的 `https://match-chat-server-seven.vercel.app/api`。WebSocket 地址、域名、临时用户名和口令由会话接口返回，不在页面中重复写死。

| 接口                               | 用途                                |
| ---------------------------------- | ----------------------------------- |
| `POST /auth/login`                 | 获取 Chat Platform token 与当前用户 |
| `GET /rooms`                       | 可访问房间及真实统计                |
| `POST /rooms/:id/join`             | 幂等加入房间                        |
| `GET /rooms/:id/messages?limit=80` | 最近消息，上限 200，没有历史游标    |
| `POST /im/session`                 | 短期 XMPP 会话                      |
| `DELETE /im/session`               | 撤销本次临时会话                    |

消息使用既有 XMPP `groupchat` 纯文本协议，trim 后最多 4000 个 JS 字符。格式与引用以兼容纯文本的 Markdown 发送，前端安全显示，跳过原始 HTML；消息图片显示为链接，不自动加载远程图片。服务器回显持久化 id，并在 `urn:match-chat:meta` 中提供发送者与时间；前端按这个 id 合并实时和历史，不额外制造“已发送”气泡或已送达/已读回执。

加入房间等待自身 presence 110 确认，之后再读取历史；连接断开后使用仍有效的临时会话重连、重新加入房间并补拉历史。连接、加入与重连都有超时，临时会话到期会停止重连。

## 与加密实验室的区别

原 `/#/crypto` 的安全通信工具继续提供 AES 封包、WebSocket 与加密 XMPP 实验。独立聊天室兼容现有 Chat Platform 普通客户端，发送普通文本；如果历史中遇到严格匹配的 AES 封包，只显示「加密消息」占位，不尝试解密。被服务端移除的消息在模型层就清空原文，显示「消息已移除」。

现有后端不提供私聊、文件上传、文本生成、typing、完整在线名单或已读回执，因此附件使用链接分享，写作工具生成本地提示词。房间消息由既有聊天服务保存，前端仅在内存中维护最近记录、草稿和私密备注。私密备注使用独立数据结构与保存方法，不通过给群聊消息添加标志位来模拟私密消息。

## 路由与实现

`/chat` 沿用原加密实验室的 `crypto:read` 权限；默认普通用户原已可访问 `/crypto`，其演示路由白名单相应增加 `/chat`，其余角色不扩大原有权限。Enterprise 精简入口不会自动注册这个默认应用页面。

- `src/features/chatRoom/model.ts`：真实字段、删除/加密占位与消息合并。
- `api.ts`：有取消和响应体超时的 REST 请求、临时会话清理。
- `useChatRoomChannel.ts`：临时 SASL、MUC 确认、实时消息与有界重连。
- `useChatWorkspace.ts`：房间选择、历史、草稿、新消息和账号隔离。
- `composerModel.ts`、`MessageContent.tsx`：选区编辑、引用长度、安全链接与 Markdown 显示。
- `MessageComposer.tsx`、`WritingAssistant.tsx`：双模式输入、工具交互与本地提示词。
- `ChatRoomPage.tsx` 等组件：房间、消息、连接设置与详情界面。

相关协议依据来自本机既有 `match-chat-platform` 后端与客户端实现；本轮没有修改该外部仓库。

## 验证

```bash
pnpm run test:jest --runInBand --runTestsByPath src/features/chatRoom/model.test.ts src/features/chatRoom/composerModel.test.ts src/features/chatRoom/api.test.ts src/features/chatRoom/useChatRoomChannel.test.tsx src/features/chatRoom/useChatWorkspace.test.tsx
pnpm run test:e2e tests/e2e/chat-room.spec.ts tests/e2e/chat-composer.spec.ts
```

API 与 hook 测试使用可控 fetch/XMPP library；浏览器测试通过真实客户端协议模拟 framing、SASL、bind、MUC 确认与 groupchat echo，同时拦截所有聊天室 REST 请求。验证不向真实服务发送消息或创建测试会话。
