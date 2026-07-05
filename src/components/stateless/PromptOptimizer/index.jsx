import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Button, Divider, Input, Space, Tag, Typography } from 'antd'
import { Check, Copy, WandSparkles } from 'lucide-react'

import styles from './index.module.less'

const { TextArea } = Input
const { Paragraph, Text } = Typography

const DEFAULT_VALUE = {
  role: '',
  objective: '',
  audience: '',
  context: '',
  constraints: '',
  outputFormat: '',
  examples: '',
  evaluation: '',
}

const SECTION_LABELS = {
  role: '角色',
  objective: '任务目标',
  audience: '目标对象',
  context: '上下文',
  constraints: '约束条件',
  outputFormat: '输出格式',
  examples: '参考示例',
  evaluation: '验收标准',
}

function normalizeValue(value) {
  return {
    ...DEFAULT_VALUE,
    ...(value || {}),
  }
}

function buildPromptText(formValue) {
  const sections = [
    ['role', `你现在的角色是：${formValue.role}`],
    ['objective', formValue.objective],
    ['audience', `目标对象：${formValue.audience}`],
    ['context', formValue.context],
    ['constraints', formValue.constraints],
    ['outputFormat', formValue.outputFormat],
    ['examples', formValue.examples],
    ['evaluation', formValue.evaluation],
  ]

  return sections
    .filter(([, value]) => String(value || '').trim())
    .map(([key, value]) => `## ${SECTION_LABELS[key]}\n${String(value).trim()}`)
    .join('\n\n')
}

function PromptOptimizer({
  className = '',
  value = DEFAULT_VALUE,
  onChange,
  onPromptChange,
  title = '提示词编辑器',
  description = '通过结构化字段整理角色、目标、上下文和输出要求，便于后续复用与调整。',
  copyLabel = '复制 Prompt',
  resetLabel = '重置',
}) {
  const [formValue, setFormValue] = useState(() => normalizeValue(value))
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setFormValue(normalizeValue(value))
  }, [value])

  const promptText = useMemo(() => buildPromptText(formValue), [formValue])

  useEffect(() => {
    if (typeof onPromptChange === 'function') {
      onPromptChange(promptText, formValue)
    }
  }, [formValue, onPromptChange, promptText])

  const updateField = (key, nextValue) => {
    const nextFormValue = {
      ...formValue,
      [key]: nextValue,
    }
    setFormValue(nextFormValue)
    if (typeof onChange === 'function') {
      onChange(nextFormValue)
    }
  }

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  const resetAll = () => {
    setFormValue(DEFAULT_VALUE)
    if (typeof onChange === 'function') {
      onChange(DEFAULT_VALUE)
    }
    if (typeof onPromptChange === 'function') {
      onPromptChange('', DEFAULT_VALUE)
    }
  }

  return (
    <section className={clsx(styles.promptOptimizer, className)}>
      <div className={styles.header}>
        <div>
          <div className={styles.titleRow}>
            <WandSparkles size={16} />
            <h3>{title}</h3>
          </div>
          <Paragraph className={styles.description}>{description}</Paragraph>
        </div>
        <Space wrap>
          <Tag color="blue">结构化编辑</Tag>
          <Tag color="gold">实时预览</Tag>
        </Space>
      </div>

      <div className={styles.grid}>
        <div className={styles.formPanel}>
          <label className={styles.field}>
            <span>角色</span>
            <Input
              value={formValue.role}
              placeholder="例如：资深产品经理 / TypeScript 导师"
              onChange={(e) => updateField('role', e.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span>任务目标</span>
            <TextArea
              value={formValue.objective}
              rows={4}
              placeholder="说明你希望模型完成什么任务。"
              onChange={(e) => updateField('objective', e.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span>目标对象</span>
            <Input
              value={formValue.audience}
              placeholder="例如：前端初学者 / 企业采购负责人"
              onChange={(e) => updateField('audience', e.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span>上下文</span>
            <TextArea
              value={formValue.context}
              rows={4}
              placeholder="补充背景资料、业务场景、已有方案。"
              onChange={(e) => updateField('context', e.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span>约束条件</span>
            <TextArea
              value={formValue.constraints}
              rows={4}
              placeholder="例如：不要使用第三方服务；输出必须可直接执行。"
              onChange={(e) => updateField('constraints', e.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span>输出格式</span>
            <TextArea
              value={formValue.outputFormat}
              rows={3}
              placeholder="例如：先结论后步骤；使用 Markdown 二级标题；返回 JSON。"
              onChange={(e) => updateField('outputFormat', e.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span>参考示例</span>
            <TextArea
              value={formValue.examples}
              rows={3}
              placeholder="可以放示例输入、风格样例或不希望出现的反例。"
              onChange={(e) => updateField('examples', e.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span>验收标准</span>
            <TextArea
              value={formValue.evaluation}
              rows={3}
              placeholder="说明怎样的回答才算合格。"
              onChange={(e) => updateField('evaluation', e.target.value)}
            />
          </label>
        </div>

        <div className={styles.previewPanel}>
          <div className={styles.previewHeader}>
            <div>
              <h4>提示词预览</h4>
              <Text type="secondary">根据当前输入实时生成，可直接用于对话或保存为模板。</Text>
            </div>
            <Space>
              <Button onClick={resetAll}>{resetLabel}</Button>
              <Button type="primary" onClick={copyPrompt} disabled={!promptText.trim()}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? '已复制' : copyLabel}
              </Button>
            </Space>
          </div>

          <Divider className={styles.divider} />

          {promptText ? (
            <pre className={styles.promptPreview}>{promptText}</pre>
          ) : (
            <div className={styles.placeholder}>
              <div>
                <h4>从左侧开始填写</h4>
                <Paragraph>补充必要信息后，这里会自动生成一份可直接使用的提示词。</Paragraph>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

PromptOptimizer.propTypes = {
  className: PropTypes.string,
  value: PropTypes.shape({
    role: PropTypes.string,
    objective: PropTypes.string,
    audience: PropTypes.string,
    context: PropTypes.string,
    constraints: PropTypes.string,
    outputFormat: PropTypes.string,
    examples: PropTypes.string,
    evaluation: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onPromptChange: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  copyLabel: PropTypes.string,
  resetLabel: PropTypes.string,
}

export default PromptOptimizer
