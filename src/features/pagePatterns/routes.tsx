import { lazy } from 'react'
import type { RouteNode } from '@platform/navigation/routes'

const RequestsPage = lazy(() => import('./pages/RequestsPage'))
const BasicFormPage = lazy(() => import('./pages/BasicFormPage'))
const StepFormPage = lazy(() => import('./pages/StepFormPage'))
const RequestDetailPage = lazy(() => import('./pages/RequestDetailPage'))
const RequestResultPage = lazy(() => import('./pages/RequestResultPage'))

export const pagePatternsRoutes: RouteNode[] = [
  { path: 'patterns/requests', name: '查询表格', element: <RequestsPage /> },
  { path: 'patterns/basic-form', name: '基础表单', element: <BasicFormPage /> },
  { path: 'patterns/step-form', name: '分步表单', element: <StepFormPage /> },
  { path: 'patterns/requests/:id', name: '申请详情', element: <RequestDetailPage /> },
  { path: 'patterns/result/:id', name: '提交结果', element: <RequestResultPage /> },
]
