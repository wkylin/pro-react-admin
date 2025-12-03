import React from 'react'

function withErrorHandling (Component) {
  return function WithErrorHandling ({ error, ...props }) {
    if (error) {
      return <div>Error: {error.message}</div>
    }
    return <Component {...props} />
  }
}

export default withErrorHandling

// const ListWithLoading = withLoading(List);
// const ListWithErrorHandling = withErrorHandling(ListWithLoading);
// function withLogging(WrappedComponent) {
//   return function Wrapped(props) {
//     console.log('Component Rendered');
//     return <WrappedComponent {...props} />;
//   };
// }

// const MyComponentWithLogging = withLogging(MyComponent);
