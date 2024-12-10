import React from 'react'
import { codeToHtml } from 'shiki'
import { Highlight, themes } from 'prism-react-renderer'
import useCopyToClipboard from '@hooks/useCopyToClipboard'
import {
  CopyOutlined,
  CheckCircleTwoTone
} from '@ant-design/icons';
import styles from './index.module.less'

const ShiCode = ({ preCode }) => {
  const [copyToClipboard, copyResult] = useCopyToClipboard()
  const handleClickCopy = () => {
    copyToClipboard(preCode);
  }

  return (
    <div className="rounded-md bg-cyan-800 text-zinc-50">
      <header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
        <div className="flex gap-1.5">
          <div className="rounded-full h-3 w-3 bg-red-500"></div>
          <div className="rounded-full h-3 w-3 bg-yellow-500"></div>
          <div className="rounded-full h-3 w-3 bg-green-500"></div>
        </div>
        <div className="col-span-4 flex justify-center">
          <div className="bg-transparent text-center text-gray-400 text-sm font-medium focus:outline-none">Untitled</div>
        </div>
      </header>
      <div className="relative px-4 pb-4">
        <div className="absolute top-2 right-5 size-4 text-gray-400">
          {copyResult?.state === 'success' ? <CheckCircleTwoTone className="size-4 text-base" twoToneColor="#52c41a" /> : <CopyOutlined className="size-4 text-base" onClick={handleClickCopy}/>}
        </div>

        <Highlight theme={themes.dracula} className={styles.wrapper} code={preCode?.trim()} language="jsx">
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
