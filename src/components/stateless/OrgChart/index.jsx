import React from "react"
import OrgChart from "./org-chart"
// 优化的测试数据（中文版）
const sampleOrgData = {
  name: "首席执行官",
  children: [
    {
      name: "首席技术官",
      children: [
        {
          name: "工程副总裁",
          children: [
            {
              name: "前端总监",
            },
            {
              name: "后端总监",
            },
          ],
        },
        {
          name: "工程副总裁",
          children: [
            {
              name: "前端总监",
            },
            {
              name: "后端总监",
            },
          ],
        },
      ],
    },
    {
      name: "首席财务官",
      children: [
        {
          name: "财务副总裁",
          children: [
            {
              name: "财务总监",
            },
            {
              name: "财务经理",
            },
            {
              name: "会计主管",
            },
          ],
        },
      ],
    },
  ],
}
const OrgChartDemo = () => {
  return (
    <div className="flex justify-center m-5 bg-white">
      <OrgChart data={sampleOrgData} isRoot={true} />
    </div>
  )
}
export default OrgChartDemo