import AnimatedIcon from '../../AnimatedIcon'
import type { HTMLAttributes } from 'react'
export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
}
import { Spin } from 'antd'
import { LoaderCircle } from 'lucide-react'

const antIcon = (
  <AnimatedIcon variant="spin" mode="auto">
    <LoaderCircle size={24} />
  </AnimatedIcon>
)
const Loading = ({ style = {}, label = 'Loading', ...props }: LoadingProps) => (
  <div
    {...props}
    role="status"
    aria-label={label}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      ...style,
    }}
  >
    <Spin indicator={antIcon} />
  </div>
)

export default Loading
