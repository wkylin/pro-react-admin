import React from 'react'
import MermaidHooks from '@stateful/mermaidHooks'
import FixTabPanel from '@stateless/FixTabPanel'
import MarkmapHooks from '@stateful/markmap'

const gitChart = `gitGraph
  commit
  commit
  branch develop
  commit
  commit
  commit
  checkout main
  commit
  commit
`
const initMarkup = `# 登录注册模块功能页面结构图

- 登录页面
  - 输入用户名
  - 输入密码
  - 登录按钮
  - 忘记密码链接
  - 注册链接

- 注册页面
  - 输入用户名
  - 输入密码
  - 确认密码
  - 注册按钮
  - 返回登录链接

- 忘记密码页面
  - 输入注册邮箱
  - 发送重置密码链接按钮
  - 返回登录链接

- 重置密码页面
  - 输入新密码
  - 确认新密码
  - 重置密码按钮
  - 返回登录链接

`

const Mermaid = () => (
  <>
    <FixTabPanel>
      <h2>Meraid: http://https://mermaid.js.org/</h2>

      <h3>演示1:Git Diagram </h3>
      <MermaidHooks chart={gitChart} />

      <h3> 演示2: Markmap</h3>
      <section>
        <MarkmapHooks markmap={initMarkup} />
      </section>
    </FixTabPanel>
  </>
)

export default Mermaid
