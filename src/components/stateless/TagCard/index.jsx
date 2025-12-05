import React, { useState, useEffect, useMemo } from 'react'
import { Button, theme } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import BlueIcon from './icons/blue.png'
import GrassGreenIcon from './icons/grass-green.png'
import OrangeIcon from './icons/orange.png'
import PeaGreenIcon from './icons/pea-green.png'
import PinkIcon from './icons/pink.png'
import PurpleIcon from './icons/purple.png'

import styles from './index.module.less'
import { useProThemeContext } from '@/theme/hooks'

const CARD_ICONS = [BlueIcon, PeaGreenIcon, OrangeIcon, GrassGreenIcon, PurpleIcon, PinkIcon]

const LIGHT_PALETTE = {
  borderColor: ['#96C2EE', '#87D1D7', '#E9AF7B', '#96D489', '#C0AEE2', '#EB94C6'],
  borderBackgroundColor: ['#AAC9FF', '#9AD9DE', '#FFD2AA', '#C0E4B8', '#D3C1F4', '#F8C0E2'],
  tagBackgroundColor: ['#EAF2FF', '#DEF8FA', '#FFEEDF', '#E6F9E2', '#EAE9FF', '#FEE7F4'],
  tagTextColor: ['#2878FF', '#2B9098', '#D86600', '#1F8F07', '#524CD1', '#C02F84'],
}

const DARK_PALETTE = {
  borderColor: ['#5B8BC9', '#4FA8B1', '#C98A4D', '#4C9C51', '#8E7BC8', '#C96AA7'],
  borderBackgroundColor: [
    'rgba(91,139,201,0.35)',
    'rgba(79,168,177,0.35)',
    'rgba(201,138,77,0.35)',
    'rgba(76,156,81,0.35)',
    'rgba(142,123,200,0.35)',
    'rgba(201,106,167,0.35)',
  ],
  tagBackgroundColor: [
    'rgba(40,94,164,0.35)',
    'rgba(32,108,110,0.35)',
    'rgba(155,92,34,0.35)',
    'rgba(42,108,51,0.35)',
    'rgba(73,62,130,0.35)',
    'rgba(119,46,86,0.35)',
  ],
  tagTextColor: ['#D6E8FF', '#D2F0F2', '#FFE0BF', '#D1F7D2', '#E5E0FF', '#FFD6EE'],
}

const TagCard = ({ tagCardList = [], showMax = Infinity }) => {
  const [showCardList, setShowCardList] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const { themeSettings } = useProThemeContext()
  const { token } = theme.useToken()
  const isDarkMode = themeSettings.themeMode === 'dark'

  const cardConfig = useMemo(
    () => ({
      cardIcon: CARD_ICONS,
      ...(isDarkMode ? DARK_PALETTE : LIGHT_PALETTE),
    }),
    [isDarkMode]
  )

  const resetVisiblePortion = () => {
    setShowCardList(tagCardList.filter((_, index) => index < showMax))
    setIsExpanded(false)
  }

  useEffect(() => {
    resetVisiblePortion()
  }, [tagCardList, showMax])

  const showAll = () => {
    setShowCardList(tagCardList)
    setIsExpanded(true)
  }

  const showPortion = () => {
    resetVisiblePortion()
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
              backgroundColor: token.colorBgElevated,
              color: token.colorText,
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
                <span style={{ color: token.colorTextHeading }}>{card.name}</span>
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
