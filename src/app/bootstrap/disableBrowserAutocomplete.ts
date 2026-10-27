const controls = 'form, input:not([type="hidden"]), textarea, select'

const preventsSavedPasswordFill = (element: Element) => element.getAttribute('autocomplete') === 'new-password'

const disableAutocomplete = (root: Element) => {
  if (root.matches(controls) && root.getAttribute('autocomplete') !== 'off' && !preventsSavedPasswordFill(root)) {
    root.setAttribute('autocomplete', 'off')
  }

  root.querySelectorAll(controls).forEach((control) => {
    if (control.getAttribute('autocomplete') !== 'off' && !preventsSavedPasswordFill(control)) {
      control.setAttribute('autocomplete', 'off')
    }
  })
}

let observers = 0
let observer: MutationObserver | undefined

/** Request autocomplete off for dynamic forms, including portals.
 * Preserve new-password fields so Chrome does not fill saved credentials into account creation forms.
 * Chrome may still fill saved sign-in credentials despite this hint.
 */
export function disableBrowserAutocomplete() {
  if (observers === 0) {
    observer = new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.type === 'attributes') {
          disableAutocomplete(record.target as Element)
          return
        }

        record.addedNodes.forEach((node) => {
          if (node instanceof Element) disableAutocomplete(node)
        })
      })
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['autocomplete'],
      childList: true,
      subtree: true,
    })
    disableAutocomplete(document.documentElement)
  }

  observers += 1
  let stopped = false
  return () => {
    if (stopped) return
    stopped = true
    observers -= 1
    if (observers === 0) {
      observer?.disconnect()
      observer = undefined
    }
  }
}
