import React from 'react'
import styles from './index.module.less'

export type LazyLoadImageProps = React.ComponentPropsWithoutRef<'img'> & {
  caption?: React.ReactNode
  loadInitially?: boolean
  observerOptions?: IntersectionObserverInit
}

const defaultObserverOptions: IntersectionObserverInit = { root: null, rootMargin: '200px 0px' }

const LazyLoadImage = ({
  caption,
  alt,
  src,
  className,
  loadInitially = false,
  observerOptions = defaultObserverOptions,
  ...props
}: LazyLoadImageProps) => {
  const observerRef = React.useRef<IntersectionObserver | null>(null)
  const imgRef = React.useRef<HTMLImageElement | null>(null)
  const [isLoaded, setIsLoaded] = React.useState(loadInitially)

  const observerCallback = React.useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting) {
        observerRef.current?.disconnect()
        setIsLoaded(true)
      }
    },
    [observerRef]
  )

  React.useEffect(() => {
    if (loadInitially) {
      setIsLoaded(true)
      return
    }

    if ('loading' in HTMLImageElement.prototype || typeof IntersectionObserver === 'undefined') {
      setIsLoaded(true)
      return
    }

    const image = imgRef.current
    if (!image) return

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    observerRef.current = observer
    observer.observe(image)
    return () => {
      observer.disconnect()
    }
  }, [loadInitially, observerCallback, observerOptions])

  return (
    <figure className={styles.hoverRotate}>
      <img
        alt={alt}
        src={isLoaded ? src : undefined}
        ref={imgRef}
        className={className}
        loading={loadInitially ? undefined : 'lazy'}
        {...props}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export default LazyLoadImage
