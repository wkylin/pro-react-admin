import React from 'react'

import { Highlight, themes } from 'prism-react-renderer'

import FixTabPanel from '@stateless/FixTabPanel'

import styles from './index.module.less'

const exampleCode = `
const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}
`.trim()

const PrismRender = () => (
  <FixTabPanel>
    <h3>Welcome to prism-react-renderer!</h3>
    <Highlight theme={themes.dracula} className={styles.wrapper} code={exampleCode} language="jsx">
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
  </FixTabPanel>
)

export default PrismRender
