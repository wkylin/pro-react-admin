import { useState } from 'react'

/** Keep login controls read-only until focus so Chromium does not classify
 * the tenant field as the username while filling saved credentials on load.
 */
export function useCredentialAutofillGuard<Field extends string>() {
  const [activeField, setActiveField] = useState<Field | null>(null)

  return (field: Field) => ({
    readOnly: activeField !== field,
    onFocus: () => setActiveField(field),
    onBlur: () => setActiveField((active) => (active === field ? null : active)),
  })
}
