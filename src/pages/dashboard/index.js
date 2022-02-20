import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import styles from './index.module.less'

const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.dashboard}>
      <h3>Look, more routes!</h3>
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
    </div>
  )
}

export default Dashboard
