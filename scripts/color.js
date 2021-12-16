// antd 主题色文件生成脚本

const fs = require('fs')
const path = require('path')
const _root = path.join(__dirname, './')

const { generateTheme } = require('antd-theme-generator')

const themeVariables = ['@primary-color', '@theme-color']
// eslint-disable-next-line node/handle-callback-err
fs.readFile(path.join(_root, '../node_modules/antd/lib/style/themes/index.less'), 'utf8', function (err, files) {
  const result = files.replace(/@\{root-entry-name\}/g, 'default')
  fs.writeFile(path.join(_root, '../node_modules/antd/lib/style/themes/index.less'), result, 'utf8', function (err) {
    if (err) {
      console.log(err)
    }
  })
})

// 由于 antd@3.x 的库不一样, 需要使用 1.2.6 版本
const options = {
  // antd 库的路径
  antDir: path.join(__dirname, '../node_modules/antd'),

  // 需要检索的所有 less 文件的根目录
  stylesDir: path.join(__dirname, '../src'),

  // 自定义变量的文件
  varFile: path.join(__dirname, '../src/styles/variables.less'),

  // 哪些变量值是需要动态修改的
  themeVariables,
}

// 由于插件提取的样式内容有很多是冗余的, 不使用插件默认的导出功能
// 需要先处理数据, 然后再自己导出文件
generateTheme(options)
  .then((less) => {
    console.log('less 文件内容提取成功')

    // 生成的 less 存放的位置
    const outputFilePath = path.join(__dirname, '../public/color.less')

    let content = less.replace(/([,{])\n/g, '$1')

    const arr = content
      .split('\n')
      .map((str) => str.trim())
      .filter((str) => {
        // 纯类样式或变量定义
        const isClassStyleOrVars = /^\.((?!\(\)).)*\{.*?\}$/gm.test(str) || /^@.*?:.*?;$/gm.test(str)
        // 字符串中不包含任意的主题变量
        const excludeThemeVars = themeVariables.map((k) => k.slice(1)).every((k) => !str.includes(k))

        // 其实还有其他的冗余内容, 但是影响不大
        return !(isClassStyleOrVars && excludeThemeVars)
      })

    content = arr.join('\n')
    fs.writeFileSync(outputFilePath, content)

    console.log('主题样式文件编译成功')
  })
  .catch((error) => {
    console.log('Error', error)
  })
