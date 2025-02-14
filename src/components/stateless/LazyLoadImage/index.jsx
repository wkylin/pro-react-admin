import React from 'react'
import styles from './index.module.less'

const LazyLoadImage = ({
  alt,
  src,
  className,
  loadInitially = false,
  observerOptions = { root: null, rootMargin: '200px 0px' },
  ...props
}) => {
  const observerRef = React.useRef(null)
  const imgRef = React.useRef(null)
  const [isLoaded, setIsLoaded] = React.useState(loadInitially)

  const observerCallback = React.useCallback(
    (entries) => {
      if (entries[0].isIntersecting) {
        observerRef.current.disconnect()
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

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions)
    observerRef.current.observe(imgRef.current)
    return () => {
      observerRef.current.disconnect()
    }
  }, [])

  return (
    <figure className={styles.hoverRotate}>
      <img
        alt={alt}
        src={isLoaded ? src : null}
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
