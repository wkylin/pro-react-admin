import React from 'react'

import Highlight, { defaultProps } from 'prism-react-renderer'

import theme from 'prism-react-renderer/themes/okaidia'
import FixTabPanel from '@src/components/stateless/FixTabPanel'

import { Pre, Line, LineNo, LineContent } from './styles'

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
    <Highlight {...defaultProps} theme={theme} code={exampleCode} language='jsx'>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  </FixTabPanel>
)

export default PrismRender
