/* eslint-disable react/display-name */
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Tag } from 'antd'
import styles from './index.module.less'

const { CheckableTag } = Tag

const CheckableTags = forwardRef((props, ref) => {
  const { dataSource, onChange, checkedKeys, defaultCheckedKeys, single = false } = props

  const [selectedTags, setSelectedTags] = useState(checkedKeys || defaultCheckedKeys || {})

  const handleChange = (tag, checked, key) => {
    let nextSelectedTags
    if (single) {
      nextSelectedTags = checked ? tag : undefined
    } else {
      nextSelectedTags = checked
        ? [...(selectedTags[key] || []), tag]
        : (selectedTags[key] || []).filter((t) => t !== tag)
    }
    const allSelectedTags = { ...selectedTags, [key]: nextSelectedTags }

    setSelectedTags(allSelectedTags)
    onChange({ key, checked, checkedKeys: allSelectedTags, tagValue: tag })
  }

  useImperativeHandle(ref, () => ({
    setSelectedTags,
    handleChange,
  }))
  return (
    <div className={styles.checkableTags}>
      {dataSource.map((item) => (
        <div key={item.key} style={{ marginBottom: 16 }}>
          <span className={styles.title}>{item.title}:</span>
          <div className={styles.checkableTag}>
            {item.data.map((tag) => (
              <CheckableTag
                key={tag.key}
                checked={single ? selectedTags[item.key] === tag.key : (selectedTags[item.key] || []).includes(tag.key)}
                onChange={(checked) => handleChange(tag.key, checked, item.key)}
              >
                {tag.name}
              </CheckableTag>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
})

// 数据格式
/* const dataSource = [
  {
    title: "表单类型",
    key: "assetType",
    data: [
      {
        name: "问卷调查",
        key: "1",
      },
      {
        name: "数据填报",
        key: "2",
      },
    ],
  },
  {
    title: "存疑类型",
    key: "clueType",
    data: [
      {
        name: "问卷调查",
        key: "1",
      },
      {
        name: "数据填报",
        key: "2",
      },
    ],
  },
]; */
export default CheckableTags
