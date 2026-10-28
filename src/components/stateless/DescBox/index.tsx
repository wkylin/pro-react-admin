import { theme } from 'antd'
import RadioInput from '@wui/forms/RadioInput'
import styles from './index.module.less'

const customerTypes = [
  '政府部门',
  '事业单位',
  '国有企业（央属）',
  '国有企业（深圳市属）',
  '国有企业（深圳区属）',
  '国有企业（外地国企）',
  '股份公司(集体企业)',
  '民营企业',
  '社会团体',
  '外资/合资企业',
  '金融机构',
]
const enterpriseSizes = ['大型企业', '中型企业', '微型企业']

const DescBox = () => {
  const { token } = theme.useToken()

  const containerStyle = {
    '--desc-label-color': token.colorTextSecondary,
    '--desc-content-color': token.colorText,
    '--desc-bg-color': token.colorBgContainer,
  }

  return (
    <div className={styles.descWrapper} style={containerStyle}>
      <div className={styles.descColumns}>
        <div>
          <div className={styles.descBox}>
            <div className={styles.descLabel}>客户名称:</div>
            <div className={styles.descContent}>客户名称客户名称客户名称客户名称客户名称</div>
          </div>
          <div className={styles.descBox}>
            <div className={styles.descLabel}>法人姓名:</div>
            <div className={styles.descContent}>王甜甜</div>
          </div>
          <div className={styles.descBox}>
            <div className={styles.descLabel}>办公地址:</div>
            <div className={styles.descContent}>xx街道xx办事处</div>
          </div>
          <div className={styles.descBox}>
            <div className={styles.descLabel}>注册地址:</div>
            <div className={styles.descContent}>广东省深圳南山区</div>
          </div>
          <div className={styles.descBox}>
            <div className={styles.descLabel}>行业分类:</div>
            <div className={styles.descContent}>产权交易</div>
          </div>
        </div>
        <div>
          <div className={styles.descBox}>
            <div className={styles.descLabel}>客户性质:</div>
            <div className={styles.descContent}>
              <div className={styles.descChoices}>
                {customerTypes.map((text, index) => (
                  <RadioInput key={text} text={text} checked={index === 0} className={styles.descOption} wrapText />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.descBox}>
            <div className={styles.descLabel}>企业规模:</div>
            <div className={styles.descContent}>
              <div className={styles.descChoices}>
                {enterpriseSizes.map((text) => (
                  <RadioInput key={text} text={text} checked type="checkbox" className={styles.descOption} wrapText />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DescBox
