export const formatMoney = (cents: number, language?: string) =>
  new Intl.NumberFormat(language === 'zh' ? 'zh-CN' : 'en-US', { style: 'currency', currency: 'CNY' }).format(
    cents / 100
  )

export const formatDate = (value: string, language?: string) =>
  new Date(value.length === 10 ? `${value}T12:00:00` : value).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US')
