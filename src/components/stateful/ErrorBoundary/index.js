import React from 'react'
import { Button, Space } from 'antd'

// https://github.com/bvaughn/react-error-boundary

class ErrorBoundary extends React.Component {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo })
  }

  triggerError = ({ error, errorInfo }) => {
    console.log({ error, errorInfo })
    this.setState({ hasError: true })
  }

  resetError = () => this.setState({ hasError: false })
  render() {
    if (this.state.hasError) {
      return (
        <div>
          {/* <h1>Oops, we done goofed up</h1> */}
          <Space>
            <span>哎呀，我们搞砸了!!!</span>
            <Button onClick={this.resetError}>Try again?</Button>
          </Space>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
