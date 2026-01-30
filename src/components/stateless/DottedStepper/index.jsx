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

const StepIndicator = ({
  currentStep,
  steps,
  activeColor: propActiveColor,
  inactiveBgColor: propInactiveBgColor,
  circleSize = 44,
  gradientColors = ['#ff7a18', '#af002d', '#319197'],
  showPercent = true,
}) => {
  const { themeSettings } = useProThemeContext()
  const isMobile = useStore((s) => s.isMobile)
  const isDark = themeSettings.themeMode === 'dark'

  // 允许外部传入颜色；否则基于 theme 决定默认颜色
  const activeColor = propActiveColor || (isDark ? '#40a9ff' : '#0958d9')
  const activeTextColor = '#ffffff'
  const inactiveBgColor = propInactiveBgColor || (isDark ? '#262626' : '#f5f5f5')
  const inactiveTextColor = isDark ? '#8c8c8c' : '#bfbfbf'

  const desktopSize = circleSize
  const mobileSize = Math.max(Math.round(circleSize * 0.82), 32)

  const progressPercent = Math.round((currentStep / Math.max(1, steps.length - 1)) * 100)

  return (
    <div className="relative w-full">
      {isMobile ? (
        // 移动端垂直布局
        <div className="flex flex-col space-y-4">
          {steps.map((step, index) => (
            <div key={step.label} className="flex items-center space-x-3">
              <motion.div
                className={clsx(
                  'flex items-center justify-center rounded-full border-2 transition-all duration-300',
                  index <= currentStep ? 'border-transparent shadow-lg' : 'border-gray-300 dark:border-gray-600'
                )}
                animate={{ scale: index === currentStep ? 1.06 : 1 }}
                style={{
                  width: mobileSize,
                  height: mobileSize,
                  minWidth: mobileSize,
                  minHeight: mobileSize,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                {index === currentStep && showPercent && (
                  <div className="mt-1 text-xs font-semibold" style={{ color: activeColor }}>
                    {progressPercent}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 桌面端水平布局（居中、限制标签宽度、优化连线）
        <div className="flex w-full justify-center" style={{ marginBottom: 12 }}>
          <div className="flex w-full max-w-3xl items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center" style={{ flex: '0 0 140px', minWidth: 80 }}>
                  <motion.div
                    className={clsx(
                      'flex items-center justify-center rounded-full border-2 transition-all duration-300',
                      index <= currentStep ? 'border-transparent shadow-lg' : 'border-gray-300 dark:border-gray-600'
                    )}
                    animate={{ scale: index === currentStep ? 1.06 : 1 }}
                    style={{
                      width: desktopSize,
                      height: desktopSize,
                      minWidth: desktopSize,
                      minHeight: desktopSize,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: index <= currentStep ? activeColor : inactiveBgColor,
                      color: index <= currentStep ? activeTextColor : inactiveTextColor,
                      borderColor: index <= currentStep ? activeColor : undefined,
                      boxShadow: index <= currentStep ? `0 6px 18px ${activeColor}30` : undefined,
                      zIndex: 10,
                    }}
                  >
                    {index < currentStep ? (
                      <AnimatedIcon variant="spin" mode="hover">
                        <CheckCircle size={18} />
                      </AnimatedIcon>
                    ) : (
                      <AnimatedIcon variant="spin" mode="hover">
                        <Circle size={18} fill="currentColor" />
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
                      maxWidth: 120,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                    title={step.label}
                  >
                    {step.label}
                  </div>

                  {index === currentStep && showPercent && (
                    <div className="mt-1 text-xs font-semibold" style={{ color: activeColor }}>
                      {progressPercent}%
                    </div>
                  )}
                </div>

                {index < steps.length - 1 && (
                  <div className="relative flex-1 px-2" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="h-1 w-full rounded-full" style={{ backgroundColor: inactiveBgColor, zIndex: 0 }} />
                    <motion.div
                      className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${gradientColors.join(',')})`,
                        backgroundSize: '200% 100%',
                        boxShadow: `0 0 8px ${activeColor}60`,
                        zIndex: 1,
                      }}
                      initial={{
                        width: index < currentStep ? '100%' : index === currentStep ? '40%' : '0%',
                        backgroundPosition: '0% 0%',
                      }}
                      animate={{
                        width: index < currentStep ? '100%' : index === currentStep ? '40%' : '0%',
                        backgroundPosition: index < currentStep ? ['0% 0%', '100% 0%'] : '0% 0%',
                      }}
                      transition={{
                        duration: 0.5,
                        ease: 'easeInOut',
                        backgroundPosition:
                          index < currentStep ? { repeat: Infinity, duration: 3, ease: 'linear' } : undefined,
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

StepIndicator.propTypes = {
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  activeColor: PropTypes.string,
  inactiveBgColor: PropTypes.string,
  circleSize: PropTypes.number,
  gradientColors: PropTypes.array,
  showPercent: PropTypes.bool,
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

const NavigationButtons = ({ currentStep, totalSteps, handlePrev, handleNext, primaryColor: primaryColorProp }) => {
  const { themeSettings } = useProThemeContext()
  const { token } = useToken()
  const isMobile = useStore((s) => s.isMobile)
  const isDark = themeSettings.themeMode === 'dark'

  const primaryColor = primaryColorProp || (isDark ? '#40a9ff' : '#0958d9')
  const secondaryBg = isDark ? token.colorBgContainer : '#f8f9fa'
  const secondaryBorder = isDark ? token.colorBorder : '#d9d9d9'
  const secondaryText = isDark ? token.colorTextSecondary : '#666666'

  return (
    <div className={clsx('flex gap-3', isMobile ? 'flex-col' : 'justify-between')} style={{ marginTop: 16 }}>
      <Button
        disabled={currentStep === 0}
        onClick={handlePrev}
        className="transition-all duration-200 hover:shadow-md"
        style={{
          display: currentStep === 0 ? 'none' : 'inline-flex',
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
          display: currentStep === totalSteps - 1 ? 'none' : 'inline-flex',
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
  primaryColor: PropTypes.string,
}

const DottedStepper = ({
  steps = defaultSteps,
  className,
  activeColor,
  inactiveBgColor,
  circleSize = 44,
  gradientColors = ['#ff7a18', '#af002d', '#319197'],
  showPercent = true,
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const { token } = useToken()

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div
      className={clsx('mx-auto w-full max-w-2xl p-6 md:max-w-3xl md:p-8', className)}
      style={{ color: token.colorText }}
    >
      <StepIndicator
        currentStep={currentStep}
        steps={steps}
        activeColor={activeColor}
        inactiveBgColor={inactiveBgColor}
        circleSize={circleSize}
        gradientColors={gradientColors}
        showPercent={showPercent}
      />
      <StepContent step={steps[currentStep]} />
      <NavigationButtons
        currentStep={currentStep}
        handleNext={handleNext}
        handlePrev={handlePrev}
        totalSteps={steps.length}
        primaryColor={activeColor}
      />
    </div>
  )
}

export default DottedStepper

DottedStepper.propTypes = {
  steps: PropTypes.array,
  className: PropTypes.string,
  activeColor: PropTypes.string,
  inactiveBgColor: PropTypes.string,
  circleSize: PropTypes.number,
  gradientColors: PropTypes.array,
  showPercent: PropTypes.bool,
}

DottedStepper.defaultProps = {
  activeColor: undefined,
  inactiveBgColor: undefined,
  circleSize: 44,
  gradientColors: ['#ff7a18', '#af002d', '#319197'],
  showPercent: true,
}
