import { forwardRef, useImperativeHandle, useState, type Dispatch, type SetStateAction } from 'react'
import styles from './index.module.less'
export type TagKey = string | number
export type TagSelection = TagKey | TagKey[] | undefined
export type SelectedTags = Record<string, TagSelection>
export interface CheckableTagItem {
  name: string
  key: TagKey
  disabled?: boolean
}
export interface CheckableTagGroup {
  title: string
  key: TagKey
  data: CheckableTagItem[]
}
export interface CheckableTagsChangeEvent {
  key: TagKey
  checked: boolean
  checkedKeys: SelectedTags
  tagValue: TagKey
}
export interface CheckableTagsProps {
  dataSource: CheckableTagGroup[]
  onChange?: (event: CheckableTagsChangeEvent) => void
  checkedKeys?: SelectedTags
  defaultCheckedKeys?: SelectedTags
  single?: boolean
  disabled?: boolean
}
export interface CheckableTagsHandle {
  /** Updates uncontrolled state. Controlled callers must update checkedKeys. */
  setSelectedTags: Dispatch<SetStateAction<SelectedTags>>
  handleChange: (tag: TagKey, checked: boolean, key: TagKey) => void
}
const CheckableTags = forwardRef<CheckableTagsHandle, CheckableTagsProps>(
  ({ dataSource, onChange, checkedKeys, defaultCheckedKeys = {}, single = false, disabled = false }, ref) => {
    const [internal, setSelectedTags] = useState(defaultCheckedKeys)
    const selected = checkedKeys ?? internal
    const handleChange = (tag: TagKey, checked: boolean, key: TagKey) => {
      if (disabled) return
      const current = selected[key]
      const items = Array.isArray(current) ? current : []
      const next = {
        ...selected,
        [key]: single
          ? checked
            ? tag
            : undefined
          : checked
            ? [...new Set([...items, tag])]
            : items.filter((item) => item !== tag),
      }
      if (checkedKeys === undefined) setSelectedTags(next)
      onChange?.({ key, checked, checkedKeys: next, tagValue: tag })
    }
    useImperativeHandle(ref, () => ({ setSelectedTags, handleChange }))
    return (
      <div className={styles.checkableTags}>
        {dataSource.map((group) => (
          <fieldset key={group.key} className={styles.group} disabled={disabled}>
            <legend>{group.title}</legend>
            <div className={styles.checkableTag}>
              {group.data.map((tag) => {
                const selection = selected[group.key]
                const checked = single ? selection === tag.key : Array.isArray(selection) && selection.includes(tag.key)
                return (
                  <button
                    type="button"
                    key={tag.key}
                    aria-pressed={checked}
                    disabled={tag.disabled}
                    onClick={() => handleChange(tag.key, !checked, group.key)}
                  >
                    {tag.name}
                  </button>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>
    )
  }
)
CheckableTags.displayName = 'CheckableTags'
export default CheckableTags
