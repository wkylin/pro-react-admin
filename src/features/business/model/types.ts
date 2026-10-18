export interface Certificate {
  certificateName?: string
  certificateNo?: string
  certifyOrgName?: string
  issueDate?: string
  endDate?: string
  status?: string
}
export interface Company {
  grid: string
  name: string
  list: Certificate[]
}
export const initialCompanies: Company[] = [
  { grid: '2316258212', name: '上海徐汇规划建筑设计有限公司', list: [] },
  { grid: '551517222', name: '中交第一公路勘察设计研究院有限公司', list: [] },
]
