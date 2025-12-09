// FixTabPanel 组件使用说明
//
// FixTabPanel 是一个增强的可滚动面板组件，集成了滚动进度条功能。
// 进度条使用粘性定位（sticky），在滚动时会固定在容器顶部。
//
// ## 基本用法：
// `jsx
// import FixTabPanel from '@stateless/FixTabPanel'
//
// <FixTabPanel style={{ height: '400px' }}>
//   <div>可滚动的内容</div>
// </FixTabPanel>
// `
//
// ## 高级用法：
// `jsx
// <FixTabPanel
//   showScrollProgress={true}
//   scrollProgressProps={{
//     height: 4,
//     color: '#ff6b6b',
//     position: 'sticky',
//     springConfig: { stiffness: 200 }
//   }}
//   className="custom-panel"
//   style={{ height: '400px', border: '1px solid #ccc' }}
// >
//   <div>内容</div>
// </FixTabPanel>
// `
//
// ## Props：
// - `showScrollProgress?: boolean` - 是否显示滚动进度条（默认 true）
// - `scrollProgressProps?: object` - 滚动进度条的配置属性
// - 继承所有 `div` 的 HTML 属性
//
// ## 重要提示：
// - **必须设置高度**: FixTabPanel 需要明确的 `height` 样式才能正确显示滚动条
// - **粘性定位**: 进度条使用 `position: sticky`，会在滚动时固定在容器顶部
//
// ## 特性：
// - ✅ 相对定位容器
// - ✅ 粘性定位滚动进度条
// - ✅ 返回顶部按钮
// - ✅ 可自定义进度条样式
// - ✅ 支持所有标准 div 属性
