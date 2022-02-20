import React from 'react'
import { Button } from 'antd'
import { ErrorBoundary } from 'react-error-boundary'
import styles from './index.module.less'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <h3>Something went wrong:</h3>
      <pre className={styles.pre}>{error.message}</pre>
      <Button type="primary" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  )
}

const MyErrorBoundary = (props) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        props.fixError && props.fixError()
      }}
    >
      {props.children}
    </ErrorBoundary>
  )
}

export default MyErrorBoundary
