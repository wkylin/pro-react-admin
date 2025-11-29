import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import BlueIcon from './icons/blue.png'
import GrassGreenIcon from './icons/grass-green.png'
import OrangeIcon from './icons/orange.png'
import PeaGreenIcon from './icons/pea-green.png'
import PinkIcon from './icons/pink.png'
import PurpleIcon from './icons/purple.png'

import styles from './index.module.less'

const TagCard = ({ tagCardList = [], showMax = Infinity }) => {
  const [showCardList, setShowCardList] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)

  const cardConfig = {
    cardIcon: [BlueIcon, PeaGreenIcon, OrangeIcon, GrassGreenIcon, PurpleIcon, PinkIcon],
    borderColor: ['#96C2EE', '#87D1D7', '#E9AF7B', '#96D489', '#C0AEE2', '#EB94C6'],
    borderBackgroundColor: ['#AAC9FF', '#9AD9DE', '#FFD2AA', '#C0E4B8', '#D3C1F4', '#EB94C6 '],
    tagBackgroundColor: ['#eaf2ff', '#DEF8FA', '#FFEEDF', '#E6F9E2', '#EAE9FF', '#FEE7F4'],
    tagTextColor: ['#2878FF', '#2B9098', '#D86600', '#24A00A', '#524CD1', '#D13A91'],
  }

  useEffect(() => {
    setShowPortion()
  }, [tagCardList, showMax])

  const setShowPortion = () => {
    setShowCardList(tagCardList.filter((_, index) => index < showMax))
    setIsExpanded(false)
  }

  const showAll = () => {
    setShowCardList(tagCardList)
    setIsExpanded(true)
  }

  const showPortion = () => {
    setShowPortion()
  }

  return (
    <div className={styles.tagCard}>
      <div className={styles.tagCardExtra}>
        {showMax < tagCardList.length && (
          <>
            {!isExpanded ? (
              <Button type="primary" onClick={showAll} icon={<DownOutlined />} iconPlacement="end">
                展开全部标签
              </Button>
            ) : (
              <Button type="primary" onClick={showPortion} icon={<UpOutlined />} iconPlacement="end">
                折叠部分标签
              </Button>
            )}
          </>
        )}
      </div>
      <div className={styles.tagCardList}>
        {showCardList.map((card, index) => (
          <div
            key={index}
            className={styles.tagCardItem}
            style={{
              borderColor: cardConfig.borderColor[index % cardConfig.borderColor.length],
              width: 'calc(33.33% - 10px)',
            }}
          >
            <div
              className={styles.tagCardTop}
              style={{
                backgroundColor: cardConfig.borderBackgroundColor[index % cardConfig.borderBackgroundColor.length],
                borderRadius: '3px 3px 0px 0px',
              }}
            ></div>
            <div className={styles.tagCardBody}>
              <div className={styles.cardName}>
                <img src={cardConfig.cardIcon[index % cardConfig.cardIcon.length]} width="22" alt="icon" />
                <span>{card.name}</span>
              </div>
              <div className={styles.cardBody}>
                {card.tags.map((tag, _index) => (
                  <div
                    key={_index}
                    className={styles.tagItem}
                    style={{
                      backgroundColor: cardConfig.tagBackgroundColor[index % cardConfig.tagBackgroundColor.length],
                      padding: '5px',
                      textAlign: 'center',
                      margin: '0 10px 10px 0',
                      borderRadius: '2px',
                    }}
                  >
                    <div
                      className={styles.tagName}
                      style={{
                        color: cardConfig.tagTextColor[index % cardConfig.tagTextColor.length],
                        fontSize: '14px',
                      }}
                    >
                      {tag.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TagCard
