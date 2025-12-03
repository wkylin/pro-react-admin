import React, { useState } from 'react'
import { motion } from 'motion/react'
import { CheckCircle, Circle } from 'lucide-react'
import clsx from 'clsx'

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

const StepIndicator = ({ currentStep, steps }) => (
  <div className="relative w-full">
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={step.label}>
          <div className="flex flex-col items-center">
            <motion.div
              className={clsx(
                'z-10 flex size-8 items-center justify-center rounded-full transition-all duration-300',
                index <= currentStep
                  ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-900/20 dark:bg-neutral-100 dark:text-neutral-900 dark:shadow-neutral-100/20'
                  : 'bg-neutral-200 text-neutral-400 dark:border dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-500'
              )}
              animate={{ scale: index === currentStep ? 1.1 : 1 }}
            >
              {index < currentStep ? <CheckCircle size={16} /> : <Circle size={16} fill="currentColor" />}
            </motion.div>
          </div>
          {index < steps.length - 1 && (
            <div className="relative mx-2 flex-grow">
              <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-neutral-200 dark:bg-neutral-800" />
              <motion.div
                className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-neutral-900 dark:bg-neutral-100"
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
  </div>
)

const StepContent = ({ step }) => {
  return (
    <div className="my-6 flex min-h-[200px] w-full items-center justify-center rounded-xl border border-neutral-200 bg-white/50 p-6 text-center backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/30">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">{step.label}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Step content for {step.label}</p>
      </div>
    </div>
  )
}

const ButtonClasses =
  'rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed'

const NavigationButtons = ({ currentStep, totalSteps, handlePrev, handleNext }) => (
  <div className="flex justify-between gap-3">
    <button
      className={clsx(ButtonClasses, currentStep === 0 && 'invisible')}
      disabled={currentStep === 0}
      onClick={handlePrev}
    >
      Previous
    </button>

    <button
      className={clsx(ButtonClasses, currentStep === totalSteps - 1 && 'invisible')}
      disabled={currentStep === totalSteps - 1}
      onClick={handleNext}
    >
      Next
    </button>
  </div>
)

const DottedStepper = ({ steps = defaultSteps }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-4 md:p-6">
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
