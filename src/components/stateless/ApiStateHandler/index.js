const ApiStateHandler = ({ loading, error, children }) => {
  if (error) {
    return 'Something went wrong. Please try again later'
  }
  return loading ? ' loading...' : children
}

export default ApiStateHandler
