import request from '../request'

export type CompanyCertificate = {
  certificateName?: string
  certificateNo?: string
  certifyOrgName?: string
  issueDate?: string
  endDate?: string
  status?: string
}

type CertificateResponse = {
  data?: {
    list?: CompanyCertificate[]
  }
}

const CERTIFICATE_LIST_URL = 'https://capi.tianyancha.com/cloud-business-state/company/certificate/detail/list'

export async function fetchCompanyCertificates(companyGid: string): Promise<CompanyCertificate[]> {
  const response = (await request.post(
    CERTIFICATE_LIST_URL,
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
    {
      needToken: false,
      withCredentials: false,
      encrypt: false,
      showError: false,
      returnFullResponse: true,
      timeout: 20_000,
    }
  )) as CertificateResponse

  return response.data?.list ?? []
}
