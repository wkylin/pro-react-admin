import React, { useEffect, useState } from 'react'
import { Card, Spin, Button } from 'antd'
import { useParams, useLocation } from 'react-router-dom'
import request from '@/service/request'
import { useProThemeContext } from '@/theme/hooks'
import useSafeNavigate from '@app-hooks/useSafeNavigate'

const NotificationDetail = () => {
  const { id } = useParams()
  const { search } = useLocation()
  const { redirectTo } = useSafeNavigate()
  const { themeSettings } = useProThemeContext()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      setLoading(true)
      try {
        // 示例：根据 id 请求详情接口，实际接口请替换
        // const res = await request.get(`/api/notifications/${id}`)
        // setData(res?.data || res)
        // 这里使用模拟数据以避免依赖后端
        await new Promise((r) => setTimeout(r, 300))
        if (!mounted) return
        setData({ id, title: `通知 ${id}`, body: `这是通知 ${id} 的详情。query: ${search}` })
      } catch (e) {
        console.error('fetch notification detail error', e)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchData()
    return () => {
      mounted = false
    }
  }, [id, search])

  const bgColor = themeSettings.themeMode === 'dark' ? '#18191c' : '#fff'
  const boxShadow = themeSettings.themeMode === 'dark' ? '0 2px 8px #0006' : '0 2px 8px #0001'
  const borderColor = themeSettings.themeMode === 'dark' ? '#333639' : '#f0f0f0'
  const color = themeSettings.themeMode === 'dark' ? '#eee' : '#222'

  return (
    <Card
      title={data ? data.title : `通知 ${id}`}
      style={{ width: '100%', backgroundColor: bgColor, boxShadow, border: `1px solid ${borderColor}` }}
    >
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
          <Spin />
        </div>
      ) : (
        <>
          <p style={{ color }}>{data ? data.body : '暂无数据'}</p>
          <div style={{ marginTop: 12 }}>
            <Button onClick={() => redirectTo('/notifications' + (search || ''))}>返回通知中心</Button>
          </div>
        </>
      )}
    </Card>
  )
}

export default NotificationDetail
