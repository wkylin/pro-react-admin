// antd 主题色文件生成脚本

const path = require('path')

const { generateTheme } = require('antd-theme-generator')

const themeVariables = [
  '@primary-color',
  '@theme-color',
  '@body-background',
  '@layout-header-background',
  '@layout-header-height',
  '@layout-header-padding',
]

const options = {
  // antd 库的路径
  antDir: path.join(__dirname, '../node_modules/antd'),

  // 需要检索的所有 less 文件的根目录
  stylesDir: path.join(__dirname, '../src'),

  // 自定义变量的文件
  varFile: path.join(__dirname, '../src/styles/variables.less'),

  // 哪些变量值是需要动态修改的
  themeVariables,

  customColorRegexArray: [/^fade\(.*\)$/],

  outputFilePath: path.join(__dirname, '../public/color.less'),
}

generateTheme(options)
  .then((less) => {
    console.log('主题样式文件编译成功')
  })
  .catch((error) => {
    console.log('Error', error)
  })
