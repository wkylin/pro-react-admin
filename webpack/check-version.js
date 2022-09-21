const inquirer = require('inquirer') // v8.0.0
const chalk = require('chalk') // v4.1.2
const { exec } = require('child_process')

const { name, version } = require('../package')

const regVersion = /^[1-9]{1}\d*\.\d+\.\d+$/ // 示例: 1.0.0
// const regVersion = /^\d+\.\d+\.\d+$/ // 示例: 0.0.1 / 1.0.1
// const regVersion = /^\d+\.\d+\.\d+(-beta.?\d*)?$/ // 示例: 1.0.3 / 0.0.1-beta / 1.0.0-beta.3

console.log('\n')

// 确认 package.json 版本号
inquirer
  .prompt([
    {
      type: 'input',
      name: 'version',
      message: `请确认 ${name}/package.json/version 版本号（当前：${version}）：\n`,
      default: version,
      validate(version) {
        // 校验版本号的格式
        if (!regVersion.test(version)) {
          console.log(chalk.yellow('输入的版本号无效，请检查格式（示例：1.0.0、2.3.2）'))
          return false
        }
        return true
      },
    },
  ])
  .then(({ version: versionNew }) => {
    if (versionNew !== version) {
      // 更新 package.json version，更新时不自动生成 tag
      command(`npm --no-git-tag-version version ${versionNew}`, {}, (error, stdout, stderr) => {
        if (!error) {
          console.log(
            chalk.green(`\n${name} 版本号（项目根目录下的 package.json/version）更新成功，version: ${versionNew} ！`)
          )
          command(`git add package.json && git commit -m 'ci(package.json): 更新项目版本号为：${versionNew}'`)
          console.log('\n')
          process.exit(0)
        } else {
          console.log(chalk.yellow(`\n更新版本号（${versionNew}）失败了~\n`))
          process.exit(1)
        }
      })
    } else {
      console.log(chalk.green(`\n本次版本号未做修改，version: ${versionNew} ！\n`))
    }
  })

function command(cmd, options, callback) {
  console.log('\n')
  console.log(chalk.cyan(cmd.toString()))
  return exec(cmd, { ...options }, callback)
}
