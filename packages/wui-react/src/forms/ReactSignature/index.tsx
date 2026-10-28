import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type ComponentProps } from 'react'
import Signature, { type SignatureRef } from '@uiw/react-signature'
import AnimatedIcon from '../../AnimatedIcon'
import { CheckIcon, CopyIcon, DownloadIcon, Eraser, RefreshCcwIcon } from 'lucide-react'
import { useClipboard } from '../useClipboard'
import styles from './index.module.less'
export type ReactSignatureHandle = SignatureRef
export interface ReactSignatureLabels {
  title: string
  canvas: string
  validate: string
  reset: string
  clear: string
  download: string
  copy: string
  copied: string
}
export interface ReactSignatureProps extends Omit<ComponentProps<typeof Signature>, 'ref' | 'onCopy' | 'onError'> {
  labels?: Partial<ReactSignatureLabels>
  fileName?: string
  onValidate?: (svg: string) => void
  onClear?: () => void
  onCopy?: (success: boolean) => void
  onDownload?: () => void
  onError?: (error: unknown) => void
}
const LABELS: ReactSignatureLabels = {
  title: 'Signature',
  canvas: 'Draw signature',
  validate: 'Validate',
  reset: 'Reset',
  clear: 'Clear',
  download: 'Download',
  copy: 'Copy SVG',
  copied: 'Copied',
}
function serialize(svg: SVGSVGElement) {
  const clone = svg.cloneNode(true) as SVGSVGElement
  const width = svg.clientWidth || 320,
    height = svg.clientHeight || 112
  clone.removeAttribute('style')
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  clone.setAttribute('width', String(width))
  clone.setAttribute('height', String(height))
  clone.setAttribute('viewBox', `0 0 ${width} ${height}`)
  return { text: new XMLSerializer().serializeToString(clone), width, height }
}
export const ReactSignature = forwardRef<ReactSignatureHandle, ReactSignatureProps>(
  (
    {
      className = '',
      labels,
      fileName = 'signature.png',
      onValidate,
      onClear,
      onCopy,
      onDownload,
      onError,
      readonly: externalReadonly,
      ...props
    },
    ref
  ) => {
    const [validated, setValidated] = useState(false)
    const signature = useRef<SignatureRef>(null)
    const image = useRef<HTMLImageElement | null>(null)
    const objectUrl = useRef<string | null>(null)
    const { copied, copy } = useClipboard()
    const text = { ...LABELS, ...labels }
    const readonly = externalReadonly ?? validated
    const disposeImage = () => {
      if (image.current) {
        image.current.onload = null
        image.current.onerror = null
        image.current.src = ''
        image.current = null
      }
      if (objectUrl.current) {
        URL.revokeObjectURL(objectUrl.current)
        objectUrl.current = null
      }
    }
    useEffect(() => disposeImage, [])
    useImperativeHandle(
      ref,
      () => ({
        get svg() {
          return signature.current?.svg ?? null
        },
        clear: () => signature.current?.clear(),
        dispatch: (action) => signature.current?.dispatch(action),
      }),
      []
    )
    const clear = () => {
      signature.current?.clear()
      onClear?.()
    }
    const download = () => {
      const svg = signature.current?.svg
      if (!svg) return
      disposeImage()
      try {
        const { text, width, height } = serialize(svg)
        const img = new Image()
        image.current = img
        const url = URL.createObjectURL(new Blob([text], { type: 'image/svg+xml' }))
        objectUrl.current = url
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            if (!ctx) throw new Error('Canvas is unavailable')
            ctx.drawImage(img, 0, 0)
            const link = document.createElement('a')
            link.download = fileName
            link.href = canvas.toDataURL('image/png')
            link.click()
            onDownload?.()
          } catch (error) {
            onError?.(error)
          } finally {
            disposeImage()
          }
        }
        img.onerror = () => {
          disposeImage()
          onError?.(new Error('Signature image could not be loaded'))
        }
        img.src = url
      } catch (error) {
        disposeImage()
        onError?.(error)
      }
    }
    return (
      <div className={styles.signature}>
        <p>{text.title}</p>
        <Signature
          {...props}
          className={`${styles.canvas} ${className}`}
          aria-label={props['aria-label'] ?? text.canvas}
          options={props.options ?? { smoothing: 0, streamline: 0.8, thinning: 0.7 }}
          readonly={readonly}
          ref={signature}
        />
        <div className={styles.actions}>
          <button
            type="button"
            aria-label={readonly ? text.reset : text.validate}
            disabled={externalReadonly === true}
            onClick={() => {
              if (readonly) {
                clear()
                setValidated(false)
              } else {
                setValidated(true)
                if (signature.current?.svg) onValidate?.(serialize(signature.current.svg).text)
              }
            }}
          >
            <AnimatedIcon variant="pulse" mode="hover">
              {readonly ? <RefreshCcwIcon /> : <CheckIcon />}
            </AnimatedIcon>
          </button>
          {readonly ? (
            <>
              <button type="button" aria-label={text.download} onClick={download}>
                <DownloadIcon />
              </button>
              <button
                type="button"
                onClick={async () => {
                  const svg = signature.current?.svg
                  if (svg) {
                    const success = await copy(serialize(svg).text)
                    onCopy?.(success)
                  }
                }}
              >
                <CopyIcon />
                {copied ? text.copied : text.copy}
              </button>
            </>
          ) : (
            <button type="button" aria-label={text.clear} onClick={clear}>
              <Eraser />
            </button>
          )}
        </div>
      </div>
    )
  }
)
ReactSignature.displayName = 'ReactSignature'
