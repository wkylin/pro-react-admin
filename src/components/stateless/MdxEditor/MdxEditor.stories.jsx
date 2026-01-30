import React from 'react'
import ProMdxEditor from './index'
import sample from './examples/sample.mdx?raw'
import sampleAdvanced from './examples/sample-advanced.mdx?raw'

export default {
  title: 'stateless/MdxEditor',
  component: ProMdxEditor,
  parameters: {
    docs: {
      description: {
        component: 'MDX 编辑器组件。详情请参见同目录下的 `MdxEditor.mdx` 文档。',
      },
    },
  },
}

export const Default = () => <ProMdxEditor />
Default.storyName = '默认'

export const FromFile = () => <ProMdxEditor initialMarkdown={sample} />
FromFile.storyName = '从文件加载（示例）'

export const FromFileAdvanced = () => <ProMdxEditor initialMarkdown={sampleAdvanced} />
FromFileAdvanced.storyName = '从文件加载（高级示例）'

export const Playground = (args) => <ProMdxEditor {...args} />
Playground.args = {
  initialMarkdown: sample,
  readOnly: false,
}
Playground.argTypes = {
  onChange: { action: 'changed' },
  readOnly: { control: 'boolean' },
  initialMarkdown: { control: 'text' },
}
Playground.storyName = 'Playground'
