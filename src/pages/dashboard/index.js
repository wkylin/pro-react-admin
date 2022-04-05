import React from 'react'
import { Routes, Route, useNavigate, useNavigationType } from 'react-router-dom'
import { Button } from 'antd'
import FixLayout from '@stateless/FixLayout'
import styles from './index.module.less'

const Dashboard = () => {
  const navigate = useNavigate()
  const navigateType = useNavigationType()
  return (
    <FixLayout className={styles.dashboard}>
      <h3>Look, more routes!</h3>
      <h4>Navigate type: {navigateType}</h4>
      <Routes>
        <Route
          path="/"
          element={
            <Button type="primary" onClick={() => navigate('/')}>
              Navigate /
            </Button>
          }
        />
        <Route path="invoices" element={<h3>invoies</h3>} />
      </Routes>
    </FixLayout>
  )
}

export default Dashboard
