import AnimatedIcon from '@stateless/AnimatedIcon'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { CheckCircle, Circle } from 'lucide-react'
import { Button, Card, theme } from 'antd'
import { useStore } from '@/store'
import { useProThemeContext } from '@/theme/hooks'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const { useToken } = theme

const defaultSteps = [
  { label: 'Introduction' },
  {
    label: 'Personal Information',
    fields: [
      { name: 'name', type: 'text', placeholder: 'Name' },
      { name: 'email', type: 'email', placeholder: 'Email' },
    ],
  },
  {
    label: 'Address Details',
    fields: [
      { name: 'address', type: 'text', placeholder: 'Address' },
      { name: 'city', type: 'text', placeholder: 'City' },
      { name: 'country', type: 'text', placeholder: 'Country' },
    ],
  },
  { label: 'Review & Submit' },
]

const StepIndicator = ({ currentStep, steps }) => {
  const { themeSettings } = useProThemeContext()
  const isMobile = useStore((s) => s.isMobile)
  const isDark = themeSettings.themeMode === 'dark'

  // 增强蓝色对比度
  const activeColor = isDark ? '#40a9ff' : '#0958d9' // 更深的蓝色
  const activeTextColor = '#ffffff'
  const inactiveBgColor = isDark ? '#262626' : '#f5f5f5'
  const inactiveTextColor = isDark ? '#8c8c8c' : '#bfbfbf'

  return (
    <div className="relative w-full">
      {isMobile ? (
        // 移动端垂直布局
        <div className="flex flex-col space-y-4">
          {steps.map((step, index) => (
            <div key={step.label} className="flex items-center space-x-3">
              <motion.div
                className={clsx(
                  'flex size-8 items-center justify-center rounded-full border-2 transition-all duration-300',
                  index <= currentStep ? 'border-transparent shadow-lg' : 'border-gray-300 dark:border-gray-600'
                )}
                animate={{ scale: index === currentStep ? 1.1 : 1 }}
                style={{
                  backgroundColor: index <= currentStep ? activeColor : inactiveBgColor,
                  color: index <= currentStep ? activeTextColor : inactiveTextColor,
                  borderColor: index <= currentStep ? activeColor : undefined,
                  boxShadow: index <= currentStep ? `0 4px 12px ${activeColor}40` : undefined,
                }}
              >
                {index < currentStep ? (
                  <AnimatedIcon variant="spin" mode="hover">
                    <CheckCircle size={16} />
                  </AnimatedIcon>
                ) : (
                  <AnimatedIcon variant="spin" mode="hover">
                    <Circle size={16} fill="currentColor" />
                  </AnimatedIcon>
                )}
              </motion.div>
              <div className="flex-1">
                <div
                  className={clsx(
                    'text-sm font-medium transition-colors duration-300',
                    index <= currentStep ? '' : 'text-gray-500 dark:text-gray-400'
                  )}
                  style={{
                    color: index <= currentStep ? activeColor : undefined,
                  }}
                >
                  {step.label}
                </div>
                {index === currentStep && (
                  <div className="mt-1 text-xs" style={{ color: activeColor }}>
                    当前步骤
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 桌面端水平布局
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center">
                <motion.div
                  className={clsx(
                    'flex size-8 items-center justify-center rounded-full border-2 transition-all duration-300',
                    index <= currentStep ? 'border-transparent shadow-lg' : 'border-gray-300 dark:border-gray-600'
                  )}
                  animate={{ scale: index === currentStep ? 1.1 : 1 }}
                  style={{
                    backgroundColor: index <= currentStep ? activeColor : inactiveBgColor,
                    color: index <= currentStep ? activeTextColor : inactiveTextColor,
                    borderColor: index <= currentStep ? activeColor : undefined,
                    boxShadow: index <= currentStep ? `0 4px 12px ${activeColor}40` : undefined,
                  }}
                >
                  {index < currentStep ? (
                    <AnimatedIcon variant="spin" mode="hover">
                      <CheckCircle size={16} />
                    </AnimatedIcon>
                  ) : (
                    <AnimatedIcon variant="spin" mode="hover">
                      <Circle size={16} fill="currentColor" />
                    </AnimatedIcon>
                  )}
                </motion.div>
                <div
                  className={clsx(
                    'mt-2 text-center text-xs font-medium transition-colors duration-300',
                    index <= currentStep ? '' : 'text-gray-500 dark:text-gray-400'
                  )}
                  style={{
                    color: index <= currentStep ? activeColor : undefined,
                  }}
                >
                  {step.label}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="relative mx-4 flex-grow">
                  <div
                    className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full"
                    style={{ backgroundColor: inactiveBgColor }}
                  />
                  <motion.div
                    className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full"
                    style={{
                      backgroundColor: activeColor,
                      boxShadow: `0 0 8px ${activeColor}60`,
                    }}
                    initial={{ width: '0%' }}
                    animate={{
                      width: index < currentStep ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

StepIndicator.propTypes = {
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
}

const StepContent = ({ step }) => {
  const { themeSettings } = useProThemeContext()
  const { token } = useToken()
  const isDark = themeSettings.themeMode === 'dark'

  return (
    <Card
      className="my-6 min-h-[200px] w-full transition-all duration-300"
      style={{
        backgroundColor: isDark ? token.colorBgContainer : token.colorBgLayout,
        borderColor: token.colorBorderSecondary,
        boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="flex items-center justify-center p-6 text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-medium transition-colors duration-300" style={{ color: token.colorTextHeading }}>
            {step.label}
          </h3>
          <p className="text-sm transition-colors duration-300" style={{ color: token.colorTextSecondary }}>
            Step content for {step.label}
          </p>
          {step.fields && (
            <div className="mt-4 space-y-2">
              {step.fields.map((field) => (
                <div key={field.name}>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full rounded-md border px-3 py-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    style={{
                      backgroundColor: token.colorBgContainer,
                      borderColor: token.colorBorder,
                      color: token.colorText,
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

StepContent.propTypes = {
  step: PropTypes.object.isRequired,
}

const NavigationButtons = ({ currentStep, totalSteps, handlePrev, handleNext }) => {
  const { themeSettings } = useProThemeContext()
  const { token } = useToken()
  const isMobile = useStore((s) => s.isMobile)
  const isDark = themeSettings.themeMode === 'dark'

  const primaryColor = isDark ? '#40a9ff' : '#0958d9'
  const secondaryBg = isDark ? token.colorBgContainer : '#f8f9fa'
  const secondaryBorder = isDark ? token.colorBorder : '#d9d9d9'
  const secondaryText = isDark ? token.colorTextSecondary : '#666666'

  return (
    <div className={clsx('flex gap-3', isMobile ? 'flex-col' : 'justify-between')}>
      <Button
        disabled={currentStep === 0}
        onClick={handlePrev}
        className="transition-all duration-200 hover:shadow-md"
        style={{
          visibility: currentStep === 0 ? 'hidden' : 'visible',
          backgroundColor: secondaryBg,
          borderColor: secondaryBorder,
          color: secondaryText,
        }}
      >
        Previous
      </Button>

      <Button
        type="primary"
        disabled={currentStep === totalSteps - 1}
        onClick={handleNext}
        className="font-medium transition-all duration-200 hover:shadow-lg"
        style={{
          visibility: currentStep === totalSteps - 1 ? 'hidden' : 'visible',
          backgroundColor: primaryColor,
          borderColor: primaryColor,
          boxShadow: `0 2px 8px ${primaryColor}30`,
        }}
      >
        Next
      </Button>
    </div>
  )
}

NavigationButtons.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
}

const DottedStepper = ({ steps = defaultSteps, className }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const { token } = useToken()

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div className={clsx('mx-auto w-full max-w-3xl p-4 md:p-6', className)} style={{ color: token.colorText }}>
      <StepIndicator currentStep={currentStep} steps={steps} />
      <StepContent step={steps[currentStep]} />
      <NavigationButtons
        currentStep={currentStep}
        handleNext={handleNext}
        handlePrev={handlePrev}
        totalSteps={steps.length}
      />
    </div>
  )
}

export default DottedStepper

DottedStepper.propTypes = {
  steps: PropTypes.array,
  className: PropTypes.string,
}
