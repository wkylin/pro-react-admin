import { useEffect, useState } from 'react'
import { getCertificates } from '../api/certificates'
import { initialCompanies, type Company } from '../model/types'

export function useCompanyCertificates() {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const controller = new AbortController()
    void Promise.all(
      initialCompanies.map(async (company) => {
        try {
          return { ...company, list: await getCertificates(company.grid, controller.signal) }
        } catch (error) {
          if (!controller.signal.aborted) console.warn('资质接口不可用:', error)
          return company
        }
      })
    ).then((result) => {
      if (!controller.signal.aborted) {
        setCompanies(result)
        setLoading(false)
      }
    })
    return () => controller.abort()
  }, [])
  return { companies, loading }
}
