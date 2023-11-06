import React, { useEffect, useState } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import CryptoJS, { AES, enc } from 'crypto-js'
import JSEncrypt from 'jsencrypt'

const MyCrypto = () => {
  const [aesData, setAesData] = useState()
  const [aesKey, setAesKey] = useState('')
  const [aesEncryptData, setAesEncrypt] = useState('')
  const [aesDecryptData, setAesDecryptData] = useState('')

  const [reaData, setReaData] = useState('')
  const [reaEncryptData, setReaEncryptData] = useState('')
  const [reaDecryptData, setReaDecryptData] = useState('')

  // 导入RSA密钥对
  const publicKey = `
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0BDRgoeZCRRvH/QLbGhe
M6ecmHUzm4ofqRgBPl1yThEryOQ8gGjmr16Xlj7cAedZz0vqvUsWnZh5KMZ5b5vQ
Y4HGhPfPL3CzlI+iL0JyfFN9DsIe7uSDsStBfbLQas+IYIu47RMW9YNAmS8QFmqn
4Gpw6S1t3H+1AfwQpAGxXHm3+2mTClkautPOAqmTkAzM5eLIisOI/RE4YZiHRl49
l+yUAmpAqRw0WnvqRlw76ES6naSBxHM7iQeAlo8R5YqheD2kNzJbEcJ7Owd4Rcfo
kKZxSh7Qy/Pre8QFvIKdsCu4hpIGkws86s1IHvFLCXsXUxPR5z3E69VuW6K6rkXT
lwIDAQAB
`
  const privateKey = `
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQENGCh5kJFG8f
9AtsaF4zp5yYdTObih+pGAE+XXJOESvI5DyAaOavXpeWPtwB51nPS+q9SxadmHko
xnlvm9BjgcaE988vcLOUj6IvQnJ8U30Owh7u5IOxK0F9stBqz4hgi7jtExb1g0CZ
LxAWaqfganDpLW3cf7UB/BCkAbFcebf7aZMKWRq6084CqZOQDMzl4siKw4j9EThh
mIdGXj2X7JQCakCpHDRae+pGXDvoRLqdpIHEczuJB4CWjxHliqF4PaQ3MlsRwns7
B3hFx+iQpnFKHtDL8+t7xAW8gp2wK7iGkgaTCzzqzUge8UsJexdTE9HnPcTr1W5b
orquRdOXAgMBAAECggEANFGeVSvCrBlSzh6gRrzBv0xs4JtMBFcJmgv6uBNoXEAO
GgBmREXciAmJpZKd4O6rUyh8WOgKQkumX730qD9uea8W27Wyh/PXfEpX1nlnb2LR
BgaDH8Afa0v8tl5h8RHJcbmAoUCVG9xKwJooefKMzy4EwWWWhAUq31piVtNEJYPT
zEXXMrbDJJ9bCRJXgvJ+oeedcIMz1OktU/DKjPdHLdU71MR0NUCPPMmD9RmSCjk2
TkswP3Mm6EpY85kG9xT5tNvr6p5Rsw828TAtYuybzVeJxnSvPY4IXr5Zqx+D5/B3
GoZYfDBV+nA1RYddwwnl58W5BpbFbVvLhFJIsnr4lQKBgQDrNwONQMmLG38pq+TY
0/JKcO0N1iFCIolOj7wyB8vOGOzAIqATEp1Tra5tRa0eVAlVl19rFrils0YNokgP
ITv+K9Y79JzlSOH2bpMBCy5kB0IoYTDwNs0Kc2IMoV2NekAvFMVAS8Ldh2S39O4v
a2JMGjHVoQCCcNDnq9QMAiMmzQKBgQDic6P5dbzMsKrHLRNu9gQRn7rrFe6FtErv
2mMiIdAI/4BtUs9n4q4gNprZlhIXVGGpzZ2mXMXJsJvcE6JOSS6Z8wRHE/AfOoVI
7i2qk5LFslvLHKrV1jqtyb6PTSG9Di9YF3u/JckSrMhUbDXG2PhN7Sp08O9cp3FY
zc62jVH78wKBgFwdxXRSRRwHfruRKCSKjL7+jrf2fjvqTp/HxspJJ1XliQKODOar
SZX11PPSb8QK4UT17VaBJXsvRGYegd37BAW8oUAFwlRBQM1D7Kph+J8QAKbTuVi5
/X70RRfxMjQwBmbp2X4erYgYeCda8tT7Vxm6wH2LeimbiRTRxE+XnrCZAoGBAKyf
6OUWyqjjGByjkQfqRKnGsO/alSyZhvKW8TEow3TIiPdNxEv2MjTeS2cJDpt4OMb/
tmkGmcQpfHblBLpW8U5sQduJKGg17TruTiOVQbKxR2ZrYROHrs2iWEDXVJvQ/2hQ
5oWNYV16F3C72LbP2WFWJSJmNKHWBwLiSO1Ch7ffAoGBAOEGk+98m4l1jtDkIr/w
EYOns+p9wj3be5YfARMRHxFjJCyXyaZstuk4RsmHhOlnO999nVX7eCAU36HfEahQ
l5BNkobjNZF/xd9XTWywJFTGJNg6ejF991ucWnfSwnlRbJN8sGYRrr/IYyd6a/YL
v4U73TKOI+a1xxr6ZMQ4vzwt
`
  useEffect(() => {
    const encryptData = () => {
      setAesKey(CryptoJS.lib.WordArray.random(32).toString())
      // const aseParameter = CryptoJS.lib.WordArray.random(80000 / 4).toString()
      const aseParameter = `大型语言模型（LLM）是基于大量数据进行预训练的超大型深度学习模型。底层转换器是一组神经网络，这些神经网络由具有自注意力功能的编码器和解码器组成。编码器和解码器从一系列文本中提取含义，并理解其中的单词和短语之间的关系。
转换器 LLM 能够进行无监督的训练，但更精确的解释是转换器可以执行自主学习。通过此过程，转换器可学会理解基本的语法、语言和知识。
与早期按顺序处理输入的循环神经网络（RNN）不同，转换器并行处理整个序列。这可让数据科学家使用 GPU 训练基于转换器的 LLM，从而大幅度缩短训练时间。
借助转换器神经网络架构，您可使用非常大规模的模型，其中通常具有数千亿个参数。这种大规模模型可以摄取通常来自互联网的大量数据，但也可以从包含 500 多亿个网页的 Common Crawl 和拥有约 5700 万个页面的 Wikipedia 等来源摄取数据。`
      const aesEncrypt = AES.encrypt(aseParameter, aesKey).toString()
      setAesData(aseParameter)
      setAesEncrypt(aesEncrypt)
      const aesDecrypted = AES.decrypt(aesEncrypt, aesKey).toString(enc.Utf8)
      setAesDecryptData(aesDecrypted)

      const encrypt = new JSEncrypt()
      encrypt.setPublicKey(publicKey)

      // const reaParameter = CryptoJS.lib.WordArray.random(80 / 4).toString()
      const reaParameter =
        '基于转换器的大型神经网络可以有数十亿个参数。模型的大小通常由模型大小、参数数量和训练数据规模之间的经验关系决定。'

      const reaEncrypt = encrypt.encrypt(reaParameter)
      setReaData(reaParameter)

      setReaEncryptData(reaEncrypt)

      const decrypt = new JSEncrypt()
      decrypt.setPrivateKey(privateKey)
      const uncrypted = decrypt.decrypt(reaEncrypt)
      setReaDecryptData(uncrypted)
    }

    encryptData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FixTabPanel>
      <section style={{ wordBreak: 'break-all' }}>
        <h3>AES加密明文： {aesData}</h3>
        <h4>AES密钥：{aesKey}</h4>
        <h3>AES加密密文：{aesEncryptData}</h3>
        <h3>AES解密后文件：{aesDecryptData}</h3>
        <h3>REA加密明文：{reaData}</h3>
        <h4>REA加密密文：{reaEncryptData}</h4>
        <h4>REA解密后：{reaDecryptData}</h4>
      </section>
    </FixTabPanel>
  )
}

export default MyCrypto
