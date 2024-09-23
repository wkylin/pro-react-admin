/* eslint-disable no-restricted-syntax */
/* eslint-disable react/display-name */
import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react'
import { Form, Input, Select, Checkbox, Space, Button, DatePicker } from 'antd'
import moment from 'moment'
import './index.less'

const datesOption = ['date']
const checkBoxesOption = ['checkbox']
const { Option } = Select

const SearchForm = forwardRef((props, ref) => {
  const {
    onFinish,
    dataSource,
    btnText = '搜索',
    exportText = '导出',
    resetText = '重置',
    isReset,
    automatic,
    isExport,
    exportResult = () => {},
    initialValues,
    loading,
    exportLoading,
    resetExternal = () => {},
    ...otherProp
  } = props

  const [dates, setDates] = useState(() => dataSource.filter((item) => datesOption.includes(item.type)) || [])
  const [checkboxes, setCheckboxes] = useState(
    () => dataSource.filter((item) => checkBoxesOption.includes(item.type)) || []
  )

  const [form] = Form.useForm()

  const onFinishInner = useCallback(
    (values) => {
      let newValues = {}
      // eslint-disable-next-line guard-for-in
      for (const key in values) {
        newValues[key] = window.isEmpty(values[key]) ? undefined : values[key]
      }
      if (dates.length > 0) {
        dates.forEach((item) => {
          newValues = {
            ...newValues,
            [item.name]: newValues[item.name]
              ? moment(newValues[item.name]).format(item.format || 'YYYY-MM-DD')
              : undefined,
          }
        })
      }

      if (checkboxes.length > 0) {
        checkboxes.forEach((item) => {
          newValues = {
            ...newValues,
            [item.name]: Number(newValues[item.name]) || undefined,
          }
        })
      }

      onFinish(newValues)
    },
    [checkboxes, dates, onFinish]
  )

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        const values = form.getFieldsValue()
        onFinishInner(values)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onFinishInner, form])

  const getFormItemHtml = (data, last) => {
    const {
      name,
      label,
      placeholder,
      type = 'input',
      options,
      width = 180,
      text,
      element,
      selectMode = undefined,
      ...other
    } = data

    const formItemHtml = (typeOption) => {
      switch (typeOption) {
        case 'select':
          return (
            <Select
              style={{ width }}
              allowClear
              mode={selectMode}
              placeholder={placeholder || (label ? `请选择${label}` : '请选择...')}
              onChange={data.eventListener ? (value) => data.eventListener({ libraryId: value }) : null}
              {...other}
            >
              {options.map((child) => (
                <Option value={child.key} key={child.key}>
                  {child.value}
                </Option>
              ))}
            </Select>
          )

        case 'date':
          return (
            <DatePicker
              style={{ width, borderRadius: 5 }}
              allowClear
              {...other}
              placeholder={placeholder || (label ? `请选择${label}` : '请选择时间...')}
            />
          )

        case 'checkbox':
          return <Checkbox>{text}</Checkbox>
        default:
          return (
            <Input
              allowClear
              {...other}
              style={{ width, borderRadius: 5 }}
              placeholder={placeholder || (label ? `请输入${label}` : '请输入...')}
            />
          )
      }
    }

    return (
      <Form.Item
        style={{
          marginRight: name === last?.name ? 0 : '10px',
          marginBottom: 10,
        }}
        key={name}
        name={name}
        label={label}
        {...(type === 'checkbox' ? { valuePropName: 'checked' } : {})}
      >
        {element ?? formItemHtml(type)}
      </Form.Item>
    )
  }

  // 导出
  const exportResultInner = () => {
    const values = form.getFieldsValue()
    let newValues = {}
    // eslint-disable-next-line guard-for-in
    for (const key in values) {
      newValues[key] = window.isEmpty(values[key]) ? undefined : values[key]
    }
    if (dates.length > 0) {
      dates.forEach((item) => {
        newValues = {
          ...newValues,
          [item.name]: newValues[item.name]
            ? moment(newValues[item.name]).format(item.format || 'YYYY-MM-DD')
            : undefined,
        }
      })
    }

    if (checkboxes.length > 0) {
      checkboxes.forEach((item) => {
        newValues = {
          ...newValues,
          [item.name]: Number(newValues[item.name]) || undefined,
        }
      })
    }

    exportResult(newValues)
  }

  const reset = () => {
    setTimeout(() => {
      form.resetFields()
    }, 0)
    resetExternal()
    onFinishInner({})
  }
  const onFieldsChange = () => {
    if (!automatic) return
    const values = form.getFieldsValue()
    onFinishInner(values)
  }
  useEffect(() => {
    setDates(dataSource.filter((item) => datesOption.includes(item.type)) || [])
    setCheckboxes(() => dataSource.filter((item) => checkBoxesOption.includes(item.type)) || [])
  }, [dataSource])

  useImperativeHandle(ref, () => ({ ...form }))

  return (
    <div className={'searchForm'}>
      <Form
        form={form}
        name="search"
        layout="inline"
        onFinish={onFinishInner}
        onFieldsChange={onFieldsChange}
        initialValues={initialValues}
        {...otherProp}
      >
        {dataSource.map((item, idx, self) => getFormItemHtml(item, self[self.length - 1]))}
        <Form.Item style={{ marginRight: 0, marginLeft: 10 }}>
          <Space>
            {!automatic ? (
              <Button type={loading ? 'default' : 'primary'} htmlType="submit" disabled={loading}>
                {btnText}
              </Button>
            ) : null}
            {isReset ? (
              <Button type="primary" onClick={() => reset()}>
                {resetText}
              </Button>
            ) : null}
            {isExport ? (
              <Button
                type={exportLoading ? 'default' : 'primary'}
                disabled={exportLoading}
                onClick={() => exportResultInner()}
              >
                {exportText}
              </Button>
            ) : null}
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
})

export default SearchForm

// 用法

/**
 *  const searchFormRef = useRef();
    useEffect(() => {
      searchFormRef.current.setFieldsValue({
        dateRange:
          param?.startTime && param?.endTime
            ? [moment(param?.startTime), moment(param?.endTime)]
            : undefined,
        timeType: param?.timeType ?? undefined,
      });
    }, [param?.startTime, param?.endTime, param?.timeType]);
 * const [searchValues, setSearchValues] = useState({
    startTime: (startTime && startTime) || undefined,
    endTime: (endTime && endTime) || undefined,
  });

  const [exportLoading, setExportLoading] = useState(false);
 *
 * const conf = [
    {
      label: '项目名称',
      placeholder: '请输入项目名称或关键词',
      width: 200,
      name: 'prjName',
    },
    {
      label: '建设单位',
      placeholder: '请输入企业名称或关键字',
      name: 'buildCorpName',
    },
    {
      label: '项目状态',
      placeholder: '项目状态',
      name: 'prjStatus',
      type: 'select',
      selectMode: 'tags',
      width: 300,
      options: prjStatus,
    },
*/
// {
/* <SearchForm
  dataSource={conf}
  initialValues={searchValues}
  automatic={false}
  isReset
  onFinish={(values) => {
    const { dateRange = [], timeType, ...rest } = values;

    if (dateRange.length > 0 && (timeType === 'all' || !timeType)) {
      message.error('请先选择时间类型');
      return;
    }
    setSearchValues({
      ...rest,
      timeType: timeType === 'all' ? undefined : timeType,
      startTime: dateRange[0]
        ? moment(dateRange[0]).format('YYYY-MM-DD')
        : undefined,
      endTime: dateRange[1]
        ? moment(dateRange[1]).format('YYYY-MM-DD')
        : undefined,
    });
  }}
  isExport
  loading={tableConfig.loading}
  exportLoading={exportLoading}
  exportResult={(values) => exportData(values, '项目列表数据')}
/> */
// }

/**
 * const uid = nanoid();
    sessionStorage.setItem(
      uid,
      JSON.stringify({
        prjStage,
        startTime,
        endTime,
        timeType: '02',
      }),
    );
 * const [param] = useState(() => {
    const _param = JSON.parse(sessionStorage.getItem(params.uid)) || {};
    return _param;
  });
 */
