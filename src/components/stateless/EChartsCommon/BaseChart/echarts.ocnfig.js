import * as echarts from 'echarts/core'
// 引入用到的图表
import { BarChart, PieChart } from 'echarts/charts'
// 引入提示框、数据集等组件
import { TitleComponent, TooltipComponent } from 'echarts/components'
// 引入标签自动布局、全局过渡动画等特性
import { LabelLayout } from 'echarts/features'
// 引入 Canvas 渲染器，必须
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([BarChart, PieChart, TitleComponent, TooltipComponent, CanvasRenderer, LabelLayout])

export default echarts
