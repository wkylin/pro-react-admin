/** Keep the WebGL renderer out of the initial reader bundle. */
export function loadHardcoverEngine() {
  return import('./HardcoverScene')
}
