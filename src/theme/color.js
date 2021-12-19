const path = require('path')
const fs = require('fs')
// const { generateTheme, getLessVars } = require('../../index');
// const { generateTheme, getLessVars } = require('../../../antd-theme-webpack-plugin/');
const { generateTheme, getLessVars } = require('antd-theme-generator')
const themeVariables = getLessVars(path.join(__dirname, './../../src/styles/vars.less'))
const defaultVars = getLessVars('./node_modules/antd/lib/style/themes/default.less')
const darkVars = {
  ...getLessVars('./node_modules/antd/lib/style/themes/dark.less'),
  '@primary-color': defaultVars['@primary-color'],
  '@picker-basic-cell-active-with-range-color': 'darken(@primary-color, 20%)',
}
const lightVars = {
  ...getLessVars('./node_modules/antd/lib/style/themes/compact.less'),
  '@primary-color': defaultVars['@primary-color'],
}
fs.writeFileSync('./src/theme/dark.json', JSON.stringify(darkVars))
fs.writeFileSync('./src/theme/light.json', JSON.stringify(lightVars))
fs.writeFileSync('./src/theme/theme.json', JSON.stringify(themeVariables))
// eslint-disable-next-line node/handle-callback-err
fs.readFile('./node_modules/antd/lib/style/themes/index.less', 'utf8', (err, files) => {
  const result = files.replace(/@\{root-entry-name\}/g, 'default')
  fs.writeFile('./node_modules/antd/lib/style/themes/index.less', result, 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })
})

const options = {
  stylesDir: path.join(__dirname, './../../src'),
  antDir: path.join(__dirname, './../../node_modules/antd'),
  varFile: path.join(__dirname, './../../src/styles/vars.less'),
  themeVariables: Array.from(
    new Set([...Object.keys(darkVars), ...Object.keys(lightVars), ...Object.keys(themeVariables)])
  ),
  outputFilePath: path.join(__dirname, './../../public/color.less'),
}

generateTheme(options)
  .then((less) => {
    console.log('Theme generated successfully')
  })
  .catch((error) => {
    console.log('Error', error)
  })
