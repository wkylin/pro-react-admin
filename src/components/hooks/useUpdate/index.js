import React from 'react'
const useUpdate = () => {
  const [, update] = React.useReducer(() => ({}))
  return update
}

export default useUpdate

// const MyApp = () => {
//   const update = useUpdate();
//   return (
//     <>
//       <div>Time: {Date.now()}</div>
//       <button onClick={update}>Update</button>
//     </>
//   );
// };
