import AnimatedIcon from '../../AnimatedIcon'
import { useEffect, useState, type ReactNode } from 'react'
import { Globe, MapPin, Network, RefreshCw } from 'lucide-react'
import styles from '../display.module.less'
export interface UserIPData {
  ip?: string
  country_name?: string
  region?: string
  city?: string
  org?: string
  asn?: string
}
export interface UserIPLabels {
  title?: ReactNode
  ip?: ReactNode
  location?: ReactNode
  provider?: ReactNode
  loading?: string
  retry?: string
  unknown?: ReactNode
  error?: ReactNode
}
export interface UserIPProps {
  data?: UserIPData
  loadInfo?: (signal: AbortSignal) => Promise<UserIPData>
  labels?: UserIPLabels
  onError?: (error: unknown) => void
}
export default function UserIP({ data, loadInfo, labels = {}, onError }: UserIPProps) {
  const [loaded, setLoaded] = useState<UserIPData>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    setError(false)
    setLoaded(undefined)
    if (data !== undefined || !loadInfo) {
      setLoading(false)
      return () => controller.abort()
    }
    setLoading(true)
    void Promise.resolve()
      .then(() => loadInfo(controller.signal))
      .then((info) => {
        if (!controller.signal.aborted) setLoaded(info)
      })
      .catch((reason) => {
        if (!controller.signal.aborted) {
          setError(true)
          onError?.(reason)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [data, loadInfo, attempt, onError])
  const info = data ?? loaded
  return (
    <section className={styles.network} aria-busy={loading}>
      <h2>{labels.title ?? 'Network information'}</h2>
      {loading && <div role="status">{labels.loading ?? 'Loading'}</div>}
      {error ? (
        <div role="alert">
          {labels.error ?? 'Unable to load network information'}
          <button type="button" onClick={() => setAttempt((value) => value + 1)}>
            <AnimatedIcon>
              <RefreshCw size={16} />
            </AnimatedIcon>
            {labels.retry ?? 'Retry'}
          </button>
        </div>
      ) : (
        <dl className={styles.networkFields}>
          <div>
            <dt>
              <AnimatedIcon>
                <Globe size={16} />
              </AnimatedIcon>
              {labels.ip ?? 'IP address'}
            </dt>
            <dd>{info?.ip ?? labels.unknown ?? '—'}</dd>
          </div>
          <div>
            <dt>
              <AnimatedIcon>
                <MapPin size={16} />
              </AnimatedIcon>
              {labels.location ?? 'Location'}
            </dt>
            <dd>{[info?.country_name, info?.region, info?.city].filter(Boolean).join(' ') || labels.unknown || '—'}</dd>
          </div>
          <div>
            <dt>
              <AnimatedIcon>
                <Network size={16} />
              </AnimatedIcon>
              {labels.provider ?? 'Provider'}
            </dt>
            <dd>{info?.org || info?.asn || labels.unknown || '—'}</dd>
          </div>
        </dl>
      )}
    </section>
  )
}
