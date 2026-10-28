import { Sandpack, type SandpackProps } from '@codesandbox/sandpack-react'
export type SandpackBasicProps = SandpackProps
/** Supply files to replace Sandpack's template defaults. */
export default function SandpackBasic(props: SandpackBasicProps) {
  return <Sandpack {...props} />
}
