import { Button } from 'antd'
import { Exception403 } from '@wui/data-display/Exception'
import useSafeNavigate from '@platform/navigation/useSafeNavigate'
import FixTabPanel from '@shared/ui/FixTabPanel'
export default function Forbidden() {
  const { redirectTo } = useSafeNavigate()
  return (
    <FixTabPanel>
      <Exception403
        subTitle="Sorry, you are not authorized to access this page."
        action={
          <Button type="primary" ghost onClick={() => redirectTo('/')}>
            去首页
          </Button>
        }
      />
    </FixTabPanel>
  )
}
