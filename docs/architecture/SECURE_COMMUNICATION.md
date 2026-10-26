# 安全通信实验室

## 技术来源与项目边界

`sport-demo/apps/web` 使用 Web Crypto / `jose` JWE 加密 HTTP 与 WebSocket 传输，实时数据可走原生 WebSocket 或 STOMP，聊天使用 `@xmpp/client` 的 XMPP over WebSocket、SASL 和 XML stanza。那些协议与密钥服务由它自己的服务端配合完成。

本项目在现有 `/crypto` 页面增加“安全通信”页签，使用这些技术实现通用消息实验工具。没有引入体育数据、聊天房间或其他业务对象，也没有复用 `sport-demo` 的私有 JWE wire format。项目原有 `Request.js` AES/RSA/HYBRID 协议和企业资源失效事件 WebSocket 保持原样；它们不能直接解密这里的消息封包。

## 本页的消息协议

- 浏览器 `crypto.subtle` 使用 256 位 AES-GCM 密钥、每条消息独立的 96 位随机 IV，以及固定的版本化关联数据。
- 封包为 `{ "version": 1, "algorithm": "AES-GCM-256", "iv": "...", "ciphertext": "..." }`。IV 和密文使用 Base64URL。解密会验证 GCM 标签；密钥不匹配或密文被修改都会失败。
- WebSocket 直接发送这个 JSON 文本帧。服务端需回显或转发封包，不能把它当作 `Request.js` 加密请求处理。
- 通用 XMPP 直连使用 `@xmpp/client` 连接 XMPP WebSocket 服务，标准 `chat` message stanza 的 `body` 存放同一 JSON 封包。服务端仍需正常完成 XMPP 认证与路由。
- Chat Platform 示例服务通过 REST 登录并申请临时 XMPP 凭据，连接服务端返回的 WebSocket 地址后，以 MUC `presence` 加入房间，使用 `groupchat` message stanza 发送同一 JSON 封包。示例服务只提供群聊路由，不提供通用点对点 `chat` 路由。
- 一条消息的原文最多 4096 字节，接收封包最多 12000 字符，页面只显示最近 40 条消息。

## 使用

1. 在 `/crypto` →“安全通信”生成或粘贴会话密钥；可先在本地加密、解密验证。
2. WebSocket：输入 `wss://` 服务地址并连接。仅当页面和目标都是本机时允许 `ws://`。服务端须转发或回显收到的文本帧。
3. XMPP →“Chat Platform 示例服务”：生成会话密钥，使用示例账号 `guest` / `guest123!`，或输入自己的账号登录。页面请求 `POST /api/auth/login`、`GET /api/rooms`、`POST /api/im/session`，由返回值获取 JID、WebSocket 地址和短期 SASL 凭据；选房间后发送密文。断开时请求 `DELETE /api/im/session` 撤销本次临时会话。默认 API 地址是 `https://match-chat-server-seven.vercel.app/api`，可替换为自行部署的实例。
4. XMPP →“通用 XMPP 直连”：输入服务端 WebSocket 地址、账号 JID 和口令，连接后输入接收方 JID 并发送。接收方需要相同会话密钥及兼容的封包处理。

页面不会把密钥、口令和消息写入浏览器存储。切换传输页签或离开页面会销毁对应连接。WebSocket 最多自动重试三次；Chat Platform 的临时会话有效时，XMPP 断线会自动重连并重新加入房间；通用 XMPP 直连失败后由用户重新连接。URL 中的用户信息、查询参数和片段会被拒绝，避免将凭据放进连接地址。

Chat Platform 的 [GitHub Pages 入口](https://wkylin.github.io/chat-platform/) 仅托管静态页面；其 [服务端](https://match-chat-server-seven.vercel.app/api/health) 独立部署。公开演示账号是共享账号，其他在线用户可看到房间中的密文和元数据，只有持有相同会话密钥的页面才能显示原文。本页不读取该平台的历史消息，也不会把用户密码、API 令牌、临时 XMPP 凭据或会话密钥写入浏览器存储。

本功能本身仍是客户端工具，不提供 WebSocket 转发器或 XMPP 服务端。生产环境仍需 TLS、服务端认证和授权、密钥分发与轮换，以及消息重放策略。共享会话密钥本身不提供发送方身份认证；不要将实验室密钥当成长期业务密钥。
