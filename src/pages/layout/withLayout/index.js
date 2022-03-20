import React from 'react'

const WithLayout = (Element) => {
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

export default WithLayout

// const Home = () => {
//   return (
//       <h1>
//           I am Home!
//       </h1>
//   )
// }
// export default withLayout(Home)
