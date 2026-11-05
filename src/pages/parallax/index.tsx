import pageStyles from '@shared/styles/pageContent.module.less'
import React from 'react'
import FixTabPanel from '@shared/ui/FixTabPanel'

const ParallaxVert = () => (
  <FixTabPanel fill={false}>
    <div className={pageStyles.content}>
      <h2>Hi, React Spring</h2>
      {/* <Toggle /> */}
    </div>
  </FixTabPanel>
)

export default ParallaxVert
