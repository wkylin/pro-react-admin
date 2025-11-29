import React, { useState } from 'react'

const FixTabs = () => {
  // 定义tab数据
  const tabs = [
    { id: 1, label: '首页' },
    { id: 2, label: '产品' },
    { id: 3, label: '服务' },
    { id: 4, label: '关于我们' },
    { id: 5, label: '联系我们' },
  ]

  // 设置默认激活的tab
  const [activeTab, setActiveTab] = useState(1)

  // 切换tab的函数
  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-3xl">
      <div className="flex flex-wrap border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`relative cursor-pointer px-2 ${
              activeTab === tab.id ? 'rounded-tab text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            <div className="flex items-center px-4 py-1">{tab.label}</div>
          </button>
        ))}
      </div>

      {/* Tab内容区域 */}
      <div className="py-6">
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
            <h2 className="mb-4 text-xl font-bold">{tab.label}</h2>
            <p>这是{tab.label}的内容区域。您可以在这里添加任何相关内容。</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FixTabs
