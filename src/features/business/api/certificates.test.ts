import { parseCertificates } from './certificates'

test('decodes the external API without carrying unknown fields into view state', () => {
  expect(
    parseCertificates({ data: { list: [{ certificateName: '测试', certificateNo: '123', internal: 'ignored' }] } })
  ).toEqual([{ certificateName: '测试', certificateNo: '123' }])
})

test('rejects malformed domain responses', () => {
  expect(() => parseCertificates({ data: { list: [null] } })).toThrow('资质接口响应格式无效')
})
