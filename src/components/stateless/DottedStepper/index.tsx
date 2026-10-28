import DottedStepper, { type DottedStepperProps } from '@wui/forms/DottedStepper'
import { useProThemeContext } from '@/theme/hooks'
const steps = [
  { label: 'Introduction' },
  {
    label: 'Personal Information',
    fields: [
      { name: 'name', type: 'text' as const, placeholder: 'Name' },
      { name: 'email', type: 'email' as const, placeholder: 'Email' },
    ],
  },
  {
    label: 'Address Details',
    fields: [
      { name: 'address', type: 'text' as const, placeholder: 'Address' },
      { name: 'city', type: 'text' as const, placeholder: 'City' },
      { name: 'country', type: 'text' as const, placeholder: 'Country' },
    ],
  },
  { label: 'Review & Submit' },
]
export default function AppDottedStepper(props: DottedStepperProps) {
  const { resolvedTheme } = useProThemeContext()
  return <DottedStepper steps={steps} theme={resolvedTheme === 'dark' ? 'dark' : 'light'} {...props} />
}
export type { DottedStepperProps } from '@wui/forms/DottedStepper'
