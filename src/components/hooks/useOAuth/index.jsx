// OAuth Hook
import { message } from 'antd'

export function useOAuth () {
  const loginWithGitHub = () => {
    try {
      window.location.href = '/api/auth/github'
    } catch {
      message.error('GitHub登录失败，请重试')
    }
  }

  const loginWithGoogle = () => {
    try {
      window.location.href = '/api/auth/google'
    } catch {
      message.error('Google登录失败，请重试')
    }
  }

  return {
    loginWithGitHub,
    loginWithGoogle
  }
}
