declare module '*.png' {
  const value: any
  export = value
}
declare module '*.svg' {
  import type { FunctionComponent, SVGProps } from 'react'

  export const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>
  const src: string
  export default src
}
declare module '*.jpg' {
  const value: any
  export = value
}
declare module '*.jpeg' {
  const value: any
  export = value
}
declare module '*.gif' {
  const value: any
  export = value
}
declare module '*.bmp' {
  const value: any
  export = value
}
declare module '*.webp' {
  const value: string
  export default value
}
declare module '*.avif' {
  const value: string
  export default value
}
declare module '*.mp3' {
  const value: string
  export default value
}
declare module '*.mp4' {
  const value: string
  export default value
}
declare module '*.mkv' {
  const value: string
  export default value
}
declare module '*.pdf' {
  const value: string
  export = value
}
declare module '*?url' {
  const value: string
  export default value
}
declare module '*?raw' {
  const value: string
  export default value
}
