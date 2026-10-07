import { useRef, type ComponentType, type ReactNode, type RefCallback } from 'react'
import {
  motion,
  useInView,
  type DOMMotionComponents,
  type MotionProps,
  type MotionStyle,
  type Transition,
  type UseInViewOptions,
  type Variants,
} from 'motion/react'
import clsx from 'clsx'

const defaultVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface AnimationInViewProps {
  children: ReactNode
  variants?: Variants
  transition?: Transition
  viewOptions?: UseInViewOptions
  as?: keyof DOMMotionComponents
  className?: string
  style?: MotionStyle
  once?: boolean
  amount?: UseInViewOptions['amount']
  margin?: UseInViewOptions['margin']
  scrollContainerRef?: UseInViewOptions['root']
}

type AnimatedMotionComponentProps = MotionProps & {
  className?: string
  ref?: RefCallback<Element>
}

const AnimationInView = ({
  children,
  variants = defaultVariants,
  transition,
  viewOptions = {},
  as = 'div',
  className,
  style,
  once = false,
  amount = 0.2,
  margin,
  scrollContainerRef,
}: AnimationInViewProps) => {
  const ref = useRef<Element | null>(null)
  const setRef = (element: Element | null) => {
    ref.current = element
  }
  const isInView = useInView(ref, {
    once,
    amount,
    margin,
    root: scrollContainerRef,
    ...viewOptions,
  })

  const MotionComponent = motion[as] as ComponentType<AnimatedMotionComponentProps>

  return (
    <MotionComponent
      ref={setRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      className={clsx(className)}
      style={style}
    >
      {children}
    </MotionComponent>
  )
}

export default AnimationInView
