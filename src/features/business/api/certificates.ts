import { fetchClient } from '@platform/api/client'
import { isRecord } from '@platform/api/core/response'
import type { Certificate } from '../model/types'

export function parseCertificates(response: unknown): Certificate[] {
  const data = isRecord(response) && isRecord(response.data) ? response.data : response
  if (!isRecord(data) || !Array.isArray(data.list) || !data.list.every(isRecord)) {
    throw new Error('资质接口响应格式无效')
  }
  return data.list.map((item) => {
    const certificate: Certificate = {}
    for (const key of [
      'certificateName',
      'certificateNo',
      'certifyOrgName',
      'issueDate',
      'endDate',
      'status',
    ] as const) {
      if (typeof item[key] === 'string') certificate[key] = item[key]
    }
    return certificate
  })
}

export async function getCertificates(companyGid: string, signal: AbortSignal): Promise<Certificate[]> {
  const response = await fetchClient.post<unknown>(
    'https://capi.tianyancha.com/cloud-business-state/company/certificate/detail/list',
    {
      companyGid,
      pageSize: 1000,
      pageNum: 1,
      certificateName: '-100',
      status: '-100',
      issueYear: '-100',
      searchKey: '',
      sortType: '',
    },
    { signal, isShowError: false }
  )
  return parseCertificates(response)
}
