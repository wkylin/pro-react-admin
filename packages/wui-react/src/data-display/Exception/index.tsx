import { Result, type ResultProps } from 'antd'
import type { ReactNode } from 'react'
export interface ExceptionProps extends Omit<ResultProps, 'extra'> {
  action?: ReactNode
  children?: ReactNode
}
export const ExceptionView = ({ action, children, ...props }: ExceptionProps) => (
  <Result {...props} extra={action}>
    {children}
  </Result>
)
export const Exception401 = (props: ExceptionProps) => <ExceptionView status="403" title="401" {...props} />
export const Exception403 = (props: ExceptionProps) => <ExceptionView status="403" title="403" {...props} />
export const Exception404 = (props: ExceptionProps) => <ExceptionView status="404" title="404" {...props} />
export const Exception500 = (props: ExceptionProps) => <ExceptionView status="500" title="500" {...props} />
const Exception = { Exception401, Exception403, Exception404, Exception500 }
export default Exception
