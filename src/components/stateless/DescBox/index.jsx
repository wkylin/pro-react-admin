import React from 'react'
import { Row, Col } from 'antd'
import RadioInput from '@stateless/RadioInput'
import styles from './index.module.less'

const DescBox = () => {
  return (
    <div className={styles.descWrapper}>
      <Row gutter={20}>
        <Col span={12}>
          <div className={styles.descBox}>
            <div className={styles.descLabel}>客户名称:</div>
            <div className={styles.descContentl}>客户名称客户名称客户名称客户名称客户名称</div>
          </div>
          <div className={styles.descBox}>
            <div className={styles.descLabel}>法人姓名:</div>
            <div className={styles.descContentl}>王甜甜</div>
          </div>
          <div className={styles.descBox}>
            <div className={styles.descLabel}>办公地址:</div>
            <div className={styles.descContentl}>xx街道xx办事处</div>
          </div>
          <div className={styles.descBox}>
            <div className={styles.descLabel}>注册地址:</div>
            <div className={styles.descContentl}>广东省深圳南山区</div>
          </div>
          <div className={styles.descBox}>
            <div className={styles.descLabel}>行业分类:</div>
            <div className={styles.descContentl}>产权交易</div>
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.descBox}>
            <div className={styles.descLabel}>客户性质:</div>
            <div className={styles.descContent}>
              <div className={styles.descItem}>
                <div className={styles.descItemBox}>
                  <RadioInput text="政府部门" checked="true" />
                </div>
                <div className={styles.descItemBox}>
                  <RadioInput text="事业单位" />
                </div>
                <div className={styles.descItemBox}>
                  <RadioInput text="国有企业（央属）" />
                </div>
              </div>
              <div className={styles.descItem}>
                <div className={styles.descItemBox}>
                  <RadioInput text="国有企业（深圳市属）" />
                </div>
                <div className={styles.descItemBox}>
                  <RadioInput text="国有企业（深圳区属）" />
                </div>
                <div className={styles.descItemBox}>
                  <RadioInput text="国有企业（外地国企）" />
                </div>
              </div>
              <div className={styles.descItem}>
                <div className={styles.descItemBox}>
                  <RadioInput text="股份公司(集体企业)" />
                </div>
                <div className={styles.descItemBox}>
                  <RadioInput text="民营企业" />
                </div>
                <div className={styles.descItemBox}>
                  <RadioInput text="社会团体" />
                </div>
              </div>
              <div className={`${styles.descItem} ${styles.lastItem}`}>
                <div className={styles.descItemBox}>
                  <RadioInput text="外资/合资企业" />
                </div>
                <div className={styles.descItemBox}>
                  <RadioInput text="金融机构" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.descBox}>
            <div className={styles.descLabel}>企业规模:</div>
            <div className={styles.descContent}>
              <div className={`${styles.descItem} ${styles.descItemNormal} ${styles.lastItem}`}>
                <div className={styles.descItemBox}>
                  <RadioInput text="大型企业" checked="true" />
                </div>
                <div className={styles.descItemBox}>
                  <RadioInput text="中型企业" />
                </div>
                <div className={styles.descItemBox}>
                  <RadioInput text="微型企业" />
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default DescBox
