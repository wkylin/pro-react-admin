import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import useCopyToClipboard from '@hooks/useCopyToClipboard'
import { CopyOutlined, CheckCircleTwoTone } from '@ant-design/icons'
import styles from './index.module.less'

const ShiCode = ({ preCode }) => {
  const [copyToClipboard, copyResult] = useCopyToClipboard()
  const handleClickCopy = () => {
    copyToClipboard(preCode)
  }

  return (
    <div className='rounded-md bg-cyan-800 text-zinc-50'>
      <header className='grid grid-cols-6 items-center gap-3 px-4 py-3'>
        <div className='flex gap-1.5'>
          <div className='h-3 w-3 rounded-full bg-red-500' />
          <div className='h-3 w-3 rounded-full bg-yellow-500' />
          <div className='h-3 w-3 rounded-full bg-green-500' />
        </div>
        <div className='col-span-4 flex justify-center'>
          <div className='bg-transparent text-center text-sm font-medium text-gray-400 focus:outline-hidden'>
            Untitled
          </div>
        </div>
      </header>
      <div className='relative px-4 pb-4'>
        <div className='absolute top-2 right-5 size-4 text-gray-400'>
          {copyResult?.state === 'success'
            ? (
              <CheckCircleTwoTone className='size-4 text-base' twoToneColor='#52c41a' />
              )
            : (
              <CopyOutlined className='size-4 text-base' onClick={handleClickCopy} />
              )}
        </div>

        <Highlight theme={themes.dracula} className={styles.wrapper} code={preCode?.trim()} language='jsx'>
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre className={styles.pre} style={style}>
              {tokens.map((line, i) => (
                <div className={styles.line} key={i} {...getLineProps({ line })}>
                  <span className={styles['line-no']}>{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}

export default ShiCode
