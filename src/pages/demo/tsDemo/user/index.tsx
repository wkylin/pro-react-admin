import React from 'react'
// import Icon from '@ant-design/icons'
// import LightSvg from '@assets/svg/light.svg'

interface UserInterface {
  name: string
  age: number
  address: string
  dob: Date
}

const UserDemo: React.FC<{ user: UserInterface }> = ({ user }) => (
  <>
    <div>{user.name}</div>
    <div>{user.age}</div>
    <div>{user.address}</div>
    <div>{user.dob.toDateString()}</div>
    {/* <Icon component={LightSvg} /> */}
  </>
)

export default UserDemo
