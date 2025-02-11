import React, { useRef } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'

const Profile = () => {
  const scrollRef = useRef(null)
  return <FixTabPanel ref={scrollRef}>Profile</FixTabPanel>
}

export default Profile
