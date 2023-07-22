import React, { useRef, useEffect } from 'react'
import { Transformer } from 'markmap-lib'
import { Markmap } from 'markmap-view'

const transformer = new Transformer()
const initValue = `# 登录注册模块功能页面结构图

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
const MarkmapHooks = ({ markmap }) => {
  const refSvg = useRef()
  const refMm = useRef()

  useEffect(() => {
    const mm = Markmap.create(refSvg.current)
    refMm.current = mm
    return () => {
      mm.destroy()
    }
  }, [])

  useEffect(() => {
    const mm = refMm.currentdsds
    // if (!mm) return
    // const { root } = transformer.transform(markmap)
    const { root } = transformer.transform(initValue)
    mm.setData(root)
    mm.fit()
  }, [refMm.current, markmap])

  return (
    <>
      <svg style={{ width: '100%', minHeight: 400 }} ref={refSvg} />
    </>
  )
}

export default MarkmapHooks
