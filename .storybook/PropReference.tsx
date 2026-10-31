import componentProps from './component-props.generated.json'

type PropEntry = {
  name: string
  description: string
  type: string
  required: boolean
  defaultValue?: string
}

const propsByComponent = componentProps as Record<string, PropEntry[]>

/** Every row is generated from the Story component's TypeScript contract. */
export function PropReference({ name }: { name: string }) {
  const props = propsByComponent[name]
  if (!props) return <p className="wui-doc-empty-props">未找到 {name} 的属性清单，请重新生成 Storybook Props 索引。</p>
  if (!props.length)
    return (
      <div className="wui-doc-callout" role="note">
        <strong>没有公开 Props：</strong>当前组件不接收自定义属性。上方预览展示固定内容；Storybook 的示例设置不代表组件
        API。
      </div>
    )

  return (
    <div className="wui-doc-props-wrap">
      <p className="wui-doc-props-intro">
        以下 {props.length} 个组件专属或常用继承属性来自 TypeScript 声明；标准 DOM
        与第三方库的其余属性遵循原类型。默认值只列出源码参数中可直接确认的表达式；「示例参数」只展示当前 Story
        开放了交互控制的部分。
      </p>
      <table className="wui-doc-table wui-doc-props-table">
        <thead>
          <tr>
            <th scope="col">Prop</th>
            <th scope="col">含义与用途</th>
            <th scope="col">类型</th>
            <th scope="col">必填</th>
            <th scope="col">默认表达式</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name}>
              <th scope="row">
                <code>{prop.name}</code>
              </th>
              <td>{prop.description}</td>
              <td>
                <code>{prop.type}</code>
              </td>
              <td>{prop.required ? '是' : '否'}</td>
              <td>{prop.defaultValue ? <code>{prop.defaultValue}</code> : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
