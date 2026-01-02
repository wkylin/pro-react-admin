import React from 'react'
import { motion } from 'framer-motion'
import { Button, theme } from 'antd'
import {
  RightOutlined,
  GithubOutlined,
  ThunderboltOutlined,
  AppstoreOutlined,
  CodeOutlined,
  GlobalOutlined,
  BuildOutlined,
  ApiOutlined,
} from '@ant-design/icons'

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  const { token } = theme.useToken()
  const isDark = token.mode === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        isDark ? 'border-[#333] bg-[#1e1e20] hover:border-[#646cff]' : 'border-gray-100 bg-white hover:border-[#646cff]'
      }`}
    >
      <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-[#646cff]/10 p-3 text-[#646cff]">
        <Icon style={{ fontSize: 24 }} />
      </div>
      <h3 className={`mb-2 text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
    </motion.div>
  )
}

const ViteLanding = () => {
  const { token } = theme.useToken()
  const isDark = token.mode === 'dark'

  const features = [
    {
      icon: ThunderboltOutlined,
      title: 'Instant Server Start',
      description: 'On demand file serving over native ESM, no bundling required!',
    },
    {
      icon: AppstoreOutlined,
      title: 'Lightning Fast HMR',
      description: 'Hot Module Replacement (HMR) that stays fast regardless of app size.',
    },
    {
      icon: BuildOutlined,
      title: 'Rich Features',
      description: 'Out-of-the-box support for TypeScript, JSX, CSS and more.',
    },
    {
      icon: ApiOutlined,
      title: 'Optimized Build',
      description: 'Pre-configured Rollup build with multi-page and library mode support.',
    },
    {
      icon: GlobalOutlined,
      title: 'Universal Plugins',
      description: 'Rollup-superset plugin interface shared between dev and build.',
    },
    {
      icon: CodeOutlined,
      title: 'Fully Typed APIs',
      description: 'Flexible programmatic APIs with full TypeScript typing.',
    },
  ]

  return (
    <div className={`min-h-full w-full overflow-hidden ${isDark ? 'bg-[#1b1b1f]' : 'bg-white'}`}>
      {/* Background Gradients */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-[#646cff] opacity-20 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-[#bd34fe] opacity-20 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Hero Section */}
        <div className="mb-24 text-center lg:flex lg:items-center lg:justify-between lg:text-left">
          <div className="lg:w-1/2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="bg-gradient-to-br from-[#41d1ff] to-[#bd34fe] bg-clip-text text-transparent">
                Next Generation
              </span>
              <br />
              <span className={isDark ? 'text-white' : 'text-[#213547]'}>Frontend Tooling</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`mx-auto mt-4 max-w-2xl text-xl sm:text-2xl lg:mx-0 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              Get ready for a development environment that can finally keep up with you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              <Button
                type="primary"
                size="large"
                shape="round"
                className="h-12 border-none bg-[#646cff] px-8 text-lg font-medium hover:bg-[#747bff]"
                icon={<RightOutlined />}
              >
                Get Started
              </Button>
              <Button
                size="large"
                shape="round"
                className={`h-12 px-8 text-lg font-medium ${isDark ? 'border-[#444] bg-[#333] text-white hover:bg-[#444]' : 'border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                icon={<GithubOutlined />}
              >
                View on GitHub
              </Button>
            </motion.div>
          </div>

          {/* Hero Image / Logo Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block lg:w-1/2"
          >
            <div className="relative mx-auto h-[400px] w-[400px]">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-[#41d1ff] to-[#bd34fe] opacity-30 blur-3xl"
              />
              <motion.div
                className="relative z-10 flex h-full w-full items-center justify-center rounded-[3rem] bg-gradient-to-br from-[#646cff] to-[#bd34fe] shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ThunderboltOutlined style={{ fontSize: 160, color: 'white' }} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={0.2 + index * 0.1} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ViteLanding
