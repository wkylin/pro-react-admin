import React from 'react'

const withLayout = (Element) => {
  const element = (props) => (
    <>
      {/* <Navbar /> */}
      {/* <Sidebar /> */}
      <Element {...props} />
      {/* <Footer /> */}
    </>
  )
  return element
}

export default withLayout

// const Home = () => {
//   return (
//       <h1>
//           I am Home!
//       </h1>
//   )
// }
// export default withLayout(Home)
