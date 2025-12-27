import React from 'react'
import styles from './index.module.less'

const AutoLink = ({ text }) => {
  const delimiter = /((?:https?:\/\/)?[^\s/$.?#][^\s]*)/gi

  return (
    <>
      {text.split(delimiter).map((word, index) => {
        const match = word.match(delimiter)
        if (match) {
          const url = match[0]
          return (
            <a
              key={`${index}-${url}`}
              className={styles.squiggle}
              target="_blank"
              rel="noopener noreferrer"
              href={url.startsWith('http') ? url : `http://${url}`}
            >
              {url}
            </a>
          )
        }
        return word
      })}
    </>
  )
}

export default AutoLink

// <AutoLink text="foo bar baz http://example.org bar" />
