import React from 'react'
import styles from './index.module.less'

type LazyLoadImageProps = React.ComponentPropsWithoutRef<'img'> & {
  loadInitially?: boolean
  observerOptions?: IntersectionObserverInit
}

const LazyLoadImage = ({
  alt,
  src,
  className,
  loadInitially = false,
  observerOptions = { root: null, rootMargin: '200px 0px' },
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
    if (loadInitially) return

    if ('loading' in HTMLImageElement.prototype) {
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
  }, [])

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
      <figcaption>
        <h3>
          Lorem <br />
          Ipsum
        </h3>
      </figcaption>
    </figure>
  )
}

export default LazyLoadImage

{
  /* <LazyLoadImage src="https://picsum.photos/id/1080/600/600" alt="Strawberries" /> */
}
