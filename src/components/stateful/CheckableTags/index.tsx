import { forwardRef, useImperativeHandle, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Tag } from 'antd'
import styles from './index.module.less'

const { CheckableTag } = Tag

type TagKey = string | number
type TagSelection = TagKey | TagKey[] | undefined
type SelectedTags = Record<string, TagSelection>

interface CheckableTagItem {
  name: string
  key: TagKey
}

interface CheckableTagGroup {
  title: string
  key: TagKey
  data: CheckableTagItem[]
}

interface CheckableTagsChangeEvent {
  key: TagKey
  checked: boolean
  checkedKeys: SelectedTags
  tagValue: TagKey
}

interface CheckableTagsProps {
  dataSource: CheckableTagGroup[]
  onChange: (event: CheckableTagsChangeEvent) => void
  checkedKeys?: SelectedTags
  defaultCheckedKeys?: SelectedTags
  single?: boolean
}

interface CheckableTagsHandle {
  setSelectedTags: Dispatch<SetStateAction<SelectedTags>>
  handleChange: (tag: TagKey, checked: boolean, key: TagKey) => void
}

const CheckableTags = forwardRef<CheckableTagsHandle, CheckableTagsProps>((props, ref) => {
  const { dataSource, onChange, checkedKeys, defaultCheckedKeys, single = false } = props

  const [selectedTags, setSelectedTags] = useState<SelectedTags>(checkedKeys || defaultCheckedKeys || {})

  const handleChange = (tag: TagKey, checked: boolean, key: TagKey) => {
    let nextSelectedTags
    if (single) {
      nextSelectedTags = checked ? tag : undefined
    } else {
      const currentSelection = selectedTags[key]
      nextSelectedTags = checked
        ? [...(Array.isArray(currentSelection) ? currentSelection : []), tag]
        : (Array.isArray(currentSelection) ? currentSelection : []).filter((t) => t !== tag)
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
            {item.data.map((tag) => {
              const selection = selectedTags[item.key]
              return (
                <CheckableTag
                  key={tag.key}
                  checked={single ? selection === tag.key : Array.isArray(selection) && selection.includes(tag.key)}
                  onChange={(checked) => handleChange(tag.key, checked, item.key)}
                >
                  {tag.name}
                </CheckableTag>
              )
            })}
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
